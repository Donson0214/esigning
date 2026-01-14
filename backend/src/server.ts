import { env } from './config/env';
import { logger } from './utils/logger.util';
import { prisma } from './config/prisma';
import { createApp } from './app';
import { createServer } from 'http';
import { initSocketServer } from './realtime/socket';

export async function startServer() {
  // quick DB check
  await prisma.$queryRaw`SELECT 1`;

  const app = createApp();
  const server = createServer(app);
  initSocketServer(server);
  server.listen(env.port, () => {
    logger.info({ port: env.port }, 'Server listening');
  });

  const shutdown = async () => {
    logger.info('Shutting down...');
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
