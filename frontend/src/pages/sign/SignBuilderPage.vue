<template>
  <div class="sign-builder">
    <header class="builder-topbar">
      <div class="left-actions">
        <button class="btn btn-outline" type="button" @click="goBack">Back</button>
        <div class="doc-select">
          <select v-model="selectedDocId" @change="handleDocChange">
            <option value="">Select document</option>
            <option v-for="doc in documents" :key="doc.id" :value="doc.id">
              {{ doc.title }}
            </option>
          </select>
          <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <label class="upload-btn">
          <input type="file" accept="application/pdf" @change="handleUpload" />
          Upload PDF
        </label>
      </div>
      <div class="right-actions">
        <div class="status-pill" :class="statusClass">
          {{ doc?.status ?? 'No document' }}
        </div>
        <button class="btn btn-outline" type="button" @click="saveDraft" :disabled="!doc">Save</button>
        <button class="btn btn-outline" type="button" disabled>Detect fields</button>
        <button class="btn btn-primary" type="button" @click="sendForSigning" :disabled="!doc">
          Send
        </button>
      </div>
    </header>

    <div class="builder-body">
      <aside class="left-panel">
        <div class="panel-title">Pages</div>
        <div class="thumb-list">
          <button
            v-for="page in pageCount"
            :key="page"
            class="thumb-card"
            type="button"
            @click="scrollToPage(page)"
          >
            <canvas :ref="setThumbRef(page)" class="thumb-canvas"></canvas>
            <span>Page {{ page }}</span>
          </button>
        </div>
      </aside>

      <section class="center-panel">
        <div class="viewer-toolbar">
          <button class="icon-btn" type="button" @click="zoomOut">-</button>
          <span>{{ Math.round(scale * 100) }}%</span>
          <button class="icon-btn" type="button" @click="zoomIn">+</button>
        </div>
        <div class="viewer" ref="viewerRef">
          <div v-if="pdfError" class="pdf-error">
            <p>{{ pdfError }}</p>
            <a v-if="doc?.fileUrl" :href="doc.fileUrl" target="_blank" rel="noreferrer">
              Open PDF in new tab
            </a>
          </div>
          <div
            v-for="page in pageCount"
            :key="page"
            class="page-wrap"
            :ref="setPageRef(page)"
            @dragover.prevent
            @drop="handleDrop($event, page)"
            @click="handlePageClick($event, page)"
          >
            <canvas :ref="setCanvasRef(page)" class="pdf-canvas"></canvas>
            <div class="overlay">
              <div
                v-for="field in fieldsByPage(page)"
                :key="field.id"
                class="field"
                :class="[field.type.toLowerCase(), activeFieldId === field.id ? 'active' : '']"
                :style="fieldStyle(field, page)"
                @pointerdown="startDrag($event, field, page)"
                @click.stop="selectField(field.id)"
              >
                <span class="field-label">{{ field.label || field.type.replace('_', ' ') }}</span>
                <span v-if="field.value" class="field-value">{{ field.value }}</span>
                <span class="resize-handle" @pointerdown.stop="startResize($event, field, page)"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside class="right-panel">
        <div class="panel-section">
          <div class="panel-title">Signers</div>
          <div class="signer-list">
            <div v-for="signer in signerInputs" :key="signer.email" class="signer-row">
              <div>
                <p class="signer-name">{{ signer.name || signer.email }}</p>
                <p class="signer-email">{{ signer.email }}</p>
              </div>
              <button class="icon-btn" type="button" @click="removeSigner(signer.email)">x</button>
            </div>
          </div>
          <div class="signer-form">
            <input v-model="newSignerName" class="input" type="text" placeholder="Signer name" />
            <input v-model="newSignerEmail" class="input" type="email" placeholder="Signer email" />
            <button class="btn btn-outline" type="button" @click="addSigner">Add signer</button>
          </div>
        </div>

        <div class="panel-section">
          <div class="panel-title">Field palette</div>
          <div class="palette">
            <button
              v-for="field in fieldPalette"
              :key="field.type"
              class="palette-item"
              type="button"
              draggable="true"
              @dragstart="startPaletteDrag(field.type)"
              @click="setActivePalette(field.type)"
            >
              <span class="palette-label">{{ field.label }}</span>
            </button>
          </div>
          <p class="helper">Drag a field onto the PDF or click to place.</p>
        </div>

        <div class="panel-section" v-if="activeField">
          <div class="panel-title">Field settings</div>
          <label class="field-label">
            Label
            <input v-model="activeFieldDraft.label" class="input" type="text" @change="persistActiveField" />
          </label>
          <label class="field-label">
            Placeholder
            <input v-model="activeFieldDraft.placeholder" class="input" type="text" @change="persistActiveField" />
          </label>
          <label class="field-label">
            Assigned signer
            <select v-model="activeFieldDraft.signerEmail" @change="persistActiveField">
              <option value="">Unassigned</option>
              <option v-for="signer in signerInputs" :key="signer.email" :value="signer.email">
                {{ signer.name || signer.email }}
              </option>
            </select>
          </label>
          <label class="toggle">
            <input v-model="activeFieldDraft.required" type="checkbox" @change="persistActiveField" />
            Required
          </label>
          <button class="btn btn-outline danger" type="button" @click="deleteActiveField">
            Delete field
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from 'pdfjs-dist';
import { useDocuments } from '@/features/documents/composables';
import { createField, deleteField, getDocument as fetchDocument, sendDocument, updateField, uploadDocument } from '@/features/documents/api';
import type { Document, DocumentField } from '@/features/documents/types';

GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

type SignerInput = { name?: string; email: string };

const router = useRouter();
const { documents, refresh } = useDocuments();

const selectedDocId = ref('');
const doc = ref<Document | null>(null);
const fields = ref<DocumentField[]>([]);
const signerInputs = ref<SignerInput[]>([]);
const newSignerName = ref('');
const newSignerEmail = ref('');

const pdfDoc = ref<PDFDocumentProxy | null>(null);
const scale = ref(1);
const pageCount = ref(0);
const pageSizes = ref<Record<number, { width: number; height: number }>>({});
const viewerRef = ref<HTMLDivElement | null>(null);
const pageRefs = new Map<number, HTMLDivElement>();
const canvasRefs = new Map<number, HTMLCanvasElement>();
const thumbRefs = new Map<number, HTMLCanvasElement>();

const activeFieldId = ref<string | null>(null);
const activeFieldDraft = reactive({
  label: '',
  placeholder: '',
  signerEmail: '',
  required: true,
});

const pdfError = ref('');
const pdfLoadToken = ref(0);

const draggingPaletteType = ref<DocumentField['type'] | null>(null);
const activePaletteType = ref<DocumentField['type'] | null>(null);

const dragState = ref<{
  fieldId: string;
  page: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  mode: 'move' | 'resize';
} | null>(null);

const fieldPalette = [
  { type: 'SIGNATURE', label: 'Signature' },
  { type: 'INITIAL', label: 'Initial' },
  { type: 'FULL_NAME', label: 'Full Name' },
  { type: 'EMAIL', label: 'Email' },
  { type: 'DATE', label: 'Date' },
  { type: 'TEXT', label: 'Text' },
  { type: 'CHECKBOX', label: 'Checkbox' },
  { type: 'DROPDOWN', label: 'Dropdown' },
  { type: 'RADIO', label: 'Radio' },
  { type: 'COMPANY', label: 'Company' },
  { type: 'JOB_TITLE', label: 'Job Title' },
  { type: 'IMAGE', label: 'Image' },
  { type: 'ATTACHMENT', label: 'Attachment' },
] as const;

const statusClass = computed(() => {
  const status = doc.value?.status;
  if (!status) return 'neutral';
  if (status === 'COMPLETED') return 'success';
  if (status === 'SIGNED' || status === 'IN_PROGRESS') return 'warning';
  if (status === 'DECLINED' || status === 'EXPIRED') return 'danger';
  return 'neutral';
});

