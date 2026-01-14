import { OptimisticManager } from '@/shared/lib/optimistic';
import type { Document, Signer } from './types';

export type DocumentState = Document;

export const createDocumentOptimisticManager = () => new OptimisticManager<DocumentState>();

const updateSigner = (signers: Signer[] | undefined, signerId: string, patch: Partial<Signer>) =>
  (signers ?? []).map((signer) =>
    signer.id === signerId ? { ...signer, ...patch } : signer,
  );

export function optimisticSignerStatus(
  manager: OptimisticManager<DocumentState>,
  doc: DocumentState,
  signerId: string,
  status: Signer['status'],
) {
  return manager.begin(doc, {
    description: 'signer-status',
    apply: (state) => ({
      ...state,
      signers: updateSigner(state.signers, signerId, { status }),
    }),
  });
}

export function optimisticSignatureApplied(
  manager: OptimisticManager<DocumentState>,
  doc: DocumentState,
  signerId: string,
  status: Document['status'],
) {
  return manager.begin(doc, {
    description: 'signature-applied',
    apply: (state) => ({
      ...state,
      status,
      signers: updateSigner(state.signers, signerId, { status: 'SIGNED' }),
    }),
  });
}

export function optimisticDocumentCompleted(manager: OptimisticManager<DocumentState>, doc: DocumentState) {
  return manager.begin(doc, {
    description: 'document-completed',
    apply: (state) => ({
      ...state,
      status: 'COMPLETED',
    }),
  });
}
