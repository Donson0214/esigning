<template>
  <div class="sign-page">
    <section class="page-header">
      <h2>Sign Document</h2>
      <p v-if="doc">{{ doc.title }}</p>
      <p v-else class="muted">Loading document...</p>
    </section>

    <section v-if="doc" class="doc-card">
      <div class="doc-row">
        <span>Status</span>
        <strong>{{ doc.status }}</strong>
      </div>
      <div class="doc-row">
        <span>Signer</span>
        <strong>{{ signer?.email }}</strong>
      </div>
      <div class="doc-row">
        <span>File</span>
        <a :href="doc.fileUrl" target="_blank" rel="noreferrer">Preview</a>
      </div>
    </section>

    <section v-if="doc" class="sign-body">
      <div class="viewer-card">
        <div class="viewer-toolbar">
          <div class="zoom-controls">
            <button class="icon-btn" type="button" @click="zoomOut">-</button>
            <span>{{ Math.round(scale * 100) }}%</span>
            <button class="icon-btn" type="button" @click="zoomIn">+</button>
          </div>
          <div class="status-meta">
            <span class="status-pill" :class="missingSignatureCount ? 'warning' : 'success'">
              {{ missingSignatureCount }} signature{{ missingSignatureCount === 1 ? '' : 's' }} left
            </span>
          </div>
        </div>
        <div class="viewer" ref="viewerRef">
          <div v-if="pdfError" class="pdf-error">
            <p>{{ pdfError }}</p>
            <a v-if="doc.fileUrl" :href="doc.fileUrl" target="_blank" rel="noreferrer">Open PDF in new tab</a>
          </div>
          <div
            v-for="page in pageCount"
            :key="page"
            class="page-wrap"
            :ref="setPageRef(page)"
            @dragover.prevent
            @drop="handleDrop($event, page)"
          >
            <canvas :ref="setCanvasRef(page)" class="pdf-canvas"></canvas>
            <div class="overlay">
              <div
                v-for="field in fieldsByPage(page)"
                :key="field.id"
                class="field"
                :class="fieldClass(field)"
                :style="fieldStyle(field, page)"
                @click.stop="handleFieldClick(field)"
              >
                <span class="field-label">{{ fieldLabel(field) }}</span>
                <div v-if="placements[field.id]" class="signature-render">
                  <img
                    v-if="placements[field.id].signature.dataUrl"
                    :src="placements[field.id].signature.dataUrl"
                    alt="Signature"
                  />
                  <span v-else class="signature-text" :style="signatureTextStyle(field)">
                    {{ placements[field.id].signature.text }}
                  </span>
                </div>
                <button
                  v-if="placements[field.id]"
                  class="field-clear"
                  type="button"
                  @click.stop="clearPlacement(field.id)"
                >
                  x
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside class="signature-panel">
        <div class="signature-card">
          <div class="signature-tabs">
            <button
              type="button"
              :class="['tab-btn', signatureMode === 'draw' && 'active']"
              @click="signatureMode = 'draw'"
            >
              Draw Signature
            </button>
            <button
              type="button"
              :class="['tab-btn', signatureMode === 'type' && 'active']"
              @click="signatureMode = 'type'"
            >
              Type Signature
            </button>
            <button
              type="button"
              :class="['tab-btn', signatureMode === 'upload' && 'active']"
              @click="signatureMode = 'upload'"
            >
              Upload Image
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
            <div v-else-if="signatureMode === 'type'" class="type-wrap">
              <input
                v-model.trim="typedSignature"
                class="type-input"
                type="text"
                placeholder="Type your full name"
              />
              <div :class="['type-preview', !typedSignature && 'empty']" :style="{ fontFamily: signatureFont }">
                {{ typedSignature || 'Your signature' }}
              </div>
            </div>
            <div v-else class="upload-wrap">
              <label class="upload-btn">
                <input type="file" accept="image/*" @change="handleSignatureUpload" />
                Upload signature image
              </label>
              <div v-if="signatureImage" class="upload-preview">
                <img :src="signatureImage" alt="Uploaded signature" />
              </div>
            </div>
          </div>

          <div class="signature-palette">
            <div
              class="signature-chip"
              :class="!activeSignature && 'disabled'"
              :draggable="Boolean(activeSignature)"
              @dragstart="startSignatureDrag"
              @dragend="endSignatureDrag"
            >
              <img v-if="activeSignature?.dataUrl" :src="activeSignature.dataUrl" alt="Signature" />
              <span v-else>{{ activeSignature?.text || 'Signature' }}</span>
            </div>
            <p class="helper">Drag your signature onto a signature field or click a field to place it.</p>
          </div>

          <div class="signature-actions">
            <button class="link-btn" type="button" @click="clearSignature">Clear signature</button>
            <div class="action-buttons">
              <button class="btn btn-outline" type="button" @click="clearPlacements" :disabled="!placementCount">
                Clear placements
              </button>
              <button class="btn btn-primary" type="button" :disabled="!canSign" @click="signDocument">
                Sign Document
              </button>
            </div>
          </div>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
      </aside>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from 'pdfjs-dist';
