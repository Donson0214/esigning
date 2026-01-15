<template>
  <AuthLayout>
    <template #left>
      <div class="brand reveal">
        <div class="logo">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path
              d="M12 9h18c5 0 9 4 9 9v12c0 5-4 9-9 9H12c-5 0-9-4-9-9V18c0-5 4-9 9-9Z"
              fill="url(#logoGradient)"
            />
            <path
              d="M16 24c6 2 8 8 8 8s4-6 8-8c-4-2-8-8-8-8s-2 6-8 8Z"
              fill="#ffffff"
              opacity="0.9"
            />
            <defs>
              <linearGradient id="logoGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stop-color="#0f766e" />
                <stop offset="1" stop-color="#0c4a6e" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div>
          <p class="brand-title">WilsonFlow</p>
          <p class="brand-sub">Enterprise E-Signature Platform</p>
        </div>
      </div>
      <div class="hero">
        <h1 class="hero-title reveal delay-1">Welcome back.</h1>
        <p class="hero-copy reveal delay-2">
          Sign in to access your documents, track signature progress, and keep a verifiable audit
          trail.
        </p>
        <ul class="hero-list">
          <li class="reveal delay-1">Secure document signing</li>
          <li class="reveal delay-2">Real-time status visibility</li>
          <li class="reveal delay-3">Immutable audit trail</li>
          <li class="reveal delay-4">Enterprise-grade governance</li>
        </ul>
      </div>
    </template>
    <template #right>
      <div class="card auth-card reveal delay-1">
        <div class="card-header">
          <p class="card-title">Sign in</p>
          <p class="helper">Enter your credentials to access your account.</p>
        </div>
        <form class="form" @submit.prevent="handleLogin">
          <div class="field">
            <label class="label" for="email">Email address</label>
            <div class="input-shell">
              <span class="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <input
                id="email"
                v-model.trim="form.email"
                type="email"
                class="input"
                placeholder="you@company.com"
                autocomplete="email"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label" for="password">Password</label>
            <div class="password">
              <span class="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </span>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="input"
                placeholder="Enter your password"
                autocomplete="current-password"
                required
              />
              <button class="ghost" type="button" @click="showPassword = !showPassword">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>
          <div class="form-row">
            <label class="checkbox">
              <input v-model="form.remember" type="checkbox" />
              Remember me
            </label>
            <RouterLink class="link" to="/forgot-password">Forgot password?</RouterLink>
          </div>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          <button class="btn btn-primary" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>
        <div class="divider">Or continue with</div>
        <div class="social">
          <button
            class="btn btn-outline"
            type="button"
            :disabled="isGoogleSubmitting"
            @click="openGoogle"
          >
            <span class="social-icon google" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.79-.07-1.53-.2-2.27H12v4.29h6.47a5.54 5.54 0 0 1-2.4 3.64v3.02h3.89c2.27-2.09 3.53-5.18 3.53-8.68Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.07 7.94-2.9l-3.89-3.02c-1.08.72-2.47 1.14-4.05 1.14-3.13 0-5.78-2.11-6.73-4.95H1.25v3.12A12 12 0 0 0 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27 14.27A7.17 7.17 0 0 1 4.9 12c0-.79.14-1.56.37-2.27V6.6H1.25A12 12 0 0 0 0 12c0 1.93.46 3.75 1.25 5.4l4.02-3.13Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.8c1.76 0 3.35.6 4.6 1.78l3.45-3.45A11.95 11.95 0 0 0 12 0 12 12 0 0 0 1.25 6.6l4.02 3.13C6.22 6.91 8.87 4.8 12 4.8Z"
                />
              </svg>
            </span>
            <span v-if="isGoogleSubmitting" class="spinner" aria-hidden="true"></span>
            {{ isGoogleSubmitting ? 'Signing in...' : 'Continue with Google' }}
          </button>
        </div>
        <p class="footer">
          Don't have an account?
          <RouterLink class="link" to="/register">Sign up for free</RouterLink>
        </p>
      </div>
    </template>
  </AuthLayout>

