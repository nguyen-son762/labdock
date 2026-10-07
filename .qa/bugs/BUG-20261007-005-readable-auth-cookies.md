---
id: BUG-20261007-005
status: open
severity: P1
confidence: High
area: Authentication security
component: src/lib/auth-token-store.ts
created_at: 2026-10-07
source_commit: 8edd9e6
owner: qa-fix-agent
---

# Access and refresh tokens are readable by JavaScript

## Type

confirmed security bug

## Scenario

An XSS executes in the portal origin while a user is signed in.

## Expected

Access and refresh tokens cannot be read through `document.cookie`.

## Actual

The token store writes both tokens as ordinary JavaScript-readable cookies without `HttpOnly`.

## Evidence

- `src/lib/auth-token-store.ts`
- `src/lib/auth-token-store.test.ts` explicitly asserts token visibility in `document.cookie`

## Recommended regression test

Assert session cookies use `HttpOnly`, `Secure`, and appropriate `SameSite` attributes, and redesign client token access if necessary.

## Fix notes

This likely requires aligning frontend token handling with backend cookie/session behavior; do not apply a partial cookie flag change that breaks authentication.

## Validation

- [ ] Reproduction fails before fix
- [ ] Regression test passes after fix
- [ ] Typecheck
- [ ] Lint
- [ ] Security review
