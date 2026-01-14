import bcrypt from 'bcrypt';
import { prisma } from '../../config/prisma';
import { UserRole, type Prisma } from '@prisma/client';
import type { FirebaseAuthInput, LoginInput, RegisterInput } from './auth.types';
import { createHttpError } from '../../utils/http-error.util';
import { signAccessToken } from '../../utils/token.util';
import { generateToken } from '../../utils/crypto.util';
import { verifyFirebaseIdToken } from '../../utils/firebase-token.util';

function buildAuthResponse(user: {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  jobTitle?: string | null;
  photoUrl?: string | null;
}) {
  const token = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });
  return {
    user,
    token,
  };
}

export async function register(input: RegisterInput) {
  const email = input.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw createHttpError(409, 'EMAIL_IN_USE', 'Email already registered');
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: input.name ?? null,
    },
    select: { id: true, email: true, name: true, role: true, jobTitle: true, photoUrl: true },
  });

  return buildAuthResponse(user);
}

export async function login(input: LoginInput) {
  const email = input.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw createHttpError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const valid = await bcrypt.compare(input.password, user.password);
  if (!valid) {
    throw createHttpError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  return buildAuthResponse({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    jobTitle: user.jobTitle ?? null,
    photoUrl: user.photoUrl ?? null,
  });
}

export async function firebaseLogin(input: FirebaseAuthInput) {
  const payload = await verifyFirebaseIdToken(input.idToken);
  const email = payload.email?.toLowerCase();
  if (!email) {
    throw createHttpError(400, 'EMAIL_REQUIRED', 'Firebase token is missing an email');
  }
  const displayName = typeof payload.name === 'string' ? payload.name.trim() : '';
  const photoUrl = typeof payload.picture === 'string' ? payload.picture.trim() : '';
  const requestedName = input.name?.trim() ?? '';
  const name = displayName || requestedName || null;

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true, role: true, jobTitle: true, photoUrl: true },
  });

  if (existing) {
    const data: Prisma.UserUpdateInput = {};
    if (name && name !== existing.name) {
      data.name = name;
    }
    if (photoUrl && photoUrl !== existing.photoUrl) {
      data.photoUrl = photoUrl;
    }
    const updated = Object.keys(data).length
      ? await prisma.user.update({
          where: { id: existing.id },
          data,
          select: { id: true, email: true, name: true, role: true, jobTitle: true, photoUrl: true },
        })
      : existing;
    return buildAuthResponse(updated);
  }

  const hashedPassword = await bcrypt.hash(generateToken(), 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      photoUrl: photoUrl || null,
    },
    select: { id: true, email: true, name: true, role: true, jobTitle: true, photoUrl: true },
  });

  return buildAuthResponse(user);
}
