"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const prisma_1 = require("../config/prisma");
const token_util_1 = require("../utils/token.util");
async function requireAuth(req, res, next) {
    const authHeader = req.header('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'UNAUTHORIZED' });
    }
    const token = authHeader.slice('Bearer '.length).trim();
    try {
        const payload = (0, token_util_1.verifyAccessToken)(token);
        const user = await prisma_1.prisma.user.findUnique({ where: { id: payload.sub } });
        if (!user) {
            return res.status(401).json({ error: 'UNAUTHORIZED' });
        }
        req.user = { id: user.id, email: user.email, role: user.role };
        return next();
    }
    catch {
        return res.status(401).json({ error: 'UNAUTHORIZED' });
    }
}
