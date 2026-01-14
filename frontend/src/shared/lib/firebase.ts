import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
};

let cached: FirebaseServices | null = null;

const getConfig = () => ({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId'] as const;

export const hasFirebaseConfig = () => {
  const config = getConfig();
  return requiredKeys.every((key) => typeof config[key] === 'string' && config[key].length > 0);
};

export const getFirebase = (): FirebaseServices => {
  if (cached) return cached;
  const config = getConfig();
  const missing = requiredKeys.filter((key) => !config[key]);
  if (missing.length > 0) {
    throw new Error(`Firebase config missing: ${missing.join(', ')}`);
  }
  const app = initializeApp(config);
  cached = {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
  };
  return cached;
};
