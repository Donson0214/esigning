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
}
