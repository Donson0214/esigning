import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { uploadPdf } from '../../middlewares/upload.middleware';
import {
  createDocument,
  createField,
  deleteField,
  getAudit,
  getCertificate,
  getDocument,
  getStats,
  listDocuments,
  sendDocument,
  updateField,
} from './document.controller';

export const documentRoutes = Router();

documentRoutes.use(requireAuth);
documentRoutes.get('/', listDocuments);
documentRoutes.get('/stats', getStats);
documentRoutes.post('/', uploadPdf, createDocument);
documentRoutes.get('/:id', getDocument);
documentRoutes.get('/:id/audit', getAudit);
documentRoutes.get('/:id/certificate', getCertificate);
documentRoutes.post('/:id/send', sendDocument);
documentRoutes.post('/:id/fields', createField);
documentRoutes.patch('/:id/fields/:fieldId', updateField);
documentRoutes.delete('/:id/fields/:fieldId', deleteField);
