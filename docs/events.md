# Realtime Event Schema (v1.0)

All realtime payloads use a shared envelope. Events are emitted over Socket.IO on the `event` channel.

## Envelope

```json
{
  "event": "doc.updated",
  "version": "1.0",
  "id": "uuid",
  "timestamp": "2026-01-14T01:23:45.678Z",
  "orgId": "org-id",
  "docId": "doc-id",
  "actor": {
    "userId": "user-id",
    "role": "SENDER",
    "email": "owner@example.com"
  },
  "correlationId": "client-correlation-id",
  "data": {}
}
```

## Reason Codes

- VALIDATION_FAILED
- OUT_OF_ORDER
- DOC_LOCKED
- AUTH_FAILED
- NOT_FOUND
- PREHASH_MISMATCH
- STALE_SESSION
- MANIFEST_MISMATCH
- SIGNATURE_MISSING
- RATE_LIMITED
- INTERNAL_ERROR

## Events

### connection.ready
```json
{ "data": { "user": { "id": "user-id", "email": "owner@example.com", "role": "SENDER" } } }
```

### org.user.presence.updated
```json
{ "data": { "userId": "user-id", "status": "online", "lastSeenAt": "2026-01-14T01:23:45.678Z", "docId": "doc-id" } }
```

### doc.created
```json
{ "data": { "document": { "id": "doc-id", "title": "NDA", "status": "DRAFT", "ownerId": "org-id", "version": 1 } } }
```

### doc.updated
```json
{ "data": { "document": { "id": "doc-id", "title": "NDA", "status": "SENT", "ownerId": "org-id", "version": 2 }, "changes": ["status"] } }
```

### doc.deleted
```json
{ "data": { "documentId": "doc-id" } }
```

### doc.access.granted
```json
{ "data": { "signer": { "id": "signer-id", "email": "signer@example.com", "status": "PENDING", "order": 1 } } }
```

### doc.access.revoked
```json
{ "data": { "signerId": "signer-id", "email": "signer@example.com" } }
```

### doc.viewed
```json
{ "data": { "signerId": "signer-id", "viewedAt": "2026-01-14T01:23:45.678Z" } }
```

### doc.signer.joined
```json
{ "data": { "signerId": "signer-id" } }
```

### doc.signer.left
```json
{ "data": { "signerId": "signer-id" } }
```

### doc.signer.status.changed
```json
{ "data": { "signer": { "id": "signer-id", "email": "signer@example.com", "status": "SIGNED", "order": 1 }, "previousStatus": "VIEWED" } }
```

### doc.field.updated
```json
{ "data": { "fields": [{ "id": "field-id", "signerId": "signer-id", "type": "SIGNATURE", "page": 1, "x": 120, "y": 200, "width": 180, "height": 42 }] } }
```

### doc.signature.applied
```json
{ "data": { "signerId": "signer-id", "signatureIds": ["sig-1"], "postHash": { "hash": "sha256", "algorithm": "SHA-256", "computedAt": "2026-01-14T01:23:45.678Z" } } }
```

### doc.signature.rejected
```json
{ "data": { "signerId": "signer-id", "reasonCode": "OUT_OF_ORDER", "message": "Signer is out of order" } }
```

### doc.hash.computed
```json
{ "data": { "preHash": { "hash": "sha256", "algorithm": "SHA-256", "computedAt": "2026-01-14T01:23:45.678Z" } } }
```

### doc.completed
```json
{ "data": { "document": { "id": "doc-id", "title": "NDA", "status": "COMPLETED", "ownerId": "org-id", "version": 4 }, "completedAt": "2026-01-14T01:23:45.678Z" } }
```

### doc.audit.appended
```json
{ "data": { "auditEventId": "audit-id", "eventType": "DOCUMENT_COMPLETED" } }
```

### notifications.email.queued
```json
{ "data": { "to": "signer@example.com", "template": "signing-request", "signerId": "signer-id" } }
```

### notification.created
```json
{
  "data": {
    "notification": {
      "id": "notification-id",
      "eventType": "document.signed",
      "orgId": "org-id",
      "docId": "doc-id",
      "recipientUserId": "user-id",
      "title": "Document signed",
      "message": "Signer signed \"NDA\".",
      "link": "https://app.example.com/app/documents",
      "createdAt": "2026-01-14T01:23:45.678Z",
      "isRead": false,
      "actor": { "userId": "signer-id", "role": "SIGNER", "email": "signer@example.com" }
    }
  }
}
```

### notification.read
```json
{ "data": { "userId": "user-id", "notificationIds": ["notification-id"], "all": false, "readAt": "2026-01-14T01:23:45.678Z" } }
```

### error.occurred
```json
{ "data": { "code": "AUTH_FAILED", "message": "Unauthorized document access", "scope": "doc" } }
```
