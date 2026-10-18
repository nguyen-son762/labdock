# QUOTE — Gửi yêu cầu báo giá từ giỏ

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `/request-quote; /request-quote/success`. Tổng: 9 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: User A và DS-CART; contact fixture DS-QUOTE; quoteService hiện mock local. UI có thể test bằng service spy; persistence cần API thật.

## QUOTE-001 — Chỉ các item đã chọn

- **Yêu cầu:** `QUOTE.ITEMS`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** items=I2

**Bước thực hiện**

1. Mở quote URL từ cart.
2. Chọn/bỏ, cập nhật quantity/variant.

**Kết quả mong đợi:** Chỉ item2 xuất hiện; thao tác quantity/variant gọi cart API và render response; submit gửi cartItemIds đang chọn.

**Nguồn truy vết:** [src/features/checkout/components/request-quote-screen.tsx:22](../../../src/features/checkout/components/request-quote-screen.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/request-quote-screen.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `QUOTE-001` trong `execution/results.json`.

## QUOTE-002 — Không còn item để gửi

- **Yêu cầu:** `QUOTE.ITEMS`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** items=[] hoặc toàn ID lạ; bỏ all

**Bước thực hiện**

1. Mở quote với giỏ rỗng hoặc bỏ chọn hết.
2. Submit.

**Kết quả mong đợi:** Giỏ rỗng có empty screen; không chọn có thông báo select at least one; không gọi submitQuote.

**Nguồn truy vết:** [src/features/checkout/components/request-quote-screen.tsx:22](../../../src/features/checkout/components/request-quote-screen.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/request-quote-screen.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `QUOTE-002` trong `execution/results.json`.

## QUOTE-003 — Mã gọi và region giới hạn

- **Yêu cầu:** `QUOTE.CONTACT`
- **Ưu tiên / loại / mức:** P1 / Contract / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** SG65 và VN84

**Bước thực hiện**

1. Chọn từng quốc gia/mã gọi.
2. Submit.

**Kết quả mong đợi:** phoneCountry gửi digits65/84, region là tên quốc gia; phone giữ national. Không nhầm ISO code với dialDigits.

**Nguồn truy vết:** [src/features/checkout/components/quote-contact-form.tsx:22](../../../src/features/checkout/components/quote-contact-form.tsx#L22), [src/features/checkout/schemas/quote.schema.ts:3](../../../src/features/checkout/schemas/quote.schema.ts#L3).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Chưa có automation hoặc bằng chứng chạy ca tương ứng.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `QUOTE-003` trong `execution/results.json`.

## QUOTE-004 — Không dùng thông tin demo làm danh tính

- **Yêu cầu:** `QUOTE.CONTACT`
- **Ưu tiên / loại / mức:** P0 / Functional / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** User A khác Sarah

**Bước thực hiện**

1. Mở quote và quan sát default.
2. Thử submit chưa sửa.

**Kết quả mong đợi:** Dữ liệu liên hệ phải do người dùng cung cấp/xác nhận; không tạo quote dưới email Sarah demo.

**Nguồn truy vết:** [src/features/checkout/components/quote-contact-form.tsx:22](../../../src/features/checkout/components/quote-contact-form.tsx#L22), [src/features/checkout/schemas/quote.schema.ts:3](../../../src/features/checkout/schemas/quote.schema.ts#L3).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `QUOTE-004` trong `execution/results.json`.

## QUOTE-005 — Name/email/phone bắt buộc

- **Yêu cầu:** `QUOTE.VALIDATE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** name1; email sai; phone thiếu hoặc ngoài7..19 ký tự

**Bước thực hiện**

1. Đổi từng trường của DS-QUOTE sang sai.
2. Submit.

**Kết quả mong đợi:** Lỗi tại field; không gọi service. Company optional<=100; phoneCountry/region không rỗng.

**Nguồn truy vết:** [src/features/checkout/schemas/quote.schema.ts:3](../../../src/features/checkout/schemas/quote.schema.ts#L3).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Chưa có automation hoặc bằng chứng chạy ca tương ứng.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `QUOTE-005` trong `execution/results.json`.

## QUOTE-006 — Frontend submit thành công và pending

- **Yêu cầu:** `QUOTE.SUBMIT`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** contact hợp lệ; submit chưa resolve

**Bước thực hiện**

1. Double click submit.
2. Resolve reference RFQ-ABC12345.

**Kết quả mong đợi:** Một submit với contact,itemIds,UUID; pending label; success chuyển /request-quote/success?reference=... .

**Nguồn truy vết:** [src/features/checkout/components/request-quote-screen.tsx:22](../../../src/features/checkout/components/request-quote-screen.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/request-quote-screen.test.tsx.

**Thực thi:** Pass. Form gửi đúng một mutation khi pending, nhận reference từ spy và điều hướng success.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `QUOTE-006` trong `execution/results.json`.

## QUOTE-007 — Submit lỗi và cancel

- **Yêu cầu:** `QUOTE.SUBMIT`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** submitQuote reject; sau đó Cancel

**Bước thực hiện**

1. Submit, cho lỗi.
2. Kiểm tra dữ liệu rồi Cancel.

**Kết quả mong đợi:** Alert, giữ input/selection, cho retry; Cancel -> /cart, không submit lần nữa.

**Nguồn truy vết:** [src/features/checkout/components/request-quote-screen.tsx:22](../../../src/features/checkout/components/request-quote-screen.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/request-quote-screen.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `QUOTE-007` trong `execution/results.json`.

## QUOTE-008 — Quote được lưu thật và xuất hiện trong RFQs

- **Yêu cầu:** `QUOTE.INTEGRATION`
- **Ưu tiên / loại / mức:** P0 / Functional / API + E2E
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Backend cần cấp contract submit

**Bước thực hiện**

1. Gửi quote qua API sandbox thật.
2. Mở /rfqs và detail.

**Kết quả mong đợi:** Có record thuộc user, item/qty/contact đúng; reference khớp; không có success khi backend không lưu.

**Lưu ý / dependency:** BLOCKER: quoteService hiện không gọi HTTP; không được đánh Pass bằng mock550ms.

**Nguồn truy vết:** [src/features/checkout/api/quote.service.ts:10](../../../src/features/checkout/api/quote.service.ts#L10).

**Automation:** Đề xuất API + E2E | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. checkout/payment/quote/contact submit trong source vẫn là mock local; thiếu API contract/endpoint và sandbox để chứng minh lưu dữ liệu, xác thực thanh toán, idempotency và email thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `QUOTE-008` trong `execution/results.json`.

## QUOTE-009 — Success direct URL và reference

- **Yêu cầu:** `QUOTE.SUCCESS`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Không gửi quote; mở /request-quote/success?reference=fake

**Bước thực hiện**

1. Truy cập success trực tiếp.
2. Quan sát thông báo và view RFQs.

**Kết quả mong đợi:** Thành công phải được xác minh theo quote thực; reference gửi qua URL cần được hiển thị/đối chiếu. Source hiện bỏ qua query.

**Nguồn truy vết:** [src/features/checkout/components/quote-success-screen.tsx:7](../../../src/features/checkout/components/quote-success-screen.tsx#L7), [src/app/[locale]/(marketing)/request-quote/success/page.tsx:6](../../../src/app/%5Blocale%5D/%28marketing%29/request-quote/success/page.tsx#L6).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Chưa có automation hoặc bằng chứng chạy ca tương ứng.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `QUOTE-009` trong `execution/results.json`.
