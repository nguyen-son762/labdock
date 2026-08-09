# /security

## Mục tiêu

Threat model và review thay đổi Frontend theo trust boundary, tập trung XSS, CSRF, Token, Cookie, Authentication và Authorization.

## Workflow

1. Liệt kê asset, actor, trust boundary và dữ liệu nhạy cảm.
2. Theo dấu input từ URL/form/storage/API/CMS đến render, log và request.
3. Kiểm tra Authentication, Authorization phía Server/API và session lifecycle.
4. Kiểm tra XSS, unsafe HTML, redirect, upload và third-party script.
5. Kiểm tra CSRF cho Cookie-authenticated mutation, SameSite và origin policy.
6. Kiểm tra public/private Cache, log, analytics và error message.
7. Báo finding theo severity, exploit scenario và remediation cụ thể.

## Checklist

- [ ] Không tin UI visibility là Authorization.
- [ ] Token/Cookie/PII không vào URL, log, analytics hoặc client bundle.
- [ ] Untrusted HTML được sanitize bằng cơ chế vetted.
- [ ] Mutation nhạy cảm có CSRF/idempotency phù hợp.
- [ ] Private Cache được cách ly và clear khi logout.
- [ ] Không giảm CSP hoặc validation để tránh lỗi.

## Output mẫu

```text
[P0] Redirect sau login chấp nhận URL tuyệt đối từ search param.
Kẻ tấn công có thể gửi link login dẫn người dùng sang trang giả mạo sau Authentication. Chỉ cho phép path nội bộ đã parse và bắt đầu bằng một dấu '/'.
```

