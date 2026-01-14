<template>
  <div class="sent-page">
    <section class="page-header">
      <h2>Sent Documents</h2>
      <p>Track documents you've sent for signature</p>
    </section>

    <section class="sent-list">
      <article v-for="doc in sentDocuments" :key="doc.id" class="sent-card">
        <span class="doc-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m3 11 18-8-6 18-3-7-9-3Z" />
            <path d="M12 12h9" />
          </svg>
        </span>
        <div class="doc-main">
          <p class="doc-title">{{ doc.title }}</p>
          <div class="doc-meta">
            <span class="meta-item">
              <span class="meta-label">To:</span>
              <span class="meta-value">{{ doc.recipient }}</span>
            </span>
            <span class="meta-item">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              <span>{{ formatDate(doc.date) }}</span>
            </span>
            <span class="meta-item">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>{{ doc.views }} views</span>
            </span>
          </div>
        </div>
        <span :class="['status-pill', statusClass(doc.status)]">{{ doc.status }}</span>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
type SentStatus = 'Pending' | 'Viewed' | 'Signed' | 'Expired';
=======
import { computed } from 'vue';
import { useDocuments } from '@/features/documents/composables';

type SentStatus = 'Pending' | 'Viewed' | 'Signed' | 'Completed' | 'Declined' | 'Expired';
>>>>>>> e054afa1 (Save 1)

type SentDocument = {
  id: string;
  title: string;
  recipient: string;
  date: string;
  views: number;
  status: SentStatus;
};

<<<<<<< HEAD
const sentDocuments: SentDocument[] = [
  {
    id: 'sent-1',
    title: 'Service Agreement - ABC Ltd',
    recipient: 'contracts@abc.com',
    date: '2026-01-11',
    views: 3,
    status: 'Pending',
  },
  {
    id: 'sent-2',
    title: 'NDA Agreement - Tech Corp',
    recipient: 'legal@techcorp.com',
    date: '2026-01-10',
    views: 5,
    status: 'Viewed',
  },
  {
    id: 'sent-3',
    title: 'Consulting Agreement',
    recipient: 'admin@consulting.com',
    date: '2026-01-09',
    views: 2,
    status: 'Signed',
  },
  {
    id: 'sent-4',
    title: 'Partnership MOU',
    recipient: 'partner@company.com',
    date: '2026-01-08',
    views: 1,
    status: 'Expired',
  },
];
=======
const { documents } = useDocuments();

const mapStatus = (status: string): SentStatus => {
  switch (status) {
    case 'VIEWED':
      return 'Viewed';
    case 'SIGNED':
      return 'Signed';
    case 'COMPLETED':
      return 'Completed';
    case 'DECLINED':
      return 'Declined';
    case 'EXPIRED':
      return 'Expired';
    default:
      return 'Pending';
  }
};

const sentDocuments = computed<SentDocument[]>(() =>
  documents.value
    .filter((doc) => doc.status !== 'DRAFT')
    .map((doc) => {
      const views = doc.signers?.filter((signer) => signer.viewedAt || signer.status !== 'PENDING')
        .length ?? 0;
      return {
        id: doc.id,
        title: doc.title,
        recipient: doc.signers?.[0]?.email ?? 'Not sent',
        date: doc.sentAt ?? doc.updatedAt ?? doc.createdAt ?? new Date().toISOString(),
        views,
        status: mapStatus(doc.status),
      };
    }),
);
>>>>>>> e054afa1 (Save 1)

const statusClass = (status: SentStatus) => {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'Viewed':
      return 'info';
    case 'Signed':
<<<<<<< HEAD
      return 'success';
=======
    case 'Completed':
      return 'success';
    case 'Declined':
    case 'Expired':
>>>>>>> e054afa1 (Save 1)
    default:
      return 'danger';
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
</script>

<style scoped>
.sent-page {
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

.sent-list {
  display: grid;
  gap: 1.2rem;
}

.sent-card {
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

.meta-item svg {
  width: 16px;
  height: 16px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 1.7;
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

@media (max-width: 720px) {
  .sent-card {
    grid-template-columns: auto 1fr;
  }

  .status-pill {
    justify-self: start;
  }
}
</style>
<<<<<<< HEAD
=======

>>>>>>> e054afa1 (Save 1)
