"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistEvent = persistEvent;
exports.listDocumentEvents = listDocumentEvents;
const prisma_1 = require("../config/prisma");
async function persistEvent(event) {
    if (!event.docId)
        return;
    await prisma_1.prisma.documentEvent.create({
        data: {
            documentId: event.docId,
            orgId: event.orgId,
            event: event.event,
            version: event.version,
            payload: event,
        },
    });
}
async function listDocumentEvents(docId, limit) {
    const rows = await prisma_1.prisma.documentEvent.findMany({
        where: { documentId: docId },
        orderBy: { createdAt: 'desc' },
        take: limit,
    });
    return rows.map((row) => row.payload).reverse();
}
