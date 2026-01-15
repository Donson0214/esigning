"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSigningSession = viewSigningSession;
exports.getSigningFile = getSigningFile;
exports.submitSigning = submitSigning;
const signing_types_1 = require("./signing.types");
const signingService = __importStar(require("./signing.service"));
function getParam(value) {
    return Array.isArray(value) ? value[0] : value;
}
const sanitizeFileName = (value) => value.replace(/["\\\r\n]/g, '_');
async function viewSigningSession(req, res, next) {
    try {
        const token = getParam(req.params.token);
        if (!token) {
            return res.status(400).json({ error: 'TOKEN_REQUIRED' });
        }
        const session = await signingService.viewSigningSession(token, {
            ipAddress: req.ip,
            userAgent: req.get('user-agent') ?? undefined,
            correlationId: req.correlationId,
        });
        res.json(session);
    }
    catch (err) {
        next(err);
    }
}
async function getSigningFile(req, res, next) {
    try {
        const token = getParam(req.params.token);
        if (!token) {
            return res.status(400).json({ error: 'TOKEN_REQUIRED' });
        }
        const file = await signingService.getSigningFile(token);
        res.setHeader('Content-Type', file.contentType);
        res.setHeader('Content-Disposition', `inline; filename="${sanitizeFileName(file.fileName)}"`);
        res.setHeader('Cache-Control', 'private, max-age=300');
        res.setHeader('Content-Length', file.buffer.length.toString());
        res.send(file.buffer);
    }
    catch (err) {
        next(err);
    }
}
async function submitSigning(req, res, next) {
    try {
        const payload = signing_types_1.submitSignatureSchema.parse(req.body ?? {});
        const token = getParam(req.params.token);
        if (!token) {
            return res.status(400).json({ error: 'TOKEN_REQUIRED' });
        }
        const result = await signingService.submitSigning(token, payload, {
            ipAddress: req.ip,
            userAgent: req.get('user-agent') ?? undefined,
            correlationId: req.correlationId,
        });
        res.json(result);
    }
    catch (err) {
        next(err);
    }
}
