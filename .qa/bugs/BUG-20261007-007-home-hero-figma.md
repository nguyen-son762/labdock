---
id: BUG-20261007-007
status: resolved
severity: P3
confidence: High
area: Homepage visual comparison
component: src/features/home/components/hero-section.tsx
created_at: 2026-10-07
source_commit: 8edd9e6
---

# Hero geometry and banner text wrapping differ from Figma

## Reproduction

Open `/` at 1440x900 and compare with Figma nodes 106:3388, 106:3406, 106:3389 and 106:3383.

## Expected / actual

Figma heading: x=80, y=158, width=433, height=84, 32px semibold. Before fix: x=80, y=166, width=470, height=71.65625, bold. The left banner title also used a 576px text box instead of 384px.

## Resolution

Adjusted heading width, weight, line height, section padding, description and guarantee spacing, and left-banner text width/line height. Playwright now measures the heading at x=80, y=158, width=433, height=84. Mobile retains responsive text and wrapped guarantees.

## Evidence

`.qa/ui-ux/2026-10-07-home/before/measurements.json` and `after/measurements.json`, with screenshots in both folders. Regression checks hero geometry at 1440px and overflow/header controls at five widths.
