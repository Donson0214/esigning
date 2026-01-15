import type { DocumentStatus, FieldType, SignerStatus } from '@shared/events';

export type Signer = {
  id: string;
  name?: string | null;
  email: string;
  status: SignerStatus;
  signOrder: number;
  viewedAt?: string | null;
  signedAt?: string | null;
};

export type Document = {
  id: string;
  title: string;
  status: DocumentStatus;
  fileUrl: string;
  fileMimeType?: string;
  fileName: string;
  fileSize: number;
  createdAt?: string;
  updatedAt?: string;
  sentAt?: string | null;
  viewedAt?: string | null;
  signedAt?: string | null;
  completedAt?: string | null;
  hash: string;
  hashAlgorithm?: string | null;
  hashComputedAt?: string | null;
  postHash?: string | null;
  postHashAlgorithm?: string | null;
  postHashComputedAt?: string | null;
  postHashVersion?: number;
  lockedAt?: string | null;
  signedFileUrl?: string | null;
  version: number;
  signers?: Signer[];
  fields?: DocumentField[];
};

export type DocumentField = {
  id: string;
  signerId?: string | null;
  signerEmail?: string | null;
  type: FieldType;
  label?: string | null;
  placeholder?: string | null;
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

export type DocumentListResponse = {
  documents: Document[];
};

export type ReceivedSummaryResponse = {
  pendingCount: number;
  total: number;
};

export type ReceivedDocumentRecord = {
  documentId: string;
  title: string;
  status: DocumentStatus;
  sentAt: string;
  signerStatus: SignerStatus;
  signerId: string;
  signerEmail: string;
  signingExpiresAt?: string | null;
  sender: {
    email: string;
    name: string;
  };
  canSign: boolean;
};

export type DocumentAuditReport = {
  document: {
    id: string;
    title: string;
    status: DocumentStatus;
    preHash: string;
    preHashAlgorithm?: string | null;
    preHashComputedAt?: string | null;
    postHash?: string | null;
    postHashAlgorithm?: string | null;
    postHashComputedAt?: string | null;
    postHashVersion?: number;
    lockedAt?: string | null;
  };
  signers: Signer[];
  signingSessions: Array<{
    id: string;
    signerId: string;
    status: string;
    preHash: string;
    preHashAlgorithm: string;
    preHashComputedAt: string;
    manifestHash?: string | null;
    signatureArtifactHash?: string | null;
    signatureArtifactType?: string | null;
    serverAttestation?: string | null;
    serverAttestationAlgorithm?: string | null;
    createdAt: string;
  }>;
  signatures: Array<{
    id: string;
    fieldId: string;
    signerId: string;
    signingSessionId?: string | null;
    manifestHash?: string | null;
    artifactHash?: string | null;
    artifactType?: string | null;
    signedAt: string;
  }>;
  auditEvents: Array<{
    id: string;
    eventType: string;
    actorType: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    metadata?: Record<string, unknown> | null;
    createdAt: string;
  }>;
};
