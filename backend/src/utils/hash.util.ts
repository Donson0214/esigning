import { sha256Hex } from './crypto.util';

export function hashBuffer(buffer: Buffer): string {
  return sha256Hex(buffer);
}

export function hashString(value: string): string {
  return sha256Hex(value);
}
