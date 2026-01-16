<template>
  <div class="audit-page">
    <section class="page-header">
      <h2>Audit Trail</h2>
      <p>Complete history of all document activities</p>
    </section>

    <section class="filters-card">
      <div class="filter-select">
        <select v-model="eventFilter" aria-label="Filter by event">
          <option v-for="option in eventOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      <div class="filter-select">
        <select v-model="rangeFilter" aria-label="Filter by time range">
          <option v-for="option in rangeOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      <div class="filter-select">
        <select v-model="docFilter" aria-label="Filter by document">
          <option v-for="option in documentOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>

    <section class="timeline-card">
      <div class="timeline">
        <article v-for="event in visibleEvents" :key="event.id" class="timeline-item">
          <div :class="['event-marker', statusClass(event.eventType)]">
            <span v-html="eventIcon(event.eventType)"></span>
          </div>
          <div class="event-card">
            <div class="event-top">
              <span :class="['event-type', statusClass(event.eventType)]">{{ formatEventType(event.eventType) }}</span>
              <span class="event-time">{{ formatDateTime(event.createdAt) }}</span>
            </div>
            <h4 class="event-title">{{ event.documentTitle }}</h4>
            <p class="event-desc">{{ eventDescription(event) }}</p>
            <div class="event-meta">
              <span class="meta-item">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20a8 8 0 0 1 16 0" />
                </svg>
                User: {{ eventActor(event) }}
              </span>
              <span v-if="event.ipAddress" class="meta-item">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="14" rx="2" />
                  <path d="M8 20h8" />
                </svg>
                IP: {{ event.ipAddress }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <button
        v-if="canLoadMore"
        class="btn btn-outline load-more"
        type="button"
        @click="loadMore"
      >
        Load More Events
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { listAuditEvents } from '@/features/audit/api';
import type { AuditEvent } from '@/features/audit/types';
import { connectSocket, onSocketEvent } from '@/shared/lib/socket';

const auditEvents = ref<AuditEvent[]>([]);
const nextCursor = ref<string | null>(null);
const loading = ref(false);
const error = ref('');

const rangeOptions = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'All time'] as const;

function formatEventType(type: string) {
  const mapped: Record<string, string> = {
    DOCUMENT_UPLOADED: 'Created',
    DOCUMENT_SENT: 'Sent',
    DOCUMENT_VIEWED: 'Viewed',
    DOCUMENT_SIGNED: 'Signed',
    DOCUMENT_COMPLETED: 'Completed',
    DOCUMENT_HASH_COMPUTED: 'Hash computed',
    DOCUMENT_DECLINED: 'Declined',
    DOCUMENT_EXPIRED: 'Expired',
    ACCESS_GRANTED: 'Access granted',
    ACCESS_REVOKED: 'Access revoked',
    FIELD_UPDATED: 'Field updated',
    SIGNING_SESSION_CREATED: 'Signing session',
    MANIFEST_SUBMITTED: 'Manifest submitted',
    SIGNATURE_CAPTURED: 'Signature captured',
    SIGNATURE_APPLIED: 'Signature applied',
    SIGNATURE_REJECTED: 'Signature rejected',
  };
  return mapped[type] ?? type.replace(/_/g, ' ').toLowerCase();
}

const eventOptions = computed(() => {
  const items = new Map<string, string>();
  auditEvents.value.forEach((event) => {
    items.set(event.eventType, formatEventType(event.eventType));
  });
  return [{ value: 'ALL', label: 'All Events' }, ...Array.from(items.entries()).map(([value, label]) => ({ value, label }))];
});

const documentOptions = computed(() => {
  const items = new Map<string, string>();
  auditEvents.value.forEach((event) => {
    items.set(event.documentId, event.documentTitle);
  });
  return [{ value: 'ALL', label: 'All Documents' }, ...Array.from(items.entries()).map(([value, label]) => ({ value, label }))];
});

const eventFilter = ref('ALL');
const rangeFilter = ref<(typeof rangeOptions)[number]>('Last 7 days');
const docFilter = ref('ALL');

const getRangeCutoff = () => {
  const now = Date.now();
  switch (rangeFilter.value) {
    case 'Last 7 days':
      return now - 7 * 24 * 60 * 60 * 1000;
    case 'Last 30 days':
      return now - 30 * 24 * 60 * 60 * 1000;
    case 'Last 90 days':
      return now - 90 * 24 * 60 * 60 * 1000;
    default:
      return null;
  }
};

const refresh = async () => {
  loading.value = true;
  error.value = '';
  try {
    const result = await listAuditEvents({ limit: 80 });
    auditEvents.value = result.events;
    nextCursor.value = result.nextCursor ?? null;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unable to load audit events.';
  } finally {
    loading.value = false;
  }
};

const loadMore = async () => {
  if (!nextCursor.value) return;
  try {
    const result = await listAuditEvents({ before: nextCursor.value, limit: 80 });
    auditEvents.value = [...auditEvents.value, ...result.events];
    nextCursor.value = result.nextCursor ?? null;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unable to load more events.';
  }
};

