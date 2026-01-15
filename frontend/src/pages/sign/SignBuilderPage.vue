<template>
  <div class="sign-builder">
    <header class="workflow-header">
      
      <div class="stepper">
        <div
          v-for="(step, index) in steps"
          :key="step.key"
          :class="['step', index === workflowStep ? 'active' : '', index < workflowStep ? 'done' : '']"
        >
          <span class="step-index">{{ index + 1 }}</span>
          <span class="step-label">{{ step.label }}</span>
        </div>
      </div>
    </header>

    <section v-if="workflowStep === 0" class="stage stage-choice">
      <div class="choice-grid">
        <button class="choice-card" type="button" @click="selectSigningIntent('send')">
          <div class="choice-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h10" />
              <path d="M12 6l6 6-6 6" />
              <rect x="3" y="4" width="7" height="16" rx="2" />
            </svg>
          </div>
          <div class="choice-copy">
            
          </div>
          <span class="choice-cta">Send</span>
        </button>
        <button class="choice-card" type="button" @click="selectSigningIntent('self')">
          <div class="choice-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          </div>
          <div class="choice-copy">
            
          </div>
          <span class="choice-cta">Sign</span>
        </button>
      </div>
    </section>

    <section v-else-if="workflowStep === 1" class="stage stage-setup">
      <div class="setup-shell">
        <div class="setup-backdrop"></div>
        <aside class="setup-drawer" role="dialog" aria-modal="true" aria-label="Document details">
          <div class="setup-drawer-top">
            <div class="setup-drawer-pill">
              <span class="drawer-title">Details</span>
              <span class="drawer-meta">Step 2</span>
            </div>
            <button class="icon-btn" type="button" @click="handleBack" aria-label="Close details">x</button>
          </div>
          <div class="setup-grid">
            <div class="setup-main">
              <div class="setup-card">
                <div class="setup-header">
                  <div class="setup-title">
                    <span class="panel-icon">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 7h16" />
                        <path d="M4 17h16" />
                        <circle cx="9" cy="7" r="2" />
                        <circle cx="15" cy="17" r="2" />
                      </svg>
                    </span>
                    <h3>Document setup</h3>
                  </div>
                </div>
                <p v-if="setupError" class="builder-error">{{ setupError }}</p>
              </div>

              <div class="setup-panel">
                <div class="panel-section">
                  <div class="panel-title">
                    <span class="panel-icon">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 3h7l5 5v13H7z" />
                        <path d="M14 3v5h5" />
                        <path d="M9 13h6" />
                        <path d="M9 17h6" />
                      </svg>
                    </span>
                    Document
                  </div>
                  <label class="field-label">
                    Document name
                    <input
                      v-model="documentTitle"
                      class="input"
                      type="text"
                      :readonly="Boolean(doc)"
                      placeholder="e.g. Service Agreement"
                    />
                  </label>
                  <label class="field-label">
                    Choose from library
                    <div class="doc-select">
                      <select v-model="selectedDocId" @change="handleDocChange">
                        <option value="">Select PDF document</option>
                        <option v-for="doc in pdfDocuments" :key="doc.id" :value="doc.id">
                          {{ doc.title }}
                        </option>
                      </select>
                      <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </label>
                  <label class="upload-btn upload-block">
                    <input
                      ref="uploadInput"
                      type="file"
                      accept=".pdf"
                      @change="handleUpload"
                    />
                    Upload PDF
                  </label>
                  <p class="helper">PDF files only.</p>
                </div>

                <div v-if="signingIntent === 'send'" class="panel-section">
                  <div class="panel-title">
                    <span class="panel-icon">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="8" cy="9" r="3" />
                        <circle cx="17" cy="8" r="2.5" />
                        <path d="M2 20a6 6 0 0 1 12 0" />
                        <path d="M13.5 20a5.5 5.5 0 0 1 8.5 0" />
                      </svg>
                    </span>
                    Recipients
                  </div>
                  <div class="signer-list">
                    <div v-for="signer in signerInputs" :key="signer.email" class="signer-row">
                      <div>
                        <p class="signer-name">{{ signer.isSender ? 'You' : signer.name || signer.email }}</p>
                        <p class="signer-email">{{ signer.email }}</p>
                      </div>
                      <button
                        v-if="!signer.isSender"
                        class="icon-btn"
                        type="button"
                        @click="removeSigner(signer.email)"
                      >
                        x
                      </button>
                    </div>
                  </div>
                  <div class="signer-form">
                    <input
                      v-model="newSignerName"
                      class="input"
                      type="text"
                      placeholder="Recipient full name"
                      @input="signerError = ''"
                    />
                    <input
                      v-model="newSignerEmail"
                      class="input"
                      type="email"
                      placeholder="Recipient Gmail"
                      @input="signerError = ''"
                    />
                    <button class="btn btn-outline" type="button" @click="addSigner">Add signer</button>
                    <p v-if="signerError" class="builder-error">{{ signerError }}</p>
                  </div>
                </div>

                <div v-else class="panel-section">
                  <div class="panel-title">
                    <span class="panel-icon">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="8" r="3.5" />
                        <path d="M4 20a8 8 0 0 1 16 0" />
                      </svg>
                    </span>
                    Signer
                  </div>
                  <div class="self-card">
                    <span class="self-avatar">{{ initials }}</span>
                    <div>
                      <p class="self-name">{{ displayName }}</p>
                      <p class="self-email">{{ email || 'Add your email in settings' }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="doc" class="summary-card">
                <h4>
                  <span class="panel-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 10v6" />
                      <path d="M12 7h.01" />
                    </svg>
                  </span>
                  Selected document
                </h4>
                <p class="summary-title">{{ doc.title }}</p>
                <p class="summary-sub">{{ signerSummary }}</p>
                <div class="summary-tags">
                  <span class="tag">{{ doc.status }}</span>
                  <span class="tag">{{ pageCount }} pages</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section v-else class="stage stage-builder">
      <header class="builder-topbar">
        <div class="left-actions">
          <button class="btn btn-outline" type="button" @click="workflowStep = 1">Edit details</button>
          <div class="doc-meta">
            <p class="doc-title">{{ doc?.title ?? 'No document selected' }}</p>
            <p class="doc-sub">{{ signerInputs.length }} signer{{ signerInputs.length === 1 ? '' : 's' }}</p>
          </div>
        </div>
        <div class="right-actions">
          <div class="status-pill" :class="statusClass">
            {{ doc?.status ?? 'No document' }}
          </div>
          <button class="btn btn-outline" type="button" @click="saveDraft" :disabled="!doc || savingDraft">
            {{ savingDraft ? 'Saving...' : 'Save' }}
          </button>
          <button class="btn btn-outline" type="button" disabled>Detect fields</button>
          <button
            v-if="signingIntent === 'send'"
            class="btn btn-outline"
            type="button"
            @click="signNowAndSend"
            :disabled="!canSend || savingDraft || signingNow"
          >
            {{ signingNow ? 'Signing...' : 'Sign now & send' }}
          </button>
          <button
            v-if="signingIntent === 'self'"
            class="btn btn-primary"
            type="button"
            @click="sendForSigning"
            :disabled="!canSend || savingDraft || signingNow"
          >
            {{ sendLabel }}
          </button>
        </div>
      </header>
      <p v-if="doc && !isPdfPreview" class="builder-note">
        Preview only for this file type. Convert to PDF to place fields and send for signing.
      </p>
        <p v-if="builderError" class="builder-error">{{ builderError }}</p>
        <p v-if="builderNotice" class="builder-success">{{ builderNotice }}</p>

      <div :class="['builder-body', !isPdfPreview && 'builder-body--compact']">
        <aside v-if="isPdfPreview" class="left-panel">
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
          <div v-if="isPdfPreview" class="viewer-toolbar">
            <button class="icon-btn" type="button" @click="zoomOut">-</button>
            <span>{{ Math.round(scale * 100) }}%</span>
            <button class="icon-btn" type="button" @click="zoomIn">+</button>
          </div>
          <div class="viewer" ref="viewerRef">
            <template v-if="isPdfPreview">
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
                @click="handlePageClick($event, page)"
              >
                <canvas :ref="setCanvasRef(page)" class="pdf-canvas"></canvas>
                <div class="overlay">
                  <div
                    v-for="field in fieldsByPage(page)"
                    :key="field.id"
                    class="field"
                    :class="[
                      field.type.toLowerCase(),
                      activeFieldId === field.id ? 'active' : '',
                      field.value ? 'filled' : '',
                    ]"
                    :style="fieldStyle(field, page)"
                    @pointerdown="startDrag($event, field, page)"
                    @click.stop="handleFieldClick(field)"
                  >
                    <span class="field-label">{{ field.label || field.type.replace('_', ' ') }}</span>
                    <div v-if="isSignatureField(field) && field.value" class="signature-render">
                      <img
                        v-if="isSignatureDataUrl(field.value)"
                        :src="field.value"
                        alt="Signature"
                      />
                      <span
                        v-else
                        class="signature-text"
                        :style="{ fontFamily: signatureFontForField(field) }"
                      >
                        {{ field.value }}
                      </span>
                    </div>
                    <div v-else-if="field.type === 'IMAGE' && field.value" class="signature-render">
                      <img v-if="isSignatureDataUrl(field.value)" :src="field.value" alt="Stamp" />
                      <span v-else class="field-value">{{ field.value }}</span>
                    </div>
                    <span v-else-if="field.type === 'ATTACHMENT'" class="field-value">
                      {{ getAttachmentLabel(field) }}
                    </span>
                    <span v-else-if="field.type === 'CHECKBOX' && isCheckedValue(field.value)" class="field-value">
                      X
                    </span>
                    <span v-else-if="field.value" class="field-value">{{ field.value }}</span>
                    <span class="resize-handle" @pointerdown.stop="startResize($event, field, page)"></span>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="pdf-error">
                <p>Only PDF documents are supported for preview.</p>
              </div>
            </template>
          </div>
        </section>

        <aside class="right-panel">
          <div class="panel-section">
            <div class="panel-title">Signers</div>
            <div class="signer-list">
              <div v-for="signer in signerInputs" :key="signer.email" class="signer-row">
                <div>
                  <p class="signer-name">{{ signer.isSender ? 'You' : signer.name || signer.email }}</p>
                  <p class="signer-email">{{ signer.email }}</p>
                </div>
                <button v-if="!signer.isSender" class="icon-btn" type="button" @click="removeSigner(signer.email)">
                  x
                </button>
              </div>
            </div>
            <div class="signer-form" v-if="signingIntent === 'send'">
              <input
                v-model="newSignerName"
                class="input"
                type="text"
                placeholder="Recipient full name"
                @input="signerError = ''"
              />
              <input
                v-model="newSignerEmail"
                class="input"
                type="email"
                placeholder="Recipient Gmail"
                @input="signerError = ''"
              />
              <button class="btn btn-outline" type="button" @click="addSigner">Add signer</button>
              <p v-if="signerError" class="builder-error">{{ signerError }}</p>
            </div>
          </div>

          <div class="panel-section">
            <div class="panel-title">Field palette</div>
            <div class="palette">
              <button
                v-for="field in fieldPalette"
                :key="field.type"
                class="palette-item"
                :disabled="!isPdfPreview"
                type="button"
                :draggable="isPdfPreview"
                @dragstart="startPaletteDrag(field.type)"
                @click="setActivePalette(field.type)"
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
            <p class="helper" v-if="isPdfPreview">Drag a field onto the PDF or click to place.</p>
            <p class="helper" v-else>Field placement is available for PDF previews only.</p>
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
                  {{ signer.isSender ? 'You' : signer.name || signer.email }}
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
    </section>

    <div v-if="signatureModalOpen" class="signature-modal">
      <div class="signature-backdrop" @click="closeSignatureModal"></div>
      <div class="signature-dialog" role="dialog" aria-modal="true" aria-label="Signature options">
        <header class="signature-header">
          <div>
            <p class="eyebrow">Signature</p>
            <h3>Signature options</h3>
            <p v-if="signatureTargetLabel" class="builder-note">{{ signatureTargetLabel }}</p>
          </div>
          <button class="icon-btn" type="button" @click="closeSignatureModal">x</button>
        </header>

        <div class="signature-tabs">
          <button
            class="tab-btn"
            type="button"
            :class="signatureMode === 'draw' && 'active'"
            @click="signatureMode = 'draw'"
          >
            Draw
          </button>
          <button
            class="tab-btn"
            type="button"
            :class="signatureMode === 'type' && 'active'"
            @click="signatureMode = 'type'"
          >
            Type
          </button>
          <button
            class="tab-btn"
            type="button"
            :class="signatureMode === 'upload' && 'active'"
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
              @pointerdown="startSignatureDraw"
              @pointermove="drawSignature"
              @pointerup="endSignatureDraw"
              @pointerleave="endSignatureDraw"
            ></canvas>
            <span v-if="!hasDrawing" class="signature-placeholder">Draw your signature here</span>
          </div>
          <div v-else-if="signatureMode === 'type'" class="type-wrap">
            <input
              v-model.trim="typedSignature"
              class="input type-input"
              type="text"
              placeholder="Type your signature"
            />
            <div :class="['type-preview', !typedSignature && 'empty']" :style="{ fontFamily: signatureFont }">
              {{ typedPreviewText }}
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

        <div v-if="signatureMode === 'type'" class="signature-style-grid">
          <button
            v-for="style in signatureStyles"
            :key="style.id"
            class="signature-style"
            type="button"
            :class="signatureFont === style.font && 'active'"
            @click="signatureFont = style.font"
          >
            <span class="style-preview" :style="{ fontFamily: style.font }">{{ typedPreviewText }}</span>
            <span class="style-label">{{ style.label }}</span>
          </button>
        </div>

        <p v-if="signatureError" class="builder-error">{{ signatureError }}</p>

        <div class="signature-actions">
          <button class="link-btn" type="button" @click="clearSignature">Clear</button>
          <span class="action-spacer"></span>
          <button class="btn btn-outline" type="button" :disabled="!canDownloadSignature" @click="downloadSignature">
            Download
          </button>
          <button class="btn btn-primary" type="button" :disabled="!canSaveSignature" @click="saveSignature">
            Save signature
          </button>
        </div>
      </div>
    </div>

    <div v-if="fieldModalOpen" class="field-modal">
      <div class="field-backdrop" @click="closeFieldModal"></div>
      <div class="field-dialog" role="dialog" aria-modal="true" aria-label="Field options">
        <header class="field-header">
          <div>
            <p class="eyebrow">Field</p>
            <h3>{{ fieldModalTitle }}</h3>
            <p v-if="activeField" class="builder-note">{{ activeField.label || activeField.type.replace('_', ' ') }}</p>
          </div>
          <button class="icon-btn" type="button" @click="closeFieldModal">x</button>
        </header>

        <div class="field-body">
          <template v-if="fieldEditorType === 'FULL_NAME' || fieldEditorType === 'COMPANY' || fieldEditorType === 'JOB_TITLE'">
            <label class="field-label">
              Value
              <input v-model.trim="fieldValueDraft" class="input" type="text" placeholder="Enter value" />
            </label>
          </template>

          <template v-else-if="fieldEditorType === 'EMAIL'">
            <label class="field-label">
              Email
              <input v-model.trim="fieldValueDraft" class="input" type="email" placeholder="name@example.com" />
            </label>
          </template>

          <template v-else-if="fieldEditorType === 'DATE'">
            <label class="field-label">
              Date
              <input v-model="fieldDateDraft" class="input" type="date" />
            </label>
          </template>

          <template v-else-if="fieldEditorType === 'TEXT'">
            <label class="field-label">
              Text
              <textarea v-model="fieldValueDraft" class="input field-textarea" rows="4"></textarea>
            </label>
          </template>

          <template v-else-if="fieldEditorType === 'CHECKBOX'">
            <label class="toggle">
              <input v-model="fieldCheckboxDraft" type="checkbox" />
              Checked
            </label>
          </template>

          <template v-else-if="fieldEditorType === 'DROPDOWN' || fieldEditorType === 'RADIO'">
            <div class="choice-row">
              <input
                v-model.trim="fieldChoiceInput"
                class="input"
                type="text"
                placeholder="Add option"
                @keyup.enter="addFieldChoice"
              />
              <button class="btn btn-outline" type="button" @click="addFieldChoice">Add</button>
            </div>
            <div v-if="fieldChoicesDraft.length" class="choice-list">
              <div
                v-for="choice in fieldChoicesDraft"
                :key="choice"
                class="choice-item"
                @click="fieldValueDraft = choice"
              >
                <span>{{ choice }}</span>
                <button class="icon-btn" type="button" @click.stop="removeFieldChoice(choice)">x</button>
              </div>
            </div>
            <label class="field-label">
              Selected value
              <select v-model="fieldValueDraft">
                <option value="">Select value</option>
                <option v-for="choice in fieldChoicesDraft" :key="choice" :value="choice">{{ choice }}</option>
              </select>
            </label>
          </template>

          <template v-else-if="fieldEditorType === 'IMAGE'">
            <label class="upload-btn">
              <input type="file" accept="image/*" @change="handleStampUpload" />
              Upload stamp
            </label>
            <div v-if="fieldStampDraft" class="upload-preview">
              <img :src="fieldStampDraft" alt="Stamp preview" />
            </div>
          </template>

          <template v-else-if="fieldEditorType === 'ATTACHMENT'">
            <label class="upload-btn">
              <input type="file" @change="handleAttachmentUpload" />
              Upload attachment
            </label>
            <div v-if="fieldAttachmentDraft" class="attachment-preview">
              <p class="attachment-name">{{ fieldAttachmentDraft.name }}</p>
              <p class="attachment-meta">{{ fieldAttachmentDraft.type || 'Attachment' }}</p>
            </div>
          </template>
        </div>

        <p v-if="fieldEditorError" class="builder-error">{{ fieldEditorError }}</p>

        <div class="field-actions">
          <button class="btn btn-outline" type="button" @click="closeFieldModal">Cancel</button>
          <span class="action-spacer"></span>
          <button class="btn btn-outline" type="button" :disabled="!canDownloadField" @click="downloadFieldAsset">
            Download
          </button>
          <button class="btn btn-primary" type="button" :disabled="!canSaveFieldValue" @click="saveFieldValue">
            Save field
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from 'pdfjs-dist';
import { useAuthProfile } from '@/features/auth/useAuthProfile';
import { useDocuments } from '@/features/documents/composables';
import { createField, deleteField, getDocument as fetchDocument, sendDocument, updateField, uploadDocument } from '@/features/documents/api';
import { applySignature, createSigningSession, submitManifest, uploadSignature } from '@/features/signing/api';
import { apiClient } from '@/shared/lib/axios';
import { createId } from '@/shared/lib/ids';
import type { Document, DocumentField } from '@/features/documents/types';

GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

type SignerInput = { name?: string; email: string; isSender?: boolean };

const router = useRouter();
const { documents, refresh } = useDocuments();
const { displayName, email, initials } = useAuthProfile();

const selectedDocId = ref('');
const doc = ref<Document | null>(null);
const fields = ref<DocumentField[]>([]);
const signerInputs = ref<SignerInput[]>([]);
const newSignerName = ref('');
const newSignerEmail = ref('');
const documentTitle = ref('');
const uploadInput = ref<HTMLInputElement | null>(null);
const workflowStep = ref<0 | 1 | 2>(0);
const signingIntent = ref<'send' | 'self' | null>(null);
const setupError = ref('');
const builderError = ref('');
const builderNotice = ref('');
const signerError = ref('');
const savingDraft = ref(false);
const signingNow = ref(false);
const senderEmail = computed(() => email.value.trim().toLowerCase());
const senderName = computed(() => displayName.value || email.value || 'You');
const senderSigner = computed(() => signerInputs.value.find((signer) => signer.isSender));
const recipientSigners = computed(() => signerInputs.value.filter((signer) => !signer.isSender));
let builderNoticeTimer: number | null = null;

const steps = [
  { key: 'mode', label: 'Choose mode' },
  { key: 'details', label: 'Details' },
  { key: 'build', label: 'Preview & fields' },
];

const pdfDoc = shallowRef<PDFDocumentProxy | null>(null);
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
const textPreview = ref('');
const textError = ref('');
const previewUrl = ref('');
const imagePreviewUrl = ref('');
const pdfLoadToken = ref(0);
const textLoadToken = ref(0);
let renderAllPagesQueue: Promise<void> = Promise.resolve();
let renderThumbnailsQueue: Promise<void> = Promise.resolve();

type SignatureMode = 'draw' | 'type' | 'upload';
type SignatureStyle = { id: string; label: string; font: string };

const signatureStyles: SignatureStyle[] = [
  { id: 'classic', label: 'Classic', font: '"Segoe Script", "Lucida Handwriting", cursive' },
  { id: 'modern', label: 'Modern', font: '"Trebuchet MS", "Lucida Sans Unicode", sans-serif' },
  { id: 'heritage', label: 'Heritage', font: '"Palatino Linotype", "Book Antiqua", serif' },
  { id: 'bold', label: 'Bold', font: '"Franklin Gothic Medium", "Arial Black", sans-serif' },
];

