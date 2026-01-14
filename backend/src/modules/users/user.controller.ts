import type { Request, Response, NextFunction } from 'express';
<<<<<<< HEAD
import { getUserById } from './user.service';
import { createHttpError } from '../../utils/http-error.util';
=======
import { getUserById, updateUser } from './user.service';
import { createHttpError } from '../../utils/http-error.util';
import { updateUserSchema } from './user.types';
>>>>>>> e054afa1 (Save 1)

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUserById(req.user!.id);
    if (!user) {
      throw createHttpError(404, 'USER_NOT_FOUND', 'User not found');
    }
    res.json({ user });
  } catch (err) {
    next(err);
  }
}
<<<<<<< HEAD
=======

export async function updateMe(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updateUserSchema.parse(req.body);
    const user = await updateUser(req.user!.id, input);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}
>>>>>>> e054afa1 (Save 1)
