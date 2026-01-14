"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = me;
const user_service_1 = require("./user.service");
const http_error_util_1 = require("../../utils/http-error.util");
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
