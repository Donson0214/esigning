import type { AxiosRequestConfig } from 'axios';
import { apiClient } from './axios';
import { createId } from './ids';

export async function requestWithCorrelation<T>(
  config: AxiosRequestConfig,
  correlationId: string = createId(),
) {
  const headers = { ...(config.headers ?? {}), 'x-correlation-id': correlationId };
  const response = await apiClient.request<T>({ ...config, headers });
  return { data: response.data, correlationId };
}