const goBack = () => router.push('/app/documents');

const setPageRef = (page: number) => (el: HTMLDivElement | null) => {
  if (el) pageRefs.set(page, el);
};

const setCanvasRef = (page: number) => (el: HTMLCanvasElement | null) => {
  if (el) canvasRefs.set(page, el);
};

const setThumbRef = (page: number) => (el: HTMLCanvasElement | null) => {
  if (el) thumbRefs.set(page, el);
};

const fieldsByPage = (page: number) => fields.value.filter((field) => field.page === page);

const fieldStyle = (field: DocumentField, page: number) => {
  const size = pageSizes.value[page];
  if (!size) return {};
  const top = (size.height - field.y - field.height) * scale.value;
  const left = field.x * scale.value;
  return {
    top: `${top}px`,
    left: `${left}px`,
    width: `${field.width * scale.value}px`,
    height: `${field.height * scale.value}px`,
  };
};

const selectField = (id: string) => {
  activeFieldId.value = id;
  const field = fields.value.find((item) => item.id === id);
  if (!field) return;
  activeFieldDraft.label = field.label || '';
  activeFieldDraft.placeholder = field.placeholder || '';
  activeFieldDraft.signerEmail = field.signerEmail || '';
  activeFieldDraft.required = field.required ?? true;
};

const activeField = computed(() => fields.value.find((field) => field.id === activeFieldId.value));

const persistActiveField = async () => {
  const field = activeField.value;
  if (!doc.value || !field) return;
  const updated = {
    label: activeFieldDraft.label,
    placeholder: activeFieldDraft.placeholder,
    signerEmail: activeFieldDraft.signerEmail || undefined,
    required: activeFieldDraft.required,
  };
  try {
    const result = await updateField(doc.value.id, field.id, updated);
    fields.value = fields.value.map((item) => (item.id === field.id ? { ...item, ...result } : item));
  } catch {
    // ignore update errors
  }
};

const deleteActiveField = async () => {
  const field = activeField.value;
  if (!doc.value || !field) return;
  await deleteField(doc.value.id, field.id);
  fields.value = fields.value.filter((item) => item.id !== field.id);
  activeFieldId.value = null;
};

const addSigner = () => {
  const email = newSignerEmail.value.trim().toLowerCase();
  if (!email) return;
  if (signerInputs.value.some((signer) => signer.email === email)) {
    newSignerEmail.value = '';
    return;
  }
  signerInputs.value = [
    ...signerInputs.value,
    { name: newSignerName.value.trim() || undefined, email },
  ];
  newSignerName.value = '';
  newSignerEmail.value = '';
};

const removeSigner = (email: string) => {
  signerInputs.value = signerInputs.value.filter((signer) => signer.email !== email);
};

const handleUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const title = file.name.replace(/\.pdf$/i, '');
  const created = await uploadDocument({ title, file });
  selectedDocId.value = created.id;
  await loadDocument(created.id);
  input.value = '';
};

const handleDocChange = async () => {
  if (!selectedDocId.value) return;
  await loadDocument(selectedDocId.value);
};

const loadDocument = async (documentId: string) => {
  const data = await fetchDocument(documentId);
  doc.value = data;
  fields.value = data.fields ?? [];
  signerInputs.value =
    data.signers?.map((signer) => ({ name: signer.name ?? undefined, email: signer.email })) ?? [];
  await loadPdf(data.fileUrl);
};

const loadPdf = async (url: string) => {
  const token = pdfLoadToken.value + 1;
  pdfLoadToken.value = token;
  pdfError.value = '';
  try {
    const pdf = await getDocument(url).promise;
    if (token !== pdfLoadToken.value) return;
    pdfDoc.value?.destroy();
    pdfDoc.value = pdf;
    pageCount.value = pdf.numPages;
    pageSizes.value = {};
    await renderAllPages(token);
    await renderThumbnails(token);
  } catch (err) {
    if (token !== pdfLoadToken.value) return;
    pdfDoc.value?.destroy();
    pdfDoc.value = null;
    pageCount.value = 0;
    pageSizes.value = {};
    pdfError.value = 'Unable to load the PDF preview. Please check access permissions.';
  }
};

