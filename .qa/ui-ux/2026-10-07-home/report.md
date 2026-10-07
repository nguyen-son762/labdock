# Homepage Figma audit and fixes — 2026-10-07

Status: partial verification; confirmed fixes verified, unresolved interactions remain.

Figma: https://www.figma.com/design/hTjur9ijtoYj1D0nOlPkPk/iDNA-design?node-id=106-3162

Actual design frame: HOME - FINAL, 106:3163, 1440x5828.696. Website: http://localhost:3000/ (English, anonymous). Source HEAD: 8edd9e6 plus current working changes.

## Browser coverage

Chromium via bundled Playwright, headless, fresh anonymous contexts, reduced-motion preference. Viewports: 1440x900, 1280x800, 768x1024, 390x844, 320x720. Lazy-loaded images were scrolled into view and awaited before final screenshots.

Measured: headings, page overflow, header control bounds, category link destinations, unnamed visible buttons/inputs, image failures, page errors, console errors and failed requests. Keyboard: category trigger Enter, menu Escape, focus restoration.

## Confirmed fixes

| Finding                 | Before                                          | After                                 | Backlog                      |
| ----------------------- | ----------------------------------------------- | ------------------------------------- | ---------------------------- |
| Homepage category route | `/categories/{slug}` had no route               | `/products/category/{slug}`           | BUG-20261007-002             |
| Header category filter  | ignored `category` URL parameter                | implemented category route            | BUG-20261007-006             |
| Hero desktop geometry   | y=166, width=470, height=71.66, bold            | y=158, width=433, height=84, semibold | BUG-20261007-007             |
| Left banner title       | text box width 576px                            | width 384px, desktop line height 32px | BUG-20261007-007             |
| Category SVG warnings   | invalid `stop-color`/`stop-opacity` React props | `stopColor`/`stopOpacity`             | corrected in owned component |

## Validation

- Playwright regression failed before fixes on all five widths; passed after fixes.
- Enter/Escape and focus restoration passed on all five widths.
- No horizontal page overflow, clipped header control bounding boxes, broken loaded images or uncaught page errors observed in measured states.
- Seven relevant component tests passed across four files.
- Typecheck passed; lint passed with six existing unused-variable warnings.
- Existing full-suite baseline failures from the earlier QA remain outside this run; no claim that the full suite is green.

## Remaining limitations/findings

- Search is inert and requires a backend search contract (BUG-20261007-008, blocked).
- SGD and Sell on Labdock header buttons currently have no handlers. Destination/currency behavior requires product clarification.
- Follow-up: autoplay restored for editorial, service guarantees and testimonial carousels at the user's request (5000ms, pause on hover, resume after interaction). BUG-20261007-009 is reopened for the missing keyboard-accessible pause control. The regression now checks automatic advancement; screenshots from the earlier audit predate this restoration.
- API data has four products, one brand and one testimonial; Figma shows a richer sample catalog. This accounts for major full-page height/count differences and is not corrected by duplicating production data.
- Event date/title comes from API and differs from Figma sample copy.
- Desktop Figma is the only supplied frame; mobile visual fidelity cannot be measured against a missing mobile design. Mobile checks cover observable layout and keyboard behavior.
- Dev console reports an SVG prop warning plus resource 404/401 messages. No failed network transport or uncaught page exception was observed; response URLs/statuses require a separate network audit before assigning root cause.
- No automated contrast/axe scan, authentication states, mutation submissions, full tab-order traversal or browser zoom simulation was performed in this run.
- No independent reviewer agent runtime was available; source diff, measurements and regression assertions were reviewed locally.

## Artifacts

- `figma.png`: Figma screenshot exported by the connector (scaled preview).
- `before/<width>.png`: full-page before screenshots.
- `after/<width>.png`: full-page after screenshots.
- `after/<width>-top.png`: top-of-page screenshot.
- `before/measurements.json`, `after/measurements.json`: observed geometry/state.
- `regression.cjs`, `audit.cjs`: executable Playwright checks, using live public API data.

## Rerun

```bash
QA_PLAYWRIGHT_PATH=/Users/son/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright node .qa/ui-ux/2026-10-07-home/regression.cjs
QA_PHASE=after QA_PLAYWRIGHT_PATH=/Users/son/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright node .qa/ui-ux/2026-10-07-home/audit.cjs
npm test -- --run src/features/home/components/categories-section.test.tsx src/features/home/components/hero-section.test.tsx src/components/layout/main-header.test.tsx src/features/home/components/testimonial-carousel.test.tsx
npm run typecheck
npm run lint
```

Requires localhost:3000 running and Chrome installed. Alternatively set QA_PLAYWRIGHT_PATH to a compatible installed Playwright package. Live-data regression intentionally fails if categories are absent.
