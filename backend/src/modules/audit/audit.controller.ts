import type { Request, Response, NextFunction } from 'express';
import { listAuditEventsForOwner } from './audit.service';

const DEFAULT_LIMIT = 50;

function parseLimit(value: unknown) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return DEFAULT_LIMIT;
  return Math.min(Math.max(Math.floor(parsed), 1), 200);
}

export async function listAuditEvents(req: Request, res: Response, next: NextFunction) {
  try {
    const documentId = typeof req.query.documentId === 'string' ? req.query.documentId : undefined;
    const beforeRaw = typeof req.query.before === 'string' ? req.query.before : undefined;
    const before = beforeRaw ? new Date(beforeRaw) : undefined;
    if (beforeRaw && before && Number.isNaN(before.getTime())) {
      return res.status(400).json({ error: 'INVALID_BEFORE', message: 'Invalid before timestamp' });
    }
    const limit = parseLimit(req.query.limit);

    const events = await listAuditEventsForOwner({
      ownerId: req.user!.id,
      documentId,
      before,
      limit,
    });

    const payload = events.map((event) => ({
      id: event.id,
      eventType: event.eventType,
      documentId: event.documentId,
      documentTitle: event.document.title,
      actor: {
        type: event.actorType,
        userId: event.actorUserId ?? null,
        signerId: event.actorSignerId ?? null,
        email: event.actorUser?.email ?? event.actorSigner?.email ?? null,
        name: event.actorUser?.name ?? event.actorSigner?.name ?? null,
      },
      ipAddress: event.ipAddress,
      userAgent: event.userAgent,
      metadata: event.metadata,
      createdAt: event.createdAt.toISOString(),
    }));

    const nextCursor = events.length
      ? events[events.length - 1].createdAt.toISOString()
      : null;

    res.json({ events: payload, nextCursor });
  } catch (err) {
    next(err);
  }
}
