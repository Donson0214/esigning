import {
  AuditActorType,
  AuditEventType,
  DocumentStatus,
  FieldStatus,
  FieldType,
  SignerStatus,
  SignatureArtifactType,
  SigningSessionStatus,
  type Prisma,
} from '@prisma/client';
import { prisma } from '../../config/prisma';
import { env } from '../../config/env';
import { createHttpError } from '../../utils/http-error.util';
import { hashBuffer, hashString } from '../../utils/hash.util';
import { computeManifestHash } from '../../utils/manifest.util';
import { parseDataUrl } from '../../utils/signature.util';
import { downloadStoredFile, uploadBufferToSupabase } from '../../utils/supabase.util';
import { applySignatureToPdf } from '../../utils/pdf-signature.util';
import { generateToken, hashToken, hmacSha256Hex } from '../../utils/crypto.util';
import { generateCertificatePdf } from '../../utils/pdf.util';
import { AUDIT_EVENT_LABELS } from '../audit/audit.constants';
import { isSignerInOrder } from '../../utils/signing-order.util';
import { createEvent } from '../../shared/events';
import { emitEvent } from '../../realtime/socket';
import { buildNotificationEmail, dispatchNotification, notifyUserByEmail } from '../notifications/notification.service';

type RequestMeta = {
  ipAddress?: string;
  userAgent?: string;
  correlationId?: string;
  clientMutationId?: string;
};

type ManifestFieldInput = {
  fieldId: string;
  value: string;
};

type NormalizedRect = { x: number; y: number; width: number; height: number };

const toJsonInput = (value: unknown) => {
  if (value === undefined) return undefined;
  if (value === null) return Prisma.DbNull;
  return value as Prisma.InputJsonValue;
};

const buildFieldSummary = (field: {
  id: string;
  signerId: string | null;
  type: FieldType;
  label?: string | null;
  required?: boolean | null;
  value?: string | null;
  status?: FieldStatus | null;
  options?: Prisma.JsonValue | null;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
}) => ({
  id: field.id,
  signerId: field.signerId ?? '',
  type: field.type,
  label: field.label ?? null,
  required: field.required ?? true,
  value: field.value ?? null,
  status: (field.status ?? FieldStatus.EMPTY) as 'EMPTY' | 'FILLED' | 'SIGNED',
  options: (field.options ?? null) as Record<string, unknown> | null,
  page: field.page,
  x: field.x,
  y: field.y,
  width: field.width,
  height: field.height,
});
const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

const toNormalizedRect = (options: Prisma.JsonValue | null | undefined): NormalizedRect | null => {
  if (!options || typeof options !== 'object') return null;
  const normalized = (options as { normalized?: { x?: unknown; y?: unknown; width?: unknown; height?: unknown } })
    .normalized;
  if (!normalized) return null;
  const { x, y, width, height } = normalized;
  if (!isFiniteNumber(x) || !isFiniteNumber(y) || !isFiniteNumber(width) || !isFiniteNumber(height)) {
    return null;
  }
  if (x < 0 || y < 0 || width <= 0 || height <= 0 || x > 1 || y > 1 || width > 1 || height > 1) {
    return null;
  }
  return { x, y, width, height };
};

function ensureSignerInOrder(documentId: string, signerId: string) {
  return prisma.signer
    .findMany({
      where: { documentId },
      orderBy: { signOrder: 'asc' },
      select: { id: true, status: true, signOrder: true },
    })
    .then((signers) => {
      if (!isSignerInOrder(signers, signerId)) {
        throw createHttpError(409, 'OUT_OF_ORDER', 'Signer is out of order');
      }
    });
}

async function getSignerAndDocument(documentId: string, signerId: string) {
  const signer = await prisma.signer.findUnique({
    where: { id: signerId },
    include: { document: true },
  });
  if (!signer || signer.documentId !== documentId) {
    throw createHttpError(404, 'SIGNER_NOT_FOUND', 'Signer not found');
  }
  return signer;
}

function assertDocumentWritable(document: { lockedAt: Date | null; status: DocumentStatus }) {
  if (document.lockedAt || document.status === DocumentStatus.COMPLETED) {
    throw createHttpError(409, 'DOC_LOCKED', 'Document is locked');
  }
  if (document.status === DocumentStatus.DECLINED || document.status === DocumentStatus.EXPIRED) {
    throw createHttpError(409, 'DOC_LOCKED', 'Document is no longer active');
  }
}

