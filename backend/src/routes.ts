import { Router } from 'express';
import { authRoutes } from './modules/auth/auth.routes';
import { auditRoutes } from './modules/audit/audit.routes';
import { documentRoutes } from './modules/documents/document.routes';
import { notificationRoutes } from './modules/notifications/notification.routes';
import { signingRoutes } from './modules/signing/signing.routes';
import { signingIntegrityRoutes } from './modules/signing/signing-integrity.routes';
import { userRoutes } from './modules/users/user.routes';

export const routes = Router();

routes.get('/health', (_req, res) => {
  res.json({ ok: true });
});

routes.use('/auth', authRoutes);
routes.use('/audit', auditRoutes);
routes.use('/users', userRoutes);
routes.use('/documents', documentRoutes);
routes.use('/notifications', notificationRoutes);
routes.use('/docs', signingIntegrityRoutes);
routes.use('/sign', signingRoutes);
