---
id: BUG-20261007-002
status: resolved
severity: P1
confidence: High
area: Homepage navigation
component: src/features/home/components/categories-section.tsx
created_at: 2026-10-07
source_commit: 8edd9e6
owner: qa-fix-agent
---

# Homepage category cards navigate to a non-existent route

## Type

confirmed bug

## Scenario

User selects a category from the homepage.

## Preconditions

Homepage categories are loaded.

## Reproduction steps

1. Open the homepage.
2. Select any category card.

## Expected

The user reaches the corresponding product category page.

## Actual

The link targets `/categories/{slug}`, but the implemented page route is `/products/category/{slug}`.

## Evidence

- `src/features/home/components/categories-section.tsx`
- `src/app/[locale]/(marketing)/products/category/[slug]/page.tsx`

## Recommended regression test

Assert every homepage category link targets the implemented localized product category route.

## Validation

- [x] Reproduction fails before fix
- [x] Regression test passes after fix
- [x] Typecheck
- [x] Lint
- [x] Relevant test suite

## Resolution — 2026-10-07

Homepage category cards now target `/products/category/{slug}`. A component regression checks the surgical-instruments link; Playwright checks live category links at 1440, 1280, 768, 390 and 320px. Before the fix, Playwright failed on all five viewports; after the fix, all five passed.
