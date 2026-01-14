import { z } from 'zod';

export const submitSignatureSchema = z.object({
  signatures: z
    .array(
      z.object({
        fieldId: z.string().uuid(),
        value: z.string().min(1),
      }),
    )
    .min(1),
});

<<<<<<< HEAD
export type SubmitSignatureInput = z.infer<typeof submitSignatureSchema>;
=======
export const createSigningSessionSchema = z.object({
  clientMutationId: z.string().uuid().optional(),
});

export const submitManifestSchema = z.object({
  signingSessionId: z.string().uuid(),
  fields: z
    .array(
      z.object({
        fieldId: z.string().uuid(),
        value: z.string().min(1),
      }),
    )
    .min(1),
});

export const uploadSignatureSchema = z.object({
  signingSessionId: z.string().uuid(),
  type: z.enum(['DRAWN', 'TYPED', 'UPLOADED']),
  data: z.string().min(1),
});

export const applySignatureSchema = z.object({
  signingSessionId: z.string().uuid(),
});

export type SubmitSignatureInput = z.infer<typeof submitSignatureSchema>;
export type CreateSigningSessionInput = z.infer<typeof createSigningSessionSchema>;
export type SubmitManifestInput = z.infer<typeof submitManifestSchema>;
export type UploadSignatureInput = z.infer<typeof uploadSignatureSchema>;
export type ApplySignatureInput = z.infer<typeof applySignatureSchema>;
>>>>>>> e054afa1 (Save 1)
