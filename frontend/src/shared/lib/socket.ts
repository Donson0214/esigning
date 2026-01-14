import { io, type Socket } from 'socket.io-client';
import type { EventEnvelope } from '@shared/events';
import { createId } from './ids';

type EventListener = (event: EventEnvelope) => void;

let socket: Socket | null = null;
const listeners = new Set<EventListener>();

const getSocketUrl = () => {
  const wsUrl = import.meta.env.VITE_WS_URL;
  if (wsUrl) return wsUrl;
  const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';
  return apiBase.replace(/\/api\/?$/, '');
};

export function connectSocket(token?: string) {
  if (socket) return socket;
  const authToken = token ?? localStorage.getItem('auth_token') ?? '';
  if (!authToken) return null;
  socket = io(getSocketUrl(), {
    auth: {
      token: authToken,
    },
  });

  socket.on('event', (event: EventEnvelope) => {
    listeners.forEach((listener) => listener(event));
  });

  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}

export function onSocketEvent(listener: EventListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function joinDocument(docId: string, correlationId = createId()) {
  socket?.emit('doc.join', { docId, correlationId });
}

export function leaveDocument(docId: string, correlationId = createId()) {
  socket?.emit('doc.leave', { docId, correlationId });
}

export async function syncDocumentEvents(docId: string, limit = 50) {
  if (!socket) return { docId, events: [] as EventEnvelope[] };
  return new Promise<{ docId: string; events: EventEnvelope[] }>((resolve) => {
    socket?.emit('doc.events.sync', { docId, limit }, (payload: { docId: string; events: EventEnvelope[] }) => {
      resolve(payload);
    });
  });
}
