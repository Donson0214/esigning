<template>
  <section class="empty">
    <div class="empty-card">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<style scoped>
.empty {
  display: grid;
  place-items: center;
  min-height: 320px;
}

.empty-card {
  background: var(--surface);
  border-radius: 22px;
  padding: 2rem 2.5rem;
  box-shadow: var(--shadow-md);
  text-align: center;
}

.empty-card h2 {
  margin: 0;
  color: var(--ink-strong);
}

.empty-card p {
  margin: 0.5rem 0 0;
  color: var(--muted);
}
</style>
