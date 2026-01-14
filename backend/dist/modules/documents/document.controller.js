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
exports.getDocument = getDocument;
exports.sendDocument = sendDocument;
exports.getStats = getStats;
exports.getAudit = getAudit;
exports.getCertificate = getCertificate;
const document_types_1 = require("./document.types");
const documentService = __importStar(require("./document.service"));
const audit_service_1 = require("../audit/audit.service");
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
            meta: { ipAddress: req.ip, userAgent: req.get('user-agent') ?? undefined },
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
            meta: { ipAddress: req.ip, userAgent: req.get('user-agent') ?? undefined },
        });
        res.json(document);
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
        await documentService.getDocument(req.user.id, documentId);
        const auditEvents = await (0, audit_service_1.listAuditEvents)(documentId);
        res.json({ auditEvents });
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
