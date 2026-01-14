import { computed, ref } from 'vue';
import { apiClient } from '@/shared/lib/axios';

type ProfileData = {
  id: string;
  email: string;
  name?: string | null;
  jobTitle?: string | null;
  photoUrl?: string | null;
  role?: string | null;
};

const user = ref<ProfileData | null>(null);
const loading = ref(true);

const safeTrim = (value?: string | null) => (value ?? '').trim();

const readStoredUser = () => {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem('auth_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ProfileData;
  } catch {
    return null;
  }
};

const deriveName = (data: ProfileData | null) => {
  const name = safeTrim(data?.name);
  if (name) return name;
  const mail = safeTrim(data?.email);
  return mail ? mail.split('@')[0] : 'Guest';
};

const deriveInitials = (name: string) => {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'G';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const fetchProfile = async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    user.value = null;
    loading.value = false;
    return;
  }
  const cachedUser = readStoredUser();
  if (cachedUser && !user.value) {
    user.value = cachedUser;
  }
  loading.value = true;
  try {
    const response = await apiClient.get<{ user: ProfileData }>('/users/me');
    user.value = response.data.user;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(response.data.user));
    }
  } catch (err) {
    const status = (err as { response?: { status?: number } })?.response?.status;
    if (status === 401) {
      user.value = null;
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('auth_user');
      }
    } else if (cachedUser) {
      user.value = cachedUser;
    }
  } finally {
    loading.value = false;
  }
};

fetchProfile().catch(() => undefined);

let listenerAttached = false;
const attachAuthListener = () => {
  if (listenerAttached || typeof window === 'undefined') return;
  listenerAttached = true;
  window.addEventListener('auth:updated', () => {
    void fetchProfile();
  });
};

attachAuthListener();

export const useAuthProfile = () => {
  const displayName = computed(() => deriveName(user.value));
  const email = computed(() => safeTrim(user.value?.email));
  const initials = computed(() => deriveInitials(displayName.value));
  const avatarUrl = computed(() => safeTrim(user.value?.photoUrl) || '');
  const organization = computed(() => 'No organization');
  const jobTitle = computed(() => safeTrim(user.value?.jobTitle) || 'N/A');
  const role = computed(() => safeTrim(user.value?.role) || 'Member');

  const updateProfileDetails = async (payload: { name?: string; jobTitle?: string }) => {
    const trimmedName = payload.name?.trim();
    const trimmedJobTitle = payload.jobTitle?.trim();
    if (!trimmedName && !trimmedJobTitle) return;
    const response = await apiClient.patch<{ user: ProfileData }>('/users/me', {
      name: trimmedName,
      jobTitle: trimmedJobTitle,
    });
    user.value = response.data.user;
  };

  return {
    user,
    profile: user,
    loading,
    displayName,
    email,
    initials,
    avatarUrl,
    organization,
    jobTitle,
    role,
    updateProfileDetails,
    refresh: fetchProfile,
  };
};

export const stopAuthProfile = () => {
  user.value = null;
  loading.value = false;
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('auth_user');
  }
};
