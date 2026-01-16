import { Prisma, type Notification } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { createEvent, type EventActor, type NotificationSummary } from '../../shared/events';
import { emitUserEvent } from '../../realtime/socket';
import { sendMail } from '../../utils/mailer.util';
import { renderEmailTemplate } from './notification.templates';
import type {
  NotificationInput,
  NotificationListOptions,
  NotificationPreferenceInput,
  NotificationOverrideMap,
} from './notification.types';

const DEFAULT_PREFERENCES = {
  emailEnabled: true,
  realtimeEnabled: true,
  inAppEnabled: true,
  eventOverrides: {} as NotificationOverrideMap,
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const toActor = (actor?: EventActor) =>
  actor
    ? {
        actorUserId: actor.userId,
        actorEmail: actor.email,
        actorRole: actor.role,
      }
    : {};

const fromActorFields = (notification: {
  actorUserId: string | null;
  actorEmail: string | null;
  actorRole: string | null;
}): EventActor | undefined => {
  if (!notification.actorUserId && !notification.actorEmail && !notification.actorRole) {
    return undefined;
  }
  return {
    userId: notification.actorUserId ?? 'system',
    role: notification.actorRole ?? 'SYSTEM',
    email: notification.actorEmail ?? undefined,
  };
};

const mapToSummary = (notification: {
  id: string;
  eventType: string;
  orgId: string;
  docId: string | null;
  userId: string;
  title: string;
  message: string;
  link: string | null;
  payload: Prisma.JsonValue | null;
  createdAt: Date;
  isRead: boolean;
  actorUserId: string | null;
  actorEmail: string | null;
  actorRole: string | null;
}): NotificationSummary => ({
  id: notification.id,
  eventType: notification.eventType as NotificationSummary['eventType'],
  orgId: notification.orgId,
  docId: notification.docId ?? undefined,
  actor: fromActorFields(notification),
  recipientUserId: notification.userId,
  title: notification.title,
  message: notification.message,
  link: notification.link ?? undefined,
  payload: (notification.payload ?? undefined) as Record<string, unknown> | undefined,
  createdAt: notification.createdAt.toISOString(),
  isRead: notification.isRead,
});

const shouldNotify = (eventType: string, overrides?: NotificationOverrideMap | null) => {
  if (!overrides) return true;
  const value = overrides[eventType];
  if (value === undefined) return true;
  return value;
};

async function createDelivery(notificationId: string, channel: 'IN_APP' | 'REALTIME' | 'EMAIL') {
  return prisma.notificationDelivery.upsert({
    where: { notificationId_channel: { notificationId, channel } },
    update: {},
    create: { notificationId, channel },
  });
}

async function updateDelivery(params: {
  notificationId: string;
  channel: 'IN_APP' | 'REALTIME' | 'EMAIL';
  status: 'SENT' | 'FAILED';
  error?: string;
  attempts?: number;
}) {
  return prisma.notificationDelivery.update({
    where: { notificationId_channel: { notificationId: params.notificationId, channel: params.channel } },
    data: {
      status: params.status,
      attempts: { increment: params.attempts ?? 1 },
      lastError: params.error,
      deliveredAt: params.status === 'SENT' ? new Date() : undefined,
    },
  });
}

async function sendEmailWithRetry(payload: {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  attachments?: Array<{ filename: string; content: Buffer; contentType?: string }>;
}) {
  const maxAttempts = 3;
  let attempt = 0;
  let lastError: Error | null = null;
  while (attempt < maxAttempts) {
    attempt += 1;
    try {
      await sendMail(payload);
      return { ok: true, attempts: attempt };
    } catch (err) {
      lastError = err as Error;
      await sleep(200 * attempt);
    }
  }
  return { ok: false, attempts: attempt, error: lastError?.message ?? 'SMTP_FAILED' };
}

export async function getNotificationPreferences(userId: string) {
  const prefs = await prisma.notificationPreference.findUnique({ where: { userId } });
  if (!prefs) {
    return DEFAULT_PREFERENCES;
  }
  return {
    emailEnabled: prefs.emailEnabled,
    realtimeEnabled: prefs.realtimeEnabled,
    inAppEnabled: prefs.inAppEnabled,
    eventOverrides: (prefs.eventOverrides ?? {}) as NotificationOverrideMap,
  };
}

export async function updateNotificationPreferences(userId: string, input: NotificationPreferenceInput) {
  const current = await prisma.notificationPreference.findUnique({ where: { userId } });
  const data = {
    emailEnabled: input.emailEnabled ?? current?.emailEnabled ?? DEFAULT_PREFERENCES.emailEnabled,
    realtimeEnabled: input.realtimeEnabled ?? current?.realtimeEnabled ?? DEFAULT_PREFERENCES.realtimeEnabled,
    inAppEnabled: input.inAppEnabled ?? current?.inAppEnabled ?? DEFAULT_PREFERENCES.inAppEnabled,
    eventOverrides: input.eventOverrides ?? current?.eventOverrides ?? DEFAULT_PREFERENCES.eventOverrides,
  };
  const prefs = await prisma.notificationPreference.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  });
  return {
    emailEnabled: prefs.emailEnabled,
    realtimeEnabled: prefs.realtimeEnabled,
    inAppEnabled: prefs.inAppEnabled,
    eventOverrides: (prefs.eventOverrides ?? {}) as NotificationOverrideMap,
  };
}

