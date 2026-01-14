"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = getUserById;
exports.updateUser = updateUser;
const prisma_1 = require("../../config/prisma");
async function getUserById(id) {
    return prisma_1.prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            jobTitle: true,
            photoUrl: true,
            createdAt: true,
        },
    });
}
async function updateUser(id, data) {
    return prisma_1.prisma.user.update({
        where: { id },
        data: {
            name: data.name ?? undefined,
            jobTitle: data.jobTitle ?? undefined,
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            jobTitle: true,
            photoUrl: true,
            createdAt: true,
        },
    });
}