import { createId } from '@/shared/lib/ids';
import { OptimisticManager } from '@/shared/lib/optimistic';
import {
  applySignature,
  createSigningSession,
  submitManifest,
  uploadSignature,
  viewSigningSession,
  type SigningSessionView,
} from '@/features/signing/api';

GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

type SignDocState = {
  id: string;
  title: string;
  status: string;
  fileUrl: string;
  version: number;
};

type NormalizedRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type SignaturePayload = {
  type: 'DRAWN' | 'TYPED' | 'UPLOADED';
  dataUrl?: string;
  text?: string;
  font?: string;
  path?: string;
  viewBox?: string;
};

type SignaturePlacement = {
  fieldId: string;
  page: number;
  normalized: NormalizedRect;
  signature: SignaturePayload;
};

const signatureFont = 'Helvetica, Arial, sans-serif';

const route = useRoute();
const token = computed(() => String(route.params.token ?? ''));
const sessionView = ref<SigningSessionView | null>(null);
const doc = ref<SignDocState | null>(null);
const signer = ref<SigningSessionView['signer'] | null>(null);
const fields = ref<SigningSessionView['fields']>([]);
const errorMessage = ref('');

const pdfDoc = ref<PDFDocumentProxy | null>(null);
const scale = ref(1);
const pageCount = ref(0);
const pageSizes = ref<Record<number, { width: number; height: number }>>({});
const viewerRef = ref<HTMLDivElement | null>(null);
const pageRefs = new Map<number, HTMLDivElement>();
const canvasRefs = new Map<number, HTMLCanvasElement>();
const pdfError = ref('');
const pdfLoadToken = ref(0);

const signatureMode = ref<'draw' | 'type' | 'upload'>('draw');
const typedSignature = ref('');
const signatureImage = ref('');
const hasDrawing = ref(false);
const isDrawing = ref(false);
const signatureCanvas = ref<HTMLCanvasElement | null>(null);
const signatureStrokes = ref<Array<Array<{ x: number; y: number }>>>([]);
const drawnSignature = ref('');
const signatureVector = ref<{ path: string; viewBox: string } | null>(null);
let drawContext: CanvasRenderingContext2D | null = null;
let activeStroke: Array<{ x: number; y: number }> | null = null;

const placements = ref<Record<string, SignaturePlacement>>({});
const draggingSignature = ref<SignaturePayload | null>(null);

const optimisticManager = new OptimisticManager<SignDocState>();

const placementStorageKey = computed(() =>
  token.value ? `esigning:signature-placements:${token.value}` : '',
);

const isSignatureField = (field: SigningSessionView['fields'][number]) =>
  field.type === 'SIGNATURE' || field.type === 'INITIAL';