const renderAllPages = async (token = pdfLoadToken.value) => {
  const pdf = pdfDoc.value;
  if (!pdf) return;
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    if (token !== pdfLoadToken.value) return;
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    pageSizes.value = { ...pageSizes.value, [pageNumber]: { width: viewport.width, height: viewport.height } };
    const canvas = canvasRefs.get(pageNumber);
    if (!canvas) continue;
    const renderViewport = page.getViewport({ scale: scale.value });
    canvas.width = renderViewport.width;
    canvas.height = renderViewport.height;
    const context = canvas.getContext('2d');
    if (!context) continue;
    await page.render({ canvasContext: context, viewport: renderViewport }).promise;
  }
};

const renderThumbnails = async (token = pdfLoadToken.value) => {
  const pdf = pdfDoc.value;
  if (!pdf) return;
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    if (token !== pdfLoadToken.value) return;
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 0.2 });
    const canvas = thumbRefs.get(pageNumber);
    if (!canvas) continue;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext('2d');
    if (!context) continue;
    await page.render({ canvasContext: context, viewport }).promise;
  }
};

const zoomIn = async () => {
  scale.value = Math.min(2, scale.value + 0.1);
  await renderAllPages();
};

const zoomOut = async () => {
  scale.value = Math.max(0.6, scale.value - 0.1);
  await renderAllPages();
};

const scrollToPage = (page: number) => {
  const target = pageRefs.get(page);
  if (!target || !viewerRef.value) return;
  viewerRef.value.scrollTo({ top: target.offsetTop - 12, behavior: 'smooth' });
};

const startPaletteDrag = (type: DocumentField['type']) => {
  draggingPaletteType.value = type;
};

const setActivePalette = (type: DocumentField['type']) => {
  activePaletteType.value = type;
};

const handleDrop = async (event: DragEvent, page: number) => {
  const type = draggingPaletteType.value;
  if (!type || !doc.value) return;
  await createFieldAtPosition(type, event.clientX, event.clientY, page);
  draggingPaletteType.value = null;
};

const handlePageClick = async (event: MouseEvent, page: number) => {
  if (!activePaletteType.value || !doc.value) return;
  await createFieldAtPosition(activePaletteType.value, event.clientX, event.clientY, page);
  activePaletteType.value = null;
};

const createFieldAtPosition = async (type: DocumentField['type'], clientX: number, clientY: number, page: number) => {
  if (!doc.value) return;
  const pageEl = pageRefs.get(page);
  const size = pageSizes.value[page];
  if (!pageEl || !size) return;
  const rect = pageEl.getBoundingClientRect();
  const x = Math.max(0, clientX - rect.left);
  const y = Math.max(0, clientY - rect.top);
  const defaults = getDefaultFieldSize(type);
  const pdfX = x / scale.value;
  const pdfY = size.height - y / scale.value - defaults.height;
  const payload = {
    type,
    page,
    x: pdfX,
    y: Math.max(0, pdfY),
    width: defaults.width,
    height: defaults.height,
    required: true,
    signerEmail: signerInputs.value[0]?.email,
  };
  const tempId = `temp-${Date.now()}`;
  const optimisticField: DocumentField = {
    id: tempId,
    ...payload,
    status: 'EMPTY',
  };
  fields.value = [...fields.value, optimisticField];
  const created = await createField(doc.value.id, payload);
  fields.value = fields.value.map((field) => (field.id === tempId ? { ...field, ...created } : field));
};

const startDrag = (event: PointerEvent, field: DocumentField, page: number) => {
  const pageEl = pageRefs.get(page);
  const size = pageSizes.value[page];
  if (!pageEl || !size) return;
  const rect = pageEl.getBoundingClientRect();
  const left = field.x * scale.value;
  const top = (size.height - field.y - field.height) * scale.value;
  dragState.value = {
    fieldId: field.id,
    page,
    startX: event.clientX,
    startY: event.clientY,
    originX: left,
    originY: top,
    mode: 'move',
  };
  (event.target as HTMLElement).setPointerCapture(event.pointerId);
};

