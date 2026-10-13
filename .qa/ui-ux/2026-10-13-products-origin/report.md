# Product Origin filter validation

- Date: 2026-10-13, Asia/Ho_Chi_Minh.
- Source commit before changes: `6332b19`; validation includes uncommitted changes.
- Figma: [Product Listing, 547:28080](https://www.figma.com/design/hTjur9ijtoYj1D0nOlPkPk/iDNA-design?node-id=547-28080), focused sidebar node `547:32158` and Origin node `547:33642`.
- Local verification URL: `http://localhost:3107/products`; Vietnamese labels checked at `/vi/products`.
- Scope: replace Category below Brands with Origin, integrate the origins endpoint and the updated product query contract. Full-page screenshots are context; this report does not assert parity for the entire page or a deployed website. No deployed SITE_URL was supplied.
- Authentication: anonymous; no test accounts, tokens, cookies or production writes used.

## Implementation

`GET /origins` is fetched alongside the other catalog resources through the existing server request helper. Response validation accepts a string array and removes duplicate options. Anonymous reads retain the existing 300-second cache policy with an `origins` tag; authenticated reads follow the helper's Bearer/no-store policy.

Origin is a checkbox list under Brands. It supports multiple selections, case-insensitive search, five initial options with See more/See less, empty/error states, and disabled controls while navigation is pending. Selection is URL-owned via `origins=SG,DE`. Changes reset pagination; pagination, brand selection, sort and category navigation retain origins. Clear removes origin filters. Both product routes use the same filter component.

The product request now serializes `CategoryIds`, `brandIds` and `Origins` as comma-separated values, and uses `Sort`, `IsNew`, `IsOutstanding`, `page`, `pageSize` as provided by the API contract. Empty lists are omitted; explicit false flags are retained. Category/Brand selection in the existing UI remains single-select while the service accepts arrays.

Live read-only API verification returned HTTP 200 and `["SG"]` from `/origins`. More than one origin and more than five options are covered by deterministic fixtures because live data currently contains one option.

## Figma evidence and final measurements

| Element                    | Figma                    | Final local result                | Evidence                            |
| -------------------------- | ------------------------ | --------------------------------- | ----------------------------------- |
| Sidebar width on desktop   | 238 px                   | 238 px                            | `measurements.json`                 |
| Origin input               | 40 px high, 8 px radius  | 40 px, 8 px on all five viewports | `measurements.json`                 |
| Input border / placeholder | `#DDE2E8` / `#B1BAC8`    | Matching computed RGB values      | `measurements.json`                 |
| Origin label               | 14 px, 20 px line height | 14 px, 20 px                      | `measurements.json`                 |
| Checkbox                   | 16 px                    | 16 px                             | `measurements.json`                 |
| Search / chevron assets    | 16 × 16                  | Local assets loaded, 16 × 16      | `*-origin.png`, `measurements.json` |

Figma's generated search and See more asset URLs initially referenced different icons from the rendered nodes. A read-only `use_figma` export of the actual instance nodes provided the correct assets. Assets are stored under `public/products/filters`, with no temporary Figma URLs in application source. Checkbox, Input, Label and Button reuse existing Shadcn primitives. JSX attribute names in the reused Checkbox were corrected to remove its React SVG warnings.

The first browser measurements found a 12 px input radius because this project's `rounded-lg` uses the 12 px design token. The Origin input was corrected to the existing 8 px `rounded-sm` token, and its border/placeholder colors were aligned with the design. Measurements and screenshots were repeated after that fix. Search wording is localized and descriptive rather than the prototype's generic Search text.

## Viewports and interactions

| Viewport   | Horizontal overflow | Search / selection / keyboard / clear |
| ---------- | ------------------- | ------------------------------------- |
| 1440 × 900 | None                | Passed                                |
| 1280 × 800 | None                | Passed                                |
| 768 × 1024 | None                | Passed                                |
| 390 × 844  | None                | Passed                                |
| 320 × 720  | None                | Passed                                |

At every viewport Playwright verified checked state restored from the URL; Origin replaces the former sidebar Category group; search no-match status; Tab/Space checkbox operation; origin deselection removes `origins` and `page`; selecting Origin preserves sort; and Clear removes selected filters. Additional browser checks confirmed Vietnamese labels and Origin retention when navigating through the category strip to `/products/category/[slug]`.

Controls retain native/Radix semantics, associated labels, visible keyboard focus, and status announcements. Responsive labels allow wrapping. Automated keyboard and DOM checks were run; a dedicated screen-reader/contrast audit was not performed.

## Validation

- Products and translation tests: 48 tests passed; adding the explicit-false/empty-list regression brought the distinct validated set to 49. The final focused server/Origin/workspace run passed all 22 tests.
- `npm run typecheck`: passed.
- ESLint on the changed product routes, product feature and Checkbox: passed.
- Prettier and `git diff --check`: passed.
- `npm run build`: passed in the workspace and the isolated preview with the existing environment configuration; existing unused `Edit2` warnings remain in profile components.
- Final isolated production runtime: HTTP 200, Origin hydration and deselection passed, with no page errors.
- Playwright: all five viewport scenarios passed; Vietnamese/category navigation checks passed.

The shared workspace has another Next server listening on port 3000. A production preview in that shared `.next` directory encountered a next-intl client-manifest mismatch. To avoid build-directory interference, final visual and interaction checks used a temporary copy of the source with the same dependencies and its own `.next` directory. This was a validation-only workaround; application build settings were not changed.

## Existing issues outside this change

- The unchanged Select primitive emits React warnings for `stroke-width`, `stroke-linecap`, `stroke-linejoin` (`src/components/ui/select.tsx`). They are recorded in `measurements.json`.
- The existing anonymous cart request returns HTTP 401 at `/api/public/v1/cart`. This does not affect Origin checks.
- Existing Brands controls, header, product cards, category strip and service/footer layouts were not part of this Origin comparison.
- No new in-scope blocker remains. Full deployed-site or full-page Figma comparison is unverified.

## Artifacts and reproduction

Screenshots: `1440.png`, `1280.png`, `768.png`, `390.png`, `320.png`; focused Origin screenshots use the `-origin.png` suffix. Computed styles, bounds, asset geometry and console errors are in `measurements.json`.

Use a local server for the current source, with a build directory separate from any concurrent Next process, then run:

```sh
QA_PLAYWRIGHT_PATH=/Users/son/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright \
SITE_URL=http://localhost:3107/products \
node .qa/ui-ux/2026-10-13-products-origin/audit.cjs
```

The runner requires the bundled Playwright package and installed Chrome; it does not install or add project dependencies. Change SITE_URL to the actual local products URL when using a different port.