const signatureFields = computed(() => fields.value.filter(isSignatureField));
const missingSignatureCount = computed(
  () => signatureFields.value.filter((field) => !placements.value[field.id]).length,
);
const placementCount = computed(() => Object.keys(placements.value).length);

const activeSignature = computed<SignaturePayload | null>(() => {
  if (signatureMode.value === 'draw') {
    if (!drawnSignature.value) return null;
    return {
      type: 'DRAWN',
      dataUrl: drawnSignature.value,
      path: signatureVector.value?.path,
      viewBox: signatureVector.value?.viewBox,
    };
  }
  if (signatureMode.value === 'upload') {
    if (!signatureImage.value) return null;
    return { type: 'UPLOADED', dataUrl: signatureImage.value };
  }
  const text = typedSignature.value.trim();
  if (!text) return null;
  return { type: 'TYPED', text, font: signatureFont };
});

const canSign = computed(() => {
  if (!doc.value || !sessionView.value) return false;
  if (!activeSignature.value) return false;
  return missingSignatureCount.value === 0;
});

const fieldsByPage = (page: number) => fields.value.filter((field) => field.page === page);

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const parseNormalizedRect = (value: unknown) => {
  if (!value || typeof value !== 'object') return null;
  const normalized = value as { x?: unknown; y?: unknown; width?: unknown; height?: unknown };
  if (
    ![normalized.x, normalized.y, normalized.width, normalized.height].every(
      (item) => typeof item === 'number' && Number.isFinite(item),
    )
  ) {
    return null;
  }
  const rect = {
    x: normalized.x as number,
    y: normalized.y as number,
    width: normalized.width as number,
    height: normalized.height as number,
  };
  if (rect.x < 0 || rect.y < 0 || rect.width <= 0 || rect.height <= 0) return null;
  return rect;
};

const computeNormalizedRect = (
  field: SigningSessionView['fields'][number],
  size: { width: number; height: number },
) => {
  const safeWidth = size.width || 1;
  const safeHeight = size.height || 1;
  return {
    x: clamp01(field.x / safeWidth),
    y: clamp01((safeHeight - field.y - field.height) / safeHeight),
    width: clamp01(field.width / safeWidth),
    height: clamp01(field.height / safeHeight),
  };
};

const resolveNormalizedRect = (
  field: SigningSessionView['fields'][number],
  size: { width: number; height: number },
) => {
  const normalizedFromOptions = parseNormalizedRect((field.options as { normalized?: unknown } | null)?.normalized);
  return normalizedFromOptions ?? computeNormalizedRect(field, size);
};

const fieldStyle = (field: SigningSessionView['fields'][number], page: number) => {
  const size = pageSizes.value[page];
  if (!size) return {};
  const normalized = resolveNormalizedRect(field, size);
  const width = size.width * scale.value;
  const height = size.height * scale.value;
  return {
    top: `${normalized.y * height}px`,
    left: `${normalized.x * width}px`,
    width: `${normalized.width * width}px`,
    height: `${normalized.height * height}px`,
  };
};

const fieldClass = (field: SigningSessionView['fields'][number]) => [
  isSignatureField(field) ? 'signature' : 'info',
  placements.value[field.id] ? 'filled' : '',
];

const fieldLabel = (field: SigningSessionView['fields'][number]) => field.label || field.type.replace('_', ' ');
const signatureTextStyle = (field: SigningSessionView['fields'][number]) => ({
  fontSize: `${Math.min(18, field.height) * scale.value}px`,
  fontFamily: signatureFont,
});

const setPageRef = (page: number) => (el: HTMLDivElement | null) => {
  if (el) pageRefs.set(page, el);
};

const setCanvasRef = (page: number) => (el: HTMLCanvasElement | null) => {
  if (el) canvasRefs.set(page, el);
};

