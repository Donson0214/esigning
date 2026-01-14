"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = me;
exports.updateMe = updateMe;
const user_service_1 = require("./user.service");
const http_error_util_1 = require("../../utils/http-error.util");
const user_types_1 = require("./user.types");
async function me(req, res, next) {
    try {
        const user = await (0, user_service_1.getUserById)(req.user.id);
        if (!user) {
            throw (0, http_error_util_1.createHttpError)(404, 'USER_NOT_FOUND', 'User not found');
        }
        res.json({ user });
    }
    catch (err) {
        next(err);
    }
}
async function updateMe(req, res, next) {
    try {
        const input = user_types_1.updateUserSchema.parse(req.body);
        const user = await (0, user_service_1.updateUser)(req.user.id, input);
        res.json({ user });
    }
    catch (err) {
        next(err);
    }
}
