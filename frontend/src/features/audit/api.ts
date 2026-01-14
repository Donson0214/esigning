import { apiClient } from '@/shared/lib/axios';
import type { AuditEventListResponse } from './types';

export async function listAuditEvents(params?: {
  before?: string;
  limit?: number;
  documentId?: string;
}) {
  const response = await apiClient.get<AuditEventListResponse>('/audit', { params });
  return response.data;
}
