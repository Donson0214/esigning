"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../config/prisma");
const http_error_util_1 = require("../../utils/http-error.util");
const token_util_1 = require("../../utils/token.util");
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
        select: { id: true, email: true, name: true, role: true },
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
    return buildAuthResponse({ id: user.id, email: user.email, name: user.name, role: user.role });
}
