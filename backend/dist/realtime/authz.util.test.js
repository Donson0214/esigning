"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const authz_util_1 = require("./authz.util");
(0, vitest_1.describe)('isDocAccessAllowed', () => {
    (0, vitest_1.it)('allows access for the owning user', () => {
        (0, vitest_1.expect)((0, authz_util_1.isDocAccessAllowed)('owner-1', 'owner-1')).toBe(true);
    });
    (0, vitest_1.it)('denies access for a different user', () => {
        (0, vitest_1.expect)((0, authz_util_1.isDocAccessAllowed)('owner-1', 'user-2')).toBe(false);
    });
});
