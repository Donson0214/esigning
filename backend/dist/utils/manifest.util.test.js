"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const manifest_util_1 = require("./manifest.util");
(0, vitest_1.describe)('computeManifestHash', () => {
    (0, vitest_1.it)('produces stable hashes for reordered keys', () => {
        const first = {
            docId: 'doc-1',
            signerId: 'signer-1',
            fields: [{ fieldId: 'a', value: 'sig' }],
        };
        const second = {
            signerId: 'signer-1',
            fields: [{ fieldId: 'a', value: 'sig' }],
            docId: 'doc-1',
        };
        (0, vitest_1.expect)((0, manifest_util_1.computeManifestHash)(first).hash).toBe((0, manifest_util_1.computeManifestHash)(second).hash);
    });
    (0, vitest_1.it)('changes hash when values change', () => {
        const base = {
            docId: 'doc-1',
            signerId: 'signer-1',
            fields: [{ fieldId: 'a', value: 'sig' }],
        };
        const changed = {
            docId: 'doc-1',
            signerId: 'signer-1',
            fields: [{ fieldId: 'a', value: 'sig-2' }],
        };
        (0, vitest_1.expect)((0, manifest_util_1.computeManifestHash)(base).hash).not.toBe((0, manifest_util_1.computeManifestHash)(changed).hash);
    });
});
