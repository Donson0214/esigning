import { prisma } from '../../config/prisma';

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      jobTitle: true,
      photoUrl: true,
      createdAt: true,
    },
  });
}

export async function updateUser(
  id: string,
  data: { name?: string; jobTitle?: string },
) {
  return prisma.user.update({
    where: { id },
    data: {
      name: data.name ?? undefined,
      jobTitle: data.jobTitle ?? undefined,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      jobTitle: true,
      photoUrl: true,
      createdAt: true,
    },
  });
}