</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { googleAuth, login } from '@/features/auth/api';

const form = reactive({
  email: '',
  password: '',
  remember: true,
});

const showPassword = ref(false);
const isSubmitting = ref(false);
const isGoogleSubmitting = ref(false);
const errorMessage = ref('');
const router = useRouter();
const route = useRoute();

const resolveRedirect = () => {
  const redirect = route.query.redirect;
  if (typeof redirect === 'string' && redirect.startsWith('/app/')) {
    return redirect;
  }
  return '/app/dashboard';
};

const getAuthErrorMessage = (error: unknown, fallback: string) => {
  const message =
    (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
    (error as { response?: { data?: { error?: string } } })?.response?.data?.error ??
    (error instanceof Error ? error.message : '');
  return message || fallback;
};

const handleLogin = async () => {
  errorMessage.value = '';
  isSubmitting.value = true;
  try {
    await login({ email: form.email, password: form.password });
    router.push(resolveRedirect());
  } catch (error: any) {
    errorMessage.value = getAuthErrorMessage(error, 'Unable to sign in right now.');
  } finally {
    isSubmitting.value = false;
  }
};

const openGoogle = async () => {
  errorMessage.value = '';
  isGoogleSubmitting.value = true;
  try {
    await googleAuth();
    router.push(resolveRedirect());
  } catch (error: any) {
    errorMessage.value = error?.message ?? 'Google sign-in failed.';
  } finally {
    isGoogleSubmitting.value = false;
  }
};

onMounted(() => {
  if (localStorage.getItem('auth_token')) {
    router.replace(resolveRedirect());
  }
});
</script>

<style scoped>
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.brand-title {
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--ink-strong);
}

.brand-sub {
  font-size: 0.85rem;
  color: var(--muted);
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3vw, 2.8rem);
  color: var(--ink-strong);
  margin: 0;
}

.hero-copy {
  max-width: 420px;
  color: var(--muted);
  line-height: 1.6;
}

.hero-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.7rem;
  color: var(--ink);
}

.hero-list li {
  padding-left: 1.4rem;
  position: relative;
}

.hero-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.4rem;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 999px;
  background: linear-gradient(140deg, var(--accent), var(--accent-warm));
}

.auth-card {
  width: min(420px, 100%);
  display: grid;
  gap: 1.5rem;
}

.card-title {
  font-weight: 700;
  font-size: 1.3rem;
  margin: 0 0 0.3rem 0;
  color: var(--ink-strong);
}

.form {
  display: grid;
  gap: 1rem;
}

.input-shell {
  position: relative;
}

.input-shell .input {
  padding-left: 2.6rem;
}

.password {
  position: relative;
}

.password .input {
  padding-left: 2.6rem;
  padding-right: 4rem;
}

.input-icon {
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
}

.input-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.6;
}

.ghost {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  font-size: 0.8rem;
  color: var(--muted);
  cursor: pointer;
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
}

.checkbox {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
}

.link {
  color: var(--accent);
  font-weight: 600;
}

.error {
  color: #b91c1c;
  font-size: 0.85rem;
  margin: 0;
}

.warning {
  color: #a16207;
  background: #fef3c7;
  border-radius: 12px;
  padding: 0.75rem 0.9rem;
  font-size: 0.85rem;
  margin: 0;
}

.social {
  display: grid;
  gap: 0.75rem;
}

.social-icon {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border: 1px solid var(--line);
  font-weight: 700;
  color: var(--ink-strong);
}

.social-icon.google {
  background: transparent;
  border: none;
}

.social-icon svg {
  width: 20px;
  height: 20px;
}

.spinner {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid rgba(15, 23, 42, 0.2);
  border-top-color: var(--accent);
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.footer {
  margin: 0;
  font-size: 0.9rem;
  color: var(--muted);
  text-align: center;
}
@media (max-width: 960px) {
  .auth-card {
    width: 100%;
  }
}
</style>
