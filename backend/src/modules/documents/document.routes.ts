import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { uploadPdf } from '../../middlewares/upload.middleware';
import {
  createDocument,
<<<<<<< HEAD
=======
  createField,
  deleteField,
>>>>>>> e054afa1 (Save 1)
  getAudit,
  getCertificate,
  getDocument,
  getStats,
  listDocuments,
  sendDocument,
<<<<<<< HEAD
=======
  updateField,
>>>>>>> e054afa1 (Save 1)
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
<<<<<<< HEAD
=======
documentRoutes.post('/:id/fields', createField);
documentRoutes.patch('/:id/fields/:fieldId', updateField);
documentRoutes.delete('/:id/fields/:fieldId', deleteField);
>>>>>>> e054afa1 (Save 1)