const signatureModalOpen = ref(false);
const signatureTargetFieldId = ref<string | null>(null);
const signatureMode = ref<SignatureMode>('draw');
const signatureFont = ref(signatureStyles[0].font);
const typedSignature = ref('');
const signatureImage = ref('');
const signatureCanvas = ref<HTMLCanvasElement | null>(null);
const signatureStrokes = ref<Array<Array<{ x: number; y: number }>>>([]);
const hasDrawing = ref(false);
const isDrawingSignature = ref(false);
const signatureError = ref('');
let signatureContext: CanvasRenderingContext2D | null = null;
let activeSignatureStroke: Array<{ x: number; y: number }> | null = null;

const fieldModalOpen = ref(false);
const fieldValueDraft = ref('');
const fieldDateDraft = ref('');
const fieldCheckboxDraft = ref(false);
const fieldChoicesDraft = ref<string[]>([]);
const fieldChoiceInput = ref('');
const fieldStampDraft = ref('');
const fieldAttachmentDraft = ref<{ name: string; type: string; dataUrl: string } | null>(null);
const fieldEditorError = ref('');

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
  { type: 'IMAGE', label: 'Stamp (Image)' },
  { type: 'ATTACHMENT', label: 'Attachment' },
] as const;

const fieldIconMap: Record<DocumentField['type'], string[]> = {
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

const paletteIconPaths = (type: DocumentField['type']) => fieldIconMap[type] ?? ['M4 12h16'];

const statusClass = computed(() => {
  const status = doc.value?.status;
  if (!status) return 'neutral';
  if (status === 'COMPLETED') return 'success';
  if (status === 'SIGNED' || status === 'IN_PROGRESS') return 'warning';
  if (status === 'DECLINED' || status === 'EXPIRED') return 'danger';
  return 'neutral';
});

const setBuilderNotice = (message: string) => {
  builderNotice.value = message;
  if (builderNoticeTimer) {
    window.clearTimeout(builderNoticeTimer);
  }
  builderNoticeTimer = window.setTimeout(() => {
    builderNotice.value = '';
    builderNoticeTimer = null;
  }, 3000);
};

const goBack = () => router.push('/app/documents');

const getExtension = (value?: string) => {
  if (!value) return '';
  const cleanValue = value.split('?')[0]?.split('#')[0] ?? value;
  const match = cleanValue.match(/\.([a-z0-9]+)$/i);
  return match ? match[1].toLowerCase() : '';
};

const isPdfFile = (file: File) => file.type.toLowerCase().includes('pdf') || getExtension(file.name) === 'pdf';

const isPdfDocument = (value?: { fileMimeType?: string; fileName?: string; fileUrl?: string }) => {
  if (!value) return false;
  const mime = value.fileMimeType?.toLowerCase() ?? '';
  if (mime.includes('pdf')) return true;
  const ext = getExtension(value.fileName) || getExtension(value.fileUrl);
  return ext === 'pdf';
};

const pdfDocuments = computed(() => documents.value.filter((item) => isPdfDocument(item)));

const isValidEmail = (value: string) => /.+@.+\..+/.test(value);
const isBlobUrl = (value: string) => value.startsWith('blob:');
const isSignatureDataUrl = (value: string) => value.startsWith('data:image');
const isSignatureField = (field: DocumentField) => field.type === 'SIGNATURE' || field.type === 'INITIAL';

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

const getSignatureMeta = (field: DocumentField) => {
  if (!field.options || typeof field.options !== 'object') return null;
  const options = field.options as Record<string, unknown>;
  const signature = options.signature;
  if (!signature || typeof signature !== 'object') return null;
  return signature as { mode?: SignatureMode; font?: string; text?: string };
};

const signatureFontForField = (field: DocumentField) => {
  const meta = getSignatureMeta(field);
  return meta?.font ?? signatureStyles[0].font;
};

const isCheckedValue = (value?: string | null) => {
  if (!value) return false;
  const normalized = value.toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'checked';
};

const getAttachmentMeta = (field: DocumentField) => {
  if (!field.options || typeof field.options !== 'object') return null;
  const attachment = (field.options as Record<string, unknown>).attachment;
  if (!attachment || typeof attachment !== 'object') return null;
  return attachment as { name?: string; type?: string; dataUrl?: string };
};

const getAttachmentLabel = (field: DocumentField) => {
  const meta = getAttachmentMeta(field);
  return meta?.name ?? field.value ?? 'Attachment';
};

const getFieldChoices = (field: DocumentField) => {
  if (!field.options || typeof field.options !== 'object') return [];
  const choices = (field.options as Record<string, unknown>).choices;
  if (!Array.isArray(choices)) return [];
  return choices.filter((item) => typeof item === 'string' && item.trim().length > 0);
};

const mergeFieldOptions = (field: DocumentField, extra: Record<string, unknown>, removeKeys: string[] = []) => {
  const base =
    field.options && typeof field.options === 'object' ? { ...(field.options as Record<string, unknown>) } : {};
  for (const key of removeKeys) {
    delete base[key];
  }
  return { ...base, ...extra };
};

const officeExtensions = new Set(['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp']);
const imageExtensions = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp']);
const textExtensions = new Set(['txt', 'rtf', 'csv']);

const previewKind = computed(() => {
  const mime = doc.value?.fileMimeType?.toLowerCase() ?? '';
  if (mime.includes('pdf')) return 'pdf';
  if (mime.startsWith('image/')) return 'image';
  if (mime.includes('word') || mime.includes('officedocument') || mime.includes('presentation') || mime.includes('spreadsheet')) {
    return 'office';
  }
  if (mime.startsWith('text/')) return 'text';
  const ext = getExtension(doc.value?.fileName) || getExtension(doc.value?.fileUrl);
  if (ext === 'pdf') return 'pdf';
  if (imageExtensions.has(ext)) return 'image';
  if (officeExtensions.has(ext)) return 'office';
  if (textExtensions.has(ext)) return 'text';
  return 'unknown';
});

const isPdfPreview = computed(() => previewKind.value === 'pdf');
const isImagePreview = computed(() => previewKind.value === 'image');
const isOfficePreview = computed(() => previewKind.value === 'office');
const isTextPreview = computed(() => previewKind.value === 'text');

const preferredPreviewUrl = computed(() => {
  return previewUrl.value || doc.value?.signedFileUrl || doc.value?.fileUrl || '';
});

const officePreviewUrl = computed(() => {
  const url = preferredPreviewUrl.value;
  if (!url) return '';
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
});

const fallbackPreviewUrl = computed(() => preferredPreviewUrl.value);

const hasValidSigners = computed(() => {
  if (signingIntent.value === 'self') {
    return Boolean(senderSigner.value?.email?.trim().length);
  }
  if (signingIntent.value === 'send') {
    return senderEmail.value.length > 0 && recipientSigners.value.length > 0;
  }
  return false;
});

const signerSummary = computed(() => {
  if (!hasValidSigners.value) {
    return signingIntent.value === 'self'
      ? 'Add your email to sign this document.'
      : 'Add at least one recipient to continue.';
  }
  if (signingIntent.value === 'send') {
    if (recipientSigners.value.length === 1) {
      return `1 recipient - ${recipientSigners.value[0].email}`;
    }
    return `${recipientSigners.value.length} recipients added`;
  }
  return `1 signer - ${senderSigner.value?.email ?? senderEmail.value}`;
});

const canProceedSetup = computed(() => Boolean(doc.value) && hasValidSigners.value && isPdfPreview.value);
const canSend = computed(() => Boolean(doc.value) && hasValidSigners.value && isPdfPreview.value);

const sendLabel = computed(() => (signingIntent.value === 'self' ? 'Start signing' : 'Send'));

const signatureTargetField = computed(() =>
  fields.value.find((field) => field.id === signatureTargetFieldId.value),
);
const signatureTargetLabel = computed(() => {
  const field = signatureTargetField.value;
  if (!field) return '';
  return field.label ? `Field: ${field.label}` : `Field: ${field.type.replace('_', ' ')}`;
});
const typedPreviewText = computed(() => typedSignature.value.trim() || displayName.value || 'Your signature');
const canSaveSignature = computed(() => {
  if (signatureMode.value === 'draw') return hasDrawing.value;
  if (signatureMode.value === 'upload') return Boolean(signatureImage.value);
  return typedSignature.value.trim().length > 0;
});
const canDownloadSignature = computed(() => canSaveSignature.value);


const handleBack = () => {
  if (workflowStep.value === 0) {
    goBack();
    return;
  }
  workflowStep.value = (workflowStep.value - 1) as 0 | 1 | 2;
};

const ensureSenderSigner = () => {
  if (!senderEmail.value) return;
  const recipients = signerInputs.value.filter(
    (signer) => !signer.isSender && signer.email !== senderEmail.value,
  );
  signerInputs.value = [
    { name: senderName.value, email: senderEmail.value, isSender: true },
    ...recipients,
  ];
};

const addSelfSigner = () => {
  if (!senderEmail.value) return;
  signerInputs.value = [{ name: senderName.value, email: senderEmail.value, isSender: true }];
};

const selectSigningIntent = async (intent: 'send' | 'self') => {
  if (signingIntent.value !== intent) {
    signerInputs.value = [];
  }
  signingIntent.value = intent;
  workflowStep.value = 1;
  setupError.value = '';
  builderError.value = '';
  signerError.value = '';
  if (intent === 'self') {
    addSelfSigner();
  } else {
    ensureSenderSigner();
  }
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

const fieldsByPage = (page: number) => fields.value.filter((field) => field.page === page);
const getDefaultSignerEmail = (type: DocumentField['type']) => {
  if (signingIntent.value === 'send') {
    if (type === 'SIGNATURE' || type === 'INITIAL') {
      return senderSigner.value?.email ?? recipientSigners.value[0]?.email;
    }
    return recipientSigners.value[0]?.email ?? senderSigner.value?.email;
  }
  return senderSigner.value?.email ?? signerInputs.value[0]?.email;
};

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

const computeNormalizedRect = (field: DocumentField, size: { width: number; height: number }) => {
  const safeWidth = size.width || 1;
  const safeHeight = size.height || 1;
  return {
    x: clamp01(field.x / safeWidth),
    y: clamp01((safeHeight - field.y - field.height) / safeHeight),
    width: clamp01(field.width / safeWidth),
    height: clamp01(field.height / safeHeight),
  };
};

const resolveNormalizedRect = (field: DocumentField, size: { width: number; height: number }) => {
  const normalizedFromOptions = parseNormalizedRect((field.options as { normalized?: unknown } | null)?.normalized);
  return normalizedFromOptions ?? computeNormalizedRect(field, size);
};

const buildNormalizedOptions = (field: DocumentField, size: { width: number; height: number }) => {
  const existing =
    field.options && typeof field.options === 'object' ? (field.options as Record<string, unknown>) : {};
  return {
    ...existing,
    normalized: computeNormalizedRect(field, size),
  };
};

const buildFieldUpdatePayload = (field: DocumentField) => {
  const size = pageSizes.value[field.page];
  return {
    label: field.label ?? undefined,
    placeholder: field.placeholder ?? undefined,
    signerEmail: field.signerEmail || undefined,
    required: field.required ?? undefined,
    value: field.value ?? undefined,
    options: size ? buildNormalizedOptions(field, size) : field.options ?? undefined,
    page: field.page,
    x: field.x,
    y: field.y,
    width: field.width,
    height: field.height,
  };
};

const getSenderFields = () =>
  fields.value.filter((field) => field.signerEmail?.toLowerCase() === senderEmail.value);

const resolveInitialValueForField = (field: DocumentField) => {
  const rawValue = field.value ?? '';
  const meta = getSignatureMeta(field);
  const baseText = !rawValue || isSignatureDataUrl(rawValue)
    ? meta?.text ?? senderName.value ?? senderEmail.value
    : rawValue;
  return getInitialsFromText(baseText || senderName.value || senderEmail.value || 'IN') || 'IN';
};

const resolveSenderFieldValue = (field: DocumentField) => {
  const rawValue = field.value ?? '';
  if (field.type === 'INITIAL') {
    return resolveInitialValueForField(field);
  }
  if (field.type === 'SIGNATURE') {
    return rawValue;
  }
  if (field.type === 'DATE') {
    return rawValue || new Date().toISOString().slice(0, 10);
  }
  if (field.type === 'EMAIL') {
    return rawValue || senderEmail.value;
  }
  if (field.type === 'FULL_NAME') {
    return rawValue || senderName.value;
  }
  if (field.type === 'CHECKBOX') {
    return isCheckedValue(rawValue) ? 'checked' : '';
  }
  if (field.type === 'DROPDOWN' || field.type === 'RADIO') {
    return rawValue || getFieldChoices(field)[0] || '';
  }
  return rawValue;
};

const resolveSignatureArtifact = (
  senderFields: DocumentField[],
): { type: 'DRAWN' | 'TYPED' | 'UPLOADED'; data: string } | null => {
  const signatureField =
    senderFields.find((field) => field.type === 'SIGNATURE' && field.value) ??
    senderFields.find((field) => field.type === 'INITIAL' && field.value);
  if (!signatureField) return null;
  const rawValue = (signatureField.value ?? '').trim();
  if (signatureField.type === 'INITIAL') {
    return { type: 'TYPED' as const, data: resolveInitialValueForField(signatureField) };
  }
  if (isSignatureDataUrl(rawValue)) {
    const meta = getSignatureMeta(signatureField);
    const mode = meta?.mode;
    const type = mode === 'draw' ? 'DRAWN' : 'UPLOADED';
    return { type, data: rawValue };
  }
  return { type: 'TYPED' as const, data: rawValue };
};

const fieldStyle = (field: DocumentField, page: number) => {
  const size = pageSizes.value[page];
  if (!size) return {};
  const normalized = resolveNormalizedRect(field, size);
  const width = size.width * scale.value;
  const height = size.height * scale.value;
  const top = normalized.y * height;
  const left = normalized.x * width;
  return {
    top: `${top}px`,
    left: `${left}px`,
    width: `${normalized.width * width}px`,
    height: `${normalized.height * height}px`,
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

const handleFieldClick = (field: DocumentField) => {
  selectField(field.id);
  if (signingIntent.value === 'self') return;
  if (isSignatureField(field)) {
    void openSignatureModal(field);
  } else {
    openFieldModal(field);
  }
};

const activeField = computed(() => fields.value.find((field) => field.id === activeFieldId.value));

const fieldEditorType = computed(() => activeField.value?.type ?? null);
const fieldModalTitle = computed(() => {
  if (!fieldEditorType.value) return 'Field';
  return `${fieldEditorType.value.replace('_', ' ')} options`;
});
const canSaveFieldValue = computed(() => Boolean(fieldEditorType.value));
const canDownloadField = computed(() => {
  const type = fieldEditorType.value;
  if (type === 'IMAGE') return Boolean(fieldStampDraft.value);
  if (type === 'ATTACHMENT') return Boolean(fieldAttachmentDraft.value?.dataUrl);
  return false;
});

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

const resetSignatureEditor = () => {
  signatureMode.value = 'draw';
  signatureFont.value = signatureStyles[0].font;
  typedSignature.value = '';
  signatureImage.value = '';
  signatureStrokes.value = [];
  hasDrawing.value = false;
  isDrawingSignature.value = false;
  signatureError.value = '';
  activeSignatureStroke = null;
  signatureContext = null;
};

const openSignatureModal = async (field: DocumentField) => {
  fieldModalOpen.value = false;
  signatureTargetFieldId.value = field.id;
  resetSignatureEditor();
  const meta = getSignatureMeta(field);
  if (meta?.font) signatureFont.value = meta.font;
  if (meta?.text) typedSignature.value = meta.text;
  const value = field.value ?? '';
  if (value) {
    if (isSignatureDataUrl(value)) {
      signatureImage.value = value;
      signatureMode.value =
        meta?.mode === 'upload' || meta?.mode === 'draw' ? meta.mode : 'upload';
      if (signatureMode.value === 'draw') signatureMode.value = 'upload';
    } else {
      typedSignature.value = value;
      signatureMode.value = meta?.mode ?? 'type';
    }
  } else if (meta?.mode) {
    signatureMode.value = meta.mode;
  }
  signatureModalOpen.value = true;
  await nextTick();
  if (signatureMode.value === 'draw') {
    resizeSignatureCanvas();
  }
};

const closeSignatureModal = () => {
  signatureModalOpen.value = false;
  signatureTargetFieldId.value = null;
  signatureError.value = '';
};

const getSignatureInkColor = () => '#0f172a';

const resizeSignatureCanvas = () => {
  if (!signatureCanvas.value) return;
  const canvas = signatureCanvas.value;
  const ratio = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(width * ratio));
  canvas.height = Math.max(1, Math.floor(height * ratio));
  signatureContext = canvas.getContext('2d');
  if (!signatureContext) return;
  signatureContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  signatureContext.lineWidth = 2.2;
  signatureContext.lineCap = 'round';
  signatureContext.lineJoin = 'round';
  signatureContext.strokeStyle = getSignatureInkColor();
  renderSignatureStrokes();
};

const renderSignatureStrokes = () => {
  if (!signatureCanvas.value || !signatureContext) return;
  signatureContext.clearRect(0, 0, signatureCanvas.value.width, signatureCanvas.value.height);
  signatureContext.beginPath();
  signatureStrokes.value.forEach((stroke) => {
    stroke.forEach((point, index) => {
      if (index === 0) {
        signatureContext?.moveTo(point.x, point.y);
      } else {
        signatureContext?.lineTo(point.x, point.y);
      }
    });
  });
  signatureContext.stroke();
  hasDrawing.value = signatureStrokes.value.some((stroke) => stroke.length > 0);
};

const clearSignatureCanvas = () => {
  if (!signatureCanvas.value || !signatureContext) return;
  signatureContext.clearRect(0, 0, signatureCanvas.value.width, signatureCanvas.value.height);
};

const startSignatureDraw = (event: PointerEvent) => {
  if (signatureMode.value !== 'draw' || !signatureCanvas.value || !signatureContext) return;
  isDrawingSignature.value = true;
  signatureContext.strokeStyle = getSignatureInkColor();
  signatureCanvas.value.setPointerCapture(event.pointerId);
  const rect = signatureCanvas.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  activeSignatureStroke = [{ x, y }];
  signatureStrokes.value = [...signatureStrokes.value, activeSignatureStroke];
  signatureContext.beginPath();
  signatureContext.moveTo(x, y);
};

const drawSignature = (event: PointerEvent) => {
  if (!isDrawingSignature.value || signatureMode.value !== 'draw' || !signatureCanvas.value || !signatureContext) {
    return;
  }
  const rect = signatureCanvas.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  signatureContext.lineTo(x, y);
  signatureContext.stroke();
  activeSignatureStroke?.push({ x, y });
  hasDrawing.value = true;
};

const endSignatureDraw = (event?: PointerEvent) => {
  if (!isDrawingSignature.value || !signatureContext) return;
  signatureContext.closePath();
  isDrawingSignature.value = false;
  if (event && signatureCanvas.value?.hasPointerCapture(event.pointerId)) {
    signatureCanvas.value.releasePointerCapture(event.pointerId);
  }
  hasDrawing.value = signatureStrokes.value.some((stroke) => stroke.length > 0);
};

const clearSignature = () => {
  signatureError.value = '';
  if (signatureMode.value === 'draw') {
    signatureStrokes.value = [];
    hasDrawing.value = false;
    clearSignatureCanvas();
  } else if (signatureMode.value === 'upload') {
    signatureImage.value = '';
  } else {
    typedSignature.value = '';
  }
};

const exportDrawnSignature = () => {
  if (!signatureCanvas.value) return '';
  const canvas = signatureCanvas.value;
  const { width, height } = canvas.getBoundingClientRect();
  const exportScale = window.devicePixelRatio || 1;
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = Math.max(1, Math.floor(width * exportScale));
  exportCanvas.height = Math.max(1, Math.floor(height * exportScale));
  const context = exportCanvas.getContext('2d');
  if (!context) return canvas.toDataURL('image/png');
  context.drawImage(canvas, 0, 0, width, height);
  return exportCanvas.toDataURL('image/png');
};

const renderTypedSignatureDataUrl = (text: string, fontFamily: string) => {
  const trimmed = text.trim();
  if (!trimmed) return '';
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return '';
  const fontSize = 64;
  const padding = 24;
  context.font = `${fontSize}px ${fontFamily}`;
  const metrics = context.measureText(trimmed);
  const width = Math.ceil(metrics.width + padding * 2);
  const height = Math.ceil(fontSize + padding * 2);
  canvas.width = width;
  canvas.height = height;
  context.font = `${fontSize}px ${fontFamily}`;
  context.fillStyle = getSignatureInkColor();
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.fillText(trimmed, width / 2, height / 2);
  return canvas.toDataURL('image/png');
};

const buildSignatureValue = () => {
  if (signatureMode.value === 'draw') {
    return hasDrawing.value ? exportDrawnSignature() : '';
  }
  if (signatureMode.value === 'upload') {
    return signatureImage.value;
  }
  return typedSignature.value.trim();
};

const buildSignatureOptions = (field: DocumentField) => {
  const base =
    field.options && typeof field.options === 'object' ? { ...(field.options as Record<string, unknown>) } : {};
  return {
    ...base,
    signature: {
      mode: signatureMode.value,
      font: signatureMode.value === 'type' ? signatureFont.value : undefined,
      text: signatureMode.value === 'type' ? typedSignature.value.trim() : undefined,
    },
  };
};

const saveSignature = async () => {
  signatureError.value = '';
  if (!doc.value || !signatureTargetFieldId.value) return;
  const field = fields.value.find((item) => item.id === signatureTargetFieldId.value);
  if (!field) return;
  const value = buildSignatureValue();
  if (!value) {
    signatureError.value = 'Add a signature before saving.';
    return;
  }
  const options = buildSignatureOptions(field);
  try {
    const result = await updateField(doc.value.id, field.id, { value, options });
    fields.value = fields.value.map((item) => (item.id === field.id ? { ...item, ...result } : item));
    closeSignatureModal();
  } catch {
    signatureError.value = 'Unable to save signature.';
  }
};

const handleSignatureUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  signatureError.value = '';
  if (!file.type.startsWith('image/')) {
    signatureError.value = 'Upload a valid image file.';
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    signatureImage.value = typeof reader.result === 'string' ? reader.result : '';
  };
  reader.readAsDataURL(file);
  input.value = '';
};

const downloadSignature = () => {
  let dataUrl = '';
  if (signatureMode.value === 'type') {
    dataUrl = renderTypedSignatureDataUrl(typedSignature.value.trim(), signatureFont.value);
  } else if (signatureMode.value === 'upload') {
    dataUrl = signatureImage.value;
  } else {
    dataUrl = exportDrawnSignature();
  }
  if (!dataUrl) return;
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `signature-${Date.now()}.png`;
  link.click();
};

const resetFieldEditor = () => {
  fieldValueDraft.value = '';
  fieldDateDraft.value = '';
  fieldCheckboxDraft.value = false;
  fieldChoicesDraft.value = [];
  fieldChoiceInput.value = '';
  fieldStampDraft.value = '';
  fieldAttachmentDraft.value = null;
  fieldEditorError.value = '';
};

const openFieldModal = (field: DocumentField) => {
  signatureModalOpen.value = false;
  signatureTargetFieldId.value = null;
  resetFieldEditor();
  fieldModalOpen.value = true;
  fieldValueDraft.value = field.value ?? '';
  fieldDateDraft.value = field.value ?? '';
  fieldCheckboxDraft.value = isCheckedValue(field.value);
  fieldChoicesDraft.value = getFieldChoices(field);
  if (field.type === 'DROPDOWN' || field.type === 'RADIO') {
    if (field.value && !fieldChoicesDraft.value.includes(field.value)) {
      fieldChoicesDraft.value = [...fieldChoicesDraft.value, field.value];
    }
  }
  if (field.type === 'IMAGE' && field.value && isSignatureDataUrl(field.value)) {
    fieldStampDraft.value = field.value;
  }
  const attachmentMeta = getAttachmentMeta(field);
  if (attachmentMeta) {
    fieldAttachmentDraft.value = {
      name: attachmentMeta.name ?? field.value ?? 'Attachment',
      type: attachmentMeta.type ?? '',
      dataUrl: attachmentMeta.dataUrl ?? '',
    };
  } else if (field.type === 'ATTACHMENT' && field.value) {
    fieldAttachmentDraft.value = { name: field.value, type: '', dataUrl: '' };
  }
};

const closeFieldModal = () => {
  fieldModalOpen.value = false;
  fieldEditorError.value = '';
};

const addFieldChoice = () => {
  const choice = fieldChoiceInput.value.trim();
  if (!choice) return;
  if (!fieldChoicesDraft.value.includes(choice)) {
    fieldChoicesDraft.value = [...fieldChoicesDraft.value, choice];
  }
  if (!fieldValueDraft.value) {
    fieldValueDraft.value = choice;
  }
  fieldChoiceInput.value = '';
};

const removeFieldChoice = (choice: string) => {
  fieldChoicesDraft.value = fieldChoicesDraft.value.filter((item) => item !== choice);
  if (fieldValueDraft.value === choice) {
    fieldValueDraft.value = fieldChoicesDraft.value[0] ?? '';
  }
};

const handleStampUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  fieldEditorError.value = '';
  if (!file.type.startsWith('image/')) {
    fieldEditorError.value = 'Upload a valid image file.';
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    fieldStampDraft.value = typeof reader.result === 'string' ? reader.result : '';
  };
  reader.readAsDataURL(file);
  input.value = '';
};

const handleAttachmentUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  fieldEditorError.value = '';
  const reader = new FileReader();
  reader.onload = () => {
    fieldAttachmentDraft.value = {
      name: file.name,
      type: file.type || 'Attachment',
      dataUrl: typeof reader.result === 'string' ? reader.result : '',
    };
  };
  reader.readAsDataURL(file);
  input.value = '';
};

