---
id: BUG-20261007-004
status: open
severity: P1
confidence: High
area: Homepage reliability
component: src/features/home/server.ts
created_at: 2026-10-07
source_commit: 8edd9e6
owner: qa-fix-agent
---

# Homepage API failures are rendered as an empty homepage

## Type

confirmed bug

## Scenario

Homepage API returns a server error, timeout, malformed JSON, or schema-invalid payload.

## Expected

The route exposes an error boundary, retry action, or explicit unavailable-content state.

## Actual

`getHomePageData()` catches every error and returns empty data, making an outage look like valid empty content.

## Evidence

- `src/features/home/server.ts`

## Recommended regression test

Assert 500, timeout, malformed JSON, and schema errors produce an observable error/retry state rather than an empty success state.

## Validation

- [ ] Reproduction fails before fix
- [ ] Regression test passes after fix
- [ ] Typecheck
- [ ] Lint
- [ ] Relevant test suite
