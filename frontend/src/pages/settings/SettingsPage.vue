<template>
  <div class="settings-page">
    <section class="page-header">
      <h2>Settings</h2>
      <p>Manage your account and preferences</p>
    </section>

    <section class="settings-card">
      <div class="card-header">
        <span class="card-icon accent">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20a8 8 0 0 1 16 0" />
          </svg>
        </span>
        <div>
          <h3>Profile Settings</h3>
          <p>Update your personal information</p>
        </div>
      </div>
      <div class="form-grid">
        <label class="field">
          <span class="label">Full Name</span>
          <input
            v-model="profileForm.name"
            class="input"
            type="text"
            placeholder="Your name"
            @input="formTouched = true"
          />
        </label>
        <label class="field">
          <span class="label">Email</span>
          <input
            v-model="profileForm.email"
            class="input"
            type="email"
            readonly
          />
          <span class="helper">Email is managed by your sign-in provider.</span>
        </label>
        <label class="field">
          <span class="label">Job Title</span>
          <input
            v-model="profileForm.jobTitle"
            class="input"
            type="text"
            placeholder="Product Manager"
            @input="formTouched = true"
          />
        </label>
      </div>
    </section>

    <section class="settings-card">
      <div class="card-header">
        <span class="card-icon success">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"
            />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
        </span>
        <div>
          <h3>Notifications</h3>
          <p>Manage how you receive updates</p>
        </div>
      </div>
      <div class="toggle-list">
        <div class="toggle-row">
          <div>
            <p class="toggle-title">Email notifications</p>
            <p class="toggle-desc">Receive updates via email</p>
          </div>
          <label class="switch">
            <input v-model="notifications.email" type="checkbox" />
            <span class="slider"></span>
          </label>
        </div>
        <div class="toggle-row">
          <div>
<<<<<<< HEAD
=======
            <p class="toggle-title">In-app notifications</p>
            <p class="toggle-desc">Show realtime updates in the app</p>
          </div>
          <label class="switch">
            <input v-model="notifications.inApp" type="checkbox" />
            <span class="slider"></span>
          </label>
        </div>
        <div class="toggle-row">
          <div>
