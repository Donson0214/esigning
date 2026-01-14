import type { Request, Response, NextFunction } from 'express';
import { submitSignatureSchema } from './signing.types';
import * as signingService from './signing.service';

function getParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function viewSigningSession(req: Request, res: Response, next: NextFunction) {
  try {
    const token = getParam(req.params.token);
    if (!token) {
      return res.status(400).json({ error: 'TOKEN_REQUIRED' });
    }
    const session = await signingService.viewSigningSession(token, {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? undefined,
<<<<<<< HEAD
=======
      correlationId: req.correlationId,
>>>>>>> e054afa1 (Save 1)
    });
    res.json(session);
  } catch (err) {
    next(err);
  }
}

export async function submitSigning(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = submitSignatureSchema.parse(req.body);
    const token = getParam(req.params.token);
    if (!token) {
      return res.status(400).json({ error: 'TOKEN_REQUIRED' });
    }
    const result = await signingService.submitSigning(token, payload, {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? undefined,
<<<<<<< HEAD
=======
      correlationId: req.correlationId,
>>>>>>> e054afa1 (Save 1)
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}
