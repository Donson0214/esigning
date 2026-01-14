import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UserRole } from '@prisma/client';

export type AccessTokenPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

export function signAccessToken(payload: AccessTokenPayload): string {
  const expiresIn = env.jwtExpiresIn as jwt.SignOptions['expiresIn'];
  return jwt.sign(payload, env.jwtSecret, { expiresIn });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.jwtSecret) as AccessTokenPayload;
}
