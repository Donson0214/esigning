<template>
  <div class="sign-page sign-document">
    <header class="builder-topbar">
      <div class="left-actions">
        <button class="btn btn-outline" type="button" @click="goBack">Back</button>
        <div class="doc-meta">
          <p class="doc-title">{{ doc?.title ?? 'Sign Document' }}</p>
          <p class="doc-sub">{{ signer?.email ?? 'Loading signer...' }}</p>
        </div>
      </div>
      <div class="right-actions">
        <div class="status-pill" :class="statusClass">
          {{ doc?.status ?? 'Loading' }}
        </div>
        <button class="btn btn-primary" type="button" :disabled="!canSign" @click="signDocument">
          Done
        </button>
      </div>
    </header>

    <section v-if="doc" class="builder-body">
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
      </section>

      <aside class="right-panel">
        <div class="panel-section">
          <div class="panel-title">Signers</div>
          <div class="signer-card">
            <p class="signer-name">{{ signer?.name || 'You' }}</p>
            <p class="signer-email">{{ signer?.email ?? '' }}</p>
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
              @click="handlePaletteClick(field.type)"
            >
              <svg class="palette-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  v-for="(path, index) in paletteIconPaths(field.type)"
                  :key="index"
                  :d="path"
                />
              </svg>
              <span class="palette-label">{{ field.label }}</span>
            </button>
          </div>
          <p class="helper">Fields are already placed in the document.</p>
        </div>
      </aside>
    </section>

    <section v-else class="loading-state">
      <p class="muted">Loading document...</p>
    </section>

    <div v-if="signatureModalOpen" class="signature-modal">
      <div class="signature-backdrop" @click="closeSignatureModal"></div>
      <div class="signature-dialog" role="dialog" aria-modal="true" aria-label="Signature options">
        <header class="signature-header">
          <div>
            <p class="eyebrow">Signature</p>
            <h3>Signature options</h3>
          </div>
          <button class="icon-btn" type="button" @click="closeSignatureModal">x</button>
        </header>

        <div class="signature-tabs">
          <button
            type="button"
            :class="['tab-btn', signatureMode === 'draw' && 'active']"
            @click="signatureMode = 'draw'"
          >
            Draw
          </button>
          <button
            type="button"
            :class="['tab-btn', signatureMode === 'type' && 'active']"
            @click="signatureMode = 'type'"
          >
            Type
          </button>
          <button
            type="button"
            :class="['tab-btn', signatureMode === 'upload' && 'active']"
            @click="signatureMode = 'upload'"
          >
            Upload
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
          <button class="btn btn-outline" type="button" @click="clearPlacements" :disabled="!placementCount">
            Clear placements
          </button>
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from 'pdfjs-dist';
import { apiClient } from '@/shared/lib/axios';
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
const router = useRouter();
const token = computed(() => String(route.params.token ?? ''));
const sessionView = ref<SigningSessionView | null>(null);
const doc = ref<SignDocState | null>(null);
const signer = ref<SigningSessionView['signer'] | null>(null);
const fields = ref<SigningSessionView['fields']>([]);
const errorMessage = ref('');

const goBack = () => router.push('/app/documents');

const pdfDoc = shallowRef<PDFDocumentProxy | null>(null);
const scale = ref(1);
const pageCount = ref(0);
const pageSizes = ref<Record<number, { width: number; height: number }>>({});
const viewerRef = ref<HTMLDivElement | null>(null);
const pageRefs = new Map<number, HTMLDivElement>();
const canvasRefs = new Map<number, HTMLCanvasElement>();
const thumbRefs = new Map<number, HTMLCanvasElement>();
const pdfError = ref('');
const pdfLoadToken = ref(0);
let renderAllPagesQueue: Promise<void> = Promise.resolve();
let renderThumbsQueue: Promise<void> = Promise.resolve();

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
const signatureModalOpen = ref(false);

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
  { type: 'IMAGE', label: 'Stamp (Image)' },
  { type: 'ATTACHMENT', label: 'Attachment' },
] as const;

