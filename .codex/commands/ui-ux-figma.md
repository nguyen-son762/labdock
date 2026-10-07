# /ui-ux-figma

## Mục tiêu

Chạy UI/UX visual audit giữa thiết kế Figma và website thực tế bằng Playwright, sau đó tự sửa các sai sót đã xác nhận. Command mặc định là audit-and-fix; dùng `--audit-only` nếu chỉ muốn báo cáo.

Command chỉ được chạy khi người dùng cung cấp đủ:

```text
FIGMA_URL: <Figma file/frame URL>
SITE_URL: <website URL hoặc local URL>
```

Ví dụ:

```text
/ui-ux-figma FIGMA_URL=https://www.figma.com/design/... SITE_URL=http://localhost:3000/en/products
```

Chỉ audit, không sửa:

```text
/ui-ux-figma --audit-only FIGMA_URL=<figma-frame-url> SITE_URL=<website-url>
```

## Quy tắc đầu vào

1. Không đoán URL hoặc frame nếu người dùng chưa cung cấp.
2. Kiểm tra website có mở được và Figma frame có quyền truy cập.
3. Nếu Figma yêu cầu login hoặc không xác định được frame, dừng phần visual comparison và báo blocker; vẫn có thể chạy UI behavior/accessibility nếu website truy cập được.
4. Kiểm tra Playwright trong repo và runtime đi kèm môi trường. Nếu runtime có Playwright, dùng runtime đó và ghi rõ command/path để chạy lại. Chỉ báo `test infrastructure blocker` khi không có runner/browser khả dụng; không tự dùng screenshot cảm tính để kết luận pixel defect.
5. Với mode mặc định, được sửa production code trong phạm vi finding đã xác nhận. `--audit-only` chỉ tạo artifact/report trong `.qa/ui-ux/`.
6. Không sửa theo subjective preference hoặc pixel difference chưa có evidence.

## Agent workflow

### Phase 1 — Setup và route discovery

1. Đọc `.codex/AGENTS.md`, `package.json`, Playwright config nếu có và convention UI hiện có.
2. Xác định route/flow tương ứng từ Figma frame: page, dialog, dropdown, form, table, empty/loading/error state.
3. Khởi động website bằng script sẵn có nếu `SITE_URL` là local và người dùng cho phép; không tự đổi env hoặc seed dữ liệu production.
4. Xác minh URL, locale, authentication state, viewport và dữ liệu test trước khi chụp.

### Phase 2 — Viewport matrix

Chạy tối thiểu:

| Profile | Viewport |
|---|---:|
| Desktop | 1440x900 |
| Laptop | 1280x800 |
| Tablet | 768x1024 |
| Mobile | 390x844 |
| Narrow mobile | 320x720 |

Nếu Figma có frame size cụ thể, thêm đúng frame size đó và ghi rõ trong report.

### Phase 3 — Playwright evidence

Dùng Playwright để:

- mở website tại từng viewport;
- chụp screenshot full-page và screenshot vùng tương ứng;
- đo bounding box của các landmark: header, hero, card, form, CTA, table, footer;
- kiểm tra overflow ngang, scroll container, clipping, sticky/fixed element và z-index;
- kiểm tra typography: font family, size, weight, line-height, wrapping và truncation;
- kiểm tra spacing, alignment, grid/column count, radius, border, shadow và color;
- kiểm tra image dimensions, object-fit, loading/fallback và alt;
- kiểm tra hover, focus-visible, active, disabled, loading, empty, error và success state;
- kiểm tra click, keyboard Tab/Shift+Tab, Enter/Space, Escape, focus restore và responsive menu;
- kiểm tra console error, failed request, hydration warning và unexpected navigation.

Không dùng `waitForTimeout`. Dùng `expect`, locator auto-waiting, `toHaveScreenshot` khi baseline ổn định, `expect.poll` hoặc chờ network/visible state có chủ đích.

### Phase 4 — Figma comparison

Với mỗi frame, lập bảng:

| Element | Figma | Actual | Delta | Severity | Evidence |
|---|---|---|---|---|---|

