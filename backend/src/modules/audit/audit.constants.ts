import { AuditEventType } from '@prisma/client';

export const AUDIT_EVENT_LABELS: Record<AuditEventType, string> = {
  DOCUMENT_UPLOADED: 'Document uploaded',
  DOCUMENT_SENT: 'Document sent',
  DOCUMENT_VIEWED: 'Document viewed',
  DOCUMENT_SIGNED: 'Document signed',
  DOCUMENT_COMPLETED: 'Document completed',
  DOCUMENT_HASH_COMPUTED: 'Document hash computed',
  DOCUMENT_DECLINED: 'Document declined',
  DOCUMENT_EXPIRED: 'Document expired',
  ACCESS_GRANTED: 'Signer access granted',
  ACCESS_REVOKED: 'Signer access revoked',
  FIELD_UPDATED: 'Signature field updated',
  SIGNING_SESSION_CREATED: 'Signing session created',
  MANIFEST_SUBMITTED: 'Signing manifest submitted',
  SIGNATURE_CAPTURED: 'Signature captured',
  SIGNATURE_APPLIED: 'Signature applied to document',
  SIGNATURE_REJECTED: 'Signature rejected',
};
