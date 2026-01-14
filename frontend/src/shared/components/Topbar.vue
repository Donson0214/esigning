<template>
  <header class="topbar">
    <div class="topbar-left">
      <button class="menu" type="button" @click="$emit('toggle-mobile')">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <h1 class="title">{{ title }}</h1>
    </div>
    <div class="topbar-right">
      <div class="theme">
        <button class="icon-btn" type="button" @click="themeOpen = !themeOpen">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4v2" />
            <path d="M12 18v2" />
            <path d="M4 12h2" />
            <path d="M18 12h2" />
            <path d="M6.3 6.3l1.4 1.4" />
            <path d="M16.3 16.3l1.4 1.4" />
            <path d="M6.3 17.7l1.4-1.4" />
            <path d="M16.3 7.7l1.4-1.4" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </button>
        <div v-if="themeOpen" class="menu-card">
          <button class="menu-item" type="button" @click="setTheme('light')">
            <span class="menu-label">
              <svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4v2" />
                <path d="M12 18v2" />
                <path d="M4 12h2" />
                <path d="M18 12h2" />
                <path d="M6.3 6.3l1.4 1.4" />
                <path d="M16.3 16.3l1.4 1.4" />
                <path d="M6.3 17.7l1.4-1.4" />
                <path d="M16.3 7.7l1.4-1.4" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              Light
            </span>
            <span v-if="themeMode === 'light'" class="check" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6 12l4 4 8-8" />
              </svg>
            </span>
          </button>
          <button class="menu-item" type="button" @click="setTheme('dark')">
            <span class="menu-label">
              <svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
              </svg>
              Dark
            </span>
            <span v-if="themeMode === 'dark'" class="check" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6 12l4 4 8-8" />
              </svg>
            </span>
          </button>
          <button class="menu-item" type="button" @click="setTheme('system')">
            <span class="menu-label">
              <svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M8 20h8" />
              </svg>
              System
            </span>
            <span v-if="themeMode === 'system'" class="check" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6 12l4 4 8-8" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div class="notifications">
<<<<<<< HEAD
        <button class="icon-btn" type="button">
=======
        <button class="icon-btn" type="button" @click="notificationsOpen = !notificationsOpen">
>>>>>>> e054afa1 (Save 1)
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"
            />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
        </button>
<<<<<<< HEAD
        <span class="badge">2</span>
      </div>
      <div class="profile" @click="profileOpen = !profileOpen">
        <span class="avatar">{{ userInitials }}</span>
=======
        <span v-if="unreadCount" class="badge">{{ unreadCount }}</span>
        <div v-if="notificationsOpen" class="notification-card">
          <div class="notification-head">
            <h4>Notifications</h4>
            <button class="link-btn" type="button" @click="markAllRead">
              Mark all as read
            </button>
          </div>
          <div class="notification-list">
            <button
              v-for="item in notificationPreview"
              :key="item.id"
              class="notification-item"
              type="button"
              @click="openNotification(item)"
            >
              <span class="notification-icon" :class="notificationTone(item.eventType)">
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
              <span class="notification-body">
                <span class="notification-title">{{ item.title }}</span>
                <span class="notification-message">{{ item.message }}</span>
                <span class="notification-time">{{ formatRelativeTime(item.createdAt) }}</span>
              </span>
              <span v-if="!item.isRead" class="notification-dot"></span>
            </button>
            <p v-if="notificationPreview.length === 0" class="notification-empty">
              You're all caught up.
            </p>
          </div>
          <button class="view-all" type="button" @click="goNotifications">
            View all notifications
          </button>
        </div>
      </div>
      <div class="profile" @click="profileOpen = !profileOpen">
        <span class="avatar">
          <img v-if="userAvatar" :src="userAvatar" alt="Profile" />
          <span v-else>{{ userInitials }}</span>
        </span>
>>>>>>> e054afa1 (Save 1)
        <div class="profile-info">
          <p class="profile-name">{{ userName }}</p>
          <p class="profile-role">{{ userRole }}</p>
        </div>
        <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
        <div v-if="profileOpen" class="profile-menu">
          <div class="profile-card">
            <div class="profile-card-head">
<<<<<<< HEAD
              <span class="avatar avatar-lg">{{ userInitials }}</span>
=======
              <span class="avatar avatar-lg">
                <img v-if="userAvatar" :src="userAvatar" alt="Profile" />
                <span v-else>{{ userInitials }}</span>
              </span>
