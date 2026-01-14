export type AuditActor = {
  type: string;
  userId?: string | null;
  signerId?: string | null;
  email?: string | null;
  name?: string | null;
};

export type AuditEvent = {
  id: string;
  eventType: string;
  documentId: string;
  documentTitle: string;
  actor: AuditActor;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
};

export type AuditEventListResponse = {
  events: AuditEvent[];
  nextCursor?: string | null;
};
