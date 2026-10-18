# LOC — Ngôn ngữ và routing

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `Toàn bộ route en/vi`. Tổng: 8 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: Browser sạch/locale cookie; mọi journey trọng yếu được lặp ở en và vi; có query brandIds/items/page và fragment.

## LOC-001 — Prefix mặc định và vi

- **Yêu cầu:** `LOC.ROUTE`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** /, /vi, /products, /vi/products

**Bước thực hiện**

1. Mở trực tiếp từng URL và reload.

**Kết quả mong đợi:** en không cần prefix;vi có /vi; không redirect loop hoặc mất route; cookie NEXT_LOCALE theo routing.

**Nguồn truy vết:** [src/i18n/routing.ts:3](../../../src/i18n/routing.ts#L3), [src/i18n/locale.ts:5](../../../src/i18n/locale.ts#L5), [src/middleware.ts:7](../../../src/middleware.ts#L7).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/i18n/locale.test.ts.

**Thực thi:** Pass. Locale URL/fragment, message contract, canonical/hreflang và PDP metadata/JSON-LD có assertion trực tiếp đã pass. Browser bổ sung SSR lang và link vi.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `LOC-001` trong `execution/results.json`.

## LOC-002 — Giữ path và query khi đổi locale

- **Yêu cầu:** `LOC.SWITCH`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** /products/category/slug?brandIds=B1&origins=SG&page=2

**Bước thực hiện**

1. Chọn vi rồi en từ switcher.

**Kết quả mong đợi:** Giữ path/query, đổi prefix đúng; không reset filter hoặc item IDs; chọn locale hiện tại không điều hướng thừa.

**Nguồn truy vết:** [src/i18n/routing.ts:3](../../../src/i18n/routing.ts#L3), [src/i18n/locale.ts:5](../../../src/i18n/locale.ts#L5), [src/middleware.ts:7](../../../src/middleware.ts#L7).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/i18n/locale.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra helper/path/query và format tương ứng; chưa chạy hết các route/locale và format trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `LOC-002` trong `execution/results.json`.

## LOC-003 — Fragment khi đổi ngôn ngữ

- **Yêu cầu:** `LOC.SWITCH`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Decision required (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** /#research-leaders hoặc /vi/#new-products

**Bước thực hiện**

1. Mở anchor.
2. Đổi locale.

**Kết quả mong đợi:** Xác nhận kỳ vọng giữ hash/scroll; source nối pathname+search chưa nối hash, không mặc định bảo toàn.

**Nguồn truy vết:** [src/i18n/routing.ts:3](../../../src/i18n/routing.ts#L3), [src/i18n/locale.ts:5](../../../src/i18n/locale.ts#L5), [src/middleware.ts:7](../../../src/middleware.ts#L7).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/i18n/locale.test.ts.

**Thực thi:** Blocked. Expected chưa có quyết định PO/backend hoặc nội dung/contract được phê duyệt. Xem dependency gốc trong test case; không suy diễn Pass từ hành vi hiện tại.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `LOC-003` trong `execution/results.json`.

## LOC-004 — Keys và ICU placeholders

- **Yêu cầu:** `LOC.MESSAGES`
- **Ưu tiên / loại / mức:** P1 / Contract / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 673 leaf keys mỗi locale tại snapshot

**Bước thực hiện**

1. Parse2 message files.
2. Render message với count0,1,2 và tham số.

**Kết quả mong đợi:** Cùng keys; biến ICU đúng ý nghĩa (không so số lần xuất hiện đơn thuần); không MISSING_MESSAGE hoặc raw key trên UI.

**Nguồn truy vết:** [src/i18n/routing.ts:3](../../../src/i18n/routing.ts#L3), [src/i18n/locale.ts:5](../../../src/i18n/locale.ts#L5), [src/middleware.ts:7](../../../src/middleware.ts#L7).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/i18n/locale.test.ts.

**Thực thi:** Pass. Locale URL/fragment, message contract, canonical/hreflang và PDP metadata/JSON-LD có assertion trực tiếp đã pass. Browser bổ sung SSR lang và link vi.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `LOC-004` trong `execution/results.json`.

## LOC-005 — Không còn text sai locale trong luồng chính

- **Yêu cầu:** `LOC.TEXT`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** vi auth/cart/checkout/profile/news/legal

**Bước thực hiện**

1. Duyệt từng màn và gây validation/error.
2. Đọc labels, aria-label và button.

**Kết quả mong đợi:** Text và lỗi theo locale hoặc ngoại lệ đã PO chấp thuận; test schema error hardcode/aria English/profile Member since riêng, không chỉ so JSON keys.

**Nguồn truy vết:** [src/i18n/routing.ts:3](../../../src/i18n/routing.ts#L3), [src/i18n/locale.ts:5](../../../src/i18n/locale.ts#L5), [src/middleware.ts:7](../../../src/middleware.ts#L7).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/i18n/locale.test.ts.

**Thực thi:** Blocked. Cần chốt nội dung/locale hoặc contract hành vi: event tĩnh đã cũ, legal còn tiếng Anh, API/schema errors còn text cố định, search/seller/currency/social có phần chưa được nối xử lý. Không tự tạo chính sách hay API chưa có.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `LOC-005` trong `execution/results.json`.

## LOC-006 — HTML lang và screen reader

- **Yêu cầu:** `LOC.HTML`
- **Ưu tiên / loại / mức:** P2 / Accessibility / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** /vi và các route vi

**Bước thực hiện**

1. Mở vi.
2. Đọc document.documentElement.lang.

**Kết quả mong đợi:** lang=vi ở nội dung Việt, en ở tiếng Anh; phát âm theo ngôn ngữ; không root lang=en cố định trên vi.

**Nguồn truy vết:** [src/i18n/routing.ts:3](../../../src/i18n/routing.ts#L3), [src/i18n/locale.ts:5](../../../src/i18n/locale.ts#L5), [src/middleware.ts:7](../../../src/middleware.ts#L7).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/i18n/locale.test.ts.

**Thực thi:** Pass. Locale URL/fragment, message contract, canonical/hreflang và PDP metadata/JSON-LD có assertion trực tiếp đã pass. Browser bổ sung SSR lang và link vi.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `LOC-006` trong `execution/results.json`.

## LOC-007 — Ngày/tiền theo contract hiển thị

- **Yêu cầu:** `LOC.DATE`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** UTC gần nửa đêm; en/vi; SGD/USD

**Bước thực hiện**

1. Mở order/RFQ/news/profile với fixture cùng timestamp.

**Kết quả mong đợi:** Không đổi ngày ngoài ý muốn; source order/RFQ dùng UTC en-GB, news theo locale, profile theo locale; tiền tệ đúng mã. Thay đổi format cần PO xác nhận.

**Nguồn truy vết:** [src/i18n/routing.ts:3](../../../src/i18n/routing.ts#L3), [src/i18n/locale.ts:5](../../../src/i18n/locale.ts#L5), [src/middleware.ts:7](../../../src/middleware.ts#L7).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/i18n/locale.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra helper/path/query và format tương ứng; chưa chạy hết các route/locale và format trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `LOC-007` trong `execution/results.json`.

## LOC-008 — Locale/route không hỗ trợ

- **Yêu cầu:** `LOC.NOTFOUND`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** /zz, /vi/no-such-route, slug404

**Bước thực hiện**

1. Mở URL.
2. Chọn Back home.

**Kết quả mong đợi:** Không crash; fallback/404 đúng routing; link về Home locale hợp lý; nội dung404 cần bản dịch nếu product yêu cầu.

**Nguồn truy vết:** [src/i18n/routing.ts:3](../../../src/i18n/routing.ts#L3), [src/i18n/locale.ts:5](../../../src/i18n/locale.ts#L5), [src/middleware.ts:7](../../../src/middleware.ts#L7).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/i18n/locale.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `LOC-008` trong `execution/results.json`.