>>>>>>> e054afa1 (Save 1)
            <p class="toggle-title">Document signed</p>
            <p class="toggle-desc">When a document is signed</p>
          </div>
          <label class="switch">
            <input v-model="notifications.signed" type="checkbox" />
            <span class="slider"></span>
          </label>
        </div>
        <div class="toggle-row">
          <div>
            <p class="toggle-title">Document viewed</p>
            <p class="toggle-desc">When someone views your document</p>
          </div>
          <label class="switch">
            <input v-model="notifications.viewed" type="checkbox" />
            <span class="slider"></span>
          </label>
        </div>
        <div class="toggle-row">
          <div>
            <p class="toggle-title">Expiry reminders</p>
            <p class="toggle-desc">Reminders before documents expire</p>
          </div>
          <label class="switch">
            <input v-model="notifications.expiry" type="checkbox" />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </section>

    <section class="settings-card">
      <div class="card-header">
        <span class="card-icon warning">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </span>
        <div>
          <h3>Security</h3>
          <p>Manage your security preferences</p>
        </div>
      </div>
      <div class="security-list">
        <button class="security-item" type="button" @click="openSecurity('password')">
          <span>
            <strong>Change Password</strong>
            <small>Update your account password</small>
          </span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
        <button class="security-item" type="button" @click="openSecurity('twoFactor')">
          <span>
            <strong>Two-Factor Authentication</strong>
            <small>Add extra security to your account</small>
          </span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
        <button class="security-item" type="button" @click="openSecurity('sessions')">
          <span>
            <strong>Active Sessions</strong>
            <small>Review active devices and sessions</small>
          </span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>

    <div class="page-actions">
      <button class="btn btn-outline" type="button" @click="resetForm" :disabled="saving">
        Cancel
      </button>
      <button class="btn btn-primary" type="button" @click="saveSettings" :disabled="saving">
        Save Changes
      </button>
    </div>

    <p v-if="statusMessage" class="status-message" :class="{ error: statusError }">
      {{ statusMessage }}
    </p>

    <Teleport to="body">
      <div v-if="securityModal" class="modal-backdrop" @click.self="closeSecurity">
        <div class="modal-card">
          <div class="modal-header">
            <h3>{{ modalTitle }}</h3>
            <button class="close-btn" type="button" @click="closeSecurity">x</button>
          </div>
          <div class="modal-body">
            <div v-if="securityModal === 'password'" class="modal-block">
              <p>
                We will send a password reset link to <strong>{{ profileForm.email }}</strong>.
              </p>
              <button
                class="btn btn-primary"
                type="button"
                :disabled="!profileForm.email || sendingReset"
                @click="sendReset"
              >
                Send reset email
              </button>
            </div>
            <div v-else-if="securityModal === 'twoFactor'" class="modal-block">
              <p>Add an extra layer of protection to your account.</p>
              <label class="switch large">
                <input v-model="twoFactorEnabled" type="checkbox" />
                <span class="slider"></span>
              </label>
              <p class="helper">{{ twoFactorEnabled ? '2FA enabled' : '2FA disabled' }}</p>
            </div>
            <div v-else class="modal-block">
              <div class="session-row" v-for="session in sessions" :key="session.device">
                <div>
                  <p class="session-device">{{ session.device }}</p>
                  <p class="session-meta">{{ session.location }} - {{ session.lastActive }}</p>
                </div>
                <span class="session-tag" :class="{ current: session.current }">
                  {{ session.current ? 'Current' : 'Active' }}
                </span>
              </div>
              <button class="btn btn-outline" type="button" @click="signOutOthers">
                Sign out other sessions
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { sendPasswordResetEmail } from 'firebase/auth';
<<<<<<< HEAD
import { getFirebase, hasFirebaseConfig } from '@/shared/lib/firebase';
import { useAuthProfile } from '@/features/auth/useAuthProfile';

type SecurityModal = 'password' | 'twoFactor' | 'sessions' | null;

const { user, displayName, email, profile, updateProfileDetails } = useAuthProfile();
=======
import { useAuthProfile } from '@/features/auth/useAuthProfile';
import { getFirebase, hasFirebaseConfig } from '@/shared/lib/firebase';
import { getNotificationPreferences, updateNotificationPreferences } from '@/features/notifications/api';

type SecurityModal = 'password' | 'twoFactor' | 'sessions' | null;

const { user, displayName, email, profile, jobTitle, updateProfileDetails } = useAuthProfile();
>>>>>>> e054afa1 (Save 1)

const profileForm = reactive({
  name: '',
  email: '',
  jobTitle: '',
});

const notifications = reactive({
  email: true,
<<<<<<< HEAD
=======
  inApp: true,
>>>>>>> e054afa1 (Save 1)
  signed: true,
  viewed: true,
  expiry: true,
});

const twoFactorEnabled = ref(false);
const securityModal = ref<SecurityModal>(null);
const saving = ref(false);
const statusMessage = ref('');
const statusError = ref(false);
const formTouched = ref(false);
const sendingReset = ref(false);

const sessions = ref([
  { device: 'Chrome on Windows', location: 'Los Angeles, CA', lastActive: 'Active now', current: true },
  { device: 'Safari on iPhone', location: 'New York, NY', lastActive: '2 hours ago', current: false },
]);

const modalTitle = computed(() => {
  switch (securityModal.value) {
    case 'password':
      return 'Change Password';
    case 'twoFactor':
      return 'Two-Factor Authentication';
    case 'sessions':
      return 'Active Sessions';
    default:
      return '';
  }
});

const syncForm = () => {
  profileForm.name = profile.value?.name?.trim() || displayName.value;
  profileForm.email = email.value || '';
<<<<<<< HEAD
  profileForm.jobTitle = profile.value?.jobTitle?.trim() || '';
};

