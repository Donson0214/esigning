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
          <p class="brand-title">SignFlow</p>
          <p class="brand-sub">Enterprise E-Signature Platform</p>
        </div>
      </div>
      <div class="hero">
        <p class="hero-eyebrow reveal delay-1">Join thousands of teams</p>
        <h1 class="hero-title reveal delay-2">Start signing with confidence.</h1>
        <p class="hero-copy reveal delay-3">
          Create an account to send and track documents with a clear, auditable signing workflow.
        </p>
        <ul class="hero-list">
          <li class="reveal delay-1">Fast onboarding in minutes</li>
          <li class="reveal delay-2">No credit card required</li>
          <li class="reveal delay-3">Cancel anytime</li>
          <li class="reveal delay-4">Priority onboarding support</li>
        </ul>
      </div>
    </template>
    <template #right>
      <div class="card auth-card reveal delay-1">
        <div class="progress">
          <span :class="['dot', step === 1 ? 'active' : '']">1</span>
          <span class="line"></span>
          <span :class="['dot', step === 2 ? 'active' : '']">2</span>
        </div>
        <div class="card-header">
          <p class="card-title">{{ step === 1 ? 'Personal information' : 'Organization details' }}</p>
          <p class="helper">
            {{ step === 1 ? 'Create your personal account.' : 'Tell us where you work.' }}
          </p>
        </div>
        <form class="form" @submit.prevent="handleNext">
          <div v-if="step === 1" class="step">
            <div class="field">
              <label class="label" for="name">Full name</label>
              <div class="input-shell">
                <span class="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20a8 8 0 0 1 16 0" />
                  </svg>
                </span>
                <input
                  id="name"
                  v-model.trim="form.name"
                  type="text"
                  class="input"
                  placeholder="Jane Doe"
                  autocomplete="name"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label" for="email">Work email</label>
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
                  placeholder="At least 8 characters"
                  autocomplete="new-password"
                  required
                />
                <button class="ghost" type="button" @click="showPassword = !showPassword">
                  {{ showPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>
            <div class="field">
              <label class="label" for="confirmPassword">Confirm password</label>
              <div class="input-shell">
                <span class="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="5" y="10" width="14" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <path d="M9 16l2 2 4-4" />
                  </svg>
                </span>
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  class="input"
                  placeholder="Confirm your password"
                  autocomplete="new-password"
                  required
                />
              </div>
            </div>
          </div>
          <div v-else class="step">
            <div class="field">
              <label class="label" for="organization">Organization name</label>
              <div class="input-shell">
                <span class="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 21h16" />
                    <path d="M6 21V8l6-4 6 4v13" />
                    <path d="M9 11h1M14 11h1M9 14h1M14 14h1M9 17h1M14 17h1" />
                  </svg>
                </span>
                <input
                  id="organization"
                  v-model.trim="form.organization"
                  type="text"
                  class="input"
                  placeholder="Company or team name"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label" for="teamSize">Team size</label>
              <div class="input-shell">
                <span class="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="8" cy="9" r="3" />
                    <circle cx="16" cy="9" r="3" />
                    <path d="M3 21a5 5 0 0 1 10 0" />
                    <path d="M11 21a5 5 0 0 1 10 0" />
                  </svg>
                </span>
                <select id="teamSize" v-model="form.teamSize" class="input">
                  <option value="">Select size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
            </div>
          </div>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          <div class="actions">
            <button v-if="step === 2" class="btn btn-outline" type="button" @click="step = 1">
              Back
            </button>
            <button
              class="btn btn-primary"
              type="submit"
              :disabled="isSubmitting"
            >
              {{ step === 1 ? 'Continue' : isSubmitting ? 'Creating account...' : 'Create account' }}
            </button>
          </div>
        </form>
        <div class="divider">Or continue with</div>
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
        <p class="footer">
          Already have an account?
          <RouterLink class="link" to="/login">Sign in</RouterLink>
        </p>
      </div>
    </template>
  </AuthLayout>

</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { googleAuth, register } from '@/features/auth/api';

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  organization: '',
  teamSize: '',
});

const step = ref(1);
const showPassword = ref(false);
const isSubmitting = ref(false);
const isGoogleSubmitting = ref(false);
const errorMessage = ref('');
const router = useRouter();

const getAuthErrorMessage = (error: unknown, fallback: string) => {
  const message =
    (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
    (error as { response?: { data?: { error?: string } } })?.response?.data?.error ??
    (error instanceof Error ? error.message : '');
  return message || fallback;
};

const validateStepOne = () => {
  if (!form.name || !form.email || !form.password || !form.confirmPassword) {
    errorMessage.value = 'Please fill out all required fields.';
    return false;
  }
  if (form.password.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters.';
    return false;
  }
  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Passwords do not match.';
    return false;
  }
  return true;
};

const validateStepTwo = () => {
  if (!form.organization) {
    errorMessage.value = 'Organization name is required.';
    return false;
  }
  return true;
};

const handleNext = async () => {
  errorMessage.value = '';
  if (step.value === 1) {
    if (!validateStepOne()) return;
    step.value = 2;
    return;
  }
  if (!validateStepTwo()) return;
  isSubmitting.value = true;
  try {
    await register({
      name: form.name,
      email: form.email,
      password: form.password,
      organization: form.organization,
      teamSize: form.teamSize,
    });
    router.push('/app/dashboard');
  } catch (error: any) {
    errorMessage.value = getAuthErrorMessage(error, 'Unable to create account right now.');
  } finally {
    isSubmitting.value = false;
  }
};

const openGoogle = async () => {
  errorMessage.value = '';
  isGoogleSubmitting.value = true;
  try {
    await googleAuth();
    router.push('/app/dashboard');
  } catch (error: any) {
    errorMessage.value = error?.message ?? 'Google sign-up failed.';
  } finally {
    isGoogleSubmitting.value = false;
  }
};

onMounted(() => {
  if (localStorage.getItem('auth_token')) {
    router.replace('/app/dashboard');
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

.hero-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 700;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3vw, 2.6rem);
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
  width: min(440px, 100%);
  display: grid;
  gap: 1.5rem;
}

.progress {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.dot {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid var(--line);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--muted);
}

.dot.active {
  background: linear-gradient(120deg, #0f766e, #0c4a6e);
  color: #ffffff;
  border-color: transparent;
}

.line {
  flex: 1;
  height: 2px;
  background: var(--line);
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

.step {
  display: grid;
  gap: 1rem;
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

.actions {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: space-between;
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
