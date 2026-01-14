"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./modules/auth/auth.routes");
const document_routes_1 = require("./modules/documents/document.routes");
const signing_routes_1 = require("./modules/signing/signing.routes");
const user_routes_1 = require("./modules/users/user.routes");
exports.routes = (0, express_1.Router)();
exports.routes.get('/health', (_req, res) => {
    res.json({ ok: true });
});
exports.routes.use('/auth', auth_routes_1.authRoutes);
exports.routes.use('/users', user_routes_1.userRoutes);
exports.routes.use('/documents', document_routes_1.documentRoutes);
exports.routes.use('/sign', signing_routes_1.signingRoutes);
