---
name: axios
description: Chuẩn hóa Client API qua axios instance hiện có, gồm interceptors, refresh token, error handling, request config, cancellation và retry. Dùng khi thêm hoặc sửa service phía Client hay điều tra lỗi HTTP/Authentication.
---

# Axios

## Mục tiêu

Giữ một HTTP Client thống nhất, an toàn và observable cho mọi Client API.

## Trách nhiệm

- Tìm và reuse axios instance duy nhất.
- Giữ Token/Cookie lifecycle trong infrastructure hiện có.
- Chuẩn hóa request/response/error tại service boundary.
- Truyền AbortSignal và tránh retry mutation nguy hiểm.
- Không để component phụ thuộc chi tiết `AxiosError`.

## Quy trình

1. Đọc axios config, interceptors, auth flow và error model.
2. Tìm service cùng domain hoặc endpoint tương tự.
3. Khai báo input/output strict và path/method rõ.
4. Dùng instance hiện có; truyền signal/request config cần thiết.
5. Map transport error sang domain/UI-safe error theo convention.
6. Kết nối service qua React Query Hook.
7. Test 2xx, validation, 401/403, timeout/cancel và 5xx theo risk.

## Decision Tree

1. API là public/SEO initial data? Không dùng Axios; dùng server `fetch()`.
2. Client API đã có service? Mở rộng service đó.
3. 401 cần refresh? Dùng interceptor single-flight hiện có.
4. Request có thể lỗi thời? Truyền AbortSignal.
5. Method không idempotent? Không retry trừ khi có idempotency key.
6. Error chứa chi tiết nhạy cảm? Normalize trước khi lên UI/log.

## Checklist

- [ ] Không tạo axios instance mới.
- [ ] Base URL, credentials và timeout dùng config hiện có.
- [ ] Refresh token không tạo refresh storm.
- [ ] Token/PII không vào URL hoặc log.
- [ ] Cancellation và error mapping đúng.
- [ ] Service có type input/output, không trả `any`.

## Anti-pattern

- `axios.get()` trực tiếp trong component.
- Interceptor mới trong từng feature.
- Retry POST payment tự động.
- Catch rồi trả empty data như thành công.
- Lưu access Token vào nơi trái auth convention.

## Best Practice

- Service nhỏ theo resource/action.
- Refresh single-flight và fail-fast khi session hết hạn.
- Tách validation error khỏi network/system error.
- Dùng request id/idempotency key theo backend contract.

## Ví dụ đúng

`profileService.get(signal)` dùng `httpClient.get('/me', { signal })`; `useProfileQuery` quyết định Cache và retry.

## Ví dụ sai

Mỗi component gọi `axios.create`, tự đọc Token từ localStorage và tự redirect khi nhận 401.

