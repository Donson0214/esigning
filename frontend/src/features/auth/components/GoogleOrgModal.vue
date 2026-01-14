<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="close">
      <div class="modal-card">
        <header class="modal-header">
          <p class="modal-title">Complete your workspace</p>
          <button class="close" type="button" @click="close">Close</button>
        </header>
        <p class="modal-copy">
          This looks like your first time signing in with Google. Add your organization name to
          finish setup.
        </p>
        <form class="modal-form" @submit.prevent="submit">
          <div class="field">
            <label class="label" for="googleEmail">Google account</label>
            <input
              id="googleEmail"
              class="input"
              type="email"
              :value="email || ''"
              placeholder="you@company.com"
              disabled
            />
          </div>
          <div class="field">
            <label class="label" for="orgName">Organization name</label>
            <input
              id="orgName"
              v-model.trim="organization"
              class="input"
              type="text"
              placeholder="Your company or team"
              required
            />
          </div>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          <div class="actions">
            <button class="btn btn-outline" type="button" @click="close">Cancel</button>
            <button class="btn btn-primary" type="submit">Continue</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  email?: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
  (event: 'complete', payload: { organization: string; email?: string }): void;
}>();

const organization = ref('');
const errorMessage = ref('');

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      organization.value = '';
      errorMessage.value = '';
    }
  },
);

const close = () => emit('update:modelValue', false);

const submit = () => {
  if (!organization.value.trim()) {
    errorMessage.value = 'Organization name is required.';
    return;
  }
  emit('complete', {
    organization: organization.value.trim(),
    email: props.email,
  });
  close();
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: grid;
  place-items: center;
  padding: 1.5rem;
  z-index: 10;
}

.modal-card {
  width: min(520px, 100%);
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  animation: fadeUp 0.4s ease both;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.modal-title {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--ink-strong);
  margin: 0;
}

.modal-copy {
  color: var(--muted);
  margin: 0 0 1.4rem 0;
  line-height: 1.5;
}

.modal-form {
  display: grid;
  gap: 1rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
}

.close {
  border: none;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

.error {
  color: #b91c1c;
  font-size: 0.85rem;
  margin: 0;
}
</style>
