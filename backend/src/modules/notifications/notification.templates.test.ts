import { describe, expect, it } from 'vitest';
import { renderEmailTemplate } from './notification.templates';

describe('notification email templates', () => {
  it('renders signer invite subject and body', () => {
    const result = renderEmailTemplate('signer.invited', {
      recipientName: 'Pat',
      documentTitle: 'NDA',
      senderName: 'Alex',
      actionUrl: 'http://localhost:5173/sign/token',
    });
    expect(result.subject).toContain('NDA');
    expect(result.text).toContain('Alex');
    expect(result.html).toContain('Review and sign');
  });

  it('renders document completed subject', () => {
    const result = renderEmailTemplate('document.completed', {
      recipientName: 'Pat',
      documentTitle: 'Agreement',
      actionUrl: 'http://localhost:5173/app/documents',
      orgName: 'Acme',
    });
    expect(result.subject).toContain('Agreement');
    expect(result.text).toContain('completed');
  });
});
