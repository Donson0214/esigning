import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

const baseConfig = {
  windowMs: env.rateLimit.windowMs,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'RATE_LIMITED', message: 'Too many requests' },
};

export const authRateLimit = rateLimit({
  ...baseConfig,
  max: env.rateLimit.authMax,
});

export const signingRateLimit = rateLimit({
  ...baseConfig,
  max: env.rateLimit.signingMax,
});
