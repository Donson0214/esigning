"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashBuffer = hashBuffer;
exports.hashString = hashString;
const crypto_util_1 = require("./crypto.util");
function hashBuffer(buffer) {
    return (0, crypto_util_1.sha256Hex)(buffer);
}
function hashString(value) {
    return (0, crypto_util_1.sha256Hex)(value);
}
