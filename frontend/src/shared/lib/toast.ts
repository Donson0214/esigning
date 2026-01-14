import { ref } from 'vue';
import { createId } from './ids';

export type ToastPayload = {
  id?: string;
  title: string;
  message?: string;
  tone?: 'success' | 'info' | 'warning' | 'danger' | 'neutral';
  link?: string;
};

export type Toast = ToastPayload & { id: string };

const toasts = ref<Toast[]>([]);

const removeToast = (id: string) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

const pushToast = (payload: ToastPayload, durationMs = 4500) => {
  const id = payload.id ?? createId();
  if (toasts.value.some((toast) => toast.id === id)) return id;
  const toast: Toast = { ...payload, id };
  toasts.value = [toast, ...toasts.value].slice(0, 5);
  window.setTimeout(() => removeToast(id), durationMs);
  return id;
};

export const useToast = () => ({
  toasts,
  pushToast,
  removeToast,
});
