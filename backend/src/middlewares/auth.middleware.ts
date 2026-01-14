import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { verifyAccessToken } from '../utils/token.util';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'UNAUTHORIZED' });
  }

  const token = authHeader.slice('Bearer '.length).trim();
  try {
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      return res.status(401).json({ error: 'UNAUTHORIZED' });
    }
    req.user = { id: user.id, email: user.email, role: user.role };
    return next();
  } catch {
    return res.status(401).json({ error: 'UNAUTHORIZED' });
  }
}
