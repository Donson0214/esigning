import { prisma } from '../../config/prisma';
import type { AuditEventInput } from './audit.types';

export async function createAuditEvent(input: AuditEventInput) {
  return prisma.auditEvent.create({
    data: {
      documentId: input.documentId,
      actorType: input.actorType,
      actorUserId: input.actorUserId,
      actorSignerId: input.actorSignerId,
      eventType: input.eventType,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      metadata: input.metadata,
    },
  });
}

export async function listAuditEvents(documentId: string) {
  return prisma.auditEvent.findMany({
    where: { documentId },
    orderBy: { createdAt: 'asc' },
  });
}
<<<<<<< HEAD
=======

export async function listAuditEventsForOwner(params: {
  ownerId: string;
  documentId?: string;
  before?: Date;
  limit: number;
}) {
  const where: Record<string, any> = {
    document: { ownerId: params.ownerId },
  };
  if (params.documentId) {
    where.documentId = params.documentId;
  }
  if (params.before) {
    where.createdAt = { lt: params.before };
  }
  return prisma.auditEvent.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: params.limit,
    include: {
      document: { select: { id: true, title: true } },
      actorUser: { select: { id: true, email: true, name: true } },
      actorSigner: { select: { id: true, email: true, name: true } },
    },
  });
}
>>>>>>> e054afa1 (Save 1)