async function inviteNextSigner(params: {
  documentId: string;
  ownerId: string;
  ownerName: string;
  ownerEmail?: string | null;
  documentTitle: string;
  meta: RequestMeta;
}) {
  const nextSigner = await prisma.signer.findFirst({
    where: {
      documentId: params.documentId,
      status: SignerStatus.PENDING,
      signingTokenExpiresAt: null,
    },
    orderBy: { signOrder: 'asc' },
  });
  if (!nextSigner) return null;

  const token = generateToken();
  const expiresAt = new Date(Date.now() + env.signingLinkTtlMinutes * 60 * 1000);
  const updatedSigner = await prisma.signer.update({
    where: { id: nextSigner.id },
    data: {
      signingTokenHash: hashToken(token),
      signingTokenExpiresAt: expiresAt,
    },
  });

  const link = `${env.signingAppUrl}/${token}`;
  const portalUrl = `${env.appBaseUrl}/login?redirect=/app/received`;
  const emailMessage = buildNotificationEmail('signer.invited', {
    recipientName: updatedSigner.name ?? updatedSigner.email,
    documentTitle: params.documentTitle,
    senderName: params.ownerName,
    orgName: params.ownerName,
    actionUrl: link,
    portalUrl,
    expiresAt: expiresAt.toISOString(),
  });

  try {
    await notifyUserByEmail({
      email: updatedSigner.email,
      forceEmail: true,
      input: {
        eventType: 'signer.invited',
        orgId: params.ownerId,
        docId: updatedSigner.documentId,
        actor: { userId: params.ownerId, role: 'SENDER', email: params.ownerEmail ?? undefined },
        title: 'Document invitation',
        message: `${params.ownerName} invited you to sign "${params.documentTitle}".`,
        link,
        payload: {
          documentId: updatedSigner.documentId,
          signerId: updatedSigner.id,
          signerEmail: updatedSigner.email,
          documentTitle: params.documentTitle,
        },
        idempotencyKey: `signer-invited:${updatedSigner.id}`,
        email: {
          to: updatedSigner.email,
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
      orgId: params.ownerId,
      docId: updatedSigner.documentId,
      actor: { userId: params.ownerId, role: 'SENDER' },
      correlationId: params.meta.correlationId,
      data: { to: updatedSigner.email, template: 'signing-request', signerId: updatedSigner.id },
    }),
    'org',
  );

  return updatedSigner;
}

export async function precomputeDocumentHash(ownerId: string, documentId: string, meta: RequestMeta) {
  const document = await prisma.document.findFirst({
    where: { id: documentId, ownerId },
  });
  if (!document) {
    throw createHttpError(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
  }
  const buffer = await downloadStoredFile(document.fileUrl || document.filePublicId);
  const hash = hashBuffer(buffer);
  const computedAt = new Date();

  const updated = await prisma.document.update({
    where: { id: document.id },
    data: {
      hash,
      hashAlgorithm: 'SHA-256',
      hashComputedAt: computedAt,
      version: { increment: 1 },
    },
  });

  const auditEvent = await prisma.auditEvent.create({
    data: {
      documentId: document.id,
      actorType: AuditActorType.SENDER,
      actorUserId: ownerId,
      eventType: AuditEventType.DOCUMENT_HASH_COMPUTED,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      metadata: {
        preHash: hash,
        algorithm: 'SHA-256',
        computedAt: computedAt.toISOString(),
      },
    },
  });

  await emitEvent(
    createEvent({
      event: 'doc.hash.computed',
      orgId: ownerId,
      docId: document.id,
      actor: { userId: ownerId, role: 'SENDER' },
      correlationId: meta.correlationId,
      data: {
        preHash: {
          hash,
          algorithm: 'SHA-256',
          computedAt: computedAt.toISOString(),
        },
      },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.audit.appended',
      orgId: ownerId,
      docId: document.id,
      actor: { userId: ownerId, role: 'SENDER' },
      correlationId: meta.correlationId,
      data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }),
  );

  return {
    hash,
    algorithm: 'SHA-256',
    computedAt: computedAt.toISOString(),
    version: updated.version,
  };
}

export async function createSigningSession(params: {
  documentId: string;
  signerId: string;
  meta: RequestMeta;
}) {
  const signer = await getSignerAndDocument(params.documentId, params.signerId);
  assertDocumentWritable(signer.document);
  if (signer.status === SignerStatus.SIGNED) {
    throw createHttpError(409, 'ALREADY_SIGNED', 'Signing already completed');
  }
  if (signer.status === SignerStatus.DECLINED) {
    throw createHttpError(409, 'SIGNING_DECLINED', 'Signing already declined');
  }
  await ensureSignerInOrder(signer.documentId, signer.id);

  const preHash = signer.document.hash;
  if (!preHash) {
    throw createHttpError(400, 'PREHASH_MISSING', 'Pre-sign hash missing');
  }
  const sessionExpiresAt = new Date(Date.now() + env.signingSessionTtlMinutes * 60 * 1000);

  await prisma.signingSession.updateMany({
    where: {
      documentId: signer.documentId,
      signerId: signer.id,
      status: SigningSessionStatus.ACTIVE,
    },
    data: { status: SigningSessionStatus.VOID },
  });

  const session = await prisma.signingSession.create({
    data: {
      documentId: signer.documentId,
      signerId: signer.id,
      status: SigningSessionStatus.ACTIVE,
      fieldVersion: signer.document.fieldVersion,
      preHash,
      preHashAlgorithm: signer.document.hashAlgorithm ?? 'SHA-256',
      preHashComputedAt: signer.document.hashComputedAt ?? new Date(),
      expiresAt: sessionExpiresAt,
      correlationId: params.meta.correlationId,
      clientMutationId: params.meta.clientMutationId,
    },
  });

  const auditEvent = await prisma.auditEvent.create({
    data: {
      documentId: signer.documentId,
      actorType: AuditActorType.SIGNER,
      actorSignerId: signer.id,
      eventType: AuditEventType.SIGNING_SESSION_CREATED,
      ipAddress: params.meta.ipAddress,
      userAgent: params.meta.userAgent,
      metadata: { signingSessionId: session.id, expiresAt: sessionExpiresAt.toISOString() },
    },
  });

  await emitEvent(
    createEvent({
      event: 'doc.audit.appended',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }),
  );

  return { signingSessionId: session.id, expiresAt: sessionExpiresAt.toISOString() };
}

export async function createSignerField(params: {
  documentId: string;
  signerId: string;
  input: {
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
  const signer = await getSignerAndDocument(params.documentId, params.signerId);
  assertDocumentWritable(signer.document);
  await ensureSignerInOrder(signer.documentId, signer.id);

  const field = await prisma.signatureField.create({
    data: {
      documentId: signer.documentId,
      signerId: signer.id,
      signerEmail: signer.email,
      type: params.input.type,
      label: params.input.label ?? null,
      placeholder: params.input.placeholder ?? null,
      required: params.input.required ?? true,
      value: params.input.value ?? null,
      status: params.input.value ? FieldStatus.FILLED : FieldStatus.EMPTY,
      options: toJsonInput(params.input.options ?? null),
      page: params.input.page,
      x: params.input.x,
      y: params.input.y,
      width: params.input.width,
      height: params.input.height,
    },
  });

  const auditEvent = await prisma.auditEvent.create({
    data: {
      documentId: signer.documentId,
      actorType: AuditActorType.SIGNER,
      actorSignerId: signer.id,
      eventType: AuditEventType.FIELD_UPDATED,
      ipAddress: params.meta.ipAddress,
      userAgent: params.meta.userAgent,
      metadata: { action: 'created', fieldId: field.id },
    },
  });

  await emitEvent(
    createEvent({
      event: 'doc.field.updated',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: { fields: [buildFieldSummary(field)] },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.audit.appended',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }),
  );

  return field;
}

export async function submitManifest(params: {
  documentId: string;
  signerId: string;
  signingSessionId: string;
  fields: ManifestFieldInput[];
  meta: RequestMeta;
}) {
  const signer = await getSignerAndDocument(params.documentId, params.signerId);
  assertDocumentWritable(signer.document);

  const session = await prisma.signingSession.findUnique({
    where: { id: params.signingSessionId },
  });
  if (!session || session.signerId !== signer.id || session.documentId !== signer.documentId) {
    throw createHttpError(404, 'SESSION_NOT_FOUND', 'Signing session not found');
  }
  if (session.status !== SigningSessionStatus.ACTIVE) {
    throw createHttpError(409, 'STALE_SESSION', 'Signing session is not active');
  }
  if (session.expiresAt && session.expiresAt < new Date()) {
    throw createHttpError(410, 'STALE_SESSION', 'Signing session has expired');
  }
  if (session.fieldVersion !== signer.document.fieldVersion) {
    throw createHttpError(409, 'STALE_SESSION', 'Signing session is stale');
  }

  const fields = await prisma.signatureField.findMany({
    where: { documentId: signer.documentId, signerId: signer.id },
  });
  const fieldMap = new Map(fields.map((field) => [field.id, field]));
  if (fields.length === 0) {
    if (params.fields.length > 0) {
      throw createHttpError(400, 'NO_FIELDS', 'No signature fields assigned');
    }
  } else {
    const inputIds = new Set(params.fields.map((field) => field.fieldId));
    for (const field of fields) {
      if (!inputIds.has(field.id)) {
        throw createHttpError(400, 'MISSING_FIELD_VALUE', 'All fields must be completed');
      }
    }
  }

  const manifestFields = params.fields
    .map((input) => {
      const field = fieldMap.get(input.fieldId);
      if (!field) {
        throw createHttpError(400, 'INVALID_FIELD', 'Signature field is invalid');
      }
      return {
        fieldId: field.id,
        type: field.type,
        page: field.page,
        x: field.x,
        y: field.y,
        width: field.width,
        height: field.height,
        value: input.value,
        normalized: toNormalizedRect(field.options),
      };
    })
    .sort((a, b) => a.fieldId.localeCompare(b.fieldId));

  const manifest = {
    docId: signer.documentId,
    orgId: signer.document.ownerId,
    preHash: signer.document.hash,
    signerId: signer.id,
    signingSessionId: session.id,
    fields: manifestFields,
    client: {
      userAgent: params.meta.userAgent ?? null,
      ip: params.meta.ipAddress ?? null,
    },
    createdAt: new Date().toISOString(),
  };

  const { hash: manifestHash } = computeManifestHash(manifest);

  const updated = await prisma.$transaction(async (tx) => {
    const updatedSession = await tx.signingSession.update({
      where: { id: session.id },
      data: {
        manifestJson: manifest as Prisma.InputJsonValue,
        manifestHash,
        manifestAlgorithm: 'SHA-256',
        manifestCreatedAt: new Date(),
        signedManifestHash: manifestHash,
      },
    });
    for (const field of manifestFields) {
      await tx.signatureField.update({
        where: { id: field.fieldId },
        data: {
          value: field.value,
          status: FieldStatus.FILLED,
        },
      });
    }
    return updatedSession;
  });

  const auditEvent = await prisma.auditEvent.create({
    data: {
      documentId: signer.documentId,
      actorType: AuditActorType.SIGNER,
      actorSignerId: signer.id,
      eventType: AuditEventType.MANIFEST_SUBMITTED,
      ipAddress: params.meta.ipAddress,
      userAgent: params.meta.userAgent,
      metadata: { signingSessionId: session.id, manifestHash },
    },
  });

  await emitEvent(
    createEvent({
      event: 'doc.hash.computed',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: {
        manifestHash: {
          hash: manifestHash,
          algorithm: 'SHA-256',
          computedAt: updated.manifestCreatedAt?.toISOString() ?? new Date().toISOString(),
        },
      },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.field.updated',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: {
        fields: manifestFields.map((field) => ({
          id: field.fieldId,
          signerId: signer.id,
          type: field.type,
          value: field.value,
          status: 'FILLED',
          page: field.page,
          x: field.x,
          y: field.y,
          width: field.width,
          height: field.height,
        })),
      },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.audit.appended',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }),
  );

  return { manifestHash };
}

export async function uploadSignatureArtifact(params: {
  documentId: string;
  signerId: string;
  signingSessionId: string;
  type: SignatureArtifactType;
  data: string;
  meta: RequestMeta;
}) {
  const signer = await getSignerAndDocument(params.documentId, params.signerId);
  assertDocumentWritable(signer.document);

  const session = await prisma.signingSession.findUnique({
    where: { id: params.signingSessionId },
  });
  if (!session || session.signerId !== signer.id || session.documentId !== signer.documentId) {
    throw createHttpError(404, 'SESSION_NOT_FOUND', 'Signing session not found');
  }
  if (!session.manifestHash) {
    throw createHttpError(400, 'MANIFEST_MISSING', 'Manifest hash missing');
  }

  let artifactHash: string;
  let artifactUrl: string | undefined;

  if (params.type === SignatureArtifactType.TYPED) {
    artifactHash = hashString(params.data);
  } else {
    const parsed = parseDataUrl(params.data);
    if (!parsed) {
      throw createHttpError(400, 'INVALID_SIGNATURE', 'Signature data must be a base64 data URL');
    }
    const mimeType = parsed.mimeType.toLowerCase();
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(mimeType)) {
      throw createHttpError(400, 'INVALID_SIGNATURE', 'Unsupported signature image type');
    }
    artifactHash = hashBuffer(parsed.buffer);
    const extension = mimeType === 'image/jpeg' || mimeType === 'image/jpg' ? '.jpg' : '.png';
    const upload = await uploadBufferToSupabase(parsed.buffer, {
      folder: 'signatures',
      fileName: `${signer.documentId}-${signer.id}-signature${extension}`,
      contentType: mimeType,
    });
    artifactUrl = upload.path;
  }

  const updated = await prisma.signingSession.update({
    where: { id: session.id },
    data: {
      signatureArtifactType: params.type,
      signatureArtifactHash: artifactHash,
      signatureArtifactAlgorithm: 'SHA-256',
      signatureArtifactUrl: artifactUrl ?? null,
    },
  });

  const auditEvent = await prisma.auditEvent.create({
    data: {
      documentId: signer.documentId,
      actorType: AuditActorType.SIGNER,
      actorSignerId: signer.id,
      eventType: AuditEventType.SIGNATURE_CAPTURED,
      ipAddress: params.meta.ipAddress,
      userAgent: params.meta.userAgent,
      metadata: { signingSessionId: session.id, signatureArtifactHash: artifactHash },
    },
  });

  await emitEvent(
    createEvent({
      event: 'doc.hash.computed',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: {
        signatureArtifactHash: {
          hash: artifactHash,
          algorithm: 'SHA-256',
          computedAt: updated.updatedAt.toISOString(),
        },
      },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.audit.appended',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }),
  );

  return { signatureArtifactHash: artifactHash, signatureArtifactUrl: artifactUrl ?? null };
}

export async function applySignature(params: {
  documentId: string;
  signerId: string;
  signingSessionId: string;
  meta: RequestMeta;
}) {
  const signer = await getSignerAndDocument(params.documentId, params.signerId);
  assertDocumentWritable(signer.document);
  await ensureSignerInOrder(signer.documentId, signer.id);
  if (signer.status === SignerStatus.SIGNED) {
    throw createHttpError(409, 'ALREADY_SIGNED', 'Signing already completed');
  }
  if (signer.status === SignerStatus.DECLINED) {
    throw createHttpError(409, 'SIGNING_DECLINED', 'Signing already declined');
  }

  const session = await prisma.signingSession.findUnique({
    where: { id: params.signingSessionId },
  });
  if (!session || session.signerId !== signer.id || session.documentId !== signer.documentId) {
    throw createHttpError(404, 'SESSION_NOT_FOUND', 'Signing session not found');
  }
  if (session.status !== SigningSessionStatus.ACTIVE) {
    throw createHttpError(409, 'STALE_SESSION', 'Signing session is not active');
  }
  if (!session.manifestJson || !session.manifestHash) {
    throw createHttpError(400, 'MANIFEST_MISSING', 'Manifest missing');
  }
  if (!session.signatureArtifactHash || !session.signatureArtifactType) {
    throw createHttpError(400, 'SIGNATURE_MISSING', 'Signature artifact missing');
  }
  if (session.preHash !== signer.document.hash) {
    throw createHttpError(409, 'PREHASH_MISMATCH', 'Pre-hash mismatch');
  }
  if (session.fieldVersion !== signer.document.fieldVersion) {
    throw createHttpError(409, 'STALE_SESSION', 'Signing session is stale');
  }

  const manifest = session.manifestJson as {
    fields: Array<{
      fieldId: string;
      type:
        | 'SIGNATURE'
        | 'DATE'
        | 'INITIAL'
        | 'FULL_NAME'
        | 'EMAIL'
        | 'TEXT'
        | 'CHECKBOX'
        | 'DROPDOWN'
        | 'RADIO'
        | 'COMPANY'
        | 'JOB_TITLE'
        | 'IMAGE'
        | 'ATTACHMENT';
      page: number;
      x: number;
      y: number;
      width: number;
      height: number;
      value: string;
      normalized?: {
        x: number;
        y: number;
        width: number;
        height: number;
      } | null;
    }>;
  };

  const fieldsToApply = manifest.fields;
  const pdfSource = signer.document.signedFileUrl || signer.document.fileUrl || signer.document.filePublicId;
  const pdfBuffer = await downloadStoredFile(pdfSource);

  let signatureImageParsed = null;
  if (session.signatureArtifactType !== SignatureArtifactType.TYPED) {
    if (!session.signatureArtifactUrl) {
      throw createHttpError(400, 'SIGNATURE_MISSING', 'Signature artifact URL missing');
    }
    const imageBuffer = await downloadStoredFile(session.signatureArtifactUrl);
    const artifactHash = hashBuffer(imageBuffer);
    if (artifactHash !== session.signatureArtifactHash) {
      throw createHttpError(409, 'MANIFEST_MISMATCH', 'Signature artifact hash mismatch');
    }
    const isPng = imageBuffer.subarray(0, 4).toString('hex') === '89504e47';
    const isJpeg = imageBuffer.subarray(0, 2).toString('hex') === 'ffd8';
    const mimeType = isJpeg ? 'image/jpeg' : isPng ? 'image/png' : 'image/png';
    signatureImageParsed = { mimeType, buffer: imageBuffer };
  }

  const signedBuffer = await applySignatureToPdf({
    pdfBuffer,
    fields: fieldsToApply,
    signatureImage: signatureImageParsed,
  });

  const postHash = hashBuffer(signedBuffer);
  const postComputedAt = new Date();

  const upload = await uploadBufferToSupabase(signedBuffer, {
    folder: 'signed',
    fileName: `${signer.document.title}-signed.pdf`,
    contentType: 'application/pdf',
  });

  const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const signatures = await Promise.all(
      fieldsToApply.map((field) =>
        tx.signature.create({
          data: {
            documentId: signer.documentId,
            signerId: signer.id,
            fieldId: field.fieldId,
            value: field.value,
            signingSessionId: session.id,
            manifestHash: session.manifestHash,
            artifactHash: session.signatureArtifactHash,
            artifactType: session.signatureArtifactType,
          },
        }),
      ),
    );

    for (const field of fieldsToApply) {
      const shouldSign = field.type === 'SIGNATURE' || field.type === 'INITIAL';
      await tx.signatureField.update({
        where: { id: field.fieldId },
        data: {
          value: field.value,
          status: shouldSign ? FieldStatus.SIGNED : FieldStatus.FILLED,
        },
      });
    }

    await tx.signer.update({
      where: { id: signer.id },
      data: { status: SignerStatus.SIGNED, signedAt: new Date() },
    });

    const remaining = await tx.signer.count({
      where: { documentId: signer.documentId, status: { not: SignerStatus.SIGNED } },
    });

    const updated = await tx.document.update({
      where: { id: signer.documentId },
      data: {
        signedFileUrl: upload.path,
        signedFilePublicId: upload.path,
        postHash,
        postHashAlgorithm: 'SHA-256',
        postHashComputedAt: postComputedAt,
        postHashVersion: { increment: 1 },
        status: remaining === 0 ? DocumentStatus.SIGNED : DocumentStatus.IN_PROGRESS,
        signedAt: remaining === 0 ? new Date() : signer.document.signedAt ?? null,
        version: { increment: 1 },
      },
    });

    const sessionUpdates: Prisma.SigningSessionUpdateInput = {
      status: SigningSessionStatus.FINALIZED,
    };

    if (env.manifestHmacSecret && session.manifestHash) {
      sessionUpdates.serverAttestation = hmacSha256Hex(
        env.manifestHmacSecret,
        `${session.manifestHash}${postHash}`,
      );
      sessionUpdates.serverAttestationAlgorithm = 'HMAC-SHA256';
    }

    await tx.signingSession.update({
      where: { id: session.id },
      data: sessionUpdates,
    });

    const auditEvent = await tx.auditEvent.create({
      data: {
        documentId: signer.documentId,
        actorType: AuditActorType.SIGNER,
        actorSignerId: signer.id,
        eventType: AuditEventType.SIGNATURE_APPLIED,
        ipAddress: params.meta.ipAddress,
        userAgent: params.meta.userAgent,
        metadata: {
          signingSessionId: session.id,
          manifestHash: session.manifestHash,
          signatureArtifactHash: session.signatureArtifactHash,
          postHash,
        },
      },
    });

    return { signatures, updated, remaining, auditEvent };
  });

  await emitEvent(
    createEvent({
      event: 'doc.signature.applied',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: {
        signerId: signer.id,
        signatureIds: result.signatures.map((sig) => sig.id),
        postHash: {
          hash: postHash,
          algorithm: 'SHA-256',
          computedAt: postComputedAt.toISOString(),
        },
      },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.hash.computed',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: {
        postHash: {
          hash: postHash,
          algorithm: 'SHA-256',
          computedAt: postComputedAt.toISOString(),
        },
      },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.signer.status.changed',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: {
        signer: {
          id: signer.id,
          email: signer.email,
          name: signer.name,
          status: SignerStatus.SIGNED,
          order: signer.signOrder,
          viewedAt: signer.viewedAt?.toISOString() ?? null,
          signedAt: new Date().toISOString(),
        },
        previousStatus: signer.status,
      },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.updated',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: {
        document: {
          id: result.updated.id,
          title: result.updated.title,
          status: result.updated.status,
          ownerId: result.updated.ownerId,
          version: result.updated.version,
          updatedAt: result.updated.updatedAt.toISOString(),
        },
        changes: ['status', 'signedAt', 'postHash', 'signedFileUrl'],
      },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.audit.appended',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      correlationId: params.meta.correlationId,
      data: { auditEventId: result.auditEvent.id, eventType: result.auditEvent.eventType },
    }),
  );

  const owner = await prisma.user.findUnique({
    where: { id: signer.document.ownerId },
    select: { name: true, email: true },
  });
  const ownerName = owner?.name?.trim() || owner?.email || 'Document owner';
  const signerName = signer.name ?? signer.email;
  const docLink = `${env.appBaseUrl}/app/documents`;

  const ownerEmail = owner?.email
    ? buildNotificationEmail('document.signed', {
        recipientName: ownerName,
        signerName,
        documentTitle: signer.document.title,
        actionUrl: docLink,
      })
    : null;
  try {
    await dispatchNotification({
      eventType: 'document.signed',
      orgId: signer.document.ownerId,
      docId: signer.documentId,
      recipientUserId: signer.document.ownerId,
      actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
      title: 'Document signed',
      message: `${signerName} signed "${signer.document.title}".`,
      link: docLink,
      idempotencyKey: `document-signed:${signer.id}`,
      payload: {
        documentId: signer.documentId,
        documentTitle: signer.document.title,
        signerId: signer.id,
        signerEmail: signer.email,
      },
      email: owner?.email && ownerEmail
        ? {
            to: owner.email,
            subject: ownerEmail.subject,
            text: ownerEmail.text,
            html: ownerEmail.html,
          }
        : undefined,
    });
  } catch (err) {
    console.warn('Notification dispatch failed', err);
  }

  const signerEmail = buildNotificationEmail('signer.signed', {
    recipientName: signerName,
    documentTitle: signer.document.title,
    actionUrl: env.appBaseUrl,
  });
  try {
    await notifyUserByEmail({
      email: signer.email,
      forceEmail: true,
      input: {
        eventType: 'signer.signed',
        orgId: signer.document.ownerId,
        docId: signer.documentId,
        actor: { userId: signer.id, role: 'SIGNER', email: signer.email },
        title: 'Signature submitted',
        message: `You signed "${signer.document.title}".`,
        link: env.appBaseUrl,
        idempotencyKey: `signer-signed:${signer.id}`,
        payload: {
          documentId: signer.documentId,
          documentTitle: signer.document.title,
        },
        email: {
          to: signer.email,
          subject: signerEmail.subject,
          text: signerEmail.text,
          html: signerEmail.html,
        },
      },
    });
  } catch (err) {
    console.warn('Signer notification failed', err);
  }

  if (result.remaining > 0) {
    await inviteNextSigner({
      documentId: signer.documentId,
      ownerId: signer.document.ownerId,
      ownerName,
      ownerEmail: owner?.email ?? null,
      documentTitle: signer.document.title,
      meta: params.meta,
    });
  }

  return { postHash, documentVersion: result.updated.version, status: result.updated.status };
}

export async function completeDocument(ownerId: string, documentId: string, meta: RequestMeta) {
  const document = await prisma.document.findFirst({
    where: { id: documentId, ownerId },
    include: { signers: true, auditEvents: { orderBy: { createdAt: 'asc' } } },
  });
  if (!document) {
    throw createHttpError(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
  }
  if (document.lockedAt) {
    throw createHttpError(409, 'DOC_LOCKED', 'Document already locked');
  }

  const remaining = document.signers.filter((signer) => signer.status !== SignerStatus.SIGNED);
  if (remaining.length > 0) {
    throw createHttpError(409, 'SIGNERS_PENDING', 'All signers must complete signing');
  }

  const auditSummary = document.auditEvents.map(
    (event) => `${AUDIT_EVENT_LABELS[event.eventType]} - ${event.createdAt.toISOString()}`,
  );

  const certificateBuffer = await generateCertificatePdf({
    title: document.title,
    documentHash: document.hash,
    completedAt: new Date(),
    signers: document.signers.map((signer) => ({
      name: signer.name,
      email: signer.email,
      signedAt: signer.signedAt,
    })),
    auditSummary,
  });

  const upload = await uploadBufferToSupabase(certificateBuffer, {
    folder: 'certificates',
    fileName: `${document.title}-certificate.pdf`,
    contentType: 'application/pdf',
  });

  const certificateHash = hashBuffer(certificateBuffer);

  const { updated, auditEvent } = await prisma.$transaction(async (tx) => {
    const updatedDoc = await tx.document.update({
      where: { id: document.id },
      data: {
        status: DocumentStatus.COMPLETED,
        completedAt: new Date(),
        lockedAt: new Date(),
        version: { increment: 1 },
      },
    });

    await tx.certificate.upsert({
      where: { documentId: document.id },
      update: {
        url: upload.path,
        publicId: upload.path,
        hash: certificateHash,
        summary: {
          documentId: document.id,
          title: document.title,
          hash: document.hash,
          signers: document.signers.map((signer) => ({
            name: signer.name,
            email: signer.email,
            signedAt: signer.signedAt,
          })),
          auditSummary,
        },
      },
      create: {
        documentId: document.id,
        url: upload.path,
        publicId: upload.path,
        hash: certificateHash,
        summary: {
          documentId: document.id,
          title: document.title,
          hash: document.hash,
          signers: document.signers.map((signer) => ({
            name: signer.name,
            email: signer.email,
            signedAt: signer.signedAt,
          })),
          auditSummary,
        },
      },
    });

    const auditEvent = await tx.auditEvent.create({
      data: {
        documentId: document.id,
        actorType: AuditActorType.SYSTEM,
        eventType: AuditEventType.DOCUMENT_COMPLETED,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
        metadata: {
          preHash: document.hash,
          postHash: document.postHash,
          certificateHash,
        },
      },
    });

    return { updated: updatedDoc, auditEvent };
  });

  await emitEvent(
    createEvent({
      event: 'doc.completed',
      orgId: ownerId,
      docId: document.id,
      actor: { userId: ownerId, role: 'SENDER' },
      correlationId: meta.correlationId,
      data: {
        document: {
          id: updated.id,
          title: updated.title,
          status: updated.status,
          ownerId: updated.ownerId,
          version: updated.version,
          updatedAt: updated.updatedAt.toISOString(),
        },
        completedAt: updated.completedAt?.toISOString() ?? new Date().toISOString(),
      },
    }),
  );

  await emitEvent(
    createEvent({
      event: 'doc.audit.appended',
      orgId: ownerId,
      docId: document.id,
      actor: { userId: ownerId, role: 'SENDER' },
      correlationId: meta.correlationId,
      data: { auditEventId: auditEvent.id, eventType: auditEvent.eventType },
    }),
  );

  const owner = await prisma.user.findUnique({
    where: { id: ownerId },
    select: { name: true, email: true },
  });
  const ownerName = owner?.name?.trim() || owner?.email || 'Document owner';
  const docLink = `${env.appBaseUrl}/app/documents`;

  const ownerEmail = owner?.email
    ? buildNotificationEmail('document.completed', {
        recipientName: ownerName,
        documentTitle: document.title,
        actionUrl: docLink,
        orgName: ownerName,
      })
    : null;
  try {
    await dispatchNotification({
      eventType: 'document.completed',
      orgId: ownerId,
      docId: document.id,
      recipientUserId: ownerId,
      actor: { userId: ownerId, role: 'SENDER', email: owner?.email ?? undefined },
      title: 'Document completed',
      message: `"${document.title}" is fully signed.`,
      link: docLink,
      idempotencyKey: `document-completed:${document.id}`,
      payload: {
        documentId: document.id,
        documentTitle: document.title,
      },
      email: owner?.email && ownerEmail
        ? {
            to: owner.email,
            subject: ownerEmail.subject,
            text: ownerEmail.text,
            html: ownerEmail.html,
          }
        : undefined,
    });
  } catch (err) {
    console.warn('Notification dispatch failed', err);
  }

  for (const signer of document.signers) {
    const signerName = signer.name ?? signer.email;
    const signerEmail = buildNotificationEmail('document.completed', {
      recipientName: signerName,
      documentTitle: document.title,
      actionUrl: docLink,
      orgName: ownerName,
    });
    try {
      await notifyUserByEmail({
        email: signer.email,
        forceEmail: true,
        input: {
          eventType: 'document.completed',
          orgId: ownerId,
          docId: document.id,
          actor: { userId: ownerId, role: 'SENDER', email: owner?.email ?? undefined },
          title: 'Document completed',
          message: `"${document.title}" is fully signed.`,
          link: docLink,
          idempotencyKey: `document-completed:${document.id}:${signer.id}`,
          payload: {
            documentId: document.id,
            documentTitle: document.title,
          },
          email: {
            to: signer.email,
            subject: signerEmail.subject,
            text: signerEmail.text,
            html: signerEmail.html,
          },
        },
      });
    } catch (err) {
      console.warn('Signer notification failed', err);
    }
  }

  return updated;
}

export async function getAuditReport(ownerId: string, documentId: string) {
  const document = await prisma.document.findFirst({
    where: { id: documentId, ownerId },
    include: {
      signers: true,
      signatures: true,
      auditEvents: { orderBy: { createdAt: 'asc' } },
      signingSessions: true,
    },
  });
  if (!document) {
    throw createHttpError(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
  }

  return {
    document: {
      id: document.id,
      title: document.title,
      status: document.status,
      preHash: document.hash,
      preHashAlgorithm: document.hashAlgorithm,
      preHashComputedAt: document.hashComputedAt?.toISOString() ?? null,
      postHash: document.postHash,
      postHashAlgorithm: document.postHashAlgorithm,
      postHashComputedAt: document.postHashComputedAt?.toISOString() ?? null,
      postHashVersion: document.postHashVersion,
      lockedAt: document.lockedAt?.toISOString() ?? null,
    },
    signers: document.signers.map((signer) => ({
      id: signer.id,
      email: signer.email,
      name: signer.name,
      status: signer.status,
      signOrder: signer.signOrder,
      viewedAt: signer.viewedAt?.toISOString() ?? null,
      signedAt: signer.signedAt?.toISOString() ?? null,
      declinedAt: signer.declinedAt?.toISOString() ?? null,
      declineReason: signer.declineReason ?? null,
    })),
    signingSessions: document.signingSessions.map((session) => ({
      id: session.id,
      signerId: session.signerId,
      status: session.status,
      preHash: session.preHash,
      preHashAlgorithm: session.preHashAlgorithm,
      preHashComputedAt: session.preHashComputedAt.toISOString(),
      manifestHash: session.manifestHash,
      signatureArtifactHash: session.signatureArtifactHash,
      signatureArtifactType: session.signatureArtifactType,
      serverAttestation: session.serverAttestation,
      serverAttestationAlgorithm: session.serverAttestationAlgorithm,
      createdAt: session.createdAt.toISOString(),
    })),
    signatures: document.signatures.map((signature) => ({
      id: signature.id,
      fieldId: signature.fieldId,
      signerId: signature.signerId,
      signingSessionId: signature.signingSessionId,
      manifestHash: signature.manifestHash,
      artifactHash: signature.artifactHash,
      artifactType: signature.artifactType,
      signedAt: signature.signedAt.toISOString(),
    })),
    auditEvents: document.auditEvents.map((event) => ({
      id: event.id,
      eventType: event.eventType,
      actorType: event.actorType,
      ipAddress: event.ipAddress,
      userAgent: event.userAgent,
      metadata: event.metadata,
      createdAt: event.createdAt.toISOString(),
    })),
  };
}