const buildFieldValue = (field: DocumentField) => {
  switch (field.type) {
    case 'TEXT':
      return fieldValueDraft.value;
    case 'DATE':
      return fieldDateDraft.value;
    case 'CHECKBOX':
      return fieldCheckboxDraft.value ? 'checked' : '';
    case 'DROPDOWN':
    case 'RADIO':
      return fieldValueDraft.value || fieldChoicesDraft.value[0] || '';
    case 'IMAGE':
      return fieldStampDraft.value;
    case 'ATTACHMENT':
      return fieldAttachmentDraft.value?.name ?? '';
    default:
      return fieldValueDraft.value.trim();
  }
};

const buildFieldOptions = (field: DocumentField) => {
  if (field.type === 'DROPDOWN' || field.type === 'RADIO') {
    return mergeFieldOptions(field, { choices: fieldChoicesDraft.value });
  }
  if (field.type === 'ATTACHMENT') {
    if (!fieldAttachmentDraft.value) {
      return mergeFieldOptions(field, {}, ['attachment']);
    }
    return mergeFieldOptions(field, {
      attachment: {
        name: fieldAttachmentDraft.value.name,
        type: fieldAttachmentDraft.value.type,
        dataUrl: fieldAttachmentDraft.value.dataUrl,
      },
    });
  }
  return field.options && typeof field.options === 'object'
    ? { ...(field.options as Record<string, unknown>) }
    : {};
};

