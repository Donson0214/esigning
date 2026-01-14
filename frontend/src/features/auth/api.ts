<<<<<<< HEAD
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getIdToken,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, getDoc, getDocFromCache, serverTimestamp, setDoc } from 'firebase/firestore';
import { getFirebase } from '@/shared/lib/firebase';
import type { LoginPayload, RegisterPayload } from './types';

async function storeToken(user: User) {
  const token = await getIdToken(user);
  localStorage.setItem('auth_token', token);
}

const withTimeout = async <T>(promise: Promise<T>, ms: number) =>
  new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error('timeout')), ms);
    promise
      .then((value) => {
        window.clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        window.clearTimeout(timer);
        reject(error);
      });
  });

export async function login(payload: LoginPayload) {
  const { auth } = getFirebase();
  const result = await signInWithEmailAndPassword(auth, payload.email, payload.password);
  await storeToken(result.user);
  return result.user;
}

export async function register(payload: RegisterPayload) {
  const { auth, db } = getFirebase();
  const result = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
  if (payload.name) {
    await updateProfile(result.user, { displayName: payload.name });
  }
  await storeToken(result.user);
  void setDoc(
    doc(db, 'users', result.user.uid),
    {
      name: payload.name ?? null,
      email: payload.email,
      organization: payload.organization ?? null,
      teamSize: payload.teamSize ?? null,
      provider: 'password',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  ).catch(() => undefined);
  return result.user;
}

export async function googleAuth() {
  const { auth, db } = getFirebase();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(auth, provider);
  await storeToken(result.user);

  const isNewUser = Boolean(getAdditionalUserInfo(result)?.isNewUser);
  const profileRef = doc(db, 'users', result.user.uid);

  try {
    let needsOrganization = isNewUser;

    try {
      const cached = await getDocFromCache(profileRef);
      if (cached.exists()) {
        needsOrganization = !cached.data()?.organization;
        return { user: result.user, needsOrganization, profileReady: true };
      }
    } catch {
      // cache miss
    }

    const snapshot = await withTimeout(getDoc(profileRef), 1500);
    if (snapshot.exists()) {
      needsOrganization = !snapshot.data()?.organization;
      return { user: result.user, needsOrganization, profileReady: true };
    }

    if (isNewUser) {
      void setDoc(
        profileRef,
        {
          name: result.user.displayName ?? null,
          email: result.user.email ?? null,
          provider: 'google',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
    }

    return { user: result.user, needsOrganization, profileReady: false };
  } catch (error) {
    return {
      user: result.user,
      needsOrganization: isNewUser,
      profileReady: false,
      profileError: error instanceof Error ? error.message : 'Unable to sync profile.',
    };
  }
}

export async function saveOrganization(userId: string, organization: string, teamSize?: string) {
  const { db } = getFirebase();
  const write = setDoc(
    doc(db, 'users', userId),
    {
      organization,
      teamSize: teamSize ?? null,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
  try {
    await withTimeout(write, 1500);
  } catch (error) {
    if (error instanceof Error && error.message === 'timeout') {
      void write.catch(() => undefined);
      return;
    }
    throw error;
  }
=======
import { apiClient } from '@/shared/lib/axios';
import { getFirebase, hasFirebaseConfig } from '@/shared/lib/firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import type { LoginPayload, RegisterPayload } from './types';

type AuthResponse = {
  user: {
    id: string;
    email: string;
    name?: string | null;
    role: string;
    photoUrl?: string | null;
  };
  token: string;
};

const notifyAuthUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth:updated'));
  }
};

export async function login(payload: LoginPayload) {
  if (!hasFirebaseConfig()) {
    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('auth_user', JSON.stringify(response.data.user));
    notifyAuthUpdated();
    return response.data.user;
  }
  const { auth } = getFirebase();
  const credential = await signInWithEmailAndPassword(auth, payload.email, payload.password);
  const idToken = await credential.user.getIdToken();
  const response = await apiClient.post<AuthResponse>('/auth/firebase', {
    idToken,
    name: credential.user.displayName ?? undefined,
  });
  localStorage.setItem('auth_token', response.data.token);
  localStorage.setItem('auth_user', JSON.stringify(response.data.user));
  notifyAuthUpdated();
  return response.data.user;
}

export async function register(payload: RegisterPayload) {
  if (!hasFirebaseConfig()) {
    const response = await apiClient.post<AuthResponse>('/auth/register', payload);
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('auth_user', JSON.stringify(response.data.user));
    notifyAuthUpdated();
    return response.data.user;
  }
  const { auth } = getFirebase();
  const credential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
  if (payload.name) {
    await updateProfile(credential.user, { displayName: payload.name });
  }
  const idToken = await credential.user.getIdToken(true);
  const response = await apiClient.post<AuthResponse>('/auth/firebase', {
    idToken,
    name: payload.name,
  });
  localStorage.setItem('auth_token', response.data.token);
  localStorage.setItem('auth_user', JSON.stringify(response.data.user));
  notifyAuthUpdated();
  return response.data.user;
}

export async function googleAuth() {
  if (!hasFirebaseConfig()) {
    throw new Error('Firebase is not configured for Google sign-in.');
  }
  const { auth } = getFirebase();
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  const idToken = await credential.user.getIdToken();
  const response = await apiClient.post<AuthResponse>('/auth/firebase', {
    idToken,
    name: credential.user.displayName ?? undefined,
  });
  localStorage.setItem('auth_token', response.data.token);
  localStorage.setItem('auth_user', JSON.stringify(response.data.user));
  notifyAuthUpdated();
  return response.data.user;
}

export async function saveOrganization() {
  return undefined;
>>>>>>> e054afa1 (Save 1)
}
