"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const mailer_1 = require("../config/mailer");
const env_1 = require("../config/env");
async function sendMail(input) {
    return mailer_1.mailer.sendMail({
        from: env_1.env.smtp.from,
        to: input.to,
        subject: input.subject,
        text: input.text,
        html: input.html,
    });
}
