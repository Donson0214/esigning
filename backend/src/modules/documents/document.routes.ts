import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { uploadDocument } from '../../middlewares/upload.middleware';
import {
  createDocument,
  createField,
  deleteField,
  getAudit,
  getDocumentFile,
  getCertificate,
  getDocument,
  getDocumentPreviewUrl,
  getStats,
  listDocuments,
  listReceivedDocuments,
  listReceivedSummary,
  sendDocument,
  updateField,
  createSigningToken,
} from './document.controller';

export const documentRoutes = Router();

documentRoutes.use(requireAuth);
documentRoutes.get('/', listDocuments);
documentRoutes.get('/received', listReceivedDocuments);
documentRoutes.get('/received/summary', listReceivedSummary);
documentRoutes.get('/stats', getStats);
documentRoutes.post('/', uploadDocument, createDocument);
documentRoutes.get('/:id/preview-url', getDocumentPreviewUrl);
documentRoutes.get('/:id/file', getDocumentFile);
documentRoutes.post('/:id/signing-token', createSigningToken);
documentRoutes.get('/:id', getDocument);
documentRoutes.get('/:id/audit', getAudit);
documentRoutes.get('/:id/certificate', getCertificate);
documentRoutes.post('/:id/send', sendDocument);
documentRoutes.post('/:id/fields', createField);
documentRoutes.patch('/:id/fields/:fieldId', updateField);
documentRoutes.delete('/:id/fields/:fieldId', deleteField);
