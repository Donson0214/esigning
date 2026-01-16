<template>
  <div>
    <div v-if="mobileOpen" class="backdrop" @click="$emit('close')"></div>
    <aside :class="['sidebar', { collapsed, open: mobileOpen }]">
      <div class="sidebar-header">
        <div class="brand">
          <span class="logo">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path
                d="M7 6h18a7 7 0 0 1 7 7v6a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7v-6a7 7 0 0 1 7-7Z"
                fill="url(#sidebarGradient)"
              />
              <path
                d="M11 16c4 1 5 5 5 5s3-4 5-5c-3-1-5-5-5-5s-1 4-5 5Z"
                fill="#fff"
              />
              <defs>
                <linearGradient id="sidebarGradient" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stop-color="var(--accent)" />
                  <stop offset="1" stop-color="var(--accent-strong)" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span v-if="!collapsed" class="brand-name">Inkless</span>
        </div>
        <button class="collapse" type="button" aria-label="Toggle sidebar" @click="$emit('toggle')">
          <svg v-if="collapsed" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>
      </div>

      <nav class="nav">
        <RouterLink
          v-for="item in navigation"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: route.path.startsWith(item.path) }"
          @click="$emit('close')"
        >
          <span class="icon" v-html="icons[item.icon]"></span>
          <span v-if="!collapsed" class="label">{{ item.label }}</span>
          <span
            v-if="item.path === '/app/received' && receivedPendingCount > 0"
            class="nav-badge"
            :class="{ compact: collapsed }"
          >
            {{ receivedPendingCount }}
          </span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <div class="user-card">
          <span class="avatar">
            <img v-if="userAvatar" :src="userAvatar" alt="Profile" />
            <span v-else>{{ userInitials }}</span>
          </span>
          <div v-if="!collapsed">
            <p class="user-name">{{ userName }}</p>
            <p class="user-email">{{ userEmail }}</p>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { navigation } from '@/shared/constants/navigation';
import { useAuthProfile } from '@/features/auth/useAuthProfile';
import { useReceivedSummary } from '@/features/documents/composables';

defineProps<{
  collapsed: boolean;
  mobileOpen: boolean;
}>();

defineEmits<{
  (event: 'toggle'): void;
  (event: 'close'): void;
}>();

const route = useRoute();
const { displayName, email, initials, avatarUrl } = useAuthProfile();

const userName = computed(() => displayName.value);
const userEmail = computed(() => email.value || 'Not signed in');
const userInitials = computed(() => initials.value);
const userAvatar = computed(() => avatarUrl.value);
const { pendingCount: receivedPendingCount } = useReceivedSummary();

const icons: Record<string, string> = {
  dashboard:
    '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  sign:
    '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>',
  documents:
    '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h6l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M13 3v5h5"/></svg>',
  analytics:
    '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5"/><rect x="7" y="12" width="3" height="7" rx="1"/><rect x="12" y="9" width="3" height="10" rx="1"/><rect x="17" y="6" width="3" height="13" rx="1"/></svg>',
  sent:
    '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l18-9-4 18-5-7-9-2Z"/><path d="M12 14l5 5"/></svg>',
  received:
    '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7"/><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/></svg>',
  audit:
    '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8l3 3v15a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M8 9h8"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>',
  notifications:
    '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
  settings:
    '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/><path d="M4 12h2"/><path d="M18 12h2"/><path d="M12 4v2"/><path d="M12 18v2"/><path d="M6.2 6.2l1.4 1.4"/><path d="M16.4 16.4l1.4 1.4"/><path d="M6.2 17.8l1.4-1.4"/><path d="M16.4 7.6l1.4-1.4"/></svg>',
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  z-index: 9;
}

.sidebar {
  width: 240px;
  min-height: 100vh;
  background: var(--surface);
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.2rem;
  position: relative;
  z-index: 10;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 84px;
  padding: 1.5rem 0.6rem;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  margin-bottom: 2rem;
  position: relative;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sidebar.collapsed .brand {
  display: none;
}

.sidebar.collapsed .sidebar-header {
  justify-content: center;
}

.sidebar.collapsed .collapse {
  position: static;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.brand-name {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--ink-strong);
}

.collapse {
  border: 1px solid var(--line);
  background: var(--surface);
  border-radius: 999px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: var(--muted);
  display: grid;
  place-items: center;
}

.collapse svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
}

.nav {
  display: grid;
  gap: 0.45rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.7rem 0.95rem;
  border-radius: 14px;
  color: var(--ink);
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  position: relative;
}

.nav-item:not(.active):hover {
  background: var(--surface-2);
}

.nav-item .icon :deep(svg) {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.7;
}

.nav-item.active {
  background: var(--accent);
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.25);
}

.nav-item.active .icon svg {
  stroke: #ffffff;
}

.nav-badge {
  margin-left: auto;
  background: var(--accent);
  color: #ffffff;
  border-radius: 999px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 0.7rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.25);
}

.nav-badge.compact {
  position: absolute;
  top: 6px;
  right: 10px;
  margin-left: 0;
  min-width: 18px;
  height: 18px;
  font-size: 0.65rem;
  padding: 0 4px;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 0;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  margin: 0 auto;
}

.sidebar.collapsed .nav-item .icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.user-card {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent);
  color: #ffffff;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.user-name {
  margin: 0;
  font-weight: 600;
  color: var(--ink-strong);
}

.user-email {
  margin: 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.sidebar.collapsed .user-card {
  justify-content: center;
}

@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
