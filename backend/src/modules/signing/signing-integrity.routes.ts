import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireSigningToken } from '../../middlewares/signing-auth.middleware';
import { signingRateLimit } from '../../middlewares/rate-limit.middleware';
import {
  applySignature,
  completeSigning,
  completeDocument,
  createSignerField,
  createSigningSession,
  getAuditReport,
  precomputeHash,
  submitManifest,
  uploadSignature,
} from './signing-integrity.controller';

export const signingIntegrityRoutes = Router();

signingIntegrityRoutes.post('/:docId/hash/precompute', requireAuth, precomputeHash);
signingIntegrityRoutes.post('/:docId/signing-sessions', signingRateLimit, requireSigningToken, createSigningSession);
signingIntegrityRoutes.post('/:docId/fields', signingRateLimit, requireSigningToken, createSignerField);
signingIntegrityRoutes.post('/:docId/manifest', signingRateLimit, requireSigningToken, submitManifest);
signingIntegrityRoutes.post('/:docId/signature', signingRateLimit, requireSigningToken, uploadSignature);
signingIntegrityRoutes.post('/:docId/complete-signing', signingRateLimit, requireSigningToken, completeSigning);
signingIntegrityRoutes.post('/:docId/apply-signature', signingRateLimit, requireSigningToken, applySignature);
signingIntegrityRoutes.post('/:docId/complete', requireAuth, completeDocument);
signingIntegrityRoutes.get('/:docId/audit', requireAuth, getAuditReport);
