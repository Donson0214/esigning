import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.util';
<<<<<<< HEAD
=======
import { emitEvent } from '../realtime/socket';
import { createEvent, type EventReasonCode } from '../shared/events';
>>>>>>> e054afa1 (Save 1)

export function notFound(req: Request, res: Response) {
  res.status(404).json({ error: 'NOT_FOUND', path: req.path });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error({ err, requestId: req.requestId }, 'Unhandled error');
  if (err?.name === 'ZodError') {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Invalid request data',
      details: err.errors,
      requestId: req.requestId,
    });
  }
  const status = typeof err?.status === 'number' ? err.status : 500;
<<<<<<< HEAD
=======

  if (req.user) {
    const docId = typeof req.params?.docId === 'string' ? req.params.docId : req.params?.id;
    const reasonCode = (err?.code as EventReasonCode | undefined) ?? 'INTERNAL_ERROR';
    if (docId) {
      void emitEvent(
        createEvent({
          event: 'error.occurred',
          orgId: req.user.id,
          docId,
          actor: { userId: req.user.id, role: req.user.role, email: req.user.email },
          correlationId: req.correlationId,
          data: {
            code: reasonCode,
            message: err?.message ?? 'Something went wrong',
            scope: 'doc',
          },
        }),
      );
    }
  }

>>>>>>> e054afa1 (Save 1)
  res.status(status).json({
    error: err?.code ?? 'INTERNAL_ERROR',
    message: err?.message ?? 'Something went wrong',
    requestId: req.requestId,
  });
}
