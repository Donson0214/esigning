"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBuffer = fetchBuffer;
const http_error_util_1 = require("./http-error.util");
async function fetchBuffer(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw (0, http_error_util_1.createHttpError)(502, 'FILE_FETCH_FAILED', `Unable to fetch file (${response.status})`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
}
