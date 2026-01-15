import { z } from 'zod';

export const submitSignatureSchema = z.object({
  signatures: z
    .array(
      z.object({
        fieldId: z.string(),
        value: z.string().optional().default(''),
      }),
    )
    .optional()
    .default([]),
});

export const createSigningSessionSchema = z.object({
  clientMutationId: z.string().optional(),
});

export const submitManifestSchema = z.object({
  signingSessionId: z.string().optional().default(''),
  fields: z
    .array(
      z.object({
        fieldId: z.string(),
        value: z.string().optional().default(''),
      }),
    )
    .optional()
    .default([]),
});

export const uploadSignatureSchema = z.object({
  signingSessionId: z.string().optional().default(''),
  type: z.enum(['DRAWN', 'TYPED', 'UPLOADED']).optional().default('TYPED'),
  data: z.string().optional().default(''),
});

export const applySignatureSchema = z.object({
  signingSessionId: z.string().optional().default(''),
});

export const createSignerFieldSchema = z.object({
  type: z.string().optional(),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  value: z.string().optional(),
  options: z.any().optional(),
  page: z.any().optional(),
  x: z.any().optional(),
  y: z.any().optional(),
  width: z.any().optional(),
  height: z.any().optional(),
}).passthrough();

export type SubmitSignatureInput = z.infer<typeof submitSignatureSchema>;
export type CreateSigningSessionInput = z.infer<typeof createSigningSessionSchema>;
export type SubmitManifestInput = z.infer<typeof submitManifestSchema>;
export type UploadSignatureInput = z.infer<typeof uploadSignatureSchema>;
export type ApplySignatureInput = z.infer<typeof applySignatureSchema>;
export type CreateSignerFieldInput = z.infer<typeof createSignerFieldSchema>;
