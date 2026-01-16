type EmailTemplateType =
  | 'signer.invited'
  | 'signer.signed'
  | 'reminder.pending_signature'
  | 'document.signed'
  | 'document.completed'
  | 'document.shared'
  | 'user.invited';

type EmailTemplateData = {
  recipientName?: string;
  documentTitle?: string;
  senderName?: string;
  signerName?: string;
  orgName?: string;
  actionUrl?: string;
  downloadUrl?: string;
  expiresAt?: string;
  portalUrl?: string;
  customMessage?: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatMessage = (value?: string) => {
  if (!value) return '';
  return escapeHtml(value).replace(/\r?\n/g, '<br />');
};

const buildEmailFrame = (params: {
  title: string;
  preview: string;
  body: string;
  actionLabel?: string;
  actionUrl?: string;
  secondaryActionLabel?: string;
  secondaryActionUrl?: string;
  footer?: string;
}) => {
  const action =
    params.actionLabel && params.actionUrl
      ? `<p style="margin:24px 0;display:flex;gap:12px;flex-wrap:wrap;">
           <a href="${params.actionUrl}"
              style="background:#335cff;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:10px;display:inline-block;font-weight:600;">
              ${escapeHtml(params.actionLabel)}
           </a>
           ${
             params.secondaryActionLabel && params.secondaryActionUrl
               ? `<a href="${params.secondaryActionUrl}"
                  style="background:#eef2ff;color:#1d4ed8;text-decoration:none;padding:12px 18px;border-radius:10px;display:inline-block;font-weight:600;">
                  ${escapeHtml(params.secondaryActionLabel)}
                 </a>`
               : ''
           }
         </p>`
      : '';
  const footer = params.footer ? `<p style="color:#64748b;font-size:12px;">${params.footer}</p>` : '';
  return {
    html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:#f5f6fb;font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:32px 20px;">
      <div style="background:#ffffff;border-radius:20px;padding:28px;border:1px solid #e4e7f0;">
        <p style="margin:0 0 8px;color:#64748b;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">
          ${escapeHtml(params.preview)}
        </p>
        <h2 style="margin:0 0 12px;font-size:22px;color:#0f172a;">${escapeHtml(params.title)}</h2>
        <div style="font-size:15px;line-height:1.6;color:#1f2937;">${params.body}</div>
        ${action}
      </div>
      ${footer}
    </div>
  </body>
</html>`,
  };
};

export function renderEmailTemplate(template: EmailTemplateType, data: EmailTemplateData) {
  const recipientName = data.recipientName ? escapeHtml(data.recipientName) : 'there';
  const documentTitle = data.documentTitle ? escapeHtml(data.documentTitle) : 'your document';
  const senderName = data.senderName ? escapeHtml(data.senderName) : 'a teammate';
  const orgName = data.orgName ? escapeHtml(data.orgName) : 'your organization';
  const signerName = data.signerName ? escapeHtml(data.signerName) : 'A signer';
  const customMessage = formatMessage(data.customMessage);
  if (template === 'signer.invited') {
    const subject = `You've been invited to sign: ${documentTitle}`;
    const expires = data.expiresAt ? `This link expires at ${data.expiresAt}.` : '';
    const portalText = data.portalUrl ? `\nOr sign in here: ${data.portalUrl}` : '';
    const text = `Hi ${recipientName},\n\n${senderName} invited you to sign "${documentTitle}".\n${expires ? `${expires}\n` : ''}Open the link: ${data.actionUrl}${portalText}\n\nIf you did not expect this, you can ignore this email.`;
    const body = `<p>Hi ${recipientName},</p>
      <p><strong>${senderName}</strong> invited you to sign "<strong>${documentTitle}</strong>".</p>
      ${expires ? `<p>${expires}</p>` : ''}
      ${data.portalUrl ? `<p>Prefer your account? <a href="${data.portalUrl}">Sign in</a> to view it in Received.</p>` : ''}
      <p>If you did not expect this, you can ignore this email.</p>`;
    const { html } = buildEmailFrame({
      title: `Sign ${documentTitle}`,
      preview: 'Signature request',
      body,
      actionLabel: 'Review and sign',
      actionUrl: data.actionUrl,
      footer: 'This invitation was sent by WilsonFlow.',
    });
    return { subject, text, html };
  }

  if (template === 'reminder.pending_signature') {
    const subject = `Reminder: signature needed for ${documentTitle}`;
    const text = `Hi ${recipientName},\n\nThis is a reminder to sign "${documentTitle}".\nOpen the link: ${data.actionUrl}\n\nIf you already signed, you can ignore this message.`;
    const body = `<p>Hi ${recipientName},</p>
      <p>This is a friendly reminder to sign "<strong>${documentTitle}</strong>".</p>
      <p>If you already signed, you can ignore this message.</p>`;
    const { html } = buildEmailFrame({
      title: `Signature reminder for ${documentTitle}`,
      preview: 'Signature reminder',
      body,
      actionLabel: 'Open document',
      actionUrl: data.actionUrl,
      footer: 'Need help? Reply to this email.',
    });
    return { subject, text, html };
  }

  if (template === 'signer.signed') {
    const subject = `Signature completed: ${documentTitle}`;
    const text = `Hi ${recipientName},\n\nYou signed "${documentTitle}".\nIf you need a copy, please contact the sender.`;
    const body = `<p>Hi ${recipientName},</p>
      <p>You signed "<strong>${documentTitle}</strong>".</p>
      <p>If you need a copy, please contact the sender.</p>`;
    const { html } = buildEmailFrame({
      title: 'Signature completed',
      preview: 'Signature confirmation',
      body,
      actionLabel: data.actionUrl ? 'Open WilsonFlow' : undefined,
      actionUrl: data.actionUrl,
      footer: 'Thank you for signing.',
    });
    return { subject, text, html };
  }

  if (template === 'document.signed') {
    const subject = `${signerName} signed ${documentTitle}`;
    const text = `Hi ${recipientName},\n\n${signerName} signed "${documentTitle}".\nView the document: ${data.actionUrl}`;
    const body = `<p>Hi ${recipientName},</p>
      <p><strong>${signerName}</strong> signed "<strong>${documentTitle}</strong>".</p>`;
    const { html } = buildEmailFrame({
      title: 'Document signed',
      preview: 'Signature update',
      body,
      actionLabel: 'View document',
      actionUrl: data.actionUrl,
      footer: 'You are receiving this because you are the document owner.',
    });
    return { subject, text, html };
  }

  if (template === 'document.shared') {
    const subject = `${senderName} shared a document: ${documentTitle}`;
    const textMessage = data.customMessage ? `\n\nMessage:\n${data.customMessage}` : '';
    const text = `Hi ${recipientName},\n\n${senderName} shared "${documentTitle}" with you.\nOpen the document: ${data.actionUrl ?? ''}\nDownload: ${data.downloadUrl ?? ''}${textMessage}\n\nIf you did not expect this, you can ignore this email.`;
    const messageBlock = customMessage ? `<p><strong>Message:</strong><br />${customMessage}</p>` : '';
    const downloadLink = data.downloadUrl
      ? `<p><a href="${data.downloadUrl}" style="color:#335cff;font-weight:600;">Download document</a></p>`
      : '';
    const body = `<p>Hi ${recipientName},</p>
      <p><strong>${senderName}</strong> shared "<strong>${documentTitle}</strong>" with you.</p>
      ${messageBlock}
      ${downloadLink}
      <p>If you did not expect this, you can ignore this email.</p>`;
    const { html } = buildEmailFrame({
      title: 'Document shared',
      preview: 'Document shared',
      body,
      actionLabel: 'Preview document',
      actionUrl: data.actionUrl,
      secondaryActionLabel: data.downloadUrl ? 'Download' : undefined,
      secondaryActionUrl: data.downloadUrl,
      footer: 'Sent via WilsonFlow.',
    });
    return { subject, text, html };
  }

  if (template === 'document.completed') {
    const subject = `Document completed: ${documentTitle}`;
    const text = `Hi ${recipientName},\n\n"${documentTitle}" is fully signed and completed.\nView the document: ${data.actionUrl}`;
    const body = `<p>Hi ${recipientName},</p>
      <p>"<strong>${documentTitle}</strong>" is fully signed and completed.</p>`;
    const { html } = buildEmailFrame({
      title: 'Document completed',
      preview: 'Completion notice',
      body,
      actionLabel: 'View document',
      actionUrl: data.actionUrl,
      footer: `Sent by ${orgName}.`,
    });
    return { subject, text, html };
  }

  const subject = `You're invited to ${orgName}`;
  const text = `Hi ${recipientName},\n\n${senderName} invited you to join ${orgName}.\nOpen the link: ${data.actionUrl}`;
  const body = `<p>Hi ${recipientName},</p>
    <p><strong>${senderName}</strong> invited you to join <strong>${orgName}</strong>.</p>`;
  const { html } = buildEmailFrame({
    title: `Join ${orgName}`,
    preview: 'Organization invite',
    body,
    actionLabel: 'Accept invitation',
    actionUrl: data.actionUrl,
    footer: 'If you did not expect this, you can ignore this email.',
  });
  return { subject, text, html };
}
