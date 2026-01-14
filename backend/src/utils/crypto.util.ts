<<<<<<< HEAD
import { createHash, randomBytes } from 'crypto';
=======
import { createHash, createHmac, randomBytes } from 'crypto';
>>>>>>> e054afa1 (Save 1)

export function generateToken(bytes = 32): string {
  return randomBytes(bytes).toString('base64url');
}

export function sha256Hex(input: string | Buffer): string {
  return createHash('sha256').update(input).digest('hex');
}

export function hashToken(token: string): string {
  return sha256Hex(token);
}
<<<<<<< HEAD
=======

export function hmacSha256Hex(secret: string, input: string): string {
  return createHmac('sha256', secret).update(input).digest('hex');
}
>>>>>>> e054afa1 (Save 1)
