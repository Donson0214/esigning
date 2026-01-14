import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      cb(new Error('Only PDF files are allowed'));
      return;
    }
    cb(null, true);
  },
});

function validatePdfBuffer(req: Request, res: Response, next: NextFunction) {
  if (!req.file) {
    return next();
  }
  const header = req.file.buffer.subarray(0, 5).toString('ascii');
  if (header !== '%PDF-') {
    return res.status(400).json({ error: 'INVALID_FILE', message: 'Invalid PDF header' });
  }
  return next();
}

export const uploadPdf = [upload.single('file'), validatePdfBuffer];