>>>>>>> e054afa1 (Save 1)
              <div>
                <p class="profile-name-lg">{{ userName }}</p>
                <p class="profile-email">{{ userEmail }}</p>
              </div>
            </div>
            <div class="org-card">
              <p class="org-label">Organization</p>
              <p class="org-value">{{ userOrganization }}</p>
            </div>
          </div>
          <div class="menu-divider"></div>
          <button type="button" class="menu-item" @click="goProfile">
            <span class="menu-label">
              <svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20a8 8 0 0 1 16 0" />
              </svg>
              My Profile
            </span>
          </button>
          <button type="button" class="menu-item" @click="goSettings">
            <span class="menu-label">
              <svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
                <path d="M4 12h2" />
                <path d="M18 12h2" />
                <path d="M12 4v2" />
                <path d="M12 18v2" />
                <path d="M6.2 6.2l1.4 1.4" />
                <path d="M16.4 16.4l1.4 1.4" />
                <path d="M6.2 17.8l1.4-1.4" />
                <path d="M16.4 7.6l1.4-1.4" />
              </svg>
              Settings
            </span>
          </button>
          <div class="menu-divider"></div>
          <button type="button" class="menu-item danger" @click="logout">
            <span class="menu-label">
              <svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M19 4h-6a2 2 0 0 0-2 2v3" />
                <path d="M11 15v3a2 2 0 0 0 2 2h6" />
              </svg>
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
<<<<<<< HEAD
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useTheme } from '@/app/providers/theme';
import { getFirebase, hasFirebaseConfig } from '@/shared/lib/firebase';
import { useAuthProfile } from '@/features/auth/useAuthProfile';
=======
import { useRouter } from 'vue-router';
import { useTheme } from '@/app/providers/theme';
import { disconnectSocket } from '@/shared/lib/socket';
import { useAuthProfile } from '@/features/auth/useAuthProfile';
import { getFirebase, hasFirebaseConfig } from '@/shared/lib/firebase';
import { signOut } from 'firebase/auth';
import type { NotificationEventType } from '@shared/events';
import { useNotifications } from '@/features/notifications/useNotifications';
import { mapNotificationMeta } from '@/features/notifications/types';
import { formatRelativeTime } from '@/shared/lib/time';
>>>>>>> e054afa1 (Save 1)

defineProps<{ title: string }>();
defineEmits<{ (event: 'toggle-mobile'): void }>();

const router = useRouter();
const { themeMode, setTheme } = useTheme();
const themeOpen = ref(false);
const profileOpen = ref(false);
<<<<<<< HEAD
const { displayName, email, initials, organization, role } = useAuthProfile();
=======
const notificationsOpen = ref(false);
const { displayName, email, initials, avatarUrl, organization, role } = useAuthProfile();
const { notifications, unreadCount, markAllRead, markRead, clear } = useNotifications();

const notificationPreview = computed(() => notifications.value.slice(0, 4));
const notificationIcon = (eventType: NotificationEventType) => mapNotificationMeta(eventType).icon;
const notificationTone = (eventType: NotificationEventType) => mapNotificationMeta(eventType).tone;
>>>>>>> e054afa1 (Save 1)

const userName = computed(() => displayName.value);
const userEmail = computed(() => email.value || 'Not signed in');
const userInitials = computed(() => initials.value);
<<<<<<< HEAD
=======
const userAvatar = computed(() => avatarUrl.value);
>>>>>>> e054afa1 (Save 1)
const userOrganization = computed(() => organization.value);
const userRole = computed(() => role.value);

const goProfile = () => {
  profileOpen.value = false;
  router.push('/app/settings');
};

const goSettings = () => {
  profileOpen.value = false;
  router.push('/app/settings');
};

<<<<<<< HEAD
const logout = async () => {
  profileOpen.value = false;
  localStorage.removeItem('auth_token');
=======
const goNotifications = () => {
  notificationsOpen.value = false;
  router.push('/app/notifications');
};

const openNotification = async (item: { id: string; isRead: boolean; link?: string }) => {
  notificationsOpen.value = false;
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

const logout = async () => {
  profileOpen.value = false;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth:updated'));
  }
>>>>>>> e054afa1 (Save 1)
  if (hasFirebaseConfig()) {
    try {
      const { auth } = getFirebase();
      await signOut(auth);
    } catch {
<<<<<<< HEAD
      // ignore sign-out errors
    }
  }
=======
      // ignore logout failures
    }
  }
  disconnectSocket();
  clear();
>>>>>>> e054afa1 (Save 1)
  router.push('/login');
};
</script>

<style scoped>
.topbar {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 5;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.menu {
  display: none;
  flex-direction: column;
  gap: 4px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.menu span {
  width: 20px;
  height: 2px;
  background: var(--ink);
}

.title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--ink-strong);
  margin: 0;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--surface-2);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.icon-btn svg {
  width: 20px;
  height: 20px;
  stroke: var(--ink);
  fill: none;
  stroke-width: 1.7;
}

