<template>
  <div class="notifications-page">
    <section class="page-header">
      <h2>Notifications</h2>
      <p>Your recent document and signer updates</p>
    </section>

    <section class="panel">
      <div class="panel-head">
        <h3>All notifications</h3>
        <button class="link-btn" type="button" @click="markAllRead">Mark all as read</button>
      </div>
      <div class="panel-list">
        <button
          v-for="item in notifications"
          :key="item.id"
          class="panel-item"
          type="button"
          @click="openNotification(item)"
        >
          <span class="panel-icon" :class="notificationTone(item.eventType)">
            <svg v-if="notificationIcon(item.eventType) === 'check'" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 12l4 4 8-8" />
            </svg>
            <svg v-else-if="notificationIcon(item.eventType) === 'eye'" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <svg v-else-if="notificationIcon(item.eventType) === 'clock'" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <svg v-else-if="notificationIcon(item.eventType) === 'alert'" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M10 2h4l8 16H2L10 2Z" />
            </svg>
            <svg v-else-if="notificationIcon(item.eventType) === 'pen'" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
            </svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 4h16v12H4z" />
              <path d="m4 8 8 5 8-5" />
            </svg>
          </span>
          <span class="panel-body">
            <span class="panel-title">{{ item.title }}</span>
            <span class="panel-message">{{ item.message }}</span>
            <span class="panel-time">{{ formatRelativeTime(item.createdAt) }}</span>
          </span>
          <span v-if="!item.isRead" class="panel-dot"></span>
        </button>
        <p v-if="notifications.length === 0" class="panel-empty">
          No notifications yet.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { NotificationEventType } from '@shared/events';
import { useRouter } from 'vue-router';
import { useNotifications } from '@/features/notifications/useNotifications';
import { mapNotificationMeta } from '@/features/notifications/types';
import { formatRelativeTime } from '@/shared/lib/time';

const router = useRouter();
const { notifications, markAllRead, markRead } = useNotifications();

const notificationIcon = (eventType: NotificationEventType) => mapNotificationMeta(eventType).icon;
const notificationTone = (eventType: NotificationEventType) => mapNotificationMeta(eventType).tone;

const openNotification = async (item: { id: string; isRead: boolean; link?: string }) => {
  if (!item.isRead) {
    await markRead([item.id]);
  }
  if (item.link) {
    if (item.link.startsWith('http')) {
      window.location.href = item.link;
    } else {
      router.push(item.link);
    }
  }
};
</script>

<style scoped>
.notifications-page {
  display: grid;
  gap: 1.6rem;
}

.page-header h2 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--ink-strong);
}

.page-header p {
  margin: 0.4rem 0 0;
  color: var(--muted);
}

.panel {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: var(--shadow-md);
  display: grid;
  gap: 1rem;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.panel-head h3 {
  margin: 0;
  color: var(--ink-strong);
}

.link-btn {
  border: none;
  background: transparent;
  color: var(--accent);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}

.panel-list {
  display: grid;
  gap: 0.7rem;
}

.panel-item {
  width: 100%;
  border: 1px solid var(--line);
  background: var(--surface-2);
  border-radius: 16px;
  padding: 0.9rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.9rem;
  text-align: left;
  cursor: pointer;
}

.panel-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(51, 92, 255, 0.12);
  color: var(--accent);
}

.panel-icon svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
}

.panel-icon.success {
  color: var(--success);
  background: rgba(22, 163, 74, 0.16);
}

.panel-icon.info {
  color: var(--accent);
  background: rgba(51, 92, 255, 0.12);
}

.panel-icon.warning {
  color: var(--warning);
  background: rgba(249, 115, 22, 0.18);
}

.panel-icon.danger {
  color: var(--danger);
  background: rgba(239, 68, 68, 0.16);
}

.panel-icon.neutral {
  color: var(--muted);
  background: var(--surface-3);
}

.panel-body {
  display: grid;
  gap: 0.3rem;
}

.panel-title {
  font-weight: 600;
  color: var(--ink-strong);
}

.panel-message {
  color: var(--muted);
  font-size: 0.9rem;
}

.panel-time {
  color: var(--muted);
  font-size: 0.75rem;
}

.panel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  align-self: center;
}

.panel-empty {
  margin: 0;
  text-align: center;
  color: var(--muted);
  padding: 1.2rem 0;
}
</style>
