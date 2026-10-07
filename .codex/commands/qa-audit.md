# /qa-audit

## Mục tiêu

Chạy một QA audit production theo risk cho toàn bộ Next.js application, phối hợp các agent chuyên môn và xuất một report có thể hành động. Đây là workflow read-only đối với production code; chỉ được tạo hoặc sửa test/config khi người dùng yêu cầu rõ hoặc command được gọi với `--implement-tests`.

## Quy tắc điều phối

1. Đọc `.codex/AGENTS.md`, `package.json`, test config, routing, middleware, API clients, auth, state/cache và `git diff`/5 commit gần nhất.
2. Trước mọi thay đổi, in `DETECTED ARCHITECTURE` gồm framework, routing, rendering, API strategy, auth, state, UI system và test tooling.
3. Chạy `npm run qa:baseline` nếu script tồn tại; nếu không, chạy `npm run typecheck`, `npm run lint`, `npm test -- --run` và các E2E script hiện có.
4. Spawn song song các agent bên dưới. Mỗi agent chỉ đọc source/test/config, không sửa production code và không trùng scope.
5. Thu thập report của tất cả agent. Không coi test đỏ là product bug cho tới khi kiểm tra test expectation, fixture, mock và source behavior.
6. Sau khi tổng hợp, spawn `Test Reviewer` để loại finding speculative, duplicate, implementation-detail assertion và flaky test pattern.
7. Nếu có `--implement-tests`, chỉ được thêm/sửa test deterministic trong test structure hiện có; không sửa product behavior để làm test pass. Nếu thiếu Playwright dependency, report blocker thay vì tự cài package.
8. Chạy lại baseline và các test mới; chạy lặp test có nguy cơ flaky nếu thời gian cho phép.
9. Với mỗi `confirmed bug`, tạo một file `.qa/bugs/<slug>.md` theo template `.qa/bugs/_template.md`. Không lưu potential bug hoặc subjective preference như bug mở.
10. Kết thúc bằng report `QA_REPORT.md` hoặc output Markdown nếu không được phép ghi file.

## Agent team

### UI/UX Agent

Audit route/page/layout/component/dialog/form/table/navigation ở desktop, tablet và mobile. Kiểm tra overflow, CTA, loading, empty, error, retry và feedback. Chỉ báo UX issue khi có tác động usability cụ thể.

### Accessibility Agent

Audit semantic HTML, accessible names, labels, roles, focus, keyboard-only flow, dialogs, custom comboboxes, tabs, tables, carousel, contrast và WCAG 2.2 AA. Ưu tiên behavior có thể kiểm chứng.

### Functional Logic Agent

Trace critical journeys: auth, catalog, category, product, cart, quote, checkout, payment, orders/RFQs, profile/contact. Kiểm tra validation, branch, calculation, stale state, cache invalidation, race, double-submit, refresh và direct URL.

### Playwright E2E Agent

Kiểm tra E2E tooling hiện có. Lập test matrix và chỉ tạo test khi có runner/config/fixture đủ tin cậy. Dùng `getByRole`, `getByLabel`, `getByText`, auto-waiting, `expect`, network wait; cấm arbitrary sleep.

### API & Integration Agent

Audit `fetch`, Axios, server actions, route handlers, service và mutation. Kiểm tra 400/401/403/404/409/422/429/500, timeout, malformed/empty response, retry, refresh, error mapping và cache invalidation.

### Authentication & Authorization Agent

Kiểm tra signed-out, signed-in, expired session, refresh failure, role/permission, protected route, redirect, cookie/token exposure và server-side enforcement. UI hiding không được coi là authorization.

### Regression Agent

Đọc changed files/recent commits, consumer/callee và test hiện có. Xác định workflow dễ regression và đề xuất test không trùng agent khác.

### Performance & Reliability Agent

Audit duplicate request, retry loop, render loop, hydration mismatch, blocking state, stale cache, request race và test nondeterminism. Chỉ đưa claim có evidence hoặc test proposal xác định được.

## Format bắt buộc của agent

```text
TYPE: confirmed bug | potential bug | UX issue | missing coverage | test infrastructure
AREA:
SCENARIO:
PRECONDITION:
STEPS:
EXPECTED:
ACTUAL:
SEVERITY: P0 | P1 | P2 | P3
CONFIDENCE: High | Medium | Low
FILE/COMPONENT:
RECOMMENDED TEST:
NOTES:
```

Severity:

- `P0`: critical workflow blocked, security breach, payment/data corruption.
- `P1`: major functional failure or serious authorization/integration issue.
- `P2`: important UX, accessibility, error-state or edge-case defect.
- `P3`: minor polish or low-impact coverage gap.

## Test reviewer checklist

- Test có thể fail khi behavior hỏng.
- Assertion hướng user-visible behavior, không kiểm tra implementation detail.
- Không có `waitForTimeout` hoặc selector CSS/XPath không cần thiết.
- Không mock chính unit đang được kiểm tra.
- Không duplicate scenario hoặc leak state giữa test.
- Có loading, empty, error, unauthorized, retry và boundary case khi risk yêu cầu.

## Final report

Report phải gồm:

1. Repository testing overview
2. Detected architecture
3. Critical user journeys
4. Prioritized test matrix
5. Baseline command results
6. Tests created/changed
7. Confirmed bugs with reproduction, expected, actual, severity and file
8. UX/accessibility issues
9. API and auth findings
10. Flaky/reliability risks
11. Missing coverage and infrastructure blockers
12. Recommended next tests
13. Files changed
14. Exact commands to rerun

Không được gọi task hoàn tất nếu baseline hoặc test mới còn đỏ mà chưa phân loại rõ product defect hay test defect.

## Bug persistence

Mỗi bug confirmed phải có:

- `status: open`
- `severity`, `confidence`, `area`, `component`
- reproduction steps, expected, actual và root-cause hypothesis
- recommended regression test
- `created_at` và commit/branch quan sát được

Nếu bug đã tồn tại trong `.qa/bugs/`, cập nhật file đó thay vì tạo duplicate. Sau khi audit, in danh sách bug files đã tạo/cập nhật và hướng dẫn chạy `/qa-fix`.
