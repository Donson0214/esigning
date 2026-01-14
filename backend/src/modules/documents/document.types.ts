import { z } from 'zod';

export const createDocumentSchema = z.object({
  title: z.string().min(1),
});

const signerSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email(),
  order: z.number().int().min(1).optional(),
});

const fieldSchema = z
  .object({
    signerEmail: z.string().email().optional(),
    signerIndex: z.number().int().min(0).optional(),
<<<<<<< HEAD
    type: z.enum(['SIGNATURE', 'DATE']),
=======
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
    options: z.record(z.any()).optional(),
>>>>>>> e054afa1 (Save 1)
    page: z.number().int().min(1),
    x: z.number().min(0),
    y: z.number().min(0),
    width: z.number().min(1),
    height: z.number().min(1),
  })
  .refine((value) => value.signerEmail || value.signerIndex !== undefined, {
    message: 'signerEmail or signerIndex is required',
    path: ['signerEmail'],
  });

export const sendDocumentSchema = z.object({
  signers: z.array(signerSchema).min(1),
<<<<<<< HEAD
  fields: z.array(fieldSchema).min(1),
=======
  fields: z.array(fieldSchema).min(1).optional(),
});

export const createFieldSchema = fieldSchema;

export const updateFieldSchema = z.object({
  type: fieldSchema.shape.type.optional(),
  label: fieldSchema.shape.label.optional(),
  placeholder: fieldSchema.shape.placeholder.optional(),
  required: fieldSchema.shape.required.optional(),
  value: fieldSchema.shape.value.optional(),
  options: fieldSchema.shape.options.optional(),
  page: fieldSchema.shape.page.optional(),
  x: fieldSchema.shape.x.optional(),
  y: fieldSchema.shape.y.optional(),
  width: fieldSchema.shape.width.optional(),
  height: fieldSchema.shape.height.optional(),
  signerEmail: fieldSchema.shape.signerEmail.optional(),
  signerIndex: fieldSchema.shape.signerIndex.optional(),
>>>>>>> e054afa1 (Save 1)
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type SendDocumentInput = z.infer<typeof sendDocumentSchema>;
<<<<<<< HEAD
=======
export type CreateFieldInput = z.infer<typeof createFieldSchema>;
export type UpdateFieldInput = z.infer<typeof updateFieldSchema>;
>>>>>>> e054afa1 (Save 1)
