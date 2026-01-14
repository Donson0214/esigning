import { Router } from 'express';
import { submitSigning, viewSigningSession } from './signing.controller';
<<<<<<< HEAD

export const signingRoutes = Router();

signingRoutes.get('/:token', viewSigningSession);
signingRoutes.post('/:token/submit', submitSigning);
=======
import { signingRateLimit } from '../../middlewares/rate-limit.middleware';

export const signingRoutes = Router();

signingRoutes.get('/:token', signingRateLimit, viewSigningSession);
signingRoutes.post('/:token/submit', signingRateLimit, submitSigning);
>>>>>>> e054afa1 (Save 1)
