import {
  AuditActorType,
  AuditEventType,
  DocumentStatus,
  SignerStatus,
} from '@prisma/client';
<<<<<<< HEAD
import type { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { hashToken } from '../../utils/crypto.util';
import { createHttpError } from '../../utils/http-error.util';
import { generateCertificatePdf } from '../../utils/pdf.util';
import { uploadBufferToCloudinary } from '../../utils/cloudinary.util';
import { hashBuffer } from '../../utils/hash.util';
import { AUDIT_EVENT_LABELS } from '../audit/audit.constants';
=======
import { prisma } from '../../config/prisma';
import { hashToken } from '../../utils/crypto.util';
import { createHttpError } from '../../utils/http-error.util';
import { createEvent } from '../../shared/events';
import { emitEvent } from '../../realtime/socket';
import { env } from '../../config/env';
import { dispatchNotification } from '../notifications/notification.service';
import { buildCloudinaryAccessUrl } from '../../utils/cloudinary.util';
import {
  applySignature as applySignatureFlow,
  completeDocument as completeDocumentFlow,
  createSigningSession as createSigningSessionFlow,
  submitManifest as submitManifestFlow,
  uploadSignatureArtifact as uploadSignatureArtifactFlow,
} from './signing-integrity.service';
>>>>>>> e054afa1 (Save 1)
import type { SubmitSignatureInput } from './signing.types';

type RequestMeta = {
  ipAddress?: string;
  userAgent?: string;
<<<<<<< HEAD
=======
  correlationId?: string;
>>>>>>> e054afa1 (Save 1)
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
<<<<<<< HEAD
=======
            version: { increment: 1 },
>>>>>>> e054afa1 (Save 1)
          },
        });
      }

<<<<<<< HEAD
      await tx.auditEvent.create({
=======
      const auditEvent = await tx.auditEvent.create({
>>>>>>> e054afa1 (Save 1)
        data: {
          documentId: signer.documentId,
          actorType: AuditActorType.SIGNER,
          actorSignerId: signer.id,
          eventType: AuditEventType.DOCUMENT_VIEWED,
          ipAddress: meta.ipAddress,
          userAgent: meta.userAgent,
        },
      });
<<<<<<< HEAD
    });
=======

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
>>>>>>> e054afa1 (Save 1)
  }

  return {
    signer: {
      id: signer.id,
      name: signer.name,
      email: signer.email,
      status: signer.status,
    },
    document: {
      id: signer.document.id,
      title: signer.document.title,
<<<<<<< HEAD
      fileUrl: signer.document.fileUrl,
=======
      fileUrl: buildCloudinaryAccessUrl({
        url: signer.document.fileUrl,
        publicId: signer.document.filePublicId,
        fileName: signer.document.fileName,
      }),
>>>>>>> e054afa1 (Save 1)
      status: signer.document.status,
    },
    fields: signer.fields,
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

<<<<<<< HEAD
  const signaturesData = payload.signatures.map((item) => {
    if (!fieldIds.has(item.fieldId)) {
      throw createHttpError(400, 'INVALID_FIELD', 'Signature field is invalid');
    }
    return {
      documentId: signer.documentId,
      signerId: signer.id,
      fieldId: item.fieldId,
      value: item.value,
      signedAt: new Date(),
    };
  });

  const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.signature.createMany({ data: signaturesData });
    await tx.signer.update({
      where: { id: signer.id },
      data: { status: SignerStatus.SIGNED, signedAt: new Date() },
    });

    await tx.auditEvent.create({
      data: {
        documentId: signer.documentId,
        actorType: AuditActorType.SIGNER,
        actorSignerId: signer.id,
        eventType: AuditEventType.DOCUMENT_SIGNED,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      },
    });

    const remaining = await tx.signer.count({
      where: { documentId: signer.documentId, status: { not: SignerStatus.SIGNED } },
    });

    if (remaining === 0) {
      await tx.document.update({
        where: { id: signer.documentId },
        data: {
          status: DocumentStatus.SIGNED,
          signedAt: new Date(),
        },
      });
    }

    return { remaining };
  });

  if (result.remaining === 0) {
    const document = await prisma.document.findUnique({
      where: { id: signer.documentId },
      include: {
        signers: true,
        auditEvents: { orderBy: { createdAt: 'asc' } },
      },
    });
    if (!document) {
      throw createHttpError(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
    }

    const auditSummary = document.auditEvents.map(
      (event: { eventType: AuditEventType; createdAt: Date }) =>
        `${AUDIT_EVENT_LABELS[event.eventType]} - ${event.createdAt.toISOString()}`,
    );

    const certificateBuffer = await generateCertificatePdf({
      title: document.title,
      documentHash: document.hash,
      completedAt: new Date(),
      signers: document.signers.map((s: { name: string | null; email: string; signedAt: Date | null }) => ({
        name: s.name,
        email: s.email,
        signedAt: s.signedAt,
      })),
      auditSummary,
    });

    const upload = await uploadBufferToCloudinary(certificateBuffer, {
      folder: 'esigning/certificates',
      fileName: `${document.title}-certificate.pdf`,
      resourceType: 'raw',
    });

    const certificateHash = hashBuffer(certificateBuffer);

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.certificate.create({
        data: {
          documentId: document.id,
          url: upload.url,
          publicId: upload.publicId,
          hash: certificateHash,
          summary: {
            documentId: document.id,
            title: document.title,
            hash: document.hash,
            signers: document.signers.map((s: { name: string | null; email: string; signedAt: Date | null }) => ({
              name: s.name,
              email: s.email,
              signedAt: s.signedAt,
            })),
            auditSummary,
          },
        },
      });

      await tx.document.update({
        where: { id: document.id },
        data: {
          status: DocumentStatus.COMPLETED,
          completedAt: new Date(),
        },
      });

      await tx.auditEvent.create({
        data: {
          documentId: document.id,
          actorType: AuditActorType.SYSTEM,
          eventType: AuditEventType.DOCUMENT_COMPLETED,
          ipAddress: meta.ipAddress,
          userAgent: meta.userAgent,
        },
      });
=======
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
>>>>>>> e054afa1 (Save 1)
    });
  }

  return { ok: true };
}
