# Static Research Leaders verification

Source: https://www.figma.com/design/hTjur9ijtoYj1D0nOlPkPk/iDNA-design?node-id=106-4453&m=dev

The twelve individual Company logo instances were exported directly as SVG using Figma's `exportAsync({ format: 'SVG_STRING' })`; the design was not modified. Local assets live at `public/home/research-leaders/`, with names and intrinsic export dimensions in `src/features/home/research-leaders.ts`. Node IDs in order: 106:4455, 106:4458, 106:4460, 106:4462, 106:4464, 106:4466, 106:4468, 106:4470, 106:4472, 106:4474, 106:4476, 106:4478. No temporary Figma URLs are used in production.

The logo grid is always rendered and takes no API brand input. Home no longer validates/maps/passes `topBrands`; all other Home API sections retain their existing data source. Cards use the design's 100px height, 8px radius, 16px gaps and white hover background. The pointer in the Figma screenshot indicates the first card's hover state; verification hovers that card on desktop. Each logo has a meaningful accessible name. No destination URLs were invented for the static logos.

Playwright verified all 12 non-empty local SVG files, successful image loads, rendered dimensions, 100px cards and no horizontal overflow at 1440, 768, 390 and 320px. Desktop retains the existing container and six columns across two rows. Exported SVG intrinsic widths round fractional Figma bounds to integer pixels; height is 32px. Below 640px, a single-row Swiper carousel uses 194.5px cards with a partial next card visible, swipe/drag, keyboard support and the shared SwiperNavigation buttons. From 640px, Swiper is disabled and the same logo nodes use a grid (three columns on tablet, six on desktop). Playwright exercised Enter on Next, Previous, dragging, reaching the final slide with Next disabled, and resizing the scrolled carousel back to desktop with controls hidden and no remaining horizontal translation. Logo SVGs load eagerly to avoid blank offscreen slides. Screenshots and `measurements.json` are in this directory.

Mobile autoplay advances every 5 seconds and returns to the start after the last slide. It retains manual navigation and pauses on hover over the slide area. The current UI no longer includes pause/resume controls. The preference that all carousels use autoplay is recorded in root `AGENTS.md`.

The arrow-click regression was reproduced with `autoplay-regression.cjs`: clicking Next focused the button and the wrapper's focus handler permanently stopped autoplay. Removing that handler lets Swiper's `disableOnInteraction: false` preserve autoplay. Returning from desktop to mobile now starts autoplay again. This script checks actual timed advancement after Next, Previous, Enter and responsive changes at 390px and 320px. Earlier screenshots and `verify.cjs` document the prior version with pause/resume controls.

Arrow-click fix validation: regression failed before the fix and passed afterward at both mobile widths; the SocialProofSection test, typecheck, scoped ESLint, Prettier, diff check and production build passed. The temporary verification server on port 3001 was stopped afterward.

Validation: the static-logo/mobile-grid implementation passed all 11 Home tests and production build. The autoplay update passed the component and translation tests (2 tests), typecheck, scoped ESLint, Prettier and Playwright checks above. Existing unrelated build warnings report unused `Edit2` imports in Profile components; existing Swiper CSS causes a non-failing jsdom parsing warning in the carousel test.

Rerun with localhost:3000 running and Google Chrome installed:

```sh
QA_PLAYWRIGHT_PATH=/Users/son/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright node .qa/ui-ux/2026-10-08-research-leaders/verify.cjs
```

Rerun the current autoplay regression with localhost:3001 running (or set `QA_BASE_URL`):

```sh
QA_PLAYWRIGHT_PATH=/Users/son/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright node .qa/ui-ux/2026-10-08-research-leaders/autoplay-regression.cjs
```
