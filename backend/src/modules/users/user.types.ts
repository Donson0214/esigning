import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  jobTitle: z.string().min(1).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
