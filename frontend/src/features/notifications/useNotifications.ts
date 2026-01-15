import { computed, ref } from 'vue';
import type { AnyEventEnvelope } from '@shared/events';
import { connectSocket, onSocketEvent } from '@/shared/lib/socket';
import { fetchNotifications, markNotificationsRead } from './api';
import type { NotificationRecord, NotificationResponse } from './types';
import { mapNotificationMeta } from './types';
import { useToast } from '@/shared/lib/toast';

const notifications = ref<NotificationRecord[]>([]);
const unreadCount = ref(0);
const loading = ref(false);
const initialized = ref(false);
const knownIds = new Set<string>();

const toastEventTypes = new Set([
  'document.signed',
  'document.completed',
  'signer.invited',
  'signer.joined',
  'document.viewed',
]);

const applyResponse = (response: NotificationResponse) => {
  notifications.value = response.notifications;
  unreadCount.value = response.unreadCount;
  knownIds.clear();
  response.notifications.forEach((item) => knownIds.add(item.id));
};

const addNotification = (notification: NotificationRecord) => {
  if (knownIds.has(notification.id)) return;
  knownIds.add(notification.id);
  notifications.value = [notification, ...notifications.value];
  if (!notification.isRead) {
    unreadCount.value += 1;
  }
};

const handleSocketEvent = (event: AnyEventEnvelope) => {
  if (event.event === 'notification.created') {
    const notification = event.data.notification as NotificationRecord;
    addNotification(notification);
    if (toastEventTypes.has(notification.eventType)) {
      const { pushToast } = useToast();
      const meta = mapNotificationMeta(notification.eventType);
      pushToast({
        id: notification.id,
        title: notification.title,
        message: notification.message,
        tone: meta.tone,
        link: notification.link,
      });
    }
  }
  if (event.event === 'notification.read') {
    const ids = event.data.notificationIds ?? [];
    if (event.data.all) {
      notifications.value = notifications.value.map((item: NotificationRecord) => ({ ...item, isRead: true }));
      unreadCount.value = 0;
      return;
    }
    if (ids.length === 0) return;
    let updated = 0;
    notifications.value = notifications.value.map((item: NotificationRecord) => {
      if (ids.includes(item.id) && !item.isRead) {
        updated += 1;
        return { ...item, isRead: true };
      }
      return item;
    });
    unreadCount.value = Math.max(0, unreadCount.value - updated);
  }
};

const refresh = async () => {
  loading.value = true;
  try {
    const response = await fetchNotifications(50);
    applyResponse(response);
  } catch {
    // ignore fetch failures to keep UI responsive
  } finally {
    loading.value = false;
  }
};

const markRead = async (ids: string[]) => {
  if (ids.length === 0) return;
  try {
    const response = await markNotificationsRead({ ids });
    notifications.value = notifications.value.map((item: NotificationRecord) =>
      ids.includes(item.id) ? { ...item, isRead: true } : item,
    );
    unreadCount.value = response.unreadCount;
  } catch {
    // ignore update failures
  }
};

const markAllRead = async () => {
  try {
    const response = await markNotificationsRead({ all: true });
    notifications.value = notifications.value.map((item: NotificationRecord) => ({ ...item, isRead: true }));
    unreadCount.value = response.unreadCount;
  } catch {
    // ignore update failures
  }
};

const initNotifications = async () => {
  if (initialized.value) return;
  initialized.value = true;
  connectSocket();
  await refresh();
  onSocketEvent(handleSocketEvent);
};

export const useNotifications = () => ({
  notifications: computed(() => notifications.value),
  unreadCount: computed(() => unreadCount.value),
  loading: computed(() => loading.value),
  refresh,
  initNotifications,
  markRead,
  markAllRead,
  clear: () => {
    notifications.value = [];
    unreadCount.value = 0;
    knownIds.clear();
    initialized.value = false;
  },
});
