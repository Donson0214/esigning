"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCertificatePdf = generateCertificatePdf;
const pdf_lib_1 = require("pdf-lib");
function formatUtc(date) {
    if (!date)
        return 'N/A';
    return date.toISOString().replace('T', ' ').replace('Z', ' UTC');
}
async function generateCertificatePdf(input) {
    const pdfDoc = await pdf_lib_1.PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const font = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.HelveticaBold);
    let y = 800;
    const lineHeight = 18;
    page.drawText('Certificate of Completion', {
        x: 50,
        y,
        size: 20,
        font: fontBold,
        color: (0, pdf_lib_1.rgb)(0.1, 0.1, 0.1),
    });
    y -= lineHeight * 2;
    page.drawText(`Document: ${input.title}`, { x: 50, y, size: 12, font });
    y -= lineHeight;
    page.drawText(`Document Hash (SHA-256): ${input.documentHash}`, {
        x: 50,
        y,
        size: 10,
        font,
    });
    y -= lineHeight * 2;
    page.drawText(`Completed At (UTC): ${formatUtc(input.completedAt)}`, {
        x: 50,
        y,
        size: 12,
        font,
    });
    y -= lineHeight * 2;
    page.drawText('Signers:', { x: 50, y, size: 12, font: fontBold });
    y -= lineHeight;
    for (const signer of input.signers) {
        const line = `${signer.name ?? 'Signer'} <${signer.email}> - ${formatUtc(signer.signedAt)}`;
        page.drawText(line, { x: 60, y, size: 10, font });
        y -= lineHeight;
    }
    y -= lineHeight;
    page.drawText('Audit Summary:', { x: 50, y, size: 12, font: fontBold });
    y -= lineHeight;
    for (const entry of input.auditSummary) {
        page.drawText(`- ${entry}`, { x: 60, y, size: 10, font });
        y -= lineHeight;
        if (y < 80)
            break;
    }
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
}
