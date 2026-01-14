"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.precomputeDocumentHash = precomputeDocumentHash;
exports.createSigningSession = createSigningSession;
exports.submitManifest = submitManifest;
exports.uploadSignatureArtifact = uploadSignatureArtifact;
exports.applySignature = applySignature;
exports.completeDocument = completeDocument;
exports.getAuditReport = getAuditReport;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../config/prisma");
const env_1 = require("../../config/env");
const http_error_util_1 = require("../../utils/http-error.util");
const hash_util_1 = require("../../utils/hash.util");
const manifest_util_1 = require("../../utils/manifest.util");
const signature_util_1 = require("../../utils/signature.util");
const supabase_util_1 = require("../../utils/supabase.util");
const pdf_signature_util_1 = require("../../utils/pdf-signature.util");
const crypto_util_1 = require("../../utils/crypto.util");
const pdf_util_1 = require("../../utils/pdf.util");
const audit_constants_1 = require("../audit/audit.constants");
const signing_order_util_1 = require("../../utils/signing-order.util");
const events_1 = require("../../shared/events");
const socket_1 = require("../../realtime/socket");
const notification_service_1 = require("../notifications/notification.service");
const isFiniteNumber = (value) => typeof value === 'number' && Number.isFinite(value);
const toNormalizedRect = (options) => {
    if (!options || typeof options !== 'object')
        return null;
    const normalized = options
        .normalized;
    if (!normalized)
        return null;
    const { x, y, width, height } = normalized;
    if (!isFiniteNumber(x) || !isFiniteNumber(y) || !isFiniteNumber(width) || !isFiniteNumber(height)) {
        return null;
    }
    if (x < 0 || y < 0 || width <= 0 || height <= 0 || x > 1 || y > 1 || width > 1 || height > 1) {
        return null;
    }
    return { x, y, width, height };
};
function ensureSignerInOrder(documentId, signerId) {
    return prisma_1.prisma.signer
        .findMany({
        where: { documentId },
        orderBy: { signOrder: 'asc' },
        select: { id: true, status: true, signOrder: true },
    })
        .then((signers) => {
        if (!(0, signing_order_util_1.isSignerInOrder)(signers, signerId)) {
            throw (0, http_error_util_1.createHttpError)(409, 'OUT_OF_ORDER', 'Signer is out of order');
        }
    });
}
async function getSignerAndDocument(documentId, signerId) {
    const signer = await prisma_1.prisma.signer.findUnique({
        where: { id: signerId },
        include: { document: true },
    });
    if (!signer || signer.documentId !== documentId) {
        throw (0, http_error_util_1.createHttpError)(404, 'SIGNER_NOT_FOUND', 'Signer not found');
    }
    return signer;
}
function assertDocumentWritable(document) {
    if (document.lockedAt || document.status === client_1.DocumentStatus.COMPLETED) {
        throw (0, http_error_util_1.createHttpError)(409, 'DOC_LOCKED', 'Document is locked');
    }
    if (document.status === client_1.DocumentStatus.DECLINED || document.status === client_1.DocumentStatus.EXPIRED) {
        throw (0, http_error_util_1.createHttpError)(409, 'DOC_LOCKED', 'Document is no longer active');
    }
}
async function precomputeDocumentHash(ownerId, documentId, meta) {
    const document = await prisma_1.prisma.document.findFirst({
        where: { id: documentId, ownerId },
    });
    if (!document) {
        throw (0, http_error_util_1.createHttpError)(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
    }
    const buffer = await (0, supabase_util_1.downloadStoredFile)(document.fileUrl || document.filePublicId);
    const hash = (0, hash_util_1.hashBuffer)(buffer);
    const computedAt = new Date();
    const updated = await prisma_1.prisma.document.update({
        where: { id: document.id },
        data: {
            hash,
            hashAlgorithm: 'SHA-256',
            hashComputedAt: computedAt,
            version: { increment: 1 },
        },
    });
    const auditEvent = await prisma_1.prisma.auditEvent.create({
        data: {
            documentId: document.id,
            actorType: client_1.AuditActorType.SENDER,
            actorUserId: ownerId,
            eventType: client_1.AuditEventType.DOCUMENT_HASH_COMPUTED,
            ipAddress: meta.ipAddress,
            userAgent: meta.userAgent,
            metadata: {
                preHash: hash,
                algorithm: 'SHA-256',
                computedAt: computedAt.toISOString(),
            },
        },
    });
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.hash.computed',
        orgId: ownerId,
        docId: document.id,
        actor: { userId: ownerId, role: 'SENDER' },
        correlationId: meta.correlationId,
        data: {
            preHash: {
                hash,
                algorithm: 'SHA-256',
                computedAt: computedAt.toISOString(),
            },
        },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.audit.appended',
        orgId: ownerId,
        docId: document.id,
        actor: { userId: ownerId, role: 'SENDER' },
        correlationId: meta.correlationId,
        data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }));
    return {
        hash,
        algorithm: 'SHA-256',
        computedAt: computedAt.toISOString(),
        version: updated.version,
    };
}
async function createSigningSession(params) {
    const signer = await getSignerAndDocument(params.documentId, params.signerId);
    assertDocumentWritable(signer.document);
    if (signer.status === client_1.SignerStatus.SIGNED) {
        throw (0, http_error_util_1.createHttpError)(409, 'ALREADY_SIGNED', 'Signing already completed');
    }
    if (signer.status === client_1.SignerStatus.DECLINED) {
        throw (0, http_error_util_1.createHttpError)(409, 'SIGNING_DECLINED', 'Signing already declined');
    }
    await ensureSignerInOrder(signer.documentId, signer.id);
    const preHash = signer.document.hash;
    if (!preHash) {
        throw (0, http_error_util_1.createHttpError)(400, 'PREHASH_MISSING', 'Pre-sign hash missing');
    }
    const sessionExpiresAt = new Date(Date.now() + env_1.env.signingSessionTtlMinutes * 60 * 1000);
    await prisma_1.prisma.signingSession.updateMany({
        where: {
            documentId: signer.documentId,
            signerId: signer.id,
            status: client_1.SigningSessionStatus.ACTIVE,
        },
        data: { status: client_1.SigningSessionStatus.VOID },
    });
    const session = await prisma_1.prisma.signingSession.create({
        data: {
            documentId: signer.documentId,
            signerId: signer.id,
            status: client_1.SigningSessionStatus.ACTIVE,
            fieldVersion: signer.document.fieldVersion,
            preHash,
            preHashAlgorithm: signer.document.hashAlgorithm ?? 'SHA-256',
            preHashComputedAt: signer.document.hashComputedAt ?? new Date(),
            expiresAt: sessionExpiresAt,
            correlationId: params.meta.correlationId,
            clientMutationId: params.meta.clientMutationId,
        },
    });
    const auditEvent = await prisma_1.prisma.auditEvent.create({
        data: {
            documentId: signer.documentId,
            actorType: client_1.AuditActorType.SIGNER,
            actorSignerId: signer.id,
            eventType: client_1.AuditEventType.SIGNING_SESSION_CREATED,
            ipAddress: params.meta.ipAddress,
            userAgent: params.meta.userAgent,
            metadata: { signingSessionId: session.id, expiresAt: sessionExpiresAt.toISOString() },
        },
    });
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.audit.appended',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        correlationId: params.meta.correlationId,
        data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }));
    return { signingSessionId: session.id, expiresAt: sessionExpiresAt.toISOString() };
}
async function submitManifest(params) {
    const signer = await getSignerAndDocument(params.documentId, params.signerId);
    assertDocumentWritable(signer.document);
    const session = await prisma_1.prisma.signingSession.findUnique({
        where: { id: params.signingSessionId },
    });
    if (!session || session.signerId !== signer.id || session.documentId !== signer.documentId) {
        throw (0, http_error_util_1.createHttpError)(404, 'SESSION_NOT_FOUND', 'Signing session not found');
    }
    if (session.status !== client_1.SigningSessionStatus.ACTIVE) {
        throw (0, http_error_util_1.createHttpError)(409, 'STALE_SESSION', 'Signing session is not active');
    }
    if (session.expiresAt && session.expiresAt < new Date()) {
        throw (0, http_error_util_1.createHttpError)(410, 'STALE_SESSION', 'Signing session has expired');
    }
    if (session.fieldVersion !== signer.document.fieldVersion) {
        throw (0, http_error_util_1.createHttpError)(409, 'STALE_SESSION', 'Signing session is stale');
    }
    const fields = await prisma_1.prisma.signatureField.findMany({
        where: { documentId: signer.documentId, signerId: signer.id },
    });
    const fieldMap = new Map(fields.map((field) => [field.id, field]));
    if (fields.length === 0) {
        throw (0, http_error_util_1.createHttpError)(400, 'NO_FIELDS', 'No signature fields assigned');
    }
    const inputIds = new Set(params.fields.map((field) => field.fieldId));
    for (const field of fields) {
        if (!inputIds.has(field.id)) {
            throw (0, http_error_util_1.createHttpError)(400, 'MISSING_FIELD_VALUE', 'All fields must be completed');
        }
    }
    const manifestFields = params.fields
        .map((input) => {
        const field = fieldMap.get(input.fieldId);
        if (!field) {
            throw (0, http_error_util_1.createHttpError)(400, 'INVALID_FIELD', 'Signature field is invalid');
        }
        return {
            fieldId: field.id,
            type: field.type,
            page: field.page,
            x: field.x,
            y: field.y,
            width: field.width,
            height: field.height,
            value: input.value,
            normalized: toNormalizedRect(field.options),
        };
    })
        .sort((a, b) => a.fieldId.localeCompare(b.fieldId));
    const manifest = {
        docId: signer.documentId,
        orgId: signer.document.ownerId,
        preHash: signer.document.hash,
        signerId: signer.id,
        signingSessionId: session.id,
        fields: manifestFields,
        client: {
            userAgent: params.meta.userAgent ?? null,
            ip: params.meta.ipAddress ?? null,
        },
        createdAt: new Date().toISOString(),
    };
    const { hash: manifestHash } = (0, manifest_util_1.computeManifestHash)(manifest);
    const updated = await prisma_1.prisma.$transaction(async (tx) => {
        const updatedSession = await tx.signingSession.update({
            where: { id: session.id },
            data: {
                manifestJson: manifest,
                manifestHash,
                manifestAlgorithm: 'SHA-256',
                manifestCreatedAt: new Date(),
                signedManifestHash: manifestHash,
            },
        });
        for (const field of manifestFields) {
            await tx.signatureField.update({
                where: { id: field.fieldId },
                data: {
                    value: field.value,
                    status: client_1.FieldStatus.FILLED,
                },
            });
        }
        return updatedSession;
    });
    const auditEvent = await prisma_1.prisma.auditEvent.create({
        data: {
            documentId: signer.documentId,
            actorType: client_1.AuditActorType.SIGNER,
            actorSignerId: signer.id,
            eventType: client_1.AuditEventType.MANIFEST_SUBMITTED,
            ipAddress: params.meta.ipAddress,
            userAgent: params.meta.userAgent,
            metadata: { signingSessionId: session.id, manifestHash },
        },
    });
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.hash.computed',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        correlationId: params.meta.correlationId,
        data: {
            manifestHash: {
                hash: manifestHash,
                algorithm: 'SHA-256',
                computedAt: updated.manifestCreatedAt?.toISOString() ?? new Date().toISOString(),
            },
        },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.field.updated',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        correlationId: params.meta.correlationId,
        data: {
            fields: manifestFields.map((field) => ({
                id: field.fieldId,
                signerId: signer.id,
                type: field.type,
                value: field.value,
                status: 'FILLED',
                page: field.page,
                x: field.x,
                y: field.y,
                width: field.width,
                height: field.height,
            })),
        },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.audit.appended',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        correlationId: params.meta.correlationId,
        data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }));
    return { manifestHash };
}
async function uploadSignatureArtifact(params) {
    const signer = await getSignerAndDocument(params.documentId, params.signerId);
    assertDocumentWritable(signer.document);
    const session = await prisma_1.prisma.signingSession.findUnique({
        where: { id: params.signingSessionId },
    });
    if (!session || session.signerId !== signer.id || session.documentId !== signer.documentId) {
        throw (0, http_error_util_1.createHttpError)(404, 'SESSION_NOT_FOUND', 'Signing session not found');
    }
    if (!session.manifestHash) {
        throw (0, http_error_util_1.createHttpError)(400, 'MANIFEST_MISSING', 'Manifest hash missing');
    }
    let artifactHash;
    let artifactUrl;
    if (params.type === client_1.SignatureArtifactType.TYPED) {
        artifactHash = (0, hash_util_1.hashString)(params.data);
    }
    else {
        const parsed = (0, signature_util_1.parseDataUrl)(params.data);
        if (!parsed) {
            throw (0, http_error_util_1.createHttpError)(400, 'INVALID_SIGNATURE', 'Signature data must be a base64 data URL');
        }
        const mimeType = parsed.mimeType.toLowerCase();
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(mimeType)) {
            throw (0, http_error_util_1.createHttpError)(400, 'INVALID_SIGNATURE', 'Unsupported signature image type');
        }
        artifactHash = (0, hash_util_1.hashBuffer)(parsed.buffer);
        const extension = mimeType === 'image/jpeg' || mimeType === 'image/jpg' ? '.jpg' : '.png';
        const upload = await (0, supabase_util_1.uploadBufferToSupabase)(parsed.buffer, {
            folder: 'signatures',
            fileName: `${signer.documentId}-${signer.id}-signature${extension}`,
            contentType: mimeType,
        });
        artifactUrl = upload.path;
    }
    const updated = await prisma_1.prisma.signingSession.update({
        where: { id: session.id },
        data: {
            signatureArtifactType: params.type,
            signatureArtifactHash: artifactHash,
            signatureArtifactAlgorithm: 'SHA-256',
            signatureArtifactUrl: artifactUrl ?? null,
        },
    });
    const auditEvent = await prisma_1.prisma.auditEvent.create({
        data: {
            documentId: signer.documentId,
            actorType: client_1.AuditActorType.SIGNER,
            actorSignerId: signer.id,
            eventType: client_1.AuditEventType.SIGNATURE_CAPTURED,
            ipAddress: params.meta.ipAddress,
            userAgent: params.meta.userAgent,
            metadata: { signingSessionId: session.id, signatureArtifactHash: artifactHash },
        },
    });
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.hash.computed',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        correlationId: params.meta.correlationId,
        data: {
            signatureArtifactHash: {
                hash: artifactHash,
                algorithm: 'SHA-256',
                computedAt: updated.updatedAt.toISOString(),
            },
        },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.audit.appended',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        correlationId: params.meta.correlationId,
        data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }));
    return { signatureArtifactHash: artifactHash, signatureArtifactUrl: artifactUrl ?? null };
}
async function applySignature(params) {
    const signer = await getSignerAndDocument(params.documentId, params.signerId);
    assertDocumentWritable(signer.document);
    await ensureSignerInOrder(signer.documentId, signer.id);
    if (signer.status === client_1.SignerStatus.SIGNED) {
        throw (0, http_error_util_1.createHttpError)(409, 'ALREADY_SIGNED', 'Signing already completed');
    }
    if (signer.status === client_1.SignerStatus.DECLINED) {
        throw (0, http_error_util_1.createHttpError)(409, 'SIGNING_DECLINED', 'Signing already declined');
    }
    const session = await prisma_1.prisma.signingSession.findUnique({
        where: { id: params.signingSessionId },
    });
    if (!session || session.signerId !== signer.id || session.documentId !== signer.documentId) {
        throw (0, http_error_util_1.createHttpError)(404, 'SESSION_NOT_FOUND', 'Signing session not found');
    }
    if (session.status !== client_1.SigningSessionStatus.ACTIVE) {
        throw (0, http_error_util_1.createHttpError)(409, 'STALE_SESSION', 'Signing session is not active');
    }
    if (!session.manifestJson || !session.manifestHash) {
        throw (0, http_error_util_1.createHttpError)(400, 'MANIFEST_MISSING', 'Manifest missing');
    }
    if (!session.signatureArtifactHash || !session.signatureArtifactType) {
        throw (0, http_error_util_1.createHttpError)(400, 'SIGNATURE_MISSING', 'Signature artifact missing');
    }
    if (session.preHash !== signer.document.hash) {
        throw (0, http_error_util_1.createHttpError)(409, 'PREHASH_MISMATCH', 'Pre-hash mismatch');
    }
    if (session.fieldVersion !== signer.document.fieldVersion) {
        throw (0, http_error_util_1.createHttpError)(409, 'STALE_SESSION', 'Signing session is stale');
    }
    const manifest = session.manifestJson;
    const fieldsToApply = manifest.fields;
    const pdfSource = signer.document.signedFileUrl || signer.document.fileUrl || signer.document.filePublicId;
    const pdfBuffer = await (0, supabase_util_1.downloadStoredFile)(pdfSource);
    let signatureImageParsed = null;
    if (session.signatureArtifactType !== client_1.SignatureArtifactType.TYPED) {
        if (!session.signatureArtifactUrl) {
            throw (0, http_error_util_1.createHttpError)(400, 'SIGNATURE_MISSING', 'Signature artifact URL missing');
        }
        const imageBuffer = await (0, supabase_util_1.downloadStoredFile)(session.signatureArtifactUrl);
        const artifactHash = (0, hash_util_1.hashBuffer)(imageBuffer);
        if (artifactHash !== session.signatureArtifactHash) {
            throw (0, http_error_util_1.createHttpError)(409, 'MANIFEST_MISMATCH', 'Signature artifact hash mismatch');
        }
        const isPng = imageBuffer.subarray(0, 4).toString('hex') === '89504e47';
        const isJpeg = imageBuffer.subarray(0, 2).toString('hex') === 'ffd8';
        const mimeType = isJpeg ? 'image/jpeg' : isPng ? 'image/png' : 'image/png';
        signatureImageParsed = { mimeType, buffer: imageBuffer };
    }
    const signedBuffer = await (0, pdf_signature_util_1.applySignatureToPdf)({
        pdfBuffer,
        fields: fieldsToApply,
        signatureImage: signatureImageParsed,
    });
    const postHash = (0, hash_util_1.hashBuffer)(signedBuffer);
    const postComputedAt = new Date();
    const upload = await (0, supabase_util_1.uploadBufferToSupabase)(signedBuffer, {
        folder: 'signed',
        fileName: `${signer.document.title}-signed.pdf`,
        contentType: 'application/pdf',
    });
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const signatures = await Promise.all(fieldsToApply.map((field) => tx.signature.create({
            data: {
                documentId: signer.documentId,
                signerId: signer.id,
                fieldId: field.fieldId,
                value: field.value,
                signingSessionId: session.id,
                manifestHash: session.manifestHash,
                artifactHash: session.signatureArtifactHash,
                artifactType: session.signatureArtifactType,
            },
        })));
        for (const field of fieldsToApply) {
            const shouldSign = field.type === 'SIGNATURE' || field.type === 'INITIAL';
            await tx.signatureField.update({
                where: { id: field.fieldId },
                data: {
                    value: field.value,
                    status: shouldSign ? client_1.FieldStatus.SIGNED : client_1.FieldStatus.FILLED,
                },
            });
        }
        await tx.signer.update({
            where: { id: signer.id },
            data: { status: client_1.SignerStatus.SIGNED, signedAt: new Date() },
        });
        const remaining = await tx.signer.count({
            where: { documentId: signer.documentId, status: { not: client_1.SignerStatus.SIGNED } },
        });
        const updated = await tx.document.update({
            where: { id: signer.documentId },
            data: {
                signedFileUrl: upload.path,
                signedFilePublicId: upload.path,
                postHash,
                postHashAlgorithm: 'SHA-256',
                postHashComputedAt: postComputedAt,
                postHashVersion: { increment: 1 },
                status: remaining === 0 ? client_1.DocumentStatus.SIGNED : client_1.DocumentStatus.IN_PROGRESS,
                signedAt: remaining === 0 ? new Date() : signer.document.signedAt ?? null,
                version: { increment: 1 },
            },
        });
        const sessionUpdates = {
            status: client_1.SigningSessionStatus.FINALIZED,
        };
        if (env_1.env.manifestHmacSecret && session.manifestHash) {
            sessionUpdates.serverAttestation = (0, crypto_util_1.hmacSha256Hex)(env_1.env.manifestHmacSecret, `${session.manifestHash}${postHash}`);
            sessionUpdates.serverAttestationAlgorithm = 'HMAC-SHA256';
        }
        await tx.signingSession.update({
            where: { id: session.id },
            data: sessionUpdates,
        });
        const auditEvent = await tx.auditEvent.create({
            data: {
                documentId: signer.documentId,
                actorType: client_1.AuditActorType.SIGNER,
                actorSignerId: signer.id,
                eventType: client_1.AuditEventType.SIGNATURE_APPLIED,
                ipAddress: params.meta.ipAddress,
                userAgent: params.meta.userAgent,
                metadata: {
                    signingSessionId: session.id,
                    manifestHash: session.manifestHash,
                    signatureArtifactHash: session.signatureArtifactHash,
                    postHash,
                },
            },
        });
        return { signatures, updated, remaining, auditEvent };
    });
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.signature.applied',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        correlationId: params.meta.correlationId,
        data: {
            signerId: signer.id,
            signatureIds: result.signatures.map((sig) => sig.id),
            postHash: {
                hash: postHash,
                algorithm: 'SHA-256',
                computedAt: postComputedAt.toISOString(),
            },
        },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.hash.computed',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        correlationId: params.meta.correlationId,
        data: {
            postHash: {
                hash: postHash,
                algorithm: 'SHA-256',
                computedAt: postComputedAt.toISOString(),
            },
        },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.signer.status.changed',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        correlationId: params.meta.correlationId,
        data: {
            signer: {
                id: signer.id,
                email: signer.email,
                name: signer.name,
                status: client_1.SignerStatus.SIGNED,
                order: signer.signOrder,
                viewedAt: signer.viewedAt?.toISOString() ?? null,
                signedAt: new Date().toISOString(),
            },
            previousStatus: signer.status,
        },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.updated',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        correlationId: params.meta.correlationId,
        data: {
            document: {
                id: result.updated.id,
                title: result.updated.title,
                status: result.updated.status,
                ownerId: result.updated.ownerId,
                version: result.updated.version,
                updatedAt: result.updated.updatedAt.toISOString(),
            },
            changes: ['status', 'signedAt', 'postHash', 'signedFileUrl'],
        },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.audit.appended',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        correlationId: params.meta.correlationId,
        data: { auditEventId: result.auditEvent.id, eventType: result.auditEvent.eventType },
    }));
    const owner = await prisma_1.prisma.user.findUnique({
        where: { id: signer.document.ownerId },
        select: { name: true, email: true },
    });
    const ownerName = owner?.name?.trim() || owner?.email || 'Document owner';
    const signerName = signer.name ?? signer.email;
    const docLink = `${env_1.env.appBaseUrl}/app/documents`;
    const ownerEmail = owner?.email
        ? (0, notification_service_1.buildNotificationEmail)('document.signed', {
            recipientName: ownerName,
            signerName,
            documentTitle: signer.document.title,
            actionUrl: docLink,
        })
        : null;
    try {
        await (0, notification_service_1.dispatchNotification)({
            eventType: 'document.signed',
            orgId: signer.document.ownerId,
            docId: signer.documentId,
            recipientUserId: signer.document.ownerId,
            actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
            title: 'Document signed',
            message: `${signerName} signed "${signer.document.title}".`,
            link: docLink,
            idempotencyKey: `document-signed:${signer.id}`,
            payload: {
                documentId: signer.documentId,
                documentTitle: signer.document.title,
                signerId: signer.id,
                signerEmail: signer.email,
            },
            email: owner?.email && ownerEmail
                ? {
                    to: owner.email,
                    subject: ownerEmail.subject,
                    text: ownerEmail.text,
                    html: ownerEmail.html,
                }
                : undefined,
        });
    }
    catch (err) {
        console.warn('Notification dispatch failed', err);
    }
    const signerEmail = (0, notification_service_1.buildNotificationEmail)('signer.signed', {
        recipientName: signerName,
        documentTitle: signer.document.title,
        actionUrl: env_1.env.appBaseUrl,
    });
    try {
        await (0, notification_service_1.notifyUserByEmail)({
            email: signer.email,
            forceEmail: true,
            input: {
                eventType: 'signer.signed',
                orgId: signer.document.ownerId,
                docId: signer.documentId,
                actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
                title: 'Signature submitted',
                message: `You signed "${signer.document.title}".`,
                link: env_1.env.appBaseUrl,
                idempotencyKey: `signer-signed:${signer.id}`,
                payload: {
                    documentId: signer.documentId,
                    documentTitle: signer.document.title,
                },
                email: {
                    to: signer.email,
                    subject: signerEmail.subject,
                    text: signerEmail.text,
                    html: signerEmail.html,
                },
            },
        });
    }
    catch (err) {
        console.warn('Signer notification failed', err);
    }
    return { postHash, documentVersion: result.updated.version, status: result.updated.status };
}
async function completeDocument(ownerId, documentId, meta) {
    const document = await prisma_1.prisma.document.findFirst({
        where: { id: documentId, ownerId },
        include: { signers: true, auditEvents: { orderBy: { createdAt: 'asc' } } },
    });
    if (!document) {
        throw (0, http_error_util_1.createHttpError)(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
    }
    if (document.lockedAt) {
        throw (0, http_error_util_1.createHttpError)(409, 'DOC_LOCKED', 'Document already locked');
    }
    const remaining = document.signers.filter((signer) => signer.status !== client_1.SignerStatus.SIGNED);
    if (remaining.length > 0) {
        throw (0, http_error_util_1.createHttpError)(409, 'SIGNERS_PENDING', 'All signers must complete signing');
    }
    const auditSummary = document.auditEvents.map((event) => `${audit_constants_1.AUDIT_EVENT_LABELS[event.eventType]} - ${event.createdAt.toISOString()}`);
    const certificateBuffer = await (0, pdf_util_1.generateCertificatePdf)({
        title: document.title,
        documentHash: document.hash,
        completedAt: new Date(),
        signers: document.signers.map((signer) => ({
            name: signer.name,
            email: signer.email,
            signedAt: signer.signedAt,
        })),
        auditSummary,
    });
    const upload = await (0, supabase_util_1.uploadBufferToSupabase)(certificateBuffer, {
        folder: 'certificates',
        fileName: `${document.title}-certificate.pdf`,
        contentType: 'application/pdf',
    });
    const certificateHash = (0, hash_util_1.hashBuffer)(certificateBuffer);
    const { updated, auditEvent } = await prisma_1.prisma.$transaction(async (tx) => {
        const updatedDoc = await tx.document.update({
            where: { id: document.id },
            data: {
                status: client_1.DocumentStatus.COMPLETED,
                completedAt: new Date(),
                lockedAt: new Date(),
                version: { increment: 1 },
            },
        });
        await tx.certificate.upsert({
            where: { documentId: document.id },
            update: {
                url: upload.path,
                publicId: upload.path,
                hash: certificateHash,
                summary: {
                    documentId: document.id,
                    title: document.title,
                    hash: document.hash,
                    signers: document.signers.map((signer) => ({
                        name: signer.name,
                        email: signer.email,
                        signedAt: signer.signedAt,
                    })),
                    auditSummary,
                },
            },
            create: {
                documentId: document.id,
                url: upload.path,
                publicId: upload.path,
                hash: certificateHash,
                summary: {
                    documentId: document.id,
                    title: document.title,
                    hash: document.hash,
                    signers: document.signers.map((signer) => ({
                        name: signer.name,
                        email: signer.email,
                        signedAt: signer.signedAt,
                    })),
                    auditSummary,
                },
            },
        });
        const auditEvent = await tx.auditEvent.create({
            data: {
                documentId: document.id,
                actorType: client_1.AuditActorType.SYSTEM,
                eventType: client_1.AuditEventType.DOCUMENT_COMPLETED,
                ipAddress: meta.ipAddress,
                userAgent: meta.userAgent,
                metadata: {
                    preHash: document.hash,
                    postHash: document.postHash,
                    certificateHash,
                },
            },
        });
        return { updated: updatedDoc, auditEvent };
    });
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.completed',
        orgId: ownerId,
        docId: document.id,
        actor: { userId: ownerId, role: 'SENDER' },
        correlationId: meta.correlationId,
        data: {
            document: {
                id: updated.id,
                title: updated.title,
                status: updated.status,
                ownerId: updated.ownerId,
                version: updated.version,
                updatedAt: updated.updatedAt.toISOString(),
            },
            completedAt: updated.completedAt?.toISOString() ?? new Date().toISOString(),
        },
    }));
    await (0, socket_1.emitEvent)((0, events_1.createEvent)({
        event: 'doc.audit.appended',
        orgId: ownerId,
        docId: document.id,
        actor: { userId: ownerId, role: 'SENDER' },
        correlationId: meta.correlationId,
        data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }));
    const owner = await prisma_1.prisma.user.findUnique({
        where: { id: ownerId },
        select: { name: true, email: true },
    });
    const ownerName = owner?.name?.trim() || owner?.email || 'Document owner';
    const docLink = `${env_1.env.appBaseUrl}/app/documents`;
    const ownerEmail = owner?.email
        ? (0, notification_service_1.buildNotificationEmail)('document.completed', {
            recipientName: ownerName,
            documentTitle: document.title,
            actionUrl: docLink,
            orgName: ownerName,
        })
        : null;
    try {
        await (0, notification_service_1.dispatchNotification)({
            eventType: 'document.completed',
            orgId: ownerId,
            docId: document.id,
            recipientUserId: ownerId,
            actor: { userId: ownerId, role: 'SENDER', email: owner?.email ?? undefined },
            title: 'Document completed',
            message: `"${document.title}" is fully signed.`,
            link: docLink,
            idempotencyKey: `document-completed:${document.id}`,
            payload: {
                documentId: document.id,
                documentTitle: document.title,
            },
            email: owner?.email && ownerEmail
                ? {
                    to: owner.email,
                    subject: ownerEmail.subject,
                    text: ownerEmail.text,
                    html: ownerEmail.html,
                }
                : undefined,
        });
    }
    catch (err) {
        console.warn('Notification dispatch failed', err);
    }
    for (const signer of document.signers) {
        const signerName = signer.name ?? signer.email;
        const signerEmail = (0, notification_service_1.buildNotificationEmail)('document.completed', {
            recipientName: signerName,
            documentTitle: document.title,
            actionUrl: docLink,
            orgName: ownerName,
        });
        try {
            await (0, notification_service_1.notifyUserByEmail)({
                email: signer.email,
                forceEmail: true,
                input: {
                    eventType: 'document.completed',
                    orgId: ownerId,
                    docId: document.id,
                    actor: { userId: ownerId, role: 'SENDER', email: owner?.email ?? undefined },
                    title: 'Document completed',
                    message: `"${document.title}" is fully signed.`,
                    link: docLink,
                    idempotencyKey: `document-completed:${document.id}:${signer.id}`,
                    payload: {
                        documentId: document.id,
                        documentTitle: document.title,
                    },
                    email: {
                        to: signer.email,
                        subject: signerEmail.subject,
                        text: signerEmail.text,
                        html: signerEmail.html,
                    },
                },
            });
        }
        catch (err) {
            console.warn('Signer notification failed', err);
        }
    }
    return updated;
}
async function getAuditReport(ownerId, documentId) {
    const document = await prisma_1.prisma.document.findFirst({
        where: { id: documentId, ownerId },
        include: {
            signers: true,
            signatures: true,
            auditEvents: { orderBy: { createdAt: 'asc' } },
            signingSessions: true,
        },
    });
    if (!document) {
        throw (0, http_error_util_1.createHttpError)(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
    }
    return {
        document: {
            id: document.id,
            title: document.title,
            status: document.status,
            preHash: document.hash,
            preHashAlgorithm: document.hashAlgorithm,
            preHashComputedAt: document.hashComputedAt?.toISOString() ?? null,
            postHash: document.postHash,
            postHashAlgorithm: document.postHashAlgorithm,
            postHashComputedAt: document.postHashComputedAt?.toISOString() ?? null,
            postHashVersion: document.postHashVersion,
            lockedAt: document.lockedAt?.toISOString() ?? null,
        },
        signers: document.signers.map((signer) => ({
            id: signer.id,
            email: signer.email,
            name: signer.name,
            status: signer.status,
            signOrder: signer.signOrder,
            viewedAt: signer.viewedAt?.toISOString() ?? null,
            signedAt: signer.signedAt?.toISOString() ?? null,
            declinedAt: signer.declinedAt?.toISOString() ?? null,
            declineReason: signer.declineReason ?? null,
        })),
        signingSessions: document.signingSessions.map((session) => ({
            id: session.id,
            signerId: session.signerId,
            status: session.status,
            preHash: session.preHash,
            preHashAlgorithm: session.preHashAlgorithm,
            preHashComputedAt: session.preHashComputedAt.toISOString(),
            manifestHash: session.manifestHash,
            signatureArtifactHash: session.signatureArtifactHash,
            signatureArtifactType: session.signatureArtifactType,
            serverAttestation: session.serverAttestation,
            serverAttestationAlgorithm: session.serverAttestationAlgorithm,
            createdAt: session.createdAt.toISOString(),
        })),
        signatures: document.signatures.map((signature) => ({
            id: signature.id,
            fieldId: signature.fieldId,
            signerId: signature.signerId,
            signingSessionId: signature.signingSessionId,
            manifestHash: signature.manifestHash,
            artifactHash: signature.artifactHash,
            artifactType: signature.artifactType,
            signedAt: signature.signedAt.toISOString(),
        })),
        auditEvents: document.auditEvents.map((event) => ({
            id: event.id,
            eventType: event.eventType,
            actorType: event.actorType,
            ipAddress: event.ipAddress,
            userAgent: event.userAgent,
            metadata: event.metadata,
            createdAt: event.createdAt.toISOString(),
        })),
    };
}
