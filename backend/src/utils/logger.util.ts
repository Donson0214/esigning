import pino from 'pino';
import { env } from '../config/env';

export const logger = pino({
  level: env.nodeEnv === 'production' ? 'info' : 'debug',
  redact: [
    'req.headers.authorization',
    'req.headers.cookie',
    'req.body.password',
    'req.body.token',
    'req.body.signatures',
    'req.body.signature',
    'req.body.signatureData',
    'req.body.artifact',
    'req.body.signingToken',
  ],
});
