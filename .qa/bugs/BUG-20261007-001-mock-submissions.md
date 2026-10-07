---
id: BUG-20261007-001
status: open
severity: P0
confidence: High
area: Checkout, payment, quote and contact integration
component: checkout.service.ts, quote.service.ts, contact.service.ts
created_at: 2026-10-07
source_commit: 8edd9e6
owner: qa-fix-agent
---

# Production mutations return synthetic success without API calls

## Type

confirmed bug

## Scenario

User completes payment, submits a quote, or sends a contact inquiry.

## Preconditions

The production application uses the current service implementations.

## Reproduction steps

1. Trigger checkout payment completion, quote submission, or contact submission.
2. Inspect the network activity or service implementation.

## Expected

Each mutation sends the documented request to the backend and only reports success after the backend confirms persistence.

## Actual

The services only wait 550ms and synthesize a successful response. No HTTP request is made.

## Evidence

- `src/features/checkout/api/checkout.service.ts`
- `src/features/checkout/api/quote.service.ts`
- `src/features/contact/api/contact.service.ts`

## Root-cause hypothesis

Production mutation services are still placeholder implementations based on local mock delays.

## Recommended regression test

Mock the HTTP client and assert the correct request for each mutation. Assert that 400/401/409/422/500 responses reach the UI as errors.

## Fix notes

Implement the real API contract only after confirming endpoint and payload requirements with the backend.

## Validation

- [ ] Reproduction fails before fix
- [ ] Regression test passes after fix
- [ ] Typecheck
- [ ] Lint
- [ ] Relevant test suite
- [ ] No unrelated production behavior changed
