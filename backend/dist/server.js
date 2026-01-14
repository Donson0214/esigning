"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const env_1 = require("./config/env");
const logger_util_1 = require("./utils/logger.util");
const prisma_1 = require("./config/prisma");
const app_1 = require("./app");
async function startServer() {
    // quick DB check
    await prisma_1.prisma.$queryRaw `SELECT 1`;
    const app = (0, app_1.createApp)();
    const server = app.listen(env_1.env.port, () => {
        logger_util_1.logger.info({ port: env_1.env.port }, 'Server listening');
    });
    const shutdown = async () => {
        logger_util_1.logger.info('Shutting down...');
        server.close();
        await prisma_1.prisma.$disconnect();
        process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}
