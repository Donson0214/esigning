<template>
  <div class="received-page">
    <section class="page-header">
      <h2>Received Documents</h2>
      <p>Documents waiting for your signature</p>
    </section>

    <section class="received-list">
      <article v-for="doc in receivedDocuments" :key="doc.id" class="received-card">
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
              <span class="meta-value">{{ doc.from }}</span>
            </span>
            <span class="meta-item">
              <span class="meta-label">Received:</span>
              <span class="meta-value">{{ formatDate(doc.receivedDate) }}</span>
            </span>
            <span class="meta-item due">
              <span class="meta-label">Due:</span>
              <span class="meta-value">{{ formatDate(doc.dueDate) }}</span>
            </span>
          </div>
        </div>
        <div class="card-actions">
          <span :class="['status-pill', statusClass(doc.status)]">{{ doc.status }}</span>
          <button
            v-if="doc.status === 'Pending'"
            class="btn btn-primary sign-btn"
            type="button"
            @click="openSignModal(doc)"
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

    <Teleport to="body">
      <div v-if="modalOpen && activeDoc" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-card">
          <div class="modal-header">
            <div>
              <h3>Sign Document</h3>
              <p>{{ activeDoc.title }}</p>
            </div>
            <button class="close-btn" type="button" @click="closeModal" aria-label="Close">
              x
            </button>
          </div>

          <div class="preview-shell">
            <div class="preview-card">
              <h4>Document Preview</h4>
              <p>
                This is a preview of the document you're about to sign. Please review carefully
                before signing.
              </p>
              <p><strong>Effective Date:</strong> {{ formatDate(activeDoc.receivedDate) }}</p>
              <p><strong>Parties:</strong> {{ activeDoc.from }} and Signee</p>
              <p><strong>Terms:</strong> As outlined in the attached agreement</p>
            </div>
          </div>

          <div class="signature-tabs">
            <button
              type="button"
              :class="['tab-btn', signatureMode === 'draw' && 'active']"
              @click="signatureMode = 'draw'"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 4 6 6-4 4-6-6 4-4Z" />
                <path d="m15 6 3 3" />
                <path d="M10 15 6 19l-4 1 1-4 4-4" />
              </svg>
              Draw Signature
            </button>
            <button
              type="button"
              :class="['tab-btn', signatureMode === 'type' && 'active']"
              @click="signatureMode = 'type'"
            >
              <span class="type-icon">T</span>
              Type Signature
            </button>
          </div>

          <div class="signature-area">
            <div v-if="signatureMode === 'draw'" class="draw-wrap">
              <canvas
                ref="signatureCanvas"
                class="signature-canvas"
                @pointerdown="startDraw"
                @pointermove="draw"
                @pointerup="endDraw"
                @pointerleave="endDraw"
              ></canvas>
              <span v-if="!hasDrawing" class="signature-placeholder">Draw your signature here</span>
            </div>
            <div v-else class="type-wrap">
              <input
                v-model.trim="typedSignature"
                class="type-input"
                type="text"
                placeholder="Type your full name"
                aria-label="Type your signature"
              />
              <div :class="['type-preview', !typedSignature && 'empty']">
                {{ typedSignature || 'Your signature' }}
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="link-btn" type="button" @click="clearSignature">Clear</button>
            <div class="footer-actions">
              <button class="btn btn-outline" type="button" @click="closeModal">Cancel</button>
              <button class="btn btn-primary" type="button" :disabled="!canSign" @click="signDocument">
                <span class="btn-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="m5 4 6 6-4 4-6-6 4-4Z" />
                    <path d="m15 6 3 3" />
                    <path d="M10 15 6 19l-4 1 1-4 4-4" />
                  </svg>
                </span>
                Sign Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

type ReceivedStatus = 'Pending' | 'Viewed' | 'Signed' | 'Expired';

type ReceivedDocument = {
  id: string;
  title: string;
  from: string;
  receivedDate: string;
  dueDate: string;
  status: ReceivedStatus;
};

const receivedDocuments = ref<ReceivedDocument[]>([
  {
    id: 'recv-1',
    title: 'Freelance Agreement - Design Work',
    from: 'Design Agency LLC',
    receivedDate: '2026-01-12',
    dueDate: '2026-01-15',
    status: 'Pending',
  },
  {
    id: 'recv-2',
    title: 'Vendor Contract - Services',
    from: 'ABC Corporation',
    receivedDate: '2026-01-10',
    dueDate: '2026-01-14',
    status: 'Viewed',
  },
  {
    id: 'recv-3',
    title: 'Employee Handbook Acknowledgment',
    from: 'HR Department',
    receivedDate: '2026-01-08',
    dueDate: '2026-01-12',
    status: 'Signed',
  },
  {
    id: 'recv-4',
    title: 'Updated Terms of Service',
    from: 'Legal Team',
    receivedDate: '2026-01-05',
    dueDate: '2026-01-10',
    status: 'Signed',
  },
]);

const modalOpen = ref(false);
const activeDoc = ref<ReceivedDocument | null>(null);
const signatureMode = ref<'draw' | 'type'>('draw');
const typedSignature = ref('');
const hasDrawing = ref(false);
const isDrawing = ref(false);
const signatureCanvas = ref<HTMLCanvasElement | null>(null);
let drawContext: CanvasRenderingContext2D | null = null;

const canSign = computed(() => {
  if (signatureMode.value === 'draw') {
    return hasDrawing.value;
  }
  return typedSignature.value.trim().length > 0;
});

