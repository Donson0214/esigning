import { apiClient } from '@/shared/lib/axios';
import { requestWithCorrelation } from '@/shared/lib/request';
import type { FieldType } from '@shared/events';

export type SigningSessionView = {
  signer: {
    id: string;
    name?: string | null;
    email: string;
    status: string;
  };
  document: {
    id: string;
    title: string;
    fileUrl: string;
    status: string;
  };
  fields: Array<{
    id: string;
    type: FieldType;
    label?: string | null;
    required?: boolean;
    value?: string | null;
    options?: Record<string, unknown> | null;
    page: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
};

export async function viewSigningSession(token: string) {
  const response = await apiClient.get<SigningSessionView>(`/sign/${token}`);
  return response.data;
}

export async function createSigningSession(
  docId: string,
  signingToken: string,
  clientMutationId?: string,
  correlationId?: string,
) {
  const result = await requestWithCorrelation<{ signingSessionId: string; expiresAt: string }>({
    method: 'POST',
    url: `/docs/${docId}/signing-sessions`,
    headers: { 'x-signing-token': signingToken },
    data: { clientMutationId },
  }, correlationId);
  return result;
}

export async function submitManifest(params: {
  docId: string;
  signingToken: string;
  signingSessionId: string;
  fields: Array<{ fieldId: string; value: string }>;
  correlationId?: string;
}) {
  const result = await requestWithCorrelation<{ manifestHash: string }>({
    method: 'POST',
    url: `/docs/${params.docId}/manifest`,
    headers: { 'x-signing-token': params.signingToken },
    data: {
      signingSessionId: params.signingSessionId,
      fields: params.fields,
    },
  }, params.correlationId);
  return result;
}

export async function uploadSignature(params: {
  docId: string;
  signingToken: string;
  signingSessionId: string;
  type: 'DRAWN' | 'TYPED' | 'UPLOADED';
  data: string;
  correlationId?: string;
}) {
  const result = await requestWithCorrelation<{ signatureArtifactHash: string; signatureArtifactUrl?: string | null }>(
    {
      method: 'POST',
      url: `/docs/${params.docId}/signature`,
      headers: { 'x-signing-token': params.signingToken },
      data: {
        signingSessionId: params.signingSessionId,
        type: params.type,
        data: params.data,
      },
    },
    params.correlationId,
  );
  return result;
}

export async function applySignature(params: {
  docId: string;
  signingToken: string;
  signingSessionId: string;
  correlationId?: string;
}) {
  const result = await requestWithCorrelation<{ postHash: string; documentVersion: number; status: string }>({
    method: 'POST',
    url: `/docs/${params.docId}/apply-signature`,
    headers: { 'x-signing-token': params.signingToken },
    data: {
      signingSessionId: params.signingSessionId,
    },
  }, params.correlationId);
  return result;
}

export async function createSigningField(params: {
  docId: string;
  signingToken: string;
  payload: {
    type: FieldType;
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
  };
  correlationId?: string;
}) {
  const result = await requestWithCorrelation<SigningSessionView['fields'][number]>({
    method: 'POST',
    url: `/docs/${params.docId}/fields`,
    headers: { 'x-signing-token': params.signingToken },
    data: params.payload,
  }, params.correlationId);
  return result;
}
