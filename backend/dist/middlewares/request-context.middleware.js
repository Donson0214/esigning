"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestContext = requestContext;
const crypto_1 = require("crypto");
function requestContext(req, res, next) {
    const requestId = req.header('x-request-id') ?? (0, crypto_1.randomUUID)();
    const correlationId = req.header('x-correlation-id') ?? req.header('x-client-mutation-id') ?? requestId;
    req.requestId = requestId;
    req.correlationId = correlationId;
    res.setHeader('x-request-id', requestId);
    res.setHeader('x-correlation-id', correlationId);
    next();
}
