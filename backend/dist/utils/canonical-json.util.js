"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stableStringify = stableStringify;
function sortKeys(value) {
    return Object.keys(value)
        .sort()
        .reduce((acc, key) => {
        acc[key] = value[key];
        return acc;
    }, {});
}
function stableStringify(value) {
    if (value === null || value === undefined) {
        return JSON.stringify(value);
    }
    if (Array.isArray(value)) {
        return `[${value.map((item) => stableStringify(item)).join(',')}]`;
    }
    if (typeof value === 'object') {
        const sorted = sortKeys(value);
        return `{${Object.keys(sorted)
            .map((key) => `${JSON.stringify(key)}:${stableStringify(sorted[key])}`)
            .join(',')}}`;
    }
    return JSON.stringify(value);
}