Chỉ báo mismatch khi có bằng chứng từ screenshot, DOM measurement, computed style hoặc interaction. Phân biệt:

- `P1`: phá task, CTA/field không dùng được, layout vỡ nghiêm trọng, nội dung bị che/mất.
- `P2`: sai spacing/layout/typography/state gây ảnh hưởng rõ đến usability hoặc responsive.
- `P3`: sai nhỏ về polish, shadow, radius, icon hoặc pixel-level không ảnh hưởng task.

Không báo subjective preference nếu Figma không thể hiện rõ hoặc sai khác không ảnh hưởng người dùng.

### Phase 5 — Accessibility overlay

Kiểm tra thêm theo WCAG 2.2 AA:

- accessible name, semantic role, label và error association;
- keyboard-only completion;
- visible focus và focus trap/restore;
- contrast và non-color cues;
- 200%/400% zoom hoặc reflow;
- reduced motion cho carousel/animation;
- touch target và mobile interaction.

Mỗi finding accessibility phải có locator/role, reproduction và expected behavior.

### Phase 6 — Fix confirmed findings

Với mỗi finding `P1` hoặc `P2` đã xác nhận:

1. Tạo hoặc cập nhật bug file trong `.qa/bugs/` theo template hiện có.
2. Tạo reproduction/regression test thất bại trước khi sửa khi khả thi.
3. Xác định component/route owner và sửa implementation nhỏ nhất.
4. Giữ đúng design token, component primitive và accessibility contract hiện có.
5. Không đổi API, copy, business logic hoặc layout ngoài phạm vi finding.
6. Chạy lại Playwright tại viewport bị lỗi và ít nhất một viewport lân cận.
7. Chạy typecheck, lint và test liên quan.
8. Chuyển bug thành `resolved` chỉ khi screenshot/measurement và test đều đạt; nếu thiếu Figma access, backend hoặc dữ liệu thì chuyển `blocked`.

P3 chỉ tự sửa khi thay đổi nhỏ, rõ ràng và không cần quyết định sản phẩm; nếu không, lưu backlog để review.

### Phase 7 — Review và artifact

Sau khi fix, chạy `UI/UX Fix Reviewer` để kiểm tra:

- screenshot có đúng viewport và route;
- finding có Figma evidence và actual evidence;
- không duplicate finding giữa viewport;
- không kết luận từ CSS class đơn lẻ;
- test không dùng selector brittle hoặc arbitrary sleep;
- regression test fail nếu revert fix;
- fix không phá viewport, keyboard flow hoặc accessibility;
- không có scope creep hoặc thay đổi business behavior;
- screenshot/trace/HTML không chứa token, cookie, PII hoặc secret.

Lưu artifact nếu được phép:

```text
.qa/ui-ux/<run-id>/
├── report.md
├── findings.json
├── screenshots/
├── traces/
└── measurements.json
```

## Finding format

```text
TYPE: visual mismatch | responsive defect | interaction defect | accessibility defect | test infrastructure
AREA:
FIGMA_URL:
SITE_URL:
ROUTE:
VIEWPORT:
SCENARIO:
STEPS:
EXPECTED_FROM_FIGMA:
ACTUAL:
MEASUREMENT_OR_EVIDENCE:
SEVERITY: P1 | P2 | P3
CONFIDENCE: High | Medium | Low
FILE/COMPONENT:
RECOMMENDED_FIX:
RECOMMENDED_REGRESSION_TEST:
SCREENSHOT_OR_TRACE:
NOTES:
```

## Final report

Report phải gồm:

1. Figma URL, website URL, commit và thời gian chạy
2. Routes/states đã kiểm tra
3. Viewport matrix
4. Confirmed visual/UX defects
5. Responsive findings
6. Interaction and state findings
7. Accessibility findings
8. Console/network/runtime errors
9. Screenshots/traces/measurements
10. Missing states hoặc Figma ambiguity
11. Fixes applied and files changed
12. Regression tests and validation results
13. Unfixed/blocked findings
14. Exact Playwright command để chạy lại

Nếu website hoặc Figma không truy cập được, report phải ghi rõ blocker và không gọi audit là `passed`.
