import { randomUUID } from 'crypto';

export const EVENT_VERSION = '1.0' as const;

export type DocumentStatus =
  | 'DRAFT'
  | 'SENT'
  | 'VIEWED'
  | 'IN_PROGRESS'
  | 'SIGNED'
  | 'COMPLETED'
  | 'DECLINED'
  | 'EXPIRED';

export type SignerStatus = 'PENDING' | 'VIEWED' | 'SIGNED' | 'DECLINED';

export type FieldType =
  | 'SIGNATURE'
  | 'DATE'
  | 'INITIAL'
  | 'FULL_NAME'
  | 'EMAIL'
  | 'TEXT'
  | 'CHECKBOX'
  | 'DROPDOWN'
  | 'RADIO'
  | 'COMPANY'
  | 'JOB_TITLE'
  | 'IMAGE'
  | 'ATTACHMENT';

export type EventReasonCode =
  | 'VALIDATION_FAILED'
  | 'OUT_OF_ORDER'
  | 'DOC_LOCKED'
  | 'AUTH_FAILED'
  | 'NOT_FOUND'
  | 'PREHASH_MISMATCH'
  | 'STALE_SESSION'
  | 'MANIFEST_MISMATCH'
  | 'SIGNATURE_MISSING'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';

export type EventActor = {
  userId: string;
  role: string;
  email?: string;
};

export type DocumentSummary = {
  id: string;
  title: string;
  status: DocumentStatus;
  ownerId: string;
  version: number;
  updatedAt?: string;
};

export type SignerSummary = {
  id: string;
  email: string;
  name?: string | null;
  status: SignerStatus;
  order: number;
  viewedAt?: string | null;
  signedAt?: string | null;
};

export type FieldSummary = {
  id: string;
  signerId: string;
  type: FieldType;
  label?: string | null;
  required?: boolean;
  value?: string | null;
  status?: 'EMPTY' | 'FILLED' | 'SIGNED';
  options?: Record<string, unknown> | null;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type HashInfo = {
  hash: string;
  algorithm: string;
  computedAt: string;
};

export type NotificationEventType =
  | 'document.created'
  | 'document.sent'
  | 'document.viewed'
  | 'document.signed'
  | 'document.completed'
  | 'document.declined'
  | 'document.expired'
  | 'signer.invited'
  | 'signer.joined'
  | 'signer.signed'
  | 'signer.declined'
  | 'user.invited'
  | 'user.joined.organization'
  | 'access.granted'
  | 'access.revoked'
  | 'reminder.pending_signature'
  | 'reminder.expiring_soon'
  | 'system.error';

export type NotificationSummary = {
  id: string;
  eventType: NotificationEventType;
  orgId: string;
  docId?: string;
  actor?: EventActor;
  recipientUserId: string;
  title: string;
  message: string;
  link?: string;
  payload?: Record<string, unknown>;
  createdAt: string;
  isRead: boolean;
};

export type EventDataMap = {
  'connection.ready': { user: { id: string; email: string; role: string } };
  'org.user.presence.updated': {
    userId: string;
    status: 'online' | 'offline';
    lastSeenAt: string;
    docId?: string;
  };
  'doc.created': { document: DocumentSummary };
  'doc.updated': { document: DocumentSummary; changes?: string[] };
  'doc.deleted': { documentId: string };
  'doc.access.granted': { signer: SignerSummary };
  'doc.access.revoked': { signerId: string; email?: string };
  'doc.viewed': { signerId: string; viewedAt: string };
  'doc.signer.joined': { signerId?: string; userId?: string };
  'doc.signer.left': { signerId?: string; userId?: string };
  'doc.signer.status.changed': { signer: SignerSummary; previousStatus: SignerStatus };
  'doc.field.updated': { fields: FieldSummary[] };
  'doc.signature.applied': {
    signerId: string;
    signatureIds?: string[];
    postHash?: HashInfo;
  };
  'doc.signature.rejected': {
    signerId: string;
    reasonCode: EventReasonCode;
    message?: string;
  };
  'doc.hash.computed': {
    preHash?: HashInfo;
    manifestHash?: HashInfo;
    signatureArtifactHash?: HashInfo;
    postHash?: HashInfo;
  };
  'doc.completed': { document: DocumentSummary; completedAt: string };
  'doc.audit.appended': { auditEventId: string; eventType: string };
  'notifications.email.queued': { to: string; template: string; signerId?: string };
  'notification.created': { notification: NotificationSummary };
  'notification.read': { userId: string; notificationIds?: string[]; all?: boolean; readAt: string };
  'error.occurred': {
    code: EventReasonCode;
    message: string;
    scope?: 'org' | 'doc' | 'signing' | 'system';
  };
};

export type EventName = keyof EventDataMap;

export type EventEnvelope<T extends EventName = EventName> = {
  event: T;
  version: typeof EVENT_VERSION;
  id: string;
  timestamp: string;
  orgId: string;
  docId?: string;
  actor?: EventActor;
  correlationId?: string;
  data: EventDataMap[T];
};

export function createEvent<T extends EventName>(params: {
  event: T;
  orgId: string;
  docId?: string;
  actor?: EventActor;
  correlationId?: string;
  data: EventDataMap[T];
}): EventEnvelope<T> {
  return {
    event: params.event,
    version: EVENT_VERSION,
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    orgId: params.orgId,
    docId: params.docId,
    actor: params.actor,
    correlationId: params.correlationId,
    data: params.data,
  };
}
