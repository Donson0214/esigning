<template>
  <div class="documents-page">
    <section class="page-header">
      <div>
        <h2>Documents</h2>
        <p>Manage and track all your documents</p>
      </div>
      
    </section>

    <section class="toolbar">
      <div class="search">
        <span class="search-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>
        <input
          v-model.trim="searchQuery"
          type="search"
          placeholder="Search documents..."
          aria-label="Search documents"
        />
      </div>
      <div class="filters">
        <div class="select">
          <select v-model="statusFilter" aria-label="Filter by status">
            <option v-for="option in statusOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <div class="filters-wrap">
          <button class="filter-btn" type="button" @click.stop="toggleFilters">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z" />
            </svg>
            More Filters
            <span v-if="activeFilterCount" class="filter-count">{{ activeFilterCount }}</span>
          </button>
          <div v-if="filtersOpen" class="filters-popover" @click.stop>
            <div class="filter-section">
              <p class="filter-title">Document Type</p>
              <label v-for="type in typeOptions" :key="type" class="checkbox">
                <input v-model="typeFilters" type="checkbox" :value="type" />
                <span>{{ type }}</span>
              </label>
            </div>
            <div class="filter-section">
              <p class="filter-title">Sort by</p>
              <div class="select full">
                <select v-model="sortOrder" aria-label="Sort order">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
                <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
            <div class="filter-actions">
              <button class="btn btn-outline small" type="button" @click="clearFilters">
                Clear
              </button>
              <button class="btn btn-primary small" type="button" @click="filtersOpen = false">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="table-card">
      <div class="table-head">
        <span>Document</span>
        <span>Type</span>
        <span>Status</span>
        <span>Recipient</span>
        <span>Date</span>
        <span>Actions</span>
      </div>
      <div class="table-body">
        <p v-if="paginatedDocuments.length === 0" class="empty-state">No documents found.</p>
        <div v-for="doc in paginatedDocuments" :key="doc.id" class="table-row">
          <div class="doc-cell">
            <span class="doc-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 3h6l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                <path d="M13 3v5h5" />
                <path d="M9 14h6" />
                <path d="M9 17h4" />
              </svg>
            </span>
            <div>
              <p class="doc-title">{{ doc.title }}</p>
              <p class="doc-size">{{ doc.size }}</p>
            </div>
          </div>
          <div class="type-cell">{{ doc.type }}</div>
          <div class="status-cell">
            <span :class="['status-pill', statusClass(doc.status)]">{{ doc.status }}</span>
          </div>
          <div class="recipient-cell" :class="{ placeholder: doc.recipient === 'Not sent' }">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20a8 8 0 0 1 16 0" />
            </svg>
            <span>{{ doc.recipient }}</span>
          </div>
          <div class="date-cell">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M8 3v4" />
              <path d="M16 3v4" />
            </svg>
            <span>{{ formatDate(doc.date) }}</span>
          </div>
          <div class="actions-cell">
            <button class="action-btn" type="button" @click="openPreview(doc)" aria-label="Preview">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <button class="action-btn" type="button" @click="downloadDocument(doc)" aria-label="Download">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
            </button>
            <div class="menu-wrap">
              <button
                class="action-btn"
                type="button"
                aria-label="More actions"
                @click.stop="toggleMenu(doc.id)"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
              <div v-if="menuOpenId === doc.id" class="row-menu" @click.stop>
                <button type="button" class="menu-item" @click="openDetails(doc)">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View details
                </button>
                <button type="button" class="menu-item" @click="downloadDocument(doc)">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3v12" />
                    <path d="m7 10 5 5 5-5" />
                    <path d="M5 21h14" />
                  </svg>
                  Download
                </button>
                <button type="button" class="menu-item danger" @click="removeDocument(doc.id)">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 7h16" />
                    <path d="M9 7V4h6v3" />
                    <rect x="6" y="7" width="12" height="13" rx="2" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-footer">
        <p>
          Showing {{ Math.min(filteredDocuments.length, paginatedDocuments.length) }} of
          {{ filteredDocuments.length }} documents
        </p>
        <div class="pagination">
          <button class="page-btn" type="button" :disabled="currentPage === 1" @click="prevPage">
            Previous
          </button>
          <button
            v-for="page in pageNumbers"
            :key="page"
            class="page-btn"
            :class="{ active: page === currentPage }"
            type="button"
            @click="goPage(page)"
          >
            {{ page }}
          </button>
          <button
            class="page-btn"
            type="button"
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <div v-if="detailsOpen && selectedDoc" class="modal-backdrop" @click.self="detailsOpen = false">
        <div class="modal-card">
          <div class="modal-header">
            <h3>Document details</h3>
            <button class="close" type="button" @click="detailsOpen = false">Close</button>
          </div>
          <div class="modal-body">
            <p class="modal-title">{{ selectedDoc.title }}</p>
            <div class="modal-grid">
              <div>
                <p class="label">Status</p>
                <span :class="['status-pill', statusClass(selectedDoc.status)]">
                  {{ selectedDoc.status }}
                </span>
              </div>
              <div>
                <p class="label">Type</p>
                <p class="value">{{ selectedDoc.type }}</p>
              </div>
              <div>
                <p class="label">Recipient</p>
                <p class="value">{{ selectedDoc.recipient }}</p>
              </div>
              <div>
                <p class="label">Date</p>
                <p class="value">{{ formatDate(selectedDoc.date) }}</p>
              </div>
              <div>
                <p class="label">File size</p>
                <p class="value">{{ selectedDoc.size }}</p>
              </div>
              <div>
                <p class="label">Active viewers</p>
                <p class="value">{{ presenceCount(selectedDoc.id) }}</p>
              </div>
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn btn-outline small" type="button" @click="detailsOpen = false">
              Close
            </button>
            <button class="btn btn-primary small" type="button" @click="downloadDocument(selectedDoc)">
              Download
            </button>
          </div>
        </div>
      </div>
      <div v-if="previewOpen && previewDoc" class="modal-backdrop" @click.self="closePreview">
        <div class="modal-card preview-card">
          <div class="modal-header">
            <h3>Document preview</h3>
            <button class="close" type="button" @click="closePreview">Close</button>
          </div>
          <div class="preview-body">
            <iframe v-if="previewUrl" :src="previewUrl" title="Document preview"></iframe>
            <p v-else class="empty-state">Preview unavailable.</p>
          </div>
          <div class="modal-actions">
            <button class="btn btn-outline small" type="button" @click="closePreview">
              Close
            </button>
            <button class="btn btn-primary small" type="button" @click="downloadDocument(previewDoc)">
              Download
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useDocuments } from '@/features/documents/composables';

