<template>
  <div class="app-shell">
    <Sidebar :collapsed="sidebarCollapsed" :mobile-open="mobileOpen" @toggle="toggleCollapsed" @close="mobileOpen = false" />
    <div class="app-main">
      <Topbar :title="pageTitle" @toggle-mobile="mobileOpen = true" />
      <ToastStack />
      <main class="app-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import Sidebar from '@/shared/components/Sidebar.vue';
import Topbar from '@/shared/components/Topbar.vue';
import ToastStack from '@/shared/components/ToastStack.vue';
import { useAuthProfile } from '@/features/auth/useAuthProfile';
import { useNotifications } from '@/features/notifications/useNotifications';

const sidebarCollapsed = ref(false);
const mobileOpen = ref(false);

const toggleCollapsed = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const pageTitle = 'Wilson Platform';

const { refresh } = useAuthProfile();
const { initNotifications } = useNotifications();

onMounted(() => {
  void refresh();
  void initNotifications();
});
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  background: var(--bg);
  --accent: #4f46e5;
  --accent-strong: #4338ca;
  --accent-soft: #e0e7ff;
  --shadow-md: 0 8px 22px rgba(15, 23, 42, 0.08);
  --shadow-lg: 0 16px 36px rgba(15, 23, 42, 0.1);
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.app-content {
  padding: 2rem 2.5rem 3rem;
  min-height: calc(100vh - 72px);
}

@media (max-width: 1024px) {
  .app-content {
    padding: 1.5rem;
  }
}
</style>
