'use strict';

const path = require('path');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

const args = new Set(process.argv.slice(2));
const confirmed = args.has('--confirm') || process.env.RESET_DATA_CONFIRM === 'YES';

if (!confirmed) {
  console.error('Refusing to run without confirmation.');
  console.error('Pass --confirm or set RESET_DATA_CONFIRM=YES to proceed.');
  process.exit(1);
}

const nodeEnv = process.env.NODE_ENV || 'development';
if (nodeEnv.toLowerCase() === 'production') {
  console.error('Refusing to run when NODE_ENV=production.');
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Check backend/.env before running.');
  process.exit(1);
}

async function main() {
  const steps = [
    { label: 'NotificationDelivery', run: () => prisma.notificationDelivery.deleteMany() },
    { label: 'Notification', run: () => prisma.notification.deleteMany() },
    { label: 'NotificationPreference', run: () => prisma.notificationPreference.deleteMany() },
    { label: 'Signature', run: () => prisma.signature.deleteMany() },
    { label: 'SigningSession', run: () => prisma.signingSession.deleteMany() },
    { label: 'SignatureField', run: () => prisma.signatureField.deleteMany() },
    { label: 'AuditEvent', run: () => prisma.auditEvent.deleteMany() },
    { label: 'Certificate', run: () => prisma.certificate.deleteMany() },
    { label: 'DocumentEvent', run: () => prisma.documentEvent.deleteMany() },
    { label: 'Signer', run: () => prisma.signer.deleteMany() },
    { label: 'Document', run: () => prisma.document.deleteMany() },
    { label: 'User', run: () => prisma.user.deleteMany() },
  ];

  const results = await prisma.$transaction(steps.map((step) => step.run()));

  results.forEach((result, index) => {
    const label = steps[index].label;
    const count = result.count || 0;
    console.log(`${label}: ${count} removed`);
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
