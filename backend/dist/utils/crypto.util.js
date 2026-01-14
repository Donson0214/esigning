"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.sha256Hex = sha256Hex;
exports.hashToken = hashToken;
const crypto_1 = require("crypto");
function generateToken(bytes = 32) {
    return (0, crypto_1.randomBytes)(bytes).toString('base64url');
}
function sha256Hex(input) {
    return (0, crypto_1.createHash)('sha256').update(input).digest('hex');
}
function hashToken(token) {
    return sha256Hex(token);
}
