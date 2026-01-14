"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_VERSION = void 0;
exports.createEvent = createEvent;
const crypto_1 = require("crypto");
exports.EVENT_VERSION = '1.0';
function createEvent(params) {
    return {
        event: params.event,
        version: exports.EVENT_VERSION,
        id: (0, crypto_1.randomUUID)(),
        timestamp: new Date().toISOString(),
        orgId: params.orgId,
        docId: params.docId,
        actor: params.actor,
        correlationId: params.correlationId,
        data: params.data,
    };
}
