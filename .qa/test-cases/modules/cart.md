# CART — Giỏ hàng và giỏ ở header

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `/cart`. Tổng: 25 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: User A có DS-CART; cart API sandbox hoặc mock HTTP; cache QueryClient mới mỗi ca; chưa có request mutation pending.

## CART-001 — Cart từ backend và loading

- **Yêu cầu:** `CART.LOAD`
- **Ưu tiên / loại / mức:** P0 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** GET /cart chậm rồi200 DS-CART

**Bước thực hiện**

1. Mở /cart.
2. Chờ response.

**Kết quả mong đợi:** Có skeleton lúc pending; hiển thị productName/sku/quantity/currency/variant từ response; không thay bằng checkoutItems demo.

**Nguồn truy vết:** [src/features/checkout/api/cart.service.ts:14](../../../src/features/checkout/api/cart.service.ts#L14), [src/features/checkout/components/cart-screen.tsx:19](../../../src/features/checkout/components/cart-screen.tsx#L19), [src/features/checkout/schemas/cart.schema.ts:23](../../../src/features/checkout/schemas/cart.schema.ts#L23).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/api/cart.service.test.ts, src/features/checkout/components/cart-screen.test.tsx.

**Thực thi:** Pass. Cart API/AbortSignal/contract, quantity draft commit và chọn variant đã pass bằng service mock và UI thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-001` trong `execution/results.json`.

## CART-002 — Giỏ rỗng và preview empty

- **Yêu cầu:** `CART.LOAD`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** items=[]; /cart?empty=1,true,false

**Bước thực hiện**

1. Mở giỏ rỗng.
2. Thử các query preview.

**Kết quả mong đợi:** Giỏ rỗng hiển thị Start shopping -> /products; empty1/true ép UI rỗng theo source nhưng không xóa cart backend; false không ép.

**Nguồn truy vết:** [src/features/checkout/api/cart.service.ts:14](../../../src/features/checkout/api/cart.service.ts#L14), [src/features/checkout/components/cart-screen.tsx:19](../../../src/features/checkout/components/cart-screen.tsx#L19), [src/features/checkout/schemas/cart.schema.ts:23](../../../src/features/checkout/schemas/cart.schema.ts#L23).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/api/cart.service.test.ts, src/features/checkout/components/cart-screen.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-002` trong `execution/results.json`.

## CART-003 — Tải giỏ thất bại

- **Yêu cầu:** `CART.LOAD`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** GET=401/403/500; không có cache

**Bước thực hiện**

1. Mở cart.
2. Quan sát alert và các CTA.

**Kết quả mong đợi:** Không coi lỗi là giỏ rỗng đã tải xong; không checkout sản phẩm giả; thông báo đúng session/error.

**Nguồn truy vết:** [src/features/checkout/api/cart.service.ts:14](../../../src/features/checkout/api/cart.service.ts#L14), [src/features/checkout/components/cart-screen.tsx:19](../../../src/features/checkout/components/cart-screen.tsx#L19), [src/features/checkout/schemas/cart.schema.ts:23](../../../src/features/checkout/schemas/cart.schema.ts#L23).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/api/cart.service.test.ts, src/features/checkout/components/cart-screen.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-003` trong `execution/results.json`.

## CART-004 — Mặc định chọn tất cả và chọn một phần

- **Yêu cầu:** `CART.SELECT`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 2 items

**Bước thực hiện**

1. Mở cart.
2. Bỏ item2.
3. Bỏ all rồi select all.

**Kết quả mong đợi:** Mặc định all; summary chỉ tính item chọn; checkbox từng dòng/all phản ánh state; không mutation cart chỉ vì selection.

**Nguồn truy vết:** [src/features/checkout/components/cart-screen.tsx:19](../../../src/features/checkout/components/cart-screen.tsx#L19), [src/features/checkout/components/cart-order-summary.tsx:11](../../../src/features/checkout/components/cart-order-summary.tsx#L11).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-screen.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-004` trong `execution/results.json`.

## CART-005 — Không chọn item nào

- **Yêu cầu:** `CART.SELECT`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** selectedIds=[]

**Bước thực hiện**

1. Bỏ chọn all.
2. Thử CTA bằng click và keyboard.

**Kết quả mong đợi:** Checkout/quote không đi tiếp với mảng rỗng; aria-disabled, focus và href fallback không gây giao dịch.

**Nguồn truy vết:** [src/features/checkout/components/cart-screen.tsx:19](../../../src/features/checkout/components/cart-screen.tsx#L19), [src/features/checkout/components/cart-order-summary.tsx:11](../../../src/features/checkout/components/cart-order-summary.tsx#L11).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-screen.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-005` trong `execution/results.json`.

## CART-006 — Selection sau response xóa/thêm item

- **Yêu cầu:** `CART.SELECT`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Đã bỏ item2; remove item1; thêm item3 từ nơi khác

**Bước thực hiện**

1. Thay cart qua response.
2. Quan sát selection.

**Kết quả mong đợi:** Loại ID không tồn tại; không chọn nhầm bằng index; policy chọn item mới sau khi user từng chỉnh được ghi rõ theo source (chỉ giữ selection còn tồn tại).

**Nguồn truy vết:** [src/features/checkout/components/cart-screen.tsx:19](../../../src/features/checkout/components/cart-screen.tsx#L19), [src/features/checkout/components/cart-order-summary.tsx:11](../../../src/features/checkout/components/cart-order-summary.tsx#L11).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-screen.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-006` trong `execution/results.json`.

## CART-007 — Gõ không mất focus, commit blur/Enter

- **Yêu cầu:** `CART.QUANTITY`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** quantity100 -> 120

**Bước thực hiện**

1. Focus quantity, gõ từng số.
2. Chọn Enter hoặc blur.

**Kết quả mong đợi:** Không request mỗi phím hoặc mất focus; PATCH một lần khi commit giá trị khác; giữ number không có phân cách hàng nghìn trong payload.

**Nguồn truy vết:** [src/features/checkout/api/use-update-cart-item-mutation.ts:5](../../../src/features/checkout/api/use-update-cart-item-mutation.ts#L5), [src/features/checkout/components/cart-items-table.tsx:25](../../../src/features/checkout/components/cart-items-table.tsx#L25), [src/features/checkout/schemas/cart.schema.ts:23](../../../src/features/checkout/schemas/cart.schema.ts#L23).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-items-table.test.tsx, src/features/checkout/schemas/cart.schema.test.ts.

**Thực thi:** Pass. Cart API/AbortSignal/contract, quantity draft commit và chọn variant đã pass bằng service mock và UI thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-007` trong `execution/results.json`.

## CART-008 — Quantity trống và bằng 0

- **Yêu cầu:** `CART.QUANTITY`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Nhập rỗng hoặc0 rồi blur

**Bước thực hiện**

1. Clear quantity.
2. Blur.
3. Lặp với0.

**Kết quả mong đợi:** Clamp về1 khi commit; chỉ PATCH nếu khác quantity ban đầu; không gửi0/NaN.

**Nguồn truy vết:** [src/features/checkout/api/use-update-cart-item-mutation.ts:5](../../../src/features/checkout/api/use-update-cart-item-mutation.ts#L5), [src/features/checkout/components/cart-items-table.tsx:25](../../../src/features/checkout/components/cart-items-table.tsx#L25), [src/features/checkout/schemas/cart.schema.ts:23](../../../src/features/checkout/schemas/cart.schema.ts#L23).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-items-table.test.tsx, src/features/checkout/schemas/cart.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-008` trong `execution/results.json`.

## CART-009 — Số thập phân, âm, chữ và giá trị rất lớn

- **Yêu cầu:** `CART.QUANTITY`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** -1;1.5;abc;999999;1000000

**Bước thực hiện**

1. Gõ/dán từng giá trị.
2. Blur và kiểm tra schema/service.

**Kết quả mong đợi:** UI không chấp nhận âm/phần lẻ; schema quantity integer1..999999. Giá trị vượt max không được gửi.

**Nguồn truy vết:** [src/features/checkout/api/use-update-cart-item-mutation.ts:5](../../../src/features/checkout/api/use-update-cart-item-mutation.ts#L5), [src/features/checkout/components/cart-items-table.tsx:25](../../../src/features/checkout/components/cart-items-table.tsx#L25), [src/features/checkout/schemas/cart.schema.ts:23](../../../src/features/checkout/schemas/cart.schema.ts#L23).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-items-table.test.tsx, src/features/checkout/schemas/cart.schema.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Có test liên quan đã pass; chưa chạy đủ mọi đầu vào/keyboard/tổng tiền/failure path được ghi trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-009` trong `execution/results.json`.

## CART-010 — Tồn kho giảm dưới quantity hiện tại

- **Yêu cầu:** `CART.QUANTITY`
- **Ưu tiên / loại / mức:** P1 / Regression / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** quantity10; stockQty3

**Bước thực hiện**

1. Render cart.
2. Giảm quantity về3.

**Kết quả mong đợi:** Item vẫn editable để giảm số lượng; maximum UI ít nhất quantity hiện tại. Backend quyết định quantity cuối; không khóa không cho user giảm.

**Nguồn truy vết:** [src/features/checkout/api/use-update-cart-item-mutation.ts:5](../../../src/features/checkout/api/use-update-cart-item-mutation.ts#L5), [src/features/checkout/components/cart-items-table.tsx:25](../../../src/features/checkout/components/cart-items-table.tsx#L25), [src/features/checkout/schemas/cart.schema.ts:23](../../../src/features/checkout/schemas/cart.schema.ts#L23).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-items-table.test.tsx, src/features/checkout/schemas/cart.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-010` trong `execution/results.json`.

## CART-011 — Request update thất bại

- **Yêu cầu:** `CART.QUANTITY`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** PATCH=409 (stock changed) hoặc500

**Bước thực hiện**

1. Đổi quantity.
2. Cho API reject.
3. Retry.

**Kết quả mong đợi:** Không cập nhật summary bằng số chưa xác nhận; alert; user sửa/retry được. Giá trị draft trên input phải không gây hiểu nhầm đã lưu.

**Nguồn truy vết:** [src/features/checkout/api/use-update-cart-item-mutation.ts:5](../../../src/features/checkout/api/use-update-cart-item-mutation.ts#L5), [src/features/checkout/components/cart-items-table.tsx:25](../../../src/features/checkout/components/cart-items-table.tsx#L25), [src/features/checkout/schemas/cart.schema.ts:23](../../../src/features/checkout/schemas/cart.schema.ts#L23).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-items-table.test.tsx, src/features/checkout/schemas/cart.schema.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Có test liên quan đã pass; chưa chạy đủ mọi đầu vào/keyboard/tổng tiền/failure path được ghi trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-011` trong `execution/results.json`.

## CART-012 — Đổi variant gửi đủ quantity

- **Yêu cầu:** `CART.VARIANT`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** ItemA variant V1->V2; qty100

**Bước thực hiện**

1. Mở option.
2. Chọn V2.

**Kết quả mong đợi:** PATCH /cart/items/<encodedItemId> với variantId V2, quantity100; tên option ghép mọi selection.value theo /; render response mới.

**Nguồn truy vết:** [src/features/checkout/api/cart.service.ts:14](../../../src/features/checkout/api/cart.service.ts#L14), [src/features/checkout/components/cart-items-table.tsx:25](../../../src/features/checkout/components/cart-items-table.tsx#L25).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/api/cart.service.test.ts, src/features/checkout/components/cart-items-table.test.tsx.

**Thực thi:** Pass. Cart API/AbortSignal/contract, quantity draft commit và chọn variant đã pass bằng service mock và UI thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-012` trong `execution/results.json`.

## CART-013 — Variant đã biến mất hoặc hết stock

- **Yêu cầu:** `CART.VARIANT`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** variantId không nằm variants; variants=[]; V2 stock0

**Bước thực hiện**

1. Render từng fixture.
2. Chọn option khác.

**Kết quả mong đợi:** Không crash; label fallback sku/size; backend từ chối option không hợp lệ và UI giữ dữ liệu xác nhận. Kiểm tra khả năng block option hết stock.

**Nguồn truy vết:** [src/features/checkout/api/cart.service.ts:14](../../../src/features/checkout/api/cart.service.ts#L14), [src/features/checkout/components/cart-items-table.tsx:25](../../../src/features/checkout/components/cart-items-table.tsx#L25).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/api/cart.service.test.ts, src/features/checkout/components/cart-items-table.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Có test liên quan đã pass; chưa chạy đủ mọi đầu vào/keyboard/tổng tiền/failure path được ghi trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-013` trong `execution/results.json`.

## CART-014 — Xóa thành công và xóa item cuối

- **Yêu cầu:** `CART.REMOVE`
- **Ưu tiên / loại / mức:** P0 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DELETE=204; GET refetch còn1 rồi0

**Bước thực hiện**

1. Remove item.
2. Remove item cuối.

**Kết quả mong đợi:** DELETE đúng itemId; cache loại item và invalidates cart; count/tổng đồng bộ; item cuối dẫn empty cart.

**Nguồn truy vết:** [src/features/checkout/api/use-remove-cart-item-mutation.ts:7](../../../src/features/checkout/api/use-remove-cart-item-mutation.ts#L7), [src/features/checkout/components/cart-screen.tsx:19](../../../src/features/checkout/components/cart-screen.tsx#L19), [src/features/checkout/components/cart-header-popover.tsx:17](../../../src/features/checkout/components/cart-header-popover.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-screen.test.tsx, src/features/checkout/components/cart-header-popover.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-014` trong `execution/results.json`.

## CART-015 — Xóa thất bại

- **Yêu cầu:** `CART.REMOVE`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DELETE=500

**Bước thực hiện**

1. Remove từ cart và header.
2. So thông báo và dữ liệu.

**Kết quả mong đợi:** Không mất item trên lỗi; hiển thị lỗi và retry được ở cả hai vị trí.

**Lưu ý / dependency:** Header có removeItemError; CartScreen chưa render removeCart.isError.

**Nguồn truy vết:** [src/features/checkout/api/use-remove-cart-item-mutation.ts:7](../../../src/features/checkout/api/use-remove-cart-item-mutation.ts#L7), [src/features/checkout/components/cart-screen.tsx:19](../../../src/features/checkout/components/cart-screen.tsx#L19), [src/features/checkout/components/cart-header-popover.tsx:17](../../../src/features/checkout/components/cart-header-popover.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-screen.test.tsx, src/features/checkout/components/cart-header-popover.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-015` trong `execution/results.json`.

## CART-016 — Hai cập nhật chồng chéo

- **Yêu cầu:** `CART.RACE`
- **Ưu tiên / loại / mức:** P0 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** A update chậm; B update nhanh; full-cart response đảo thứ tự

**Bước thực hiện**

1. Update A và B trước khi request A xong.
2. Resolve B rồi A.

**Kết quả mong đợi:** Cart cuối phản ánh cả hai thay đổi xác nhận; response cũ không ghi đè cart mới, pending không khóa nhầm item.

**Nguồn truy vết:** [src/features/checkout/api/use-update-cart-item-mutation.ts:5](../../../src/features/checkout/api/use-update-cart-item-mutation.ts#L5), [src/features/checkout/api/use-remove-cart-item-mutation.ts:7](../../../src/features/checkout/api/use-remove-cart-item-mutation.ts#L7), [src/features/checkout/components/cart-items-table.tsx:25](../../../src/features/checkout/components/cart-items-table.tsx#L25).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-items-table.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra service tuần tự hóa update/remove; chưa kiểm tra đủ hai cập nhật chồng chéo và cache UI cuối cùng.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-016` trong `execution/results.json`.

## CART-017 — Update và remove cùng item

- **Yêu cầu:** `CART.RACE`
- **Ưu tiên / loại / mức:** P1 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** PATCH pending rồi DELETE; response PATCH về sau

**Bước thực hiện**

1. Đổi quantity.
2. Thử remove khi đang pending.
3. Điều khiển response.

**Kết quả mong đợi:** Không thể gửi thao tác xung đột từ row đang pending; item đã xóa không sống lại vì response cũ.

**Nguồn truy vết:** [src/features/checkout/api/use-update-cart-item-mutation.ts:5](../../../src/features/checkout/api/use-update-cart-item-mutation.ts#L5), [src/features/checkout/api/use-remove-cart-item-mutation.ts:7](../../../src/features/checkout/api/use-remove-cart-item-mutation.ts#L7), [src/features/checkout/components/cart-items-table.tsx:25](../../../src/features/checkout/components/cart-items-table.tsx#L25).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-items-table.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra thứ tự request update/remove; chưa chạy trọn tình huống tương tác cùng item và invalidation UI.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-017` trong `execution/results.json`.

## CART-018 — Tổng tiền và discount hiện tại

- **Yêu cầu:** `CART.TOTAL`
- **Ưu tiên / loại / mức:** P0 / Functional / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-CART:3500+1000; original1200 cho item2

**Bước thực hiện**

1. Chọn tất cả.
2. So summary với phép tính độc lập.

**Kết quả mong đợi:** Subtotal4500; discount hiển thị200; tax405; delivery0; total4905. Discount không trừ lần nữa khỏi subtotal đã là giá bán.

**Nguồn truy vết:** [src/features/checkout/components/cart-order-summary.tsx:11](../../../src/features/checkout/components/cart-order-summary.tsx#L11), [src/features/checkout/data/checkout-data.ts:3](../../../src/features/checkout/data/checkout-data.ts#L3).

**Automation:** Đề xuất Unit + Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. MỘT PHẦN: Có test liên quan đã pass; chưa chạy đủ mọi đầu vào/keyboard/tổng tiền/failure path được ghi trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-018` trong `execution/results.json`.

## CART-019 — Ưu tiên lineTotal và làm tròn

- **Yêu cầu:** `CART.TOTAL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** lineTotal khác unitPrice*qty; subtotal0.15

**Bước thực hiện**

1. Tính tổng với lineTotal do server cấp.
2. Tính thuế.

**Kết quả mong đợi:** Source ưu tiên lineTotal; tax round(subtotal*0.09,2); không cộng discount lần hai. Chênh lineTotal cần đối chiếu backend, không tự sửa số liệu.

**Nguồn truy vết:** [src/features/checkout/components/cart-order-summary.tsx:11](../../../src/features/checkout/components/cart-order-summary.tsx#L11), [src/features/checkout/data/checkout-data.ts:3](../../../src/features/checkout/data/checkout-data.ts#L3).

**Automation:** Đề xuất Unit | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. MỘT PHẦN: Có test liên quan đã pass; chưa chạy đủ mọi đầu vào/keyboard/tổng tiền/failure path được ghi trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-019` trong `execution/results.json`.

## CART-020 — Nhiều currency trong cùng giỏ

- **Yêu cầu:** `CART.TOTAL`
- **Ưu tiên / loại / mức:** P0 / Contract / Integration
- **Cơ sở kỳ vọng:** Decision required (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** ItemA SGD; ItemB USD

**Bước thực hiện**

1. Tải giỏ nhiều currency.
2. Xem summary và checkout.

**Kết quả mong đợi:** Không cộng các đơn vị tiền tệ khác nhau thành một total theo currency item đầu; cần backend/PO xác định tách giỏ hoặc quy đổi.

**Nguồn truy vết:** [src/features/checkout/components/cart-order-summary.tsx:11](../../../src/features/checkout/components/cart-order-summary.tsx#L11), [src/features/checkout/data/checkout-data.ts:3](../../../src/features/checkout/data/checkout-data.ts#L3).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Expected chưa có quyết định PO/backend hoặc nội dung/contract được phê duyệt. Xem dependency gốc trong test case; không suy diễn Pass từ hành vi hiện tại.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-020` trong `execution/results.json`.

## CART-021 — Sản phẩm deleted/unpublished

- **Yêu cầu:** `CART.STATUS`
- **Ưu tiên / loại / mức:** P0 / Negative / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** isDeleted=true; productStatus=Draft; stock0

**Bước thực hiện**

1. Tải cart với item không còn bán.
2. Thử checkout/quote.

**Kết quả mong đợi:** Xác định chính sách vô hiệu item, thông báo lý do và loại khỏi thanh toán; không chỉ render như item bán được.

**Lưu ý / dependency:** Schema giữ metadata; source UI chưa kiểm tra chúng trước checkout.

**Nguồn truy vết:** [src/features/checkout/components/cart-screen.tsx:19](../../../src/features/checkout/components/cart-screen.tsx#L19), [src/features/checkout/schemas/cart.schema.ts:23](../../../src/features/checkout/schemas/cart.schema.ts#L23).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-screen.test.tsx, src/features/checkout/schemas/cart.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-021` trong `execution/results.json`.

## CART-022 — Giỏ header và giỏ mobile

- **Yêu cầu:** `CART.HEADER`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 2 items với qty100,1

**Bước thực hiện**

1. Mở header popover.
2. So /cart.
3. Resize mobile.

**Kết quả mong đợi:** Badge đếm2 dòng sản phẩm theo source; tổng subtotal và currency đúng; mobile link tới cart; cùng Query Cache, không tải trùng khi còn fresh.

**Nguồn truy vết:** [src/features/checkout/components/cart-header-popover.tsx:17](../../../src/features/checkout/components/cart-header-popover.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-header-popover.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Có test liên quan đã pass; chưa chạy đủ mọi đầu vào/keyboard/tổng tiền/failure path được ghi trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-022` trong `execution/results.json`.

## CART-023 — Popover keyboard và xóa lỗi

- **Yêu cầu:** `CART.HEADER`
- **Ưu tiên / loại / mức:** P2 / Accessibility / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Cart có1 item

**Bước thực hiện**

1. Enter mở.
2. Tab chọn/xóa.
3. Escape và mở lại.

**Kết quả mong đợi:** Focus hợp lý, Escape đóng và trả focus trigger; thao tác xóa dùng API/cache chung; lỗi đọc được.

**Nguồn truy vết:** [src/features/checkout/components/cart-header-popover.tsx:17](../../../src/features/checkout/components/cart-header-popover.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-header-popover.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Có test liên quan đã pass; chưa chạy đủ mọi đầu vào/keyboard/tổng tiền/failure path được ghi trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-023` trong `execution/results.json`.

## CART-024 — Chuyển đúng selection sang checkout/quote

- **Yêu cầu:** `CART.NAV`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Chỉ chọn item2

**Bước thực hiện**

1. Click từng CTA ở cart và header.

**Kết quả mong đợi:** URL items chứa cartItemId đã chọn được encode; màn đích chỉ có item2; không dùng productId hoặc variantId làm itemId.

**Nguồn truy vết:** [src/features/checkout/components/cart-header-popover.tsx:17](../../../src/features/checkout/components/cart-header-popover.tsx#L17), [src/features/checkout/components/cart-order-summary.tsx:11](../../../src/features/checkout/components/cart-order-summary.tsx#L11).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/components/cart-header-popover.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-024` trong `execution/results.json`.

## CART-025 — Contract cart write và validation

- **Yêu cầu:** `CART.API`
- **Ưu tiên / loại / mức:** P1 / Contract / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** invalid variant GUID; quantity0; itemId có ký tự /

**Bước thực hiện**

1. Gọi add/update/remove với dữ liệu sai.
2. Gọi itemId cần encode.

**Kết quả mong đợi:** Sai payload bị reject trước HTTP; itemId encode; add/update validate full cart response; remove không yêu cầu body JSON.

**Nguồn truy vết:** [src/features/checkout/api/cart.service.ts:14](../../../src/features/checkout/api/cart.service.ts#L14), [src/features/checkout/schemas/cart.schema.ts:23](../../../src/features/checkout/schemas/cart.schema.ts#L23).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/features/checkout/api/cart.service.test.ts, src/features/checkout/schemas/cart.schema.test.ts.

**Thực thi:** Pass. Cart API/AbortSignal/contract, quantity draft commit và chọn variant đã pass bằng service mock và UI thật.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CART-025` trong `execution/results.json`.
