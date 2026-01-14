import { z } from 'zod';

export const notificationReadSchema = z.object({
  ids: z.array(z.string().min(1)).optional(),
  all: z.boolean().optional(),
});

export const notificationPreferencesSchema = z.object({
  emailEnabled: z.boolean().optional(),
  realtimeEnabled: z.boolean().optional(),
  inAppEnabled: z.boolean().optional(),
  eventOverrides: z.record(z.boolean()).optional(),
});
