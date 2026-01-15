"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSignerFieldSchema = exports.applySignatureSchema = exports.uploadSignatureSchema = exports.submitManifestSchema = exports.createSigningSessionSchema = exports.submitSignatureSchema = void 0;
const zod_1 = require("zod");
exports.submitSignatureSchema = zod_1.z.object({
    signatures: zod_1.z
        .array(zod_1.z.object({
        fieldId: zod_1.z.string(),
        value: zod_1.z.string().optional().default(''),
    }))
        .optional()
        .default([]),
});
exports.createSigningSessionSchema = zod_1.z.object({
    clientMutationId: zod_1.z.string().optional(),
});
exports.submitManifestSchema = zod_1.z.object({
    signingSessionId: zod_1.z.string().optional().default(''),
    fields: zod_1.z
        .array(zod_1.z.object({
        fieldId: zod_1.z.string(),
        value: zod_1.z.string().optional().default(''),
    }))
        .optional()
        .default([]),
});
exports.uploadSignatureSchema = zod_1.z.object({
    signingSessionId: zod_1.z.string().optional().default(''),
    type: zod_1.z.enum(['DRAWN', 'TYPED', 'UPLOADED']).optional().default('TYPED'),
    data: zod_1.z.string().optional().default(''),
});
exports.applySignatureSchema = zod_1.z.object({
    signingSessionId: zod_1.z.string().optional().default(''),
});
exports.createSignerFieldSchema = zod_1.z.object({
    type: zod_1.z.string().optional(),
    label: zod_1.z.string().optional(),
    placeholder: zod_1.z.string().optional(),
    required: zod_1.z.boolean().optional(),
    value: zod_1.z.string().optional(),
    options: zod_1.z.any().optional(),
    page: zod_1.z.any().optional(),
    x: zod_1.z.any().optional(),
    y: zod_1.z.any().optional(),
    width: zod_1.z.any().optional(),
    height: zod_1.z.any().optional(),
}).passthrough();