const canLoadMore = computed(() => Boolean(nextCursor.value));

const statusClass = (type: string) => {
  if (type.includes('DECLINED') || type.includes('EXPIRED') || type.includes('REJECTED')) {
    return 'danger';
  }
  if (type.includes('SIGNED') || type.includes('COMPLETED') || type.includes('APPLIED')) {
    return 'success';
  }
  if (type.includes('VIEWED')) {
    return 'info';
  }
  return 'warning';
};

const eventIcon = (type: string) => {
  if (type.includes('SIGNED') || type.includes('COMPLETED')) {
    return '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>';
  }
  if (type.includes('VIEWED')) {
    return '<svg viewBox="0 0 24 24"><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3"/></svg>';
  }
  return '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>';
};

const eventDescription = (event: AuditEvent) => {
  const label = formatEventType(event.eventType);
  return `${label} on ${event.documentTitle}`;
};

const eventActor = (event: AuditEvent) =>
  event.actor?.name || event.actor?.email || (event.actor?.type === 'SYSTEM' ? 'System' : 'Unknown');

const visibleEvents = computed(() => {
  let items = auditEvents.value.slice();
  if (eventFilter.value !== 'ALL') {
    items = items.filter((event) => event.eventType === eventFilter.value);
  }
  if (docFilter.value !== 'ALL') {
    items = items.filter((event) => event.documentId === docFilter.value);
  }
  const cutoff = getRangeCutoff();
  if (cutoff) {
    items = items.filter((event) => new Date(event.createdAt).getTime() >= cutoff);
  }
  return items;
});

const formatDateTime = (value: string) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

let unsubscribe: (() => void) | null = null;

onMounted(async () => {
  await refresh();
  connectSocket();
  unsubscribe = onSocketEvent((event) => {
    if (event.event === 'doc.audit.appended') {
      void refresh();
    }
  });
});

onBeforeUnmount(() => {
  unsubscribe?.();
});
</script>

<style scoped>
.audit-page {
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

.filters-card {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem 1.2rem;
  box-shadow: var(--shadow-md);
}

.filter-select {
  position: relative;
}

.filter-select select {
  height: 42px;
  border-radius: 12px;
  border: 1px solid var(--line);
  padding: 0 2.2rem 0 1rem;
  background: var(--surface);
  font-weight: 600;
  appearance: none;
}

.chev {
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 2;
  pointer-events: none;
}

.timeline-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: var(--shadow-md);
  display: grid;
  gap: 1.5rem;
}

.timeline {
  position: relative;
  display: grid;
  gap: 1.2rem;
  padding-left: 3.2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 22px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(79, 70, 229, 0.25);
  border-radius: 999px;
}

.timeline-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
}

.event-marker {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: var(--surface-2);
  box-shadow: var(--shadow-md);
  color: var(--accent);
}

.event-marker span :deep(svg) {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
}

.event-marker.success {
  background: rgba(34, 197, 94, 0.12);
  color: var(--success);
}

.event-marker.info {
  background: rgba(59, 130, 246, 0.12);
  color: #3b82f6;
}

.event-marker.accent {
  background: rgba(79, 70, 229, 0.12);
  color: var(--accent);
}

.event-marker.accent-soft {
  background: rgba(139, 92, 246, 0.12);
  color: #8b5cf6;
}

.event-marker.neutral {
  background: rgba(148, 163, 184, 0.2);
  color: #64748b;
}

.event-marker.danger {
  background: rgba(239, 68, 68, 0.12);
  color: var(--danger);
}

.event-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem 1.2rem;
  display: grid;
  gap: 0.5rem;
}

.event-top {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.85rem;
}

.event-type {
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  text-transform: capitalize;
}

.event-type.success {
  background: rgba(34, 197, 94, 0.12);
  color: var(--success);
}

.event-type.info {
  background: rgba(59, 130, 246, 0.12);
  color: #3b82f6;
}

.event-type.accent {
  background: rgba(79, 70, 229, 0.12);
  color: var(--accent);
}

.event-type.accent-soft {
  background: rgba(139, 92, 246, 0.12);
  color: #8b5cf6;
}

.event-type.neutral {
  background: rgba(148, 163, 184, 0.2);
  color: #64748b;
}

.event-type.danger {
  background: rgba(239, 68, 68, 0.12);
  color: var(--danger);
}

.event-time {
  color: var(--muted);
}

.event-title {
  margin: 0;
  color: var(--ink-strong);
  font-size: 1rem;
}

.event-desc {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.event-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--muted);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.meta-item svg {
  width: 16px;
  height: 16px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 1.7;
}

.load-more {
  margin: 0 auto;
  border-radius: 14px;
  padding: 0.6rem 1.4rem;
}

@media (max-width: 900px) {
  .timeline {
    padding-left: 2.6rem;
  }

  .timeline::before {
    left: 18px;
  }
}

@media (max-width: 720px) {
  .filters-card {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-select select {
    width: 100%;
  }

  .event-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

