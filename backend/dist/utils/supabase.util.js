"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBufferToSupabase = uploadBufferToSupabase;
exports.createSignedUrl = createSignedUrl;
exports.downloadStoredFile = downloadStoredFile;
const supabase_js_1 = require("@supabase/supabase-js");
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const env_1 = require("../config/env");
const http_error_util_1 = require("./http-error.util");
const http_util_1 = require("./http.util");
const supabase = (0, supabase_js_1.createClient)(env_1.env.supabase.url, env_1.env.supabase.serviceRoleKey, {
    auth: { persistSession: false },
});
const isRemoteUrl = (value) => /^https?:\/\//i.test(value);
const sanitizeFileName = (value) => {
    const safe = value.replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');
    return safe || 'file';
};
const buildObjectPath = (folder, fileName) => {
    const ext = path_1.default.extname(fileName);
    const base = path_1.default.basename(fileName, ext);
    const safeBase = sanitizeFileName(base).slice(0, 160);
    const safeExt = ext ? ext.toLowerCase() : '';
    return `${folder}/${(0, crypto_1.randomUUID)()}-${safeBase}${safeExt}`;
};
async function uploadBufferToSupabase(buffer, options) {
    const objectPath = buildObjectPath(options.folder, options.fileName);
    const { data, error } = await supabase.storage.from(env_1.env.supabase.storageBucket).upload(objectPath, buffer, {
        contentType: options.contentType,
        upsert: false,
    });
    if (error || !data?.path) {
        throw (0, http_error_util_1.createHttpError)(502, 'STORAGE_UPLOAD_FAILED', error?.message ?? 'Supabase upload failed');
    }
    return { path: data.path };
}
async function createSignedUrl(pathOrUrl, ttlSeconds = env_1.env.supabase.signedUrlTtlSeconds) {
    if (!pathOrUrl)
        return '';
    if (isRemoteUrl(pathOrUrl))
        return pathOrUrl;
    const { data, error } = await supabase.storage.from(env_1.env.supabase.storageBucket).createSignedUrl(pathOrUrl, ttlSeconds);
    if (error || !data?.signedUrl) {
        throw (0, http_error_util_1.createHttpError)(502, 'SIGNED_URL_FAILED', error?.message ?? 'Unable to create signed URL');
    }
    return data.signedUrl;
}
async function downloadStoredFile(pathOrUrl) {
    if (!pathOrUrl) {
        throw (0, http_error_util_1.createHttpError)(404, 'FILE_UNAVAILABLE', 'File path missing');
    }
    if (isRemoteUrl(pathOrUrl)) {
        return (0, http_util_1.fetchBuffer)(pathOrUrl);
    }
    const { data, error } = await supabase.storage.from(env_1.env.supabase.storageBucket).download(pathOrUrl);
    if (error || !data) {
        throw (0, http_error_util_1.createHttpError)(502, 'FILE_UNAVAILABLE', error?.message ?? 'Supabase download failed');
    }
    const arrayBuffer = await data.arrayBuffer();
    return Buffer.from(arrayBuffer);
}
