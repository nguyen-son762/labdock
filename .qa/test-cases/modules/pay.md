# PAY — Thanh toán và trang thành công

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `/payment; /payment/success`. Tổng: 17 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: DS-PAYMENT sandbox; chưa thu tiền thật. Frontend dùng service stub; hoàn tất tích hợp cần provider/backend xác nhận giao dịch.

## PAY-001 — URL payment hợp lệ

- **Yêu cầu:** `PAY.URL`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** method=paynow; reference=PAY-ABC12345; amount=4905

**Bước thực hiện**

1. Mở URL hợp lệ.

**Kết quả mong đợi:** Hiển thị method, QR, reference và amount từ tham số; đây là test render, chưa chứng minh đã tạo giao dịch backend.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/payment/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/payment/page.tsx#L7).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-001` trong `execution/results.json`.

## PAY-002 — Chặn payment URL: reference thiếu

- **Yêu cầu:** `PAY.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** reference thiếu

**Bước thực hiện**

1. Giữ tham số còn lại hợp lệ.
2. Mở /payment.

**Kết quả mong đợi:** Redirect /checkout, giữ locale; không hiển thị QR cho dữ liệu không hợp lệ.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/payment/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/payment/page.tsx#L7).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-002` trong `execution/results.json`.

## PAY-003 — Chặn payment URL: reference=PAY-abc12345

- **Yêu cầu:** `PAY.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** reference=PAY-abc12345

**Bước thực hiện**

1. Giữ tham số còn lại hợp lệ.
2. Mở /payment.

**Kết quả mong đợi:** Redirect /checkout, giữ locale; không hiển thị QR cho dữ liệu không hợp lệ.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/payment/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/payment/page.tsx#L7).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-003` trong `execution/results.json`.

## PAY-004 — Chặn payment URL: reference=PAY-ABC1234

- **Yêu cầu:** `PAY.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** reference=PAY-ABC1234

**Bước thực hiện**

1. Giữ tham số còn lại hợp lệ.
2. Mở /payment.

**Kết quả mong đợi:** Redirect /checkout, giữ locale; không hiển thị QR cho dữ liệu không hợp lệ.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/payment/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/payment/page.tsx#L7).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-004` trong `execution/results.json`.

## PAY-005 — Chặn payment URL: amount=0

- **Yêu cầu:** `PAY.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** amount=0

**Bước thực hiện**

1. Giữ tham số còn lại hợp lệ.
2. Mở /payment.

**Kết quả mong đợi:** Redirect /checkout, giữ locale; không hiển thị QR cho dữ liệu không hợp lệ.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/payment/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/payment/page.tsx#L7).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-005` trong `execution/results.json`.

## PAY-006 — Chặn payment URL: amount=-1

- **Yêu cầu:** `PAY.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** amount=-1

**Bước thực hiện**

1. Giữ tham số còn lại hợp lệ.
2. Mở /payment.

**Kết quả mong đợi:** Redirect /checkout, giữ locale; không hiển thị QR cho dữ liệu không hợp lệ.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/payment/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/payment/page.tsx#L7).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-006` trong `execution/results.json`.

## PAY-007 — Chặn payment URL: amount=NaN

- **Yêu cầu:** `PAY.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** amount=NaN

**Bước thực hiện**

1. Giữ tham số còn lại hợp lệ.
2. Mở /payment.

**Kết quả mong đợi:** Redirect /checkout, giữ locale; không hiển thị QR cho dữ liệu không hợp lệ.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/payment/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/payment/page.tsx#L7).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-007` trong `execution/results.json`.

## PAY-008 — Chặn payment URL: amount=Infinity

- **Yêu cầu:** `PAY.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** amount=Infinity

**Bước thực hiện**

1. Giữ tham số còn lại hợp lệ.
2. Mở /payment.

**Kết quả mong đợi:** Redirect /checkout, giữ locale; không hiển thị QR cho dữ liệu không hợp lệ.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/payment/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/payment/page.tsx#L7).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-008` trong `execution/results.json`.

## PAY-009 — Chặn payment URL: amount thiếu

- **Yêu cầu:** `PAY.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** amount thiếu

**Bước thực hiện**

1. Giữ tham số còn lại hợp lệ.
2. Mở /payment.

**Kết quả mong đợi:** Redirect /checkout, giữ locale; không hiển thị QR cho dữ liệu không hợp lệ.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/payment/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/payment/page.tsx#L7).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-009` trong `execution/results.json`.

## PAY-010 — Method thiếu hoặc không được hỗ trợ

- **Yêu cầu:** `PAY.METHOD`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** method=card hoặc bỏ method

**Bước thực hiện**

1. Mở URL với reference/amount hợp lệ.

**Kết quả mong đợi:** Source fallback paynow; không crash. Phương thức mới cần contract, không tự gửi tới Stripe.

