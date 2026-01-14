import { DocumentStatus, FieldType, SignerStatus, Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { env } from '../../config/env';
import { buildCloudinaryAccessUrl, uploadBufferToCloudinary } from '../../utils/cloudinary.util';
import { hashBuffer } from '../../utils/hash.util';
import { createHttpError } from '../../utils/http-error.util';
import { generateToken, hashToken } from '../../utils/crypto.util';
import { createEvent } from '../../shared/events';
import { emitEvent } from '../../realtime/socket';
import { buildNotificationEmail, dispatchNotification, notifyUserByEmail } from '../notifications/notification.service';
import type { SendDocumentInput } from './document.types';

type RequestMeta = {
  ipAddress?: string;
  userAgent?: string;
  correlationId?: string;
};

type DocumentWithFiles = {
  fileUrl: string;
  filePublicId: string;
  fileName: string;
  signedFileUrl?: string | null;
  signedFilePublicId?: string | null;
};

function withAccessUrls<T extends DocumentWithFiles>(document: T): T {
  const fileUrl = buildCloudinaryAccessUrl({
    url: document.fileUrl,
    publicId: document.filePublicId,
    fileName: document.fileName,
  });
  const signedFileUrl =
    document.signedFileUrl && document.signedFilePublicId
      ? buildCloudinaryAccessUrl({
          url: document.signedFileUrl,
          publicId: document.signedFilePublicId,
          fileName: document.fileName,
        })
      : document.signedFileUrl ?? null;
  return { ...document, fileUrl, signedFileUrl };
}

function buildFieldSummary(field: {
  id: string;
  signerId: string | null;
  type: FieldType;
  label?: string | null;
  required?: boolean | null;
  value?: string | null;
  status?: string | null;
  options?: Prisma.JsonValue | null;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return {
    id: field.id,
    signerId: field.signerId ?? '',
    type: field.type,
    label: field.label ?? null,
    required: field.required ?? true,
    value: field.value ?? null,
    status: (field.status ?? 'EMPTY') as any,
    options: (field.options ?? null) as Record<string, unknown> | null,
    page: field.page,
    x: field.x,
    y: field.y,
    width: field.width,
    height: field.height,
  };
}

async function ensureDocumentWritable(ownerId: string, documentId: string) {
  const document = await prisma.document.findFirst({
    where: { id: documentId, ownerId },
    select: { id: true, status: true, lockedAt: true },
  });
  if (!document) {
    throw createHttpError(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
  }
  if (document.lockedAt || document.status === DocumentStatus.COMPLETED) {
    throw createHttpError(409, 'DOC_LOCKED', 'Document is locked');
  }
  return withAccessUrls(document);
}

async function resolveSigner(params: { documentId: string; signerEmail?: string; signerIndex?: number }) {
  if (!params.signerEmail && params.signerIndex === undefined) return null;
  if (params.signerEmail) {
    return prisma.signer.findFirst({
      where: { documentId: params.documentId, email: params.signerEmail.toLowerCase() },
    });
  }
  if (params.signerIndex !== undefined) {
    const signers = await prisma.signer.findMany({
      where: { documentId: params.documentId },
      orderBy: { signOrder: 'asc' },
    });
    return signers[params.signerIndex] ?? null;
  }
  return null;
}

export async function createDocument(params: {
  ownerId: string;
  title: string;
  file: Express.Multer.File;
  meta: RequestMeta;
}) {
  const { ownerId, title, file, meta } = params;
  const owner = await prisma.user.findUnique({
    where: { id: ownerId },
    select: { name: true, email: true },
  });
  const ownerName = owner?.name?.trim() || owner?.email || 'Document owner';
  const hash = hashBuffer(file.buffer);
  const hashComputedAt = new Date();

  const upload = await uploadBufferToCloudinary(file.buffer, {
    folder: 'esigning/documents',
    fileName: file.originalname,
    resourceType: 'raw',
  });

  const document = await prisma.document.create({
    data: {
      ownerId,
      title,
      fileUrl: upload.url,
      filePublicId: upload.publicId,
      fileName: file.originalname,
      fileMimeType: file.mimetype,
      fileSize: file.size,
      hash,
      hashAlgorithm: 'SHA-256',
      hashComputedAt,
      status: DocumentStatus.DRAFT,
    },
  });

  const auditEvent = await prisma.auditEvent.create({
    data: {
      documentId: document.id,
      actorType: 'SENDER',
      actorUserId: ownerId,
      eventType: 'DOCUMENT_UPLOADED',
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      metadata: {
        preHash: hash,
        algorithm: 'SHA-256',
        computedAt: hashComputedAt.toISOString(),
      },
    },
  });

  const createdEvent = createEvent({
    event: 'doc.created',
    orgId: ownerId,
    docId: document.id,
    actor: { userId: ownerId, role: 'SENDER' },
    correlationId: meta.correlationId,
    data: {
      document: {
        id: document.id,
        title: document.title,
        status: document.status,
        ownerId: document.ownerId,
        version: document.version,
        updatedAt: document.updatedAt.toISOString(),
      },
    },
  });
  await emitEvent(createdEvent);

  const hashEvent = createEvent({
    event: 'doc.hash.computed',
    orgId: ownerId,
    docId: document.id,
    actor: { userId: ownerId, role: 'SENDER' },
    correlationId: meta.correlationId,
    data: {
      preHash: {
        hash,
        algorithm: 'SHA-256',
        computedAt: hashComputedAt.toISOString(),
      },
    },
  });
  await emitEvent(hashEvent);

  const auditAppended = createEvent({
    event: 'doc.audit.appended',
    orgId: ownerId,
    docId: document.id,
    actor: { userId: ownerId, role: 'SENDER' },
    correlationId: meta.correlationId,
    data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
  });
  await emitEvent(auditAppended);

  try {
    await dispatchNotification({
      eventType: 'document.created',
      orgId: ownerId,
      docId: document.id,
      recipientUserId: ownerId,
      actor: { userId: ownerId, role: 'SENDER', email: owner?.email ?? undefined },
      title: 'Document created',
      message: `You uploaded "${document.title}".`,
      link: `${env.appBaseUrl}/app/documents`,
      idempotencyKey: `document-created:${document.id}`,
      payload: { documentId: document.id, title: document.title },
    });
  } catch (err) {
    console.warn('Notification dispatch failed', err);
  }

  return document;
}

export async function listDocuments(ownerId: string) {
  const documents = await prisma.document.findMany({
    where: { ownerId },
    orderBy: { createdAt: 'desc' },
    include: {
      signers: {
        select: { id: true, email: true, name: true, status: true, signOrder: true, viewedAt: true, signedAt: true },
      },
    },
  });
  return documents.map((document) => withAccessUrls(document));
}

export async function getDocument(ownerId: string, documentId: string) {
  const document = await prisma.document.findFirst({
    where: { id: documentId, ownerId },
    include: {
      signers: true,
      fields: true,
      signatures: true,
      certificate: true,
    },
  });
  if (!document) {
    throw createHttpError(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
  }
  return withAccessUrls(document);
}

export async function sendDocument(params: {
  ownerId: string;
  documentId: string;
  payload: SendDocumentInput;
  meta: RequestMeta;
}) {
  const { ownerId, documentId, payload, meta } = params;
  const payloadFields = payload.fields ?? [];
  const useExistingFields = payloadFields.length === 0;
  const owner = await prisma.user.findUnique({
    where: { id: ownerId },
    select: { name: true, email: true },
  });
  const ownerName = owner?.name?.trim() || owner?.email || 'Document owner';
  const document = await prisma.document.findFirst({
    where: { id: documentId, ownerId },
  });
  if (!document) {
    throw createHttpError(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
  }
  if (document.status !== DocumentStatus.DRAFT) {
    throw createHttpError(400, 'DOCUMENT_NOT_DRAFT', 'Only draft documents can be sent');
  }

  const signerEmails = payload.signers.map((s) => s.email.toLowerCase());
  const uniqueEmails = new Set(signerEmails);
  if (uniqueEmails.size !== signerEmails.length) {
    throw createHttpError(400, 'DUPLICATE_SIGNERS', 'Signer emails must be unique');
  }

  const expiresAt = new Date(Date.now() + env.signingLinkTtlMinutes * 60 * 1000);
  const signerTokens: Record<string, string> = {};

  const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const createdSigners = [];
    for (const [index, signer] of payload.signers.entries()) {
      const token = generateToken();
      signerTokens[signer.email.toLowerCase()] = token;
      const created = await tx.signer.create({
        data: {
          documentId: document.id,
          name: signer.name ?? null,
          email: signer.email.toLowerCase(),
          status: SignerStatus.PENDING,
          signOrder: signer.order ?? index + 1,
          signingTokenHash: hashToken(token),
          signingTokenExpiresAt: expiresAt,
        },
      });
      createdSigners.push(created);
    }

    const signersByEmail = new Map(createdSigners.map((s) => [s.email, s]));
    const signersByIndex = new Map(createdSigners.map((s, index) => [index, s]));

    let createdFields = [];
    if (useExistingFields) {
      const existingFields = await tx.signatureField.findMany({
        where: { documentId: document.id },
      });
      if (existingFields.length === 0) {
        throw createHttpError(400, 'FIELDS_REQUIRED', 'At least one field is required');
      }
      createdFields = existingFields;
      for (const field of existingFields) {
        if (field.signerId) continue;
        const targetEmail = field.signerEmail?.toLowerCase();
        if (!targetEmail) continue;
        const signer = signersByEmail.get(targetEmail);
        if (!signer) {
          throw createHttpError(400, 'INVALID_SIGNER_REFERENCE', 'Field signer reference is invalid');
        }
        await tx.signatureField.update({
          where: { id: field.id },
          data: {
            signerId: signer.id,
          },
        });
      }
      createdFields = await tx.signatureField.findMany({
        where: { documentId: document.id },
      });
    } else {
      const fieldsData = payloadFields.map((field) => {
        const signer =
          (field.signerEmail ? signersByEmail.get(field.signerEmail.toLowerCase()) : undefined) ??
          (field.signerIndex !== undefined ? signersByIndex.get(field.signerIndex) : undefined);
        if (!signer) {
          throw createHttpError(400, 'INVALID_SIGNER_REFERENCE', 'Field signer reference is invalid');
        }
        return {
          documentId: document.id,
          signerId: signer.id,
          signerEmail: signer.email,
          type: field.type as FieldType,
          label: field.label ?? null,
          placeholder: field.placeholder ?? null,
          required: field.required ?? true,
          value: field.value ?? null,
          status: field.value ? 'FILLED' : 'EMPTY',
          options: field.options ?? null,
          page: field.page,
          x: field.x,
          y: field.y,
          width: field.width,
          height: field.height,
        };
      });

      for (const field of fieldsData) {
        const createdField = await tx.signatureField.create({ data: field });
        createdFields.push(createdField);
      }
    }

    const updated = await tx.document.update({
      where: { id: document.id },
      data: {
        status: DocumentStatus.SENT,
        sentAt: new Date(),
        fieldVersion: { increment: 1 },
        version: { increment: 1 },
      },
    });

    const auditEvent = await tx.auditEvent.create({
      data: {
        documentId: document.id,
        actorType: 'SENDER',
        actorUserId: ownerId,
        eventType: 'DOCUMENT_SENT',
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      },
    });

    return { updated, createdSigners, createdFields, auditEvent };
  });

  for (const signer of result.createdSigners) {
    const token = signerTokens[signer.email];
    if (!token) {
      throw createHttpError(500, 'SIGNING_TOKEN_MISSING', 'Signing token missing');
    }
    const link = `${env.signingAppUrl}/${token}`;
    const emailMessage = buildNotificationEmail('signer.invited', {
      recipientName: signer.name ?? signer.email,
      documentTitle: document.title,
      senderName: ownerName,
      orgName: ownerName,
      actionUrl: link,
      expiresAt: expiresAt.toISOString(),
    });
    try {
      await notifyUserByEmail({
        email: signer.email,
        forceEmail: true,
        input: {
          eventType: 'signer.invited',
          orgId: ownerId,
          docId: document.id,
          actor: { userId: ownerId, role: 'SENDER', email: owner?.email ?? undefined },
          title: 'Document invitation',
          message: `${ownerName} invited you to sign "${document.title}".`,
          link,
          payload: {
            documentId: document.id,
            signerId: signer.id,
            signerEmail: signer.email,
            documentTitle: document.title,
          },
          idempotencyKey: `signer-invited:${signer.id}`,
          email: {
            to: signer.email,
            subject: emailMessage.subject,
            text: emailMessage.text,
            html: emailMessage.html,
          },
        },
      });
    } catch (err) {
      console.warn('Signer notification failed', err);
    }
    await emitEvent(
      createEvent({
        event: 'notifications.email.queued',
        orgId: ownerId,
        docId: document.id,
        actor: { userId: ownerId, role: 'SENDER' },
        correlationId: meta.correlationId,
        data: { to: signer.email, template: 'signing-request', signerId: signer.id },
      }),
      'org',
    );
  }

  await emitEvent(
    createEvent({
      event: 'doc.updated',
      orgId: ownerId,
      docId: document.id,
      actor: { userId: ownerId, role: 'SENDER' },
      correlationId: meta.correlationId,
      data: {
        document: {
          id: result.updated.id,
          title: result.updated.title,
          status: result.updated.status,
          ownerId: result.updated.ownerId,
          version: result.updated.version,
          updatedAt: result.updated.updatedAt.toISOString(),
        },
        changes: ['status', 'sentAt', 'fieldVersion'],
      },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.field.updated',
      orgId: ownerId,
      docId: document.id,
      actor: { userId: ownerId, role: 'SENDER' },
      correlationId: meta.correlationId,
      data: {
        fields: result.createdFields.map((field) => ({
          id: field.id,
          signerId: field.signerId,
          type: field.type,
          label: field.label,
          required: field.required,
          value: field.value,
          status: field.status,
          options: field.options as Record<string, unknown> | null,
          page: field.page,
          x: field.x,
          y: field.y,
          width: field.width,
          height: field.height,
        })),
      },
    }),
  );

  for (const signer of result.createdSigners) {
    await emitEvent(
      createEvent({
        event: 'doc.access.granted',
        orgId: ownerId,
        docId: document.id,
        actor: { userId: ownerId, role: 'SENDER' },
        correlationId: meta.correlationId,
        data: {
          signer: {
            id: signer.id,
            email: signer.email,
            name: signer.name,
            status: signer.status,
            order: signer.signOrder,
            viewedAt: signer.viewedAt?.toISOString() ?? null,
            signedAt: signer.signedAt?.toISOString() ?? null,
          },
        },
      }),
    );
  }

  await emitEvent(
    createEvent({
      event: 'doc.audit.appended',
      orgId: ownerId,
      docId: document.id,
      actor: { userId: ownerId, role: 'SENDER' },
      correlationId: meta.correlationId,
      data: { auditEventId: result.auditEvent.id, eventType: result.auditEvent.eventType },
    }),
  );

  try {
    await dispatchNotification({
      eventType: 'document.sent',
      orgId: ownerId,
      docId: document.id,
      recipientUserId: ownerId,
      actor: { userId: ownerId, role: 'SENDER', email: owner?.email ?? undefined },
      title: 'Document sent',
      message: `Sent "${document.title}" to ${result.createdSigners.length} signer(s).`,
      link: `${env.appBaseUrl}/app/sent`,
      idempotencyKey: `document-sent:${document.id}`,
      payload: {
        documentId: document.id,
        title: document.title,
        signerCount: result.createdSigners.length,
      },
    });
  } catch (err) {
    console.warn('Notification dispatch failed', err);
  }

  return withAccessUrls(result.updated);
}

export async function getDocumentStats(ownerId: string) {
  const grouped = await prisma.document.groupBy({
    by: ['status'],
    where: { ownerId },
    _count: { _all: true },
  });
  const counts = grouped.reduce<Record<string, number>>(
    (acc, item: { status: DocumentStatus; _count: { _all: number } }) => {
      acc[item.status] = item._count._all;
      return acc;
    },
    {},
  );

  return {
    total: grouped.reduce(
      (sum: number, item: { _count: { _all: number } }) => sum + item._count._all,
      0,
    ),
    sent: counts.SENT ?? 0,
    viewed: counts.VIEWED ?? 0,
    inProgress: counts.IN_PROGRESS ?? 0,
    signed: counts.SIGNED ?? 0,
    completed: counts.COMPLETED ?? 0,
    declined: counts.DECLINED ?? 0,
    expired: counts.EXPIRED ?? 0,
    draft: counts.DRAFT ?? 0,
    pending:
      (counts.SENT ?? 0) +
      (counts.VIEWED ?? 0) +
      (counts.IN_PROGRESS ?? 0) +
      (counts.SIGNED ?? 0),
  };
}

export async function createField(params: {
  ownerId: string;
  documentId: string;
  input: {
    signerEmail?: string;
    signerIndex?: number;
    type: FieldType;
    label?: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    options?: Record<string, unknown>;
    page: number;
    x: number;
    y: number;
    width: number;
    height: number;
  };
  meta: RequestMeta;
}) {
  await ensureDocumentWritable(params.ownerId, params.documentId);
  const signer = await resolveSigner({
    documentId: params.documentId,
    signerEmail: params.input.signerEmail,
    signerIndex: params.input.signerIndex,
  });
  const field = await prisma.signatureField.create({
    data: {
      documentId: params.documentId,
      signerId: signer?.id ?? null,
      signerEmail: params.input.signerEmail?.toLowerCase() ?? signer?.email ?? null,
      type: params.input.type,
      label: params.input.label ?? null,
      placeholder: params.input.placeholder ?? null,
      required: params.input.required ?? true,
      value: params.input.value ?? null,
      status: params.input.value ? 'FILLED' : 'EMPTY',
      options: params.input.options ?? null,
      page: params.input.page,
      x: params.input.x,
      y: params.input.y,
      width: params.input.width,
      height: params.input.height,
    },
  });

  const auditEvent = await prisma.auditEvent.create({
    data: {
      documentId: params.documentId,
      actorType: 'SENDER',
      actorUserId: params.ownerId,
      eventType: 'FIELD_UPDATED',
      ipAddress: params.meta.ipAddress,
      userAgent: params.meta.userAgent,
      metadata: { action: 'created', fieldId: field.id },
    },
  });

  await emitEvent(
    createEvent({
      event: 'doc.field.updated',
      orgId: params.ownerId,
      docId: params.documentId,
      actor: { userId: params.ownerId, role: 'SENDER' },
      correlationId: params.meta.correlationId,
      data: { fields: [buildFieldSummary(field)] },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.audit.appended',
      orgId: params.ownerId,
      docId: params.documentId,
      actor: { userId: params.ownerId, role: 'SENDER' },
      correlationId: params.meta.correlationId,
      data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }),
  );

  return field;
}

export async function updateField(params: {
  ownerId: string;
  documentId: string;
  fieldId: string;
  input: {
    signerEmail?: string;
    signerIndex?: number;
    type?: FieldType;
    label?: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    options?: Record<string, unknown>;
    page?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  };
  meta: RequestMeta;
}) {
  await ensureDocumentWritable(params.ownerId, params.documentId);
  const existing = await prisma.signatureField.findFirst({
    where: { id: params.fieldId, documentId: params.documentId },
  });
  if (!existing) {
    throw createHttpError(404, 'FIELD_NOT_FOUND', 'Field not found');
  }
  const signer = await resolveSigner({
    documentId: params.documentId,
    signerEmail: params.input.signerEmail,
    signerIndex: params.input.signerIndex,
  });
  const value = params.input.value ?? existing.value ?? null;
  const updated = await prisma.signatureField.update({
    where: { id: existing.id },
    data: {
      signerId: signer ? signer.id : params.input.signerEmail ? null : existing.signerId,
      signerEmail: params.input.signerEmail
        ? params.input.signerEmail.toLowerCase()
        : existing.signerEmail,
      type: params.input.type ?? existing.type,
      label: params.input.label ?? existing.label,
      placeholder: params.input.placeholder ?? existing.placeholder,
      required: params.input.required ?? existing.required,
      value,
      status: value ? 'FILLED' : existing.status,
      options: params.input.options ?? existing.options,
      page: params.input.page ?? existing.page,
      x: params.input.x ?? existing.x,
      y: params.input.y ?? existing.y,
      width: params.input.width ?? existing.width,
      height: params.input.height ?? existing.height,
    },
  });

  const auditEvent = await prisma.auditEvent.create({
    data: {
      documentId: params.documentId,
      actorType: 'SENDER',
      actorUserId: params.ownerId,
      eventType: 'FIELD_UPDATED',
      ipAddress: params.meta.ipAddress,
      userAgent: params.meta.userAgent,
      metadata: { action: 'updated', fieldId: updated.id },
    },
  });

  await emitEvent(
    createEvent({
      event: 'doc.field.updated',
      orgId: params.ownerId,
      docId: params.documentId,
      actor: { userId: params.ownerId, role: 'SENDER' },
      correlationId: params.meta.correlationId,
      data: { fields: [buildFieldSummary(updated)] },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.audit.appended',
      orgId: params.ownerId,
      docId: params.documentId,
      actor: { userId: params.ownerId, role: 'SENDER' },
      correlationId: params.meta.correlationId,
      data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }),
  );

  return updated;
}

export async function deleteField(params: {
  ownerId: string;
  documentId: string;
  fieldId: string;
  meta: RequestMeta;
}) {
  await ensureDocumentWritable(params.ownerId, params.documentId);
  const existing = await prisma.signatureField.findFirst({
    where: { id: params.fieldId, documentId: params.documentId },
  });
  if (!existing) {
    throw createHttpError(404, 'FIELD_NOT_FOUND', 'Field not found');
  }
  await prisma.signatureField.delete({
    where: { id: existing.id },
  });

  const auditEvent = await prisma.auditEvent.create({
    data: {
      documentId: params.documentId,
      actorType: 'SENDER',
      actorUserId: params.ownerId,
      eventType: 'FIELD_UPDATED',
      ipAddress: params.meta.ipAddress,
      userAgent: params.meta.userAgent,
      metadata: { action: 'deleted', fieldId: existing.id },
    },
  });

  await emitEvent(
    createEvent({
      event: 'doc.field.updated',
      orgId: params.ownerId,
      docId: params.documentId,
      actor: { userId: params.ownerId, role: 'SENDER' },
      correlationId: params.meta.correlationId,
      data: { fields: [buildFieldSummary(existing)] },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.audit.appended',
      orgId: params.ownerId,
      docId: params.documentId,
      actor: { userId: params.ownerId, role: 'SENDER' },
      correlationId: params.meta.correlationId,
      data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }),
  );

  return { deleted: true };
}
