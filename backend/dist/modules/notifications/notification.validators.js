"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationPreferencesSchema = exports.notificationReadSchema = void 0;
const zod_1 = require("zod");
exports.notificationReadSchema = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.string().min(1)).optional(),
    all: zod_1.z.boolean().optional(),
});
exports.notificationPreferencesSchema = zod_1.z.object({
    emailEnabled: zod_1.z.boolean().optional(),
    realtimeEnabled: zod_1.z.boolean().optional(),
    inAppEnabled: zod_1.z.boolean().optional(),
    eventOverrides: zod_1.z.record(zod_1.z.string(), zod_1.z.boolean()).optional(),
});