**Nguồn truy vết:** [src/features/checkout/components/payment-screen.tsx:23](../../../src/features/checkout/components/payment-screen.tsx#L23).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/payment-screen.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-010` trong `execution/results.json`.

## PAY-011 — Bank transfer

- **Yêu cầu:** `PAY.METHOD`
- **Ưu tiên / loại / mức:** P0 / Functional / Integration
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** method=bank-transfer

**Bước thực hiện**

1. Mở payment.
2. Đối chiếu chỉ dẫn và beneficiary với cấu hình backend.

**Kết quả mong đợi:** Hiện Bank transfer; thông tin tài khoản và QR phải khớp giao dịch sandbox. QR/static i-DNA hiện tại chưa chứng minh có thể thanh toán thực.

**Nguồn truy vết:** [src/features/checkout/components/payment-screen.tsx:23](../../../src/features/checkout/components/payment-screen.tsx#L23).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/payment-screen.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-011` trong `execution/results.json`.

## PAY-012 — Hoàn tất frontend thành công

- **Yêu cầu:** `PAY.COMPLETE`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** completePayment stub trả orderId=OR-3000,paid

**Bước thực hiện**

1. Click I have completed payment.
2. Resolve stub.

**Kết quả mong đợi:** Gửi method/reference; button pending; chỉ sau success đi /payment/success?orderId=...&amount=...; không suy ra tiền đã vào tài khoản từ stub.

**Nguồn truy vết:** [src/features/checkout/components/payment-screen.tsx:23](../../../src/features/checkout/components/payment-screen.tsx#L23), [src/features/checkout/api/checkout.service.ts:17](../../../src/features/checkout/api/checkout.service.ts#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/payment-screen.test.tsx.

**Thực thi:** Pass. Frontend chuyển success URL với orderId nhận từ service spy. Kết quả chỉ áp dụng frontend, không chứng minh đã thanh toán.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-012` trong `execution/results.json`.

## PAY-013 — Duplicate và failure

- **Yêu cầu:** `PAY.COMPLETE`
- **Ưu tiên / loại / mức:** P0 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** complete pending,500

**Bước thực hiện**

1. Click liên tiếp.
2. Reject rồi retry.

**Kết quả mong đợi:** Một mutation mỗi lần pending; không auto retry; failure giữ màn hình/reference; không báo success.

**Nguồn truy vết:** [src/features/checkout/components/payment-screen.tsx:23](../../../src/features/checkout/components/payment-screen.tsx#L23), [src/features/checkout/api/checkout.service.ts:17](../../../src/features/checkout/api/checkout.service.ts#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/payment-screen.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-013` trong `execution/results.json`.

## PAY-014 — Không tin amount và trạng thái từ URL

- **Yêu cầu:** `PAY.SECURITY`
- **Ưu tiên / loại / mức:** P0 / Functional / API + E2E
- **Cơ sở kỳ vọng:** Security target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Tự đổi amount=0.01; truy cập success?orderId=OR-9999&amount=999

**Bước thực hiện**

1. Sửa URL.
2. Mở success trực tiếp không trả tiền.

**Kết quả mong đợi:** Backend xác minh session/user/amount/status; không tạo hoặc khẳng định đơn đã trả tiền chỉ nhờ query hợp lệ.

**Lưu ý / dependency:** Source hiện render success theo format query; chưa có xác minh backend.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/payment/success/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/payment/success/page.tsx#L7), [src/features/checkout/api/checkout.service.ts:17](../../../src/features/checkout/api/checkout.service.ts#L17).

**Automation:** Đề xuất API + E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. checkout/payment/quote/contact submit trong source vẫn là mock local; thiếu API contract/endpoint và sandbox để chứng minh lưu dữ liệu, xác thực thanh toán, idempotency và email thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-014` trong `execution/results.json`.

## PAY-015 — Validation URL success

- **Yêu cầu:** `PAY.SUCCESS`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** orderId sai GUID/chuỗi; thiếu amount; amount<=0

**Bước thực hiện**

1. Mở /payment/success với từng giá trị.

**Kết quả mong đợi:** Source chỉ nhận OR-<digits> và amount hữu hạn>0, sai thì /checkout; test thêm contract orderId thật vì orders detail yêu cầu GUID.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/payment/success/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/payment/success/page.tsx#L7), [src/features/checkout/components/payment-success-screen.tsx:10](../../../src/features/checkout/components/payment-success-screen.tsx#L10).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-015` trong `execution/results.json`.

## PAY-016 — Email và chi tiết đơn đúng người dùng

- **Yêu cầu:** `PAY.SUCCESS`
- **Ưu tiên / loại / mức:** P0 / Functional / Integration
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** User A email qa.a@example.test; order có GUID

**Bước thực hiện**

1. Hoàn tất sandbox.
2. Đọc thông báo email.
3. Mở View order details.

**Kết quả mong đợi:** Email là người nhận thực tế; detail link dùng ID được orders API chấp nhận; không hardcode Sarah hoặc OR-3000 khi backend dùng GUID.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/payment/success/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/payment/success/page.tsx#L7), [src/features/checkout/components/payment-success-screen.tsx:10](../../../src/features/checkout/components/payment-success-screen.tsx#L10).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Đã bỏ email Sarah demo và link detail dùng ID mock. Việc xác nhận email/đơn đúng user vẫn cần response và receipt backend thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-016` trong `execution/results.json`.

## PAY-017 — Không mất trạng thái khi reload/back

- **Yêu cầu:** `PAY.PERSIST`
- **Ưu tiên / loại / mức:** P0 / Functional / E2E
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Payment đã xác nhận hoặc đang chờ

**Bước thực hiện**

1. Reload payment/success.
2. Back/Forward.
3. Click xác nhận lại.

**Kết quả mong đợi:** Không charge hoặc tạo order trùng; trạng thái lấy backend; cart/orders cập nhật đúng sau thanh toán thành công.

**Nguồn truy vết:** [src/features/checkout/components/payment-screen.tsx:23](../../../src/features/checkout/components/payment-screen.tsx#L23), [src/features/checkout/api/checkout.service.ts:17](../../../src/features/checkout/api/checkout.service.ts#L17).

**Automation:** Đề xuất E2E | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/payment-screen.test.tsx.

**Thực thi:** Blocked. checkout/payment/quote/contact submit trong source vẫn là mock local; thiếu API contract/endpoint và sandbox để chứng minh lưu dữ liệu, xác thực thanh toán, idempotency và email thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PAY-017` trong `execution/results.json`.
