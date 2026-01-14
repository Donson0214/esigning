import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { EventEnvelope } from '@shared/events';
import { connectSocket, joinDocument, leaveDocument, onSocketEvent, syncDocumentEvents } from '@/shared/lib/socket';
import { listDocuments, getDocument, completeDocument as completeDocumentApi } from './api';
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

  const applyEvent = (event: EventEnvelope) => {
    if (event.event === 'doc.created') {
      documents.value = [event.data.document as Document, ...documents.value];
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
    if (event.event === 'doc.updated' || event.event === 'doc.completed') {
      documents.value = documents.value.map((doc) => {
        if (doc.id !== event.docId) return doc;
        const incoming = event.data.document as Document;
        if (incoming.version <= doc.version) return doc;
        return { ...doc, ...incoming };
      });
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

  const applyEvent = (event: EventEnvelope) => {
    if (!doc.value || event.docId !== doc.value.id) return;
    if (event.event === 'doc.updated' || event.event === 'doc.completed') {
      const incoming = event.data.document as Document;
      if (incoming.version <= doc.value.version) return;
      doc.value = optimisticManager.reconcile({ ...doc.value, ...incoming });
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
