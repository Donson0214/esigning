"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_controller_1 = require("./user.controller");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.get('/me', auth_middleware_1.requireAuth, user_controller_1.me);
