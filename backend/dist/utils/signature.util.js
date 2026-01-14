"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDataUrl = parseDataUrl;
function parseDataUrl(input) {
    const match = /^data:([^;]+);base64,(.+)$/.exec(input);
    if (!match)
        return null;
    const [, mimeType, data] = match;
    if (!mimeType || !data)
        return null;
    try {
        const buffer = Buffer.from(data, 'base64');
        return { mimeType, buffer };
    }
    catch {
        return null;
    }
}
