import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { getNotifications, readNotifications, updatePreferences, getPreferences } from './notification.controller';

export const notificationRoutes = Router();

notificationRoutes.use(requireAuth);
notificationRoutes.get('/', getNotifications);
notificationRoutes.post('/read', readNotifications);
notificationRoutes.get('/preferences', getPreferences);
notificationRoutes.post('/preferences', updatePreferences);