const fieldIconMap: Record<SigningSessionView['fields'][number]['type'], string[]> = {
  SIGNATURE: ['M3 21h4l11-11-4-4-11 11v4Z', 'M14 6l4 4'],
  INITIAL: ['M3 21h4l11-11-4-4-11 11v4Z', 'M14 6l4 4'],
  FULL_NAME: ['M12 12a4 4 0 1 0 0.001-8.001A4 4 0 0 0 12 12Z', 'M4 20a8 8 0 0 1 16 0'],
  EMAIL: ['M4 6h16v12H4z', 'M4 7l8 6 8-6'],
  DATE: ['M6 4v4', 'M18 4v4', 'M4 10h16', 'M5 6h14v14H5z'],
  TEXT: ['M4 6h16', 'M4 12h16', 'M4 18h10'],
  CHECKBOX: ['M4 4h16v16H4z', 'M7 12l3 3 7-7'],
  DROPDOWN: ['M4 7h16', 'M8 12l4 4 4-4'],
  RADIO: ['M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0', 'M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'],
  COMPANY: ['M4 20h16', 'M6 20V8h12v12', 'M9 12h2', 'M9 16h2', 'M13 12h2', 'M13 16h2'],
  JOB_TITLE: ['M8 7V5h8v2', 'M4 7h16v11H4z', 'M4 11h16'],
  IMAGE: ['M4 5h16v14H4z', 'M8 9a2 2 0 1 0 0.001-4.001A2 2 0 0 0 8 9Z', 'M4 17l4-4 3 3 4-4 5 5'],
  ATTACHMENT: ['M7 13l6-6a3 3 0 1 1 4 4l-7 7a5 5 0 0 1-7-7l7-7'],
};

const paletteIconPaths = (type: SigningSessionView['fields'][number]['type']) =>
  fieldIconMap[type] ?? ['M4 12h16'];

const optimisticManager = new OptimisticManager<SignDocState>();

const placementStorageKey = computed(() =>
  token.value ? `esigning:signature-placements:${token.value}` : '',
);

const isSignatureField = (field: SigningSessionView['fields'][number]) =>
  field.type === 'SIGNATURE' || field.type === 'INITIAL';
const isSignatureDataUrl = (value: string) => value.startsWith('data:image');

const getSignatureMeta = (field: SigningSessionView['fields'][number]) => {
  if (!field.options || typeof field.options !== 'object') return null;
  const signature = (field.options as Record<string, unknown>).signature;
  if (!signature || typeof signature !== 'object') return null;
  return signature as { mode?: 'draw' | 'type' | 'upload'; font?: string };
};

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

const openSignatureModal = async () => {
  signatureModalOpen.value = true;
  await nextTick();
  if (signatureMode.value === 'draw') {
    resizeCanvas();
  }
};

const closeSignatureModal = () => {
  signatureModalOpen.value = false;
};

const handlePaletteClick = (type: SigningSessionView['fields'][number]['type']) => {
  if (type === 'SIGNATURE' || type === 'INITIAL') {
    void openSignatureModal();
  }
};

const getFieldChoices = (field: SigningSessionView['fields'][number]) => {
  if (!field.options || typeof field.options !== 'object') return [];
  const choices = (field.options as Record<string, unknown>).choices;
  if (!Array.isArray(choices)) return [];
  return choices.filter((choice) => typeof choice === 'string' && choice.trim().length > 0);
};

const buildSignatureFromField = (field: SigningSessionView['fields'][number]) => {
  const value = field.value?.trim();
  if (!value) return null;
  const meta = getSignatureMeta(field);
  if (isSignatureDataUrl(value)) {
    const mode = meta?.mode;
    const signature = {
      type: mode === 'draw' ? 'DRAWN' : 'UPLOADED',
      dataUrl: value,
    } as SignaturePayload;
    return normalizeSignatureForField(field, signature);
  }
  const signature = {
    type: 'TYPED',
    text: value,
    font: meta?.font ?? signatureFont,
  } as SignaturePayload;
  return normalizeSignatureForField(field, signature);
};