const loadPreferences = () => {
  const stored = localStorage.getItem('settings_notifications');
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as typeof notifications;
      notifications.email = parsed.email ?? notifications.email;
      notifications.signed = parsed.signed ?? notifications.signed;
      notifications.viewed = parsed.viewed ?? notifications.viewed;
      notifications.expiry = parsed.expiry ?? notifications.expiry;
    } catch {
      // ignore
    }
=======
  profileForm.jobTitle = profile.value?.jobTitle?.trim() || jobTitle.value || '';
};

const loadPreferences = async () => {
  try {
    const response = await getNotificationPreferences();
    const prefs = response.preferences;
    notifications.email = prefs.emailEnabled;
    notifications.inApp = prefs.inAppEnabled;
    notifications.signed = prefs.eventOverrides?.['document.signed'] ?? true;
    notifications.viewed = prefs.eventOverrides?.['document.viewed'] ?? true;
    notifications.expiry =
      prefs.eventOverrides?.['document.expired'] ??
      prefs.eventOverrides?.['reminder.expiring_soon'] ??
      true;
  } catch {
    // ignore preference load failures
>>>>>>> e054afa1 (Save 1)
  }
  const securityStored = localStorage.getItem('settings_security');
  if (securityStored) {
    try {
      const parsed = JSON.parse(securityStored) as { twoFactorEnabled?: boolean };
      twoFactorEnabled.value = Boolean(parsed.twoFactorEnabled);
    } catch {
      // ignore
    }
  }
};

watch([displayName, email, profile], () => {
  if (!formTouched.value) syncForm();
}, { immediate: true });

const resetForm = () => {
  formTouched.value = false;
  syncForm();
<<<<<<< HEAD
  loadPreferences();
=======
  void loadPreferences();
>>>>>>> e054afa1 (Save 1)
  statusMessage.value = '';
};

const saveSettings = async () => {
  statusMessage.value = '';
  statusError.value = false;
<<<<<<< HEAD
  if (!hasFirebaseConfig()) {
    statusMessage.value = 'Firebase is not configured.';
    statusError.value = true;
    return;
  }
=======
>>>>>>> e054afa1 (Save 1)
  if (!user.value) {
    statusMessage.value = 'You must be signed in to save changes.';
    statusError.value = true;
    return;
  }
  saving.value = true;
  try {
    await updateProfileDetails({
      name: profileForm.name,
      jobTitle: profileForm.jobTitle,
    });
<<<<<<< HEAD
    localStorage.setItem('settings_notifications', JSON.stringify(notifications));
=======
    await updateNotificationPreferences({
      emailEnabled: notifications.email,
      inAppEnabled: notifications.inApp,
      realtimeEnabled: notifications.inApp,
      eventOverrides: {
        'document.signed': notifications.signed,
        'document.viewed': notifications.viewed,
        'document.expired': notifications.expiry,
        'reminder.expiring_soon': notifications.expiry,
      },
    });
>>>>>>> e054afa1 (Save 1)
    localStorage.setItem('settings_security', JSON.stringify({ twoFactorEnabled: twoFactorEnabled.value }));
    statusMessage.value = 'Changes saved successfully.';
  } catch (error) {
    statusMessage.value = error instanceof Error ? error.message : 'Unable to save settings.';
    statusError.value = true;
  } finally {
    saving.value = false;
    formTouched.value = false;
  }
};

const openSecurity = (target: Exclude<SecurityModal, null>) => {
  securityModal.value = target;
};

const closeSecurity = () => {
  securityModal.value = null;
};

