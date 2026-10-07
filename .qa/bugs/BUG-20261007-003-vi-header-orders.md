---
id: BUG-20261007-003
status: open
severity: P2
confidence: High
area: Internationalization
component: messages/vi.json, MainHeader, CartHeaderPopover
created_at: 2026-10-07
source_commit: 8edd9e6
owner: qa-fix-agent
---

# Vietnamese messages are missing Header.orders

## Type

confirmed bug

## Scenario

Vietnamese user views the desktop header or cart summary.

## Expected

The orders label is rendered in Vietnamese and both locale message contracts match.

## Actual

`Header.orders` exists in English but is absent from `messages/vi.json`; the translation contract test fails.

## Evidence

- `messages/en.json`
- `messages/vi.json`
- `src/i18n/messages.test.ts`

## Recommended regression test

Render header/cart under both locales and assert the localized label and synchronized message keys.

## Validation

- [ ] Reproduction fails before fix
- [ ] Regression test passes after fix
- [ ] Typecheck
- [ ] Lint
- [ ] Relevant test suite
