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
exports.precomputeHash = precomputeHash;
exports.createSigningSession = createSigningSession;
exports.createSignerField = createSignerField;
exports.submitManifest = submitManifest;
exports.uploadSignature = uploadSignature;
exports.applySignature = applySignature;
exports.completeDocument = completeDocument;
exports.getAuditReport = getAuditReport;
const signing_types_1 = require("./signing.types");
const signingIntegrityService = __importStar(require("./signing-integrity.service"));
const events_1 = require("../../shared/events");
const socket_1 = require("../../realtime/socket");
const prisma_1 = require("../../config/prisma");
function getParam(value) {
    return Array.isArray(value) ? value[0] : value;
}
async function emitSignatureRejected(req, documentId, code, message) {
    if (!req.signer)
        return;
    const document = await prisma_1.prisma.document.findUnique({
        where: { id: documentId },
        select: { ownerId: true },
    });
    if (!document)
        return;
    void (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.signature.rejected',
        orgId: document.ownerId,
        docId: documentId,
        actor: { userId: req.signer.id, role: 'SIGNER', email: req.signer.email },
        correlationId: req.correlationId,
        data: { signerId: req.signer.id, reasonCode: code, message },
    }));
}
async function precomputeHash(req, res, next) {
    try {
        const documentId = getParam(req.params.docId);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        const result = await signingIntegrityService.precomputeDocumentHash(req.user.id, documentId, {
            ipAddress: req.ip,
            userAgent: req.get('user-agent') ?? undefined,
            correlationId: req.correlationId,
        });
        res.json(result);
    }
    catch (err) {
        const docId = getParam(req.params.docId);
        if (docId && err instanceof Error) {
            void emitSignatureRejected(req, docId, err.code ?? 'VALIDATION_FAILED', err.message);
        }
        next(err);
    }
}
async function createSigningSession(req, res, next) {
    try {
        const input = signing_types_1.createSigningSessionSchema.parse(req.body ?? {});
        const documentId = getParam(req.params.docId);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        if (!req.signer) {
            return res.status(401).json({ error: 'SIGNER_REQUIRED' });
        }
        const result = await signingIntegrityService.createSigningSession({
            documentId,
            signerId: req.signer.id,
            meta: {
                ipAddress: req.ip,
                userAgent: req.get('user-agent') ?? undefined,
                correlationId: req.correlationId,
                clientMutationId: input.clientMutationId,
            },
        });
        res.status(201).json(result);
    }
    catch (err) {
        const docId = getParam(req.params.docId);
        if (docId && err instanceof Error) {
            void emitSignatureRejected(req, docId, err.code ?? 'VALIDATION_FAILED', err.message);
        }
        next(err);
    }
}
async function createSignerField(req, res, next) {
    try {
        const input = signing_types_1.createSignerFieldSchema.parse(req.body ?? {});
        const documentId = getParam(req.params.docId);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        if (!req.signer) {
            return res.status(401).json({ error: 'SIGNER_REQUIRED' });
        }
        const result = await signingIntegrityService.createSignerField({
            documentId,
            signerId: req.signer.id,
            input,
            meta: {
                ipAddress: req.ip,
                userAgent: req.get('user-agent') ?? undefined,
                correlationId: req.correlationId,
            },
        });
        res.status(201).json(result);
    }
    catch (err) {
        const docId = getParam(req.params.docId);
        if (docId && err instanceof Error) {
            void emitSignatureRejected(req, docId, err.code ?? 'VALIDATION_FAILED', err.message);
        }
        next(err);
    }
}
async function submitManifest(req, res, next) {
    try {
        const input = signing_types_1.submitManifestSchema.parse(req.body ?? {});
        const documentId = getParam(req.params.docId);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        if (!req.signer) {
            return res.status(401).json({ error: 'SIGNER_REQUIRED' });
        }
        const result = await signingIntegrityService.submitManifest({
            documentId,
            signerId: req.signer.id,
            signingSessionId: input.signingSessionId,
            fields: input.fields,
            meta: {
                ipAddress: req.ip,
                userAgent: req.get('user-agent') ?? undefined,
                correlationId: req.correlationId,
            },
        });
        res.json(result);
    }
    catch (err) {
        const docId = getParam(req.params.docId);
        if (docId && err instanceof Error) {
            void emitSignatureRejected(req, docId, err.code ?? 'VALIDATION_FAILED', err.message);
        }
        next(err);
    }
}
async function uploadSignature(req, res, next) {
    try {
        const input = signing_types_1.uploadSignatureSchema.parse(req.body ?? {});
        const documentId = getParam(req.params.docId);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        if (!req.signer) {
            return res.status(401).json({ error: 'SIGNER_REQUIRED' });
        }
        const result = await signingIntegrityService.uploadSignatureArtifact({
            documentId,
            signerId: req.signer.id,
            signingSessionId: input.signingSessionId,
            type: input.type,
            data: input.data,
            meta: {
                ipAddress: req.ip,
                userAgent: req.get('user-agent') ?? undefined,
                correlationId: req.correlationId,
            },
        });
        res.json(result);
    }
    catch (err) {
        const docId = getParam(req.params.docId);
        if (docId && err instanceof Error) {
            void emitSignatureRejected(req, docId, err.code ?? 'VALIDATION_FAILED', err.message);
        }
        next(err);
    }
}
async function applySignature(req, res, next) {
    try {
        const input = signing_types_1.applySignatureSchema.parse(req.body ?? {});
        const documentId = getParam(req.params.docId);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        if (!req.signer) {
            return res.status(401).json({ error: 'SIGNER_REQUIRED' });
        }
        const result = await signingIntegrityService.applySignature({
            documentId,
            signerId: req.signer.id,
            signingSessionId: input.signingSessionId,
            meta: {
                ipAddress: req.ip,
                userAgent: req.get('user-agent') ?? undefined,
                correlationId: req.correlationId,
            },
        });
        res.json(result);
    }
    catch (err) {
        next(err);
    }
}
async function completeDocument(req, res, next) {
    try {
        const documentId = getParam(req.params.docId);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        const result = await signingIntegrityService.completeDocument(req.user.id, documentId, {
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
async function getAuditReport(req, res, next) {
    try {
        const documentId = getParam(req.params.docId);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        const report = await signingIntegrityService.getAuditReport(req.user.id, documentId);
        res.json(report);
    }
    catch (err) {
        next(err);
    }
}
