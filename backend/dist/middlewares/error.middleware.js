"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
exports.errorHandler = errorHandler;
const logger_util_1 = require("../utils/logger.util");
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
    res.status(status).json({
        error: err?.code ?? 'INTERNAL_ERROR',
        message: err?.message ?? 'Something went wrong',
        requestId: req.requestId,
    });
}
