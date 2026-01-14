import { Readable } from 'stream';
<<<<<<< HEAD
=======
import path from 'path';
>>>>>>> e054afa1 (Save 1)
import { cloudinary } from '../config/cloudinary';

type UploadResult = {
  url: string;
  publicId: string;
};

<<<<<<< HEAD
=======
type CloudinaryDelivery = {
  resourceType: 'image' | 'raw' | 'video';
  type: 'upload' | 'private' | 'authenticated';
};

const DEFAULT_FORMAT = 'pdf';
const DEFAULT_TTL_SECONDS = 60 * 60;

function parseCloudinaryDelivery(url: string): CloudinaryDelivery | null {
  try {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\/(image|raw|video)\/(upload|private|authenticated)\//);
    if (!match) return null;
    return {
      resourceType: match[1] as CloudinaryDelivery['resourceType'],
      type: match[2] as CloudinaryDelivery['type'],
    };
  } catch {
    return null;
  }
}

function getFormat(params: { fileName?: string | null; url?: string; publicId?: string }) {
  const fromName = params.fileName ? path.extname(params.fileName) : '';
  if (fromName) return fromName.slice(1);
  if (params.url) {
    try {
      const urlPath = new URL(params.url).pathname;
      const fromUrl = path.extname(urlPath);
      if (fromUrl) return fromUrl.slice(1);
    } catch {
      // ignore invalid URLs
    }
  }
  if (params.publicId) {
    const fromId = path.extname(params.publicId);
    if (fromId) return fromId.slice(1);
  }
  return DEFAULT_FORMAT;
}

function normalizePublicId(publicId: string) {
  const ext = path.extname(publicId);
  if (!ext) return publicId;
  return publicId.slice(0, -ext.length);
}

>>>>>>> e054afa1 (Save 1)
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  options: { folder: string; fileName: string; resourceType?: 'auto' | 'raw' },
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        resource_type: options.resourceType ?? 'auto',
        filename_override: options.fileName,
        use_filename: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error('Cloudinary upload failed'));
          return;
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );

    Readable.from(buffer).pipe(stream);
  });
}
<<<<<<< HEAD
=======

export function buildCloudinaryAccessUrl(params: {
  url: string;
  publicId?: string | null;
  fileName?: string | null;
  resourceType?: CloudinaryDelivery['resourceType'];
  expiresInSeconds?: number;
}) {
  if (!params.publicId) return params.url;
  const delivery = parseCloudinaryDelivery(params.url);
  if (!delivery) return params.url;
  if (delivery.type === 'upload') {
    return params.url;
  }
  const format = getFormat({ fileName: params.fileName, url: params.url, publicId: params.publicId });
  const publicId = normalizePublicId(params.publicId);
  const expiresAt =
    Math.floor(Date.now() / 1000) + (params.expiresInSeconds ?? DEFAULT_TTL_SECONDS);
  const resourceType = params.resourceType ?? delivery.resourceType ?? 'raw';
  const type = delivery.type ?? 'authenticated';
  try {
    return cloudinary.utils.private_download_url(publicId, format, {
      resource_type: resourceType,
      type,
      expires_at: expiresAt,
      secure: true,
    });
  } catch {
    return params.url;
  }
}
>>>>>>> e054afa1 (Save 1)
