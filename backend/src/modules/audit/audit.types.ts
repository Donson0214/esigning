import type { AuditActorType, AuditEventType, Prisma } from '@prisma/client';

export type AuditEventInput = {
  documentId: string;
  actorType: AuditActorType;
  actorUserId?: string;
  actorSignerId?: string;
  eventType: AuditEventType;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Prisma.InputJsonValue;
};