const saveFieldValue = async () => {
  fieldEditorError.value = '';
  if (!doc.value || !activeField.value) return;
  const field = activeField.value;
  if (field.type === 'DROPDOWN' || field.type === 'RADIO') {
    if (fieldChoicesDraft.value.length === 0) {
      fieldEditorError.value = 'Add at least one option.';
      return;
    }
  }
  const value = buildFieldValue(field);
  const options = buildFieldOptions(field);
  try {
    const result = await updateField(doc.value.id, field.id, { value, options });
    fields.value = fields.value.map((item) => (item.id === field.id ? { ...item, ...result } : item));
    closeFieldModal();
  } catch {
    fieldEditorError.value = 'Unable to save field.';
  }
};

const downloadFieldAsset = () => {
  if (fieldEditorType.value === 'IMAGE' && fieldStampDraft.value) {
    const link = document.createElement('a');
    link.href = fieldStampDraft.value;
    link.download = `stamp-${Date.now()}.png`;
    link.click();
    return;
  }
  if (fieldEditorType.value === 'ATTACHMENT' && fieldAttachmentDraft.value?.dataUrl) {
    const link = document.createElement('a');
    link.href = fieldAttachmentDraft.value.dataUrl;
    link.download = fieldAttachmentDraft.value.name || `attachment-${Date.now()}`;
    link.click();
  }
};

const addSigner = () => {
  signerError.value = '';
  const name = newSignerName.value.trim();
  const email = newSignerEmail.value.trim().toLowerCase();
  if (!name || !email) {
    signerError.value = 'Enter the recipient full name and email to add them.';
    return;
  }
  if (!isValidEmail(email)) {
    signerError.value = 'Enter a valid email address.';
    return;
  }
  if (senderEmail.value && email === senderEmail.value) {
    signerError.value = 'Use a recipient email, not your own.';
    return;
  }
  if (signerInputs.value.some((signer) => signer.email === email)) {
    signerError.value = 'That recipient is already added.';
    newSignerEmail.value = '';
    return;
  }
  const nextRecipient = { name, email };
  if (senderSigner.value) {
    signerInputs.value = [senderSigner.value, ...recipientSigners.value, nextRecipient];
  } else {
    signerInputs.value = [...recipientSigners.value, nextRecipient];
  }
  newSignerName.value = '';
  newSignerEmail.value = '';
};

const removeSigner = (email: string) => {
  signerInputs.value = signerInputs.value.filter((signer) => signer.email !== email || signer.isSender);
};

const handleUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  setupError.value = '';
  if (!isPdfFile(file)) {
    setupError.value = 'Only PDF files are supported.';
    input.value = '';
    return;
  }
  const title = documentTitle.value.trim() || file.name.replace(/\.[^/.]+$/, '');
  const created = await uploadDocument({ title, file });
  selectedDocId.value = created.id;
  documentTitle.value = created.title;
  await loadDocument(created.id);
  await proceedToBuilder({ allowMissingSigners: true });
  input.value = '';
};

const handleDocChange = async () => {
  if (!selectedDocId.value) {
    doc.value = null;
    fields.value = [];
    activeFieldId.value = null;
    documentTitle.value = '';
    pageCount.value = 0;
    pageSizes.value = {};
    pdfDoc.value?.destroy();
    pdfDoc.value = null;
    pdfError.value = '';
    pdfLoadToken.value += 1;
    textPreview.value = '';
    textError.value = '';
    textLoadToken.value += 1;
    if (imagePreviewUrl.value) {
      URL.revokeObjectURL(imagePreviewUrl.value);
      imagePreviewUrl.value = '';
    }
    previewUrl.value = '';
    setupError.value = '';
    return;
  }
  await loadDocument(selectedDocId.value);
};