type DocumentStatus = 'Completed' | 'Pending' | 'Signed' | 'Viewed' | 'Expired' | 'Declined' | 'Draft';

type DocumentItem = {
  id: string;
  title: string;
  size: string;
  type: string;
  status: DocumentStatus;
  recipient: string;
  date: string;
  fileUrl: string;
  fileName: string;
  signedFileUrl?: string | null;
};

const { documents, loading, error, refresh, presence } = useDocuments();

const presenceCount = (docId: string) => presence.value[docId] ?? 0;

const documentRows = computed<DocumentItem[]>(() =>
  documents.value.map((doc) => ({
    id: doc.id,
    title: doc.title,
    size: `${(doc.fileSize / (1024 * 1024)).toFixed(1)} MB`,
    type: 'PDF',
    status: mapStatus(doc.status),
    recipient: doc.signers?.[0]?.email ?? 'Not sent',
    date: doc.updatedAt ?? doc.createdAt ?? new Date().toISOString(),
    fileUrl: doc.fileUrl,
    fileName: doc.fileName,
    signedFileUrl: doc.signedFileUrl ?? null,
  })),
);

const statusOptions = [
  'All Status',
  'Completed',
  'Pending',
  'Signed',
  'Viewed',
  'Expired',
  'Declined',
  'Draft',
] as const;

const typeOptions = ['Contract', 'NDA', 'Agreement'];

const searchQuery = ref('');
const statusFilter = ref<(typeof statusOptions)[number]>('All Status');
const typeFilters = ref<string[]>([]);
const sortOrder = ref<'newest' | 'oldest'>('newest');
const filtersOpen = ref(false);
const menuOpenId = ref<string | null>(null);
const detailsOpen = ref(false);
const previewOpen = ref(false);
const selectedDoc = ref<DocumentItem | null>(null);
const previewDoc = ref<DocumentItem | null>(null);
const currentPage = ref(1);
const pageSize = 8;

const activeFilterCount = computed(() => {
  let count = 0;
  if (typeFilters.value.length > 0) count += 1;
  if (sortOrder.value !== 'newest') count += 1;
  return count;
});

const filteredDocuments = computed(() => {
  let result = documentRows.value.slice();
  const search = searchQuery.value.toLowerCase();
  if (search) {
    result = result.filter((doc) =>
      [doc.title, doc.type, doc.recipient].some((field) => field.toLowerCase().includes(search)),
    );
  }
  if (statusFilter.value !== 'All Status') {
    result = result.filter((doc) => doc.status === statusFilter.value);
  }
  if (typeFilters.value.length > 0) {
    result = result.filter((doc) => typeFilters.value.includes(doc.type));
  }
  result.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder.value === 'newest' ? dateB - dateA : dateA - dateB;
  });
  return result;
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredDocuments.value.length / pageSize)),
);

const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredDocuments.value.slice(start, start + pageSize);
});

