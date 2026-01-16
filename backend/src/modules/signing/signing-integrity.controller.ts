import type { Request, Response, NextFunction } from 'express';
import {
  applySignatureSchema,
  createSigningSessionSchema,
  createSignerFieldSchema,
  completeSigningSchema,
  submitManifestSchema,
  uploadSignatureSchema,
} from './signing.types';
import * as signingIntegrityService from './signing-integrity.service';
import { createEvent, type EventReasonCode } from '../../shared/events';
import { emitEvent } from '../../realtime/socket';
import { prisma } from '../../config/prisma';

function getParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

async function emitSignatureRejected(
  req: Request,
  documentId: string,
  code: EventReasonCode,
  message: string,
) {
  if (!req.signer) return;
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    select: { ownerId: true },
  });
  if (!document) return;
  void emitEvent(
    createEvent({
      event: 'doc.signature.rejected',
      orgId: document.ownerId,
      docId: documentId,
      actor: { userId: req.signer.id, role: 'SIGNER', email: req.signer.email },
      correlationId: req.correlationId,
      data: { signerId: req.signer.id, reasonCode: code, message },
    }),
  );
}

export async function precomputeHash(req: Request, res: Response, next: NextFunction) {
  try {
    const documentId = getParam(req.params.docId);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    const result = await signingIntegrityService.precomputeDocumentHash(req.user!.id, documentId, {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? undefined,
      correlationId: req.correlationId,
    });
    res.json(result);
  } catch (err) {
    const docId = getParam(req.params.docId);
    if (docId && err instanceof Error) {
      void emitSignatureRejected(
        req,
        docId,
        (err as any).code ?? 'VALIDATION_FAILED',
        err.message,
      );
    }
    next(err);
  }
}

export async function createSigningSession(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createSigningSessionSchema.parse(req.body ?? {});
    const documentId = getParam(req.params.docId);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    if (!req.signer) {
      return res.status(401).json({ error: 'SIGNER_REQUIRED' });
    }
    const result = await signingIntegrityService.createSigningSession({
      documentId,
      signerId: req.signer.id,
      meta: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? undefined,
        correlationId: req.correlationId,
        clientMutationId: input.clientMutationId,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    const docId = getParam(req.params.docId);
    if (docId && err instanceof Error) {
      void emitSignatureRejected(
        req,
        docId,
        (err as any).code ?? 'VALIDATION_FAILED',
        err.message,
      );
    }
    next(err);
  }
}

export async function createSignerField(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createSignerFieldSchema.parse(req.body ?? {});
    const documentId = getParam(req.params.docId);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    if (!req.signer) {
      return res.status(401).json({ error: 'SIGNER_REQUIRED' });
    }
    const result = await signingIntegrityService.createSignerField({
      documentId,
      signerId: req.signer.id,
      input,
      meta: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? undefined,
        correlationId: req.correlationId,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    const docId = getParam(req.params.docId);
    if (docId && err instanceof Error) {
      void emitSignatureRejected(
        req,
        docId,
        (err as any).code ?? 'VALIDATION_FAILED',
        err.message,
      );
    }
    next(err);
  }
}

export async function submitManifest(req: Request, res: Response, next: NextFunction) {
  try {
    const input = submitManifestSchema.parse(req.body ?? {});
    const documentId = getParam(req.params.docId);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    if (!req.signer) {
      return res.status(401).json({ error: 'SIGNER_REQUIRED' });
    }
    const result = await signingIntegrityService.submitManifest({
      documentId,
      signerId: req.signer.id,
      signingSessionId: input.signingSessionId,
      fields: input.fields,
      meta: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? undefined,
        correlationId: req.correlationId,
      },
    });
    res.json(result);
  } catch (err) {
    const docId = getParam(req.params.docId);
    if (docId && err instanceof Error) {
      void emitSignatureRejected(
        req,
        docId,
        (err as any).code ?? 'VALIDATION_FAILED',
        err.message,
      );
    }
    next(err);
  }
}

export async function uploadSignature(req: Request, res: Response, next: NextFunction) {
  try {
    const input = uploadSignatureSchema.parse(req.body ?? {});
    const documentId = getParam(req.params.docId);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    if (!req.signer) {
      return res.status(401).json({ error: 'SIGNER_REQUIRED' });
    }
    const result = await signingIntegrityService.uploadSignatureArtifact({
      documentId,
      signerId: req.signer.id,
      signingSessionId: input.signingSessionId,
      type: input.type,
      data: input.data,
      meta: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? undefined,
        correlationId: req.correlationId,
      },
    });
    res.json(result);
  } catch (err) {
    const docId = getParam(req.params.docId);
    if (docId && err instanceof Error) {
      void emitSignatureRejected(
        req,
        docId,
        (err as any).code ?? 'VALIDATION_FAILED',
        err.message,
      );
    }
    next(err);
  }
}

export async function applySignature(req: Request, res: Response, next: NextFunction) {
  try {
    const input = applySignatureSchema.parse(req.body ?? {});
    const documentId = getParam(req.params.docId);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    if (!req.signer) {
      return res.status(401).json({ error: 'SIGNER_REQUIRED' });
    }
    const result = await signingIntegrityService.applySignature({
      documentId,
      signerId: req.signer.id,
      signingSessionId: input.signingSessionId,
      meta: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? undefined,
        correlationId: req.correlationId,
      },
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function completeSigning(req: Request, res: Response, next: NextFunction) {
  try {
    const input = completeSigningSchema.parse(req.body ?? {});
    const documentId = getParam(req.params.docId);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    if (!req.signer) {
      return res.status(401).json({ error: 'SIGNER_REQUIRED' });
    }
    const meta = {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? undefined,
      correlationId: req.correlationId,
      clientMutationId: input.clientMutationId,
    };
    let signingSessionId = input.signingSessionId;
    if (!signingSessionId) {
      const session = await signingIntegrityService.createSigningSession({
        documentId,
        signerId: req.signer.id,
        meta,
      });
      signingSessionId = session.signingSessionId;
    }

    await signingIntegrityService.submitManifest({
      documentId,
      signerId: req.signer.id,
      signingSessionId,
      fields: input.fields,
      meta,
    });

    await signingIntegrityService.uploadSignatureArtifact({
      documentId,
      signerId: req.signer.id,
      signingSessionId,
      type: input.signature.type,
      data: input.signature.data,
      meta,
    });

    const applyResult = await signingIntegrityService.applySignature({
      documentId,
      signerId: req.signer.id,
      signingSessionId,
      meta,
    });

    res.status(201).json({ ...applyResult, signingSessionId });
  } catch (err) {
    const docId = getParam(req.params.docId);
    if (docId && err instanceof Error) {
      void emitSignatureRejected(
        req,
        docId,
        (err as any).code ?? 'VALIDATION_FAILED',
        err.message,
      );
    }
    next(err);
  }
}

export async function completeDocument(req: Request, res: Response, next: NextFunction) {
  try {
    const documentId = getParam(req.params.docId);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    const result = await signingIntegrityService.completeDocument(req.user!.id, documentId, {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? undefined,
      correlationId: req.correlationId,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getAuditReport(req: Request, res: Response, next: NextFunction) {
  try {
    const documentId = getParam(req.params.docId);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    const report = await signingIntegrityService.getAuditReport(req.user!.id, documentId);
    res.json(report);
  } catch (err) {
    next(err);
  }
}