const loadDocument = async (documentId: string) => {
  const isSameDoc = doc.value?.id === documentId;
  const data = await fetchDocument(documentId);
  doc.value = data;
  documentTitle.value = data.title;
  setupError.value = isPdfDocument(data) ? '' : 'Only PDF documents are supported.';
  signatureModalOpen.value = false;
  fieldModalOpen.value = false;
  fields.value = data.fields ?? [];
  if (signingIntent.value === 'self') {
    signerInputs.value = [];
    addSelfSigner();
  } else {
    if (data.signers && data.signers.length > 0) {
      signerInputs.value = data.signers
        .slice()
        .sort((a, b) => a.signOrder - b.signOrder)
        .map((signer) => ({
          name: signer.name ?? undefined,
          email: signer.email,
          isSender: signer.email.toLowerCase() === senderEmail.value,
        }));
    } else if (!isSameDoc) {
      signerInputs.value = [];
    }
    ensureSenderSigner();
  }
  activeFieldId.value = null;
  await preparePreview();
};

const resetPdfPreview = () => {
  pdfDoc.value?.destroy();
  pdfDoc.value = null;
  pageCount.value = 0;
  pageSizes.value = {};
  pdfError.value = '';
  pdfLoadToken.value += 1;
};

const resetTextPreview = () => {
  textLoadToken.value += 1;
  textPreview.value = '';
  textError.value = '';
};

const resetImagePreview = () => {
  if (imagePreviewUrl.value && isBlobUrl(imagePreviewUrl.value)) {
    URL.revokeObjectURL(imagePreviewUrl.value);
  }
  imagePreviewUrl.value = '';
};

const loadPreviewUrl = async () => {
  previewUrl.value = '';
  if (!doc.value?.id) return;
  try {
    if (doc.value?.signedFileUrl) {
      previewUrl.value = doc.value.signedFileUrl;
      return;
    }
    const response = await apiClient.get<{ url: string }>(`/documents/${doc.value.id}/preview-url`);
    previewUrl.value = response.data.url;
  } catch {
    previewUrl.value = doc.value?.signedFileUrl || doc.value?.fileUrl || '';
  }
};

const loadTextPreview = async () => {
  const token = textLoadToken.value + 1;
  textLoadToken.value = token;
  textPreview.value = '';
  textError.value = '';
  if (!doc.value?.id && !fallbackPreviewUrl.value) return;
  try {
    let text: string | null = null;
    if (fallbackPreviewUrl.value) {
      try {
        const response = await fetch(fallbackPreviewUrl.value);
        if (!response.ok) {
          throw new Error('Preview unavailable');
        }
        text = await response.text();
      } catch {
        text = null;
      }
    }
    if (text === null && doc.value?.id) {
      try {
        const response = await apiClient.get<string>(`/documents/${doc.value.id}/file`, {
          responseType: 'text',
        });
        text = response.data;
      } catch {
        text = null;
      }
    }
    if (token !== textLoadToken.value) return;
    if (text === null) {
      textError.value = 'Unable to load text preview.';
      return;
    }
    const maxChars = 12000;
    textPreview.value = text.length > maxChars ? `${text.slice(0, maxChars)}...` : text;
  } catch {
    if (token !== textLoadToken.value) return;
    textError.value = 'Unable to load text preview.';
  }
};

const loadImagePreview = async () => {
  resetImagePreview();
  if (!doc.value?.id && !fallbackPreviewUrl.value) return;
  try {
    if (fallbackPreviewUrl.value) {
      imagePreviewUrl.value = fallbackPreviewUrl.value;
      return;
    }
    if (doc.value?.id) {
      const response = await apiClient.get<Blob>(`/documents/${doc.value.id}/file`, {
        responseType: 'blob',
      });
      imagePreviewUrl.value = URL.createObjectURL(response.data);
    }
  } catch {
    imagePreviewUrl.value = '';
  }
};

const preparePreview = async () => {
  resetPdfPreview();
  resetTextPreview();
  resetImagePreview();
  previewUrl.value = '';
  if (!doc.value?.fileUrl && !doc.value?.signedFileUrl) return;
  await loadPreviewUrl();
  if (!isPdfPreview.value) {
    pdfError.value = 'Only PDF documents are supported for preview.';
    return;
  }
  await loadPdf();
};

