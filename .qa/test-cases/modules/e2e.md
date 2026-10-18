# E2E — Hành trình xuyên module

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `Toàn ứng dụng`. Tổng: 9 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: Sandbox có account A/B và dữ liệu seed; kiểm soát OTP, cart/product/stock và provider payment giả lập chính thức. Không dùng mock thành công làm bằng chứng persistence; runner E2E chưa có trong package scripts.

## E2E-001 — Guest khám phá và đăng nhập

- **Yêu cầu:** `E2E.SMOKE`
- **Ưu tiên / loại / mức:** P0 / Functional / E2E
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CATALOG + DS-AUTH.A

**Bước thực hiện**

1. Home -> category -> PDP.
2. Login.
3. Quay Home/header/profile.

**Kết quả mong đợi:** Navigation đúng locale, nội dung đúng, account đúngA; không mất thao tác hoặc lộ cache user khác.

**Nguồn truy vết:** [src/app:1](../../../src/app#L1), [src/features/auth:1](../../../src/features/auth#L1), [src/features/products:1](../../../src/features/products#L1).

**Automation:** Đề xuất E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `E2E-001` trong `execution/results.json`.

## E2E-002 — Mua sản phẩm từ PDP tới orders

- **Yêu cầu:** `E2E.BUY`
- **Ưu tiên / loại / mức:** P0 / Functional / E2E
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PRODUCT bán được; DS-CHECKOUT; provider sandbox

**Bước thực hiện**

1. Chọn variant và quantity.
2. Buy now -> checkout.
3. Xác nhận payment sandbox.
4. Mở orders/detail.

**Kết quả mong đợi:** Cùng variant/qty/tổng/currency qua mọi bước; một order thuộcA, backend paid đúng; cart phản ánh item đã xử lý theo contract.

**Lưu ý / dependency:** BLOCKER checkout/payment API chưa tích hợp.

**Nguồn truy vết:** [src/app:1](../../../src/app#L1), [src/features/auth:1](../../../src/features/auth#L1), [src/features/products:1](../../../src/features/products#L1).

**Automation:** Đề xuất E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `E2E-002` trong `execution/results.json`.

## E2E-003 — Quote từ sản phẩm giá ẩn

- **Yêu cầu:** `E2E.QUOTE`
- **Ưu tiên / loại / mức:** P0 / Functional / E2E
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PRODUCT.HIDDEN; DS-CONTACT.QUOTE

**Bước thực hiện**

1. Request quote từ PDP.
2. Kiểm tra ngữ cảnh product.
3. Submit.
4. Đối chiếu record quote backend.

**Kết quả mong đợi:** Không lộ giá; quote đúng product/contact; không báo thành công giả; xuất hiện RFQ nếu contract quy định.

**Lưu ý / dependency:** BLOCKER contact API và ngữ cảnh product chưa tích hợp.

**Nguồn truy vết:** [src/app:1](../../../src/app#L1), [src/features/auth:1](../../../src/features/auth#L1), [src/features/products:1](../../../src/features/products#L1).

**Automation:** Đề xuất E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `E2E-003` trong `execution/results.json`.

## E2E-004 — Quote từ cart được chọn một phần

- **Yêu cầu:** `E2E.QUOTE`
- **Ưu tiên / loại / mức:** P0 / Functional / E2E
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CART; chỉI2

**Bước thực hiện**

1. Chọn I2 -> Request quote.
2. Sửa quantity -> submit.
3. Mở RFQs/detail.

**Kết quả mong đợi:** Quote/RFQ chỉ chứaI2 và quantity xác nhận mới; reference thực khớp; không cóitemI1.

**Lưu ý / dependency:** BLOCKER quote write API chưa tích hợp.

**Nguồn truy vết:** [src/app:1](../../../src/app#L1), [src/features/auth:1](../../../src/features/auth#L1), [src/features/products:1](../../../src/features/products#L1).

**Automation:** Đề xuất E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `E2E-004` trong `execution/results.json`.

## E2E-005 — Signup -> login -> cập nhật profile/avatar

- **Yêu cầu:** `E2E.ACCOUNT`
- **Ưu tiên / loại / mức:** P0 / Functional / E2E
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; OTP sandbox; PNG hợp lệ

**Bước thực hiện**

1. Signup3bước.
2. Login.
3. Edit profile/avatar.
4. Reload và logout.

**Kết quả mong đợi:** Tài khoản thật được tạo; dữ liệu lưu backend và giữ sau reload; logout xóa phiên/private cache.

**Nguồn truy vết:** [src/app:1](../../../src/app#L1), [src/features/auth:1](../../../src/features/auth#L1), [src/features/products:1](../../../src/features/products#L1).

**Automation:** Đề xuất E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `E2E-005` trong `execution/results.json`.

## E2E-006 — Reset mật khẩu -> login mật khẩu mới

- **Yêu cầu:** `E2E.RESET`
- **Ưu tiên / loại / mức:** P0 / Functional / E2E
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** User sandbox có thể reset

**Bước thực hiện**

1. Forgot3bước.
2. Login bằng password cũ rồi mới.

**Kết quả mong đợi:** Password cũ bị từ chối theo backend; mới đăng nhập được; OTP/challenge không reuse; không lộ password trong URL/log.

**Nguồn truy vết:** [src/app:1](../../../src/app#L1), [src/features/auth:1](../../../src/features/auth#L1), [src/features/products:1](../../../src/features/products#L1).

**Automation:** Đề xuất E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `E2E-006` trong `execution/results.json`.

## E2E-007 — Phiên hết hạn khi đang mua hàng

- **Yêu cầu:** `E2E.SESSION`
- **Ưu tiên / loại / mức:** P0 / Functional / E2E
- **Cơ sở kỳ vọng:** Security target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** A đang checkout/cart; access expired, refresh revoked

**Bước thực hiện**

1. Trigger read/mutation.
2. Trở lại login.
3. LoginB.

**Kết quả mong đợi:** Không hoàn tất giao dịch giả; dữ liệuA được xóa;B chỉ thấy cart/profile/recordsB; không auto retry giao dịch củaA.

**Nguồn truy vết:** [src/app:1](../../../src/app#L1), [src/features/auth:1](../../../src/features/auth#L1), [src/features/products:1](../../../src/features/products#L1).

**Automation:** Đề xuất E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `E2E-007` trong `execution/results.json`.

## E2E-008 — Hành trình mua và báo giá tiếng Việt

- **Yêu cầu:** `E2E.LOCALE`
- **Ưu tiên / loại / mức:** P1 / Functional / E2E
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Localevi; cart và product hợp lệ

**Bước thực hiện**

1. Lặp BUY/QUOTE trongvi.
2. Đổi locale giữa luồng.

**Kết quả mong đợi:** Giữ route/query/item selection và không gửi data sai; labels/error đúng locale đã thống nhất; không quay en ngoài ý muốn.

**Nguồn truy vết:** [src/app:1](../../../src/app#L1), [src/features/auth:1](../../../src/features/auth#L1), [src/features/products:1](../../../src/features/products#L1).

**Automation:** Đề xuất E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `E2E-008` trong `execution/results.json`.

## E2E-009 — Hoàn thành luồng chỉ bằng keyboard

- **Yêu cầu:** `E2E.KEYBOARD`
- **Ưu tiên / loại / mức:** P1 / Accessibility / Manual E2E
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Guest -> login -> PDP -> cart -> profile

**Bước thực hiện**

1. Dùng Tab/ShiftTab/Enter/Space/Arrow/Escape.
2. Mở menu/picker/dialog, pause carousel.

**Kết quả mong đợi:** Mọi control cần thiết có thể thao tác và focus visible; không focus trap ngoài modal; thông báo lỗi đủ để sửa và hoàn thành.

**Nguồn truy vết:** [src/app:1](../../../src/app#L1), [src/features/auth:1](../../../src/features/auth#L1), [src/features/products:1](../../../src/features/products#L1).

**Automation:** Đề xuất Manual E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `E2E-009` trong `execution/results.json`.
