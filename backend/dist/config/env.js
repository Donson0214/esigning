"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
function requireEnv(name) {
    const v = process.env[name];
    if (!v)
        throw new Error(`Missing env var: ${name}`);
    return v;
}
exports.env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 4000),
    databaseUrl: requireEnv('DATABASE_URL'),
    corsOrigin: process.env.CORS_ORIGIN ?? '*',
    jwtSecret: requireEnv('JWT_SECRET'),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    signingAppUrl: process.env.SIGNING_APP_URL ?? 'http://localhost:5173/sign',
    signingLinkTtlMinutes: Number(process.env.SIGNING_LINK_TTL_MINUTES ?? 60 * 24),
    cloudinary: {
        cloudName: requireEnv('CLOUDINARY_CLOUD_NAME'),
        apiKey: requireEnv('CLOUDINARY_API_KEY'),
        apiSecret: requireEnv('CLOUDINARY_API_SECRET'),
    },
    smtp: {
        host: requireEnv('SMTP_HOST'),
        port: Number(process.env.SMTP_PORT ?? 587),
        user: requireEnv('SMTP_USER'),
        pass: requireEnv('SMTP_PASS'),
        from: requireEnv('SMTP_FROM'),
    },
};
