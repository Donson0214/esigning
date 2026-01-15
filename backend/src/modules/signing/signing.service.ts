import {
  AuditActorType,
  AuditEventType,
  DocumentStatus,
  SignerStatus,
} from '@prisma/client';
import { prisma } from '../../config/prisma';
import { hashToken } from '../../utils/crypto.util';
import { createHttpError } from '../../utils/http-error.util';
import { createEvent } from '../../shared/events';
import { emitEvent } from '../../realtime/socket';
import { env } from '../../config/env';
import { dispatchNotification } from '../notifications/notification.service';
import { createSignedUrl, downloadStoredFile } from '../../utils/supabase.util';
import { isSignerInOrder } from '../../utils/signing-order.util';
import {
  applySignature as applySignatureFlow,
  completeDocument as completeDocumentFlow,
  createSigningSession as createSigningSessionFlow,
  submitManifest as submitManifestFlow,
  uploadSignatureArtifact as uploadSignatureArtifactFlow,
} from './signing-integrity.service';
import type { SubmitSignatureInput } from './signing.types';

type RequestMeta = {
  ipAddress?: string;
  userAgent?: string;
  correlationId?: string;
};

async function getSignerByToken(token: string) {
  const signer = await prisma.signer.findFirst({
    where: { signingTokenHash: hashToken(token) },
    include: {
      document: true,
      fields: true,
      signatures: true,
    },
  });
  if (!signer) {
    throw createHttpError(404, 'SIGNING_LINK_INVALID', 'Signing link is invalid');
  }
  if (signer.signingTokenExpiresAt && signer.signingTokenExpiresAt < new Date()) {
    throw createHttpError(410, 'SIGNING_LINK_EXPIRED', 'Signing link has expired');
  }
  return signer;
}

export async function viewSigningSession(token: string, meta: RequestMeta) {
  const signer = await getSignerByToken(token);
  const now = new Date();

  if (!signer.viewedAt) {
    await prisma.$transaction(async (tx) => {
      await tx.signer.update({
        where: { id: signer.id },
        data: {
          status: SignerStatus.VIEWED,
          viewedAt: now,
        },
      });

      if (signer.document.status === DocumentStatus.SENT) {
        await tx.document.update({
          where: { id: signer.documentId },
          data: {
            status: DocumentStatus.VIEWED,
            viewedAt: now,
            version: { increment: 1 },
          },
        });
      }

      const auditEvent = await tx.auditEvent.create({
        data: {
          documentId: signer.documentId,
          actorType: AuditActorType.SIGNER,
          actorSignerId: signer.id,
          eventType: AuditEventType.DOCUMENT_VIEWED,
          ipAddress: meta.ipAddress,
          userAgent: meta.userAgent,
        },
      });

      await emitEvent(
        createEvent({
          event: 'doc.viewed',
          orgId: signer.document.ownerId,
          docId: signer.documentId,
          actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
          correlationId: meta.correlationId,
          data: { signerId: signer.id, viewedAt: now.toISOString() },
        }),
      );

      await emitEvent(
        createEvent({
          event: 'doc.signer.status.changed',
          orgId: signer.document.ownerId,
          docId: signer.documentId,
          actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
          correlationId: meta.correlationId,
          data: {
            signer: {
              id: signer.id,
              email: signer.email,
              name: signer.name,
              status: SignerStatus.VIEWED,
              order: signer.signOrder,
              viewedAt: now.toISOString(),
              signedAt: signer.signedAt?.toISOString() ?? null,
            },
            previousStatus: signer.status,
          },
        }),
      );

      await emitEvent(
        createEvent({
          event: 'doc.audit.appended',
          orgId: signer.document.ownerId,
          docId: signer.documentId,
          actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
          correlationId: meta.correlationId,
          data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
        }),
      );
    });

    const signerName = signer.name ?? signer.email;
    try {
      await dispatchNotification({
        eventType: 'document.viewed',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        recipientUserId: signer.document.ownerId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        title: 'Document viewed',
        message: `${signerName} viewed "${signer.document.title}".`,
        link: `${env.appBaseUrl}/app/audit-trail`,
        idempotencyKey: `document-viewed:${signer.id}`,
        payload: {
          documentId: signer.documentId,
          documentTitle: signer.document.title,
          signerId: signer.id,
          signerEmail: signer.email,
        },
      });
    } catch (err) {
      console.warn('Notification dispatch failed', err);
    }
  }

  const signers = await prisma.signer.findMany({
    where: { documentId: signer.documentId },
    select: {
      id: true,
      email: true,
      name: true,
      status: true,
      signOrder: true,
    },
    orderBy: { signOrder: 'asc' },
  });
  const pendingSigners = signers.filter(
    (item) => item.status !== SignerStatus.SIGNED && item.status !== SignerStatus.DECLINED,
  );
  const currentSigner = pendingSigners[0] ?? null;
  const isDocActive = ![
    DocumentStatus.COMPLETED,
    DocumentStatus.DECLINED,
    DocumentStatus.EXPIRED,
  ].includes(signer.document.status);
  const isSignerActive =
    signer.status !== SignerStatus.SIGNED && signer.status !== SignerStatus.DECLINED;
  const isInOrder = signers.length === 0 || isSignerInOrder(signers, signer.id);
  const canSign = isDocActive && isSignerActive && isInOrder;

  const filePath =
    signer.document.signedFileUrl ||
    signer.document.signedFilePublicId ||
    signer.document.fileUrl ||
    signer.document.filePublicId;
  return {
    signer: {
      id: signer.id,
      name: signer.name,
      email: signer.email,
      status: signer.status,
      order: signer.signOrder,
      canSign,
    },
    signingOrder: {
      currentSigner: currentSigner
        ? {
            id: currentSigner.id,
            name: currentSigner.name,
            email: currentSigner.email,
            order: currentSigner.signOrder,
          }
        : null,
    },
    document: {
      id: signer.document.id,
      title: signer.document.title,
      fileUrl: filePath ? await createSignedUrl(filePath).catch(() => filePath) : '',
      status: signer.document.status,
    },
    fields: signer.fields,
  };
}

