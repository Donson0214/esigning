# Security Checklist (E‑Signature Platform)

## Auth & Session Attacks
- Verify JWT signature, expiration, and audience; test refresh/token replay handling.
- Ensure logout invalidates tokens server-side if token revocation is used.
- Confirm no tokens are logged; check server logs for redaction.

## IDOR / Access Control
- Attempt accessing `/documents/:id`, `/docs/:id/audit`, `/docs/:id/complete` as another user.
- Verify WebSocket `doc.join` only works for authorized users.
- Validate signer tokens cannot access unrelated documents.

## File Upload Abuse
- Upload polyglot files disguised as PDF; verify MIME sniffing blocks.
- Upload oversized PDFs and PDF bombs; verify size limits and rejection.
- Confirm untrusted uploads never execute server-side.

## Injection
- SQL/NoSQL injection probes on auth, doc, and signing endpoints.
- Command injection checks on any file processing or external calls.

## XSS / CSRF
- If cookies are used, ensure CSRF protection; verify SameSite policy.
- Attempt reflected/stored XSS in document titles and signer names.

## WebSocket Attacks
- Attempt connection without JWT or with forged JWT.
- Attempt joining `doc:{docId}` for unauthorized docs.
- Attempt replaying `doc.events.sync` without authorization.

## Rate Limiting / Brute Force
- Test login brute force and signing endpoints for throttling.
- Verify rate limit headers and error codes.

## Privilege Escalation
- Attempt role confusion (SENDER vs SIGNER) on privileged endpoints.
- Verify only document owners can complete or precompute hashes.

## Audit Log Tampering
- Attempt to write/modify audit log entries via API input.
- Verify audit report contains immutable hash chain elements.

## Hash/Manifest Bypass
- Reuse stale signing session IDs after field changes.
- Submit manifest with mismatched pre-hash or altered placements.
- Submit signature without manifest or with mismatched manifest hash.

## SSRF
- If any URL fetch exists, ensure allowlist or strict validation (e.g., Supabase storage only).

## Dependency Vulnerabilities
- Run `npm audit` in both `backend/` and `frontend/`.
- Pin dependencies for production builds; review transitive vulnerabilities.

## Secrets Management
- Ensure `.env` files are not committed with secrets.
- Verify production secrets come from secure vaults, not logs.

## Practical Test Steps
1. Run auth tests: invalid JWT, expired JWT, and missing JWT.
2. Exercise WebSocket auth/room tests with unauthorized doc IDs.
3. Upload PDF variants and validate MIME sniffing + size limits.
4. Submit signing manifests with modified fields and stale session IDs.
5. Validate audit report integrity hashes against stored values.
6. Verify rate limiting response for repeated login attempts.
