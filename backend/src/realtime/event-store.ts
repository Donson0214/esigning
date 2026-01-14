import { prisma } from '../config/prisma';
import type { EventEnvelope } from '../shared/events';

export async function persistEvent(event: EventEnvelope) {
  if (!event.docId) return;
  await prisma.documentEvent.create({
    data: {
      documentId: event.docId,
      orgId: event.orgId,
      event: event.event,
      version: event.version,
      payload: event,
    },
  });
}

export async function listDocumentEvents(docId: string, limit: number) {
  const rows = await prisma.documentEvent.findMany({
    where: { documentId: docId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  return rows.map((row) => row.payload as EventEnvelope).reverse();
}
