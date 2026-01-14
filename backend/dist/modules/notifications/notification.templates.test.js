"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const notification_templates_1 = require("./notification.templates");
(0, vitest_1.describe)('notification email templates', () => {
    (0, vitest_1.it)('renders signer invite subject and body', () => {
        const result = (0, notification_templates_1.renderEmailTemplate)('signer.invited', {
            recipientName: 'Pat',
            documentTitle: 'NDA',
            senderName: 'Alex',
            actionUrl: 'http://localhost:5173/sign/token',
        });
        (0, vitest_1.expect)(result.subject).toContain('NDA');
        (0, vitest_1.expect)(result.text).toContain('Alex');
        (0, vitest_1.expect)(result.html).toContain('Review and sign');
    });
    (0, vitest_1.it)('renders document completed subject', () => {
        const result = (0, notification_templates_1.renderEmailTemplate)('document.completed', {
            recipientName: 'Pat',
            documentTitle: 'Agreement',
            actionUrl: 'http://localhost:5173/app/documents',
            orgName: 'Acme',
        });
        (0, vitest_1.expect)(result.subject).toContain('Agreement');
        (0, vitest_1.expect)(result.text).toContain('completed');
    });
});
