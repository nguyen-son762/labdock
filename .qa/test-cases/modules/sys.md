# SYS — HTTP, session, cache và độ tin cậy

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `Infrastructure và mọi private/public API`. Tổng: 24 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: Clock/network có kiểm soát; DS-AUTH A/B; HTTP adapter/mock fetch hoặc sandbox. Không dùng token/PII thật trong fixture, log hay tài liệu.

## SYS-001 — Bearer và endpoint public

- **Yêu cầu:** `SYS.AUTH`
- **Ưu tiên / loại / mức:** P0 / Contract / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** UserA token; /me/profile,/cart,/orders,/rfqs và auth public

**Bước thực hiện**

1. Gọi request private/public.
2. Đọc headers mock.

**Kết quả mong đợi:** Private có Authorization Bearer; login/refresh/signup/forgot-password và client/categories không tự gắn access token; server/categories có token theo policy riêng.

**Nguồn truy vết:** [src/lib/http-client.ts:12](../../../src/lib/http-client.ts#L12).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/lib/http-client.test.ts.

**Thực thi:** Pass. Transport/session/cookie restore/cache hoặc cấu hình tương ứng đã pass bằng adapter/cookie/fetch mock deterministic.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-001` trong `execution/results.json`.

## SYS-002 — 401 đồng thời single flight

- **Yêu cầu:** `SYS.REFRESH`
- **Ưu tiên / loại / mức:** P0 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 2 private requests401; refresh trả token mới

**Bước thực hiện**

1. Gửi song song.
2. Resolve refresh rồi retry.

**Kết quả mong đợi:** Chỉ1 POST /auth/refresh với refreshToken; cả hai retry với access mới; token cập nhật; không lặp vô hạn.

**Nguồn truy vết:** [src/lib/http-client.ts:12](../../../src/lib/http-client.ts#L12), [src/lib/auth-token-store.ts:5](../../../src/lib/auth-token-store.ts#L5).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/http-client.test.ts, src/lib/auth-token-store.test.ts.

**Thực thi:** Pass. Transport/session/cookie restore/cache hoặc cấu hình tương ứng đã pass bằng adapter/cookie/fetch mock deterministic.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-002` trong `execution/results.json`.

## SYS-003 — Refresh thất bại hoặc token response sai

- **Yêu cầu:** `SYS.REFRESH`
- **Ưu tiên / loại / mức:** P0 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** refresh401/500/malformed

**Bước thực hiện**

1. Gây private401.
2. Reject refresh.

**Kết quả mong đợi:** Xóa token/cookie và private cache; request caller reject; không phát request lặp để giữ session giả.

**Nguồn truy vết:** [src/lib/http-client.ts:12](../../../src/lib/http-client.ts#L12), [src/lib/auth-token-store.ts:5](../../../src/lib/auth-token-store.ts#L5).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/http-client.test.ts, src/lib/auth-token-store.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra các phần race/error/cache liên quan và không có runtime error ở browser run; chưa có đủ assertions cho mọi retry/abort/cross-user/throttle/logging condition trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-003` trong `execution/results.json`.

## SYS-004 — Request retry vẫn401

- **Yêu cầu:** `SYS.REFRESH`
- **Ưu tiên / loại / mức:** P0 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Refresh success, protected retry401

**Bước thực hiện**

1. Gọi protected request.
2. Cho cả original/retry401.

**Kết quả mong đợi:** Không refresh tiếp cho cùng request; clear session; không loop.

**Nguồn truy vết:** [src/lib/http-client.ts:12](../../../src/lib/http-client.ts#L12), [src/lib/auth-token-store.ts:5](../../../src/lib/auth-token-store.ts#L5).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/http-client.test.ts, src/lib/auth-token-store.test.ts.

**Thực thi:** Pass. Transport/session/cookie restore/cache hoặc cấu hình tương ứng đã pass bằng adapter/cookie/fetch mock deterministic.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-004` trong `execution/results.json`.

## SYS-005 — Public401 không làm refresh/logout phiên đang có

- **Yêu cầu:** `SYS.REFRESH`
- **Ưu tiên / loại / mức:** P1 / Contract / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** UserA đăng nhập; signup/forgot/login trả401

**Bước thực hiện**

1. Gọi từng public endpoint401.

**Kết quả mong đợi:** Không refresh; phiên A không bị xóa chỉ vì lỗi public auth flow; private401 không refreshToken phải clear.

**Nguồn truy vết:** [src/lib/http-client.ts:12](../../../src/lib/http-client.ts#L12), [src/lib/auth-token-store.ts:5](../../../src/lib/auth-token-store.ts#L5).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/http-client.test.ts, src/lib/auth-token-store.test.ts.

**Thực thi:** Pass. Transport/session/cookie restore/cache hoặc cấu hình tương ứng đã pass bằng adapter/cookie/fetch mock deterministic.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-005` trong `execution/results.json`.

## SYS-006 — Logout trong khi refresh pending

- **Yêu cầu:** `SYS.LOGOUT`
- **Ưu tiên / loại / mức:** P0 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Security target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Refresh chưa resolve; user logout trước

**Bước thực hiện**

1. Gây401 và giữ refresh.
2. Logout.
3. Resolve refresh thành công.

**Kết quả mong đợi:** Response cũ không phục hồi token sau logout hoặc tạo phiên lại; giữ unauthenticated.

**Nguồn truy vết:** [src/lib/http-client.ts:12](../../../src/lib/http-client.ts#L12), [src/features/auth/api/use-logout-mutation.ts:6](../../../src/features/auth/api/use-logout-mutation.ts#L6).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/http-client.test.ts.

**Thực thi:** Pass. Transport/session/cookie restore/cache hoặc cấu hình tương ứng đã pass bằng adapter/cookie/fetch mock deterministic.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-006` trong `execution/results.json`.

## SYS-007 — Cookie restore tab mới

- **Yêu cầu:** `SYS.SESSION`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 4 cookies hợp lệ

**Bước thực hiện**

1. Login.
2. Mở module/tab mới cùng session browser.

**Kết quả mong đợi:** Khôi phục token/session metadata; profile fetch mới khi cache RAM mới; không persist PII profile vào storage.

**Nguồn truy vết:** [src/lib/auth-token-store.ts:5](../../../src/lib/auth-token-store.ts#L5), [src/lib/server-api-request.ts:30](../../../src/lib/server-api-request.ts#L30).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/auth-token-store.test.ts, src/lib/server-api-request.test.ts.

**Thực thi:** Pass. Transport/session/cookie restore/cache hoặc cấu hình tương ứng đã pass bằng adapter/cookie/fetch mock deterministic.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-007` trong `execution/results.json`.

## SYS-008 — Cookie thiếu/sai/encoding độc hại

- **Yêu cầu:** `SYS.SESSION`
- **Ưu tiên / loại / mức:** P1 / Security / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Thiếu1cookie; expiresAt sai; boolean sai; %encoding sai; CRLF

**Bước thực hiện**

1. Seed fixture cookie.
2. Đọc session và server request init.

**Kết quả mong đợi:** Malformed cookie không crash, không tạo Authorization header injection; client clear bộ cookie không hợp lệ; server bỏ token CRLF.

**Nguồn truy vết:** [src/lib/auth-token-store.ts:5](../../../src/lib/auth-token-store.ts#L5), [src/lib/server-api-request.ts:30](../../../src/lib/server-api-request.ts#L30).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/lib/auth-token-store.test.ts, src/lib/server-api-request.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra các phần race/error/cache liên quan và không có runtime error ở browser run; chưa có đủ assertions cho mọi retry/abort/cross-user/throttle/logging condition trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-008` trong `execution/results.json`.

## SYS-009 — Cookie HTTPS và logout cleanup

- **Yêu cầu:** `SYS.SESSION`
- **Ưu tiên / loại / mức:** P1 / Contract / Browser
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** HTTP local và HTTPS sandbox

**Bước thực hiện**

1. Login.
2. Đọc thuộc tính cookies.
3. Logout.

**Kết quả mong đợi:** Path=/; SameSite=Lax; HTTPS có Secure; không MaxAge persistent khi tạo; logout xóa cả4. HttpOnly chưa có vì client ghi cookie.

**Nguồn truy vết:** [src/lib/auth-token-store.ts:5](../../../src/lib/auth-token-store.ts#L5), [src/lib/server-api-request.ts:30](../../../src/lib/server-api-request.ts#L30).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/lib/auth-token-store.test.ts, src/lib/server-api-request.test.ts.

**Thực thi:** Blocked. Cần backend/sandbox và ít nhất hai user hoặc HTTPS để kiểm tra authorization, session policy/HttpOnly và validation nội dung file. Frontend mock không chứng minh được các thuộc tính này.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-009` trong `execution/results.json`.

## SYS-010 — HttpOnly là mục tiêu cần backend

- **Yêu cầu:** `SYS.SESSION`
- **Ưu tiên / loại / mức:** P1 / Security / Integration
- **Cơ sở kỳ vọng:** Existing bug (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Cookie access/refresh hiện JS-readable

**Bước thực hiện**

1. Kiểm tra cookie production-like.
2. Đối chiếu kiến trúc BFF/Set-Cookie nếu được triển khai.

**Kết quả mong đợi:** Nếu chuyển HttpOnly: token không đọc bằng JS và vẫn login/refresh/logout được. Trạng thái hiện tại phải ghi residual risk, không đánh Pass HttpOnly.

**Lưu ý / dependency:** BUG-20261007-005, cần backend/BFF; không sửa bằng xóa chức năng restore.

**Nguồn truy vết:** [src/lib/auth-token-store.ts:5](../../../src/lib/auth-token-store.ts#L5), [src/lib/server-api-request.ts:30](../../../src/lib/server-api-request.ts#L30).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/auth-token-store.test.ts, src/lib/server-api-request.test.ts.

**Thực thi:** Blocked. Cần backend/sandbox và ít nhất hai user hoặc HTTPS để kiểm tra authorization, session policy/HttpOnly và validation nội dung file. Frontend mock không chứng minh được các thuộc tính này.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-010` trong `execution/results.json`.

## SYS-011 — Session expiry theo thời gian

- **Yêu cầu:** `SYS.SESSION`
- **Ưu tiên / loại / mức:** P1 / Reliability / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** expiresAt quá khứ nhưng refreshToken còn/không còn

**Bước thực hiện**

1. Tiến clock qua expiresAt.
2. Mở trang private và gọi API.

**Kết quả mong đợi:** Không coi getSession metadata là backend đã xác thực;401 xử lý đúng refresh/clear; policy proactive expiry cần xác nhận.

**Nguồn truy vết:** [src/lib/auth-token-store.ts:5](../../../src/lib/auth-token-store.ts#L5), [src/lib/server-api-request.ts:30](../../../src/lib/server-api-request.ts#L30).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/auth-token-store.test.ts, src/lib/server-api-request.test.ts.

**Thực thi:** Blocked. Cần backend/sandbox và ít nhất hai user hoặc HTTPS để kiểm tra authorization, session policy/HttpOnly và validation nội dung file. Frontend mock không chứng minh được các thuộc tính này.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-011` trong `execution/results.json`.

## SYS-012 — Public anonymous cache và private no-store

- **Yêu cầu:** `SYS.CACHE`
- **Ưu tiên / loại / mức:** P0 / Security / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** homepage/categories/brands/origins/products/list/detail

**Bước thực hiện**

1. Gọi không token.
2. Gọi cùng resource với tokenA/B.

**Kết quả mong đợi:** Anonymous revalidate300 và tags đúng resource; có token thì Bearer+no-store, không có next public cache. Dữ liệu A không phục vụ B.

**Nguồn truy vết:** [src/lib/server-api-request.ts:30](../../../src/lib/server-api-request.ts#L30), [src/providers/app-providers.tsx:9](../../../src/providers/app-providers.tsx#L9), [src/features/auth/api/use-login-mutation.ts:8](../../../src/features/auth/api/use-login-mutation.ts#L8).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/server-api-request.test.ts.

**Thực thi:** Pass. Transport/session/cookie restore/cache hoặc cấu hình tương ứng đã pass bằng adapter/cookie/fetch mock deterministic.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-012` trong `execution/results.json`.

## SYS-013 — URL filter là cache key public

- **Yêu cầu:** `SYS.CACHE`
- **Ưu tiên / loại / mức:** P1 / Contract / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Hai request khác brand/origin/page

**Bước thực hiện**

1. Gọi A rồi B rồi A.
2. Kiểm tra dữ liệu.

**Kết quả mong đợi:** Không trả kết quả cache A cho URL B; metadata/detail và visible data dùng cùng resource/freshness.

**Nguồn truy vết:** [src/lib/server-api-request.ts:30](../../../src/lib/server-api-request.ts#L30), [src/providers/app-providers.tsx:9](../../../src/providers/app-providers.tsx#L9), [src/features/auth/api/use-login-mutation.ts:8](../../../src/features/auth/api/use-login-mutation.ts#L8).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/server-api-request.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-013` trong `execution/results.json`.

## SYS-014 — Private staleTime và abort

- **Yêu cầu:** `SYS.CACHE`
- **Ưu tiên / loại / mức:** P1 / Reliability / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Cart30s; Profile60s; Orders/RFQs30s

**Bước thực hiện**

1. Mount/unmount và remount trong/ngoài staleTime.
2. Chuyển route khi request pending.

**Kết quả mong đợi:** Không refetch không cần khi fresh; stale refetch có kiểm soát; AbortSignal tới read API; lỗi cancellation không hiển thị thành sự cố người dùng.

**Nguồn truy vết:** [src/lib/server-api-request.ts:30](../../../src/lib/server-api-request.ts#L30), [src/providers/app-providers.tsx:9](../../../src/providers/app-providers.tsx#L9), [src/features/auth/api/use-login-mutation.ts:8](../../../src/features/auth/api/use-login-mutation.ts#L8).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/server-api-request.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra các phần race/error/cache liên quan và không có runtime error ở browser run; chưa có đủ assertions cho mọi retry/abort/cross-user/throttle/logging condition trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-014` trong `execution/results.json`.

## SYS-015 — Switch A sang B và phản hồi cũ

- **Yêu cầu:** `SYS.CACHE`
- **Ưu tiên / loại / mức:** P0 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Security target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** A có profile/cart/records; requestA pending

**Bước thực hiện**

1. Logout A, login B.
2. Resolve responseA muộn.

**Kết quả mong đợi:** Không có dữ liệu A trong cache/UI B; mutation callback cũ không setQueryData private của B. Keys không chứa userId phải có session isolation đáng tin.

**Nguồn truy vết:** [src/lib/server-api-request.ts:30](../../../src/lib/server-api-request.ts#L30), [src/providers/app-providers.tsx:9](../../../src/providers/app-providers.tsx#L9), [src/features/auth/api/use-login-mutation.ts:8](../../../src/features/auth/api/use-login-mutation.ts#L8).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/server-api-request.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra các phần race/error/cache liên quan và không có runtime error ở browser run; chưa có đủ assertions cho mọi retry/abort/cross-user/throttle/logging condition trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-015` trong `execution/results.json`.

## SYS-016 — Retry query theo loại lỗi

- **Yêu cầu:** `SYS.RETRY`
- **Ưu tiên / loại / mức:** P1 / Contract / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** network,408,429,500;400,401,403,404; Zod error

**Bước thực hiện**

1. Gọi query với từng lỗi.
2. Đếm attempts bằng clock.

**Kết quả mong đợi:** Query mặc định tối đa3 attempts cho lỗi transient;4xx khác/Zod không retry. Profile retry=false, retryOnMount=false; mutation retry=false.

**Nguồn truy vết:** [src/lib/http-client.ts:12](../../../src/lib/http-client.ts#L12), [src/providers/app-providers.tsx:9](../../../src/providers/app-providers.tsx#L9).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/lib/http-client.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra các phần race/error/cache liên quan và không có runtime error ở browser run; chưa có đủ assertions cho mọi retry/abort/cross-user/throttle/logging condition trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-016` trong `execution/results.json`.

## SYS-017 — Không lặp mutation mù sau timeout

- **Yêu cầu:** `SYS.RETRY`
- **Ưu tiên / loại / mức:** P0 / Reliability / Integration
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** POST cart/change-password/checkout

**Bước thực hiện**

1. Backend xử lý nhưng response timeout.
2. Quan sát tự retry và user retry.

**Kết quả mong đợi:** Không auto retry mutation; xác minh kết quả trước retry thủ công nếu có rủi ro duplicate. Idempotency phải giữ cùng ý định qua retry theo contract backend.

**Nguồn truy vết:** [src/lib/http-client.ts:12](../../../src/lib/http-client.ts#L12), [src/providers/app-providers.tsx:9](../../../src/providers/app-providers.tsx#L9).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/http-client.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra các phần race/error/cache liên quan và không có runtime error ở browser run; chưa có đủ assertions cho mọi retry/abort/cross-user/throttle/logging condition trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-017` trong `execution/results.json`.

## SYS-018 — Ưu tiên error message và fallback

- **Yêu cầu:** `SYS.ERROR`
- **Ưu tiên / loại / mức:** P1 / Contract / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** message+detail; detail400/500; canceled; unknown error

**Bước thực hiện**

1. Gọi getApiErrorMessage với fixture.

**Kết quả mong đợi:** message không rỗng ưu tiên; detail chỉ khi status<500;400/401/403/404/409/429 có fallback;ERR_CANCELED thông báo hủy;unknown fallback an toàn.

**Nguồn truy vết:** [src/lib/api-error.ts:18](../../../src/lib/api-error.ts#L18).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/lib/api-error.test.ts.

**Thực thi:** Pass. Transport/session/cookie restore/cache hoặc cấu hình tương ứng đã pass bằng adapter/cookie/fetch mock deterministic.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-018` trong `execution/results.json`.

## SYS-019 — Không lộ secret qua lỗi hoặc console

- **Yêu cầu:** `SYS.ERROR`
- **Ưu tiên / loại / mức:** P1 / Security / Integration
- **Cơ sở kỳ vọng:** Security target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Payload error chứa stack/token/PII; cart có dữ liệu người dùng

**Bước thực hiện**

1. Gây lỗi/API response.
2. Quan sát UI/log có redaction.

**Kết quả mong đợi:** Không ghi token/password/PII trong log/UI; kiểm tra message500 do backend cấp trước khi hiển thị và console.warn cart debug.

**Lưu ý / dependency:** CartScreen hiện console.warn(items); getApiErrorMessage vẫn ưu tiên message ở500.

**Nguồn truy vết:** [src/lib/api-error.ts:18](../../../src/lib/api-error.ts#L18).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/lib/api-error.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra các phần race/error/cache liên quan và không có runtime error ở browser run; chưa có đủ assertions cho mọi retry/abort/cross-user/throttle/logging condition trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-019` trong `execution/results.json`.

## SYS-020 — API base URL contract

- **Yêu cầu:** `SYS.CONFIG`
- **Ưu tiên / loại / mức:** P2 / Boundary / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** undefined; https://api.example.test/v1///; /api/; empty; //host; ftp; /

**Bước thực hiện**

1. Parse từng giá trị với fixture env.

**Kết quả mong đợi:** Undefined dùng fallback source; trailing slash bỏ; HTTP(S)/root-relative hợp lệ; empty và scheme/root sai reject. Không đọc .env.local thật trong báo cáo.

**Nguồn truy vết:** [src/config/client-env.ts:5](../../../src/config/client-env.ts#L5), [src/config/site.ts:8](../../../src/config/site.ts#L8).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/config/client-env.test.ts, src/config/site.test.ts.

**Thực thi:** Pass. Transport/session/cookie restore/cache hoặc cấu hình tương ứng đã pass bằng adapter/cookie/fetch mock deterministic.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-020` trong `execution/results.json`.

## SYS-021 — Site URL production

- **Yêu cầu:** `SYS.CONFIG`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** undefined/ftp/path/query/hash; valid origin

**Bước thực hiện**

1. Parse theo production/development.

**Kết quả mong đợi:** Production cần originHTTP(S) hợp lệ không path/query/hash; dev không config về localhost; canonical/sitemap không trỏ localhost production.

**Nguồn truy vết:** [src/config/client-env.ts:5](../../../src/config/client-env.ts#L5), [src/config/site.ts:8](../../../src/config/site.ts#L8).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/config/client-env.test.ts, src/config/site.test.ts.

**Thực thi:** Pass. Transport/session/cookie restore/cache hoặc cấu hình tương ứng đã pass bằng adapter/cookie/fetch mock deterministic.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-021` trong `execution/results.json`.

## SYS-022 — Security headers và image host

- **Yêu cầu:** `SYS.HEADERS`
- **Ưu tiên / loại / mức:** P1 / Security / Browser
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Response route public/private; media đúng/saihost

**Bước thực hiện**

1. Đọc headers server sandbox.
2. Tải ảnh qua Next image.

**Kết quả mong đợi:** nosniff, X-Frame-Options DENY, referrer policy, permissions policy đúng config; media allowlist đúng API host/path; không thêm host tùy ý để vượt bảo vệ.

**Nguồn truy vết:** [src/config/site.ts:8](../../../src/config/site.ts#L8).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/config/site.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Headers và image allowlist đã quan sát trên HTTP local; chưa kiểm tra production host thật và các host ảnh ngoài danh sách.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-022` trong `execution/results.json`.

## SYS-023 — Request waterfall và count categories

- **Yêu cầu:** `SYS.PERF`
- **Ưu tiên / loại / mức:** P2 / Performance / Browser
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Catalog có nhiều root thiếu productCount

**Bước thực hiện**

1. Cold-load và lấy trace server/browser.
2. So với trường hợp có count.

**Kết quả mong đợi:** Đo được4 resource độc lập; count thiếu phát sinh request từng category, count sẵn không gọi; chốt budget với team trước khi dùng làm release gate.

**Nguồn truy vết:** [src/lib/server-api-request.ts:30](../../../src/lib/server-api-request.ts#L30), [src/providers/app-providers.tsx:9](../../../src/providers/app-providers.tsx#L9).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/lib/server-api-request.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra các phần race/error/cache liên quan và không có runtime error ở browser run; chưa có đủ assertions cho mọi retry/abort/cross-user/throttle/logging condition trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-023` trong `execution/results.json`.

## SYS-024 — Hydration và tải chậm

- **Yêu cầu:** `SYS.PERF`
- **Ưu tiên / loại / mức:** P2 / Performance / Browser
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Home/PDP/catalog ở cold4G và CPU throttle

**Bước thực hiện**

1. Đọc HTML trước hydration.
2. Theo dõi console, layout shift và thao tác.

**Kết quả mong đợi:** Content public có server HTML; không hydration mismatch; skeleton giữ bố cục và form vẫn tương tác được. Ghi LCP/INP/CLS với budget thống nhất, không tự claim đạt.

**Nguồn truy vết:** [src/lib/server-api-request.ts:30](../../../src/lib/server-api-request.ts#L30), [src/providers/app-providers.tsx:9](../../../src/providers/app-providers.tsx#L9).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/lib/server-api-request.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Không có pageerror/hydration error trong browser run; chưa chạy ma trận slow network/CPU.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SYS-024` trong `execution/results.json`.
