"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = createDocument;
exports.listDocuments = listDocuments;
exports.getDocument = getDocument;
exports.sendDocument = sendDocument;
exports.getDocumentStats = getDocumentStats;
exports.createField = createField;
exports.updateField = updateField;
exports.deleteField = deleteField;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../config/prisma");
const env_1 = require("../../config/env");
const supabase_util_1 = require("../../utils/supabase.util");
const hash_util_1 = require("../../utils/hash.util");
const http_error_util_1 = require("../../utils/http-error.util");
const crypto_util_1 = require("../../utils/crypto.util");
const events_1 = require("../../shared/events");
const socket_1 = require("../../realtime/socket");
const notification_service_1 = require("../notifications/notification.service");
const toJsonInput = (value) => {
    if (value === undefined)
        return undefined;
    if (value === null)
        return client_1.Prisma.DbNull;
    return value;
};
async function withAccessUrls(document) {
    const filePath = document.fileUrl || document.filePublicId;
    const signedPath = document.signedFileUrl || document.signedFilePublicId;
    const fileUrl = filePath ? await (0, supabase_util_1.createSignedUrl)(filePath).catch(() => filePath) : '';
    const signedFileUrl = signedPath ? await (0, supabase_util_1.createSignedUrl)(signedPath).catch(() => signedPath) : null;
    return { ...document, fileUrl, signedFileUrl };
}
function buildFieldSummary(field) {
    return {
        id: field.id,
        signerId: field.signerId ?? '',
        type: field.type,
        label: field.label ?? null,
        required: field.required ?? true,
        value: field.value ?? null,
        status: (field.status ?? client_1.FieldStatus.EMPTY),
        options: (field.options ?? null),
        page: field.page,
        x: field.x,
        y: field.y,
        width: field.width,
        height: field.height,
    };
}
async function ensureDocumentWritable(ownerId, documentId) {
    const document = await prisma_1.prisma.document.findFirst({
        where: { id: documentId, ownerId },
        select: { id: true, status: true, lockedAt: true },
    });
    if (!document) {
        throw (0, http_error_util_1.createHttpError)(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
    }
    if (document.lockedAt || document.status === client_1.DocumentStatus.COMPLETED) {
        throw (0, http_error_util_1.createHttpError)(409, 'DOC_LOCKED', 'Document is locked');
    }
    return document;
}
async function resolveSigner(params) {
    if (!params.signerEmail && params.signerIndex === undefined)
        return null;
    if (params.signerEmail) {
        return prisma_1.prisma.signer.findFirst({
            where: { documentId: params.documentId, email: params.signerEmail.toLowerCase() },
        });
    }
    if (params.signerIndex !== undefined) {
        const signers = await prisma_1.prisma.signer.findMany({
            where: { documentId: params.documentId },
            orderBy: { signOrder: 'asc' },
        });
        return signers[params.signerIndex] ?? null;
    }
    return null;
}
async function createDocument(params) {
    const { ownerId, title, file, meta } = params;
    const owner = await prisma_1.prisma.user.findUnique({
        where: { id: ownerId },
        select: { name: true, email: true },
    });
    const ownerName = owner?.name?.trim() || owner?.email || 'Document owner';
    const hash = (0, hash_util_1.hashBuffer)(file.buffer);
    const hashComputedAt = new Date();
    const upload = await (0, supabase_util_1.uploadBufferToSupabase)(file.buffer, {
        folder: 'documents',
        fileName: file.originalname,
        contentType: file.mimetype,
    });
    const document = await prisma_1.prisma.document.create({
        data: {
            ownerId,
            title,
            fileUrl: upload.path,
            filePublicId: upload.path,
            fileName: file.originalname,
            fileMimeType: file.mimetype,
            fileSize: file.size,
            hash,
            hashAlgorithm: 'SHA-256',
            hashComputedAt,
            status: client_1.DocumentStatus.DRAFT,
        },
    });
    const auditEvent = await prisma_1.prisma.auditEvent.create({
        data: {
            documentId: document.id,
            actorType: 'SENDER',
            actorUserId: ownerId,
            eventType: 'DOCUMENT_UPLOADED',
            ipAddress: meta.ipAddress,
            userAgent: meta.userAgent,
            metadata: {
                preHash: hash,
                algorithm: 'SHA-256',
                computedAt: hashComputedAt.toISOString(),
            },
        },
    });
    const createdEvent = (0, events_1.createEvent)({
        event: 'doc.created',
        orgId: ownerId,
        docId: document.id,
        actor: { userId: ownerId, role: 'SENDER' },
        correlationId: meta.correlationId,
        data: {
            document: {
                id: document.id,
                title: document.title,
                status: document.status,
                ownerId: document.ownerId,
                version: document.version,
                updatedAt: document.updatedAt.toISOString(),
            },
        },
    });
    await (0, socket_1.emitEvent)(createdEvent);
    const hashEvent = (0, events_1.createEvent)({
        event: 'doc.hash.computed',
        orgId: ownerId,
        docId: document.id,
        actor: { userId: ownerId, role: 'SENDER' },
        correlationId: meta.correlationId,
        data: {
            preHash: {
                hash,
                algorithm: 'SHA-256',
                computedAt: hashComputedAt.toISOString(),
            },
        },
    });
    await (0, socket_1.emitEvent)(hashEvent);
    const auditAppended = (0, events_1.createEvent)({
        event: 'doc.audit.appended',
        orgId: ownerId,
        docId: document.id,
        actor: { userId: ownerId, role: 'SENDER' },
        correlationId: meta.correlationId,
        data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    });
    await (0, socket_1.emitEvent)(auditAppended);
    try {
        await (0, notification_service_1.dispatchNotification)({
            eventType: 'document.created',
            orgId: ownerId,
            docId: document.id,
            recipientUserId: ownerId,
            actor: { userId: ownerId, role: 'SENDER', email: owner?.email ?? undefined },
            title: 'Document created',
            message: `You uploaded "${document.title}".`,
            link: `${env_1.env.appBaseUrl}/app/documents`,
            idempotencyKey: `document-created:${document.id}`,
            payload: { documentId: document.id, title: document.title },
        });
    }
    catch (err) {
        console.warn('Notification dispatch failed', err);
    }
    return document;
}
async function listDocuments(ownerId) {
    const documents = await prisma_1.prisma.document.findMany({
        where: { ownerId },
        orderBy: { createdAt: 'desc' },
        include: {
            signers: {
                select: { id: true, email: true, name: true, status: true, signOrder: true, viewedAt: true, signedAt: true },
            },
        },
    });
    return Promise.all(documents.map((document) => withAccessUrls(document)));
}
async function getDocument(ownerId, documentId) {
    const document = await prisma_1.prisma.document.findFirst({
        where: { id: documentId, ownerId },
        include: {
            signers: true,
            fields: true,
            signatures: true,
            certificate: true,
        },
    });
    if (!document) {
        throw (0, http_error_util_1.createHttpError)(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
    }
    return withAccessUrls(document);
}
async function sendDocument(params) {
    const { ownerId, documentId, payload, meta } = params;
    const payloadFields = payload.fields ?? [];
    const useExistingFields = payloadFields.length === 0;
    const owner = await prisma_1.prisma.user.findUnique({
        where: { id: ownerId },
        select: { name: true, email: true },
    });
    const ownerName = owner?.name?.trim() || owner?.email || 'Document owner';
    const document = await prisma_1.prisma.document.findFirst({
        where: { id: documentId, ownerId },
    });
    if (!document) {
        throw (0, http_error_util_1.createHttpError)(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
    }
    const fileName = document.fileName?.toLowerCase() ?? '';
    const isPdfDocument = document.fileMimeType?.toLowerCase() === 'application/pdf' || fileName.endsWith('.pdf');
    if (!isPdfDocument) {
        throw (0, http_error_util_1.createHttpError)(400, 'UNSUPPORTED_FORMAT', 'Only PDF documents can be sent for signing');
    }
    if (document.status !== client_1.DocumentStatus.DRAFT) {
        throw (0, http_error_util_1.createHttpError)(400, 'DOCUMENT_NOT_DRAFT', 'Only draft documents can be sent');
    }
    const signerEmails = payload.signers.map((s) => s.email.toLowerCase());
    const uniqueEmails = new Set(signerEmails);
    if (uniqueEmails.size !== signerEmails.length) {
        throw (0, http_error_util_1.createHttpError)(400, 'DUPLICATE_SIGNERS', 'Signer emails must be unique');
    }
    const expiresAt = new Date(Date.now() + env_1.env.signingLinkTtlMinutes * 60 * 1000);
    const signerTokens = {};
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const createdSigners = [];
        for (const [index, signer] of payload.signers.entries()) {
            const token = (0, crypto_util_1.generateToken)();
            signerTokens[signer.email.toLowerCase()] = token;
            const created = await tx.signer.create({
                data: {
                    documentId: document.id,
                    name: signer.name ?? null,
                    email: signer.email.toLowerCase(),
                    status: client_1.SignerStatus.PENDING,
                    signOrder: signer.order ?? index + 1,
                    signingTokenHash: (0, crypto_util_1.hashToken)(token),
                    signingTokenExpiresAt: expiresAt,
                },
            });
            createdSigners.push(created);
        }
        const signersByEmail = new Map(createdSigners.map((s) => [s.email, s]));
        const signersByIndex = new Map(createdSigners.map((s, index) => [index, s]));
        let createdFields = [];
        if (useExistingFields) {
            const existingFields = await tx.signatureField.findMany({
                where: { documentId: document.id },
            });
            if (existingFields.length === 0) {
                throw (0, http_error_util_1.createHttpError)(400, 'FIELDS_REQUIRED', 'At least one field is required');
            }
            createdFields = existingFields;
            for (const field of existingFields) {
                if (field.signerId)
                    continue;
                const targetEmail = field.signerEmail?.toLowerCase();
                if (!targetEmail)
                    continue;
                const signer = signersByEmail.get(targetEmail);
                if (!signer) {
                    throw (0, http_error_util_1.createHttpError)(400, 'INVALID_SIGNER_REFERENCE', 'Field signer reference is invalid');
                }
                await tx.signatureField.update({
                    where: { id: field.id },
                    data: {
                        signerId: signer.id,
                    },
                });
            }
            createdFields = await tx.signatureField.findMany({
                where: { documentId: document.id },
            });
        }
        else {
            const fieldsData = payloadFields.map((field) => {
                const signer = (field.signerEmail ? signersByEmail.get(field.signerEmail.toLowerCase()) : undefined) ??
                    (field.signerIndex !== undefined ? signersByIndex.get(field.signerIndex) : undefined);
                if (!signer) {
                    throw (0, http_error_util_1.createHttpError)(400, 'INVALID_SIGNER_REFERENCE', 'Field signer reference is invalid');
                }
                return {
                    documentId: document.id,
                    signerId: signer.id,
                    signerEmail: signer.email,
                    type: field.type,
                    label: field.label ?? null,
                    placeholder: field.placeholder ?? null,
                    required: field.required ?? true,
                    value: field.value ?? null,
                    status: field.value ? client_1.FieldStatus.FILLED : client_1.FieldStatus.EMPTY,
                    options: toJsonInput(field.options ?? null),
                    page: field.page,
                    x: field.x,
                    y: field.y,
                    width: field.width,
                    height: field.height,
                };
            });
            for (const field of fieldsData) {
                const createdField = await tx.signatureField.create({ data: field });
                createdFields.push(createdField);
            }
        }
        const updated = await tx.document.update({
            where: { id: document.id },
            data: {
                status: client_1.DocumentStatus.SENT,
                sentAt: new Date(),
                fieldVersion: { increment: 1 },
                version: { increment: 1 },
            },
        });
        const auditEvent = await tx.auditEvent.create({
            data: {
                documentId: document.id,
                actorType: 'SENDER',
                actorUserId: ownerId,
                eventType: 'DOCUMENT_SENT',
                ipAddress: meta.ipAddress,
                userAgent: meta.userAgent,
            },
        });
        return { updated, createdSigners, createdFields, auditEvent };
    });
    for (const signer of result.createdSigners) {
        const token = signerTokens[signer.email];
        if (!token) {
            throw (0, http_error_util_1.createHttpError)(500, 'SIGNING_TOKEN_MISSING', 'Signing token missing');
        }
        const link = `${env_1.env.signingAppUrl}/${token}`;
        const emailMessage = (0, notification_service_1.buildNotificationEmail)('signer.invited', {
            recipientName: signer.name ?? signer.email,
            documentTitle: document.title,
            senderName: ownerName,
            orgName: ownerName,
            actionUrl: link,
            expiresAt: expiresAt.toISOString(),
        });
        try {
            await (0, notification_service_1.notifyUserByEmail)({
                email: signer.email,
                forceEmail: true,
                input: {
                    eventType: 'signer.invited',
                    orgId: ownerId,
                    docId: document.id,
                    actor: { userId: ownerId, role: 'SENDER', email: owner?.email ?? undefined },
                    title: 'Document invitation',
                    message: `${ownerName} invited you to sign "${document.title}".`,
                    link,
                    payload: {
                        documentId: document.id,
                        signerId: signer.id,
                        signerEmail: signer.email,
                        documentTitle: document.title,
                    },
                    idempotencyKey: `signer-invited:${signer.id}`,
                    email: {
                        to: signer.email,
                        subject: emailMessage.subject,
                        text: emailMessage.text,
                        html: emailMessage.html,
                    },
                },
            });
        }
        catch (err) {
            console.warn('Signer notification failed', err);
        }
        await (0, socket_1.emitEvent)((0, events_1.createEvent)({
            event: 'notifications.email.queued',
            orgId: ownerId,
            docId: document.id,
            actor: { userId: ownerId, role: 'SENDER' },
            correlationId: meta.correlationId,
            data: { to: signer.email, template: 'signing-request', signerId: signer.id },
        }), 'org');
    }
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.updated',
        orgId: ownerId,
        docId: document.id,
        actor: { userId: ownerId, role: 'SENDER' },
        correlationId: meta.correlationId,
        data: {
            document: {
                id: result.updated.id,
                title: result.updated.title,
                status: result.updated.status,
                ownerId: result.updated.ownerId,
                version: result.updated.version,
                updatedAt: result.updated.updatedAt.toISOString(),
            },
            changes: ['status', 'sentAt', 'fieldVersion'],
        },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.field.updated',
        orgId: ownerId,
        docId: document.id,
        actor: { userId: ownerId, role: 'SENDER' },
        correlationId: meta.correlationId,
        data: {
            fields: result.createdFields.map((field) => buildFieldSummary(field)),
        },
    }));
    for (const signer of result.createdSigners) {
        await (0, socket_1.emitEvent)((0, events_1.createEvent)({
            event: 'doc.access.granted',
            orgId: ownerId,
            docId: document.id,
            actor: { userId: ownerId, role: 'SENDER' },
            correlationId: meta.correlationId,
            data: {
                signer: {
                    id: signer.id,
                    email: signer.email,
                    name: signer.name,
                    status: signer.status,
                    order: signer.signOrder,
                    viewedAt: signer.viewedAt?.toISOString() ?? null,
                    signedAt: signer.signedAt?.toISOString() ?? null,
                },
            },
        }));
    }
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.audit.appended',
        orgId: ownerId,
        docId: document.id,
        actor: { userId: ownerId, role: 'SENDER' },
        correlationId: meta.correlationId,
        data: { auditEventId: result.auditEvent.id, eventType: result.auditEvent.eventType },
    }));
    try {
        await (0, notification_service_1.dispatchNotification)({
            eventType: 'document.sent',
            orgId: ownerId,
            docId: document.id,
            recipientUserId: ownerId,
            actor: { userId: ownerId, role: 'SENDER', email: owner?.email ?? undefined },
            title: 'Document sent',
            message: `Sent "${document.title}" to ${result.createdSigners.length} signer(s).`,
            link: `${env_1.env.appBaseUrl}/app/sent`,
            idempotencyKey: `document-sent:${document.id}`,
            payload: {
                documentId: document.id,
                title: document.title,
                signerCount: result.createdSigners.length,
            },
        });
    }
    catch (err) {
        console.warn('Notification dispatch failed', err);
    }
    return withAccessUrls(result.updated);
}
async function getDocumentStats(ownerId) {
    const grouped = await prisma_1.prisma.document.groupBy({
        by: ['status'],
        where: { ownerId },
        _count: { _all: true },
    });
    const counts = grouped.reduce((acc, item) => {
        acc[item.status] = item._count._all;
        return acc;
    }, {});
    return {
        total: grouped.reduce((sum, item) => sum + item._count._all, 0),
        sent: counts.SENT ?? 0,
        viewed: counts.VIEWED ?? 0,
        inProgress: counts.IN_PROGRESS ?? 0,
        signed: counts.SIGNED ?? 0,
        completed: counts.COMPLETED ?? 0,
        declined: counts.DECLINED ?? 0,
        expired: counts.EXPIRED ?? 0,
        draft: counts.DRAFT ?? 0,
        pending: (counts.SENT ?? 0) +
            (counts.VIEWED ?? 0) +
            (counts.IN_PROGRESS ?? 0) +
            (counts.SIGNED ?? 0),
    };
}
async function createField(params) {
    await ensureDocumentWritable(params.ownerId, params.documentId);
    const signer = await resolveSigner({
        documentId: params.documentId,
        signerEmail: params.input.signerEmail,
        signerIndex: params.input.signerIndex,
    });
    const field = await prisma_1.prisma.signatureField.create({
        data: {
            documentId: params.documentId,
            signerId: signer?.id ?? null,
            signerEmail: params.input.signerEmail?.toLowerCase() ?? signer?.email ?? null,
            type: params.input.type,
            label: params.input.label ?? null,
            placeholder: params.input.placeholder ?? null,
            required: params.input.required ?? true,
            value: params.input.value ?? null,
            status: params.input.value ? client_1.FieldStatus.FILLED : client_1.FieldStatus.EMPTY,
            options: toJsonInput(params.input.options ?? null),
            page: params.input.page,
            x: params.input.x,
            y: params.input.y,
            width: params.input.width,
            height: params.input.height,
        },
    });
    const auditEvent = await prisma_1.prisma.auditEvent.create({
        data: {
            documentId: params.documentId,
            actorType: 'SENDER',
            actorUserId: params.ownerId,
            eventType: 'FIELD_UPDATED',
            ipAddress: params.meta.ipAddress,
            userAgent: params.meta.userAgent,
            metadata: { action: 'created', fieldId: field.id },
        },
    });
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.field.updated',
        orgId: params.ownerId,
        docId: params.documentId,
        actor: { userId: params.ownerId, role: 'SENDER' },
        correlationId: params.meta.correlationId,
        data: { fields: [buildFieldSummary(field)] },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.audit.appended',
        orgId: params.ownerId,
        docId: params.documentId,
        actor: { userId: params.ownerId, role: 'SENDER' },
        correlationId: params.meta.correlationId,
        data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }));
    return field;
}
async function updateField(params) {
    await ensureDocumentWritable(params.ownerId, params.documentId);
    const existing = await prisma_1.prisma.signatureField.findFirst({
        where: { id: params.fieldId, documentId: params.documentId },
    });
    if (!existing) {
        throw (0, http_error_util_1.createHttpError)(404, 'FIELD_NOT_FOUND', 'Field not found');
    }
    const resolvedOptions = params.input.options === undefined ? existing.options : params.input.options;
    const signer = await resolveSigner({
        documentId: params.documentId,
        signerEmail: params.input.signerEmail,
        signerIndex: params.input.signerIndex,
    });
    const value = params.input.value ?? existing.value ?? null;
    const updated = await prisma_1.prisma.signatureField.update({
        where: { id: existing.id },
        data: {
            signerId: signer ? signer.id : params.input.signerEmail ? null : existing.signerId,
            signerEmail: params.input.signerEmail
                ? params.input.signerEmail.toLowerCase()
                : existing.signerEmail,
            type: params.input.type ?? existing.type,
            label: params.input.label ?? existing.label,
            placeholder: params.input.placeholder ?? existing.placeholder,
            required: params.input.required ?? existing.required,
            value,
            status: value ? client_1.FieldStatus.FILLED : existing.status,
            options: toJsonInput(resolvedOptions ?? null),
            page: params.input.page ?? existing.page,
            x: params.input.x ?? existing.x,
            y: params.input.y ?? existing.y,
            width: params.input.width ?? existing.width,
            height: params.input.height ?? existing.height,
        },
    });
    const auditEvent = await prisma_1.prisma.auditEvent.create({
        data: {
            documentId: params.documentId,
            actorType: 'SENDER',
            actorUserId: params.ownerId,
            eventType: 'FIELD_UPDATED',
            ipAddress: params.meta.ipAddress,
            userAgent: params.meta.userAgent,
            metadata: { action: 'updated', fieldId: updated.id },
        },
    });
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.field.updated',
        orgId: params.ownerId,
        docId: params.documentId,
        actor: { userId: params.ownerId, role: 'SENDER' },
        correlationId: params.meta.correlationId,
        data: { fields: [buildFieldSummary(updated)] },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.audit.appended',
        orgId: params.ownerId,
        docId: params.documentId,
        actor: { userId: params.ownerId, role: 'SENDER' },
        correlationId: params.meta.correlationId,
        data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }));
    return updated;
}
async function deleteField(params) {
    await ensureDocumentWritable(params.ownerId, params.documentId);
    const existing = await prisma_1.prisma.signatureField.findFirst({
        where: { id: params.fieldId, documentId: params.documentId },
    });
    if (!existing) {
        throw (0, http_error_util_1.createHttpError)(404, 'FIELD_NOT_FOUND', 'Field not found');
    }
    await prisma_1.prisma.signatureField.delete({
        where: { id: existing.id },
    });
    const auditEvent = await prisma_1.prisma.auditEvent.create({
        data: {
            documentId: params.documentId,
            actorType: 'SENDER',
            actorUserId: params.ownerId,
            eventType: 'FIELD_UPDATED',
            ipAddress: params.meta.ipAddress,
            userAgent: params.meta.userAgent,
            metadata: { action: 'deleted', fieldId: existing.id },
        },
    });
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.field.updated',
        orgId: params.ownerId,
        docId: params.documentId,
        actor: { userId: params.ownerId, role: 'SENDER' },
        correlationId: params.meta.correlationId,
        data: { fields: [buildFieldSummary(existing)] },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.audit.appended',
        orgId: params.ownerId,
        docId: params.documentId,
        actor: { userId: params.ownerId, role: 'SENDER' },
        correlationId: params.meta.correlationId,
        data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }));
    return { deleted: true };
}
