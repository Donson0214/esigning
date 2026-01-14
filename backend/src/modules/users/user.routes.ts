import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
<<<<<<< HEAD
import { me } from './user.controller';
=======
import { me, updateMe } from './user.controller';
>>>>>>> e054afa1 (Save 1)

export const userRoutes = Router();

userRoutes.get('/me', requireAuth, me);
<<<<<<< HEAD
=======
userRoutes.patch('/me', requireAuth, updateMe);
>>>>>>> e054afa1 (Save 1)
