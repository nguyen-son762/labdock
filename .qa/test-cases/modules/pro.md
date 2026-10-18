# PRO — Hồ sơ, bảo mật và avatar

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `/profile; /dashboard; /dashboard/profile`. Tổng: 54 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: User A với DS-PROFILE đầy đủ hoặc incomplete; QueryClient mới; file avatar tổng hợp an toàn DS-FILES. API media/profile hỗ trợ mock response độc lập.

## PRO-001 — Map profile về UI

- **Yêu cầu:** `PRO.LOAD`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** phoneNumber/profilePictureUrl/memberSince; address objects

**Bước thực hiện**

1. Mở profile.
2. So dữ liệu response.

**Kết quả mong đợi:** Map phone/avatar/joinedAt chính xác; full delivery/billing giữ đủ; role unknown và lastActive no data vì API chưa có field tương ứng.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/schemas/profile-response.schema.ts:8](../../../src/features/profile/schemas/profile-response.schema.ts#L8).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Pass. Mapping/null normalization, tách form, delivery/billing payload và đổi mật khẩu đã pass qua service/UI boundary.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-001` trong `execution/results.json`.

## PRO-002 — Normalize optional null

- **Yêu cầu:** `PRO.LOAD`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Optional text/address/date/avatar null hoặc thiếu

**Bước thực hiện**

1. Tải incomplete profile.

**Kết quả mong đợi:** Text rỗng, address default, avatar fallback company-logo; không crash; không điền thông tin người dùng demo.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/schemas/profile-response.schema.ts:8](../../../src/features/profile/schemas/profile-response.schema.ts#L8).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Pass. Mapping/null normalization, tách form, delivery/billing payload và đổi mật khẩu đã pass qua service/UI boundary.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-002` trong `execution/results.json`.

## PRO-003 — Loading, retry và unauthorized

- **Yêu cầu:** `PRO.STATE`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** GET pending;500;401 không refresh được

**Bước thực hiện**

1. Mở profile từng tình huống.
2. Click retry/login again.

**Kết quả mong đợi:** Có loading accessible;500 retry chủ động, không tự retry;401 có link login; không render private data sau clear.

**Nguồn truy vết:** [src/features/profile/api/use-current-user-query.ts:6](../../../src/features/profile/api/use-current-user-query.ts#L6), [src/features/profile/components/profile-screen.tsx:17](../../../src/features/profile/components/profile-screen.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/components/profile-screen.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-003` trong `execution/results.json`.

## PRO-004 — Tách profile edit với password edit

- **Yêu cầu:** `PRO.EDIT`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** User A

**Bước thực hiện**

1. Edit profile.
2. Edit security.
3. Cancel từng phần.

**Kết quả mong đợi:** Hai trạng thái độc lập; cancel profile khôi phục view, cancel security reset passwords/error; không hủy form còn lại.

**Nguồn truy vết:** [src/features/profile/components/profile-screen.tsx:17](../../../src/features/profile/components/profile-screen.tsx#L17), [src/features/profile/components/profile-form.tsx:47](../../../src/features/profile/components/profile-form.tsx#L47), [src/features/profile/components/profile-security-card.tsx:20](../../../src/features/profile/components/profile-security-card.tsx#L20).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/components/profile-screen.test.tsx.

**Thực thi:** Pass. Mapping/null normalization, tách form, delivery/billing payload và đổi mật khẩu đã pass qua service/UI boundary.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-004` trong `execution/results.json`.

## PRO-005 — Save disabled khi pristine và sau success

- **Yêu cầu:** `PRO.EDIT`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Profile đầy đủ

**Bước thực hiện**

1. Mở edit.
2. Chỉnh một field rồi save.
3. Resolve normalized profile response.

**Kết quả mong đợi:** Save chỉ bật khi dirty; pending disabled; response mới cập nhật cache/header/sidebar và form reset pristine.

**Nguồn truy vết:** [src/features/profile/components/profile-screen.tsx:17](../../../src/features/profile/components/profile-screen.tsx#L17), [src/features/profile/components/profile-form.tsx:47](../../../src/features/profile/components/profile-form.tsx#L47), [src/features/profile/components/profile-security-card.tsx:20](../../../src/features/profile/components/profile-security-card.tsx#L20).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/components/profile-screen.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã chạy một phần validation/save/error và giữ file khi avatar save lỗi; chưa đầy đủ các nhánh response normalize, từng biên hoặc upload-success/PUT-fail.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-005` trong `execution/results.json`.

## PRO-006 — fullName: 1 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; fullName="A"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay fullName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại fullName; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-006` trong `execution/results.json`.

## PRO-007 — fullName: 2 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; fullName="AA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay fullName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-007` trong `execution/results.json`.

## PRO-008 — fullName: 80 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; fullName="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay fullName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-008` trong `execution/results.json`.

## PRO-009 — fullName: 81 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; fullName="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay fullName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại fullName; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-009` trong `execution/results.json`.

## PRO-010 — phone: 7 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; phone="0111111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay phone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại phone; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-010` trong `execution/results.json`.

## PRO-011 — phone: 8 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; phone="01111111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay phone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-011` trong `execution/results.json`.

## PRO-012 — phone: 20 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; phone="01111111111111111111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay phone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-012` trong `execution/results.json`.

## PRO-013 — phone: 21 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; phone="011111111111111111111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay phone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại phone; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-013` trong `execution/results.json`.

## PRO-014 — companyName: 1 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; companyName="A"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay companyName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại companyName; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-014` trong `execution/results.json`.

## PRO-015 — companyName: 2 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; companyName="AA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay companyName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-015` trong `execution/results.json`.

## PRO-016 — companyName: 120 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; companyName="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay companyName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-016` trong `execution/results.json`.

## PRO-017 — companyName: 121 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; companyName="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay companyName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại companyName; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-017` trong `execution/results.json`.

## PRO-018 — deliveryAddress: 4 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; deliveryAddress="AAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay deliveryAddress bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại deliveryAddress; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-018` trong `execution/results.json`.

## PRO-019 — deliveryAddress: 5 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; deliveryAddress="AAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay deliveryAddress bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-019` trong `execution/results.json`.

## PRO-020 — deliveryAddress: 200 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; deliveryAddress=repeat("A", 200) — đúng 200 ký tự

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay deliveryAddress bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-020` trong `execution/results.json`.

## PRO-021 — deliveryAddress: 201 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; deliveryAddress=repeat("A", 201) — đúng 201 ký tự

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay deliveryAddress bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại deliveryAddress; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-021` trong `execution/results.json`.

## PRO-022 — postalCode: 3 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; postalCode="011"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay postalCode bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại postalCode; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-022` trong `execution/results.json`.

## PRO-023 — postalCode: 4 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; postalCode="0111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay postalCode bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-023` trong `execution/results.json`.

## PRO-024 — postalCode: 12 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; postalCode="011111111111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay postalCode bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-024` trong `execution/results.json`.

## PRO-025 — postalCode: 13 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; postalCode="0111111111111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay postalCode bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại postalCode; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-025` trong `execution/results.json`.

## PRO-026 — companyPhone: rỗng

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; companyPhone=""

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay companyPhone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-026` trong `execution/results.json`.

## PRO-027 — companyPhone: 5 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; companyPhone="01111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay companyPhone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại companyPhone; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-027` trong `execution/results.json`.

## PRO-028 — companyPhone: 6 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; companyPhone="011111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay companyPhone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-028` trong `execution/results.json`.

## PRO-029 — companyPhone: 20 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; companyPhone="01111111111111111111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay companyPhone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-029` trong `execution/results.json`.

## PRO-030 — companyPhone: 21 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; companyPhone="011111111111111111111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay companyPhone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại companyPhone; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-030` trong `execution/results.json`.

## PRO-031 — businessRegistrationNumber: rỗng

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; businessRegistrationNumber=""

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay businessRegistrationNumber bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-031` trong `execution/results.json`.

## PRO-032 — businessRegistrationNumber: 2 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; businessRegistrationNumber="AA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay businessRegistrationNumber bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại businessRegistrationNumber; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-032` trong `execution/results.json`.

## PRO-033 — businessRegistrationNumber: 3 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; businessRegistrationNumber="AAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay businessRegistrationNumber bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-033` trong `execution/results.json`.

## PRO-034 — businessRegistrationNumber: 40 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; businessRegistrationNumber="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay businessRegistrationNumber bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Form chấp nhận ngưỡng hợp lệ; giá trị string được trim; không tự áp rule khác chưa được PO thống nhất.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-034` trong `execution/results.json`.

## PRO-035 — businessRegistrationNumber: 41 ký tự

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PROFILE form; businessRegistrationNumber="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay businessRegistrationNumber bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại businessRegistrationNumber; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-035` trong `execution/results.json`.

## PRO-036 — Email sai và country rỗng

- **Yêu cầu:** `PRO.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** email=bad; country=""

**Bước thực hiện**

1. Đổi từng field.
2. Submit.

**Kết quả mong đợi:** Báo lỗi tương ứng; không PUT profile.

**Nguồn truy vết:** [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã chạy một phần validation/save/error và giữ file khi avatar save lỗi; chưa đầy đủ các nhánh response normalize, từng biên hoặc upload-success/PUT-fail.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-036` trong `execution/results.json`.

## PRO-037 — Map delivery/billing khi cập nhật

- **Yêu cầu:** `PRO.BILLING`
- **Ưu tiên / loại / mức:** P1 / Contract / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** same=true rồi false; billing cũ khác delivery

**Bước thực hiện**

1. Sửa delivery và save với same=true.
2. Lặp same=false.

**Kết quả mong đợi:** PUT map phone->phoneNumber, billingSame->sameAsDelivery; true gửi cùng delivery làm billing; false giữ currentUser.billingAddress (UI hiện chưa có field sửa billing riêng).

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-form.tsx:47](../../../src/features/profile/components/profile-form.tsx#L47), [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts, src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Mapping/null normalization, tách form, delivery/billing payload và đổi mật khẩu đã pass qua service/UI boundary.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-037` trong `execution/results.json`.

## PRO-038 — Response normalize và error giữ dữ liệu

- **Yêu cầu:** `PRO.SAVE`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** PUT=422 hoặc malformed rồi200 có canonical values

**Bước thực hiện**

1. Submit edit.
2. Cho lỗi rồi sửa/retry.

**Kết quả mong đợi:** Lỗi không ghi cache thành dữ liệu giả hoặc xóa input;200 dùng response server; không tự retry mutation.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-form.tsx:47](../../../src/features/profile/components/profile-form.tsx#L47), [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts, src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã chạy một phần validation/save/error và giữ file khi avatar save lỗi; chưa đầy đủ các nhánh response normalize, từng biên hoặc upload-success/PUT-fail.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-038` trong `execution/results.json`.

## PRO-039 — Đổi mật khẩu hợp lệ

- **Yêu cầu:** `PRO.PASSWORD`
- **Ưu tiên / loại / mức:** P0 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** current=OldPass1!; new/confirm=NewPass1!

**Bước thực hiện**

1. Mở Security edit.
2. Submit hợp lệ.

**Kết quả mong đợi:** POST /auth/change-password có Bearer; thành công xóa cả3 password; thông báo; invalidate profile để tải lại passwordChangedAt.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-security-card.tsx:20](../../../src/features/profile/components/profile-security-card.tsx#L20), [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts, src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Mapping/null normalization, tách form, delivery/billing payload và đổi mật khẩu đã pass qua service/UI boundary.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-039` trong `execution/results.json`.

## PRO-040 — Biên password và mismatch

- **Yêu cầu:** `PRO.PASSWORD`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Mỗi field7 rồi8 ký tự; new khác confirm

**Bước thực hiện**

1. Thay lần lượt dữ liệu.
2. Submit.

**Kết quả mong đợi:** Mỗi field min8; confirm phải khớp; không request khi invalid; không tự áp max128 của login vào schema này.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-security-card.tsx:20](../../../src/features/profile/components/profile-security-card.tsx#L20), [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts, src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã chạy một phần validation/save/error và giữ file khi avatar save lỗi; chưa đầy đủ các nhánh response normalize, từng biên hoặc upload-success/PUT-fail.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-040` trong `execution/results.json`.

## PRO-041 — Sai mật khẩu hiện tại và chính sách phiên

- **Yêu cầu:** `PRO.PASSWORD`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** POST=400/401/422; new=current

**Bước thực hiện**

1. Gửi current sai.
2. Thử password trùng cũ.
3. Kiểm tra các phiên khác sau success sandbox.

**Kết quả mong đợi:** Lỗi hiển thị, không báo success; chính sách cấm reuse/revoke phiên cần backend/PO xác nhận, không mặc định đã có.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-security-card.tsx:20](../../../src/features/profile/components/profile-security-card.tsx#L20), [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts, src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-041` trong `execution/results.json`.

## PRO-042 — Last changed khớp backend

- **Yêu cầu:** `PRO.PASSWORD`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** passwordChangedAt hôm nay hoặc null

**Bước thực hiện**

1. Load profile.
2. Đổi password rồi reload.

**Kết quả mong đợi:** Hiển thị thời gian phản ánh backend/null; không cố định 3 months ago cho mọi tài khoản.

**Lưu ý / dependency:** Source ProfileSecurityCard đang hardcode time.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-security-card.tsx:20](../../../src/features/profile/components/profile-security-card.tsx#L20), [src/features/profile/schemas/profile-form.schema.ts:15](../../../src/features/profile/schemas/profile-form.schema.ts#L15).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts, src/features/profile/schemas/profile-form.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-042` trong `execution/results.json`.

## PRO-043 — JPEG và PNG hợp lệ

- **Yêu cầu:** `PRO.AVATAR`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-FILES jpg/png, size<=1048576

**Bước thực hiện**

1. Mở dialog, chọn file.
2. Save và resolve upload rồi PUT.

**Kết quả mong đợi:** POST /me/profile/media multipart field file; sau đó PUT /me/profile với profilePictureMediaId; cache/avatar theo response mới.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-avatar-dialog.tsx:28](../../../src/features/profile/components/profile-avatar-dialog.tsx#L28).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-043` trong `execution/results.json`.

## PRO-044 — Upload boundary: JPEG 1048576 bytes

- **Yêu cầu:** `PRO.AVATAR`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** JPEG 1048576 bytes

**Bước thực hiện**

1. Chọn/kéo thả file.
2. Thử Save.

**Kết quả mong đợi:** File được chọn, Save bật và upload được.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-avatar-dialog.tsx:28](../../../src/features/profile/components/profile-avatar-dialog.tsx#L28).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-044` trong `execution/results.json`.

## PRO-045 — Upload boundary: PNG 1048577 bytes

- **Yêu cầu:** `PRO.AVATAR`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** PNG 1048577 bytes

**Bước thực hiện**

1. Chọn/kéo thả file.
2. Thử Save.

**Kết quả mong đợi:** Báo lỗi loại/kích thước, không upload file không hợp lệ.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-avatar-dialog.tsx:28](../../../src/features/profile/components/profile-avatar-dialog.tsx#L28).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-045` trong `execution/results.json`.

## PRO-046 — Upload boundary: GIF 1024 bytes

- **Yêu cầu:** `PRO.AVATAR`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** GIF 1024 bytes

**Bước thực hiện**

1. Chọn/kéo thả file.
2. Thử Save.

**Kết quả mong đợi:** Báo lỗi loại/kích thước, không upload file không hợp lệ.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-avatar-dialog.tsx:28](../../../src/features/profile/components/profile-avatar-dialog.tsx#L28).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-046` trong `execution/results.json`.

## PRO-047 — Upload boundary: SVG 1024 bytes

- **Yêu cầu:** `PRO.AVATAR`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** SVG 1024 bytes

**Bước thực hiện**

1. Chọn/kéo thả file.
2. Thử Save.

**Kết quả mong đợi:** Báo lỗi loại/kích thước, không upload file không hợp lệ.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-avatar-dialog.tsx:28](../../../src/features/profile/components/profile-avatar-dialog.tsx#L28).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-047` trong `execution/results.json`.

## PRO-048 — Upload boundary: file không MIME

- **Yêu cầu:** `PRO.AVATAR`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** file không MIME

**Bước thực hiện**

1. Chọn/kéo thả file.
2. Thử Save.

**Kết quả mong đợi:** Báo lỗi loại/kích thước, không upload file không hợp lệ.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-avatar-dialog.tsx:28](../../../src/features/profile/components/profile-avatar-dialog.tsx#L28).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-048` trong `execution/results.json`.

## PRO-049 — File hợp lệ rồi chọn file sai

- **Yêu cầu:** `PRO.AVATAR`
- **Ưu tiên / loại / mức:** P1 / Regression / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Chọn a.png rồi b.gif

**Bước thực hiện**

1. Chọn file hợp lệ.
2. Thay bằng file sai.
3. Click Save.

**Kết quả mong đợi:** Lỗi không dẫn tới upload nhầm file cũ dưới ý định file mới; trạng thái chọn/Save rõ ràng.

**Lưu ý / dependency:** selectFile trả sớm khi invalid nhưng không clear file cũ.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-avatar-dialog.tsx:28](../../../src/features/profile/components/profile-avatar-dialog.tsx#L28).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-049` trong `execution/results.json`.

## PRO-050 — Upload thành công nhưng profile save lỗi

- **Yêu cầu:** `PRO.AVATAR`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** media=200 id mới; PUT=500

**Bước thực hiện**

1. Save avatar.
2. Reject PUT, rồi retry.

**Kết quả mong đợi:** Giữ dialog với lỗi, avatar cũ vẫn là dữ liệu xác nhận; không báo lưu thành công chỉ vì upload xong; retry có kiểm soát.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-avatar-dialog.tsx:28](../../../src/features/profile/components/profile-avatar-dialog.tsx#L28).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã chạy một phần validation/save/error và giữ file khi avatar save lỗi; chưa đầy đủ các nhánh response normalize, từng biên hoặc upload-success/PUT-fail.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-050` trong `execution/results.json`.

## PRO-051 — Remove, cancel, reopen và chọn cùng file

- **Yêu cầu:** `PRO.AVATAR`
- **Ưu tiên / loại / mức:** P1 / Regression / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Một file hợp lệ đã chọn

**Bước thực hiện**

1. Remove và chọn lại cùng file.
2. Cancel rồi reopen.
3. Save success và reopen.

**Kết quả mong đợi:** File input/validation/mutation được reset phù hợp; không giữ file hoặc progress cũ sau đóng/reopen.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-avatar-dialog.tsx:28](../../../src/features/profile/components/profile-avatar-dialog.tsx#L28).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-051` trong `execution/results.json`.

## PRO-052 — Pending, đóng dialog và phản hồi muộn

- **Yêu cầu:** `PRO.AVATAR`
- **Ưu tiên / loại / mức:** P1 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Upload pending; user Cancel hoặc Escape

**Bước thực hiện**

1. Bắt đầu save.
2. Đóng dialog/chuyển account.
3. Resolve response cũ.

**Kết quả mong đợi:** Không ghi avatar vào user mới; pending không báo100% hoàn tất trước response; đóng không để state lạ khi reopen.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-avatar-dialog.tsx:28](../../../src/features/profile/components/profile-avatar-dialog.tsx#L28).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-052` trong `execution/results.json`.

## PRO-053 — File giả MIME và nội dung hỏng

- **Yêu cầu:** `PRO.AVATAR`
- **Ưu tiên / loại / mức:** P1 / Security / API
- **Cơ sở kỳ vọng:** Security target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** file text đặt type=image/png; JPEG0 bytes

**Bước thực hiện**

1. Gửi tới media API sandbox.

**Kết quả mong đợi:** Backend validate nội dung/kích thước, từ chối file giả/hỏng; frontend MIME/size không phải ranh giới bảo vệ.

**Nguồn truy vết:** [src/features/profile/api/profile.service.ts:41](../../../src/features/profile/api/profile.service.ts#L41), [src/features/profile/components/profile-avatar-dialog.tsx:28](../../../src/features/profile/components/profile-avatar-dialog.tsx#L28).

**Automation:** Đề xuất API | Test liên quan, chưa xác nhận phủ ca: src/features/profile/api/profile.service.test.ts.

**Thực thi:** Blocked. Cần backend/sandbox và ít nhất hai user hoặc HTTPS để kiểm tra authorization, session policy/HttpOnly và validation nội dung file. Frontend mock không chứng minh được các thuộc tính này.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-053` trong `execution/results.json`.

## PRO-054 — Overview, error boundary và redirect alias

- **Yêu cầu:** `PRO.DASHBOARD`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** User A; GET profile success/error; /dashboard/profile

**Bước thực hiện**

1. Mở Dashboard.
2. Thử lỗi và Reload.
3. Mở alias profile.

**Kết quả mong đợi:** Greeting/date theo user/locale; unknown/noData không suy role; boundary có reload; /dashboard/profile redirect /profile giữ locale.

**Nguồn truy vết:** [src/features/profile/components/dashboard-overview.tsx:12](../../../src/features/profile/components/dashboard-overview.tsx#L12).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Chưa có automation hoặc bằng chứng chạy ca tương ứng.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PRO-054` trong `execution/results.json`.
