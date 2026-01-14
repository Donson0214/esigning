"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSigningToken = requireSigningToken;
const prisma_1 = require("../config/prisma");
const crypto_util_1 = require("../utils/crypto.util");
async function requireSigningToken(req, res, next) {
    const token = req.header('x-signing-token') ??
        (typeof req.query.token === 'string' ? req.query.token : undefined) ??
        (typeof req.body?.signingToken === 'string' ? req.body.signingToken : undefined);
    if (!token) {
        return res.status(401).json({ error: 'SIGNING_TOKEN_REQUIRED' });
    }
    const signer = await prisma_1.prisma.signer.findFirst({
        where: { signingTokenHash: (0, crypto_util_1.hashToken)(token) },
        select: { id: true, email: true, documentId: true, signingTokenExpiresAt: true },
    });
    if (!signer) {
        return res.status(404).json({ error: 'SIGNING_LINK_INVALID' });
    }
    if (signer.signingTokenExpiresAt && signer.signingTokenExpiresAt < new Date()) {
        return res.status(410).json({ error: 'SIGNING_LINK_EXPIRED' });
    }
    req.signer = { id: signer.id, email: signer.email, documentId: signer.documentId };
    return next();
}
