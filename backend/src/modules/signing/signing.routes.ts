import { Router } from 'express';
import { getSigningFile, submitSigning, viewSigningSession } from './signing.controller';
import { signingRateLimit } from '../../middlewares/rate-limit.middleware';

export const signingRoutes = Router();

signingRoutes.get('/:token/file', signingRateLimit, getSigningFile);
signingRoutes.get('/:token', signingRateLimit, viewSigningSession);
signingRoutes.post('/:token/submit', signingRateLimit, submitSigning);
