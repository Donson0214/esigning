"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.firebaseLogin = firebaseLogin;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../config/prisma");
const http_error_util_1 = require("../../utils/http-error.util");
const token_util_1 = require("../../utils/token.util");
const crypto_util_1 = require("../../utils/crypto.util");
const firebase_token_util_1 = require("../../utils/firebase-token.util");
function buildAuthResponse(user) {
    const token = (0, token_util_1.signAccessToken)({
        sub: user.id,
        email: user.email,
        role: user.role,
    });
    return {
        user,
        token,
    };
}
async function register(input) {
    const email = input.email.toLowerCase();
    const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (existing) {
        throw (0, http_error_util_1.createHttpError)(409, 'EMAIL_IN_USE', 'Email already registered');
    }
    const hashedPassword = await bcrypt_1.default.hash(input.password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name: input.name ?? null,
        },
        select: { id: true, email: true, name: true, role: true, jobTitle: true, photoUrl: true },
    });
    return buildAuthResponse(user);
}
async function login(input) {
    const email = input.email.toLowerCase();
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw (0, http_error_util_1.createHttpError)(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }
    const valid = await bcrypt_1.default.compare(input.password, user.password);
    if (!valid) {
        throw (0, http_error_util_1.createHttpError)(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }
    return buildAuthResponse({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        jobTitle: user.jobTitle ?? null,
        photoUrl: user.photoUrl ?? null,
    });
}
async function firebaseLogin(input) {
    const payload = await (0, firebase_token_util_1.verifyFirebaseIdToken)(input.idToken);
    const email = payload.email?.toLowerCase();
    if (!email) {
        throw (0, http_error_util_1.createHttpError)(400, 'EMAIL_REQUIRED', 'Firebase token is missing an email');
    }
    const displayName = typeof payload.name === 'string' ? payload.name.trim() : '';
    const photoUrl = typeof payload.picture === 'string' ? payload.picture.trim() : '';
    const requestedName = input.name?.trim() ?? '';
    const name = displayName || requestedName || null;
    const existing = await prisma_1.prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, name: true, role: true, jobTitle: true, photoUrl: true },
    });
    if (existing) {
        const data = {};
        if (name && name !== existing.name) {
            data.name = name;
        }
        if (photoUrl && photoUrl !== existing.photoUrl) {
            data.photoUrl = photoUrl;
        }
        const updated = Object.keys(data).length
            ? await prisma_1.prisma.user.update({
                where: { id: existing.id },
                data,
                select: { id: true, email: true, name: true, role: true, jobTitle: true, photoUrl: true },
            })
            : existing;
        return buildAuthResponse(updated);
    }
    const hashedPassword = await bcrypt_1.default.hash((0, crypto_util_1.generateToken)(), 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            photoUrl: photoUrl || null,
        },
        select: { id: true, email: true, name: true, role: true, jobTitle: true, photoUrl: true },
    });
    return buildAuthResponse(user);
}
