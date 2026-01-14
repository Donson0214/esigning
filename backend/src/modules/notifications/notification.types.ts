import type { EventActor, NotificationEventType } from '../../shared/events';

export type NotificationOverrideMap = Record<string, boolean>;

export type NotificationPreferenceInput = {
  emailEnabled?: boolean;
  realtimeEnabled?: boolean;
  inAppEnabled?: boolean;
  eventOverrides?: NotificationOverrideMap;
};

export type NotificationEmailPayload = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
};

export type NotificationInput = {
  eventType: NotificationEventType;
  orgId: string;
  docId?: string;
  recipientUserId: string;
  actor?: EventActor;
  title: string;
  message: string;
  link?: string;
  payload?: Record<string, unknown>;
  idempotencyKey?: string;
  email?: NotificationEmailPayload;
  forceEmail?: boolean;
};

export type NotificationListOptions = {
  limit?: number;
};
