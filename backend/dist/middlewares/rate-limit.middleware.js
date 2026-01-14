"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signingRateLimit = exports.authRateLimit = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("../config/env");
const baseConfig = {
    windowMs: env_1.env.rateLimit.windowMs,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'RATE_LIMITED', message: 'Too many requests' },
};
exports.authRateLimit = (0, express_rate_limit_1.default)({
    ...baseConfig,
    max: env_1.env.rateLimit.authMax,
});
exports.signingRateLimit = (0, express_rate_limit_1.default)({
    ...baseConfig,
    max: env_1.env.rateLimit.signingMax,
});
