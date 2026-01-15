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
exports.createDocument = createDocument;
exports.listDocuments = listDocuments;
exports.listReceivedDocuments = listReceivedDocuments;
exports.listReceivedSummary = listReceivedSummary;
exports.createSigningToken = createSigningToken;
exports.getDocument = getDocument;
exports.getDocumentPreviewUrl = getDocumentPreviewUrl;
exports.getDocumentFile = getDocumentFile;
exports.sendDocument = sendDocument;
exports.createField = createField;
exports.updateField = updateField;
exports.deleteField = deleteField;
exports.getStats = getStats;
exports.getAudit = getAudit;
exports.getCertificate = getCertificate;
const document_types_1 = require("./document.types");
const documentService = __importStar(require("./document.service"));
const signing_integrity_service_1 = require("../signing/signing-integrity.service");
const supabase_util_1 = require("../../utils/supabase.util");
const sanitizeFileName = (value) => value.replace(/["\\\r\n]/g, '_');
function getParam(value) {
    return Array.isArray(value) ? value[0] : value;
}
async function createDocument(req, res, next) {
    try {
        const input = document_types_1.createDocumentSchema.parse(req.body);
        if (!req.file) {
            return res.status(400).json({ error: 'FILE_REQUIRED' });
        }
        const document = await documentService.createDocument({
            ownerId: req.user.id,
            title: input.title,
            file: req.file,
            meta: {
                ipAddress: req.ip,
                userAgent: req.get('user-agent') ?? undefined,
                correlationId: req.correlationId,
            },
        });
        res.status(201).json(document);
    }
    catch (err) {
        next(err);
    }
}
async function listDocuments(req, res, next) {
    try {
        const documents = await documentService.listDocuments(req.user.id);
        res.json({ documents });
    }
    catch (err) {
        next(err);
    }
}
async function listReceivedDocuments(req, res, next) {
    try {
        const documents = await documentService.listReceivedDocuments(req.user.id);
        res.json({ documents });
    }
    catch (err) {
        next(err);
    }
}
async function listReceivedSummary(req, res, next) {
    try {
        const summary = await documentService.getReceivedSummary(req.user.id);
        res.json(summary);
    }
    catch (err) {
        next(err);
    }
}
async function createSigningToken(req, res, next) {
    try {
        const documentId = getParam(req.params.id);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        const result = await documentService.createSigningTokenForUser({
            userId: req.user.id,
            documentId,
        });
        res.json(result);
    }
    catch (err) {
        next(err);
    }
}
async function getDocument(req, res, next) {
    try {
        const documentId = getParam(req.params.id);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        const document = await documentService.getDocument(req.user.id, documentId);
        res.json(document);
    }
    catch (err) {
        next(err);
    }
}
async function getDocumentPreviewUrl(req, res, next) {
    try {
        const documentId = getParam(req.params.id);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        const document = await documentService.getDocument(req.user.id, documentId);
        const url = await (0, supabase_util_1.createSignedUrl)(document.filePublicId || document.fileUrl);
        if (!url) {
            return res.status(404).json({ error: 'PREVIEW_UNAVAILABLE' });
        }
        res.json({ url });
    }
    catch (err) {
        next(err);
    }
}
async function getDocumentFile(req, res, next) {
    try {
        const documentId = getParam(req.params.id);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        const document = await documentService.getDocument(req.user.id, documentId);
        const buffer = await (0, supabase_util_1.downloadStoredFile)(document.filePublicId || document.fileUrl);
        const contentType = document.fileMimeType || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `inline; filename="${sanitizeFileName(document.fileName)}"`);
        res.setHeader('Cache-Control', 'private, max-age=300');
        res.setHeader('Content-Length', buffer.length.toString());
        res.send(buffer);
    }
    catch (err) {
        next(err);
    }
}
async function sendDocument(req, res, next) {
    try {
        const payload = document_types_1.sendDocumentSchema.parse(req.body);
        const documentId = getParam(req.params.id);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        const document = await documentService.sendDocument({
            ownerId: req.user.id,
            documentId,
            payload,
            meta: {
                ipAddress: req.ip,
                userAgent: req.get('user-agent') ?? undefined,
                correlationId: req.correlationId,
            },
        });
        res.json(document);
    }
    catch (err) {
        next(err);
    }
}
async function createField(req, res, next) {
    try {
        const input = document_types_1.createFieldSchema.parse(req.body);
        const documentId = getParam(req.params.id);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        const field = await documentService.createField({
            ownerId: req.user.id,
            documentId,
            input,
            meta: {
                ipAddress: req.ip,
                userAgent: req.get('user-agent') ?? undefined,
                correlationId: req.correlationId,
            },
        });
        res.status(201).json(field);
    }
    catch (err) {
        next(err);
    }
}
async function updateField(req, res, next) {
    try {
        const input = document_types_1.updateFieldSchema.parse(req.body);
        const documentId = getParam(req.params.id);
        const fieldId = getParam(req.params.fieldId);
        if (!documentId || !fieldId) {
            return res.status(400).json({ error: 'FIELD_ID_REQUIRED' });
        }
        const field = await documentService.updateField({
            ownerId: req.user.id,
            documentId,
            fieldId,
            input,
            meta: {
                ipAddress: req.ip,
                userAgent: req.get('user-agent') ?? undefined,
                correlationId: req.correlationId,
            },
        });
        res.json(field);
    }
    catch (err) {
        next(err);
    }
}
async function deleteField(req, res, next) {
    try {
        const documentId = getParam(req.params.id);
        const fieldId = getParam(req.params.fieldId);
        if (!documentId || !fieldId) {
            return res.status(400).json({ error: 'FIELD_ID_REQUIRED' });
        }
        const result = await documentService.deleteField({
            ownerId: req.user.id,
            documentId,
            fieldId,
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
async function getStats(req, res, next) {
    try {
        const stats = await documentService.getDocumentStats(req.user.id);
        res.json(stats);
    }
    catch (err) {
        next(err);
    }
}
async function getAudit(req, res, next) {
    try {
        const documentId = getParam(req.params.id);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        const report = await (0, signing_integrity_service_1.getAuditReport)(req.user.id, documentId);
        res.json(report);
    }
    catch (err) {
        next(err);
    }
}
async function getCertificate(req, res, next) {
    try {
        const documentId = getParam(req.params.id);
        if (!documentId) {
            return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
        }
        const document = await documentService.getDocument(req.user.id, documentId);
        res.json({ certificate: document.certificate });
    }
    catch (err) {
        next(err);
    }
}
