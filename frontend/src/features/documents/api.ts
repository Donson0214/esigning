import { apiClient } from '@/shared/lib/axios';
import { requestWithCorrelation } from '@/shared/lib/request';
import type {
  Document,
  DocumentAuditReport,
  DocumentListResponse,
  DocumentField,
  ReceivedSummaryResponse,
  ReceivedDocumentRecord,
} from './types';

export async function listDocuments() {
  const response = await apiClient.get<DocumentListResponse>('/documents');
  return response.data.documents;
}

export async function getReceivedSummary() {
  const response = await apiClient.get<ReceivedSummaryResponse>('/documents/received/summary');
  return response.data;
}

export async function listReceivedDocuments() {
  const response = await apiClient.get<{ documents: ReceivedDocumentRecord[] }>('/documents/received');
  return response.data.documents;
}

export async function createSigningToken(documentId: string) {
  const response = await apiClient.post<{ signingToken: string; expiresAt: string }>(
    `/documents/${documentId}/signing-token`,
  );
  return response.data;
}

export async function getDocument(documentId: string) {
  const response = await apiClient.get<Document>(`/documents/${documentId}`);
  return response.data;
}

export async function precomputeDocumentHash(documentId: string, correlationId?: string) {
  const result = await requestWithCorrelation<{ hash: string; algorithm: string; computedAt: string }>(
    {
      method: 'POST',
      url: `/docs/${documentId}/hash/precompute`,
    },
    correlationId,
  );
  return result;
}

export async function completeDocument(documentId: string, correlationId?: string) {
  const result = await requestWithCorrelation<Document>({
    method: 'POST',
    url: `/docs/${documentId}/complete`,
  }, correlationId);
  return result;
}

export async function getAuditReport(documentId: string) {
  const response = await apiClient.get<DocumentAuditReport>(`/docs/${documentId}/audit`);
  return response.data;
}

export async function uploadDocument(payload: { title: string; file: File }) {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('file', payload.file);
  const response = await apiClient.post<Document>('/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function createField(documentId: string, payload: Partial<DocumentField> & {
  signerEmail?: string;
  signerIndex?: number;
}) {
  const response = await apiClient.post<DocumentField>(`/documents/${documentId}/fields`, payload);
  return response.data;
}

export async function updateField(documentId: string, fieldId: string, payload: Partial<DocumentField> & {
  signerEmail?: string;
  signerIndex?: number;
}) {
  const response = await apiClient.patch<DocumentField>(`/documents/${documentId}/fields/${fieldId}`, payload);
  return response.data;
}

export async function deleteField(documentId: string, fieldId: string) {
  const response = await apiClient.delete<{ deleted: boolean }>(`/documents/${documentId}/fields/${fieldId}`);
  return response.data;
}

export async function deleteDocument(documentId: string) {
  const response = await apiClient.delete<{ deleted: boolean }>(`/documents/${documentId}`);
  return response.data;
}

export async function sendDocument(
  documentId: string,
  payload: {
    signers: Array<{ email: string; name?: string; order?: number }>;
    fields?: Array<{
      signerEmail?: string;
      signerIndex?: number;
      type: DocumentField['type'];
      label?: string | null;
      placeholder?: string | null;
      required?: boolean;
      value?: string | null;
      options?: Record<string, unknown> | null;
      page: number;
      x: number;
      y: number;
      width: number;
      height: number;
    }>;
    inviteStrategy?: 'immediate' | 'sequential';
  },
) {
  const response = await apiClient.post<Document & { signingToken?: string; inviteStrategy?: string }>(
    `/documents/${documentId}/send`,
    payload,
  );
  return response.data;
}

export async function shareDocument(
  documentId: string,
  payload: {
    email: string;
    message?: string;
  },
) {
  const response = await apiClient.post<{ sent: boolean }>(`/documents/${documentId}/share`, payload);
  return response.data;
}
