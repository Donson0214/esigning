"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signingRoutes = void 0;
const express_1 = require("express");
const signing_controller_1 = require("./signing.controller");
exports.signingRoutes = (0, express_1.Router)();
exports.signingRoutes.get('/:token', signing_controller_1.viewSigningSession);
exports.signingRoutes.post('/:token/submit', signing_controller_1.submitSigning);