const startResize = (event: PointerEvent, field: DocumentField, page: number) => {
  dragState.value = {
    fieldId: field.id,
    page,
    startX: event.clientX,
    startY: event.clientY,
    originX: field.width,
    originY: field.height,
    mode: 'resize',
  };
  (event.target as HTMLElement).setPointerCapture(event.pointerId);
};

const handlePointerMove = async (event: PointerEvent) => {
  const state = dragState.value;
  if (!state) return;
  const field = fields.value.find((item) => item.id === state.fieldId);
  const size = pageSizes.value[state.page];
  const pageEl = pageRefs.get(state.page);
  if (!field || !size || !pageEl) return;
  if (state.mode === 'move') {
    const deltaX = event.clientX - state.startX;
    const deltaY = event.clientY - state.startY;
    const nextLeft = Math.max(0, state.originX + deltaX);
    const nextTop = Math.max(0, state.originY + deltaY);
    const pdfX = Math.min(size.width - field.width, nextLeft / scale.value);
    const pdfY = Math.min(size.height - field.height, size.height - nextTop / scale.value - field.height);
    fields.value = fields.value.map((item) =>
      item.id === field.id ? { ...item, x: pdfX, y: Math.max(0, pdfY) } : item,
    );
  } else {
    const deltaX = event.clientX - state.startX;
    const deltaY = event.clientY - state.startY;
    const nextWidth = Math.max(40, state.originX + deltaX / scale.value);
    const nextHeight = Math.max(20, state.originY + deltaY / scale.value);
    fields.value = fields.value.map((item) =>
      item.id === field.id ? { ...item, width: nextWidth, height: nextHeight } : item,
    );
  }
};

const handlePointerUp = async () => {
  const state = dragState.value;
  if (!state || !doc.value) return;
  const field = fields.value.find((item) => item.id === state.fieldId);
  dragState.value = null;
  if (!field) return;
  await updateField(doc.value.id, field.id, {
    x: field.x,
    y: field.y,
    width: field.width,
    height: field.height,
  });
};

const getDefaultFieldSize = (type: DocumentField['type']) => {
  switch (type) {
    case 'SIGNATURE':
      return { width: 160, height: 50 };
    case 'INITIAL':
      return { width: 90, height: 40 };
    case 'CHECKBOX':
      return { width: 22, height: 22 };
    case 'DATE':
      return { width: 90, height: 26 };
    case 'IMAGE':
      return { width: 140, height: 90 };
    case 'ATTACHMENT':
      return { width: 120, height: 32 };
    default:
      return { width: 140, height: 32 };
  }
};

const saveDraft = async () => {
  if (!doc.value) return;
  await loadDocument(doc.value.id);
};

const sendForSigning = async () => {
  if (!doc.value || signerInputs.value.length === 0) return;
  await sendDocument(doc.value.id, {
    signers: signerInputs.value.map((signer, index) => ({
      email: signer.email,
      name: signer.name,
      order: index + 1,
    })),
  });
  await loadDocument(doc.value.id);
};

watch(scale, () => {
  void renderAllPages();
});

onMounted(async () => {
  window.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('pointerup', handlePointerUp);
  await refresh();
});

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointerMove);
  window.removeEventListener('pointerup', handlePointerUp);
  pdfLoadToken.value += 1;
  pdfDoc.value?.destroy();
  pdfDoc.value = null;
});
</script>

<style scoped>
.sign-builder {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.builder-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 0.9rem 1rem;
  box-shadow: var(--shadow-md);
}

.left-actions,
.right-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.doc-select {
  position: relative;
}

.doc-select select {
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--line);
  padding: 0 2rem 0 0.9rem;
}

.doc-select .chev {
  position: absolute;
  right: 0.7rem;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 2;
  pointer-events: none;
}

