import { env } from './config/env';
import { logger } from './utils/logger.util';
import { prisma } from './config/prisma';
import { createApp } from './app';
<<<<<<< HEAD
=======
import { createServer } from 'http';
import { initSocketServer } from './realtime/socket';
>>>>>>> e054afa1 (Save 1)

export async function startServer() {
  // quick DB check
  await prisma.$queryRaw`SELECT 1`;

  const app = createApp();
<<<<<<< HEAD
  const server = app.listen(env.port, () => {
=======
  const server = createServer(app);
  initSocketServer(server);
  server.listen(env.port, () => {
>>>>>>> e054afa1 (Save 1)
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
