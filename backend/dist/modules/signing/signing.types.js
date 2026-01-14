"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySignatureSchema = exports.uploadSignatureSchema = exports.submitManifestSchema = exports.createSigningSessionSchema = exports.submitSignatureSchema = void 0;
const zod_1 = require("zod");
exports.submitSignatureSchema = zod_1.z.object({
    signatures: zod_1.z
        .array(zod_1.z.object({
        fieldId: zod_1.z.string().uuid(),
        value: zod_1.z.string().min(1),
    }))
        .min(1),
});
exports.createSigningSessionSchema = zod_1.z.object({
    clientMutationId: zod_1.z.string().uuid().optional(),
});
exports.submitManifestSchema = zod_1.z.object({
    signingSessionId: zod_1.z.string().uuid(),
    fields: zod_1.z
        .array(zod_1.z.object({
        fieldId: zod_1.z.string().uuid(),
        value: zod_1.z.string().min(1),
    }))
        .min(1),
});
exports.uploadSignatureSchema = zod_1.z.object({
    signingSessionId: zod_1.z.string().uuid(),
    type: zod_1.z.enum(['DRAWN', 'TYPED', 'UPLOADED']),
    data: zod_1.z.string().min(1),
});
exports.applySignatureSchema = zod_1.z.object({
    signingSessionId: zod_1.z.string().uuid(),
});
