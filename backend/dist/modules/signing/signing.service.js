"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSigningSession = viewSigningSession;
exports.submitSigning = submitSigning;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../config/prisma");
const crypto_util_1 = require("../../utils/crypto.util");
const http_error_util_1 = require("../../utils/http-error.util");
const pdf_util_1 = require("../../utils/pdf.util");
const cloudinary_util_1 = require("../../utils/cloudinary.util");
const hash_util_1 = require("../../utils/hash.util");
const audit_constants_1 = require("../audit/audit.constants");
async function getSignerByToken(token) {
    const signer = await prisma_1.prisma.signer.findFirst({
        where: { signingTokenHash: (0, crypto_util_1.hashToken)(token) },
        include: {
            document: true,
            fields: true,
            signatures: true,
        },
    });
    if (!signer) {
        throw (0, http_error_util_1.createHttpError)(404, 'SIGNING_LINK_INVALID', 'Signing link is invalid');
    }
    if (signer.signingTokenExpiresAt && signer.signingTokenExpiresAt < new Date()) {
        throw (0, http_error_util_1.createHttpError)(410, 'SIGNING_LINK_EXPIRED', 'Signing link has expired');
    }
    return signer;
}
async function viewSigningSession(token, meta) {
    const signer = await getSignerByToken(token);
    const now = new Date();
    if (!signer.viewedAt) {
        await prisma_1.prisma.$transaction(async (tx) => {
            await tx.signer.update({
                where: { id: signer.id },
                data: {
                    status: client_1.SignerStatus.VIEWED,
                    viewedAt: now,
                },
            });
            if (signer.document.status === client_1.DocumentStatus.SENT) {
                await tx.document.update({
                    where: { id: signer.documentId },
                    data: {
                        status: client_1.DocumentStatus.VIEWED,
                        viewedAt: now,
                    },
                });
            }
            await tx.auditEvent.create({
                data: {
                    documentId: signer.documentId,
                    actorType: client_1.AuditActorType.SIGNER,
                    actorSignerId: signer.id,
                    eventType: client_1.AuditEventType.DOCUMENT_VIEWED,
                    ipAddress: meta.ipAddress,
                    userAgent: meta.userAgent,
                },
            });
        });
    }
    return {
        signer: {
            id: signer.id,
            name: signer.name,
            email: signer.email,
            status: signer.status,
        },
        document: {
            id: signer.document.id,
            title: signer.document.title,
            fileUrl: signer.document.fileUrl,
            status: signer.document.status,
        },
        fields: signer.fields,
    };
}
async function submitSigning(token, payload, meta) {
    const signer = await getSignerByToken(token);
    if (signer.document.status === client_1.DocumentStatus.COMPLETED) {
        throw (0, http_error_util_1.createHttpError)(409, 'DOCUMENT_COMPLETED', 'Document already completed');
    }
    if (signer.status === client_1.SignerStatus.SIGNED) {
        throw (0, http_error_util_1.createHttpError)(409, 'ALREADY_SIGNED', 'Signing already completed');
    }
    const fieldIds = new Set(signer.fields.map((field) => field.id));
    const payloadFieldIds = new Set(payload.signatures.map((item) => item.fieldId));
    for (const fieldId of fieldIds) {
        if (!payloadFieldIds.has(fieldId)) {
            throw (0, http_error_util_1.createHttpError)(400, 'MISSING_SIGNATURE', 'All signature fields must be completed');
        }
    }
    const signaturesData = payload.signatures.map((item) => {
        if (!fieldIds.has(item.fieldId)) {
            throw (0, http_error_util_1.createHttpError)(400, 'INVALID_FIELD', 'Signature field is invalid');
        }
        return {
            documentId: signer.documentId,
            signerId: signer.id,
            fieldId: item.fieldId,
            value: item.value,
            signedAt: new Date(),
        };
    });
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        await tx.signature.createMany({ data: signaturesData });
        await tx.signer.update({
            where: { id: signer.id },
            data: { status: client_1.SignerStatus.SIGNED, signedAt: new Date() },
        });
        await tx.auditEvent.create({
            data: {
                documentId: signer.documentId,
                actorType: client_1.AuditActorType.SIGNER,
                actorSignerId: signer.id,
                eventType: client_1.AuditEventType.DOCUMENT_SIGNED,
                ipAddress: meta.ipAddress,
                userAgent: meta.userAgent,
            },
        });
        const remaining = await tx.signer.count({
            where: { documentId: signer.documentId, status: { not: client_1.SignerStatus.SIGNED } },
        });
        if (remaining === 0) {
            await tx.document.update({
                where: { id: signer.documentId },
                data: {
                    status: client_1.DocumentStatus.SIGNED,
                    signedAt: new Date(),
                },
            });
        }
        return { remaining };
    });
    if (result.remaining === 0) {
        const document = await prisma_1.prisma.document.findUnique({
            where: { id: signer.documentId },
            include: {
                signers: true,
                auditEvents: { orderBy: { createdAt: 'asc' } },
            },
        });
        if (!document) {
            throw (0, http_error_util_1.createHttpError)(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
        }
        const auditSummary = document.auditEvents.map((event) => `${audit_constants_1.AUDIT_EVENT_LABELS[event.eventType]} - ${event.createdAt.toISOString()}`);
        const certificateBuffer = await (0, pdf_util_1.generateCertificatePdf)({
            title: document.title,
            documentHash: document.hash,
            completedAt: new Date(),
            signers: document.signers.map((s) => ({
                name: s.name,
                email: s.email,
                signedAt: s.signedAt,
            })),
            auditSummary,
        });
        const upload = await (0, cloudinary_util_1.uploadBufferToCloudinary)(certificateBuffer, {
            folder: 'esigning/certificates',
            fileName: `${document.title}-certificate.pdf`,
            resourceType: 'raw',
        });
        const certificateHash = (0, hash_util_1.hashBuffer)(certificateBuffer);
        await prisma_1.prisma.$transaction(async (tx) => {
            await tx.certificate.create({
                data: {
                    documentId: document.id,
                    url: upload.url,
                    publicId: upload.publicId,
                    hash: certificateHash,
                    summary: {
                        documentId: document.id,
                        title: document.title,
                        hash: document.hash,
                        signers: document.signers.map((s) => ({
                            name: s.name,
                            email: s.email,
                            signedAt: s.signedAt,
                        })),
                        auditSummary,
                    },
                },
            });
            await tx.document.update({
                where: { id: document.id },
                data: {
                    status: client_1.DocumentStatus.COMPLETED,
                    completedAt: new Date(),
                },
            });
            await tx.auditEvent.create({
                data: {
                    documentId: document.id,
                    actorType: client_1.AuditActorType.SYSTEM,
                    eventType: client_1.AuditEventType.DOCUMENT_COMPLETED,
                    ipAddress: meta.ipAddress,
                    userAgent: meta.userAgent,
                },
            });
        });
    }
    return { ok: true };
}
