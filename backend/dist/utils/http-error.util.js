"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpError = createHttpError;
function createHttpError(status, code, message) {
    const err = new Error(message);
    err.status = status;
    err.code = code;
    return err;
}
