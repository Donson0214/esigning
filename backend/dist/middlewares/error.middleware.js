"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
exports.errorHandler = errorHandler;
const logger_util_1 = require("../utils/logger.util");
const socket_1 = require("../realtime/socket");
const events_1 = require("../shared/events");
function notFound(req, res) {
    res.status(404).json({ error: 'NOT_FOUND', path: req.path });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err, req, res, next) {
    logger_util_1.logger.error({ err, requestId: req.requestId }, 'Unhandled error');
    if (err?.name === 'ZodError') {
        return res.status(400).json({
            error: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: err.errors,
            requestId: req.requestId,
        });
    }
    const status = typeof err?.status === 'number' ? err.status : 500;
    if (req.user) {
        const docParam = req.params?.docId ?? req.params?.id;
        const docId = typeof docParam === 'string' ? docParam : undefined;
        const reasonCode = err?.code ?? 'INTERNAL_ERROR';
        if (docId) {
            void (0, socket_1.emitEvent)((0, events_1.createEvent)({
                event: 'error.occurred',
                orgId: req.user.id,
                docId,
                actor: { userId: req.user.id, role: req.user.role, email: req.user.email },
                correlationId: req.correlationId,
                data: {
                    code: reasonCode,
                    message: err?.message ?? 'Something went wrong',
                    scope: 'doc',
                },
            }));
        }
    }
    res.status(status).json({
        error: err?.code ?? 'INTERNAL_ERROR',
        message: err?.message ?? 'Something went wrong',
        requestId: req.requestId,
    });
}
