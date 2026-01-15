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
    ),
});

export const uploadSignatureSchema = z.object({
  signingSessionId: z.string().uuid(),
  type: z.enum(['DRAWN', 'TYPED', 'UPLOADED']),
  data: z.string().min(1),
});

export const applySignatureSchema = z.object({
  signingSessionId: z.string().uuid(),
});

export const createSignerFieldSchema = z.object({
  type: z.enum([
    'SIGNATURE',
    'DATE',
    'INITIAL',
    'FULL_NAME',
    'EMAIL',
    'TEXT',
    'CHECKBOX',
    'DROPDOWN',
    'RADIO',
    'COMPANY',
    'JOB_TITLE',
    'IMAGE',
    'ATTACHMENT',
  ]),
  label: z.string().min(1).optional(),
  placeholder: z.string().min(1).optional(),
  required: z.boolean().optional(),
  value: z.string().optional(),
  options: z.record(z.string(), z.any()).optional(),
  page: z.number().int().min(1),
  x: z.number().min(0),
  y: z.number().min(0),
  width: z.number().min(1),
  height: z.number().min(1),
});

export type SubmitSignatureInput = z.infer<typeof submitSignatureSchema>;
export type CreateSigningSessionInput = z.infer<typeof createSigningSessionSchema>;
export type SubmitManifestInput = z.infer<typeof submitManifestSchema>;
export type UploadSignatureInput = z.infer<typeof uploadSignatureSchema>;
export type ApplySignatureInput = z.infer<typeof applySignatureSchema>;
export type CreateSignerFieldInput = z.infer<typeof createSignerFieldSchema>;
