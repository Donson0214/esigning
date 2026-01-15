import type { Request, Response, NextFunction } from 'express';
import {
  createDocumentSchema,
  sendDocumentSchema,
  createFieldSchema,
  updateFieldSchema,
} from './document.types';
import * as documentService from './document.service';
import { getAuditReport } from '../signing/signing-integrity.service';
import { createSignedUrl, downloadStoredFile } from '../../utils/supabase.util';

const sanitizeFileName = (value: string) => value.replace(/["\\\r\n]/g, '_');

function getParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function createDocument(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createDocumentSchema.parse(req.body);
    if (!req.file) {
      return res.status(400).json({ error: 'FILE_REQUIRED' });
    }
    const document = await documentService.createDocument({
      ownerId: req.user!.id,
      title: input.title,
      file: req.file,
      meta: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? undefined,
        correlationId: req.correlationId,
      },
    });
    res.status(201).json(document);
  } catch (err) {
    next(err);
  }
}

export async function listDocuments(req: Request, res: Response, next: NextFunction) {
  try {
    const documents = await documentService.listDocuments(req.user!.id);
    res.json({ documents });
  } catch (err) {
    next(err);
  }
}

export async function listReceivedSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const summary = await documentService.getReceivedSummary(req.user!.id);
    res.json(summary);
  } catch (err) {
    next(err);
  }
}

export async function getDocument(req: Request, res: Response, next: NextFunction) {
  try {
    const documentId = getParam(req.params.id);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    const document = await documentService.getDocument(req.user!.id, documentId);
    res.json(document);
  } catch (err) {
    next(err);
  }
}

export async function getDocumentPreviewUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const documentId = getParam(req.params.id);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    const document = await documentService.getDocument(req.user!.id, documentId);
    const url = await createSignedUrl(document.filePublicId || document.fileUrl);
    if (!url) {
      return res.status(404).json({ error: 'PREVIEW_UNAVAILABLE' });
    }
    res.json({ url });
  } catch (err) {
    next(err);
  }
}

export async function getDocumentFile(req: Request, res: Response, next: NextFunction) {
  try {
    const documentId = getParam(req.params.id);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    const document = await documentService.getDocument(req.user!.id, documentId);
    const buffer = await downloadStoredFile(document.filePublicId || document.fileUrl);
    const contentType = document.fileMimeType || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `inline; filename="${sanitizeFileName(document.fileName)}"`);
    res.setHeader('Cache-Control', 'private, max-age=300');
    res.setHeader('Content-Length', buffer.length.toString());
    res.send(buffer);
  } catch (err) {
    next(err);
  }
}

export async function sendDocument(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = sendDocumentSchema.parse(req.body);
    const documentId = getParam(req.params.id);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    const document = await documentService.sendDocument({
      ownerId: req.user!.id,
      documentId,
      payload,
      meta: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? undefined,
        correlationId: req.correlationId,
      },
    });
    res.json(document);
  } catch (err) {
    next(err);
  }
}

export async function createField(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createFieldSchema.parse(req.body);
    const documentId = getParam(req.params.id);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    const field = await documentService.createField({
      ownerId: req.user!.id,
      documentId,
      input,
      meta: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? undefined,
        correlationId: req.correlationId,
      },
    });
    res.status(201).json(field);
  } catch (err) {
    next(err);
  }
}

export async function updateField(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updateFieldSchema.parse(req.body);
    const documentId = getParam(req.params.id);
    const fieldId = getParam(req.params.fieldId);
    if (!documentId || !fieldId) {
      return res.status(400).json({ error: 'FIELD_ID_REQUIRED' });
    }
    const field = await documentService.updateField({
      ownerId: req.user!.id,
      documentId,
      fieldId,
      input,
      meta: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? undefined,
        correlationId: req.correlationId,
      },
    });
    res.json(field);
  } catch (err) {
    next(err);
  }
}

export async function deleteField(req: Request, res: Response, next: NextFunction) {
  try {
    const documentId = getParam(req.params.id);
    const fieldId = getParam(req.params.fieldId);
    if (!documentId || !fieldId) {
      return res.status(400).json({ error: 'FIELD_ID_REQUIRED' });
    }
    const result = await documentService.deleteField({
      ownerId: req.user!.id,
      documentId,
      fieldId,
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

export async function getStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await documentService.getDocumentStats(req.user!.id);
    res.json(stats);
  } catch (err) {
    next(err);
  }
}

export async function getAudit(req: Request, res: Response, next: NextFunction) {
  try {
    const documentId = getParam(req.params.id);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    const report = await getAuditReport(req.user!.id, documentId);
    res.json(report);
  } catch (err) {
    next(err);
  }
}

export async function getCertificate(req: Request, res: Response, next: NextFunction) {
  try {
    const documentId = getParam(req.params.id);
    if (!documentId) {
      return res.status(400).json({ error: 'DOCUMENT_ID_REQUIRED' });
    }
    const document = await documentService.getDocument(req.user!.id, documentId);
    res.json({ certificate: document.certificate });
  } catch (err) {
    next(err);
  }
}
