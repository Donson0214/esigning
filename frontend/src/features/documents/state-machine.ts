import type { DocumentStatus, SignerStatus } from '@shared/events';

export type DocumentLifecycleState =
  | 'DRAFT'
  | 'SENT'
  | 'VIEWED'
  | 'IN_PROGRESS'
  | 'SIGNED_PARTIAL'
  | 'COMPLETED'
  | 'DECLINED'
  | 'EXPIRED'
  | 'ERROR';

export type DocumentSigner = {
  id: string;
  status: SignerStatus;
  signOrder: number;
};

export type DocumentModel = {
  status: DocumentStatus;
  lockedAt?: string | null;
  version: number;
  signers?: DocumentSigner[];
};

export type DocumentLifecycleEvent =
  | { type: 'DOC_LOADED'; doc: DocumentModel }
  | { type: 'DOC_UPDATED'; doc: DocumentModel }
  | { type: 'SIGNATURE_APPLIED'; doc: DocumentModel }
  | { type: 'DOC_COMPLETED'; doc: DocumentModel }
  | { type: 'DOC_DECLINED'; doc: DocumentModel }
  | { type: 'DOC_EXPIRED'; doc: DocumentModel }
  | { type: 'ERROR'; error: string };

export type DocumentMachineState = {
  state: DocumentLifecycleState;
  doc: DocumentModel | null;
  error?: string;
};

export function deriveLifecycleState(doc: DocumentModel): DocumentLifecycleState {
  if (doc.lockedAt || doc.status === 'COMPLETED') return 'COMPLETED';
  if (doc.status === 'DECLINED') return 'DECLINED';
  if (doc.status === 'EXPIRED') return 'EXPIRED';

  const signers = doc.signers ?? [];
  const signedCount = signers.filter((signer) => signer.status === 'SIGNED').length;
  if (doc.status === 'SIGNED') return 'SIGNED_PARTIAL';
  if (doc.status === 'IN_PROGRESS' || (signedCount > 0 && signedCount < signers.length)) {
    return 'IN_PROGRESS';
  }
  if (doc.status === 'VIEWED') return 'VIEWED';
  if (doc.status === 'SENT') return 'SENT';
  return 'DRAFT';
}

export function canSign(doc: DocumentModel, signerId?: string) {
  if (doc.lockedAt) return false;
  if (['DRAFT', 'COMPLETED', 'DECLINED', 'EXPIRED'].includes(doc.status)) return false;
  if (!signerId) return true;
  const signers = doc.signers ?? [];
  const pending = signers.filter(
    (signer) => signer.status !== 'SIGNED' && signer.status !== 'DECLINED',
  );
  if (pending.length === 0) return true;
  const nextSigner = pending.sort((a, b) => a.signOrder - b.signOrder)[0];
  return nextSigner?.id === signerId;
}

export function documentReducer(state: DocumentMachineState, event: DocumentLifecycleEvent) {
  switch (event.type) {
    case 'DOC_LOADED':
    case 'DOC_UPDATED':
    case 'SIGNATURE_APPLIED':
    case 'DOC_COMPLETED':
    case 'DOC_DECLINED':
    case 'DOC_EXPIRED': {
      return {
        state: deriveLifecycleState(event.doc),
        doc: event.doc,
      };
    }
    case 'ERROR':
      return {
        ...state,
        state: 'ERROR',
        error: event.error,
      };
    default:
      return state;
  }
}
