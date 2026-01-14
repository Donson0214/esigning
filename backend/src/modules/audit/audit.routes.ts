import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { listAuditEvents } from './audit.controller';

export const auditRoutes = Router();

auditRoutes.use(requireAuth);
auditRoutes.get('/', listAuditEvents);
