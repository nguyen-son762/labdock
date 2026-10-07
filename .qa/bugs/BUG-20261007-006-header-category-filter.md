---
id: BUG-20261007-006
status: resolved
severity: P2
confidence: High
area: Header category navigation
component: src/components/layout/category-popover.tsx
created_at: 2026-10-07
source_commit: 8edd9e6
---

# Header category links do not apply the selected category

## Reproduction

Open All Categories (desktop) or Open categories (mobile), then select a category. The link previously targeted `/products?category={slug}`. The product catalog parses `categoryId`, not `category`, so the chosen category was ignored.

## Expected / actual

Expected: open the catalog for the selected category. Actual before fix: navigate to an unfiltered catalog.

## Resolution

Links now target the implemented `/products/category/{slug}` route. Header tests check both child category links. Playwright checks the live menu links on five viewports, Enter opens the menu, Escape closes it and restores trigger focus.

## Validation

Six relevant component tests passed. Typecheck passed. Lint passed with six pre-existing warnings.
