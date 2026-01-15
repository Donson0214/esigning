"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSigningSession = viewSigningSession;
exports.getSigningFile = getSigningFile;
exports.submitSigning = submitSigning;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../config/prisma");
const crypto_util_1 = require("../../utils/crypto.util");
const http_error_util_1 = require("../../utils/http-error.util");
const events_1 = require("../../shared/events");
const socket_1 = require("../../realtime/socket");
const env_1 = require("../../config/env");
const notification_service_1 = require("../notifications/notification.service");
const supabase_util_1 = require("../../utils/supabase.util");
const signing_order_util_1 = require("../../utils/signing-order.util");
const signing_integrity_service_1 = require("./signing-integrity.service");
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
                        version: { increment: 1 },
                    },
                });
            }
            const auditEvent = await tx.auditEvent.create({
                data: {
                    documentId: signer.documentId,
                    actorType: client_1.AuditActorType.SIGNER,
                    actorSignerId: signer.id,
                    eventType: client_1.AuditEventType.DOCUMENT_VIEWED,
                    ipAddress: meta.ipAddress,
                    userAgent: meta.userAgent,
                },
            });
            await (0, socket_1.emitEvent)((0, events_1.createEvent)({
                event: 'doc.viewed',
                orgId: signer.document.ownerId,
                docId: signer.documentId,
                actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
                correlationId: meta.correlationId,
                data: { signerId: signer.id, viewedAt: now.toISOString() },
            }));
            await (0, socket_1.emitEvent)((0, events_1.createEvent)({
                event: 'doc.signer.status.changed',
                orgId: signer.document.ownerId,
                docId: signer.documentId,
                actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
                correlationId: meta.correlationId,
                data: {
                    signer: {
                        id: signer.id,
                        email: signer.email,
                        name: signer.name,
                        status: client_1.SignerStatus.VIEWED,
                        order: signer.signOrder,
                        viewedAt: now.toISOString(),
                        signedAt: signer.signedAt?.toISOString() ?? null,
                    },
                    previousStatus: signer.status,
                },
            }));
            await (0, socket_1.emitEvent)((0, events_1.createEvent)({
                event: 'doc.audit.appended',
                orgId: signer.document.ownerId,
                docId: signer.documentId,
                actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
                correlationId: meta.correlationId,
                data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
            }));
        });
        const signerName = signer.name ?? signer.email;
        try {
            await (0, notification_service_1.dispatchNotification)({
                eventType: 'document.viewed',
                orgId: signer.document.ownerId,
                docId: signer.documentId,
                recipientUserId: signer.document.ownerId,
                actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
                title: 'Document viewed',
                message: `${signerName} viewed "${signer.document.title}".`,
                link: `${env_1.env.appBaseUrl}/app/audit-trail`,
                idempotencyKey: `document-viewed:${signer.id}`,
                payload: {
                    documentId: signer.documentId,
                    documentTitle: signer.document.title,
                    signerId: signer.id,
                    signerEmail: signer.email,
                },
            });
        }
        catch (err) {
            console.warn('Notification dispatch failed', err);
        }
    }
    const signers = await prisma_1.prisma.signer.findMany({
        where: { documentId: signer.documentId },
        select: {
            id: true,
            email: true,
            name: true,
            status: true,
            signOrder: true,
        },
        orderBy: { signOrder: 'asc' },
    });
    const pendingSigners = signers.filter((item) => item.status !== client_1.SignerStatus.SIGNED && item.status !== client_1.SignerStatus.DECLINED);
    const currentSigner = pendingSigners[0] ?? null;
    const isDocActive = ![
        client_1.DocumentStatus.COMPLETED,
        client_1.DocumentStatus.DECLINED,
        client_1.DocumentStatus.EXPIRED,
    ].includes(signer.document.status);
    const isSignerActive = signer.status !== client_1.SignerStatus.SIGNED && signer.status !== client_1.SignerStatus.DECLINED;
    const isInOrder = signers.length === 0 || (0, signing_order_util_1.isSignerInOrder)(signers, signer.id);
    const canSign = isDocActive && isSignerActive && isInOrder;
    const filePath = signer.document.signedFileUrl ||
        signer.document.signedFilePublicId ||
        signer.document.fileUrl ||
        signer.document.filePublicId;
    return {
        signer: {
            id: signer.id,
            name: signer.name,
            email: signer.email,
            status: signer.status,
            order: signer.signOrder,
            canSign,
        },
        signingOrder: {
            currentSigner: currentSigner
                ? {
                    id: currentSigner.id,
                    name: currentSigner.name,
                    email: currentSigner.email,
                    order: currentSigner.signOrder,
                }
                : null,
        },
        document: {
            id: signer.document.id,
            title: signer.document.title,
            fileUrl: filePath ? await (0, supabase_util_1.createSignedUrl)(filePath).catch(() => filePath) : '',
            status: signer.document.status,
        },
        fields: signer.fields,
    };
}
async function getSigningFile(token) {
    const signer = await getSignerByToken(token);
    const filePath = signer.document.signedFileUrl ||
        signer.document.signedFilePublicId ||
        signer.document.fileUrl ||
        signer.document.filePublicId;
    if (!filePath) {
        throw (0, http_error_util_1.createHttpError)(404, 'FILE_UNAVAILABLE', 'File path missing');
    }
    const buffer = await (0, supabase_util_1.downloadStoredFile)(filePath);
    return {
        buffer,
        fileName: signer.document.fileName || 'document.pdf',
        contentType: signer.document.fileMimeType || 'application/pdf',
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
    const session = await (0, signing_integrity_service_1.createSigningSession)({
        documentId: signer.documentId,
        signerId: signer.id,
        meta: {
            ipAddress: meta.ipAddress,
            userAgent: meta.userAgent,
            correlationId: meta.correlationId,
        },
    });
    await (0, signing_integrity_service_1.submitManifest)({
        documentId: signer.documentId,
        signerId: signer.id,
        signingSessionId: session.signingSessionId,
        fields: payload.signatures.map((item) => ({
            fieldId: item.fieldId,
            value: item.value,
        })),
        meta: {
            ipAddress: meta.ipAddress,
            userAgent: meta.userAgent,
            correlationId: meta.correlationId,
        },
    });
    const signatureValue = payload.signatures[0]?.value ?? signer.name ?? signer.email;
    await (0, signing_integrity_service_1.uploadSignatureArtifact)({
        documentId: signer.documentId,
        signerId: signer.id,
        signingSessionId: session.signingSessionId,
        type: 'TYPED',
        data: signatureValue,
        meta: {
            ipAddress: meta.ipAddress,
            userAgent: meta.userAgent,
            correlationId: meta.correlationId,
        },
    });
    await (0, signing_integrity_service_1.applySignature)({
        documentId: signer.documentId,
        signerId: signer.id,
        signingSessionId: session.signingSessionId,
        meta: {
            ipAddress: meta.ipAddress,
            userAgent: meta.userAgent,
            correlationId: meta.correlationId,
        },
    });
    const updated = await prisma_1.prisma.document.findUnique({
        where: { id: signer.documentId },
        include: {
            signers: true,
            auditEvents: { orderBy: { createdAt: 'asc' } },
        },
    });
    if (!updated) {
        throw (0, http_error_util_1.createHttpError)(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
    }
    const remaining = updated.signers.filter((s) => s.status !== client_1.SignerStatus.SIGNED);
    if (remaining.length === 0) {
        await (0, signing_integrity_service_1.completeDocument)(updated.ownerId, updated.id, {
            ipAddress: meta.ipAddress,
            userAgent: meta.userAgent,
            correlationId: meta.correlationId,
        });
    }
    return { ok: true };
}
