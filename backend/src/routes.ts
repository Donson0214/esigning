import { Router } from 'express';
import { authRoutes } from './modules/auth/auth.routes';
<<<<<<< HEAD
import { documentRoutes } from './modules/documents/document.routes';
import { signingRoutes } from './modules/signing/signing.routes';
=======
import { auditRoutes } from './modules/audit/audit.routes';
import { documentRoutes } from './modules/documents/document.routes';
import { notificationRoutes } from './modules/notifications/notification.routes';
import { signingRoutes } from './modules/signing/signing.routes';
import { signingIntegrityRoutes } from './modules/signing/signing-integrity.routes';
>>>>>>> e054afa1 (Save 1)
import { userRoutes } from './modules/users/user.routes';

export const routes = Router();

routes.get('/health', (_req, res) => {
  res.json({ ok: true });
});

routes.use('/auth', authRoutes);
<<<<<<< HEAD
routes.use('/users', userRoutes);
routes.use('/documents', documentRoutes);
=======
routes.use('/audit', auditRoutes);
routes.use('/users', userRoutes);
routes.use('/documents', documentRoutes);
routes.use('/notifications', notificationRoutes);
routes.use('/docs', signingIntegrityRoutes);
>>>>>>> e054afa1 (Save 1)
routes.use('/sign', signingRoutes);
