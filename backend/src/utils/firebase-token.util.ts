import jwt, { type JwtPayload } from 'jsonwebtoken';
import { env } from '../config/env';
import { createHttpError } from './http-error.util';

const CERTS_URL =
  'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

type FirebaseClaims = JwtPayload & {
  user_id?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  firebase?: {
    sign_in_provider?: string;
  };
};

let cachedCerts: Record<string, string> = {};
let cacheExpiresAt = 0;

function parseMaxAge(cacheControl: string | null) {
  if (!cacheControl) return 3600;
  const match = cacheControl.match(/max-age=(\d+)/i);
  if (!match) return 3600;
  const value = Number(match[1]);
  return Number.isFinite(value) && value > 0 ? value : 3600;
}

async function getFirebaseCerts() {
  if (Date.now() < cacheExpiresAt && Object.keys(cachedCerts).length > 0) {
    return cachedCerts;
  }
  const response = await fetch(CERTS_URL);
  if (!response.ok) {
    throw createHttpError(503, 'FIREBASE_CERTS_UNAVAILABLE', 'Unable to verify Firebase token');
  }
  const maxAgeSeconds = parseMaxAge(response.headers.get('cache-control'));
  cacheExpiresAt = Date.now() + maxAgeSeconds * 1000;
  cachedCerts = (await response.json()) as Record<string, string>;
  return cachedCerts;
}

export async function verifyFirebaseIdToken(idToken: string): Promise<FirebaseClaims> {
  if (!env.firebase.projectId) {
    throw createHttpError(500, 'FIREBASE_NOT_CONFIGURED', 'Firebase auth is not configured');
  }
  const decoded = jwt.decode(idToken, { complete: true });
  if (!decoded || typeof decoded === 'string') {
    throw createHttpError(401, 'INVALID_TOKEN', 'Invalid Firebase token');
  }
  const kid = decoded.header?.kid;
  if (!kid) {
    throw createHttpError(401, 'INVALID_TOKEN', 'Invalid Firebase token');
  }
  const certs = await getFirebaseCerts();
  const cert = certs[kid];
  if (!cert) {
    throw createHttpError(401, 'INVALID_TOKEN', 'Unknown Firebase token key');
  }
  try {
    const issuer = `https://securetoken.google.com/${env.firebase.projectId}`;
    return jwt.verify(idToken, cert, {
      algorithms: ['RS256'],
      audience: env.firebase.projectId,
      issuer,
    }) as FirebaseClaims;
  } catch {
    throw createHttpError(401, 'INVALID_TOKEN', 'Invalid Firebase token');
  }
}
