# Profile UI/UX audit and fix

Run: 2026-10-08, 16:13 Asia/Ho_Chi_Minh. Source HEAD: `4d3bffcd0bc4d1a857de760750a3ec2de86d6516`, with the changes in this run.

Figma: https://www.figma.com/design/hTjur9ijtoYj1D0nOlPkPk/iDNA-design?node-id=114-19155&m=dev. Frame: `My profile`, 1440×900. Website: http://localhost:3000/profile, English.

Status: two confirmed visual findings fixed; responsive and interaction checks passed. This is a limited visual comparison, not a complete pixel or WCAG certification. Figma opened anonymously in the in-app browser after loading; the public viewer exposes the selected frame, but precise design properties and other states were not inspected. `figma.png` records the selected frame at 35% zoom.

## Data and coverage

Playwright uses an isolated Chrome context and intercepts `GET /me/profile` with synthetic data (`QA Profile`, `profile@example.test`). No real credentials or personal profile data are used. Profile, avatar and password mutations are blocked at the browser network boundary and are not submitted. The real shared header/footer render normally; account state in the header is not a full authenticated-session test.

| Viewport | View | Edit profile | Edit password | Avatar dialog | Horizontal overflow | Page exceptions |
| --- | --- | --- | --- | --- | --- | --- |
| 1440×900 | checked | checked | checked | checked | none | none |
| 1280×800 | checked | checked | checked | checked | none | none |
| 768×1024 | checked | checked | checked | checked | none | none |
| 390×844 | checked | checked | checked | checked | none | none |
| 320×720 | checked | checked | checked | checked | none | none |

All route responses were HTTP 200. Existing profile details populate the edit form; an unchanged form cannot save; editing profile and password remains independent; cancel returns to the view state. Escape dismisses the avatar dialog and restores focus to its trigger at every viewport. Screenshots and measurements cover all four states at all five widths.

## Confirmed findings

| Element | Figma | Before | Evidence / delta | Severity | Result |
| --- | --- | --- | --- | --- | --- |
| Page background | White | Transparent route content inherits the gray body background | `figma.png`, `before/screenshots/1440-view.png`; body token is `216 33% 97%` | P3 | Route uses the existing white `bg-card` token; computed background is `rgb(255, 255, 255)` |
| Account and Security cards | Flat bordered cards | Large soft shadow | Before computed shadow includes `rgba(15, 23, 41, 0.35) 0px 24px 80px -36px`; screenshots show the shadow below/right of both cards | P3 | Scoped `!shadow-none` overrides the custom `shadow-soft` utility; after computed shadow has only transparent zero-sized entries |

The custom `shadow-soft` class remains in the shared Card composition alongside `shadow-none`; ordinary `shadow-none` loses in the emitted CSS. Overrides apply only to Profile cards, including its edit and loading states. The shared Card and other routes retain their existing behavior.

## Changes

- `src/app/[locale]/(marketing)/profile/page.tsx`: white route background via existing token.
- `src/features/profile/components/profile-info-panel.tsx`, `profile-security-card.tsx`, `profile-form.tsx`, `profile-screen.tsx`: explicit scoped shadow override.
- `src/features/profile/components/profile-screen.test.tsx`: add the missing locale provider and real English messages to the existing test wrapper. Before this correction, all three component tests failed because translation context was missing.
- This run's `audit.cjs`: repeatable viewport screenshots, measurements, interaction assertions and optional visual regression assertions.

## Validation

- Regression before fix failed on the background assertion; before measurements independently confirm the visible card shadows.
- After fix, background and shadow assertions passed at all five viewports, together with the interaction checks.
- `npm run typecheck`: passed.
- ESLint on the changed production and test files: passed.
- `npx vitest run src/features/profile`: 18 tests passed across 3 files, including existing password submit/clear and avatar upload tests using mocked services.
- Vitest emits existing icon warnings for SVG properties `stroke-width`, `stroke-linecap` and `stroke-linejoin`; these did not fail tests.
- `npm run build`: passed; 63 static pages generated successfully.

## Accessibility and remaining coverage

Labelled form fields, dialog naming, Escape dismissal and focus restoration were exercised. Screenshots at narrow widths show stacked cards and usable actions; no document overflow was measured. Full Tab/Shift+Tab traversal, screen-reader announcements, contrast ratios, hover/focus styling, 200%/400% zoom and long-text cases were not audited comprehensively.

Figma has only the selected desktop view verified here. Mobile designs, edit/password/upload baselines, exact font/spacing/color specifications and pixel-level parity remain unverified. The visible heading copy differs (`My profiles` in Figma versus `My profile` in the application); copy was not changed under this command's scope. Footer parity cannot be inferred from this 900px design frame. API loading/error/unauthorized behavior and real mutation integrations are not covered by this fixture run. Browser page exceptions were captured; console messages, failed requests and hydration warnings were not collected separately, so there is no claim that all console/network checks passed.

## Artifacts and reproduction

- `figma.png`: selected design frame and its 1440×900 badge.
- `before/screenshots/`, `after/screenshots/`: full-page screenshots named `<width>-<state>.png`.
- `before/measurements.json`, `after/measurements.json`: layout, typography, overflow and card-shadow measurements.
- `regression-before/screenshots/1440-view.png`: failing pre-fix regression capture.
- `findings.json`: confirmed findings and coverage status.

Requires localhost:3000 running, Google Chrome installed and the bundled Playwright package. No browser installation is needed. Browser launch needed sandbox escalation on this host; approved launch succeeded.

```sh
QA_ASSERT_FIX=1 QA_PHASE=after QA_PLAYWRIGHT_PATH=/Users/son/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright node .qa/ui-ux/2026-10-08-profile/audit.cjs
```

Self-review: screenshots use synthetic profile data; visual findings have both Figma and browser evidence; findings are deduplicated across widths; no API, cache, authorization, metadata or form behavior was changed. Component tests and regression assertions verify the resulting behavior without arbitrary sleeps.
