import type { Request, Response, NextFunction } from 'express';
<<<<<<< HEAD
import { loginSchema, registerSchema } from './auth.types';
=======
import { firebaseAuthSchema, loginSchema, registerSchema } from './auth.types';
>>>>>>> e054afa1 (Save 1)
import * as authService from './auth.service';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const input = registerSchema.parse(req.body);
    const result = await authService.register(input);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const input = loginSchema.parse(req.body);
    const result = await authService.login(input);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

<<<<<<< HEAD
=======
export async function firebaseAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const input = firebaseAuthSchema.parse(req.body);
    const result = await authService.firebaseLogin(input);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

>>>>>>> e054afa1 (Save 1)
export async function me(req: Request, res: Response) {
  res.json({ user: req.user });
}