const loadPdf = async () => {
  const token = pdfLoadToken.value + 1;
  pdfLoadToken.value = token;
  pdfError.value = '';
  const fallbackUrl = fallbackPreviewUrl.value;
  try {
    let pdf: PDFDocumentProxy | null = null;
    if (doc.value?.signedFileUrl) {
      try {
        pdf = await getDocument(doc.value.signedFileUrl).promise;
      } catch {
        pdf = null;
      }
    }
    if (!pdf && doc.value?.id) {
      try {
        const response = await apiClient.get<ArrayBuffer>(`/documents/${doc.value.id}/file`, {
          responseType: 'arraybuffer',
        });
        if (token !== pdfLoadToken.value) return;
        pdf = await getDocument({ data: response.data }).promise;
      } catch {
        pdf = null;
      }
    }
    if (!pdf && fallbackUrl) {
      try {
        pdf = await getDocument(fallbackUrl).promise;
      } catch {
        pdf = null;
      }
    }
    if (!pdf) {
      throw new Error('Preview unavailable');
    }
    if (token !== pdfLoadToken.value) return;
    pdfDoc.value?.destroy();
    pdfDoc.value = pdf;
    pageCount.value = pdf.numPages;
    pageSizes.value = {};
    await enqueueRenderAllPages(token);
    await enqueueRenderThumbnails(token);
  } catch (err) {
    if (token !== pdfLoadToken.value) return;
    pdfDoc.value?.destroy();
    pdfDoc.value = null;
    pageCount.value = 0;
    pageSizes.value = {};
    pdfError.value = 'Unable to load the PDF preview.';
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

const renderThumbnails = async (token = pdfLoadToken.value) => {
  const pdf = pdfDoc.value;
  if (!pdf) return;
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    if (token !== pdfLoadToken.value) return;
    const page = await pdf.getPage(pageNumber);
    const outputScale = window.devicePixelRatio || 1;
    const viewport = page.getViewport({ scale: 0.2 });
    const renderViewport = page.getViewport({ scale: 0.2 * outputScale });
    const canvas = thumbRefs.get(pageNumber);
    if (!canvas) continue;
    canvas.width = renderViewport.width;
    canvas.height = renderViewport.height;
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    const context = canvas.getContext('2d');
    if (!context) continue;
    await page.render({ canvasContext: context, viewport: renderViewport }).promise;
  }
};

const enqueueRenderAllPages = (token = pdfLoadToken.value) => {
  renderAllPagesQueue = renderAllPagesQueue
    .catch(() => undefined)
    .then(() => renderAllPages(token));
  return renderAllPagesQueue;
};

const enqueueRenderThumbnails = (token = pdfLoadToken.value) => {
  renderThumbnailsQueue = renderThumbnailsQueue
    .catch(() => undefined)
    .then(() => renderThumbnails(token));
  return renderThumbnailsQueue;
};

const zoomIn = async () => {
  scale.value = Math.min(2, scale.value + 0.1);
  await enqueueRenderAllPages();
};

const zoomOut = async () => {
  scale.value = Math.max(0.6, scale.value - 0.1);
  await enqueueRenderAllPages();
};

const scrollToPage = (page: number) => {
  const target = pageRefs.get(page);
  if (!target || !viewerRef.value) return;
  viewerRef.value.scrollTo({ top: target.offsetTop - 12, behavior: 'smooth' });
};

const startPaletteDrag = (type: DocumentField['type']) => {
  if (!isPdfPreview.value) return;
  draggingPaletteType.value = type;
};

const setActivePalette = (type: DocumentField['type']) => {
  if (!isPdfPreview.value) return;
  activePaletteType.value = type;
};

const handleDrop = async (event: DragEvent, page: number) => {
  const type = draggingPaletteType.value;
  if (!type || !doc.value || !isPdfPreview.value) return;
  await createFieldAtPosition(type, event.clientX, event.clientY, page);
  draggingPaletteType.value = null;
};

const handlePageClick = async (event: MouseEvent, page: number) => {
  if (!activePaletteType.value || !doc.value || !isPdfPreview.value) return;
  await createFieldAtPosition(activePaletteType.value, event.clientX, event.clientY, page);
  activePaletteType.value = null;
};

const createFieldAtPosition = async (type: DocumentField['type'], clientX: number, clientY: number, page: number) => {
  if (!doc.value || !isPdfPreview.value) return;
  const pageEl = pageRefs.get(page);
  const size = pageSizes.value[page];
  if (!pageEl || !size) return;
  const rect = pageEl.getBoundingClientRect();
  const x = Math.max(0, clientX - rect.left);
  const y = Math.max(0, clientY - rect.top);
  const defaults = getDefaultFieldSize(type);
  const pdfX = x / scale.value;
  const pdfY = size.height - y / scale.value - defaults.height;
  const normalized = computeNormalizedRect(
    {
      x: pdfX,
      y: Math.max(0, pdfY),
      width: defaults.width,
      height: defaults.height,
    } as DocumentField,
    size,
  );
  const payload = {
    type,
    page,
    x: pdfX,
    y: Math.max(0, pdfY),
    width: defaults.width,
    height: defaults.height,
    required: true,
    signerEmail: getDefaultSignerEmail(type),
    options: { normalized },
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
    const nextField = { ...field, x: pdfX, y: Math.max(0, pdfY) };
    const nextOptions = buildNormalizedOptions(nextField, size);
    fields.value = fields.value.map((item) =>
      item.id === field.id ? { ...nextField, options: nextOptions } : item,
    );
  } else {
    const deltaX = event.clientX - state.startX;
    const deltaY = event.clientY - state.startY;
    const nextWidth = Math.max(40, state.originX + deltaX / scale.value);
    const nextHeight = Math.max(20, state.originY + deltaY / scale.value);
    const nextField = { ...field, width: nextWidth, height: nextHeight };
    const nextOptions = buildNormalizedOptions(nextField, size);
    fields.value = fields.value.map((item) =>
      item.id === field.id ? { ...nextField, options: nextOptions } : item,
    );
  }
};

const handlePointerUp = async () => {
  const state = dragState.value;
  if (!state || !doc.value) return;
  const field = fields.value.find((item) => item.id === state.fieldId);
  const size = pageSizes.value[state.page];
  dragState.value = null;
  if (!field) return;
  await updateField(doc.value.id, field.id, {
    x: field.x,
    y: field.y,
    width: field.width,
    height: field.height,
    options: size ? buildNormalizedOptions(field, size) : field.options,
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
  if (!doc.value || savingDraft.value) return;
  builderError.value = '';
  builderNotice.value = '';
  if (signatureModalOpen.value || fieldModalOpen.value) {
    builderError.value = 'Close the open editor before saving.';
    return;
  }
  savingDraft.value = true;
  try {
    if (activeField.value) {
      await persistActiveField();
    }
    if (fields.value.length > 0) {
      await Promise.all(
        fields.value.map((field) => updateField(doc.value!.id, field.id, buildFieldUpdatePayload(field))),
      );
    }
    await loadDocument(doc.value.id);
    setBuilderNotice('Draft saved.');
  } catch {
    builderError.value = 'Unable to save draft.';
  } finally {
    savingDraft.value = false;
  }
};

const signNowAndSend = async () => {
  builderError.value = '';
  builderNotice.value = '';
  if (signingNow.value || savingDraft.value) return;
  if (!doc.value) return;
  if (!isPdfPreview.value) {
    builderError.value = 'Convert this document to PDF before signing.';
    return;
  }
  if (signingIntent.value !== 'send') {
    builderError.value = 'Switch to send mode to sign and invite recipients.';
    return;
  }
  if (!hasValidSigners.value) {
    builderError.value = 'Add at least one recipient before signing.';
    return;
  }
  if (!senderEmail.value) {
    builderError.value = 'Add your email before signing.';
    return;
  }
  if (signatureModalOpen.value || fieldModalOpen.value) {
    builderError.value = 'Close the open editor before signing.';
    return;
  }
  const senderFieldsBeforeSave = getSenderFields();
  if (senderFieldsBeforeSave.length === 0) {
    builderError.value = 'Assign at least one field to yourself before signing.';
    return;
  }
  const senderSignatureFields = senderFieldsBeforeSave.filter(isSignatureField);
  if (senderSignatureFields.length === 0) {
    builderError.value = 'Add a signature or initial field for yourself before signing.';
    return;
  }
  if (senderSignatureFields.some((field) => !(field.value ?? '').trim())) {
    builderError.value = 'Add your signature or initials to all of your signature fields before signing.';
    return;
  }
  if (fields.value.length === 0) {
    builderError.value = 'Place at least one field before signing.';
    return;
  }

  signingNow.value = true;
  try {
    await saveDraft();
    if (!doc.value || builderError.value) return;

    const orderedSigners = [
      senderSigner.value ?? { name: senderName.value, email: senderEmail.value },
      ...recipientSigners.value,
    ];
    const response = await sendDocument(doc.value.id, {
      signers: orderedSigners.map((signer, index) => ({
        email: signer.email,
        name: signer.name,
        order: index + 1,
      })),
      inviteStrategy: 'sequential',
    });

    const signingToken = response.signingToken;
    if (!signingToken) {
      builderError.value = 'Unable to start the signing session.';
      return;
    }

    const senderFields = getSenderFields();
    const signatureArtifact = resolveSignatureArtifact(senderFields);
    if (!signatureArtifact) {
      builderError.value = 'Add a signature before signing.';
      return;
    }

    const correlationId = createId();
    const session = await createSigningSession(doc.value.id, signingToken, createId(), correlationId);
    const fieldsPayload = senderFields.map((field) => ({
      fieldId: field.id,
      value: resolveSenderFieldValue(field),
    }));

    await submitManifest({
      docId: doc.value.id,
      signingToken,
      signingSessionId: session.data.signingSessionId,
      fields: fieldsPayload,
      correlationId,
    });

    await uploadSignature({
      docId: doc.value.id,
      signingToken,
      signingSessionId: session.data.signingSessionId,
      type: signatureArtifact.type,
      data: signatureArtifact.data,
      correlationId,
    });

    await applySignature({
      docId: doc.value.id,
      signingToken,
      signingSessionId: session.data.signingSessionId,
      correlationId,
    });

    await loadDocument(doc.value.id);
    setBuilderNotice('Signature applied. Inviting the next signer.');
  } catch (err) {
    builderError.value = err instanceof Error ? err.message : 'Unable to sign and send.';
  } finally {
    signingNow.value = false;
  }
};

const sendForSigning = async () => {
  builderError.value = '';
  builderNotice.value = '';
  if (savingDraft.value || signingNow.value) return;
  if (!doc.value) return;
  if (!isPdfPreview.value) {
    builderError.value = 'Convert this document to PDF before sending for signatures.';
    return;
  }
  if (!hasValidSigners.value) {
    builderError.value = signingIntent.value === 'self'
      ? 'Add your email before starting the signing session.'
      : 'Add at least one signer before sending.';
    return;
  }
  if (!senderEmail.value) {
    builderError.value = 'Add your email before starting the signing session.';
    return;
  }
  if (fields.value.length === 0) {
    builderError.value = 'Place at least one field before sending.';
    return;
  }
  if (signingIntent.value === 'send') {
    const hasSenderFields = fields.value.some(
      (field) => field.signerEmail?.toLowerCase() === senderEmail.value,
    );
    if (!hasSenderFields) {
      builderError.value = 'Assign at least one field to yourself before sending.';
      return;
    }
  }
  if (signingIntent.value === 'self') {
    await saveDraft();
    if (builderError.value) return;
    builderNotice.value = '';
  }
  const orderedSigners = signingIntent.value === 'send'
    ? [senderSigner.value ?? { name: senderName.value, email: senderEmail.value }, ...recipientSigners.value]
    : [{ name: senderName.value, email: senderEmail.value }];
  const response = await sendDocument(doc.value.id, {
    signers: orderedSigners.map((signer, index) => ({
      email: signer.email,
      name: signer.name,
      order: index + 1,
    })),
    inviteStrategy: 'sequential',
  });
  if (signingIntent.value === 'self') {
    await refresh();
  }
  if (response.signingToken) {
    await router.push(`/sign/${response.signingToken}`);
    return;
  }
  await loadDocument(doc.value.id);
};

const proceedToBuilder = async (options?: { allowMissingSigners?: boolean }) => {
  setupError.value = '';
  if (!doc.value) {
    setupError.value = 'Select or upload a PDF to continue.';
    return;
  }
  if (!isPdfPreview.value) {
    setupError.value = 'Only PDF documents are supported for preview.';
    return;
  }
  if (!hasValidSigners.value && !options?.allowMissingSigners) {
    setupError.value = signingIntent.value === 'self'
      ? 'Add your email to continue.'
      : 'Add at least one recipient to continue.';
    return;
  }
  workflowStep.value = 2;
  builderError.value = '';
  await nextTick();
  if (pdfDoc.value) {
    await enqueueRenderAllPages();
    await enqueueRenderThumbnails();
  }
};

watch(scale, () => {
  void enqueueRenderAllPages();
});

watch(signatureModalOpen, (open) => {
  if (open) {
    window.addEventListener('resize', resizeSignatureCanvas);
  } else {
    window.removeEventListener('resize', resizeSignatureCanvas);
  }
});

watch(signatureMode, async (mode) => {
  if (!signatureModalOpen.value) return;
  if (mode === 'draw') {
    await nextTick();
    resizeSignatureCanvas();
  }
});

watch(email, () => {
  if (signingIntent.value === 'self') {
    addSelfSigner();
    return;
  }
  if (signingIntent.value === 'send') {
    ensureSenderSigner();
  }
});

watch(workflowStep, async (step) => {
  if (step !== 2 || !pdfDoc.value || !isPdfPreview.value) return;
  await nextTick();
  await enqueueRenderAllPages();
  await enqueueRenderThumbnails();
});

onMounted(async () => {
  window.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('pointerup', handlePointerUp);
  await refresh();
});

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointerMove);
  window.removeEventListener('pointerup', handlePointerUp);
  window.removeEventListener('resize', resizeSignatureCanvas);
  if (builderNoticeTimer) {
    window.clearTimeout(builderNoticeTimer);
    builderNoticeTimer = null;
  }
  pdfLoadToken.value += 1;
  pdfDoc.value?.destroy();
  pdfDoc.value = null;
  if (imagePreviewUrl.value && isBlobUrl(imagePreviewUrl.value)) {
    URL.revokeObjectURL(imagePreviewUrl.value);
    imagePreviewUrl.value = '';
  }
});
</script>

<style scoped>
.sign-builder {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.workflow-header {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  background: linear-gradient(135deg, var(--surface), var(--surface-2));
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.2rem 1.4rem;
  box-shadow: var(--shadow-md);
}

.header-left {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.header-title {
  display: grid;
  gap: 0.2rem;
}

.eyebrow {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.header-title h2 {
  margin: 0;
  font-size: 1.4rem;
  color: var(--ink-strong);
}

.subtitle {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.stepper {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  flex-wrap: wrap;
}

.step {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--muted);
}

.step.done {
  color: var(--accent);
  border-color: rgba(51, 92, 255, 0.3);
  background: rgba(51, 92, 255, 0.08);
}

.step.active {
  color: var(--ink-strong);
  border-color: var(--accent);
  background: rgba(51, 92, 255, 0.14);
}

.step-index {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 1px solid currentColor;
  font-size: 0.75rem;
}

.stage {
  min-height: 60vh;
}

.stage-choice {
  display: grid;
  align-items: center;
}

.choice-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 280px));
  justify-content: center;
  gap: 1.2rem;
}

.choice-card {
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 1.6rem;
  display: grid;
  gap: 1rem;
  background: linear-gradient(160deg, var(--surface), rgba(51, 92, 255, 0.06));
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.choice-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
}

.choice-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(51, 92, 255, 0.12);
  color: var(--accent);
}

.choice-icon svg {
  width: 22px;
  height: 22px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
}

.choice-copy h3 {
  margin: 0;
  color: var(--ink-strong);
  font-size: 1.1rem;
}

.choice-copy p {
  margin: 0.4rem 0 0;
  color: var(--muted);
}

.choice-cta {
  font-weight: 700;
  color: var(--accent);
}

.stage-setup {
  display: grid;
  align-items: start;
  position: relative;
}

.setup-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.2rem;
}

.setup-main {
  display: grid;
  gap: 1rem;
}

.setup-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: var(--shadow-md);
  display: grid;
  gap: 1rem;
}

.setup-header h3 {
  margin: 0;
  color: var(--ink-strong);
}

.setup-header p {
  margin: 0.4rem 0 0;
  color: var(--muted);
}

.setup-actions {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.summary-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.2rem 1.4rem;
  box-shadow: var(--shadow-md);
  display: grid;
  gap: 0.6rem;
}

.summary-card h4 {
  margin: 0;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
}

.summary-title {
  margin: 0;
  font-weight: 700;
  color: var(--ink-strong);
  font-size: 1.05rem;
}

