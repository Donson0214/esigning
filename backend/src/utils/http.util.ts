import { createHttpError } from './http-error.util';

export async function fetchBuffer(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw createHttpError(502, 'FILE_FETCH_FAILED', `Unable to fetch file (${response.status})`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
