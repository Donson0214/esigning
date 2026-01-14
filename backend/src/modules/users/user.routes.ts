import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { me, updateMe } from './user.controller';

export const userRoutes = Router();

userRoutes.get('/me', requireAuth, me);
userRoutes.patch('/me', requireAuth, updateMe);