const pointInRect = (point: { x: number; y: number }, rect: NormalizedRect) =>
  point.x >= rect.x &&
  point.x <= rect.x + rect.width &&
  point.y >= rect.y &&
  point.y <= rect.y + rect.height;

const placeSignature = (field: SigningSessionView['fields'][number], signature?: SignaturePayload | null) => {
  const nextSignature = signature ?? activeSignature.value;
  if (!nextSignature) return;
  if (!isSignatureField(field)) return;
  const size = pageSizes.value[field.page];
  if (!size) return;
  const normalized = resolveNormalizedRect(field, size);
  placements.value = {
    ...placements.value,
    [field.id]: {
      fieldId: field.id,
      page: field.page,
      normalized,
      signature: { ...nextSignature },
    },
  };
};

const handleFieldClick = (field: SigningSessionView['fields'][number]) => {
  if (!activeSignature.value || !isSignatureField(field)) return;
  placeSignature(field);
};

const clearPlacement = (fieldId: string) => {
  const next = { ...placements.value };
  delete next[fieldId];
  placements.value = next;
};

const clearPlacements = () => {
  placements.value = {};
  if (placementStorageKey.value) {
    localStorage.removeItem(placementStorageKey.value);
  }
};

const persistPlacements = () => {
  if (!placementStorageKey.value) return;
  const data = Object.values(placements.value);
  localStorage.setItem(placementStorageKey.value, JSON.stringify(data));
};

const loadPlacements = () => {
  if (!placementStorageKey.value) return;
  const raw = localStorage.getItem(placementStorageKey.value);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw) as SignaturePlacement[];
    const fieldIds = new Set(fields.value.map((field) => field.id));
    const next: Record<string, SignaturePlacement> = {};
    parsed.forEach((item) => {
      if (!item || !fieldIds.has(item.fieldId)) return;
      if (!item.normalized || !item.signature) return;
      next[item.fieldId] = item;
    });
    placements.value = next;
  } catch {
    placements.value = {};
  }
};

const handleDrop = (event: DragEvent, page: number) => {
  const signature = draggingSignature.value ?? activeSignature.value;
  if (!signature) return;
  const pageEl = pageRefs.get(page);
  const size = pageSizes.value[page];
  if (!pageEl || !size) return;
  const rect = pageEl.getBoundingClientRect();
  const viewportWidth = size.width * scale.value;
  const viewportHeight = size.height * scale.value;
  const localX = Math.max(0, event.clientX - rect.left);
  const localY = Math.max(0, event.clientY - rect.top);
  const point = {
    x: localX / viewportWidth,
    y: localY / viewportHeight,
  };
  const target = fieldsByPage(page).find(
    (field) => isSignatureField(field) && pointInRect(point, resolveNormalizedRect(field, size)),
  );
  if (target) {
    placeSignature(target, signature);
  }
  draggingSignature.value = null;
};

const startSignatureDrag = (event: DragEvent) => {
  if (!activeSignature.value) return;
  draggingSignature.value = activeSignature.value;
  event.dataTransfer?.setData('text/plain', 'signature');
};

const endSignatureDrag = () => {
  draggingSignature.value = null;
};

const loadSession = async () => {
  if (!token.value) return;
  try {
    sessionView.value = await viewSigningSession(token.value);
    signer.value = sessionView.value.signer;
    doc.value = {
      id: sessionView.value.document.id,
      title: sessionView.value.document.title,
      status: sessionView.value.document.status,
      fileUrl: sessionView.value.document.fileUrl,
      version: 1,
    };
    fields.value = sessionView.value.fields;
    await nextTick();
    await loadPdf();
    loadPlacements();
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Unable to load signing session.';
  }
};

