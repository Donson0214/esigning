"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuditEvent = createAuditEvent;
exports.listAuditEvents = listAuditEvents;
exports.listAuditEventsForOwner = listAuditEventsForOwner;
const prisma_1 = require("../../config/prisma");
async function createAuditEvent(input) {
    return prisma_1.prisma.auditEvent.create({
        data: {
            documentId: input.documentId,
            actorType: input.actorType,
            actorUserId: input.actorUserId,
            actorSignerId: input.actorSignerId,
            eventType: input.eventType,
            ipAddress: input.ipAddress,
            userAgent: input.userAgent,
            metadata: input.metadata,
        },
    });
}
async function listAuditEvents(documentId) {
    return prisma_1.prisma.auditEvent.findMany({
        where: { documentId },
        orderBy: { createdAt: 'asc' },
    });
}
async function listAuditEventsForOwner(params) {
    const where = {
        document: { ownerId: params.ownerId },
    };
    if (params.documentId) {
        where.documentId = params.documentId;
    }
    if (params.before) {
        where.createdAt = { lt: params.before };
    }
    return prisma_1.prisma.auditEvent.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: params.limit,
        include: {
            document: { select: { id: true, title: true } },
            actorUser: { select: { id: true, email: true, name: true } },
            actorSigner: { select: { id: true, email: true, name: true } },
        },
    });
}
