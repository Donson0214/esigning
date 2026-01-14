import type { NotificationSummary, NotificationEventType } from '@shared/events';

export type NotificationRecord = NotificationSummary & {
  deliveredVia?: string[];
};

export type NotificationPreferences = {
  emailEnabled: boolean;
  realtimeEnabled: boolean;
  inAppEnabled: boolean;
  eventOverrides?: Record<string, boolean>;
};

export type NotificationResponse = {
  notifications: NotificationRecord[];
  unreadCount: number;
};

export type NotificationReadResponse = {
  updated: number;
  unreadCount: number;
};

export type NotificationPreferenceResponse = {
  preferences: NotificationPreferences;
};

export type NotificationMeta = {
  icon: 'check' | 'eye' | 'alert' | 'clock' | 'mail' | 'pen';
  tone: 'success' | 'info' | 'warning' | 'danger' | 'neutral';
};

export const DEFAULT_NOTIFICATION_META: NotificationMeta = {
  icon: 'mail',
  tone: 'neutral',
};

export const mapNotificationMeta = (eventType: NotificationEventType): NotificationMeta => {
  switch (eventType) {
    case 'document.signed':
    case 'signer.signed':
      return { icon: 'check', tone: 'success' };
    case 'document.viewed':
    case 'signer.joined':
      return { icon: 'eye', tone: 'info' };
    case 'document.completed':
      return { icon: 'check', tone: 'success' };
    case 'document.declined':
    case 'signer.declined':
      return { icon: 'alert', tone: 'danger' };
    case 'document.expired':
    case 'reminder.expiring_soon':
      return { icon: 'clock', tone: 'warning' };
    case 'signer.invited':
    case 'user.invited':
    case 'access.granted':
      return { icon: 'mail', tone: 'info' };
    case 'access.revoked':
      return { icon: 'alert', tone: 'warning' };
    case 'reminder.pending_signature':
      return { icon: 'clock', tone: 'info' };
    case 'system.error':
      return { icon: 'alert', tone: 'danger' };
    default:
      return DEFAULT_NOTIFICATION_META;
  }
};
