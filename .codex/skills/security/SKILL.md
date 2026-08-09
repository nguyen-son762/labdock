---
name: security
description: Threat model và review Security cho Frontend, API boundary, XSS, CSRF, Token, Cookie, Authentication, Authorization, redirect, upload và sensitive data. Dùng cho auth, payment, form, CMS HTML hoặc thay đổi trust boundary.
---

# Security

## Mục tiêu

Ngăn dữ liệu hoặc hành động vượt trust/user boundary và giảm khả năng khai thác từ input không tin cậy.

## Trách nhiệm

- Xác định asset, actor, trust boundary và abuse case.
- Theo dấu untrusted input đến render, request, Cache, log và analytics.
- Xác minh Authorization ở Server/API, không chỉ ở UI.
- Giữ Token/secret ngoài client bundle, URL và log.
- Review dependency/security control mà không tự ý làm yếu.

## Quy trình

1. Đọc auth/session/Cookie/axios interceptor và Route Handler liên quan.
2. Lập data-flow cho input và dữ liệu nhạy cảm.
3. Kiểm tra XSS/sanitization, CSRF và redirect.
4. Kiểm tra Authentication, Authorization và tenant isolation.
5. Kiểm tra public/private Cache, upload và error leakage.
6. Tái hiện finding an toàn hoặc chứng minh bằng code path.
7. Đề xuất remediation nhỏ, testable và defense-in-depth.

## Decision Tree

1. Dữ liệu có đến từ user/API/CMS/URL/storage? Xem là untrusted.
2. Render như text? Dùng React escaping.
3. Cần HTML? Dùng sanitizer vetted và allowlist.
4. Mutation dùng Cookie? Kiểm tra CSRF/SameSite/origin.
5. Action nhạy cảm? Authorization phía Server/API.
6. Redirect nhận input? Chỉ allow internal path/domain cho phép.

## Checklist

- [ ] Không raw untrusted HTML.
- [ ] Token/Cookie/PII không leak.
- [ ] Authorization không phụ thuộc hidden button.
- [ ] Private Cache cách ly user/tenant.
- [ ] Upload validate type/size/name phía Server.
- [ ] Error/log không lộ internals hoặc secret.

## Anti-pattern

- `dangerouslySetInnerHTML` với CMS response chưa sanitize.
- Lưu privileged Token vào localStorage trái convention.
- Cho phép redirect URL tuyệt đối từ query param.
- Cache `/me` bằng public key.
- Retry payment POST không idempotency.

## Best Practice

- HttpOnly/Secure/SameSite Cookie theo auth architecture.
- Least privilege và server-side validation cho mọi action.
- Encode theo output context; sanitize chỉ khi cần HTML.
- Clear private state/Cache khi session kết thúc.

## Ví dụ đúng

Sau logout, xóa private React Query Cache và để API từ chối request cũ; redirect chỉ nhận normalized internal path.

## Ví dụ sai

Ẩn nút Admin phía UI nhưng endpoint vẫn chấp nhận mọi authenticated user.
