import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { hashToken } from '../utils/crypto.util';

export async function requireSigningToken(req: Request, res: Response, next: NextFunction) {
  const token =
    req.header('x-signing-token') ??
    (typeof req.query.token === 'string' ? req.query.token : undefined) ??
    (typeof req.body?.signingToken === 'string' ? req.body.signingToken : undefined);
  if (!token) {
    return res.status(401).json({ error: 'SIGNING_TOKEN_REQUIRED' });
  }
  const signer = await prisma.signer.findFirst({
    where: { signingTokenHash: hashToken(token) },
    select: { id: true, email: true, documentId: true, signingTokenExpiresAt: true },
  });
  if (!signer) {
    return res.status(404).json({ error: 'SIGNING_LINK_INVALID' });
  }
  if (signer.signingTokenExpiresAt && signer.signingTokenExpiresAt < new Date()) {
    return res.status(410).json({ error: 'SIGNING_LINK_EXPIRED' });
  }
  req.signer = { id: signer.id, email: signer.email, documentId: signer.documentId };
  return next();
}
