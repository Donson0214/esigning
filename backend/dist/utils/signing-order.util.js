"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSignerInOrder = isSignerInOrder;
const client_1 = require("@prisma/client");
function isSignerInOrder(signers, signerId) {
    const pending = signers.filter((signer) => signer.status !== client_1.SignerStatus.SIGNED && signer.status !== client_1.SignerStatus.DECLINED);
    if (pending.length === 0)
        return true;
    const next = pending.sort((a, b) => a.signOrder - b.signOrder)[0];
    return next?.id === signerId;
}
