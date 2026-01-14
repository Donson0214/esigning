"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFieldSchema = exports.createFieldSchema = exports.sendDocumentSchema = exports.createDocumentSchema = void 0;
const zod_1 = require("zod");
exports.createDocumentSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
});
const signerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    email: zod_1.z.string().email(),
    order: zod_1.z.number().int().min(1).optional(),
});
const fieldSchema = zod_1.z
    .object({
    signerEmail: zod_1.z.string().email().optional(),
    signerIndex: zod_1.z.number().int().min(0).optional(),
    type: zod_1.z.enum([
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
    label: zod_1.z.string().min(1).optional(),
    placeholder: zod_1.z.string().min(1).optional(),
    required: zod_1.z.boolean().optional(),
    value: zod_1.z.string().optional(),
    options: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
    page: zod_1.z.number().int().min(1),
    x: zod_1.z.number().min(0),
    y: zod_1.z.number().min(0),
    width: zod_1.z.number().min(1),
    height: zod_1.z.number().min(1),
})
    .refine((value) => value.signerEmail || value.signerIndex !== undefined, {
    message: 'signerEmail or signerIndex is required',
    path: ['signerEmail'],
});
exports.sendDocumentSchema = zod_1.z.object({
    signers: zod_1.z.array(signerSchema).min(1),
    fields: zod_1.z.array(fieldSchema).min(1).optional(),
});
exports.createFieldSchema = fieldSchema;
exports.updateFieldSchema = zod_1.z.object({
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
});
