"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationPreferences = getNotificationPreferences;
exports.updateNotificationPreferences = updateNotificationPreferences;
exports.listNotifications = listNotifications;
exports.markNotificationsRead = markNotificationsRead;
exports.dispatchNotification = dispatchNotification;
exports.notifyUserByEmail = notifyUserByEmail;
exports.buildNotificationEmail = buildNotificationEmail;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../config/prisma");
const events_1 = require("../../shared/events");
const socket_1 = require("../../realtime/socket");
const mailer_util_1 = require("../../utils/mailer.util");
const notification_templates_1 = require("./notification.templates");
const DEFAULT_PREFERENCES = {
    emailEnabled: true,
    realtimeEnabled: true,
    inAppEnabled: true,
    eventOverrides: {},
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const toActor = (actor) => actor
    ? {
        actorUserId: actor.userId,
        actorEmail: actor.email,
        actorRole: actor.role,
    }
    : {};
const fromActorFields = (notification) => {
    if (!notification.actorUserId && !notification.actorEmail && !notification.actorRole) {
        return undefined;
    }
    return {
        userId: notification.actorUserId ?? 'system',
        role: notification.actorRole ?? 'SYSTEM',
        email: notification.actorEmail ?? undefined,
    };
};
const mapToSummary = (notification) => ({
    id: notification.id,
    eventType: notification.eventType,
    orgId: notification.orgId,
    docId: notification.docId ?? undefined,
    actor: fromActorFields(notification),
    recipientUserId: notification.userId,
    title: notification.title,
    message: notification.message,
    link: notification.link ?? undefined,
    payload: (notification.payload ?? undefined),
    createdAt: notification.createdAt.toISOString(),
    isRead: notification.isRead,
});
const shouldNotify = (eventType, overrides) => {
    if (!overrides)
        return true;
    const value = overrides[eventType];
    if (value === undefined)
        return true;
    return value;
};
async function createDelivery(notificationId, channel) {
    return prisma_1.prisma.notificationDelivery.upsert({
        where: { notificationId_channel: { notificationId, channel } },
        update: {},
        create: { notificationId, channel },
    });
}
async function updateDelivery(params) {
    return prisma_1.prisma.notificationDelivery.update({
        where: { notificationId_channel: { notificationId: params.notificationId, channel: params.channel } },
        data: {
            status: params.status,
            attempts: { increment: params.attempts ?? 1 },
            lastError: params.error,
            deliveredAt: params.status === 'SENT' ? new Date() : undefined,
        },
    });
}
async function sendEmailWithRetry(payload) {
    const maxAttempts = 3;
    let attempt = 0;
    let lastError = null;
    while (attempt < maxAttempts) {
        attempt += 1;
        try {
            await (0, mailer_util_1.sendMail)(payload);
            return { ok: true, attempts: attempt };
        }
        catch (err) {
            lastError = err;
            await sleep(200 * attempt);
        }
    }
    return { ok: false, attempts: attempt, error: lastError?.message ?? 'SMTP_FAILED' };
}
async function getNotificationPreferences(userId) {
    const prefs = await prisma_1.prisma.notificationPreference.findUnique({ where: { userId } });
    if (!prefs) {
        return DEFAULT_PREFERENCES;
    }
    return {
        emailEnabled: prefs.emailEnabled,
        realtimeEnabled: prefs.realtimeEnabled,
        inAppEnabled: prefs.inAppEnabled,
        eventOverrides: (prefs.eventOverrides ?? {}),
    };
}
async function updateNotificationPreferences(userId, input) {
    const current = await prisma_1.prisma.notificationPreference.findUnique({ where: { userId } });
    const data = {
        emailEnabled: input.emailEnabled ?? current?.emailEnabled ?? DEFAULT_PREFERENCES.emailEnabled,
        realtimeEnabled: input.realtimeEnabled ?? current?.realtimeEnabled ?? DEFAULT_PREFERENCES.realtimeEnabled,
        inAppEnabled: input.inAppEnabled ?? current?.inAppEnabled ?? DEFAULT_PREFERENCES.inAppEnabled,
        eventOverrides: input.eventOverrides ?? current?.eventOverrides ?? DEFAULT_PREFERENCES.eventOverrides,
    };
    const prefs = await prisma_1.prisma.notificationPreference.upsert({
        where: { userId },
        update: data,
        create: { userId, ...data },
    });
    return {
        emailEnabled: prefs.emailEnabled,
        realtimeEnabled: prefs.realtimeEnabled,
        inAppEnabled: prefs.inAppEnabled,
        eventOverrides: (prefs.eventOverrides ?? {}),
    };
}
async function listNotifications(userId, options = {}) {
    const limit = Math.min(Math.max(options.limit ?? 50, 1), 200);
    const notifications = await prisma_1.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        include: { deliveries: true },
    });
    const unreadCount = await prisma_1.prisma.notification.count({
        where: { userId, isRead: false },
    });
    return {
        notifications: notifications.map((notification) => ({
            ...mapToSummary(notification),
            deliveredVia: notification.deliveries
                .filter((delivery) => delivery.status === 'SENT')
                .map((delivery) => delivery.channel),
        })),
        unreadCount,
    };
}
async function markNotificationsRead(params) {
    const { userId, ids, all } = params;
    const where = all ? { userId } : { userId, id: { in: ids ?? [] } };
    const result = await prisma_1.prisma.notification.updateMany({
        where,
        data: { isRead: true },
    });
    const unreadCount = await prisma_1.prisma.notification.count({
        where: { userId, isRead: false },
    });
    await (0, socket_1.emitUserEvent)((0, events_1.createEvent)({
        event: 'notification.read',
        orgId: userId,
        actor: { userId, role: 'SENDER' },
        data: {
            userId,
            notificationIds: all ? undefined : ids,
            all: all ?? false,
            readAt: new Date().toISOString(),
        },
    }), userId);
    return { updated: result.count, unreadCount };
}
async function dispatchNotification(input) {
    const prefs = await getNotificationPreferences(input.recipientUserId);
    const notifyEnabled = shouldNotify(input.eventType, prefs.eventOverrides);
    if (!notifyEnabled && !input.forceEmail) {
        return null;
    }
    const shouldPersist = notifyEnabled && (prefs.inAppEnabled || prefs.realtimeEnabled);
    let notification = null;
    if (shouldPersist) {
        try {
            notification = await prisma_1.prisma.notification.create({
                data: {
                    userId: input.recipientUserId,
                    orgId: input.orgId,
                    docId: input.docId,
                    eventType: input.eventType,
                    title: input.title,
                    message: input.message,
                    link: input.link,
                    payload: (input.payload ?? {}),
                    idempotencyKey: input.idempotencyKey,
                    ...toActor(input.actor),
                    deliveries: {
                        create: prefs.inAppEnabled ? [{ channel: 'IN_APP', status: 'SENT', deliveredAt: new Date() }] : [],
                    },
                },
            });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                err.code === 'P2002' &&
                input.idempotencyKey) {
                const existing = await prisma_1.prisma.notification.findUnique({
                    where: { idempotencyKey: input.idempotencyKey },
                    include: { deliveries: true },
                });
                return existing ? mapToSummary(existing) : null;
            }
            throw err;
        }
    }
    if (notification && prefs.realtimeEnabled) {
        await createDelivery(notification.id, 'REALTIME');
        await (0, socket_1.emitUserEvent)((0, events_1.createEvent)({
            event: 'notification.created',
            orgId: input.orgId,
            docId: input.docId,
            actor: input.actor,
            data: { notification: mapToSummary(notification) },
        }), input.recipientUserId);
        await updateDelivery({
            notificationId: notification.id,
            channel: 'REALTIME',
            status: 'SENT',
        });
    }
    const shouldSendEmail = Boolean(input.email) && (input.forceEmail || prefs.emailEnabled);
    if (shouldSendEmail && input.email) {
        if (notification) {
            await createDelivery(notification.id, 'EMAIL');
        }
        const result = await sendEmailWithRetry(input.email);
        if (notification) {
            await updateDelivery({
                notificationId: notification.id,
                channel: 'EMAIL',
                status: result.ok ? 'SENT' : 'FAILED',
                error: result.ok ? undefined : result.error,
                attempts: result.attempts,
            });
        }
        if (!result.ok) {
            console.error('Notification email failed', {
                notificationId: notification?.id ?? 'email-only',
                to: input.email.to,
                error: result.error,
            });
        }
    }
    return notification ? mapToSummary(notification) : null;
}
async function notifyUserByEmail(params) {
    const email = params.email.trim().toLowerCase();
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (user) {
        return dispatchNotification({
            ...params.input,
            recipientUserId: user.id,
            forceEmail: params.forceEmail,
        });
    }
    if (params.forceEmail && params.input.email) {
        const result = await sendEmailWithRetry(params.input.email);
        if (!result.ok) {
            console.error('Notification email failed', {
                notificationId: 'email-only',
                to: params.input.email.to,
                error: result.error,
            });
        }
    }
    return null;
}
function buildNotificationEmail(template, data) {
    return (0, notification_templates_1.renderEmailTemplate)(template, data);
}
