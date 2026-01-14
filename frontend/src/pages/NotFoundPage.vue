<template>
  <main class="not-found">
    <div class="card">
      <p class="code">404</p>
      <h1 class="title">Page not found</h1>
      <p class="copy">We could not find the page you are looking for.</p>
      <RouterLink class="btn btn-primary" to="/login">Back to sign in</RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
}

.card {
  text-align: center;
  padding: 3rem 2.5rem;
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow-lg);
}

.code {
  font-size: 3rem;
  font-weight: 800;
  color: var(--accent);
  margin: 0;
}

.title {
  font-family: var(--font-serif);
  color: var(--ink-strong);
  margin: 0.5rem 0;
}

.copy {
  color: var(--muted);
  margin-bottom: 1.5rem;
}
</style>
