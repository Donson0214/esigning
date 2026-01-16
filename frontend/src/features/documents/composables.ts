import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { AnyEventEnvelope, DocumentSummary } from '@shared/events';
import { connectSocket, joinDocument, leaveDocument, onSocketEvent, syncDocumentEvents } from '@/shared/lib/socket';
import { listDocuments, getDocument, completeDocument as completeDocumentApi, getReceivedSummary } from './api';
import type { Document } from './types';
import { documentReducer, type DocumentMachineState } from './state-machine';
import { createDocumentOptimisticManager, optimisticDocumentCompleted } from './optimistic';

export const useDocuments = () => {
  const documents = ref<Document[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const presence = ref<Record<string, number>>({});

  const refresh = async () => {
    loading.value = true;
    error.value = null;
    try {
      documents.value = await listDocuments();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unable to load documents.';
    } finally {
      loading.value = false;
    }
  };

  const applySummary = (summary: DocumentSummary) => {
    const index = documents.value.findIndex((doc: Document) => doc.id === summary.id);
    if (index === -1) {
      void refresh();
      return;
    }
    const current = documents.value[index];
    const next: Document = {
      ...current,
      title: summary.title,
      status: summary.status,
      version: summary.version,
      updatedAt: summary.updatedAt ?? current.updatedAt,
    };
    documents.value = [
      ...documents.value.slice(0, index),
      next,
      ...documents.value.slice(index + 1),
    ];
  };

  const applyEvent = (event: AnyEventEnvelope) => {
    if (event.event === 'doc.created') {
      applySummary(event.data.document);
      return;
    }
    if (event.event === 'doc.signer.joined' && event.docId) {
      presence.value[event.docId] = (presence.value[event.docId] ?? 0) + 1;
      return;
    }
    if (event.event === 'doc.signer.left' && event.docId) {
      presence.value[event.docId] = Math.max(0, (presence.value[event.docId] ?? 1) - 1);
      return;
    }
    if (event.event === 'doc.deleted') {
      const docId = event.data.documentId;
      documents.value = documents.value.filter((doc: Document) => doc.id !== docId);
      if (docId) {
        const nextPresence = { ...presence.value };
        delete nextPresence[docId];
        presence.value = nextPresence;
      }
      return;
    }
    if (event.event === 'doc.updated' || event.event === 'doc.completed') {
      const summary = event.data.document;
      const current = documents.value.find((doc: Document) => doc.id === summary.id);
      if (current && summary.version <= current.version) return;
      applySummary(summary);
    }
  };

  let unsubscribe: (() => void) | null = null;

  onMounted(async () => {
    connectSocket();
    unsubscribe = onSocketEvent(applyEvent);
    await refresh();
  });

  onBeforeUnmount(() => {
    unsubscribe?.();
  });

  return {
    documents,
    loading,
    error,
    refresh,
    presence,
  };
};

export const useDocument = (documentId: string) => {
  const doc = ref<Document | null>(null);
  const machine = ref<DocumentMachineState>({ state: 'DRAFT', doc: null });
  const loading = ref(false);
  const error = ref<string | null>(null);
  const optimisticManager = createDocumentOptimisticManager();

  const updateMachine = (nextDoc: Document) => {
    machine.value = documentReducer(machine.value, { type: 'DOC_UPDATED', doc: {
      status: nextDoc.status,
      lockedAt: nextDoc.lockedAt ?? null,
      version: nextDoc.version,
      signers: nextDoc.signers?.map((signer) => ({
        id: signer.id,
        status: signer.status,
        signOrder: signer.signOrder,
      })),
    }});
  };

  const fetchDoc = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await getDocument(documentId);
      doc.value = data;
      machine.value = documentReducer(machine.value, {
        type: 'DOC_LOADED',
        doc: {
          status: data.status,
          lockedAt: data.lockedAt ?? null,
          version: data.version,
          signers: data.signers?.map((signer) => ({
            id: signer.id,
            status: signer.status,
            signOrder: signer.signOrder,
          })),
        },
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unable to load document.';
    } finally {
      loading.value = false;
    }
  };

  const completeDocument = async () => {
    if (!doc.value) return;
    const optimistic = optimisticDocumentCompleted(optimisticManager, doc.value);
    doc.value = optimistic.nextState;
    updateMachine(optimistic.nextState);
    try {
      const result = await completeDocumentApi(doc.value.id, optimistic.mutation.correlationId);
      doc.value = optimisticManager.confirm(
        doc.value,
        optimistic.mutation.id,
        result.data,
      );
      updateMachine(doc.value);
    } catch (err) {
      doc.value = optimisticManager.reject(doc.value, optimistic.mutation.id);
      updateMachine(doc.value);
      error.value = err instanceof Error ? err.message : 'Unable to complete document.';
    }
  };

  const applyEvent = (event: AnyEventEnvelope) => {
    if (!doc.value || event.docId !== doc.value.id) return;
    if (event.event === 'doc.updated' || event.event === 'doc.completed') {
      const summary = event.data.document;
      if (summary.version <= doc.value.version) return;
      doc.value = optimisticManager.reconcile({
        ...doc.value,
        title: summary.title,
        status: summary.status,
        version: summary.version,
        updatedAt: summary.updatedAt ?? doc.value.updatedAt,
      });
      updateMachine(doc.value);
    }
  };

  let unsubscribe: (() => void) | null = null;

  onMounted(async () => {
    connectSocket();
    joinDocument(documentId);
    unsubscribe = onSocketEvent(applyEvent);
    await fetchDoc();
    const replay = await syncDocumentEvents(documentId, 25);
    replay.events.forEach((event) => applyEvent(event));
  });

  onBeforeUnmount(() => {
    leaveDocument(documentId);
    unsubscribe?.();
  });

  return {
    doc,
    machine: computed(() => machine.value),
    loading,
    error,
    fetchDoc,
    completeDocument,
  };
};

const receivedPendingCount = ref(0);
const receivedTotalCount = ref(0);
const receivedLoading = ref(false);
const receivedError = ref<string | null>(null);
let receivedListenerAttached = false;
let receivedAuthListenerAttached = false;

const getAuthToken = () => {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

const refreshReceivedSummary = async () => {
  receivedLoading.value = true;
  receivedError.value = null;
  const token = getAuthToken();
  if (!token) {
    receivedPendingCount.value = 0;
    receivedTotalCount.value = 0;
    receivedLoading.value = false;
    return;
  }
  try {
    connectSocket(token);
    const summary = await getReceivedSummary();
    receivedPendingCount.value = summary.pendingCount;
    receivedTotalCount.value = summary.total;
  } catch (err) {
    const status = (err as { response?: { status?: number } })?.response?.status;
    if (status === 401) {
      receivedPendingCount.value = 0;
      receivedTotalCount.value = 0;
      receivedError.value = null;
      return;
    }
    receivedError.value = err instanceof Error ? err.message : 'Unable to load received summary.';
  } finally {
    receivedLoading.value = false;
  }
};

const handleReceivedEvent = (event: AnyEventEnvelope) => {
  if (event.event === 'notification.created' || event.event === 'notification.read') {
    void refreshReceivedSummary();
  }
};

const attachReceivedListener = () => {
  if (receivedListenerAttached) return;
  receivedListenerAttached = true;
  connectSocket();
  onSocketEvent(handleReceivedEvent);
  void refreshReceivedSummary();
};

const attachReceivedAuthListener = () => {
  if (receivedAuthListenerAttached || typeof window === 'undefined') return;
  receivedAuthListenerAttached = true;
  window.addEventListener('auth:updated', () => {
    void refreshReceivedSummary();
  });
};

export const useReceivedSummary = () => {
  onMounted(() => {
    attachReceivedListener();
    attachReceivedAuthListener();
  });

  return {
    pendingCount: computed(() => receivedPendingCount.value),
    totalCount: computed(() => receivedTotalCount.value),
    loading: computed(() => receivedLoading.value),
    error: computed(() => receivedError.value),
    refresh: refreshReceivedSummary,
  };
};
