import { apiClient } from '@/shared/lib/axios';
import type {
  NotificationPreferenceResponse,
  NotificationPreferences,
  NotificationReadResponse,
  NotificationResponse,
} from './types';

export async function fetchNotifications(limit = 50) {
  const response = await apiClient.get<NotificationResponse>('/notifications', {
    params: { limit },
  });
  return response.data;
}

export async function markNotificationsRead(payload: { ids?: string[]; all?: boolean }) {
  const response = await apiClient.post<NotificationReadResponse>('/notifications/read', payload);
  return response.data;
}

export async function getNotificationPreferences() {
  const response = await apiClient.get<NotificationPreferenceResponse>('/notifications/preferences');
  return response.data;
}

export async function updateNotificationPreferences(payload: Partial<NotificationPreferences>) {
  const response = await apiClient.post<NotificationPreferenceResponse>('/notifications/preferences', payload);
  return response.data;
}
