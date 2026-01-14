import { Router } from 'express';
<<<<<<< HEAD
import { login, me, register } from './auth.controller';
import { requireAuth } from '../../middlewares/auth.middleware';

export const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
=======
import { firebaseAuth, login, me, register } from './auth.controller';
import { requireAuth } from '../../middlewares/auth.middleware';
import { authRateLimit } from '../../middlewares/rate-limit.middleware';

export const authRoutes = Router();

authRoutes.post('/register', authRateLimit, register);
authRoutes.post('/login', authRateLimit, login);
authRoutes.post('/firebase', authRateLimit, firebaseAuth);
>>>>>>> e054afa1 (Save 1)
authRoutes.get('/me', requireAuth, me);
