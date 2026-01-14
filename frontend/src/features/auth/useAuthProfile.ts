import { computed, ref } from 'vue';
<<<<<<< HEAD
import { onAuthStateChanged, updateProfile, type User } from 'firebase/auth';
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { getFirebase, hasFirebaseConfig } from '@/shared/lib/firebase';

type ProfileData = {
  name?: string | null;
  email?: string | null;
  organization?: string | null;
  jobTitle?: string | null;
  role?: string | null;
};

const authUser = ref<User | null>(null);
const authDisplayName = ref('');
const authEmail = ref('');
const profile = ref<ProfileData | null>(null);
const loading = ref(true);

let authUnsub: (() => void) | null = null;
let profileUnsub: (() => void) | null = null;
let initialized = false;

const safeTrim = (value?: string | null) => (value ?? '').trim();

const deriveName = (user: User | null, data: ProfileData | null, fallbackName: string) => {
  const fromProfile = safeTrim(data?.name);
  if (fromProfile) return fromProfile;
  const fromAuth = safeTrim(user?.displayName ?? null) || safeTrim(fallbackName);
  if (fromAuth) return fromAuth;
  const mail = safeTrim(data?.email || user?.email || null);
  return mail ? mail.split('@')[0] : 'Guest';
};

const deriveEmail = (user: User | null, data: ProfileData | null, fallbackEmail: string) =>
  safeTrim(user?.email || data?.email || fallbackEmail || null);
=======
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
>>>>>>> e054afa1 (Save 1)

const deriveInitials = (name: string) => {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'G';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

<<<<<<< HEAD
const ensureInit = () => {
  if (initialized) return;
  initialized = true;
  if (!hasFirebaseConfig()) {
    loading.value = false;
    return;
  }
  const { auth, db } = getFirebase();
  authUnsub = onAuthStateChanged(auth, (user) => {
    authUser.value = user;
    authDisplayName.value = user?.displayName ?? '';
    authEmail.value = user?.email ?? '';
    loading.value = false;
    if (profileUnsub) {
      profileUnsub();
      profileUnsub = null;
    }
    if (user) {
      const ref = doc(db, 'users', user.uid);
      profileUnsub = onSnapshot(
        ref,
        (snap) => {
          profile.value = snap.exists() ? (snap.data() as ProfileData) : null;
        },
        () => {
          profile.value = null;
        },
      );
    } else {
      profile.value = null;
    }
  });
};

export const useAuthProfile = () => {
  ensureInit();

  const displayName = computed(() =>
    deriveName(authUser.value, profile.value, authDisplayName.value),
  );
  const email = computed(() => deriveEmail(authUser.value, profile.value, authEmail.value));
  const initials = computed(() => deriveInitials(displayName.value));
  const organization = computed(() =>
    authUser.value ? safeTrim(profile.value?.organization) || 'No organization' : 'No organization',
  );
  const jobTitle = computed(() => safeTrim(profile.value?.jobTitle) || 'N/A');
  const role = computed(() =>
    authUser.value ? safeTrim(profile.value?.role) || 'Admin' : 'Guest',
  );

  const updateProfileDetails = async (payload: {
    name?: string;
    jobTitle?: string;
    organization?: string;
    role?: string;
  }) => {
    if (!hasFirebaseConfig()) {
      throw new Error('Firebase is not configured.');
    }
    const { auth, db } = getFirebase();
    const current = auth.currentUser;
    if (!current) {
      throw new Error('No authenticated user.');
    }
    const trimmedName = payload.name?.trim();
    if (trimmedName && trimmedName !== current.displayName) {
      await updateProfile(current, { displayName: trimmedName });
      authDisplayName.value = trimmedName;
    }
    await setDoc(
      doc(db, 'users', current.uid),
      {
        name: trimmedName ?? null,
        email: current.email ?? null,
        jobTitle: payload.jobTitle?.trim() || null,
        organization: payload.organization?.trim() || null,
        role: payload.role?.trim() || null,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  };

  return {
    user: authUser,
    profile,
=======
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
>>>>>>> e054afa1 (Save 1)
    loading,
    displayName,
    email,
    initials,
<<<<<<< HEAD
=======
    avatarUrl,
>>>>>>> e054afa1 (Save 1)
    organization,
    jobTitle,
    role,
    updateProfileDetails,
<<<<<<< HEAD
=======
    refresh: fetchProfile,
>>>>>>> e054afa1 (Save 1)
  };
};

export const stopAuthProfile = () => {
<<<<<<< HEAD
  authUnsub?.();
  profileUnsub?.();
  authUnsub = null;
  profileUnsub = null;
  initialized = false;
  loading.value = false;
=======
  user.value = null;
  loading.value = false;
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('auth_user');
  }
>>>>>>> e054afa1 (Save 1)
};