const signDocument = async () => {
  if (!doc.value || !sessionView.value || !canSign.value || !activeSignature.value) return;
  errorMessage.value = '';

  const optimistic = optimisticManager.begin(doc.value, {
    description: 'signature-applied',
    apply: (state) => ({ ...state, status: 'SIGNED' }),
  });
  doc.value = optimistic.nextState;

  try {
    const clientMutationId = createId();
    const correlationId = optimistic.mutation.correlationId;
    const session = await createSigningSession(doc.value.id, token.value, clientMutationId, correlationId);

    const signatureValue =
      activeSignature.value.type === 'TYPED'
        ? activeSignature.value.text || typedSignature.value.trim()
        : typedSignature.value.trim() || signer.value?.email || 'Signed';

    const fieldsPayload = sessionView.value.fields.map((field) => ({
      fieldId: field.id,
      value: field.type === 'DATE' ? new Date().toISOString().slice(0, 10) : signatureValue,
    }));

    await submitManifest({
      docId: doc.value.id,
      signingToken: token.value,
      signingSessionId: session.data.signingSessionId,
      fields: fieldsPayload,
      correlationId,
    });

    const signatureData = activeSignature.value.dataUrl ?? activeSignature.value.text ?? '';

    await uploadSignature({
      docId: doc.value.id,
      signingToken: token.value,
      signingSessionId: session.data.signingSessionId,
      type: activeSignature.value.type,
      data: signatureData,
      correlationId,
    });

    const applyResult = await applySignature({
      docId: doc.value.id,
      signingToken: token.value,
      signingSessionId: session.data.signingSessionId,
      correlationId,
    });

    doc.value = optimisticManager.confirm(doc.value, optimistic.mutation.id, {
      ...doc.value,
      status: applyResult.data.status,
      version: applyResult.data.documentVersion,
    });

    clearPlacements();
  } catch (err) {
    doc.value = optimisticManager.reject(doc.value, optimistic.mutation.id);
    errorMessage.value = err instanceof Error ? err.message : 'Unable to apply signature.';
  }
};

const getInkColor = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--ink-strong').trim() || '#0f172a';

const renderSignatureStrokes = () => {
  if (!signatureCanvas.value || !drawContext) return;
  const rect = signatureCanvas.value.getBoundingClientRect();
  drawContext.clearRect(0, 0, signatureCanvas.value.width, signatureCanvas.value.height);
  drawContext.beginPath();
  signatureStrokes.value.forEach((stroke) => {
    stroke.forEach((point, index) => {
      const x = point.x * rect.width;
      const y = point.y * rect.height;
      if (index === 0) {
        drawContext?.moveTo(x, y);
      } else {
        drawContext?.lineTo(x, y);
      }
    });
  });
  drawContext.stroke();
  hasDrawing.value = signatureStrokes.value.some((stroke) => stroke.length > 0);
};

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
  renderSignatureStrokes();
};

const clearCanvas = () => {
  if (!signatureCanvas.value || !drawContext) return;
  drawContext.clearRect(0, 0, signatureCanvas.value.width, signatureCanvas.value.height);
};

const exportSignatureImage = () => {
  if (!signatureCanvas.value) return '';
  const canvas = signatureCanvas.value;
  const { width, height } = canvas.getBoundingClientRect();
  const exportScale = 2;
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = Math.max(1, Math.floor(width * exportScale));
  exportCanvas.height = Math.max(1, Math.floor(height * exportScale));
  const context = exportCanvas.getContext('2d');
  if (!context) return canvas.toDataURL('image/png');
  context.scale(exportScale, exportScale);
  context.drawImage(canvas, 0, 0, width, height);
  return exportCanvas.toDataURL('image/png');
};

const buildSignatureVector = () => {
  const strokes = signatureStrokes.value.filter((stroke) => stroke.length > 0);
  if (strokes.length === 0) return null;
  const viewBoxWidth = 600;
  const viewBoxHeight = 200;
  const path = strokes
    .map((stroke) => {
      const [first, ...rest] = stroke;
      let d = `M ${first.x * viewBoxWidth} ${first.y * viewBoxHeight}`;
      rest.forEach((point) => {
        d += ` L ${point.x * viewBoxWidth} ${point.y * viewBoxHeight}`;
      });
      return d;
    })
    .join(' ');
  return { path, viewBox: `0 0 ${viewBoxWidth} ${viewBoxHeight}` };
};

