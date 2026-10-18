# AUTH — Xác thực và OTP

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `/login; /signup; /forgot-password`. Tổng: 58 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: Phiên sạch (guest); locale en, lặp luồng chính ở vi; fixture DS-AUTH; mock service/API trong test frontend; email và OTP sandbox khi chạy E2E.

## AUTH-001 — Đăng nhập hợp lệ

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P0 / Functional / E2E
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.A

**Bước thực hiện**

1. Mở /login.
2. Nhập email và mật khẩu hợp lệ.
3. Chọn Log in.

**Kết quả mong đợi:** POST /auth/login gửi đúng email/password; lưu phiên từ response hợp lệ; điều hướng Home và header hiển thị người dùng.

**Nguồn truy vết:** [src/features/auth/components/login-form.tsx:19](../../../src/features/auth/components/login-form.tsx#L19), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất E2E | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/login-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-001` trong `execution/results.json`.

## AUTH-002 — Trim email, giữ nguyên mật khẩu

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P1 / Functional / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** email=" qa.a@example.test "; password=" Passw0rd! "

**Bước thực hiện**

1. Nhập dữ liệu.
2. Submit và đọc request.

**Kết quả mong đợi:** Email gửi là qa.a@example.test; mật khẩu giữ nguyên khoảng trắng, không tự trim.

**Nguồn truy vết:** [src/features/auth/components/login-form.tsx:19](../../../src/features/auth/components/login-form.tsx#L19), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/login-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-002` trong `execution/results.json`.

## AUTH-003 — email: rỗng

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** password=Passw0rd!; email=""

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay email bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại email; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/login.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-003` trong `execution/results.json`.

## AUTH-004 — email: chỉ khoảng trắng

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** password=Passw0rd!; email=" "

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay email bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại email; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/login.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-004` trong `execution/results.json`.

## AUTH-005 — email: qa.example.test

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** password=Passw0rd!; email="qa.example.test"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay email bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại email; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/login.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-005` trong `execution/results.json`.

## AUTH-006 — email: qa+tag@example.test

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** password=Passw0rd!; email="qa+tag@example.test"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay email bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Email hợp lệ được chuyển tới service.

**Nguồn truy vết:** [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/login.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-006` trong `execution/results.json`.

## AUTH-007 — password: 7 ký tự

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** email=qa.a@example.test; password="AAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay password bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại password; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/login.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-007` trong `execution/results.json`.

## AUTH-008 — password: 8 ký tự

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** email=qa.a@example.test; password="AAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay password bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Client cho phép submit theo schema 8–128 ký tự.

**Nguồn truy vết:** [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/login.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-008` trong `execution/results.json`.

## AUTH-009 — password: 128 ký tự

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** email=qa.a@example.test; password="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay password bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Client cho phép submit theo schema 8–128 ký tự.

**Nguồn truy vết:** [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/login.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-009` trong `execution/results.json`.

## AUTH-010 — password: 129 ký tự

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** email=qa.a@example.test; password=repeat("A", 129) — đúng 129 ký tự

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay password bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại password; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/login.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-010` trong `execution/results.json`.

## AUTH-011 — Sai thông tin đăng nhập

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P0 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** API 401 detail="Invalid email or password."

**Bước thực hiện**

1. Submit tài khoản sai.
2. Quan sát Alert và network.

**Kết quả mong đợi:** Giữ ở /login, hiển thị lỗi; không gọi refresh cho /auth/login; không tạo phiên mới.

**Nguồn truy vết:** [src/features/auth/components/login-form.tsx:19](../../../src/features/auth/components/login-form.tsx#L19), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/login-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-011` trong `execution/results.json`.

## AUTH-012 — Chống submit lặp

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P1 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Promise login chưa resolve

**Bước thực hiện**

1. Click submit hai lần và nhấn Enter khi pending.
2. Resolve request.

**Kết quả mong đợi:** Một request login; nút disabled và có trạng thái đang đăng nhập; một lần điều hướng.

**Nguồn truy vết:** [src/features/auth/components/login-form.tsx:19](../../../src/features/auth/components/login-form.tsx#L19), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/login-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-012` trong `execution/results.json`.

## AUTH-013 — Profile prefetch lỗi sau login thành công

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** login=200; GET /me/profile=500

**Bước thực hiện**

1. Đăng nhập.
2. Để prefetch profile lỗi.

**Kết quả mong đợi:** Login vẫn thành công, chuyển Home; không báo sai mật khẩu chỉ vì profile lỗi. Header không hiện danh tính giả.

**Nguồn truy vết:** [src/features/auth/components/login-form.tsx:19](../../../src/features/auth/components/login-form.tsx#L19), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/login-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Pass. Login vẫn điều hướng thành công khi profile prefetch lỗi; profile chỉ được gọi một lần.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-013` trong `execution/results.json`.

## AUTH-014 — Response token sai contract

- **Yêu cầu:** `AUTH.LOGIN`
- **Ưu tiên / loại / mức:** P1 / Contract / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** token rỗng hoặc expiresAt="invalid"

**Bước thực hiện**

1. Mock response login malformed.
2. Submit.

**Kết quả mong đợi:** Không tạo session; giữ form và thông báo thất bại; token sai không xuất hiện trong cookie.

**Nguồn truy vết:** [src/features/auth/components/login-form.tsx:19](../../../src/features/auth/components/login-form.tsx#L19), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/login.schema.ts:3](../../../src/features/auth/schemas/login.schema.ts#L3).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/login-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-014` trong `execution/results.json`.

## AUTH-015 — Đăng ký đủ ba bước

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P0 / Functional / E2E
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; challenge GUID; verified=true; completion userId/email

**Bước thực hiện**

1. Nhập account.
2. Gửi và nhập OTP.
3. Đặt mật khẩu khớp và hoàn tất.

**Kết quả mong đợi:** Gọi tuần tự start, verify-otp, complete; cùng challengeId; hiển thị email hoàn tất và link login. Không tự cấp quyền đăng nhập khi API chỉ trả userId/email.

**Nguồn truy vết:** [src/features/auth/components/signup-form.tsx:26](../../../src/features/auth/components/signup-form.tsx#L26), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất E2E | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/signup-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-015` trong `execution/results.json`.

## AUTH-016 — company: chỉ khoảng trắng

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; company=" "

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay company bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại company; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-016` trong `execution/results.json`.

## AUTH-017 — company: giá trị hợp lệ có khoảng trắng hai đầu

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; company=" QA Lab "

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay company bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** company được trim trong payload.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-017` trong `execution/results.json`.

## AUTH-018 — fullName: chỉ khoảng trắng

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; fullName=" "

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay fullName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại fullName; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-018` trong `execution/results.json`.

## AUTH-019 — fullName: giá trị hợp lệ có khoảng trắng hai đầu

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; fullName=" QA Lab "

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay fullName bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** fullName được trim trong payload.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-019` trong `execution/results.json`.

## AUTH-020 — region: chỉ khoảng trắng

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; region=" "

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay region bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại region; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-020` trong `execution/results.json`.

## AUTH-021 — region: giá trị hợp lệ có khoảng trắng hai đầu

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; region=" QA Lab "

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay region bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** region được trim trong payload.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-021` trong `execution/results.json`.

## AUTH-022 — address: chỉ khoảng trắng

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; address=" "

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay address bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại address; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-022` trong `execution/results.json`.

## AUTH-023 — address: giá trị hợp lệ có khoảng trắng hai đầu

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; address=" QA Lab "

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay address bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** address được trim trong payload.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-023` trong `execution/results.json`.

## AUTH-024 — company: 160 ký tự

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; company=repeat("A", 160) — đúng 160 ký tự

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay company bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Giá trị company được chấp nhận ở giới hạn 160.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-024` trong `execution/results.json`.

## AUTH-025 — company: 161 ký tự

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; company=repeat("A", 161) — đúng 161 ký tự

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay company bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại company; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-025` trong `execution/results.json`.

## AUTH-026 — phone: 5 chữ số

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; phone="01111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay phone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại phone; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-026` trong `execution/results.json`.

## AUTH-027 — phone: 6 chữ số

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; phone="011111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay phone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Số chỉ chứa chữ số 6–15 được gửi theo chuẩn quốc tế.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-027` trong `execution/results.json`.

## AUTH-028 — phone: 15 chữ số

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; phone="011111111111111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay phone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Số chỉ chứa chữ số 6–15 được gửi theo chuẩn quốc tế.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-028` trong `execution/results.json`.

## AUTH-029 — phone: 16 chữ số

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; phone="0111111111111111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay phone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại phone; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-029` trong `execution/results.json`.

## AUTH-030 — phone: 090 123-456

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.NEW; phone="090 123-456"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay phone bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại phone; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-030` trong `execution/results.json`.

## AUTH-031 — Chuẩn hóa số điện thoại quốc tế

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Contract / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** phoneCode=+84; phone=0901234567; country=VN

**Bước thực hiện**

1. Chọn mã gọi và quốc gia.
2. Submit bước 1.

**Kết quả mong đợi:** Payload organization từ company; phone=+84901234567; country=VN, giữ region/address; không gửi phoneCode riêng.

**Nguồn truy vết:** [src/features/auth/components/signup-form.tsx:26](../../../src/features/auth/components/signup-form.tsx#L26), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/signup-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Pass. Service chuẩn hóa phoneCode +84 với national phone có số 0 đầu; request dùng contract signup start.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-031` trong `execution/results.json`.

## AUTH-032 — Country phải là mã ISO hai chữ hoa

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** country=vn, Vietnam, VNM, VN

**Bước thực hiện**

1. Parse lần lượt từng giá trị với dữ liệu khác hợp lệ.

**Kết quả mong đợi:** Chỉ VN đạt schema hình dạng; kiểm tra danh sách quốc gia thực tế ở shared CountrySelect. Không suy diễn schema đã kiểm tra quốc gia tồn tại.

**Nguồn truy vết:** [src/features/auth/components/signup-form.tsx:26](../../../src/features/auth/components/signup-form.tsx#L26), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/signup-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-032` trong `execution/results.json`.

## AUTH-033 — Email đã tồn tại

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** start=409 hoặc 422 có message

**Bước thực hiện**

1. Submit account đã dùng email.
2. Sửa email và retry.

**Kết quả mong đợi:** Hiển thị lỗi; không tiến tới OTP; giữ dữ liệu để sửa; retry chủ động thành công.

**Nguồn truy vết:** [src/features/auth/components/signup-form.tsx:26](../../../src/features/auth/components/signup-form.tsx#L26), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/signup-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-033` trong `execution/results.json`.

## AUTH-034 — Quay lại account rồi gửi lại

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Bước OTP đang hoạt động

**Bước thực hiện**

1. Chọn Back.
2. Đổi email.
3. Submit account.

**Kết quả mong đợi:** Giữ thông tin account để chỉnh; challenge mới thay challenge cũ; xóa OTP và password/mutation cũ.

**Nguồn truy vết:** [src/features/auth/components/signup-form.tsx:26](../../../src/features/auth/components/signup-form.tsx#L26), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/signup-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-034` trong `execution/results.json`.

## AUTH-035 — Nhập và tự chuyển focus

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P1 / Accessibility / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** code=123456

**Bước thực hiện**

1. Nhập từng chữ số.
2. Quan sát focus và Verify.

**Kết quả mong đợi:** Từng ô chứa một chữ số; focus đi tới ô kế tiếp; Verify chỉ bật khi đủ 6 chữ số hợp lệ.

**Nguồn truy vết:** [src/features/auth/components/signup-verification-form.tsx:36](../../../src/features/auth/components/signup-verification-form.tsx#L36), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-035` trong `execution/results.json`.

## AUTH-036 — Dán mã vào ô đầu hoặc giữa

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** clipboard="12a34567"; vị trí=0 và 3

**Bước thực hiện**

1. Dán vào ô đầu.
2. Reset, dán vào ô thứ tư.

**Kết quả mong đợi:** Loại ký tự không phải số, tối đa 6 chữ số và giới hạn phần còn lại từ vị trí dán; không tràn ô.

**Nguồn truy vết:** [src/features/auth/components/signup-verification-form.tsx:36](../../../src/features/auth/components/signup-verification-form.tsx#L36), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-036` trong `execution/results.json`.

## AUTH-037 — Sửa/xóa chữ số giữa mã

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P1 / Regression / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** code=123456; sửa ô3, xóa ô3; Backspace ô rỗng

**Bước thực hiện**

1. Thay/xóa chữ số ở giữa.
2. Dùng ArrowLeft/Right và Backspace.
3. Kiểm tra mã gửi verify.

**Kết quả mong đợi:** Mã gửi đúng thứ tự người dùng nhìn thấy; không dịch chữ số ngoài ý muốn; focus di chuyển hợp lý.

**Lưu ý / dependency:** Cần kiểm tra việc compact khoảng trắng trong changeOtpDigit.

**Nguồn truy vết:** [src/features/auth/components/signup-verification-form.tsx:36](../../../src/features/auth/components/signup-verification-form.tsx#L36), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-037` trong `execution/results.json`.

## AUTH-038 — code: 5 chữ số

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** challengeId hợp lệ; code="01111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay code bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại code; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-038` trong `execution/results.json`.

## AUTH-039 — code: 6 chữ số

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** challengeId hợp lệ; code="011111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay code bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Service nhận chuỗi đúng 6 chữ số; OTP có số 0 đầu không bị mất.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-039` trong `execution/results.json`.

## AUTH-040 — code: 7 chữ số

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** challengeId hợp lệ; code="0111111"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay code bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại code; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-040` trong `execution/results.json`.

## AUTH-041 — code: 12a456

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** challengeId hợp lệ; code="12a456"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay code bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại code; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-041` trong `execution/results.json`.

## AUTH-042 — Backend chưa xác minh

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P0 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** verify response={verified:false}

**Bước thực hiện**

1. Nhập đủ mã.
2. Submit.

**Kết quả mong đợi:** Không chuyển bước đặt password; hiển thị lỗi; cho phép sửa OTP.

**Nguồn truy vết:** [src/features/auth/components/signup-verification-form.tsx:36](../../../src/features/auth/components/signup-verification-form.tsx#L36), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Pass. Service từ chối verified=false, mutation không resolve thành công để chuyển bước.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-042` trong `execution/results.json`.

## AUTH-043 — Đếm ngược và hết hạn

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Clock cố định; expiresAt=now+61s

**Bước thực hiện**

1. Mở OTP.
2. Tiến clock 61s.
3. Thử verify và resend.

**Kết quả mong đợi:** Bắt đầu 01:01, dừng 00:00; hết hạn khóa Verify và hiển thị Resend; không có số âm.

**Nguồn truy vết:** [src/features/auth/components/signup-verification-form.tsx:36](../../../src/features/auth/components/signup-verification-form.tsx#L36), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-043` trong `execution/results.json`.

## AUTH-044 — Resend tạo challenge mới

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Clock hết hạn; start trả challengeId khác

**Bước thực hiện**

1. Chọn resend.
2. Chờ response.
3. Nhập OTP mới và verify.

**Kết quả mong đợi:** Không resend lặp khi pending; reset mã và lỗi cũ; countdown theo expiresAt mới; verify dùng challenge mới.

**Nguồn truy vết:** [src/features/auth/components/signup-verification-form.tsx:36](../../../src/features/auth/components/signup-verification-form.tsx#L36), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-044` trong `execution/results.json`.

## AUTH-045 — Resend lỗi

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** start sau resend=429 hoặc 500

**Bước thực hiện**

1. Hết hạn rồi resend.
2. Mock lỗi.

**Kết quả mong đợi:** Alert hiển thị; không chuyển challenge giả; nút hoạt động lại để retry; không tự retry gửi OTP.

**Nguồn truy vết:** [src/features/auth/components/signup-verification-form.tsx:36](../../../src/features/auth/components/signup-verification-form.tsx#L36), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-045` trong `execution/results.json`.

## AUTH-046 — Backend báo incorrect/expired

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** detail chứa incorrect hoặc expired; lặp ngôn ngữ khác

**Bước thực hiện**

1. Verify mã sai/hết hạn.
2. Sửa mã hoặc resend.

**Kết quả mong đợi:** Không tiến bước; nhận biết lỗi và có đường phục hồi. Nếu lỗi localized không match keyword, vẫn hiển thị lỗi tổng quát.

**Nguồn truy vết:** [src/features/auth/components/signup-verification-form.tsx:36](../../../src/features/auth/components/signup-verification-form.tsx#L36), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-046` trong `execution/results.json`.

## AUTH-047 — Tab ẩn lâu hoặc máy sleep

- **Yêu cầu:** `AUTH.OTP`
- **Ưu tiên / loại / mức:** P1 / Reliability / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** expiresAt=now+60s; tab nền >60s

**Bước thực hiện**

1. Mở OTP.
2. Đưa tab vào nền rồi trở lại sau hạn.

**Kết quả mong đợi:** Thời hạn phản ánh thời gian thực của backend; không verify challenge đã hết hạn chỉ vì timer nền bị trì hoãn.

**Lưu ý / dependency:** Source giảm state mỗi giây; cần test clock thực ngoài browser.

**Nguồn truy vết:** [src/features/auth/components/signup-verification-form.tsx:36](../../../src/features/auth/components/signup-verification-form.tsx#L36), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts, src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-047` trong `execution/results.json`.

## AUTH-048 — password mới: 7 ký tự

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Các bước OTP đã xác minh; confirm khớp; password mới="AAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay password mới bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại password mới; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-048` trong `execution/results.json`.

## AUTH-049 — password mới: 8 ký tự

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Các bước OTP đã xác minh; confirm khớp; password mới="AAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay password mới bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Cho phép gửi mật khẩu từ 8 ký tự; không tự áp quy tắc hoa/số/ký tự đặc biệt chưa có trong schema.

**Nguồn truy vết:** [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/signup.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-049` trong `execution/results.json`.

## AUTH-050 — Xác nhận mật khẩu không khớp

- **Yêu cầu:** `AUTH.SIGNUP`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** new=Passw0rd!; confirm=Different!

**Bước thực hiện**

1. Nhập hai giá trị khác nhau.
2. Submit.

**Kết quả mong đợi:** Lỗi gắn confirmPassword; không gọi complete/reset.

**Nguồn truy vết:** [src/features/auth/components/signup-form.tsx:26](../../../src/features/auth/components/signup-form.tsx#L26), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/signup.schema.ts:5](../../../src/features/auth/schemas/signup.schema.ts#L5).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/signup-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-050` trong `execution/results.json`.

## AUTH-051 — password mới: 7 ký tự

- **Yêu cầu:** `AUTH.RESET`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Các bước OTP đã xác minh; confirm khớp; password mới="AAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay password mới bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Báo lỗi tại password mới; không gửi mutation khi giá trị chưa hợp lệ.

**Nguồn truy vết:** [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-051` trong `execution/results.json`.

## AUTH-052 — password mới: 8 ký tự

- **Yêu cầu:** `AUTH.RESET`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Các bước OTP đã xác minh; confirm khớp; password mới="AAAAAAAA"

**Bước thực hiện**

1. Khôi phục bộ dữ liệu hợp lệ.
2. Chỉ thay password mới bằng giá trị nêu trong dữ liệu.
3. Submit và quan sát lỗi cùng lời gọi service.

**Kết quả mong đợi:** Cho phép gửi mật khẩu từ 8 ký tự; không tự áp quy tắc hoa/số/ký tự đặc biệt chưa có trong schema.

**Nguồn truy vết:** [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/schemas/forgot-password.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-052` trong `execution/results.json`.

## AUTH-053 — Xác nhận mật khẩu không khớp

- **Yêu cầu:** `AUTH.RESET`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** new=Passw0rd!; confirm=Different!

**Bước thực hiện**

1. Nhập hai giá trị khác nhau.
2. Submit.

**Kết quả mong đợi:** Lỗi gắn confirmPassword; không gọi complete/reset.

**Nguồn truy vết:** [src/features/auth/components/forgot-password-form.tsx:38](../../../src/features/auth/components/forgot-password-form.tsx#L38), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/forgot-password-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-053` trong `execution/results.json`.

## AUTH-054 — Quên mật khẩu đủ ba bước

- **Yêu cầu:** `AUTH.RESET`
- **Ưu tiên / loại / mức:** P0 / Functional / E2E
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-AUTH.A; challenge GUID; verified=true

**Bước thực hiện**

1. Nhập email.
2. Verify OTP.
3. Reset password và về login.

**Kết quả mong đợi:** start -> verify-otp -> reset với newPassword/confirmPassword; thông báo thành công; xóa password form và mutation. Các endpoint public không gắn Bearer hoặc refresh.

**Nguồn truy vết:** [src/features/auth/components/forgot-password-form.tsx:38](../../../src/features/auth/components/forgot-password-form.tsx#L38), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất E2E | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/forgot-password-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-054` trong `execution/results.json`.

## AUTH-055 — Email chưa tồn tại và rate limit

- **Yêu cầu:** `AUTH.RESET`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** start=404/429

**Bước thực hiện**

1. Gửi email sandbox chưa có.
2. Quan sát lỗi và gửi lại khi được phép.

**Kết quả mong đợi:** Không chuyển sang OTP giả; không spam retry; thông báo theo error contract. Chính sách tránh lộ email cần backend xác nhận.

**Nguồn truy vết:** [src/features/auth/components/forgot-password-form.tsx:38](../../../src/features/auth/components/forgot-password-form.tsx#L38), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/forgot-password-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-055` trong `execution/results.json`.

## AUTH-056 — Quay về nhập email

- **Yêu cầu:** `AUTH.RESET`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Đang ở OTP; start/verify từng có lỗi

**Bước thực hiện**

1. Chọn Back to email.
2. Nhập email khác và gửi.

**Kết quả mong đợi:** Xóa trạng thái lỗi start/verify khi quay lại; dùng challenge của email mới.

**Nguồn truy vết:** [src/features/auth/components/forgot-password-form.tsx:38](../../../src/features/auth/components/forgot-password-form.tsx#L38), [src/features/auth/api/auth.service.ts:31](../../../src/features/auth/api/auth.service.ts#L31), [src/features/auth/schemas/forgot-password.schema.ts:10](../../../src/features/auth/schemas/forgot-password.schema.ts#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/forgot-password-form.test.tsx, src/features/auth/api/auth.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-056` trong `execution/results.json`.

## AUTH-057 — Logout và quay lại bằng Back

- **Yêu cầu:** `AUTH.SESSION`
- **Ưu tiên / loại / mức:** P0 / Functional / E2E
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** User A có cart, orders, rfqs và profile đã cache

**Bước thực hiện**

1. Logout bằng header.
2. Nhấn Back và mở các trang riêng.

**Kết quả mong đợi:** Xóa token và private Query Cache; phiên anonymous; không còn dữ liệu A. Đến /login bằng replace.

**Nguồn truy vết:** [src/features/auth/api/use-logout-mutation.ts:6](../../../src/features/auth/api/use-logout-mutation.ts#L6), [src/features/auth/components/header-account-menu.tsx:21](../../../src/features/auth/components/header-account-menu.tsx#L21).

**Automation:** Đề xuất E2E | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/header-account-menu.test.tsx.

**Thực thi:** Blocked. Chưa có sandbox URL/tài khoản A–B, OTP/email và quyền chạy giao dịch thật. Luồng local dùng spy/fixture chỉ xác minh frontend, không chứng minh E2E thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-057` trong `execution/results.json`.

## AUTH-058 — Backend yêu cầu đổi mật khẩu

- **Yêu cầu:** `AUTH.SESSION`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Decision required (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** login mustChangePassword=true

**Bước thực hiện**

1. Đăng nhập với cờ true.
2. Thử checkout và các trang riêng.

**Kết quả mong đợi:** Xác nhận với PO luồng bắt buộc đổi mật khẩu và các thao tác được phép; không coi chỉ lưu cờ là đã thực thi policy.

**Nguồn truy vết:** [src/features/auth/components/login-form.tsx:19](../../../src/features/auth/components/login-form.tsx#L19), [src/features/auth/components/signup-form.tsx:26](../../../src/features/auth/components/signup-form.tsx#L26), [src/features/auth/components/signup-verification-form.tsx:36](../../../src/features/auth/components/signup-verification-form.tsx#L36).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/auth/components/login-form.test.tsx, src/features/auth/components/signup-form.test.tsx.

**Thực thi:** Blocked. Expected chưa có quyết định PO/backend hoặc nội dung/contract được phê duyệt. Xem dependency gốc trong test case; không suy diễn Pass từ hành vi hiện tại.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `AUTH-058` trong `execution/results.json`.
