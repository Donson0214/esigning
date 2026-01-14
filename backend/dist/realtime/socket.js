"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketServer = initSocketServer;
exports.emitEvent = emitEvent;
exports.emitUserEvent = emitUserEvent;
exports.getSocketServer = getSocketServer;
const socket_io_1 = require("socket.io");
const env_1 = require("../config/env");
const token_util_1 = require("../utils/token.util");
const prisma_1 = require("../config/prisma");
const events_1 = require("../shared/events");
const event_store_1 = require("./event-store");
const authz_util_1 = require("./authz.util");
const roomForOrg = (orgId) => `org:${orgId}`;
const roomForDoc = (docId) => `doc:${docId}`;
const roomForUser = (userId) => `user:${userId}`;
let io = null;
function extractToken(authHeader) {
    const header = Array.isArray(authHeader) ? authHeader[0] : authHeader;
    if (!header)
        return undefined;
    const [scheme, value] = header.split(' ');
    if (scheme?.toLowerCase() !== 'bearer')
        return undefined;
    return value;
}
async function canAccessDocument(userId, docId) {
    const document = await prisma_1.prisma.document.findFirst({
        where: { id: docId },
        select: { ownerId: true },
    });
    if (!document)
        return false;
    return (0, authz_util_1.isDocAccessAllowed)(document.ownerId, userId);
}
function initSocketServer(server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: env_1.env.corsOrigins.includes('*') ? true : env_1.env.corsOrigins,
            credentials: !env_1.env.corsOrigins.includes('*'),
        },
    });
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth?.token ??
                extractToken(socket.handshake.headers.authorization);
            if (!token) {
                return next(new Error('AUTH_FAILED'));
            }
            const payload = (0, token_util_1.verifyAccessToken)(token);
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: payload.sub },
                select: { id: true, email: true, role: true },
            });
            if (!user) {
                return next(new Error('AUTH_FAILED'));
            }
            const socketUser = {
                id: user.id,
                email: user.email,
                role: user.role,
                orgId: user.id,
            };
            socket.data.user = socketUser;
            return next();
        }
        catch {
            return next(new Error('AUTH_FAILED'));
        }
    });
    io.on('connection', (socket) => {
        const user = socket.data.user;
        socket.join(roomForOrg(user.orgId));
        socket.join(roomForUser(user.id));
        const readyEvent = (0, events_1.createEvent)({
            event: 'connection.ready',
            orgId: user.orgId,
            actor: { userId: user.id, role: user.role, email: user.email },
            data: { user: { id: user.id, email: user.email, role: user.role } },
        });
        socket.emit('event', readyEvent);
        const emitPresence = (status, docId) => {
            const presenceEvent = (0, events_1.createEvent)({
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
        socket.on('doc.join', async (payload) => {
            const docId = payload?.docId;
            if (!docId)
                return;
            const authorized = await canAccessDocument(user.id, docId);
            if (!authorized) {
                const deniedEvent = (0, events_1.createEvent)({
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
            const joinedEvent = (0, events_1.createEvent)({
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
        socket.on('doc.leave', async (payload) => {
            const docId = payload?.docId;
            if (!docId)
                return;
            socket.leave(roomForDoc(docId));
            const leftEvent = (0, events_1.createEvent)({
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
        socket.on('doc.events.sync', async (payload, callback) => {
            const docId = payload?.docId;
            if (!docId)
                return;
            const authorized = await canAccessDocument(user.id, docId);
            if (!authorized) {
                const deniedEvent = (0, events_1.createEvent)({
                    event: 'error.occurred',
                    orgId: user.orgId,
                    docId,
                    actor: { userId: user.id, role: user.role, email: user.email },
                    data: { code: 'AUTH_FAILED', message: 'Unauthorized document access', scope: 'doc' },
                });
                socket.emit('event', deniedEvent);
                return;
            }
            const limit = Math.min(Math.max(payload.limit ?? env_1.env.realtime.eventLimit, 1), 200);
            const events = await (0, event_store_1.listDocumentEvents)(docId, limit);
            const response = { docId, events };
            if (typeof callback === 'function') {
                callback(response);
                return;
            }
            socket.emit('doc.events.sync.result', response);
        });
        socket.on('disconnect', () => {
            emitPresence('offline');
        });
    });
    return io;
}
async function emitEvent(event, scope = 'both') {
    if (!io)
        return;
    if (scope !== 'org' && event.docId) {
        io.to(roomForDoc(event.docId)).emit('event', event);
    }
    if (scope !== 'doc') {
        io.to(roomForOrg(event.orgId)).emit('event', event);
    }
    await (0, event_store_1.persistEvent)(event);
}
async function emitUserEvent(event, userId) {
    if (!io)
        return;
    io.to(roomForUser(userId)).emit('event', event);
}
function getSocketServer() {
    if (!io) {
        throw new Error('Socket server not initialized');
    }
    return io;
}