const startDraw = (event: PointerEvent) => {
  if (signatureMode.value !== 'draw' || !signatureCanvas.value || !drawContext) return;
  isDrawing.value = true;
  drawContext.strokeStyle = getInkColor();
  signatureCanvas.value.setPointerCapture(event.pointerId);
  const rect = signatureCanvas.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  activeStroke = [];
  signatureStrokes.value = [...signatureStrokes.value, activeStroke];
  activeStroke.push({ x: x / rect.width, y: y / rect.height });
  drawContext.beginPath();
  drawContext.moveTo(x, y);
};

const draw = (event: PointerEvent) => {
  if (!isDrawing.value || signatureMode.value !== 'draw' || !signatureCanvas.value || !drawContext || !activeStroke) {
    return;
  }
  const rect = signatureCanvas.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  activeStroke.push({ x: x / rect.width, y: y / rect.height });
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
  activeStroke = null;
  if (hasDrawing.value) {
    drawnSignature.value = exportSignatureImage();
    signatureVector.value = buildSignatureVector();
  }
};

const clearSignature = () => {
  if (signatureMode.value === 'draw') {
    clearCanvas();
    hasDrawing.value = false;
    drawnSignature.value = '';
    signatureStrokes.value = [];
    signatureVector.value = null;
  } else if (signatureMode.value === 'upload') {
    signatureImage.value = '';
  } else {
    typedSignature.value = '';
  }
};

const handleSignatureUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      signatureImage.value = reader.result;
    }
  };
  reader.readAsDataURL(file);
  input.value = '';
};

const loadPdf = async () => {
  const tokenId = pdfLoadToken.value + 1;
  pdfLoadToken.value = tokenId;
  pdfError.value = '';
  try {
    if (!doc.value?.fileUrl) return;
    const pdf = await getDocument(doc.value.fileUrl).promise;
    if (tokenId !== pdfLoadToken.value) return;
    pdfDoc.value?.destroy();
    pdfDoc.value = pdf;
    pageCount.value = pdf.numPages;
    pageSizes.value = {};
    await renderAllPages(tokenId);
  } catch (err) {
    if (tokenId !== pdfLoadToken.value) return;
    pdfDoc.value?.destroy();
    pdfDoc.value = null;
    pageCount.value = 0;
    pageSizes.value = {};
    pdfError.value = 'Unable to load the PDF preview. Please check access permissions.';
  }
};

const renderAllPages = async (tokenId = pdfLoadToken.value) => {
  const pdf = pdfDoc.value;
  if (!pdf) return;
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    if (tokenId !== pdfLoadToken.value) return;
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    pageSizes.value = { ...pageSizes.value, [pageNumber]: { width: viewport.width, height: viewport.height } };
    const canvas = canvasRefs.get(pageNumber);
    if (!canvas) continue;
    const outputScale = window.devicePixelRatio || 1;
    const layoutViewport = page.getViewport({ scale: scale.value });
    const renderViewport = page.getViewport({ scale: scale.value * outputScale });
    canvas.width = renderViewport.width;
    canvas.height = renderViewport.height;
    canvas.style.width = `${layoutViewport.width}px`;
    canvas.style.height = `${layoutViewport.height}px`;
    const context = canvas.getContext('2d');
    if (!context) continue;
    await page.render({ canvasContext: context, viewport: renderViewport }).promise;
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

watch(scale, () => {
  void renderAllPages();
});

watch(signatureMode, () => {
  if (signatureMode.value === 'draw') {
    requestAnimationFrame(() => resizeCanvas());
  }
});

watch(activeSignature, (next) => {
  if (!next || placementCount.value === 0) return;
  const updated: Record<string, SignaturePlacement> = {};
  Object.entries(placements.value).forEach(([key, placement]) => {
    updated[key] = { ...placement, signature: { ...next } };
  });
  placements.value = updated;
});

watch(placements, () => persistPlacements(), { deep: true });

onMounted(async () => {
  await loadSession();
  requestAnimationFrame(() => resizeCanvas());
  window.addEventListener('resize', resizeCanvas);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
  pdfLoadToken.value += 1;
  pdfDoc.value?.destroy();
  pdfDoc.value = null;
});
</script>

<style scoped>
.sign-page {
  display: grid;
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

.doc-card,
.signature-card,
.viewer-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1.2rem 1.4rem;
  box-shadow: var(--shadow-md);
  display: grid;
  gap: 0.8rem;
}

.doc-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}