.summary-sub {
  margin: 0;
  color: var(--muted);
}

.summary-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-size: 0.75rem;
  color: var(--muted);
}

.setup-panel {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem;
  box-shadow: var(--shadow-md);
  display: grid;
  gap: 1rem;
  align-content: start;
}

.upload-block {
  width: 100%;
  text-align: center;
}

.self-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 0.8rem;
  background: var(--surface-2);
}

.self-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--accent);
  color: #fff;
  font-weight: 700;
}

.self-name {
  margin: 0;
  font-weight: 700;
  color: var(--ink-strong);
}

.self-email {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.builder-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  flex-wrap: wrap;
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

.doc-select {
  position: relative;
  width: 100%;
}

.doc-select select {
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--line);
  padding: 0 2rem 0 0.9rem;
  width: 100%;
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

.input[readonly] {
  background: var(--surface-2);
  color: var(--muted);
}

.builder-error {
  margin: 0;
  color: var(--danger);
  font-size: 0.9rem;
}

.builder-success {
  margin: 0;
  color: var(--success);
  font-size: 0.9rem;
}

.builder-note {
  margin: 0;
  color: var(--muted);
  font-size: 0.85rem;
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

.builder-body--compact {
  grid-template-columns: minmax(0, 1fr) 280px;
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

.preview-frame {
  width: 100%;
  height: clamp(360px, 70vh, 860px);
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid var(--line);
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.image-preview img {
  width: 100%;
  height: auto;
  border-radius: 16px;
  border: 1px solid var(--line);
  display: block;
  background: #ffffff;
}

.text-preview {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid var(--line);
  padding: 1rem;
  max-height: clamp(360px, 70vh, 860px);
  overflow: auto;
  font-size: 0.85rem;
  color: var(--ink);
}

.text-preview pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'Space Mono', 'Consolas', 'Courier New', monospace;
}

.preview-error {
  margin: 0;
  color: var(--danger);
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

.field.signature {
  border-color: var(--accent);
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

.field-value {
  color: var(--muted);
  font-size: 0.7rem;
}

.signature-render {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
  z-index: 0;
}

.signature-render img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.signature-text {
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink-strong);
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
  border-radius: 20px;
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

.upload-preview {
  border-radius: 14px;
  border: 1px solid var(--line);
  background: var(--surface-2);
  padding: 0.6rem;
}

.upload-preview img {
  width: 100%;
  height: 140px;
  object-fit: contain;
}

.signature-style-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.6rem;
}

.signature-style {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  padding: 0.7rem;
  display: grid;
  gap: 0.4rem;
  text-align: left;
  cursor: pointer;
}

.signature-style.active {
  border-color: var(--accent);
  background: rgba(79, 70, 229, 0.08);
}

.style-preview {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ink-strong);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.style-label {
  font-size: 0.75rem;
  color: var(--muted);
}

.signature-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.link-btn {
  border: none;
  background: none;
  color: var(--muted);
  font-weight: 600;
  cursor: pointer;
}

.action-spacer {
  flex: 1;
}

.field-modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 60;
}

.field-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(2px);
}

.field-dialog {
  position: relative;
  width: min(680px, 92vw);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: var(--shadow-lg);
  display: grid;
  gap: 1rem;
  z-index: 1;
}

.field-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.field-body {
  display: grid;
  gap: 0.9rem;
}

.field-textarea {
  min-height: 120px;
}

.choice-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.6rem;
  align-items: center;
}

.choice-list {
  display: grid;
  gap: 0.5rem;
}

.choice-item {
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 0.5rem 0.6rem;
  background: var(--surface-2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
}

.attachment-preview {
  border-radius: 12px;
  border: 1px solid var(--line);
  padding: 0.6rem 0.8rem;
  background: var(--surface-2);
  display: grid;
  gap: 0.2rem;
}

.attachment-name {
  margin: 0;
  font-weight: 600;
  color: var(--ink-strong);
}

.attachment-meta {
  margin: 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.field-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
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

.palette-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

.sign-builder {
  gap: 1rem;
}

.sign-builder,
.sign-builder * {
  border-radius: 0;
}

.sign-builder .btn {
  padding: 0.45rem 0.9rem;
  font-size: 0.82rem;
  border-radius: 0;
  box-shadow: none;
}

.sign-builder .btn-primary {
  background: var(--accent);
  box-shadow: none;
}

.sign-builder .btn-primary:hover {
  transform: none;
  background: var(--accent-strong);
}

.sign-builder .btn-outline {
  background: transparent;
  border-color: var(--line);
  color: var(--ink);
}

.sign-builder .btn-outline:hover {
  border-color: var(--accent);
}

.sign-builder .icon-btn {
  border: 1px solid var(--line);
  background: transparent;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1;
}

.sign-builder .icon-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.signature-canvas {
  background: #ffffff;
}

.workflow-header {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--line);
  padding: 0 0 1rem;
  box-shadow: none;
}

.choice-card {
  background: transparent;
  border: 1px solid var(--line);
  box-shadow: none;
  transition: border-color 0.2s ease;
  display: grid;
  align-content: center;
  justify-items: center;
  text-align: center;
  gap: 0.6rem;
  padding: 1rem;
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1 / 1;
}

.choice-card:hover {
  transform: none;
  box-shadow: none;
  border-color: var(--accent);
}

.choice-icon {
  background: transparent;
  border: 1px solid var(--line);
  width: 34px;
  height: 34px;
}

.choice-icon svg {
  width: 18px;
  height: 18px;
}

.choice-copy:empty {
  display: none;
}

.choice-cta {
  font-size: 0.85rem;
}

.setup-card,
.summary-card,
.setup-panel,
.builder-topbar {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0.8rem 0;
}

.setup-card,
.summary-card,
.setup-panel {
  border-bottom: 1px solid var(--line);
}

.setup-panel {
  padding-bottom: 1.2rem;
}

.builder-topbar {
  border-bottom: 1px solid var(--line);
}

.setup-actions {
  gap: 0.6rem;
}

.setup-actions .btn,
.builder-topbar .btn {
  padding: 0.35rem 0.75rem;
  font-size: 0.78rem;
  min-height: 32px;
}

.status-pill {
  border: 1px solid var(--line);
  background: transparent;
}

.status-pill.success {
  background: transparent;
}

.status-pill.warning {
  background: transparent;
}

.status-pill.danger {
  background: transparent;
}

.status-pill.neutral {
  background: transparent;
}

.step {
  border: none;
  background: transparent;
  padding: 0.2rem 0;
  border-bottom: 2px solid transparent;
}

.step.done {
  border-bottom-color: var(--line);
}

.step.active {
  border-bottom-color: var(--accent);
}

.step-index {
  border: 1px solid var(--line);
}

.self-card,
.signer-row {
  border: none;
  border-bottom: 1px solid var(--line);
  background: transparent;
  padding: 0.5rem 0;
}

.signer-row:last-child,
.self-card:last-child {
  border-bottom: none;
}

.doc-select select,
.upload-btn,
.type-input,
.signature-canvas,
.type-preview,
.upload-preview,
.signature-area,
.tab-btn,
.signature-style {
  border-radius: 0;
}

.upload-btn {
  border: 1px solid var(--line);
  background: transparent;
}

.builder-body {
  border: 1px solid var(--line);
  background: var(--surface);
  gap: 0;
}

.builder-body--compact {
  grid-template-columns: minmax(0, 1fr) 280px;
}

.left-panel,
.right-panel,
.center-panel {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 1rem;
}

.left-panel {
  border-right: 1px solid var(--line);
}

.center-panel {
  border-right: 1px solid var(--line);
}

.viewer {
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 0;
}

.thumb-card {
  border: none;
  background: transparent;
  padding: 0;
}

.thumb-canvas {
  border: 1px solid var(--line);
}

.page-wrap,
.pdf-canvas,
.preview-frame,
.text-preview,
.image-preview img {
  border-radius: 0;
  box-shadow: none;
}

.field {
  border-width: 1px;
  background: rgba(51, 92, 255, 0.06);
  padding: 0.15rem 0.25rem;
  font-size: 0.7rem;
}

.field.signature {
  border-color: var(--accent-strong);
  background: rgba(51, 92, 255, 0.12);
}

.page-wrap .field-label,
.page-wrap .field-value,
.page-wrap .signature-text {
  color: #0f172a;
}

.page-wrap .field-label {
  display: none;
}

.field-label {
  font-size: 0.65rem;
  letter-spacing: 0.02em;
}

.pdf-error {
  border: 1px solid var(--line);
  background: transparent;
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

.signature-dialog,
.field-dialog {
  border: 1px solid var(--line);
  box-shadow: none;
  background: var(--surface);
}

.choice-item {
  border: none;
  border-bottom: 1px solid var(--line);
  background: transparent;
}

.choice-item:last-child {
  border-bottom: none;
}

.attachment-preview {
  border: 1px solid var(--line);
  background: transparent;
}

.setup-shell {
  position: relative;
  min-height: 70vh;
}

.setup-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  backdrop-filter: blur(2px);
  z-index: 20;
}

.setup-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: min(520px, 100%);
  height: 100vh;
  background: var(--surface);
  border-left: 1px solid var(--line);
  box-shadow: -18px 0 40px rgba(15, 23, 42, 0.25);
  z-index: 30;
  padding: 1rem 1.4rem 2rem;
  display: grid;
  gap: 1rem;
  overflow-y: auto;
  animation: setup-drawer-slide 220ms ease;
}

.setup-drawer-top {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.setup-drawer-pill {
  flex: 1;
  border: 1px solid var(--line);
  background: var(--surface-2);
  padding: 0.45rem 0.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  font-size: 0.8rem;
}

.drawer-title {
  font-weight: 600;
  color: var(--ink);
}

.drawer-meta {
  color: var(--muted);
  font-size: 0.75rem;
}

.setup-header {
  display: grid;
  gap: 0.35rem;
}

.setup-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.panel-icon {
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  flex-shrink: 0;
}

.panel-icon svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.summary-card h4 {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

@keyframes setup-drawer-slide {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@media (max-width: 1200px) {
  .workflow-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .setup-grid {
    grid-template-columns: 1fr;
  }

  .builder-body {
    grid-template-columns: 1fr;
  }

  .left-panel,
  .right-panel {
    order: 1;
  }
}

@media (max-width: 960px) {
  .choice-grid {
    grid-template-columns: minmax(0, 280px);
    justify-content: center;
  }

  .setup-drawer {
    width: 100%;
    border-left: none;
  }
}
</style>
