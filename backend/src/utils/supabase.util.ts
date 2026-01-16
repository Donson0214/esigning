import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { randomUUID } from 'crypto';
import { env } from '../config/env';
import { createHttpError } from './http-error.util';
import { fetchBuffer } from './http.util';

type UploadOptions = {
  folder: string;
  fileName: string;
  contentType?: string;
};

const supabase = createClient(env.supabase.url, env.supabase.serviceRoleKey, {
  auth: { persistSession: false },
});

const isRemoteUrl = (value: string) => /^https?:\/\//i.test(value);

const sanitizeFileName = (value: string) => {
  const safe = value.replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');
  return safe || 'file';
};

const buildObjectPath = (folder: string, fileName: string) => {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  const safeBase = sanitizeFileName(base).slice(0, 160);
  const safeExt = ext ? ext.toLowerCase() : '';
  return `${folder}/${randomUUID()}-${safeBase}${safeExt}`;
};

export async function uploadBufferToSupabase(buffer: Buffer, options: UploadOptions) {
  const objectPath = buildObjectPath(options.folder, options.fileName);
  const { data, error } = await supabase.storage.from(env.supabase.storageBucket).upload(objectPath, buffer, {
    contentType: options.contentType,
    upsert: false,
  });
  if (error || !data?.path) {
    throw createHttpError(502, 'STORAGE_UPLOAD_FAILED', error?.message ?? 'Supabase upload failed');
  }
  return { path: data.path };
}

export async function createSignedUrl(pathOrUrl: string, ttlSeconds = env.supabase.signedUrlTtlSeconds) {
  if (!pathOrUrl) return '';
  if (isRemoteUrl(pathOrUrl)) return pathOrUrl;
  const { data, error } = await supabase.storage.from(env.supabase.storageBucket).createSignedUrl(pathOrUrl, ttlSeconds);
  if (error || !data?.signedUrl) {
    throw createHttpError(502, 'SIGNED_URL_FAILED', error?.message ?? 'Unable to create signed URL');
  }
  return data.signedUrl;
}

export async function downloadStoredFile(pathOrUrl: string) {
  if (!pathOrUrl) {
    throw createHttpError(404, 'FILE_UNAVAILABLE', 'File path missing');
  }
  if (isRemoteUrl(pathOrUrl)) {
    return fetchBuffer(pathOrUrl);
  }
  const { data, error } = await supabase.storage.from(env.supabase.storageBucket).download(pathOrUrl);
  if (error || !data) {
    throw createHttpError(502, 'FILE_UNAVAILABLE', error?.message ?? 'Supabase download failed');
  }
  const arrayBuffer = await data.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function deleteStoredFile(pathOrUrl?: string | null) {
  if (!pathOrUrl) return;
  if (isRemoteUrl(pathOrUrl)) return;
  const { error } = await supabase.storage.from(env.supabase.storageBucket).remove([pathOrUrl]);
  if (error) {
    throw createHttpError(502, 'STORAGE_DELETE_FAILED', error.message ?? 'Supabase delete failed');
  }
}
