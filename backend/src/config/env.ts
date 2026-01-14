import 'dotenv/config';

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: requireEnv('DATABASE_URL'),
<<<<<<< HEAD
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
  jwtSecret: requireEnv('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  signingAppUrl: process.env.SIGNING_APP_URL ?? 'http://localhost:5173/sign',
  signingLinkTtlMinutes: Number(process.env.SIGNING_LINK_TTL_MINUTES ?? 60 * 24),
=======
  corsOrigins: (process.env.CORS_ORIGIN ?? '*')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
  appBaseUrl: process.env.APP_BASE_URL ?? 'http://localhost:5173',
  jwtSecret: requireEnv('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID ?? '',
  },
  signingAppUrl: process.env.SIGNING_APP_URL ?? 'http://localhost:5173/sign',
  signingLinkTtlMinutes: Number(process.env.SIGNING_LINK_TTL_MINUTES ?? 60 * 24),
  signingSessionTtlMinutes: Number(process.env.SIGNING_SESSION_TTL_MINUTES ?? 30),
  manifestHmacSecret: process.env.MANIFEST_HMAC_SECRET ?? '',
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
    authMax: Number(process.env.RATE_LIMIT_AUTH_MAX ?? 50),
    signingMax: Number(process.env.RATE_LIMIT_SIGNING_MAX ?? 120),
  },
  realtime: {
    eventLimit: Number(process.env.REALTIME_EVENT_LIMIT ?? 50),
  },
>>>>>>> e054afa1 (Save 1)
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
