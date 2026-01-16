<template>
  <div class="received-page">
    <section class="page-header">
     
      <p>Documents waiting for your signature</p>
    </section>

    <section class="received-list">
      <p v-if="loading" class="status-text">Loading received documents...</p>
      <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-else-if="receivedDocuments.length === 0" class="empty">No documents waiting for your signature.</p>
      <article v-for="doc in receivedDocuments" :key="doc.documentId" class="received-card">
        <span class="doc-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <rect x="4" y="6" width="16" height="12" rx="3" />
            <path d="M8 6V4h8v2" />
          </svg>
        </span>
        <div class="doc-main">
          <p class="doc-title">{{ doc.title }}</p>
          <div class="doc-meta">
            <span class="meta-item">
              <span class="meta-label">From:</span>
              <span class="meta-value">{{ doc.sender.name }}</span>
            </span>
            <span class="meta-item">
              <span class="meta-label">Received:</span>
              <span class="meta-value">{{ formatDate(doc.sentAt) }}</span>
            </span>
            <span v-if="doc.signingExpiresAt" class="meta-item due">
              <span class="meta-label">Due:</span>
              <span class="meta-value">{{ formatDate(doc.signingExpiresAt) }}</span>
            </span>
          </div>
        </div>
        <div class="card-actions">
          <span :class="['status-pill', statusClass(displayStatus(doc))]">{{ displayStatus(doc) }}</span>
          <button
            v-if="doc.canSign"
            class="btn btn-primary sign-btn"
            type="button"
            :disabled="signingDocId === doc.documentId"
            @click="signNow(doc)"
          >
            <span class="btn-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m5 4 6 6-4 4-6-6 4-4Z" />
                <path d="m15 6 3 3" />
                <path d="M10 15 6 19l-4 1 1-4 4-4" />
              </svg>
            </span>
            Sign Now
          </button>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { createSigningToken, listReceivedDocuments } from '@/features/documents/api';
import type { ReceivedDocumentRecord } from '@/features/documents/types';

type ReceivedStatus = 'Pending' | 'Viewed' | 'Signed' | 'Declined' | 'Expired';

const router = useRouter();
const receivedDocuments = ref<ReceivedDocumentRecord[]>([]);
const loading = ref(false);
const errorMessage = ref('');
const signingDocId = ref<string | null>(null);

const refresh = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    receivedDocuments.value = await listReceivedDocuments();
  } catch (error: any) {
    errorMessage.value =
      error?.response?.data?.message ??
      error?.message ??
      'Unable to load received documents.';
  } finally {
    loading.value = false;
  }
};

const formatDate = (value: string) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const displayStatus = (doc: ReceivedDocumentRecord): ReceivedStatus => {
  if (doc.status === 'EXPIRED') return 'Expired';
  if (doc.signerStatus === 'DECLINED') return 'Declined';
  if (doc.signerStatus === 'SIGNED' || doc.status === 'COMPLETED') return 'Signed';
  if (doc.signerStatus === 'VIEWED') return 'Viewed';
  return 'Pending';
};

const statusClass = (status: ReceivedStatus) => {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'Viewed':
      return 'info';
    case 'Signed':
      return 'success';
    case 'Declined':
    case 'Expired':
      return 'danger';
    default:
      return 'info';
  }
};

const signNow = async (doc: ReceivedDocumentRecord) => {
  if (!doc.canSign || signingDocId.value) return;
  signingDocId.value = doc.documentId;
  errorMessage.value = '';
  try {
    const result = await createSigningToken(doc.documentId);
    await router.push(`/sign/${result.signingToken}`);
  } catch (error: any) {
    errorMessage.value =
      error?.response?.data?.message ??
      error?.message ??
      'Unable to start signing session.';
  } finally {
    signingDocId.value = null;
  }
};

onMounted(() => {
  void refresh();
});
</script>

<style scoped>
.received-page {
  display: grid;
  gap: 1.6rem;
}

.page-header h2 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--ink-strong);
}

.page-header p {
  margin: 0.4rem 0 0;
  color: var(--muted);
}

.received-list {
  display: grid;
  gap: 1.2rem;
}

.status-text,
.empty,
.error {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
}

.error {
  color: #b91c1c;
}

.received-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1.2rem 1.4rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.2rem;
  box-shadow: var(--shadow-md);
}

.doc-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: var(--accent-soft);
  color: var(--accent);
  display: grid;
  place-items: center;
}

.doc-icon svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
}

.doc-main {
  display: grid;
  gap: 0.4rem;
}

.doc-title {
  margin: 0;
  font-weight: 600;
  color: var(--ink-strong);
}

.doc-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: var(--muted);
  font-size: 0.85rem;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.meta-label {
  color: var(--muted);
}

.meta-value {
  color: var(--ink);
  font-weight: 500;
}

.meta-item.due .meta-value {
  color: var(--warning);
  font-weight: 600;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid transparent;
}

.status-pill::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.status-pill.success {
  background: rgba(22, 163, 74, 0.12);
  color: #16a34a;
  border-color: rgba(22, 163, 74, 0.35);
}

.status-pill.warning {
  background: rgba(245, 158, 11, 0.14);
  color: #f59e0b;
  border-color: rgba(245, 158, 11, 0.4);
}

.status-pill.info {
  background: rgba(59, 130, 246, 0.14);
  color: #2563eb;
  border-color: rgba(59, 130, 246, 0.35);
}

.status-pill.danger {
  background: rgba(239, 68, 68, 0.14);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.35);
}

.sign-btn {
  border-radius: 12px;
  padding: 0.6rem 1.1rem;
  gap: 0.5rem;
}

.sign-btn svg {
  width: 16px;
  height: 16px;
  stroke: #ffffff;
  fill: none;
  stroke-width: 1.8;
}

@media (max-width: 900px) {
  .received-card {
    grid-template-columns: auto 1fr;
  }

  .card-actions {
    justify-self: start;
  }
}
</style>
