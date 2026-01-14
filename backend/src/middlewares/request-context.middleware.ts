import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export function requestContext(req: Request, res: Response, next: NextFunction) {
  const requestId = req.header('x-request-id') ?? randomUUID();
<<<<<<< HEAD
  (req as any).requestId = requestId;
  res.setHeader('x-request-id', requestId);
=======
  const correlationId =
    req.header('x-correlation-id') ?? req.header('x-client-mutation-id') ?? requestId;
  (req as any).requestId = requestId;
  (req as any).correlationId = correlationId;
  res.setHeader('x-request-id', requestId);
  res.setHeader('x-correlation-id', correlationId);
>>>>>>> e054afa1 (Save 1)
  next();
}