const pageNumbers = computed(() =>
  Array.from({ length: totalPages.value }, (_, index) => index + 1),
);

watch([searchQuery, statusFilter, typeFilters, sortOrder], () => {
  currentPage.value = 1;
}, { deep: true });

watch(totalPages, (value) => {
  if (currentPage.value > value) {
    currentPage.value = value;
  }
});

const toggleFilters = () => {
  filtersOpen.value = !filtersOpen.value;
};

const clearFilters = () => {
  typeFilters.value = [];
  sortOrder.value = 'newest';
};

const mapStatus = (status: string): DocumentStatus => {
  switch (status) {
    case 'COMPLETED':
      return 'Completed';
    case 'IN_PROGRESS':
      return 'Pending';
    case 'SIGNED':
      return 'Signed';
    case 'VIEWED':
      return 'Viewed';
    case 'DECLINED':
      return 'Declined';
    case 'EXPIRED':
      return 'Expired';
    default:
      return status === 'DRAFT' ? 'Draft' : 'Pending';
  }
};

const statusClass = (status: DocumentStatus) => {
  switch (status) {
    case 'Completed':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Signed':
      return 'success';
    case 'Viewed':
      return 'info';
    case 'Declined':
      return 'danger';
    case 'Expired':
      return 'danger';
    default:
      return 'neutral';
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

const toggleMenu = (id: string) => {
  menuOpenId.value = menuOpenId.value === id ? null : id;
};

const openDetails = (doc: DocumentItem) => {
  selectedDoc.value = doc;
  detailsOpen.value = true;
  previewOpen.value = false;
  previewDoc.value = null;
  menuOpenId.value = null;
};

const getPreferredUrl = (doc: DocumentItem) => doc.signedFileUrl || doc.fileUrl;
const previewUrl = computed(() => (previewDoc.value ? getPreferredUrl(previewDoc.value) : ''));

const sanitizeFileName = (value: string) =>
  value.replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');

const getFileExtension = (value: string) => {
  const match = value.match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1].toLowerCase() : 'pdf';
};

const buildDownloadName = (doc: DocumentItem) => {
  if (!doc.signedFileUrl && doc.fileName) return doc.fileName;
  const base = doc.title ? `${doc.title}-signed` : 'document-signed';
  const safeBase = sanitizeFileName(base) || 'document-signed';
  const ext = doc.fileName ? getFileExtension(doc.fileName) : 'pdf';
  return `${safeBase}.${ext}`;
};

const openPreview = (doc: DocumentItem) => {
  previewDoc.value = doc;
  previewOpen.value = true;
  detailsOpen.value = false;
  selectedDoc.value = null;
  menuOpenId.value = null;
};

const closePreview = () => {
  previewOpen.value = false;
  previewDoc.value = null;
};

const downloadDocument = async (doc: DocumentItem) => {
  menuOpenId.value = null;
  const fileName = buildDownloadName(doc);
  const url = getPreferredUrl(doc);
  if (!url) return;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Download failed');
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
  } catch {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.rel = 'noreferrer';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};

const removeDocument = (id: string) => {
  documents.value = documents.value.filter((doc) => doc.id !== id);
  menuOpenId.value = null;
};

const createDocument = () => {
  void refresh();
};

const prevPage = () => {
  currentPage.value = Math.max(1, currentPage.value - 1);
};

const nextPage = () => {
  currentPage.value = Math.min(totalPages.value, currentPage.value + 1);
};

const goPage = (page: number) => {
  currentPage.value = page;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (filtersOpen.value && !target.closest('.filters')) {
    filtersOpen.value = false;
  }
  if (menuOpenId.value && !target.closest('.menu-wrap')) {
    menuOpenId.value = null;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.documents-page {
  display: grid;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
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

.new-btn {
  border-radius: 14px;
  gap: 0.6rem;
}

.btn-icon svg {
  width: 18px;
  height: 18px;
  stroke: #ffffff;
  fill: none;
  stroke-width: 2;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 0.8rem;
  box-shadow: var(--shadow-md);
}

.search {
  flex: 1;
  position: relative;
}

.search input {
  width: 100%;
  height: 44px;
  border-radius: 14px;
  border: 1px solid var(--line);
  padding: 0 1rem 0 2.5rem;
  background: var(--surface);
}

.search-icon {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
}

.search-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.7;
}

.filters {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: relative;
}

.select {
  position: relative;
}

.select select {
  height: 44px;
  border-radius: 14px;
  border: 1px solid var(--line);
  padding: 0 2.2rem 0 1rem;
  background: var(--surface);
  font-weight: 600;
  appearance: none;
}

.select.full {
  width: 100%;
}

.select.full select {
  width: 100%;
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

.filter-btn {
  height: 44px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: var(--surface);
  padding: 0 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.filter-btn svg {
  width: 16px;
  height: 16px;
  stroke: var(--ink);
  fill: none;
  stroke-width: 1.8;
}

.filter-count {
  background: var(--accent);
  color: #ffffff;
  border-radius: 999px;
  padding: 0.1rem 0.45rem;
  font-size: 0.7rem;
}

.filters-wrap {
  position: relative;
}

.filters-popover {
  position: absolute;
  top: 52px;
  right: 0;
  width: 220px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  padding: 0.9rem;
  z-index: 10;
}

.filter-section {
  display: grid;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.filter-title {
  margin: 0;
  font-size: 0.8rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--ink);
}

.filter-actions {
  display: flex;
  gap: 0.6rem;
  justify-content: flex-end;
}

.btn.small {
  padding: 0.45rem 0.9rem;
  font-size: 0.8rem;
  border-radius: 10px;
}

.table-card {
  background: var(--surface);
  border-radius: 20px;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  display: grid;
}

.table-head,
.table-row {
  display: grid;
  grid-template-columns: 2.4fr 0.7fr 0.9fr 1.3fr 0.9fr 0.8fr;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.5rem;
}

.table-head {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  border-bottom: 1px solid var(--line);
}

.table-row {
  border-bottom: 1px solid var(--line);
}

.table-row:last-child {
  border-bottom: none;
}

.doc-cell {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.doc-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
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
  stroke-width: 1.7;
}

.doc-title {
  margin: 0;
  font-weight: 600;
  color: var(--ink-strong);
}

.doc-size {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.type-cell {
  color: var(--ink);
  font-size: 0.9rem;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.6rem;
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

.status-pill.neutral {
  background: rgba(100, 116, 139, 0.12);
  color: #64748b;
  border-color: rgba(100, 116, 139, 0.35);
}

.recipient-cell,
.date-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ink);
  font-size: 0.9rem;
}

.recipient-cell.placeholder {
  color: var(--muted);
}

.recipient-cell svg,
.date-cell svg {
  width: 16px;
  height: 16px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 1.7;
}

.actions-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--surface-2);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.action-btn svg {
  width: 16px;
  height: 16px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 1.8;
}

.action-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.action-btn:hover svg {
  stroke: currentColor;
}

.menu-wrap {
  position: relative;
}

.row-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: var(--shadow-md);
  padding: 0.4rem;
  min-width: 160px;
  z-index: 10;
  display: grid;
  gap: 0.2rem;
}

.row-menu .menu-item {
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.6rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--ink);
}

.row-menu .menu-item svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
}

.row-menu .menu-item:hover {
  background: var(--surface-2);
}

.row-menu .menu-item.danger {
  color: var(--danger);
}

.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  font-size: 0.85rem;
  color: var(--muted);
}

