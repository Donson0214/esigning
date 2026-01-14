import type { Request, Response, NextFunction } from 'express';
import {
  listNotifications,
  markNotificationsRead,
  updateNotificationPreferences,
  getNotificationPreferences,
} from './notification.service';
import { notificationReadSchema, notificationPreferencesSchema } from './notification.validators';

export async function getNotifications(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'UNAUTHORIZED' });
    }
    const limitParam = Number(req.query.limit);
    const limit = Number.isFinite(limitParam) ? limitParam : undefined;
    const data = await listNotifications(userId, { limit });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function readNotifications(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'UNAUTHORIZED' });
    }
    const payload = notificationReadSchema.parse(req.body ?? {});
    if (!payload.all && (!payload.ids || payload.ids.length === 0)) {
      return res.status(400).json({ error: 'IDS_REQUIRED' });
    }
    const result = await markNotificationsRead({
      userId,
      ids: payload.ids,
      all: payload.all,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function updatePreferences(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'UNAUTHORIZED' });
    }
    const payload = notificationPreferencesSchema.parse(req.body ?? {});
    const prefs = await updateNotificationPreferences(userId, payload);
    res.json({ preferences: prefs });
  } catch (err) {
    next(err);
  }
}

export async function getPreferences(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'UNAUTHORIZED' });
    }
    const prefs = await getNotificationPreferences(userId);
    res.json({ preferences: prefs });
  } catch (err) {
    next(err);
  }
}
