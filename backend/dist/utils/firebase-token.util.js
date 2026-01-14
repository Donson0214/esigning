"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFirebaseIdToken = verifyFirebaseIdToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const http_error_util_1 = require("./http-error.util");
const CERTS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
let cachedCerts = {};
let cacheExpiresAt = 0;
function parseMaxAge(cacheControl) {
    if (!cacheControl)
        return 3600;
    const match = cacheControl.match(/max-age=(\d+)/i);
    if (!match)
        return 3600;
    const value = Number(match[1]);
    return Number.isFinite(value) && value > 0 ? value : 3600;
}
async function getFirebaseCerts() {
    if (Date.now() < cacheExpiresAt && Object.keys(cachedCerts).length > 0) {
        return cachedCerts;
    }
    const response = await fetch(CERTS_URL);
    if (!response.ok) {
        throw (0, http_error_util_1.createHttpError)(503, 'FIREBASE_CERTS_UNAVAILABLE', 'Unable to verify Firebase token');
    }
    const maxAgeSeconds = parseMaxAge(response.headers.get('cache-control'));
    cacheExpiresAt = Date.now() + maxAgeSeconds * 1000;
    cachedCerts = (await response.json());
    return cachedCerts;
}
async function verifyFirebaseIdToken(idToken) {
    if (!env_1.env.firebase.projectId) {
        throw (0, http_error_util_1.createHttpError)(500, 'FIREBASE_NOT_CONFIGURED', 'Firebase auth is not configured');
    }
    const decoded = jsonwebtoken_1.default.decode(idToken, { complete: true });
    if (!decoded || typeof decoded === 'string') {
        throw (0, http_error_util_1.createHttpError)(401, 'INVALID_TOKEN', 'Invalid Firebase token');
    }
    const kid = decoded.header?.kid;
    if (!kid) {
        throw (0, http_error_util_1.createHttpError)(401, 'INVALID_TOKEN', 'Invalid Firebase token');
    }
    const certs = await getFirebaseCerts();
    const cert = certs[kid];
    if (!cert) {
        throw (0, http_error_util_1.createHttpError)(401, 'INVALID_TOKEN', 'Unknown Firebase token key');
    }
    try {
        const issuer = `https://securetoken.google.com/${env_1.env.firebase.projectId}`;
        return jsonwebtoken_1.default.verify(idToken, cert, {
            algorithms: ['RS256'],
            audience: env_1.env.firebase.projectId,
            issuer,
        });
    }
    catch {
        throw (0, http_error_util_1.createHttpError)(401, 'INVALID_TOKEN', 'Invalid Firebase token');
    }
}
