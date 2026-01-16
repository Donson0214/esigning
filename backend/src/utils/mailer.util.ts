import { mailer } from '../config/mailer';
import { env } from '../config/env';

type SendMailInput = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
};

export async function sendMail(input: SendMailInput) {
  return mailer.sendMail({
    from: env.smtp.from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
    attachments: input.attachments,
  });
}