export async function listNotifications(userId: string, options: NotificationListOptions = {}) {
  const limit = Math.min(Math.max(options.limit ?? 50, 1), 200);
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: { deliveries: true },
  });
  const unreadCount = await prisma.notification.count({
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

export async function markNotificationsRead(params: { userId: string; ids?: string[]; all?: boolean }) {
  const { userId, ids, all } = params;
  const where = all ? { userId } : { userId, id: { in: ids ?? [] } };
  const result = await prisma.notification.updateMany({
    where,
    data: { isRead: true },
  });
  const unreadCount = await prisma.notification.count({
    where: { userId, isRead: false },
  });
  await emitUserEvent(
    createEvent({
      event: 'notification.read',
      orgId: userId,
      actor: { userId, role: 'SENDER' },
      data: {
        userId,
        notificationIds: all ? undefined : ids,
        all: all ?? false,
        readAt: new Date().toISOString(),
      },
    }),
    userId,
  );
  return { updated: result.count, unreadCount };
}

export async function dispatchNotification(input: NotificationInput) {
  const prefs = await getNotificationPreferences(input.recipientUserId);
  const notifyEnabled = shouldNotify(input.eventType, prefs.eventOverrides);
  if (!notifyEnabled && !input.forceEmail) {
    return null;
  }

  const shouldPersist = notifyEnabled && (prefs.inAppEnabled || prefs.realtimeEnabled);
  let notification: Notification | null = null;

  if (shouldPersist) {
    try {
      notification = await prisma.notification.create({
        data: {
          userId: input.recipientUserId,
          orgId: input.orgId,
          docId: input.docId,
          eventType: input.eventType,
          title: input.title,
          message: input.message,
          link: input.link,
          payload: (input.payload ?? {}) as Prisma.InputJsonValue,
          idempotencyKey: input.idempotencyKey,
          ...toActor(input.actor),
          deliveries: {
            create: prefs.inAppEnabled ? [{ channel: 'IN_APP', status: 'SENT', deliveredAt: new Date() }] : [],
          },
        },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002' &&
        input.idempotencyKey
      ) {
        const existing = await prisma.notification.findUnique({
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
    await emitUserEvent(
      createEvent({
        event: 'notification.created',
        orgId: input.orgId,
        docId: input.docId,
        actor: input.actor,
        data: { notification: mapToSummary(notification) },
      }),
      input.recipientUserId,
    );
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

export async function notifyUserByEmail(params: {
  email: string;
  input: Omit<NotificationInput, 'recipientUserId'>;
  forceEmail?: boolean;
}) {
  const email = params.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
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

export function buildNotificationEmail(template: Parameters<typeof renderEmailTemplate>[0], data: Parameters<typeof renderEmailTemplate>[1]) {
  return renderEmailTemplate(template, data);
}
