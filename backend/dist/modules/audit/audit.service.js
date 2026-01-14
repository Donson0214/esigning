"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuditEvent = createAuditEvent;
exports.listAuditEvents = listAuditEvents;
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
