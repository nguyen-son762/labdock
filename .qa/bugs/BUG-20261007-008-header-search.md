---
id: BUG-20261007-008
status: blocked
severity: P2
confidence: High
area: Homepage interaction
component: src/components/layout/main-header.tsx
created_at: 2026-10-07
source_commit: 8edd9e6
---

# Catalog search has no submit behavior

## Reproduction

At a desktop viewport, type into Search catalog and activate Search or press Enter.

## Expected / actual

Expected: show relevant results. Actual: SearchBox has no submit handler or navigation; the button is inert.

## Blocker

The current catalog schema/service exposes page, brandId, categoryId and sort. A search endpoint/parameter and result behavior have not been established. Implementing search requires that contract; adding an ignored query string would not resolve the defect.

## Recommended regression

Once the contract is available, type a known product/CAS query and submit using both button and Enter; assert matching results, loading, empty and API error states.
