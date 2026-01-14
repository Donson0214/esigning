# Notification System Overview

This system delivers document and signer updates through three channels:

1. REALTIME (Socket.IO popups)
2. IN_APP (persistent notification center)
3. EMAIL (Gmail SMTP)

## Data Model

- `Notification`: stored per user with title, message, link, eventType, and payload.
- `NotificationDelivery`: per-channel delivery log with status, attempts, and errors.
- `NotificationPreference`: per-user preferences and optional event overrides.

## Delivery Flow

1. Domain event triggers `dispatchNotification`.
2. Preferences are checked (event overrides, in-app, realtime, email).
3. Notification is persisted (when in-app or realtime is enabled).
4. Realtime event `notification.created` is emitted to `user:{userId}` room.
5. Email is sent (with retry) if enabled or forced for critical events.
6. Delivery status is recorded per channel.

## Supported Notification Events

- document.created, document.sent, document.viewed, document.signed, document.completed
- document.declined, document.expired
- signer.invited, signer.joined, signer.signed, signer.declined
- access.granted, access.revoked
- reminder.pending_signature, reminder.expiring_soon
- system.error

## Email Templates

- signer.invited: document invitation with signing link
- reminder.pending_signature: reminder to sign
- document.signed: owner notification
- signer.signed: signer confirmation
- document.completed: completion notice with app link
- user.invited: organization invitation

Templates avoid document contents and only include safe metadata and links.

## Idempotency + Retries

- `Notification.idempotencyKey` prevents duplicates for one-time events.
- SMTP sends retry up to 3 attempts with backoff.
- Failed email attempts are logged in `NotificationDelivery` with `FAILED`.

## Security Decisions

- Emails never include document contents or sensitive payloads.
- Signing links remain time-limited and stored hashed server-side.
- WebSocket notifications are scoped to `user:{userId}` rooms.
- Notification payloads remain non-sensitive (IDs and display metadata only).

## Configuration Notes

- `APP_BASE_URL` is used for links back to the web app (for emails and in-app links).
- `SMTP_*` settings control Gmail SMTP delivery.