const statusClass = (status: ReceivedStatus) => {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'Viewed':
      return 'info';
    case 'Signed':
      return 'success';
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

const openSignModal = (doc: ReceivedDocument) => {
  activeDoc.value = doc;
  signatureMode.value = 'draw';
  typedSignature.value = '';
  hasDrawing.value = false;
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  activeDoc.value = null;
  typedSignature.value = '';
  hasDrawing.value = false;
  isDrawing.value = false;
  clearCanvas();
};

const signDocument = () => {
  if (!activeDoc.value || !canSign.value) return;
  const doc = receivedDocuments.value.find((item) => item.id === activeDoc.value?.id);
  if (doc) doc.status = 'Signed';
  closeModal();
};

const clearSignature = () => {
  if (signatureMode.value === 'draw') {
    clearCanvas();
    hasDrawing.value = false;
  } else {
    typedSignature.value = '';
  }
};

const getInkColor = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--ink-strong').trim() || '#0f172a';

const resizeCanvas = () => {
  if (!signatureCanvas.value) return;
  const canvas = signatureCanvas.value;
  const ratio = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(width * ratio));
  canvas.height = Math.max(1, Math.floor(height * ratio));
  drawContext = canvas.getContext('2d');
  if (!drawContext) return;
  drawContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  drawContext.lineWidth = 2.2;
  drawContext.lineCap = 'round';
  drawContext.lineJoin = 'round';
  drawContext.strokeStyle = getInkColor();
};

const clearCanvas = () => {
  if (!signatureCanvas.value || !drawContext) return;
  const canvas = signatureCanvas.value;
  drawContext.clearRect(0, 0, canvas.width, canvas.height);
};

const startDraw = (event: PointerEvent) => {
  if (signatureMode.value !== 'draw' || !signatureCanvas.value || !drawContext) return;
  isDrawing.value = true;
  drawContext.strokeStyle = getInkColor();
  signatureCanvas.value.setPointerCapture(event.pointerId);
  const rect = signatureCanvas.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  drawContext.beginPath();
  drawContext.moveTo(x, y);
};

const draw = (event: PointerEvent) => {
  if (!isDrawing.value || signatureMode.value !== 'draw' || !signatureCanvas.value || !drawContext) return;
  const rect = signatureCanvas.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  drawContext.lineTo(x, y);
  drawContext.stroke();
  hasDrawing.value = true;
};

const endDraw = (event?: PointerEvent) => {
  if (!isDrawing.value || !drawContext) return;
  drawContext.closePath();
  isDrawing.value = false;
  if (event && signatureCanvas.value?.hasPointerCapture(event.pointerId)) {
    signatureCanvas.value.releasePointerCapture(event.pointerId);
  }
};

watch(modalOpen, (value) => {
  if (value) {
    requestAnimationFrame(() => {
      resizeCanvas();
    });
  }
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

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: grid;
  place-items: center;
  z-index: 40;
  padding: 1.5rem;
}

.modal-card {
  width: min(860px, 96vw);
  background: var(--surface);
  border-radius: 22px;
  box-shadow: var(--shadow-lg);
  padding: 1.6rem;
  display: grid;
  gap: 1.4rem;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--ink-strong);
}

.modal-header p {
  margin: 0.2rem 0 0;
  color: var(--muted);
}

.close-btn {
  border: none;
  background: transparent;
  font-size: 1.4rem;
  color: var(--muted);
  cursor: pointer;
}

.preview-shell {
  border: 2px dashed var(--line);
  border-radius: 20px;
  padding: 1.2rem;
  background: var(--surface);
}

.preview-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 1.2rem;
  box-shadow: var(--shadow-md);
}

.preview-card h4 {
  margin: 0 0 0.4rem;
  color: var(--ink-strong);
}

.preview-card p {
  margin: 0.35rem 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.signature-tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.tab-btn {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
  padding: 0.8rem 1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  color: var(--ink);
}

.tab-btn svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
}

.tab-btn.active {
  border-color: var(--accent);
  background: rgba(79, 70, 229, 0.08);
  color: var(--accent);
}

.type-icon {
  font-weight: 700;
  font-size: 1rem;
}

.signature-area {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem;
  background: var(--surface);
  min-height: 220px;
  position: relative;
}

.draw-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.signature-canvas {
  width: 100%;
  height: 200px;
  display: block;
  border-radius: 14px;
  background: var(--surface-2);
  border: 1px solid var(--line);
  touch-action: none;
}

.signature-placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--muted);
  font-size: 0.9rem;
  pointer-events: none;
}

.type-wrap {
  display: grid;
  gap: 0.8rem;
}

.type-input {
  width: 100%;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--line);
  padding: 0 1rem;
  background: var(--surface);
}

.type-preview {
  height: 120px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: var(--surface-2);
  display: grid;
  place-items: center;
  font-size: 2rem;
  color: var(--ink-strong);
  font-family: 'Fraunces', 'Segoe Script', 'Brush Script MT', serif;
}

.type-preview.empty {
  color: var(--muted);
  font-size: 1rem;
  font-family: var(--font-sans);
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.link-btn {
  border: none;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-weight: 600;
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

@media (max-width: 900px) {
  .received-card {
    grid-template-columns: auto 1fr;
  }

  .card-actions {
    justify-self: start;
  }
}

@media (max-width: 720px) {
  .signature-tabs {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