const sendReset = async () => {
<<<<<<< HEAD
  if (!hasFirebaseConfig()) return;
  if (!profileForm.email) return;
  sendingReset.value = true;
  try {
    const { auth } = getFirebase();
    await sendPasswordResetEmail(auth, profileForm.email);
    statusMessage.value = 'Password reset email sent.';
    statusError.value = false;
    closeSecurity();
=======
  if (!profileForm.email) return;
  sendingReset.value = true;
  try {
    if (hasFirebaseConfig()) {
      const { auth } = getFirebase();
      await sendPasswordResetEmail(auth, profileForm.email);
      statusMessage.value = 'Password reset email sent.';
      statusError.value = false;
    } else {
      statusMessage.value = 'Password reset is handled by your administrator.';
      statusError.value = false;
    }
>>>>>>> e054afa1 (Save 1)
  } catch (error) {
    statusMessage.value = error instanceof Error ? error.message : 'Unable to send reset email.';
    statusError.value = true;
  } finally {
    sendingReset.value = false;
  }
};

const signOutOthers = () => {
  statusMessage.value = 'Other sessions signed out.';
  statusError.value = false;
  closeSecurity();
};

<<<<<<< HEAD
loadPreferences();
=======
void loadPreferences();
>>>>>>> e054afa1 (Save 1)
</script>

<style scoped>
.settings-page {
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

.settings-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: var(--shadow-md);
  display: grid;
  gap: 1.2rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
}

.card-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
}

.card-icon.accent {
  background: rgba(79, 70, 229, 0.12);
  color: var(--accent);
}

.card-icon.success {
  background: rgba(22, 163, 74, 0.12);
  color: var(--success);
}

.card-icon.warning {
  background: rgba(249, 115, 22, 0.12);
  color: var(--warning);
}

.card-header h3 {
  margin: 0;
  color: var(--ink-strong);
}

.card-header p {
  margin: 0.3rem 0 0;
  color: var(--muted);
  font-size: 0.85rem;
}

.form-grid {
  display: grid;
  gap: 1rem;
}

.input[readonly] {
  background: var(--surface-2);
}

.toggle-list {
  display: grid;
  gap: 0.9rem;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--line);
}

.toggle-row:last-child {
  border-bottom: none;
}

.toggle-title {
  margin: 0;
  font-weight: 600;
  color: var(--ink-strong);
}

.toggle-desc {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.switch {
  position: relative;
  width: 44px;
  height: 24px;
}

.switch.large {
  width: 54px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background: var(--line);
  border-radius: 999px;
  transition: background 0.2s ease;
  cursor: pointer;
}

.slider::before {
  content: '';
  position: absolute;
  height: 18px;
  width: 18px;
  left: 3px;
  top: 3px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.switch.large .slider::before {
  height: 22px;
  width: 22px;
}

.switch input:checked + .slider {
  background: var(--accent);
}

.switch input:checked + .slider::before {
  transform: translateX(20px);
}

.switch.large input:checked + .slider::before {
  transform: translateX(26px);
}

.security-list {
  display: grid;
  gap: 0.8rem;
}

.security-item {
  border: 1px solid var(--line);
  background: var(--surface);
  border-radius: 14px;
  padding: 0.9rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
}

.security-item span {
  display: grid;
  gap: 0.2rem;
}

.security-item strong {
  color: var(--ink-strong);
}

.security-item small {
  color: var(--muted);
  font-size: 0.75rem;
}

.security-item svg {
  width: 18px;
  height: 18px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 2;
}

.page-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
}

.status-message {
  margin: 0;
  color: var(--success);
  font-weight: 600;
}

.status-message.error {
  color: var(--danger);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: grid;
  place-items: center;
  z-index: 40;
  padding: 1.5rem;
}

.modal-card {
  width: min(520px, 92vw);
  background: var(--surface);
  border-radius: 18px;
  padding: 1.4rem;
  box-shadow: var(--shadow-lg);
  display: grid;
  gap: 1rem;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h3 {
  margin: 0;
  color: var(--ink-strong);
}

.close-btn {
  border: none;
  background: transparent;
  color: var(--muted);
  font-size: 1.2rem;
  cursor: pointer;
}

.modal-block {
  display: grid;
  gap: 0.8rem;
}

.session-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0.7rem 0.9rem;
}

.session-device {
  margin: 0;
  font-weight: 600;
  color: var(--ink-strong);
}

.session-meta {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.session-tag {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--surface-2);
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 600;
}

.session-tag.current {
  background: rgba(79, 70, 229, 0.12);
  color: var(--accent);
}

@media (max-width: 720px) {
  .page-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .toggle-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
}
</style>
