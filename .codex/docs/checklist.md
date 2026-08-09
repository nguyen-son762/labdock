# Checklist chất lượng tổng hợp

## Cách sử dụng

Chọn các mục áp dụng theo risk. Mục không áp dụng phải có lý do khi ảnh hưởng lớn; không đánh dấu pass nếu chưa kiểm tra.

## Decision Tree validation

1. Thay đổi pure logic? Chạy Unit Test + typecheck + lint.
2. Thay đổi component/Hook? Thêm Integration Test, keyboard check và render-state check.
3. Thay đổi route/rendering/API? Chạy build, kiểm tra server HTML, network, Cache và Hydration.
4. Thay đổi critical journey/Auth/payment? Thêm E2E Test và Security review.
5. Thay đổi shared primitive/config? Chạy phạm vi consumer rộng và kiểm tra Bundle Size.

## Discovery

- [ ] Đọc instruction, package/config và CI.
- [ ] Tìm implementation tương tự trong mọi folder liên quan.
- [ ] Xác định convention, public API và source of truth.
- [ ] Kiểm tra thay đổi hiện có, generated file và dependency version.

## Architecture

- [ ] Feature owner và dependency direction đúng.
- [ ] Không deep import/private import hoặc cycle.
- [ ] Không duplicate abstraction, state hoặc business rule.
- [ ] Không thêm library/layer khi chưa có bằng chứng cần thiết.

## API, Cache và State

- [ ] Đã phân loại đủ năm câu hỏi API.
- [ ] SEO/public data dùng server `fetch()`; personalized interaction dùng Axios + React Query.
- [ ] Reuse axios instance, service, custom Hook và query key.
- [ ] Cache scope, freshness, key, invalidation và logout reset rõ.
- [ ] Source of truth duy nhất; không mirror/duplicate state.
- [ ] Cancellation, race, retry và idempotency đã xét.

## Rendering và Performance

- [ ] Server Component là mặc định; Client boundary tối thiểu.
- [ ] Không có duplicate fetch hoặc waterfall.
- [ ] Suspense/Streaming fallback giữ layout.
- [ ] Image, font, Dynamic Import và Bundle Size hợp lý.
- [ ] Hydration, Render Count và serialized props được đánh giá.

## SEO

- [ ] Indexable content có trong server HTML.
- [ ] Metadata, OpenGraph và canonical chính xác.
- [ ] robots/sitemap đồng bộ khi route index thay đổi.
- [ ] JSON-LD hợp lệ, an toàn và khớp visible content.

## Accessibility

- [ ] Semantic HTML và accessible name đúng.
- [ ] Keyboard, focus order, focus trap/restore và Escape đúng.
- [ ] Form label/error/status hỗ trợ Screen Reader.
- [ ] UI tuân theo Shadcn-first; feature không tự dựng form control đã có trong `src/components/ui`.
- [ ] Contrast, zoom, reflow, reduced motion và touch target đạt yêu cầu.

## Security

- [ ] Input untrusted được validate/sanitize.
- [ ] Authentication và Authorization được kiểm tra phía Server/API.
- [ ] XSS, CSRF, redirect, upload và data exposure đã review.
- [ ] Token/Cookie/PII không xuất hiện trong URL, log hoặc client bundle.

## Testing và giao nhận

- [ ] Test happy path và failure path theo risk.
- [ ] Bug fix có regression test khi khả thi.
- [ ] Typecheck, lint, test và build đã chạy phù hợp.
- [ ] Diff không có ghi chú chưa hoàn tất, nội dung tạm, dead code, debug log hoặc churn ngoài scope.
- [ ] Phản hồi cuối nêu validation thực tế và residual risk.

## Anti-pattern

- Dùng checklist như thủ tục đánh dấu mà không đọc diff.
- Chạy full suite nhưng bỏ qua test hẹp chứng minh hành vi.
- Bỏ build sau thay đổi Server/Client boundary.
- Tuyên bố “không có rủi ro” khi chưa kiểm tra critical path.

## Best Practice

- Validation tăng theo blast radius.
- Ghi evidence ngắn cho quyết định khó và omission.
- Sửa root cause, không giảm test/lint/type safety để đạt màu xanh.
- Dừng và báo blocker khi cần quyền hoặc thông tin làm thay đổi đáng kể kết quả.

## Ví dụ đúng

Thay đổi Product Page được kiểm tra bằng server HTML, Cache tag, metadata, keyboard flow của Wishlist và test mutation; báo rõ E2E Authentication chưa chạy vì thiếu môi trường.

## Ví dụ sai

Chỉ chạy formatter rồi đánh dấu toàn bộ SEO, Security, Accessibility và Performance là đạt mà không có kiểm tra hoặc evidence.
