import { Router } from 'express';
import { firebaseAuth, login, me, register } from './auth.controller';
import { requireAuth } from '../../middlewares/auth.middleware';
import { authRateLimit } from '../../middlewares/rate-limit.middleware';

export const authRoutes = Router();

authRoutes.post('/register', authRateLimit, register);
authRoutes.post('/login', authRateLimit, login);
authRoutes.post('/firebase', authRateLimit, firebaseAuth);
authRoutes.get('/me', requireAuth, me);
