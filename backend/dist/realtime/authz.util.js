"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDocAccessAllowed = isDocAccessAllowed;
function isDocAccessAllowed(documentOwnerId, userId) {
    return documentOwnerId === userId;
}
