# CHK — Checkout và địa chỉ

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `/checkout`. Tổng: 22 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: User A, DS-CART và DS-PROFILE; fixture DS-CHECKOUT; create checkout hiện mock local. Test persistence backend cần contract checkout thật.

## CHK-001 — Items query lọc cart

- **Yêu cầu:** `CHK.ITEMS`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** items=I2; thiếu items; ID lạ

**Bước thực hiện**

1. Mở từng URL.
2. So item hiển thị.

**Kết quả mong đợi:** Có items hợp lệ chỉ lấy phần giao với cart; thiếu/empty items dùng toàn cart theo source; chỉ ID lạ cho empty screen, không tự lấy toàn bộ.

**Nguồn truy vết:** [src/features/checkout/components/checkout-screen.tsx:29](../../../src/features/checkout/components/checkout-screen.tsx#L29).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/checkout-screen.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-001` trong `execution/results.json`.

## CHK-002 — Query lặp và dữ liệu khác kiểu

- **Yêu cầu:** `CHK.ITEMS`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** items lặp2 lần; comma rỗng; ID trùng

**Bước thực hiện**

1. Truy cập URL bất thường.
2. Theo dõi server render.

**Kết quả mong đợi:** Không crash do searchParams.items thành array; không duplicate dòng/tổng do ID trùng.

**Nguồn truy vết:** [src/features/checkout/components/checkout-screen.tsx:29](../../../src/features/checkout/components/checkout-screen.tsx#L29).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/checkout-screen.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-002` trong `execution/results.json`.

## CHK-003 — Prefill từ profile

- **Yêu cầu:** `CHK.PROFILE`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE SG/VN; user chưa gõ form

**Bước thực hiện**

1. Trì hoãn GET /me/profile.
2. Resolve response.

**Kết quả mong đợi:** Điền fullName,email,phone,company,delivery,billing từ user; country name/ISO được resolve; không lặp dial code.

**Nguồn truy vết:** [src/features/checkout/components/checkout-screen.tsx:29](../../../src/features/checkout/components/checkout-screen.tsx#L29).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/checkout-screen.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-003` trong `execution/results.json`.

## CHK-004 — Không ghi đè form đã chỉnh

- **Yêu cầu:** `CHK.PROFILE`
- **Ưu tiên / loại / mức:** P1 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Người dùng gõ trước response profile

**Bước thực hiện**

1. Gõ địa chỉ mới.
2. Resolve GET profile.

**Kết quả mong đợi:** isDirty bảo vệ toàn form, không reset nội dung user đang nhập.

**Nguồn truy vết:** [src/features/checkout/components/checkout-screen.tsx:29](../../../src/features/checkout/components/checkout-screen.tsx#L29).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/checkout-screen.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-004` trong `execution/results.json`.

## CHK-005 — Không sử dụng danh tính demo làm mặc định giao dịch

- **Yêu cầu:** `CHK.PROFILE`
- **Ưu tiên / loại / mức:** P0 / Functional / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Guest hoặc profile=500/null

**Bước thực hiện**

1. Mở checkout và chờ profile.
2. Kiểm tra dữ liệu liên hệ trước submit.

**Kết quả mong đợi:** Không thanh toán dưới tên/email/địa chỉ Sarah demo khi chưa có dữ liệu người dùng; yêu cầu người dùng nhập/xác nhận dữ liệu thật.

**Lưu ý / dependency:** Source defaultValues hiện có Sarah Chen và địa chỉ demo.

**Nguồn truy vết:** [src/features/checkout/components/checkout-screen.tsx:29](../../../src/features/checkout/components/checkout-screen.tsx#L29).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/checkout-screen.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-005` trong `execution/results.json`.

## CHK-006 — fullName: 1 ký tự

- **Yêu cầu:** `CHK.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CHECKOUT; fullName="A"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay fullName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại fullName; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/checkout/schemas/checkout.schema.ts:5](../../../src/features/checkout/schemas/checkout.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/schemas/checkout.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-006` trong `execution/results.json`.

## CHK-007 — fullName: 2 ký tự

- **Yêu cầu:** `CHK.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CHECKOUT; fullName="AA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay fullName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận field tại ngưỡng hợp lệ và tiếp tục kiểm tra các field còn lại.

**Nguồn truy vết:** [src/features/checkout/schemas/checkout.schema.ts:5](../../../src/features/checkout/schemas/checkout.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/schemas/checkout.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-007` trong `execution/results.json`.

## CHK-008 — address: 7 ký tự

- **Yêu cầu:** `CHK.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CHECKOUT; address="AAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay address bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại address; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/checkout/schemas/checkout.schema.ts:5](../../../src/features/checkout/schemas/checkout.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/schemas/checkout.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-008` trong `execution/results.json`.

## CHK-009 — address: 8 ký tự

- **Yêu cầu:** `CHK.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CHECKOUT; address="AAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay address bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận field tại ngưỡng hợp lệ và tiếp tục kiểm tra các field còn lại.

**Nguồn truy vết:** [src/features/checkout/schemas/checkout.schema.ts:5](../../../src/features/checkout/schemas/checkout.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/schemas/checkout.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-009` trong `execution/results.json`.

## CHK-010 — postalCode: 5 chữ số

- **Yêu cầu:** `CHK.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CHECKOUT; postalCode="01111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay postalCode bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại postalCode; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/checkout/schemas/checkout.schema.ts:5](../../../src/features/checkout/schemas/checkout.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/schemas/checkout.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-010` trong `execution/results.json`.

## CHK-011 — postalCode: 6 chữ số kể cả 0 đầu

- **Yêu cầu:** `CHK.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CHECKOUT; postalCode="011111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay postalCode bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận field tại ngưỡng hợp lệ và tiếp tục kiểm tra các field còn lại.

**Nguồn truy vết:** [src/features/checkout/schemas/checkout.schema.ts:5](../../../src/features/checkout/schemas/checkout.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/schemas/checkout.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-011` trong `execution/results.json`.

## CHK-012 — postalCode: 7 chữ số

- **Yêu cầu:** `CHK.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CHECKOUT; postalCode="0111111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay postalCode bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại postalCode; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/checkout/schemas/checkout.schema.ts:5](../../../src/features/checkout/schemas/checkout.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/schemas/checkout.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-012` trong `execution/results.json`.

## CHK-013 — companyName: rỗng

- **Yêu cầu:** `CHK.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CHECKOUT; companyName=""

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay companyName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận field tại ngưỡng hợp lệ và tiếp tục kiểm tra các field còn lại.

**Nguồn truy vết:** [src/features/checkout/schemas/checkout.schema.ts:5](../../../src/features/checkout/schemas/checkout.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/schemas/checkout.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-013` trong `execution/results.json`.

## CHK-014 — companyName: 100 ký tự

- **Yêu cầu:** `CHK.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CHECKOUT; companyName="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay companyName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận field tại ngưỡng hợp lệ và tiếp tục kiểm tra các field còn lại.

**Nguồn truy vết:** [src/features/checkout/schemas/checkout.schema.ts:5](../../../src/features/checkout/schemas/checkout.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/schemas/checkout.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-014` trong `execution/results.json`.

## CHK-015 — companyName: 101 ký tự

- **Yêu cầu:** `CHK.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CHECKOUT; companyName="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay companyName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại companyName; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/checkout/schemas/checkout.schema.ts:5](../../../src/features/checkout/schemas/checkout.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/schemas/checkout.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-015` trong `execution/results.json`.

## CHK-016 — Đồng bộ country và mã gọi

- **Yêu cầu:** `CHK.ADDRESS`
- **Ưu tiên / loại / mức:** P1 / Regression / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** SG +65 88009900 -> VN -> MY

**Bước thực hiện**

1. Chọn Vietnam ở country.
2. Chọn Malaysia ở picker mã gọi.

**Kết quả mong đợi:** Hai picker đồng bộ VN/+84 rồi MY/+60; giữ national number88009900; stored phone chỉ có một prefix.

**Nguồn truy vết:** [src/features/checkout/components/address-fields.tsx:12](../../../src/features/checkout/components/address-fields.tsx#L12).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/address-fields.test.tsx.

**Thực thi:** Pass. Thay country hoặc calling code giữ national number và đồng bộ cả hai picker.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-016` trong `execution/results.json`.

## CHK-017 — Số quốc tế không có khoảng cách

- **Yêu cầu:** `CHK.ADDRESS`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** phone=+84901234567; country=SG hoặc country unknown

**Bước thực hiện**

1. Prefill không khớp prefix.
2. Đổi country.

**Kết quả mong đợi:** Không cắt mất chữ số national khi đoán dial code; không ghép hai prefix. Cần kiểm chứng regex getNationalPhone với số dính.

**Nguồn truy vết:** [src/features/checkout/components/address-fields.tsx:12](../../../src/features/checkout/components/address-fields.tsx#L12).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/address-fields.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-017` trong `execution/results.json`.

## CHK-018 — Billing giống delivery

- **Yêu cầu:** `CHK.BILLING`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** same=true; sửa delivery

**Bước thực hiện**

1. Giữ checkbox bật.
2. Sửa delivery và submit.

**Kết quả mong đợi:** Không yêu cầu hidden billing fields; contract giao dịch phải dùng delivery mới làm billing khi same=true.

**Nguồn truy vết:** [src/features/checkout/components/billing-section.tsx:10](../../../src/features/checkout/components/billing-section.tsx#L10), [src/features/checkout/schemas/checkout.schema.ts:5](../../../src/features/checkout/schemas/checkout.schema.ts#L5).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/schemas/checkout.schema.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra billing schema và duplicate submit với paynow; chưa chạy đủ các nhánh UI/navigation/error của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-018` trong `execution/results.json`.

## CHK-019 — Billing khác delivery

- **Yêu cầu:** `CHK.BILLING`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** same=false; billingAddress rỗng/7/8; postal5/6

**Bước thực hiện**

1. Bỏ checkbox.
2. Submit thiếu, rồi sửa đủ.

**Kết quả mong đợi:** Hiện hai field; chỉ cho submit khi address>=8 và postal6 số; lỗi tại billing field, không mất delivery.

**Nguồn truy vết:** [src/features/checkout/components/billing-section.tsx:10](../../../src/features/checkout/components/billing-section.tsx#L10), [src/features/checkout/schemas/checkout.schema.ts:5](../../../src/features/checkout/schemas/checkout.schema.ts#L5).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/schemas/checkout.schema.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra billing schema và duplicate submit với paynow; chưa chạy đủ các nhánh UI/navigation/error của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-019` trong `execution/results.json`.

## CHK-020 — Hai phương thức và navigation

- **Yêu cầu:** `CHK.PAYMENT`
- **Ưu tiên / loại / mức:** P0 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** paynow, bank-transfer; response PAY-ABC12345/4905

**Bước thực hiện**

1. Chọn từng phương thức.
2. Make payment.

**Kết quả mong đợi:** Một create call với checkout/items/UUID; thành công đi /payment?method=...&reference=...&amount=... theo response, giữ locale.

**Nguồn truy vết:** [src/features/checkout/components/checkout-screen.tsx:29](../../../src/features/checkout/components/checkout-screen.tsx#L29), [src/features/checkout/components/payment-method-section.tsx:17](../../../src/features/checkout/components/payment-method-section.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/checkout-screen.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra billing schema và duplicate submit với paynow; chưa chạy đủ các nhánh UI/navigation/error của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-020` trong `execution/results.json`.

## CHK-021 — Chặn duplicate và phục hồi lỗi

- **Yêu cầu:** `CHK.SUBMIT`
- **Ưu tiên / loại / mức:** P1 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** create pending rồi reject

**Bước thực hiện**

1. Double click Make payment.
2. Trả lỗi.
3. Submit lại.

**Kết quả mong đợi:** Một mutation khi pending; disabled; lỗi không điều hướng; mở lại submit sau failure.

**Nguồn truy vết:** [src/features/checkout/components/checkout-screen.tsx:29](../../../src/features/checkout/components/checkout-screen.tsx#L29).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/checkout-screen.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra billing schema và duplicate submit với paynow; chưa chạy đủ các nhánh UI/navigation/error của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-021` trong `execution/results.json`.

## CHK-022 — Create checkout phải được backend xác nhận

- **Yêu cầu:** `CHK.INTEGRATION`
- **Ưu tiên / loại / mức:** P0 / Functional / API + E2E
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Giỏ hợp lệ; cần endpoint/payload được backend cung cấp

**Bước thực hiện**

1. Submit checkout trên sandbox tích hợp.
2. Kiểm tra network và record backend.

**Kết quả mong đợi:** Backend tính lại giá/stock/tax và tạo phiên gắn user/items; chỉ chuyển payment sau success thật; retry cùng ý định không tạo phiên trùng.

**Lưu ý / dependency:** BLOCKER: checkoutService.create hiện chỉ đợi550ms và trả reference/amount local; không có endpoint thật.

**Nguồn truy vết:** [src/features/checkout/api/checkout.service.ts:17](../../../src/features/checkout/api/checkout.service.ts#L17).

**Automation:** Đề xuất API + E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. checkout/payment/quote/contact submit trong source vẫn là mock local; thiếu API contract/endpoint và sandbox để chứng minh lưu dữ liệu, xác thực thanh toán, idempotency và email thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CHK-022` trong `execution/results.json`.