const resolveFieldValue = (field: SigningSessionView['fields'][number]) => {
  if (field.value && field.value.trim()) return field.value;
  const fallbackName = signer.value?.name ?? signer.value?.email ?? 'Signed';
  switch (field.type) {
    case 'DATE':
      return new Date().toISOString().slice(0, 10);
    case 'EMAIL':
      return signer.value?.email ?? fallbackName;
    case 'FULL_NAME':
      return signer.value?.name ?? signer.value?.email ?? fallbackName;
    case 'CHECKBOX':
      return 'checked';
    case 'DROPDOWN':
    case 'RADIO': {
      const firstChoice = getFieldChoices(field)[0];
      return firstChoice ?? fallbackName;
    }
    case 'COMPANY':
    case 'JOB_TITLE':
    case 'TEXT':
      return fallbackName;
    case 'IMAGE':
    case 'ATTACHMENT':
      return field.value ?? 'Attached';
    default:
      return fallbackName;
  }
};

const signatureValueForPlacement = (placement?: SignaturePlacement) =>
  placement?.signature.dataUrl ?? placement?.signature.text ?? '';

const getInitialsFromText = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  const source = trimmed.includes('@') ? trimmed.split('@')[0] : trimmed;
  const parts = source.split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (parts.length === 0) {
    return trimmed.slice(0, 2).toUpperCase();
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return parts
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

const getSignerInitials = () => {
  const fallback = typedSignature.value.trim() || signer.value?.name || signer.value?.email || '';
  return getInitialsFromText(fallback) || 'IN';
};

const normalizeSignatureForField = (
  field: SigningSessionView['fields'][number],
  signature: SignaturePayload,
) => {
  if (field.type !== 'INITIAL') return signature;
  const baseText =
    signature.text ??
    typedSignature.value.trim() ??
    signer.value?.name ??
    signer.value?.email ??
    '';
  const initials = getInitialsFromText(baseText) || getSignerInitials();
  const metaFont = getSignatureMeta(field)?.font;
  return {
    type: 'TYPED',
    text: initials,
    font: signature.font ?? metaFont ?? signatureFont,
  } as SignaturePayload;
};

const resolveSignatureValue = (
  field: SigningSessionView['fields'][number],
  placement?: SignaturePlacement,
) => {
  if (!placement) return '';
  if (field.type === 'INITIAL') {
    const baseText =
      placement.signature.text ??
      typedSignature.value.trim() ??
      signer.value?.name ??
      signer.value?.email ??
      '';
    return getInitialsFromText(baseText) || getSignerInitials();
  }
  return signatureValueForPlacement(placement);
};

const resolveSignatureArtifact = () => {
  const signatureField = fields.value.find(
    (field) => field.type === 'SIGNATURE' && placements.value[field.id],
  );
  const signatureFromField = signatureField ? placements.value[signatureField.id]?.signature : undefined;
  const placementSignature =
    signatureFromField ?? Object.values(placements.value)[0]?.signature ?? activeSignature.value;
  if (placementSignature?.dataUrl) {
    return { type: placementSignature.type, data: placementSignature.dataUrl };
  }
  if (placementSignature?.text) {
    return { type: 'TYPED' as const, data: placementSignature.text };
  }
  const fallback = typedSignature.value.trim() || signer.value?.name || signer.value?.email || 'Signed';
  return { type: 'TYPED' as const, data: fallback };
};

const canSign = computed(() => {
  if (!doc.value || !sessionView.value) return false;
  return missingSignatureCount.value === 0;
});

const statusClass = computed(() => {
  const status = doc.value?.status;
  if (!status) return 'neutral';
  if (status === 'COMPLETED') return 'success';
  if (status === 'SIGNED' || status === 'IN_PROGRESS' || status === 'SENT') return 'warning';
  if (status === 'DECLINED' || status === 'EXPIRED') return 'danger';
  return 'neutral';
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
const signatureTextStyle = (field: SigningSessionView['fields'][number]) => {
  const placementFont = placements.value[field.id]?.signature.font;
  const metaFont = getSignatureMeta(field)?.font;
  return {
    fontSize: `${Math.min(18, field.height) * scale.value}px`,
    fontFamily: placementFont ?? metaFont ?? signatureFont,
  };
};

const setPageRef = (page: number) => (el: HTMLDivElement | null) => {
  if (el) pageRefs.set(page, el);
};

const setCanvasRef = (page: number) => (el: HTMLCanvasElement | null) => {
  if (el) canvasRefs.set(page, el);
};

const setThumbRef = (page: number) => (el: HTMLCanvasElement | null) => {
  if (el) thumbRefs.set(page, el);
};

const scrollToPage = (page: number) => {
  const target = pageRefs.get(page);
  if (!target || !viewerRef.value) return;
  viewerRef.value.scrollTo({ top: target.offsetTop - 12, behavior: 'smooth' });
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
  const normalizedSignature = normalizeSignatureForField(field, nextSignature);
  placements.value = {
    ...placements.value,
    [field.id]: {
      fieldId: field.id,
      page: field.page,
      normalized,
      signature: { ...normalizedSignature },
    },
  };
};

const handleFieldClick = (field: SigningSessionView['fields'][number]) => {
  if (!isSignatureField(field)) return;
  if (!activeSignature.value) {
    void openSignatureModal();
    return;
  }
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
    const fieldMap = new Map(fields.value.map((field) => [field.id, field]));
    const next: Record<string, SignaturePlacement> = {};
    parsed.forEach((item) => {
      if (!item || !fieldIds.has(item.fieldId)) return;
      if (!item.normalized || !item.signature) return;
      const field = fieldMap.get(item.fieldId);
      const signature = field ? normalizeSignatureForField(field, item.signature) : item.signature;
      next[item.fieldId] = { ...item, signature };
    });
    placements.value = next;
  } catch {
    placements.value = {};
  }
};

const seedPlacementsFromFields = () => {
  if (!fields.value.length) return;
  const next = { ...placements.value };
  for (const field of fields.value) {
    if (!isSignatureField(field)) continue;
    if (next[field.id]) continue;
    const signature = buildSignatureFromField(field);
    if (!signature) continue;
    const size = pageSizes.value[field.page];
    if (!size) continue;
    next[field.id] = {
      fieldId: field.id,
      page: field.page,
      normalized: resolveNormalizedRect(field, size),
      signature: { ...signature },
    };
  }
  placements.value = next;
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
    seedPlacementsFromFields();
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Unable to load signing session.';
  }
};

const signDocument = async () => {
  if (!doc.value || !sessionView.value || !canSign.value) return;
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

    const fieldsPayload = sessionView.value.fields.map((field) => {
      if (isSignatureField(field)) {
        const placement = placements.value[field.id];
        return { fieldId: field.id, value: resolveSignatureValue(field, placement) };
      }
      return { fieldId: field.id, value: resolveFieldValue(field) };
    });

    await submitManifest({
      docId: doc.value.id,
      signingToken: token.value,
      signingSessionId: session.data.signingSessionId,
      fields: fieldsPayload,
      correlationId,
    });

    const signatureArtifact = resolveSignatureArtifact();

    await uploadSignature({
      docId: doc.value.id,
      signingToken: token.value,
      signingSessionId: session.data.signingSessionId,
      type: signatureArtifact.type,
      data: signatureArtifact.data,
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
    await router.push('/app/documents');
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
    if (!doc.value) return;
    let pdf: PDFDocumentProxy | null = null;

    if (token.value) {
      try {
        const response = await apiClient.get<ArrayBuffer>(`/sign/${token.value}/file`, {
          responseType: 'arraybuffer',
        });
        if (tokenId !== pdfLoadToken.value) return;
        pdf = await getDocument({ data: response.data }).promise;
      } catch {
        pdf = null;
      }
    }

    const authToken = localStorage.getItem('auth_token');
    if (!pdf && authToken) {
      try {
        const response = await apiClient.get<ArrayBuffer>(`/documents/${doc.value.id}/file`, {
          responseType: 'arraybuffer',
        });
        if (tokenId !== pdfLoadToken.value) return;
        pdf = await getDocument({ data: response.data }).promise;
      } catch {
        pdf = null;
      }
    }

    if (!pdf) {
      if (!doc.value.fileUrl) {
        throw new Error('Preview unavailable');
      }
      try {
        const response = await fetch(doc.value.fileUrl);
        if (!response.ok) {
          throw new Error('Preview unavailable');
        }
        const data = await response.arrayBuffer();
        if (tokenId !== pdfLoadToken.value) return;
        pdf = await getDocument({ data }).promise;
      } catch {
        pdf = await getDocument(doc.value.fileUrl).promise;
      }
    }
    if (tokenId !== pdfLoadToken.value) return;
    pdfDoc.value?.destroy();
    pdfDoc.value = pdf;
    pageCount.value = pdf.numPages;
    pageSizes.value = {};
    await nextTick();
    await enqueueRenderAllPages(tokenId);
    await enqueueRenderThumbnails(tokenId);
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

const renderThumbnails = async (tokenId = pdfLoadToken.value) => {
  const pdf = pdfDoc.value;
  if (!pdf) return;
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    if (tokenId !== pdfLoadToken.value) return;
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 0.2 });
    const canvas = thumbRefs.get(pageNumber);
    if (!canvas) continue;
    const outputScale = window.devicePixelRatio || 1;
    const renderViewport = page.getViewport({ scale: 0.2 * outputScale });
    canvas.width = renderViewport.width;
    canvas.height = renderViewport.height;
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    const context = canvas.getContext('2d');
    if (!context) continue;
    await page.render({ canvasContext: context, viewport: renderViewport }).promise;
  }
};

const enqueueRenderAllPages = (tokenId = pdfLoadToken.value) => {
  renderAllPagesQueue = renderAllPagesQueue
    .catch(() => undefined)
    .then(() => renderAllPages(tokenId));
  return renderAllPagesQueue;
};

const enqueueRenderThumbnails = (tokenId = pdfLoadToken.value) => {
  renderThumbsQueue = renderThumbsQueue
    .catch(() => undefined)
    .then(() => renderThumbnails(tokenId));
  return renderThumbsQueue;
};

const zoomIn = async () => {
  scale.value = Math.min(2, scale.value + 0.1);
  await enqueueRenderAllPages();
};

const zoomOut = async () => {
  scale.value = Math.max(0.6, scale.value - 0.1);
  await enqueueRenderAllPages();
};

watch(scale, () => {
  void enqueueRenderAllPages();
});

watch(signatureMode, () => {
  if (signatureMode.value === 'draw') {
    requestAnimationFrame(() => resizeCanvas());
  }
});

watch(activeSignature, (next) => {
  if (!next || placementCount.value === 0) return;
  const fieldMap = new Map(fields.value.map((field) => [field.id, field]));
  const updated: Record<string, SignaturePlacement> = {};
  Object.entries(placements.value).forEach(([key, placement]) => {
    const field = fieldMap.get(key);
    const normalizedSignature = field ? normalizeSignatureForField(field, next) : next;
    updated[key] = { ...placement, signature: { ...normalizedSignature } };
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sign-page,
.sign-page * {
  border-radius: 0;
}

.builder-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  flex-wrap: wrap;
  background: transparent;
  border-bottom: 1px solid var(--line);
  padding: 0.9rem 1rem;
}

.left-actions,
.right-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.doc-meta {
  display: grid;
  gap: 0.1rem;
}

.doc-title {
  margin: 0;
  font-weight: 700;
  color: var(--ink-strong);
}

.doc-sub {
  margin: 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.builder-body {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 280px;
  gap: 0;
  min-height: 70vh;
  border: 1px solid var(--line);
  background: var(--surface);
}

.left-panel,
.center-panel,
.right-panel {
  background: transparent;
  border: none;
  padding: 1rem;
  display: grid;
  gap: 1rem;
  align-content: start;
}

.left-panel {
  border-right: 1px solid var(--line);
}

.center-panel {
  border-right: 1px solid var(--line);
}

.panel-title {
  font-weight: 700;
  color: var(--ink-strong);
}

.panel-section {
  display: grid;
  gap: 0.7rem;
}

.palette {
  display: grid;
  gap: 0.5rem;
}

.palette-item {
  border: none;
  border-bottom: 1px solid var(--line);
  background: transparent;
  padding: 0.45rem 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.82rem;
  cursor: pointer;
  text-align: left;
}

.palette-item:last-child {
  border-bottom: none;
}

.palette-icon {
  width: 16px;
  height: 16px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.palette-item:hover .palette-icon {
  stroke: var(--accent);
}

.palette-label {
  font-weight: 500;
  color: var(--ink);
}

.thumb-list {
  display: grid;
  gap: 0.8rem;
}

.thumb-card {
  border: none;
  padding: 0;
  background: transparent;
  display: grid;
  gap: 0.4rem;
  text-align: left;
  cursor: pointer;
}

.thumb-canvas {
  width: 100%;
  border: 1px solid var(--line);
  background: #fff;
}

.signer-card {
  border: 1px solid var(--line);
  padding: 0.7rem;
  display: grid;
  gap: 0.2rem;
}

.signer-name {
  margin: 0;
  font-weight: 600;
  color: var(--ink-strong);
}

.signer-email {
  margin: 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.sign-page .btn {
  padding: 0.35rem 0.75rem;
  font-size: 0.78rem;
  min-height: 32px;
  box-shadow: none;
}

.sign-page .btn-primary {
  background: var(--accent);
  box-shadow: none;
}

.sign-page .btn-primary:hover {
  transform: none;
  background: var(--accent-strong);
}

.sign-page .btn-outline {
  background: transparent;
  border-color: var(--line);
  color: var(--ink);
}

.sign-page .btn-outline:hover {
  border-color: var(--accent);
}

.sign-page .icon-btn {
  border: 1px solid var(--line);
  background: transparent;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1;
}

.sign-page .icon-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
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
  border: 1px solid var(--line);
  background: transparent;
}

.status-pill.warning {
  color: var(--warning);
}

.status-pill.success {
  color: var(--success);
}

.status-pill.neutral {
  color: var(--muted);
}

.status-pill.danger {
  color: var(--danger);
}

.viewer {
  overflow: auto;
  max-height: calc(100vh - 220px);
  padding: 0.5rem;
  background: transparent;
  border: 1px solid var(--line);
}

.pdf-error {
  display: grid;
  gap: 0.6rem;
  padding: 1rem;
  border: 1px solid var(--line);
  background: transparent;
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
  box-shadow: none;
}

.pdf-canvas {
  display: block;
}

.overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.field {
  position: absolute;
  border: 1px dashed var(--accent);
  background: rgba(51, 92, 255, 0.06);
  pointer-events: auto;
  padding: 0.15rem 0.25rem;
  font-size: 0.7rem;
  display: grid;
  align-content: start;
  gap: 0.2rem;
}

.field.signature {
  border-color: var(--accent-strong);
  background: rgba(51, 92, 255, 0.12);
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

.page-wrap .field-label {
  display: none;
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

.signature-modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 60;
}

.signature-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(2px);
}

.signature-dialog {
  position: relative;
  width: min(720px, 92vw);
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 1.4rem;
  box-shadow: var(--shadow-lg);
  display: grid;
  gap: 1rem;
  z-index: 1;
}

.signature-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.eyebrow {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.signature-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.6rem;
}

.tab-btn {
  border: 1px solid var(--line);
  background: transparent;
  padding: 0.6rem 0.8rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.85rem;
}

.tab-btn.active {
  border-color: var(--accent);
  color: var(--accent);
}

.signature-area {
  border: 1px solid var(--line);
  padding: 1rem;
  background: transparent;
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
  background: #ffffff;
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
  border: 1px solid var(--line);
  padding: 0 1rem;
  background: transparent;
}

.type-preview {
  height: 120px;
  border: 1px solid var(--line);
  background: transparent;
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
  padding: 0.5rem;
  background: transparent;
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
  border: 1px solid var(--line);
  padding: 0.45rem 0.6rem;
  background: transparent;
  display: grid;
  place-items: center;
  cursor: grab;
  min-height: 52px;
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
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.link-btn {
  border: none;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-weight: 600;
}

.helper {
  font-size: 0.75rem;
  color: var(--muted);
  margin: 0;
}

.error {
  color: var(--danger);
  font-size: 0.9rem;
}

.muted {
  color: var(--muted);
}

.loading-state {
  border: 1px solid var(--line);
  padding: 1rem;
}

.sign-document,
.sign-document * {
  border-radius: 0;
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
