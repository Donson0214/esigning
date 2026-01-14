"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = createDocument;
exports.listDocuments = listDocuments;
exports.getDocument = getDocument;
exports.sendDocument = sendDocument;
exports.getDocumentStats = getDocumentStats;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../config/prisma");
const env_1 = require("../../config/env");
const cloudinary_util_1 = require("../../utils/cloudinary.util");
const hash_util_1 = require("../../utils/hash.util");
const http_error_util_1 = require("../../utils/http-error.util");
const crypto_util_1 = require("../../utils/crypto.util");
const mailer_util_1 = require("../../utils/mailer.util");
async function createDocument(params) {
    const { ownerId, title, file, meta } = params;
    const hash = (0, hash_util_1.hashBuffer)(file.buffer);
    const upload = await (0, cloudinary_util_1.uploadBufferToCloudinary)(file.buffer, {
        folder: 'esigning/documents',
        fileName: file.originalname,
        resourceType: 'raw',
    });
    const document = await prisma_1.prisma.document.create({
        data: {
            ownerId,
            title,
            fileUrl: upload.url,
            filePublicId: upload.publicId,
            fileName: file.originalname,
            fileMimeType: file.mimetype,
            fileSize: file.size,
            hash,
            status: client_1.DocumentStatus.DRAFT,
            auditEvents: {
                create: {
                    actorType: 'SENDER',
                    actorUserId: ownerId,
                    eventType: 'DOCUMENT_UPLOADED',
                    ipAddress: meta.ipAddress,
                    userAgent: meta.userAgent,
                },
            },
        },
    });
    return document;
}
async function listDocuments(ownerId) {
    return prisma_1.prisma.document.findMany({
        where: { ownerId },
        orderBy: { createdAt: 'desc' },
        include: {
            signers: {
                select: { id: true, email: true, name: true, status: true, signOrder: true, viewedAt: true, signedAt: true },
            },
        },
    });
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
    return document;
}
function buildSigningEmail(link, title) {
    const subject = `Please sign: ${title}`;
    const text = `You have been requested to sign "${title}".\n\nSign here: ${link}\n\nIf you did not expect this, ignore this email.`;
    const html = `<p>You have been requested to sign "<strong>${title}</strong>".</p><p><a href="${link}">Open signing link</a></p><p>If you did not expect this, ignore this email.</p>`;
    return { subject, text, html };
}
async function sendDocument(params) {
    const { ownerId, documentId, payload, meta } = params;
    const document = await prisma_1.prisma.document.findFirst({
        where: { id: documentId, ownerId },
    });
    if (!document) {
        throw (0, http_error_util_1.createHttpError)(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
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
        const fieldsData = payload.fields.map((field) => {
            const signer = (field.signerEmail ? signersByEmail.get(field.signerEmail.toLowerCase()) : undefined) ??
                (field.signerIndex !== undefined ? signersByIndex.get(field.signerIndex) : undefined);
            if (!signer) {
                throw (0, http_error_util_1.createHttpError)(400, 'INVALID_SIGNER_REFERENCE', 'Field signer reference is invalid');
            }
            return {
                documentId: document.id,
                signerId: signer.id,
                type: field.type,
                page: field.page,
                x: field.x,
                y: field.y,
                width: field.width,
                height: field.height,
            };
        });
        await tx.signatureField.createMany({ data: fieldsData });
        const updated = await tx.document.update({
            where: { id: document.id },
            data: {
                status: client_1.DocumentStatus.SENT,
                sentAt: new Date(),
            },
        });
        await tx.auditEvent.create({
            data: {
                documentId: document.id,
                actorType: 'SENDER',
                actorUserId: ownerId,
                eventType: 'DOCUMENT_SENT',
                ipAddress: meta.ipAddress,
                userAgent: meta.userAgent,
            },
        });
        return { updated, createdSigners };
    });
    for (const signer of result.createdSigners) {
        const token = signerTokens[signer.email];
        if (!token) {
            throw (0, http_error_util_1.createHttpError)(500, 'SIGNING_TOKEN_MISSING', 'Signing token missing');
        }
        const link = `${env_1.env.signingAppUrl}/${token}`;
        const message = buildSigningEmail(link, document.title);
        await (0, mailer_util_1.sendMail)({
            to: signer.email,
            subject: message.subject,
            text: message.text,
            html: message.html,
        });
    }
    return result.updated;
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
        signed: counts.SIGNED ?? 0,
        completed: counts.COMPLETED ?? 0,
        draft: counts.DRAFT ?? 0,
        pending: (counts.SENT ?? 0) + (counts.VIEWED ?? 0) + (counts.SIGNED ?? 0),
    };
}