.sign-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 1.2rem;
  align-items: start;
}

.viewer-card {
  padding: 1rem;
}

.viewer-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.status-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.status-pill {
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid transparent;
}

.status-pill.warning {
  background: rgba(245, 158, 11, 0.14);
  color: var(--warning);
}

.status-pill.success {
  background: rgba(22, 163, 74, 0.12);
  color: var(--success);
}

.viewer {
  overflow: auto;
  max-height: calc(100vh - 260px);
  padding: 0.5rem;
  background: var(--surface-2);
  border-radius: 16px;
}

.pdf-error {
  display: grid;
  gap: 0.6rem;
  padding: 1rem;
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
  align-content: start;
  gap: 0.2rem;
}

.field.signature {
  border-color: var(--accent);
}

.field.info {
  border-color: rgba(100, 116, 139, 0.6);
}

.field.filled {
  border-style: solid;
  background: rgba(22, 163, 74, 0.08);
}

.field-label {
  font-weight: 600;
  color: var(--ink-strong);
  z-index: 1;
}

.field-clear {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: none;
  background: var(--danger);
  color: #fff;
  font-size: 0.65rem;
  cursor: pointer;
}

.signature-render {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.signature-render img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.signature-text {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink-strong);
}

.signature-panel {
  display: grid;
  gap: 1rem;
}

.signature-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.6rem;
}

.tab-btn {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  padding: 0.6rem 0.8rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.85rem;
}

.tab-btn.active {
  border-color: var(--accent);
  background: rgba(79, 70, 229, 0.08);
  color: var(--accent);
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
  font-weight: 700;
  color: var(--ink-strong);
}

.type-preview.empty {
  color: var(--muted);
  font-size: 1rem;
  font-family: var(--font-sans);
}

.upload-wrap {
  display: grid;
  gap: 0.8rem;
}

.upload-btn {
  border: 1px dashed var(--line);
  border-radius: 12px;
  padding: 0.6rem 0.9rem;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
}

.upload-btn input {
  display: none;
}

.upload-preview {
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 0.5rem;
  background: var(--surface-2);
  display: grid;
  place-items: center;
}

.upload-preview img {
  max-width: 100%;
  max-height: 120px;
}

.signature-palette {
  display: grid;
  gap: 0.5rem;
}

.signature-chip {
  border: 1px dashed var(--line);
  border-radius: 12px;
  padding: 0.6rem;
  background: var(--surface-2);
  display: grid;
  place-items: center;
  cursor: grab;
  min-height: 64px;
  color: var(--ink-strong);
}

.signature-chip img {
  max-width: 100%;
  max-height: 60px;
}

.signature-chip.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.signature-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.link-btn {
  border: none;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-weight: 600;
}

.error {
  color: var(--danger);
  font-size: 0.9rem;
}

.muted {
  color: var(--muted);
}

@media (max-width: 1100px) {
  .sign-body {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .signature-tabs {
    grid-template-columns: 1fr;
  }

  .signature-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