export async function getSigningFile(token: string) {
  const signer = await getSignerByToken(token);
  const filePath =
    signer.document.signedFileUrl ||
    signer.document.signedFilePublicId ||
    signer.document.fileUrl ||
    signer.document.filePublicId;
  if (!filePath) {
    throw createHttpError(404, 'FILE_UNAVAILABLE', 'File path missing');
  }
  const buffer = await downloadStoredFile(filePath);
  return {
    buffer,
    fileName: signer.document.fileName || 'document.pdf',
    contentType: signer.document.fileMimeType || 'application/pdf',
  };
}

export async function submitSigning(token: string, payload: SubmitSignatureInput, meta: RequestMeta) {
  const signer = await getSignerByToken(token);

  if (signer.document.status === DocumentStatus.COMPLETED) {
    throw createHttpError(409, 'DOCUMENT_COMPLETED', 'Document already completed');
  }
  if (signer.status === SignerStatus.SIGNED) {
    throw createHttpError(409, 'ALREADY_SIGNED', 'Signing already completed');
  }

  const fieldIds = new Set<string>(signer.fields.map((field: { id: string }) => field.id));
  const payloadFieldIds = new Set(payload.signatures.map((item) => item.fieldId));
  for (const fieldId of fieldIds) {
    if (!payloadFieldIds.has(fieldId)) {
      throw createHttpError(400, 'MISSING_SIGNATURE', 'All signature fields must be completed');
    }
  }

  const session = await createSigningSessionFlow({
    documentId: signer.documentId,
    signerId: signer.id,
    meta: {
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      correlationId: meta.correlationId,
    },
  });

  await submitManifestFlow({
    documentId: signer.documentId,
    signerId: signer.id,
    signingSessionId: session.signingSessionId,
    fields: payload.signatures.map((item) => ({
      fieldId: item.fieldId,
      value: item.value,
    })),
    meta: {
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      correlationId: meta.correlationId,
    },
  });

  const signatureValue = payload.signatures[0]?.value ?? signer.name ?? signer.email;
  await uploadSignatureArtifactFlow({
    documentId: signer.documentId,
    signerId: signer.id,
    signingSessionId: session.signingSessionId,
    type: 'TYPED',
    data: signatureValue,
    meta: {
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      correlationId: meta.correlationId,
    },
  });

  await applySignatureFlow({
    documentId: signer.documentId,
    signerId: signer.id,
    signingSessionId: session.signingSessionId,
    meta: {
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      correlationId: meta.correlationId,
    },
  });

  const updated = await prisma.document.findUnique({
    where: { id: signer.documentId },
    include: {
      signers: true,
      auditEvents: { orderBy: { createdAt: 'asc' } },
    },
  });
  if (!updated) {
    throw createHttpError(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
  }

  const remaining = updated.signers.filter((s) => s.status !== SignerStatus.SIGNED);
  if (remaining.length === 0) {
    await completeDocumentFlow(updated.ownerId, updated.id, {
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      correlationId: meta.correlationId,
    });
  }

  return { ok: true };
}