.theme {
  position: relative;
}

.menu-card {
  position: absolute;
  top: 52px;
  right: 0;
  background: var(--surface);
  border-radius: 14px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--line);
  padding: 0.3rem;
  min-width: 190px;
  z-index: 6;
}

.menu-item {
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: var(--ink);
}

.menu-label {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.menu-icon {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
}

.menu-item:hover {
  background: var(--surface-2);
}

.menu-item.danger {
  color: var(--danger);
}

.check {
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid rgba(79, 70, 229, 0.4);
}

.check svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2.2;
}

.notifications {
  position: relative;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--danger);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

<<<<<<< HEAD
=======
.notification-card {
  position: absolute;
  top: 54px;
  right: 0;
  width: min(360px, 90vw);
  background: var(--surface);
  border-radius: 18px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--line);
  padding: 0.9rem;
  display: grid;
  gap: 0.8rem;
  z-index: 6;
}

.notification-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.notification-head h4 {
  margin: 0;
  font-size: 1rem;
  color: var(--ink-strong);
}

.link-btn {
  border: none;
  background: transparent;
  color: var(--accent);
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
}

.notification-list {
  display: grid;
  gap: 0.6rem;
  max-height: 320px;
  overflow: auto;
}

.notification-item {
  width: 100%;
  border: 1px solid var(--line);
  background: var(--surface-2);
  border-radius: 14px;
  padding: 0.7rem 0.75rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.7rem;
  text-align: left;
  cursor: pointer;
}

.notification-icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: var(--accent);
  background: rgba(51, 92, 255, 0.12);
}

.notification-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
}

.notification-icon.success {
  color: var(--success);
  background: rgba(22, 163, 74, 0.14);
}

.notification-icon.info {
  color: var(--accent);
  background: rgba(51, 92, 255, 0.12);
}

.notification-icon.warning {
  color: var(--warning);
  background: rgba(249, 115, 22, 0.16);
}

.notification-icon.danger {
  color: var(--danger);
  background: rgba(239, 68, 68, 0.16);
}

.notification-icon.neutral {
  color: var(--muted);
  background: var(--surface-3);
}

.notification-body {
  display: grid;
  gap: 0.2rem;
}

.notification-title {
  font-weight: 600;
  color: var(--ink-strong);
}

.notification-message {
  color: var(--muted);
  font-size: 0.85rem;
}

.notification-time {
  color: var(--muted);
  font-size: 0.75rem;
}

.notification-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  align-self: center;
}

.notification-empty {
  margin: 0;
  text-align: center;
  color: var(--muted);
  font-size: 0.85rem;
  padding: 0.8rem 0;
}

.view-all {
  border: none;
  background: var(--surface-2);
  border-radius: 12px;
  padding: 0.65rem;
  font-weight: 600;
  color: var(--accent);
  cursor: pointer;
}

>>>>>>> e054afa1 (Save 1)
.profile {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.6rem;
  border-radius: 14px;
  cursor: pointer;
  position: relative;
}

.profile:hover {
  background: var(--surface-2);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent);
  color: #ffffff;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
<<<<<<< HEAD
=======
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
>>>>>>> e054afa1 (Save 1)
}

.profile-info {
  display: grid;
}

.profile-name {
  margin: 0;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--ink-strong);
}

.profile-role {
  margin: 0;
  font-size: 0.75rem;
  color: var(--muted);
}

.chev {
  width: 16px;
  height: 16px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 2;
}

.profile-menu {
  position: absolute;
  top: 52px;
  right: 0;
  background: var(--surface);
  border-radius: 14px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--line);
  padding: 0.6rem;
  min-width: 240px;
  z-index: 6;
}

.profile-card {
  display: grid;
  gap: 0.75rem;
}

.profile-card-head {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.avatar.avatar-lg {
  width: 44px;
  height: 44px;
  font-size: 0.95rem;
}

.profile-name-lg {
  margin: 0;
  font-weight: 700;
  color: var(--ink-strong);
}

.profile-email {
  margin: 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.org-card {
  background: var(--surface-2);
  border-radius: 12px;
  padding: 0.6rem 0.7rem;
}

.org-label {
  margin: 0;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.org-value {
  margin: 0.2rem 0 0;
  font-weight: 600;
  color: var(--ink-strong);
}

.menu-divider {
  height: 1px;
  background: var(--line);
  margin: 0.7rem 0;
}

@media (max-width: 1024px) {
  .topbar {
    padding: 0 1.5rem;
  }

  .menu {
    display: flex;
  }

  .profile-info,
  .chev {
    display: none;
  }
}

@media (max-width: 768px) {
  .topbar-right {
    gap: 0.6rem;
  }
}
</style>
