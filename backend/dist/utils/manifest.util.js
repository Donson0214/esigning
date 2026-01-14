"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeManifestHash = computeManifestHash;
const canonical_json_util_1 = require("./canonical-json.util");
const hash_util_1 = require("./hash.util");
function computeManifestHash(manifest) {
    const canonical = (0, canonical_json_util_1.stableStringify)(manifest);
    return { canonical, hash: (0, hash_util_1.hashString)(canonical) };
}
