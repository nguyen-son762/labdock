# PDP — Chi tiết và mua sản phẩm

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `/products/[slug]`. Tổng: 24 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: DS-PRODUCT; user A khi add cart; product có nhiều variant active/inactive, tồn kho và giá khác nhau; kiểm soát cart API.

## PDP-001 — Chi tiết sản phẩm đầy đủ

- **Yêu cầu:** `PDP.LOAD`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-PRODUCT.VISIBLE

**Bước thực hiện**

1. Mở slug từ card.
2. So tên, mã, brand, CAS, spec và chứng nhận.

**Kết quả mong đợi:** Nội dung lấy đúng product response; không bị thay bởi demo data; tab mặc định Specifications; related chỉ hiện khi có dữ liệu.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-detail.schema.ts:76](../../../src/features/products/schemas/product-detail.schema.ts#L76).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-detail.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-001` trong `execution/results.json`.

## PDP-002 — 404 khác lỗi hệ thống

- **Yêu cầu:** `PDP.LOAD`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** detail=404,500 hoặc malformed

**Bước thực hiện**

1. Tải từng response.
2. Kiểm tra UI/status.

**Kết quả mong đợi:** 404 đi Not Found; HTTP khác và invalid payload là lỗi, không gán nhầm product không tồn tại.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-detail.schema.ts:76](../../../src/features/products/schemas/product-detail.schema.ts#L76).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-detail.schema.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-002` trong `execution/results.json`.

## PDP-003 — Chọn variant mặc định

- **Yêu cầu:** `PDP.VARIANT`
- **Ưu tiên / loại / mức:** P1 / Functional / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Giá A=100 giảm10%; B=95 giảm0%; C rẻ hơn nhưng stock0

**Bước thực hiện**

1. Tải product.
2. Quan sát variant mặc định.

**Kết quả mong đợi:** Chọn A giá thực90 rẻ nhất trong variant active, có stock, giá công khai và >0; bỏ C.

**Nguồn truy vết:** [src/features/products/utils/product-display.ts:7](../../../src/features/products/utils/product-display.ts#L7), [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/utils/product-display.test.ts, src/features/products/components/product-purchase-panel.test.tsx.

**Thực thi:** Pass. Variant mặc định/giá giảm/giá ẩn, add-cart, thông báo hạn chế và nested contract đã pass tại frontend.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-003` trong `execution/results.json`.

## PDP-004 — Fallback khi không có variant mua được

- **Yêu cầu:** `PDP.VARIANT`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** active ẩn giá; inactive; variants=[]

**Bước thực hiện**

1. Tải từng dữ liệu.
2. Xem panel và card.

**Kết quả mong đợi:** Fallback active đầu hoặc variant đầu theo source; variants rỗng không crash; không bật mua nếu không đủ điều kiện.

**Nguồn truy vết:** [src/features/products/utils/product-display.ts:7](../../../src/features/products/utils/product-display.ts#L7), [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/utils/product-display.test.ts, src/features/products/components/product-purchase-panel.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-004` trong `execution/results.json`.

## PDP-005 — Công thức promotion và rfqBasePrice

- **Yêu cầu:** `PDP.PRICE`
- **Ưu tiên / loại / mức:** P1 / Functional / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** unitPrice=1250; promotionPercent=25; rfqBasePrice=1500

**Bước thực hiện**

1. Render panel/card.
2. Đối chiếu giá.

**Kết quả mong đợi:** Giá bán937.50, giá gốc1250 và badge-25%; không dùng rfqBasePrice thay giá bán.

**Nguồn truy vết:** [src/features/products/utils/product-display.ts:7](../../../src/features/products/utils/product-display.ts#L7), [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22), [src/features/products/components/product-card.tsx:22](../../../src/features/products/components/product-card.tsx#L22).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/utils/product-display.test.ts, src/features/products/components/product-purchase-panel.test.tsx.

**Thực thi:** Pass. Variant mặc định/giá giảm/giá ẩn, add-cart, thông báo hạn chế và nested contract đã pass tại frontend.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-005` trong `execution/results.json`.

## PDP-006 — Ẩn giá theo product hoặc variant

- **Yêu cầu:** `PDP.PRICE`
- **Ưu tiên / loại / mức:** P0 / Security / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** product.priceVisible=false hoặc variant.priceVisible=false hoặc unitPrice=null

**Bước thực hiện**

1. Render từng tổ hợp.
2. Quan sát card, CTA và schema SEO.

**Kết quả mong đợi:** Contact for price; không lộ giá gốc/discount ở UI, Buy/Add disabled hoặc ẩn ở card. JSON-LD không được lộ giá ẩn.

**Nguồn truy vết:** [src/features/products/utils/product-display.ts:7](../../../src/features/products/utils/product-display.ts#L7), [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22), [src/features/products/components/product-card.tsx:22](../../../src/features/products/components/product-card.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/utils/product-display.test.ts, src/features/products/components/product-purchase-panel.test.tsx.

**Thực thi:** Pass. Variant mặc định/giá giảm/giá ẩn, add-cart, thông báo hạn chế và nested contract đã pass tại frontend.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-006` trong `execution/results.json`.

## PDP-007 — Giá bằng 0 khác null

- **Yêu cầu:** `PDP.PRICE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** unitPrice=0; visible=true; stock10

**Bước thực hiện**

1. Render và thử mua.

**Kết quả mong đợi:** Hiển thị giá 0 theo source, không mua do unitPrice không >0; quote vẫn có đường liên hệ.

**Nguồn truy vết:** [src/features/products/utils/product-display.ts:7](../../../src/features/products/utils/product-display.ts#L7), [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22), [src/features/products/components/product-card.tsx:22](../../../src/features/products/components/product-card.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/utils/product-display.test.ts, src/features/products/components/product-purchase-panel.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-007` trong `execution/results.json`.

## PDP-008 — Promotion 100%

- **Yêu cầu:** `PDP.PRICE`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Decision required (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** unitPrice=100; promotionPercent=100; stock1

**Bước thực hiện**

1. Render product.
2. Thử Buy now tới checkout.

**Kết quả mong đợi:** Xác nhận PO liệu giá sau giảm=0 có được mua; nếu được thì checkout/payment phải hỗ trợ tổng0, nếu không phải chặn nhất quán.

**Nguồn truy vết:** [src/features/products/utils/product-display.ts:7](../../../src/features/products/utils/product-display.ts#L7), [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22), [src/features/products/components/product-card.tsx:22](../../../src/features/products/components/product-card.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/utils/product-display.test.ts, src/features/products/components/product-purchase-panel.test.tsx.

**Thực thi:** Blocked. Expected chưa có quyết định PO/backend hoặc nội dung/contract được phê duyệt. Xem dependency gốc trong test case; không suy diễn Pass từ hành vi hiện tại.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-008` trong `execution/results.json`.

## PDP-009 — Hết hàng và inactive

- **Yêu cầu:** `PDP.STOCK`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** stock=0; isActive=false; thử card và panel

**Bước thực hiện**

1. Chọn variant hết hàng/inactive.
2. Thử Buy/Add.

**Kết quả mong đợi:** Hiện trạng thái Out; không gửi add; card hiện Learn more, không có nút add.

**Nguồn truy vết:** [src/features/products/utils/product-display.ts:7](../../../src/features/products/utils/product-display.ts#L7), [src/features/products/components/product-card.tsx:22](../../../src/features/products/components/product-card.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/utils/product-display.test.ts, src/features/products/components/product-card.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-009` trong `execution/results.json`.

## PDP-010 — Số lượng min, max và đổi variant

- **Yêu cầu:** `PDP.QUANTITY`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** StockA=1200; StockB=2

**Bước thực hiện**

1. Giảm ở1.
2. Tăng tới999.
3. Chuyển B.

**Kết quả mong đợi:** Không nhỏ hơn1; tăng tối đa min(999,stock); đổi B clamp về2; gửi đúng số lượng.

**Nguồn truy vết:** [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/product-purchase-panel.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-010` trong `execution/results.json`.

## PDP-011 — Add từ panel và header cập nhật

- **Yêu cầu:** `PDP.CART`
- **Ưu tiên / loại / mức:** P0 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** selected variant B; quantity2; POST cart trả cart mới

**Bước thực hiện**

1. Chọn B, quantity2.
2. Add to cart.
3. Mở header cart.

**Kết quả mong đợi:** POST /cart/items với variantId B và quantity2; cache cart thay bằng response; header/count/tổng cập nhật; feedback có role status.

**Nguồn truy vết:** [src/features/products/utils/product-cart.ts:6](../../../src/features/products/utils/product-cart.ts#L6), [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22), [src/features/products/components/product-card.tsx:22](../../../src/features/products/components/product-card.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/product-purchase-panel.test.tsx, src/features/products/components/product-card.test.tsx.

**Thực thi:** Pass. Variant mặc định/giá giảm/giá ẩn, add-cart, thông báo hạn chế và nested contract đã pass tại frontend.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-011` trong `execution/results.json`.

## PDP-012 — Add từ card dùng variant đúng

- **Yêu cầu:** `PDP.CART`
- **Ưu tiên / loại / mức:** P0 / Contract / Integration
- **Cơ sở kỳ vọng:** Integration contract (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Card của list rút gọn và detail đầy đủ

**Bước thực hiện**

1. Add từ mỗi loại card.
2. So variantId với contract backend.

**Kết quả mong đợi:** Gửi variantId hợp lệ của biến thể bán được; list mapping dùng product.id làm synthetic variant cần kiểm chứng backend, không mặc định hai ID tương đương.

**Lưu ý / dependency:** Source mapPublicProduct(list) tạo variant id=product.id.

**Nguồn truy vết:** [src/features/products/utils/product-cart.ts:6](../../../src/features/products/utils/product-cart.ts#L6), [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22), [src/features/products/components/product-card.tsx:22](../../../src/features/products/components/product-card.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/product-purchase-panel.test.tsx, src/features/products/components/product-card.test.tsx.

**Thực thi:** Pass. Variant mặc định/giá giảm/giá ẩn, add-cart, thông báo hạn chế và nested contract đã pass tại frontend.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-012` trong `execution/results.json`.

## PDP-013 — Buy now chọn đúng cart item

- **Yêu cầu:** `PDP.CART`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Add response chứa nhiều item; B của product được chọn

**Bước thực hiện**

1. Buy now.
2. Quan sát URL và danh sách checkout.

**Kết quả mong đợi:** Sau add success, tìm item theo cả productId/variantId; đi /checkout?items=<cartItemId>. Không tìm thấy thì /cart, không checkout item tùy ý.

**Nguồn truy vết:** [src/features/products/utils/product-cart.ts:6](../../../src/features/products/utils/product-cart.ts#L6), [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22), [src/features/products/components/product-card.tsx:22](../../../src/features/products/components/product-card.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/product-purchase-panel.test.tsx, src/features/products/components/product-card.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-013` trong `execution/results.json`.

## PDP-014 — Quote cho sản phẩm có thể mua

- **Yêu cầu:** `PDP.QUOTE`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** selected variant B; cart response

**Bước thực hiện**

1. Chọn Request quote.
2. So item chuyển sang quote.

**Kết quả mong đợi:** Add variant đã chọn; dùng cartItemId trong /request-quote?items=...; chỉ item đó được chọn.

**Nguồn truy vết:** [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/product-purchase-panel.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-014` trong `execution/results.json`.

## PDP-015 — Quote cho giá ẩn hoặc hết hàng

- **Yêu cầu:** `PDP.QUOTE`
- **Ưu tiên / loại / mức:** P1 / Regression / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Không canPurchase

**Bước thực hiện**

1. Chọn Request quote.

**Kết quả mong đợi:** Đi /contact-us?type=quote&product=<encodedSlug>; không add sản phẩm không mua được. Kiểm tra product query có được prefill, nếu chưa ghi gap riêng.

**Lưu ý / dependency:** Route contact hiện chỉ đọc type, chưa đọc product.

**Nguồn truy vết:** [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/product-purchase-panel.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-015` trong `execution/results.json`.

## PDP-016 — Add thất bại và double click

- **Yêu cầu:** `PDP.CART`
- **Ưu tiên / loại / mức:** P1 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** POST=409/401/500; Promise pending

**Bước thực hiện**

1. Click add liên tiếp.
2. Trả lỗi.
3. Retry chủ động.

**Kết quả mong đợi:** Một mutation khi pending; giữ variant/quantity; feedback lỗi, không báo đã add hoặc điều hướng trước success; retry không tự gửi nền.

**Nguồn truy vết:** [src/features/products/utils/product-cart.ts:6](../../../src/features/products/utils/product-cart.ts#L6), [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22), [src/features/products/components/product-card.tsx:22](../../../src/features/products/components/product-card.tsx#L22).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/product-purchase-panel.test.tsx, src/features/products/components/product-card.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-016` trong `execution/results.json`.

## PDP-017 — Gallery primary và thumbnails

- **Yêu cầu:** `PDP.GALLERY`
- **Ưu tiên / loại / mức:** P2 / Functional / Browser
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 3 ảnh sort đảo; primary ở cuối payload

**Bước thực hiện**

1. Mở detail.
2. Click thumbnail và swipe ảnh chính.

**Kết quả mong đợi:** Primary đứng đầu, còn lại theo sortOrder; aria-pressed thumbnail và ảnh chính đồng bộ; responsive thumbs ngang mobile/dọc từ640px.

**Nguồn truy vết:** [src/features/products/utils/product-display.ts:7](../../../src/features/products/utils/product-display.ts#L7), [src/features/products/components/product-gallery.tsx:16](../../../src/features/products/components/product-gallery.tsx#L16).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/features/products/utils/product-display.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Browser đã xác nhận gallery autoplay/thumbnail và selected state; chưa kiểm tra thứ tự primary/media sort với tất cả tổ hợp dữ liệu.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-017` trong `execution/results.json`.

## PDP-018 — Không có media và ảnh lỗi

- **Yêu cầu:** `PDP.GALLERY`
- **Ưu tiên / loại / mức:** P2 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** media=[]; URL404

**Bước thực hiện**

1. Render không media.
2. Render ảnh404.

**Kết quả mong đợi:** Không media dùng fallback local; ảnh lỗi không làm vỡ layout. Xác nhận fallback onError vì source chỉ xử lý mảng media rỗng.

**Nguồn truy vết:** [src/features/products/utils/product-display.ts:7](../../../src/features/products/utils/product-display.ts#L7), [src/features/products/components/product-gallery.tsx:16](../../../src/features/products/components/product-gallery.tsx#L16).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/utils/product-display.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-018` trong `execution/results.json`.

## PDP-019 — Chuẩn hóa URL ảnh/tài liệu

- **Yêu cầu:** `PDP.MEDIA`
- **Ưu tiên / loại / mức:** P1 / Contract / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** http(s), /media/public/a.png, public/a.png, /home/a.png; API root-relative

**Bước thực hiện**

1. Resolve từng path.
2. Kiểm tra image/document href.

**Kết quả mong đợi:** Media public resolve theo API origin, local asset giữ local; không lặp /api/public/v1 vào asset; API root-relative giữ /media/... .

**Nguồn truy vết:** [src/features/products/utils/product-display.ts:7](../../../src/features/products/utils/product-display.ts#L7).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/features/products/utils/product-display.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra một phần media/rule, thông tin sản phẩm, ArrowRight và quan hệ tab-panel; chưa phủ toàn bộ fallback, Home/End và URL trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-019` trong `execution/results.json`.

## PDP-020 — Keyboard tabs đúng ARIA

- **Yêu cầu:** `PDP.TABS`
- **Ưu tiên / loại / mức:** P1 / Accessibility / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Specifications, Description, References

**Bước thực hiện**

1. Tab tới tablist.
2. Dùng ArrowLeft/Right, Home/End.
3. Đọc panel.

**Kết quả mong đợi:** Roving tabindex, wrap đầu/cuối; aria-selected/controls/labelledby khớp; focus theo tab; panel đúng dữ liệu.

**Nguồn truy vết:** [src/features/products/components/product-information.tsx:16](../../../src/features/products/components/product-information.tsx#L16).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/product-information.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Tab-panel đều có trong DOM/SSR, ArrowRight đã kiểm tra; chưa chạy đủ vòng phím Home/End/ArrowLeft.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-020` trong `execution/results.json`.

## PDP-021 — Fallback mô tả, specs và documents

- **Yêu cầu:** `PDP.CONTENT`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** description=""; notes có/không; specifications/documents=[]

**Bước thực hiện**

1. Mở từng tab.

**Kết quả mong đợi:** Description dùng description rồi notes rồi fallback; Specs/References có empty message; không vẽ dữ liệu demo.

**Nguồn truy vết:** [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22), [src/features/products/components/product-information.tsx:16](../../../src/features/products/components/product-information.tsx#L16).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/product-purchase-panel.test.tsx, src/features/products/components/product-information.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra một phần media/rule, thông tin sản phẩm, ArrowRight và quan hệ tab-panel; chưa phủ toàn bộ fallback, Home/End và URL trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-021` trong `execution/results.json`.

## PDP-022 — Tài liệu và related

- **Yêu cầu:** `PDP.CONTENT`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** docs sortOrder2,1; related=[] hoặc2 item

**Bước thực hiện**

1. Mở References.
2. Kiểm tra thứ tự, KB, link và related card.

**Kết quả mong đợi:** Docs sort tăng, KB tính từ sizeBytes, tab mới rel=noreferrer; related link đúng slug và tôn trọng hidden price.

**Nguồn truy vết:** [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22), [src/features/products/components/product-information.tsx:16](../../../src/features/products/components/product-information.tsx#L16).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/product-purchase-panel.test.tsx, src/features/products/components/product-information.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra một phần media/rule, thông tin sản phẩm, ArrowRight và quan hệ tab-panel; chưa phủ toàn bộ fallback, Home/End và URL trong ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-022` trong `execution/results.json`.

## PDP-023 — Yêu cầu đặc biệt và hạn chế

- **Yêu cầu:** `PDP.CONTENT`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Decision required (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** restrictedCondition=true; specialRequirement=true; notes

**Bước thực hiện**

1. Mở detail.
2. Đọc notice trước mua.

**Kết quả mong đợi:** Hiện đủ notices và certificates từ API; policy có bắt buộc xác nhận/giấy phép trước mua cần PO/backend xác nhận.

**Nguồn truy vết:** [src/features/products/components/product-purchase-panel.tsx:22](../../../src/features/products/components/product-purchase-panel.tsx#L22), [src/features/products/components/product-information.tsx:16](../../../src/features/products/components/product-information.tsx#L16).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/product-purchase-panel.test.tsx, src/features/products/components/product-information.test.tsx.

**Thực thi:** Blocked. Expected chưa có quyết định PO/backend hoặc nội dung/contract được phê duyệt. Xem dependency gốc trong test case; không suy diễn Pass từ hành vi hiện tại.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-023` trong `execution/results.json`.

## PDP-024 — Null và nested contract

- **Yêu cầu:** `PDP.SCHEMA`
- **Ưu tiên / loại / mức:** P1 / Contract / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** related=null; variant.unitPrice=null; negative stock/promo101

**Bước thực hiện**

1. Parse từng response.

**Kết quả mong đợi:** related null -> []; unitPrice null giữ null; nested sai bị reject. Không khẳng định null được đổi thành0 theo README cũ.

**Nguồn truy vết:** [src/features/products/schemas/product-detail.schema.ts:76](../../../src/features/products/schemas/product-detail.schema.ts#L76).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/features/products/schemas/product-detail.schema.test.ts.

**Thực thi:** Pass. Variant mặc định/giá giảm/giá ẩn, add-cart, thông báo hạn chế và nested contract đã pass tại frontend.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `PDP-024` trong `execution/results.json`.
