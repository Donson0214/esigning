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

    <section v-if="doc" class="signature-card">
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
          />
          <div :class="['type-preview', !typedSignature && 'empty']">
            {{ typedSignature || 'Your signature' }}
          </div>
        </div>
      </div>

      <div class="signature-actions">
        <button class="link-btn" type="button" @click="clearSignature">Clear</button>
        <button class="btn btn-primary" type="button" :disabled="!canSign" @click="signDocument">
          Sign Document
        </button>
      </div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
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

type SignDocState = {
  id: string;
  title: string;
  status: string;
  fileUrl: string;
  version: number;
};

const route = useRoute();
const token = computed(() => String(route.params.token ?? ''));
const sessionView = ref<SigningSessionView | null>(null);
const doc = ref<SignDocState | null>(null);
const signer = ref<SigningSessionView['signer'] | null>(null);
const errorMessage = ref('');
const signatureMode = ref<'draw' | 'type'>('draw');
const typedSignature = ref('');
const hasDrawing = ref(false);
const isDrawing = ref(false);
const signatureCanvas = ref<HTMLCanvasElement | null>(null);
let drawContext: CanvasRenderingContext2D | null = null;

const optimisticManager = new OptimisticManager<SignDocState>();

const canSign = computed(() => {
  if (!doc.value) return false;
  if (signatureMode.value === 'draw') return hasDrawing.value;
  return typedSignature.value.trim().length > 0;
});

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
    const session = await createSigningSession(
      doc.value.id,
      token.value,
      clientMutationId,
      correlationId,
    );
    const fields = sessionView.value.fields.map((field) => ({
      fieldId: field.id,
      value: field.type === 'DATE' ? new Date().toISOString().slice(0, 10) : typedSignature.value || signer.value?.email || 'Signed',
    }));
    await submitManifest({
      docId: doc.value.id,
      signingToken: token.value,
      signingSessionId: session.data.signingSessionId,
      fields,
      correlationId,
    });
    const signatureData =
      signatureMode.value === 'draw' && signatureCanvas.value
        ? signatureCanvas.value.toDataURL('image/png')
        : typedSignature.value.trim();
    await uploadSignature({
      docId: doc.value.id,
      signingToken: token.value,
      signingSessionId: session.data.signingSessionId,
      type: signatureMode.value === 'draw' ? 'DRAWN' : 'TYPED',
      data: signatureData,
      correlationId,
    });
    const applyResult = await applySignature({
      docId: doc.value.id,
      signingToken: token.value,
      signingSessionId: session.data.signingSessionId,
      correlationId,
    });
    doc.value = optimisticManager.confirm(
      doc.value,
      optimistic.mutation.id,
      {
        ...doc.value,
        status: applyResult.data.status,
        version: applyResult.data.documentVersion,
      },
    );
  } catch (err) {
    doc.value = optimisticManager.reject(doc.value, optimistic.mutation.id);
    errorMessage.value = err instanceof Error ? err.message : 'Unable to apply signature.';
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
  drawContext.clearRect(0, 0, signatureCanvas.value.width, signatureCanvas.value.height);
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

const clearSignature = () => {
  if (signatureMode.value === 'draw') {
    clearCanvas();
    hasDrawing.value = false;
  } else {
    typedSignature.value = '';
  }
};

watch(signatureMode, () => {
  if (signatureMode.value === 'draw') {
    requestAnimationFrame(() => resizeCanvas());
  }
});

onMounted(async () => {
  await loadSession();
  requestAnimationFrame(() => resizeCanvas());
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
.signature-card {
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

.signature-tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.tab-btn {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
  padding: 0.7rem 1rem;
  font-weight: 600;
  cursor: pointer;
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
  color: var(--ink-strong);
  font-family: 'Fraunces', 'Segoe Script', 'Brush Script MT', serif;
}

.type-preview.empty {
  color: var(--muted);
  font-size: 1rem;
  font-family: var(--font-sans);
}

.signature-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
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
</style>


