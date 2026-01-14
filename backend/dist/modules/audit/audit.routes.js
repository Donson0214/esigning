"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const audit_controller_1 = require("./audit.controller");
exports.auditRoutes = (0, express_1.Router)();
exports.auditRoutes.use(auth_middleware_1.requireAuth);
exports.auditRoutes.get('/', audit_controller_1.listAuditEvents);
