<template>
  <AuthLayout>
    <template #left>
      <div class="hero">
        <h1 class="hero-title reveal">Reset your password</h1>
        <p class="hero-copy reveal delay-1">
          Enter your email and we will send a secure reset link.
        </p>
      </div>
    </template>
    <template #right>
      <div class="card auth-card reveal delay-1">
        <div class="card-header">
          <p class="card-title">Forgot password</p>
          <p class="helper">We will email you a reset link.</p>
        </div>
        <form class="form" @submit.prevent="handleSubmit">
          <div class="field">
            <label class="label" for="email">Email address</label>
            <input
              id="email"
              v-model.trim="email"
              type="email"
              class="input"
              placeholder="you@company.com"
              required
            />
          </div>
          <button class="btn btn-primary" type="submit">Send reset link</button>
          <p class="footer">
            Remembered your password?
            <RouterLink class="link" to="/login">Back to sign in</RouterLink>
          </p>
        </form>
      </div>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import AuthLayout from '@/layouts/AuthLayout.vue';

const email = ref('');

const handleSubmit = () => {
  console.info('Password reset requested', { email: email.value });
};
</script>

<style scoped>
.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3vw, 2.4rem);
  color: var(--ink-strong);
  margin: 0 0 0.5rem 0;
}

.hero-copy {
  color: var(--muted);
  max-width: 420px;
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

.link {
  color: var(--accent);
  font-weight: 600;
}

.footer {
  margin: 0;
  font-size: 0.9rem;
  color: var(--muted);
  text-align: center;
}
</style>
