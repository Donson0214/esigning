import { Router } from 'express';
import { submitSigning, viewSigningSession } from './signing.controller';
import { signingRateLimit } from '../../middlewares/rate-limit.middleware';

export const signingRoutes = Router();

signingRoutes.get('/:token', signingRateLimit, viewSigningSession);
signingRoutes.post('/:token/submit', signingRateLimit, submitSigning);
