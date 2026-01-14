import type { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { env } from '../config/env';
import { verifyAccessToken } from '../utils/token.util';
import { prisma } from '../config/prisma';
import { createEvent, type EventEnvelope } from '../shared/events';
import { persistEvent, listDocumentEvents } from './event-store';
import { isDocAccessAllowed } from './authz.util';

type SocketUser = {
  id: string;
  email: string;
  role: string;
  orgId: string;
};

const roomForOrg = (orgId: string) => `org:${orgId}`;
const roomForDoc = (docId: string) => `doc:${docId}`;
const roomForUser = (userId: string) => `user:${userId}`;

let io: Server | null = null;

function extractToken(authHeader?: string | string[]) {
  const header = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  if (!header) return undefined;
  const [scheme, value] = header.split(' ');
  if (scheme?.toLowerCase() !== 'bearer') return undefined;
  return value;
}

async function canAccessDocument(userId: string, docId: string) {
  const document = await prisma.document.findFirst({
    where: { id: docId },
    select: { ownerId: true },
  });
  if (!document) return false;
  return isDocAccessAllowed(document.ownerId, userId);
}

export function initSocketServer(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: env.corsOrigins.includes('*') ? true : env.corsOrigins,
      credentials: !env.corsOrigins.includes('*'),
    },
  });

  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ??
        extractToken(socket.handshake.headers.authorization);
      if (!token) {
        return next(new Error('AUTH_FAILED'));
      }
      const payload = verifyAccessToken(token);
      const user = await prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, email: true, role: true },
      });
      if (!user) {
        return next(new Error('AUTH_FAILED'));
      }
      const socketUser: SocketUser = {
        id: user.id,
        email: user.email,
        role: user.role,
        orgId: user.id,
      };
      socket.data.user = socketUser;
      return next();
    } catch {
      return next(new Error('AUTH_FAILED'));
    }
  });

  io.on('connection', (socket) => {
    const user = socket.data.user as SocketUser;
    socket.join(roomForOrg(user.orgId));
    socket.join(roomForUser(user.id));

    const readyEvent = createEvent({
      event: 'connection.ready',
      orgId: user.orgId,
      actor: { userId: user.id, role: user.role, email: user.email },
      data: { user: { id: user.id, email: user.email, role: user.role } },
    });
    socket.emit('event', readyEvent);

    const emitPresence = (status: 'online' | 'offline', docId?: string) => {
      const presenceEvent = createEvent({
        event: 'org.user.presence.updated',
        orgId: user.orgId,
        actor: { userId: user.id, role: user.role, email: user.email },
        data: {
          userId: user.id,
          status,
          lastSeenAt: new Date().toISOString(),
          docId,
        },
      });
      io?.to(roomForOrg(user.orgId)).emit('event', presenceEvent);
    };

    emitPresence('online');

    socket.on('doc.join', async (payload: { docId: string; correlationId?: string }) => {
      const docId = payload?.docId;
      if (!docId) return;
      const authorized = await canAccessDocument(user.id, docId);
      if (!authorized) {
        const deniedEvent = createEvent({
          event: 'error.occurred',
          orgId: user.orgId,
          docId,
          actor: { userId: user.id, role: user.role, email: user.email },
          correlationId: payload?.correlationId,
          data: { code: 'AUTH_FAILED', message: 'Unauthorized document access', scope: 'doc' },
        });
        socket.emit('event', deniedEvent);
        return;
      }
      socket.join(roomForDoc(docId));
      const joinedEvent = createEvent({
        event: 'doc.signer.joined',
        orgId: user.orgId,
        docId,
        actor: { userId: user.id, role: user.role, email: user.email },
        correlationId: payload?.correlationId,
        data: { userId: user.id },
      });
      await emitEvent(joinedEvent);
      emitPresence('online', docId);
    });

    socket.on('doc.leave', async (payload: { docId: string; correlationId?: string }) => {
      const docId = payload?.docId;
      if (!docId) return;
      socket.leave(roomForDoc(docId));
      const leftEvent = createEvent({
        event: 'doc.signer.left',
        orgId: user.orgId,
        docId,
        actor: { userId: user.id, role: user.role, email: user.email },
        correlationId: payload?.correlationId,
        data: { userId: user.id },
      });
      await emitEvent(leftEvent);
      emitPresence('offline', docId);
    });

    socket.on(
      'doc.events.sync',
      async (payload: { docId: string; limit?: number }, callback?: (data: any) => void) => {
        const docId = payload?.docId;
        if (!docId) return;
        const authorized = await canAccessDocument(user.id, docId);
        if (!authorized) {
          const deniedEvent = createEvent({
            event: 'error.occurred',
            orgId: user.orgId,
            docId,
            actor: { userId: user.id, role: user.role, email: user.email },
            data: { code: 'AUTH_FAILED', message: 'Unauthorized document access', scope: 'doc' },
          });
          socket.emit('event', deniedEvent);
          return;
        }
        const limit = Math.min(Math.max(payload.limit ?? env.realtime.eventLimit, 1), 200);
        const events = await listDocumentEvents(docId, limit);
        const response = { docId, events };
        if (typeof callback === 'function') {
          callback(response);
          return;
        }
        socket.emit('doc.events.sync.result', response);
      },
    );

    socket.on('disconnect', () => {
      emitPresence('offline');
    });
  });

  return io;
}

export async function emitEvent(event: EventEnvelope, scope: 'org' | 'doc' | 'both' = 'both') {
  if (!io) return;
  if (scope !== 'org' && event.docId) {
    io.to(roomForDoc(event.docId)).emit('event', event);
  }
  if (scope !== 'doc') {
    io.to(roomForOrg(event.orgId)).emit('event', event);
  }
  await persistEvent(event);
}

export async function emitUserEvent(event: EventEnvelope, userId: string) {
  if (!io) return;
  io.to(roomForUser(userId)).emit('event', event);
}

export function getSocketServer() {
  if (!io) {
    throw new Error('Socket server not initialized');
  }
  return io;
}
