"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const client_1 = require("@prisma/client");
const signing_order_util_1 = require("./signing-order.util");
(0, vitest_1.describe)('isSignerInOrder', () => {
    (0, vitest_1.it)('allows the next pending signer', () => {
        const signers = [
            { id: 'a', status: client_1.SignerStatus.SIGNED, signOrder: 1 },
            { id: 'b', status: client_1.SignerStatus.VIEWED, signOrder: 2 },
            { id: 'c', status: client_1.SignerStatus.PENDING, signOrder: 3 },
        ];
        (0, vitest_1.expect)((0, signing_order_util_1.isSignerInOrder)(signers, 'b')).toBe(true);
    });
    (0, vitest_1.it)('rejects out-of-order signers', () => {
        const signers = [
            { id: 'a', status: client_1.SignerStatus.PENDING, signOrder: 1 },
            { id: 'b', status: client_1.SignerStatus.PENDING, signOrder: 2 },
        ];
        (0, vitest_1.expect)((0, signing_order_util_1.isSignerInOrder)(signers, 'b')).toBe(false);
    });
    (0, vitest_1.it)('allows any signer when none are pending', () => {
        const signers = [
            { id: 'a', status: client_1.SignerStatus.SIGNED, signOrder: 1 },
            { id: 'b', status: client_1.SignerStatus.DECLINED, signOrder: 2 },
        ];
        (0, vitest_1.expect)((0, signing_order_util_1.isSignerInOrder)(signers, 'b')).toBe(true);
    });
});
