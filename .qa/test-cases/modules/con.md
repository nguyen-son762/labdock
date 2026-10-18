# CON — Liên hệ và báo giá nhập tay

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `/contact-us; /contact-us?type=quote`. Tổng: 22 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: Guest hoặc A; DS-CONTACT; service hiện mock550ms. Có fixture1..5 products nhập tay; không gửi email/thông điệp ra người thật.

## CON-001 — Route quyết định loại inquiry

- **Yêu cầu:** `CON.TYPE`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** type=quote/general/invalid/thiếu

**Bước thực hiện**

1. Mở từng URL.

**Kết quả mong đợi:** Chỉ type=quote mở báo giá; còn lại general; general có subject, quote có products table và contact information.

**Nguồn truy vết:** [src/features/contact/components/contact-form.tsx:23](../../../src/features/contact/components/contact-form.tsx#L23), [src/app/[locale]/(marketing)/contact-us/page.tsx:12](../../../src/app/%5Blocale%5D/%28marketing%29/contact-us/page.tsx#L12).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/contact/components/contact-form.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-001` trong `execution/results.json`.

## CON-002 — Chuyển loại và giữ dữ liệu hợp lệ

- **Yêu cầu:** `CON.TYPE`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Đã nhập contact, từng có error/success

**Bước thực hiện**

1. Đổi general->quote->general.
2. So dữ liệu và alert.

**Kết quả mong đợi:** Giữ dữ liệu nhập theo form; xóa errors/mutation cũ khi đổi type; validation quote không chặn general vì product row rỗng.

**Nguồn truy vết:** [src/features/contact/components/contact-form.tsx:23](../../../src/features/contact/components/contact-form.tsx#L23), [src/app/[locale]/(marketing)/contact-us/page.tsx:12](../../../src/app/%5Blocale%5D/%28marketing%29/contact-us/page.tsx#L12).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/contact/components/contact-form.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra chuyển loại/row, required fields và một số biên; chưa phủ đầy đủ giữ dữ liệu/5 rows/tất cả optional field.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-002` trong `execution/results.json`.

## CON-003 — Gửi inquiry frontend

- **Yêu cầu:** `CON.GENERAL`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CONTACT.GENERAL

**Bước thực hiện**

1. Nhập các field bắt buộc.
2. Submit và resolve service.

**Kết quả mong đợi:** Một mutation contact + UUID; success MSG-reference hiển thị; reset fields giữ inquiryType; không tuyên bố đã gửi email thật.

**Nguồn truy vết:** [src/features/contact/components/contact-form.tsx:23](../../../src/features/contact/components/contact-form.tsx#L23), [src/features/contact/api/contact.service.ts:10](../../../src/features/contact/api/contact.service.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/contact/components/contact-form.test.tsx.

**Thực thi:** Pass. General inquiry chỉ submit một lần khi pending và công bố reference bằng role=status.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-003` trong `execution/results.json`.

## CON-004 — Subject/message/company có thể rỗng

- **Yêu cầu:** `CON.GENERAL`
- **Ưu tiên / loại / mức:** P2 / Functional / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Các field required hợp lệ; optional=""

**Bước thực hiện**

1. Submit general.

**Kết quả mong đợi:** Schema hiện chấp nhận optional rỗng; không tự gắn required ngoài contract.

**Nguồn truy vết:** [src/features/contact/components/contact-form.tsx:23](../../../src/features/contact/components/contact-form.tsx#L23), [src/features/contact/api/contact.service.ts:10](../../../src/features/contact/api/contact.service.ts#L10).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/contact/components/contact-form.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra chuyển loại/row, required fields và một số biên; chưa phủ đầy đủ giữ dữ liệu/5 rows/tất cả optional field.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-004` trong `execution/results.json`.

## CON-005 — fullName: 1 ký tự

- **Yêu cầu:** `CON.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CONTACT.GENERAL; fullName="A"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay fullName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại fullName; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-005` trong `execution/results.json`.

## CON-006 — fullName: 2 ký tự

- **Yêu cầu:** `CON.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CONTACT.GENERAL; fullName="AA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay fullName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Cho phép ngưỡng hợp lệ sau trim; không truncation âm thầm.

**Nguồn truy vết:** [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-006` trong `execution/results.json`.

## CON-007 — company: 120 ký tự

- **Yêu cầu:** `CON.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CONTACT.GENERAL; company="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay company bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Cho phép ngưỡng hợp lệ sau trim; không truncation âm thầm.

**Nguồn truy vết:** [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-007` trong `execution/results.json`.

## CON-008 — company: 121 ký tự

- **Yêu cầu:** `CON.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CONTACT.GENERAL; company="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay company bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại company; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-008` trong `execution/results.json`.

## CON-009 — subject: 160 ký tự

- **Yêu cầu:** `CON.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CONTACT.GENERAL; subject=repeat("A", 160) — đúng 160 ký tự

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay subject bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Cho phép ngưỡng hợp lệ sau trim; không truncation âm thầm.

**Nguồn truy vết:** [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-009` trong `execution/results.json`.

## CON-010 — subject: 161 ký tự

- **Yêu cầu:** `CON.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CONTACT.GENERAL; subject=repeat("A", 161) — đúng 161 ký tự

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay subject bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại subject; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-010` trong `execution/results.json`.

## CON-011 — message: 2000 ký tự

- **Yêu cầu:** `CON.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CONTACT.GENERAL; message=repeat("A", 2000) — đúng 2000 ký tự

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay message bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Cho phép ngưỡng hợp lệ sau trim; không truncation âm thầm.

**Nguồn truy vết:** [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-011` trong `execution/results.json`.

## CON-012 — message: 2001 ký tự

- **Yêu cầu:** `CON.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CONTACT.GENERAL; message=repeat("A", 2001) — đúng 2001 ký tự

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay message bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại message; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-012` trong `execution/results.json`.

## CON-013 — Email, phone và calling code

- **Yêu cầu:** `CON.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** email sai; phone<7/>19/âm; dialDigits65,60,84

**Bước thực hiện**

1. Đổi từng field.
2. Submit.

**Kết quả mong đợi:** Email đúng format; phone national bắt đầu digit, chỉ digit/space/hyphen theo regex; code trong UI là SG/MY/VN với value digits; báo lỗi readable.

**Nguồn truy vết:** [src/features/contact/components/contact-info-fields.tsx:27](../../../src/features/contact/components/contact-info-fields.tsx#L27), [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Chưa có automation hoặc bằng chứng chạy ca tương ứng.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-013` trong `execution/results.json`.

## CON-014 — Một và năm sản phẩm

- **Yêu cầu:** `CON.QUOTE`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CONTACT.QUOTE; brands Medisafe/BIO-RAD/Sartorius/Heidolph

**Bước thực hiện**

1. Điền1 product.
2. Thêm tới5 và gửi.

**Kết quả mong đợi:** Mỗi row có productName>=2, brand, quantity integer dương; tối đa5; nút Add disabled ở5; budget optional<=80.

**Nguồn truy vết:** [src/features/contact/components/quote-products-table.tsx:19](../../../src/features/contact/components/quote-products-table.tsx#L19), [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra chuyển loại/row, required fields và một số biên; chưa phủ đầy đủ giữ dữ liệu/5 rows/tất cả optional field.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-014` trong `execution/results.json`.

## CON-015 — Xóa hết sản phẩm

- **Yêu cầu:** `CON.QUOTE`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Quote có1 row

**Bước thực hiện**

1. Remove row cuối.
2. Submit.

**Kết quả mong đợi:** Không gửi mutation; có lỗi Add at least one product hiển thị tại phần products.

**Lưu ý / dependency:** Schema error ở products, UI đọc products.root.message; kiểm tra render thực tế.

**Nguồn truy vết:** [src/features/contact/components/quote-products-table.tsx:19](../../../src/features/contact/components/quote-products-table.tsx#L19), [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-015` trong `execution/results.json`.

## CON-016 — Biên dữ liệu từng row

- **Yêu cầu:** `CON.QUOTE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** productName1/2; brand rỗng; quantity0,-1,1.5,1; budget80/81

**Bước thực hiện**

1. Đổi một field của một row.
2. Submit.

**Kết quả mong đợi:** Chỉ row và field sai có lỗi; quantity dạng chuỗi integer>=1; không để lỗi row bị mất sau xóa/thêm.

**Nguồn truy vết:** [src/features/contact/components/quote-products-table.tsx:19](../../../src/features/contact/components/quote-products-table.tsx#L19), [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Chưa có automation hoặc bằng chứng chạy ca tương ứng.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-016` trong `execution/results.json`.

## CON-017 — Add vượt5 qua service boundary

- **Yêu cầu:** `CON.QUOTE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** products array6 items

**Bước thực hiện**

1. Parse payload trực tiếp.

**Kết quả mong đợi:** Reject ở schema dù UI đã chặn Add; không gọi submit.

**Nguồn truy vết:** [src/features/contact/components/quote-products-table.tsx:19](../../../src/features/contact/components/quote-products-table.tsx#L19), [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Unit | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Chưa có automation hoặc bằng chứng chạy ca tương ứng.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-017` trong `execution/results.json`.

## CON-018 — Confirm, clear và remove row

- **Yêu cầu:** `CON.QUOTE`
- **Ưu tiên / loại / mức:** P1 / Regression / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 3 rows đã nhập

**Bước thực hiện**

1. Clear tên row2.
2. Confirm tên rỗng.
3. Remove row1 và submit.

**Kết quả mong đợi:** Clear chỉ xóa tên row đúng; Confirm không bỏ validation thực; các field/errors bám đúng row sau remove.

**Nguồn truy vết:** [src/features/contact/components/quote-products-table.tsx:19](../../../src/features/contact/components/quote-products-table.tsx#L19), [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-018` trong `execution/results.json`.

## CON-019 — Pending/error/retry không mất input

- **Yêu cầu:** `CON.SUBMIT`
- **Ưu tiên / loại / mức:** P1 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Promise pending rồi reject

**Bước thực hiện**

1. Double click/Enter submit.
2. Reject service.
3. Retry.

**Kết quả mong đợi:** Một request khi pending; button disabled; error Alert; giữ input để sửa và gửi lại, không auto retry.

**Nguồn truy vết:** [src/features/contact/components/contact-form.tsx:23](../../../src/features/contact/components/contact-form.tsx#L23).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/contact/components/contact-form.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-019` trong `execution/results.json`.

## CON-020 — Product query từ PDP

- **Yêu cầu:** `CON.PRODUCT`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Decision required (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** ?type=quote&product=known-slug

**Bước thực hiện**

1. Mở link từ PDP giá ẩn.
2. Kiểm tra product được chuyển vào form.

**Kết quả mong đợi:** Ngữ cảnh product phải được prefill hoặc thể hiện cho người dùng để không nhập lại; quyết định PO nếu cố ý bỏ query.

**Lưu ý / dependency:** Contact route hiện chỉ đọc type.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/contact-us/page.tsx:12](../../../src/app/%5Blocale%5D/%28marketing%29/contact-us/page.tsx#L12).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Expected chưa có quyết định PO/backend hoặc nội dung/contract được phê duyệt. Xem dependency gốc trong test case; không suy diễn Pass từ hành vi hiện tại.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-020` trong `execution/results.json`.

## CON-021 — Lưu contact/quote nhập tay thật

- **Yêu cầu:** `CON.INTEGRATION`
- **Ưu tiên / loại / mức:** P0 / Functional / API + E2E
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Backend cấp endpoint/payload/anti-spam

**Bước thực hiện**

1. Gửi cả general và quote ở sandbox.
2. Đối chiếu backend/support inbox được cấp quyền đọc.

**Kết quả mong đợi:** Record/contact đúng, không mất sản phẩm; chỉ báo success sau backend xác nhận. Không gửi thư thật khi chưa có sandbox.

**Lưu ý / dependency:** BLOCKER: contactService hiện chỉ synthesize MSG/RFQ reference, không HTTP.

**Nguồn truy vết:** [src/features/contact/api/contact.service.ts:10](../../../src/features/contact/api/contact.service.ts#L10).

**Automation:** Đề xuất API + E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. checkout/payment/quote/contact submit trong source vẫn là mock local; thiếu API contract/endpoint và sandbox để chứng minh lưu dữ liệu, xác thực thanh toán, idempotency và email thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-021` trong `execution/results.json`.

## CON-022 — Untrusted text và spam

- **Yêu cầu:** `CON.SECURITY`
- **Ưu tiên / loại / mức:** P1 / Security / API + Browser
- **Cơ sở kỳ vọng:** Security target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** message HTML/script; quantity cực lớn; submit lặp

**Bước thực hiện**

1. Render fixture độc hại.
2. Gửi tới backend sandbox với rate limit.

**Kết quả mong đợi:** Không thực thi HTML; backend giới hạn nội dung/quantity/rate phù hợp; lỗi429 không tự spam retry.

**Nguồn truy vết:** [src/features/contact/components/contact-form.tsx:23](../../../src/features/contact/components/contact-form.tsx#L23), [src/features/contact/schemas/contact.schema.ts:3](../../../src/features/contact/schemas/contact.schema.ts#L3).

**Automation:** Đề xuất API + Browser | Test liên quan, chưa xác nhận phủ ca: src/features/contact/components/contact-form.test.tsx.

**Thực thi:** Blocked. Cần endpoint và cơ chế chống spam/rate limit phía backend; local submit hiện mock. Chưa thực hiện tải hay probe trên hệ thống thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CON-022` trong `execution/results.json`.
