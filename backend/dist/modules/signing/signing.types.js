"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitSignatureSchema = void 0;
const zod_1 = require("zod");
exports.submitSignatureSchema = zod_1.z.object({
    signatures: zod_1.z
        .array(zod_1.z.object({
        fieldId: zod_1.z.string().uuid(),
        value: zod_1.z.string().min(1),
    }))
        .min(1),
});
