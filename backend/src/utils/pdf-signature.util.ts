import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { createHttpError } from './http-error.util';
import { parseDataUrl, type ParsedDataUrl } from './signature.util';

type PdfFieldValue = {
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
};

const isValidNormalizedRect = (
  rect?: PdfFieldValue['normalized'] | null,
): rect is NonNullable<PdfFieldValue['normalized']> => {
  if (!rect) return false;
  return [rect.x, rect.y, rect.width, rect.height].every((value) => Number.isFinite(value)) &&
    rect.x >= 0 &&
    rect.y >= 0 &&
    rect.width > 0 &&
    rect.height > 0 &&
    rect.x <= 1 &&
    rect.y <= 1 &&
    rect.width <= 1 &&
    rect.height <= 1;
};

const resolveFieldRect = (field: PdfFieldValue, page: { getSize: () => { width: number; height: number } }) => {
  const { width: pageWidth, height: pageHeight } = page.getSize();
  if (isValidNormalizedRect(field.normalized)) {
    const { x, y, width, height } = field.normalized;
    return {
      x: x * pageWidth,
      y: (1 - y - height) * pageHeight,
      width: width * pageWidth,
      height: height * pageHeight,
    };
  }
  return {
    x: field.x,
    y: field.y,
    width: field.width,
    height: field.height,
  };
};

export async function applySignatureToPdf(params: {
  pdfBuffer: Buffer;
  fields: PdfFieldValue[];
  signatureImage?: ParsedDataUrl | null;
}): Promise<Buffer> {
  const pdfDoc = await PDFDocument.load(params.pdfBuffer);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0, 0, 0);

  let embeddedImage: any;
  if (params.signatureImage?.buffer) {
    const mimeType = params.signatureImage.mimeType.toLowerCase();
    if (mimeType.includes('png')) {
      embeddedImage = await pdfDoc.embedPng(params.signatureImage.buffer);
    } else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
      embeddedImage = await pdfDoc.embedJpg(params.signatureImage.buffer);
    } else {
      throw createHttpError(400, 'UNSUPPORTED_SIGNATURE_IMAGE', 'Unsupported signature image type');
    }
  }
  const embeddedImages = new Map<string, any>();
  const embedImageFromValue = async (value: string) => {
    if (embeddedImages.has(value)) {
      return embeddedImages.get(value);
    }
    const parsed = parseDataUrl(value);
    if (!parsed) {
      throw createHttpError(400, 'INVALID_SIGNATURE', 'Signature data must be a base64 data URL');
    }
    const mimeType = parsed.mimeType.toLowerCase();
    let image: any;
    if (mimeType.includes('png')) {
      image = await pdfDoc.embedPng(parsed.buffer);
    } else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
      image = await pdfDoc.embedJpg(parsed.buffer);
    } else {
      throw createHttpError(400, 'UNSUPPORTED_SIGNATURE_IMAGE', 'Unsupported signature image type');
    }
    embeddedImages.set(value, image);
    return image;
  };

  const totalPages = pdfDoc.getPageCount();

  const toPdfText = (value: string) => value.replace(/[^\x20-\x7E]/g, '');

  for (const field of params.fields) {
    if (!Number.isFinite(field.page) || field.page < 1) continue;
    const pageIndex = Math.max(0, field.page - 1);
    if (pageIndex >= totalPages) continue;
    const page = pdfDoc.getPage(pageIndex);
    const rect = resolveFieldRect(field, page);
    if (
      !Number.isFinite(rect.x) ||
      !Number.isFinite(rect.y) ||
      !Number.isFinite(rect.width) ||
      !Number.isFinite(rect.height) ||
      rect.width <= 0 ||
      rect.height <= 0
    ) {
      continue;
    }

    const drawText = (text: string, size: number) => {
      const safe = toPdfText(text);
      if (!safe) return;
      page.drawText(safe, {
        x: rect.x,
        y: rect.y + rect.height / 3,
        size,
        font,
        color: ink,
      });
    };

    if (field.type === 'SIGNATURE') {
      const value = field.value ?? '';
      if (value.startsWith('data:image')) {
        const fieldImage = await embedImageFromValue(value);
        page.drawImage(fieldImage, {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        });
      } else if (value) {
        const safeValue = toPdfText(value);
        if (!safeValue) continue;
        page.drawText(safeValue, {
          x: rect.x,
          y: rect.y + rect.height / 3,
          size: Math.min(18, rect.height),
          font: fontBold,
          color: ink,
        });
      } else if (embeddedImage) {
        page.drawImage(embeddedImage, {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        });
      }
    }

    if (field.type === 'DATE') {
      drawText(field.value, Math.min(12, rect.height));
    }

    if (
      field.type === 'INITIAL' ||
      field.type === 'FULL_NAME' ||
      field.type === 'EMAIL' ||
      field.type === 'TEXT' ||
      field.type === 'COMPANY' ||
      field.type === 'JOB_TITLE' ||
      field.type === 'DROPDOWN' ||
      field.type === 'RADIO'
    ) {
      drawText(field.value, Math.min(12, rect.height));
    }

    if (field.type === 'CHECKBOX') {
      const checked = field.value?.toLowerCase() === 'true' || field.value === '1' || field.value === 'checked';
      if (checked) {
        page.drawText('X', {
          x: rect.x + rect.width / 4,
          y: rect.y + rect.height / 4,
          size: Math.min(16, rect.height),
          font: fontBold,
          color: rgb(0.1, 0.4, 0.2),
        });
      }
    }

    if (field.type === 'IMAGE') {
      const value = field.value ?? '';
      if (!value.startsWith('data:image')) continue;
      const parsed = parseDataUrl(value);
      if (!parsed) continue;
      const mimeType = parsed.mimeType.toLowerCase();
      let embedded: any;
      if (mimeType.includes('png')) {
        embedded = await pdfDoc.embedPng(parsed.buffer);
      } else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
        embedded = await pdfDoc.embedJpg(parsed.buffer);
      } else {
        continue;
      }
      page.drawImage(embedded, {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    }

    if (field.type === 'ATTACHMENT') {
      drawText('Attachment', Math.min(10, rect.height));
    }
  }

  const bytes = await pdfDoc.save();
  return Buffer.from(bytes);
}
