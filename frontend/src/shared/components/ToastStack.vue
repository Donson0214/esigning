<template>
  <Teleport to="body">
    <div class="toast-stack" role="status" aria-live="polite">
      <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.tone || 'neutral'">
        <div class="toast-body" @click="handleToastClick(toast)">
          <p class="toast-title">{{ toast.title }}</p>
          <p v-if="toast.message" class="toast-message">{{ toast.message }}</p>
        </div>
        <button class="toast-close" type="button" @click="dismiss(toast.id)">x</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useToast, type Toast } from '@/shared/lib/toast';

const router = useRouter();
const { toasts, removeToast } = useToast();

const dismiss = (id: string) => {
  removeToast(id);
};

const handleToastClick = (toast: Toast) => {
  if (!toast.link) return;
  if (toast.link.startsWith('http')) {
    window.location.href = toast.link;
    return;
  }
  router.push(toast.link);
};
</script>

<style scoped>
.toast-stack {
  position: fixed;
  top: 90px;
  right: 24px;
  display: grid;
  gap: 0.8rem;
  z-index: 60;
}

.toast {
  min-width: 260px;
  max-width: 340px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 0.85rem 0.9rem;
  box-shadow: var(--shadow-md);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.6rem;
  cursor: pointer;
}

.toast-body {
  display: grid;
  gap: 0.3rem;
}

.toast-title {
  margin: 0;
  font-weight: 700;
  color: var(--ink-strong);
  font-size: 0.95rem;
}

.toast-message {
  margin: 0;
  color: var(--muted);
  font-size: 0.85rem;
}

.toast-close {
  border: none;
  background: transparent;
  color: var(--muted);
  font-size: 0.9rem;
  cursor: pointer;
}

.toast.success {
  border-left: 4px solid var(--success);
}

.toast.info {
  border-left: 4px solid var(--accent);
}

.toast.warning {
  border-left: 4px solid var(--warning);
}

.toast.danger {
  border-left: 4px solid var(--danger);
}

@media (max-width: 768px) {
  .toast-stack {
    right: 16px;
    left: 16px;
  }

  .toast {
    width: 100%;
  }
}
</style>