.pagination {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.page-btn {
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink);
  border-radius: 10px;
  padding: 0.4rem 0.75rem;
  font-size: 0.85rem;
  cursor: pointer;
}

.page-btn.active {
  background: var(--accent);
  color: #ffffff;
  border-color: transparent;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-state {
  padding: 2rem 1.5rem;
  color: var(--muted);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: grid;
  place-items: center;
  z-index: 20;
}

.modal-card {
  width: min(420px, 92vw);
  background: var(--surface);
  border-radius: 18px;
  padding: 1.5rem;
  box-shadow: var(--shadow-lg);
  display: grid;
  gap: 1.2rem;
}

.preview-card {
  width: min(960px, 92vw);
  height: min(80vh, 720px);
  grid-template-rows: auto 1fr auto;
}

.preview-body {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #ffffff;
  overflow: hidden;
  min-height: 60vh;
  position: relative;
}

.preview-body iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.close {
  border: none;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

.modal-title {
  margin: 0;
  font-weight: 600;
  color: var(--ink-strong);
}

.modal-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.modal-grid .label {
  margin: 0;
  font-size: 0.75rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.modal-grid .value {
  margin: 0.25rem 0 0;
  font-weight: 600;
  color: var(--ink);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
}

@media (max-width: 1024px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .filters {
    justify-content: space-between;
  }

  .table-head,
  .table-row {
    grid-template-columns: 2.2fr 0.8fr 1fr 1.2fr 0.9fr 0.8fr;
  }
}

@media (max-width: 900px) {
  .table-head,
  .table-row {
    grid-template-columns: 2fr 0.9fr 1fr 1.1fr 0.9fr;
  }

  .table-head span:nth-child(6),
  .table-row .actions-cell {
    display: none;
  }
}

@media (max-width: 720px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .table-head,
  .table-row {
    grid-template-columns: 1.6fr 0.8fr 1fr;
  }

  .table-head span:nth-child(4),
  .table-head span:nth-child(5),
  .table-row .recipient-cell,
  .table-row .date-cell {
    display: none;
  }

  .table-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
