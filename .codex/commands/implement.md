# /implement

## Mục tiêu

Implement một yêu cầu theo vertical slice nhỏ nhất, giữ đúng kiến trúc, convention và hành vi ngoài scope.

## Workflow

1. Đọc `.codex/AGENTS.md`, instruction gần nhất và skill phù hợp.
2. Chuyển yêu cầu thành acceptance criteria quan sát được.
3. Discovery repository; tìm ít nhất một implementation tương tự bằng tên domain, UI label, endpoint và Hook.
4. Xác định feature owner, Server/Client boundary, API Strategy, Cache, state, schema và test.
5. Lập plan ngắn theo dependency order.
6. Implement contract/schema -> service/query Hook -> component -> route composition -> test.
7. Xử lý loading, empty, error, unauthorized, retry và edge case phù hợp.
8. Chạy test hẹp, typecheck, lint và build theo blast radius.
9. Review diff bằng checklist tổng hợp.

## Checklist

- [ ] Không duplicate implementation hoặc tạo HTTP Client mới.
- [ ] SEO/public data dùng server `fetch()`; Client API dùng Axios + React Query.
- [ ] `"use client"` ở boundary nhỏ nhất.
- [ ] TypeScript strict, Zod tại trust boundary.
- [ ] Accessibility, Security và Performance đã review.
- [ ] Không có ghi chú chưa hoàn tất, nội dung tạm, debug log hoặc thay đổi ngoài scope.

## Output mẫu

```text
Đã hoàn tất luồng thêm sản phẩm vào Wishlist bằng service và React Query Hook hiện có.
Quyết định chính: giữ Product Detail là Server Component; chỉ WishlistButton là Client Component.
Validation: Integration Test của WishlistButton, typecheck và lint đều đạt.
Rủi ro còn lại: chưa chạy E2E do môi trường Authentication không có trong workspace.
```