.upload-btn {
  border: 1px dashed var(--line);
  border-radius: 12px;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  font-weight: 600;
}

.upload-btn input {
  display: none;
}

.status-pill {
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  border: 1px solid transparent;
}

.status-pill.success {
  background: rgba(22, 163, 74, 0.12);
  color: var(--success);
}

.status-pill.warning {
  background: rgba(245, 158, 11, 0.14);
  color: var(--warning);
}

.status-pill.danger {
  background: rgba(239, 68, 68, 0.14);
  color: var(--danger);
}

.status-pill.neutral {
  background: rgba(100, 116, 139, 0.12);
  color: var(--muted);
}

.builder-body {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 280px;
  gap: 1rem;
  min-height: 70vh;
}

.left-panel,
.right-panel {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem;
  box-shadow: var(--shadow-md);
  display: grid;
  gap: 1rem;
  align-content: start;
}

.center-panel {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem;
  box-shadow: var(--shadow-md);
  display: grid;
  grid-template-rows: auto 1fr;
}

.panel-title {
  font-weight: 700;
  color: var(--ink-strong);
}

.thumb-list {
  display: grid;
  gap: 0.8rem;
}

.thumb-card {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0.5rem;
  background: var(--surface-2);
  display: grid;
  gap: 0.4rem;
  text-align: left;
}

.thumb-canvas {
  width: 100%;
  border-radius: 8px;
  background: #fff;
}

.viewer-toolbar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.viewer {
  overflow: auto;
  max-height: calc(100vh - 220px);
  padding: 0.5rem;
  background: var(--surface-2);
  border-radius: 16px;
}

.pdf-error {
  display: grid;
  gap: 0.6rem;
  padding: 1.2rem;
  border: 1px dashed var(--line);
  border-radius: 12px;
  background: var(--surface);
  color: var(--muted);
  margin-bottom: 1rem;
}

.pdf-error a {
  color: var(--accent);
  font-weight: 600;
}

.page-wrap {
  position: relative;
  margin-bottom: 1.5rem;
  display: inline-block;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
}

.pdf-canvas {
  display: block;
  border-radius: 10px;
}

.overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.field {
  position: absolute;
  border: 2px dashed var(--accent);
  border-radius: 6px;
  background: rgba(51, 92, 255, 0.08);
  pointer-events: auto;
  padding: 0.2rem 0.3rem;
  font-size: 0.75rem;
  display: grid;
  gap: 0.2rem;
}

.field.active {
  border-color: var(--accent-strong);
  background: rgba(51, 92, 255, 0.16);
}

.field-label {
  font-weight: 600;
  color: var(--ink-strong);
}

.field-value {
  color: var(--muted);
  font-size: 0.7rem;
}

.resize-handle {
  position: absolute;
  right: -6px;
  bottom: -6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  cursor: se-resize;
}

.panel-section {
  display: grid;
  gap: 0.7rem;
}

.signer-list {
  display: grid;
  gap: 0.6rem;
}

.signer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0.6rem;
}

.signer-name {
  margin: 0;
  font-weight: 600;
  color: var(--ink-strong);
}

.signer-email {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.signer-form {
  display: grid;
  gap: 0.5rem;
}

.palette {
  display: grid;
  gap: 0.5rem;
}

.palette-item {
  border: 1px dashed var(--line);
  border-radius: 10px;
  padding: 0.5rem 0.6rem;
  background: var(--surface-2);
  text-align: left;
  cursor: grab;
}

.palette-item:active {
  cursor: grabbing;
}

.palette-label {
  font-weight: 600;
  color: var(--ink-strong);
}

.helper {
  font-size: 0.75rem;
  color: var(--muted);
  margin: 0;
}

.field-label select,
.field-label .input {
  width: 100%;
  margin-top: 0.3rem;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
}

.danger {
  color: var(--danger);
}

@media (max-width: 1200px) {
  .builder-body {
    grid-template-columns: 1fr;
  }

  .left-panel,
  .right-panel {
    order: 1;
  }
}
</style>
