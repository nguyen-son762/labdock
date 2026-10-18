# CAT — Danh mục, thương hiệu và xuất xứ

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `/products; /products/category/[slug]`. Tổng: 29 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: DS-CATALOG có cây 3 cấp, 7 brands và 7 origins; hơn 40 products. Mock các resource độc lập; mở request mới khi kiểm tra server cache.

## CAT-001 — Danh sách và metadata phân trang

- **Yêu cầu:** `CAT.LOAD`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** page=1; pageSize=20; total=45

**Bước thực hiện**

1. Mở /products.
2. Đối chiếu card, tổng và pagination.

**Kết quả mong đợi:** Request products pageSize=20; 20 item đúng payload; pagination 3 trang; QuoteCard không làm tăng total sản phẩm.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/products/page.tsx:18](../../../src/app/%5Blocale%5D/%28marketing%29/products/page.tsx#L18), [src/app/[locale]/(marketing)/products/category/[slug]/page.tsx:25](../../../src/app/%5Blocale%5D/%28marketing%29/products/category/%5Bslug%5D/page.tsx#L25), [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã chạy load/contract/error/filter có sẵn; chưa có đủ assertion cho toàn bộ tổ hợp và bước của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-001` trong `execution/results.json`.

## CAT-002 — Các resource lỗi độc lập

- **Yêu cầu:** `CAT.LOAD`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Lần lượt products/categories/brands/origins=500

**Bước thực hiện**

1. Chỉ cho một request lỗi mỗi lần.
2. Quan sát phần còn lại.

**Kết quả mong đợi:** Products lỗi có alert nhưng filter còn hoạt động; categories lỗi không hỏng header/catalog còn lại; brands/origins lỗi có thông báo riêng và không mất products.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/products/page.tsx:18](../../../src/app/%5Blocale%5D/%28marketing%29/products/page.tsx#L18), [src/app/[locale]/(marketing)/products/category/[slug]/page.tsx:25](../../../src/app/%5Blocale%5D/%28marketing%29/products/category/%5Bslug%5D/page.tsx#L25), [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã chạy load/contract/error/filter có sẵn; chưa có đủ assertion cho toàn bộ tổ hợp và bước của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-002` trong `execution/results.json`.

## CAT-003 — Không có kết quả

- **Yêu cầu:** `CAT.LOAD`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** items=[]; total=0

**Bước thực hiện**

1. Mở catalog với filter không khớp.
2. Chọn clear.

**Kết quả mong đợi:** Hiện no matches; có clear khi filter đang dùng; pagination ẩn; clear khôi phục danh sách.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/products/page.tsx:18](../../../src/app/%5Blocale%5D/%28marketing%29/products/page.tsx#L18), [src/app/[locale]/(marketing)/products/category/[slug]/page.tsx:25](../../../src/app/%5Blocale%5D/%28marketing%29/products/category/%5Bslug%5D/page.tsx#L25), [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã chạy load/contract/error/filter có sẵn; chưa có đủ assertion cho toàn bộ tổ hợp và bước của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-003` trong `execution/results.json`.

## CAT-004 — Chọn nhiều thương hiệu

- **Yêu cầu:** `CAT.FILTER`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** brandIds=B1,B2; legacy brandId=B3

**Bước thực hiện**

1. Tick B1 rồi B2.
2. Bỏ B1.
3. Mở URL legacy.

**Kết quả mong đợi:** URL dùng brandIds, không giữ brandId cũ sau chỉnh; thêm/bỏ đúng ID, các filter khác được giữ; legacy brandId vẫn đọc được.

**Nguồn truy vết:** [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/products/components/catalog-workspace.tsx:32](../../../src/features/products/components/catalog-workspace.tsx#L32), [src/features/products/components/catalog-filters.tsx:32](../../../src/features/products/components/catalog-filters.tsx#L32).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/schemas/product-catalog.schema.test.ts, src/features/products/components/catalog-workspace.test.tsx.

**Thực thi:** Pass. Các assertion kiểm tra filter URL, multi-select, search/collapse, clear và contract/tree tương ứng đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-004` trong `execution/results.json`.

## CAT-005 — Ưu tiên brandIds so với legacy

- **Yêu cầu:** `CAT.FILTER`
- **Ưu tiên / loại / mức:** P1 / Contract / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** brandIds=B1,B2; brandId=B3

**Bước thực hiện**

1. Mở URL chứa cả hai.
2. Xem lựa chọn và API.

**Kết quả mong đợi:** Danh sách brandIds hợp lệ được ưu tiên; legacy chỉ fallback khi brandIds không còn ID hợp lệ.

**Nguồn truy vết:** [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/products/components/catalog-workspace.tsx:32](../../../src/features/products/components/catalog-workspace.tsx#L32), [src/features/products/components/catalog-filters.tsx:32](../../../src/features/products/components/catalog-filters.tsx#L32).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/schemas/product-catalog.schema.test.ts, src/features/products/components/catalog-workspace.test.tsx.

**Thực thi:** Pass. Các assertion kiểm tra filter URL, multi-select, search/collapse, clear và contract/tree tương ứng đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-005` trong `execution/results.json`.

## CAT-006 — Brand search và xem thêm

- **Yêu cầu:** `CAT.FILTER`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 7 brands; brand thứ 7=Hidden Brand

**Bước thực hiện**

1. Quan sát ban đầu.
2. See more/less.
3. Search " hidden ".

**Kết quả mong đợi:** Ban đầu 5 checkbox; expand đủ 7; search trim không phân biệt hoa thường tìm cả item ngoài 5; không thay lựa chọn.

**Nguồn truy vết:** [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/products/components/catalog-workspace.tsx:32](../../../src/features/products/components/catalog-workspace.tsx#L32), [src/features/products/components/catalog-filters.tsx:32](../../../src/features/products/components/catalog-filters.tsx#L32).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/schemas/product-catalog.schema.test.ts, src/features/products/components/catalog-workspace.test.tsx.

**Thực thi:** Pass. Các assertion kiểm tra filter URL, multi-select, search/collapse, clear và contract/tree tương ứng đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-006` trong `execution/results.json`.

## CAT-007 — Brand collapse độc lập

- **Yêu cầu:** `CAT.FILTER`
- **Ưu tiên / loại / mức:** P2 / Accessibility / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** B1 đã tick

**Bước thực hiện**

1. Thu gọn brand.
2. Thao tác origin.
3. Mở lại brand.

**Kết quả mong đợi:** Brand selection giữ nguyên, origin không bị reset; aria-expanded phản ánh mở/đóng.

**Nguồn truy vết:** [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/products/components/catalog-workspace.tsx:32](../../../src/features/products/components/catalog-workspace.tsx#L32), [src/features/products/components/catalog-filters.tsx:32](../../../src/features/products/components/catalog-filters.tsx#L32).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/schemas/product-catalog.schema.test.ts, src/features/products/components/catalog-workspace.test.tsx.

**Thực thi:** Pass. Các assertion kiểm tra filter URL, multi-select, search/collapse, clear và contract/tree tương ứng đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-007` trong `execution/results.json`.

## CAT-008 — Chọn nhiều và bỏ origin cuối

- **Yêu cầu:** `CAT.ORIGIN`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Singapore, New Zealand; brand/category/sort/page=3

**Bước thực hiện**

1. Tick hai origin.
2. Bỏ lần lượt.

**Kết quả mong đợi:** origins comma-separated trong URL; giữ tên có khoảng trắng; reset page; bỏ lựa chọn cuối xóa tham số; giữ brand/category/sort.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/products/components/catalog-origin-filter.tsx:20](../../../src/features/products/components/catalog-origin-filter.tsx#L20).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-catalog.schema.test.ts.

**Thực thi:** Pass. Các assertion kiểm tra filter URL, multi-select, search/collapse, clear và contract/tree tương ứng đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-008` trong `execution/results.json`.

## CAT-009 — Search, expand, collapse

- **Yêu cầu:** `CAT.ORIGIN`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 7 origins; query không khớp và query item thứ 7

**Bước thực hiện**

1. See more/less.
2. Search.
3. Collapse/reopen.

**Kết quả mong đợi:** Ban đầu 5; search cả danh sách; phân biệt no matches và API rỗng; selection không mất.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/products/components/catalog-origin-filter.tsx:20](../../../src/features/products/components/catalog-origin-filter.tsx#L20).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-catalog.schema.test.ts.

**Thực thi:** Pass. Các assertion kiểm tra filter URL, multi-select, search/collapse, clear và contract/tree tương ứng đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-009` trong `execution/results.json`.

## CAT-010 — Loại origin trùng từ API

- **Yêu cầu:** `CAT.ORIGIN`
- **Ưu tiên / loại / mức:** P1 / Contract / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** ["SG","DE","SG"]

**Bước thực hiện**

1. Tải origins.
2. Đếm checkbox.

**Kết quả mong đợi:** Mỗi string giống hệt chỉ xuất hiện một lần; response không phải mảng string bị reject.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/products/components/catalog-origin-filter.tsx:20](../../../src/features/products/components/catalog-origin-filter.tsx#L20).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-catalog.schema.test.ts.

**Thực thi:** Pass. Các assertion kiểm tra filter URL, multi-select, search/collapse, clear và contract/tree tương ứng đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-010` trong `execution/results.json`.

## CAT-011 — Sắp xếp danh sách

- **Yêu cầu:** `CAT.SORT`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** sort=name và price-desc; page=3

**Bước thực hiện**

1. Đổi sort.
2. Kiểm tra URL/API và kết quả.

**Kết quả mong đợi:** Reset page đầu; gửi Sort đúng casing và giá trị; UI khớp thứ tự API; không tự sort giá format ở client.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/components/catalog-workspace.tsx:32](../../../src/features/products/components/catalog-workspace.tsx#L32), [src/features/categories/server.ts:6](../../../src/features/categories/server.ts#L6).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/components/catalog-workspace.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-011` trong `execution/results.json`.

## CAT-012 — Filter URL sai và lặp

- **Yêu cầu:** `CAT.URL`
- **Ưu tiên / loại / mức:** P1 / Contract / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** brandIds=B1,B1,bad; categoryId=bad; origins= SG,SG,,New Zealand

**Bước thực hiện**

1. Mở URL.
2. So request.

**Kết quả mong đợi:** Deduplicate/trim; bỏ GUID sai; giữ tên origin có khoảng trắng; dùng giá trị đầu nếu search param lặp.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/categories/server.ts:6](../../../src/features/categories/server.ts#L6).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-catalog.schema.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã chạy load/contract/error/filter có sẵn; chưa có đủ assertion cho toàn bộ tổ hợp và bước của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-012` trong `execution/results.json`.

## CAT-013 — Page không hợp lệ: 0

- **Yêu cầu:** `CAT.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** page=0

**Bước thực hiện**

1. Mở /products với query.
2. Đọc request products.

**Kết quả mong đợi:** Fallback page=1; không crash hoặc gửi page sai.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/categories/server.ts:6](../../../src/features/categories/server.ts#L6).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-catalog.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-013` trong `execution/results.json`.

## CAT-014 — Page không hợp lệ: -1

- **Yêu cầu:** `CAT.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** page=-1

**Bước thực hiện**

1. Mở /products với query.
2. Đọc request products.

**Kết quả mong đợi:** Fallback page=1; không crash hoặc gửi page sai.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/categories/server.ts:6](../../../src/features/categories/server.ts#L6).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-catalog.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-014` trong `execution/results.json`.

## CAT-015 — Page không hợp lệ: 1.5

- **Yêu cầu:** `CAT.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** page=1.5

**Bước thực hiện**

1. Mở /products với query.
2. Đọc request products.

**Kết quả mong đợi:** Fallback page=1; không crash hoặc gửi page sai.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/categories/server.ts:6](../../../src/features/categories/server.ts#L6).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-catalog.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-015` trong `execution/results.json`.

## CAT-016 — Page không hợp lệ: abc

- **Yêu cầu:** `CAT.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** page=abc

**Bước thực hiện**

1. Mở /products với query.
2. Đọc request products.

**Kết quả mong đợi:** Fallback page=1; không crash hoặc gửi page sai.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/categories/server.ts:6](../../../src/features/categories/server.ts#L6).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-catalog.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-016` trong `execution/results.json`.

## CAT-017 — Page không hợp lệ: 100001

- **Yêu cầu:** `CAT.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Unit + Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** page=100001

**Bước thực hiện**

1. Mở /products với query.
2. Đọc request products.

**Kết quả mong đợi:** Fallback page=1; không crash hoặc gửi page sai.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/categories/server.ts:6](../../../src/features/categories/server.ts#L6).

**Automation:** Đề xuất Unit + Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-catalog.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-017` trong `execution/results.json`.

## CAT-018 — Biên page hợp lệ

- **Yêu cầu:** `CAT.URL`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** page=100000; sort=unsupported

**Bước thực hiện**

1. Parse URL.
2. Quan sát danh sách trang ngoài range.

**Kết quả mong đợi:** Schema giữ page=100000, sort về featured. UI xử lý trang vượt total có no matches; chính sách redirect/clamp ngoài total cần PO xác nhận.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/categories/server.ts:6](../../../src/features/categories/server.ts#L6).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-catalog.schema.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-018` trong `execution/results.json`.

## CAT-019 — Casing filter API

- **Yêu cầu:** `CAT.API`
- **Ưu tiên / loại / mức:** P1 / Contract / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** brandIds=B1; categoryId=C1; origins=SG,DE; sort=name; flags false

**Bước thực hiện**

1. Gọi service với toàn bộ tham số.
2. Đọc URL request.

**Kết quả mong đợi:** Tên API đúng: brandIds, CategoryIds, Origins, Sort, IsNew, IsOutstanding, page, pageSize; false không bị bỏ; mảng rỗng không gửi.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/categories/server.ts:6](../../../src/features/categories/server.ts#L6), [src/features/brands/server.ts:8](../../../src/features/brands/server.ts#L8).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/categories/server.test.ts.

**Thực thi:** Pass. Các assertion kiểm tra filter URL, multi-select, search/collapse, clear và contract/tree tương ứng đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-019` trong `execution/results.json`.

## CAT-020 — Đổi category giữ filter

- **Yêu cầu:** `CAT.NAV`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** brandIds, origins, sort, page=3

**Bước thực hiện**

1. Click category strip.
2. Mở child category.

**Kết quả mong đợi:** Đi route slug mới; bỏ page/categoryId query; giữ brandIds/origins/sort; category route luôn quyết định CategoryIds.

**Nguồn truy vết:** [src/features/products/components/catalog-workspace.tsx:32](../../../src/features/products/components/catalog-workspace.tsx#L32), [src/features/products/components/category-strip.tsx:21](../../../src/features/products/components/category-strip.tsx#L21).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/catalog-workspace.test.tsx, src/features/products/components/category-strip.test.tsx.

**Thực thi:** Pass. Các assertion kiểm tra filter URL, multi-select, search/collapse, clear và contract/tree tương ứng đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-020` trong `execution/results.json`.

## CAT-021 — Clear trên catalog và category

- **Yêu cầu:** `CAT.NAV`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Filter đủ; category hiện tại có child

**Bước thực hiện**

1. Clear ở /products.
2. Clear ở category route.

**Kết quả mong đợi:** Catalog xóa brandId/brandIds/categoryId/origins/sort/page; category route chuyển /products.

**Nguồn truy vết:** [src/features/products/components/catalog-workspace.tsx:32](../../../src/features/products/components/catalog-workspace.tsx#L32), [src/features/products/components/category-strip.tsx:21](../../../src/features/products/components/category-strip.tsx#L21).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/catalog-workspace.test.tsx, src/features/products/components/category-strip.test.tsx.

**Thực thi:** Pass. Các assertion kiểm tra filter URL, multi-select, search/collapse, clear và contract/tree tương ứng đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-021` trong `execution/results.json`.

## CAT-022 — Cây category, ảnh và thứ tự

- **Yêu cầu:** `CAT.CATEGORY`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Cây 3 cấp; sortOrder trùng; ảnh primary/non-primary

**Bước thực hiện**

1. Tải catalog/category.
2. So cây flatten.

**Kết quả mong đợi:** Giữ depth và sort theo order/name; ưu tiên ảnh primary, fallback ảnh sort nhỏ nhất; category page chỉ hiện child trực tiếp.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/products/category/[slug]/page.tsx:25](../../../src/app/%5Blocale%5D/%28marketing%29/products/category/%5Bslug%5D/page.tsx#L25), [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/components/category-strip.tsx:21](../../../src/features/products/components/category-strip.tsx#L21).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/components/category-strip.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã chạy load/contract/error/filter có sẵn; chưa có đủ assertion cho toàn bộ tổ hợp và bước của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-022` trong `execution/results.json`.

## CAT-023 — Count có sẵn và thiếu

- **Yêu cầu:** `CAT.CATEGORY`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** C1 count=0; C2 thiếu; count request C2=500

**Bước thực hiện**

1. Tải strip.
2. Kiểm tra count request.

**Kết quả mong đợi:** Count 0 được hiển thị là 0 và không fetch lại; chỉ fetch thiếu; lỗi count hiển thị unavailable, vẫn điều hướng được.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/products/category/[slug]/page.tsx:25](../../../src/app/%5Blocale%5D/%28marketing%29/products/category/%5Bslug%5D/page.tsx#L25), [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/components/category-strip.tsx:21](../../../src/features/products/components/category-strip.tsx#L21).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/components/category-strip.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã chạy load/contract/error/filter có sẵn; chưa có đủ assertion cho toàn bộ tổ hợp và bước của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-023` trong `execution/results.json`.

## CAT-024 — Slug category không tồn tại

- **Yêu cầu:** `CAT.CATEGORY`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** /products/category/no-such-category

**Bước thực hiện**

1. Truy cập trực tiếp route.

**Kết quả mong đợi:** Not Found; không tự hiển thị tất cả sản phẩm dưới title category giả.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/products/category/[slug]/page.tsx:25](../../../src/app/%5Blocale%5D/%28marketing%29/products/category/%5Bslug%5D/page.tsx#L25), [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/components/category-strip.tsx:21](../../../src/features/products/components/category-strip.tsx#L21).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/components/category-strip.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-024` trong `execution/results.json`.

## CAT-025 — Cây phẳng có parent lỗi hoặc cycle

- **Yêu cầu:** `CAT.CATEGORY`
- **Ưu tiên / loại / mức:** P1 / Functional / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Active child với inactive/missing parent; A->B->A

**Bước thực hiện**

1. Gọi buildCategoryTree.
2. Duyệt output.

**Kết quả mong đợi:** Bỏ inactive node; child không có active parent thành root; cycle không tạo recursion vô hạn; thứ tự ổn định.

**Nguồn truy vết:** [src/features/categories/utils/build-category-tree.ts:3](../../../src/features/categories/utils/build-category-tree.ts#L3).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/features/categories/utils/build-category-tree.test.ts.

**Thực thi:** Pass. Các assertion kiểm tra filter URL, multi-select, search/collapse, clear và contract/tree tương ứng đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-025` trong `execution/results.json`.

## CAT-026 — Schema response malformed

- **Yêu cầu:** `CAT.SCHEMA`
- **Ưu tiên / loại / mức:** P1 / Contract / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** GUID sai, total âm, pageSize=0, nested children sai

**Bước thực hiện**

1. Gửi từng fixture sai vào server boundary.

**Kết quả mong đợi:** Zod reject trước render; route áp dụng error/fallback tương ứng; không hiển thị số giả.

**Nguồn truy vết:** [src/features/products/server.ts:19](../../../src/features/products/server.ts#L19), [src/features/products/schemas/product-catalog.schema.ts:5](../../../src/features/products/schemas/product-catalog.schema.ts#L5), [src/features/categories/server.ts:6](../../../src/features/categories/server.ts#L6).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/features/products/server.test.ts, src/features/products/schemas/product-catalog.schema.test.ts.

**Thực thi:** Pass. Các assertion kiểm tra filter URL, multi-select, search/collapse, clear và contract/tree tương ứng đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-026` trong `execution/results.json`.

## CAT-027 — Điều hướng nhanh trong khi request chậm

- **Yêu cầu:** `CAT.NAV`
- **Ưu tiên / loại / mức:** P1 / Concurrency / Browser
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Brand change A; response A chậm hơn B

**Bước thực hiện**

1. Thay filter liên tiếp.
2. Điều khiển response đảo thứ tự.

**Kết quả mong đợi:** URL và danh sách cuối khớp lựa chọn mới nhất; không ghi đè kết quả B bằng A; control có trạng thái pending.

**Nguồn truy vết:** [src/features/products/components/catalog-workspace.tsx:32](../../../src/features/products/components/catalog-workspace.tsx#L32), [src/features/products/components/category-strip.tsx:21](../../../src/features/products/components/category-strip.tsx#L21).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/catalog-workspace.test.tsx, src/features/products/components/category-strip.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-027` trong `execution/results.json`.

## CAT-028 — Trang đầu, giữa, cuối và ellipsis

- **Yêu cầu:** `CAT.PAGING`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** total=201; pageSize=20; page=1,6,11

**Bước thực hiện**

1. Duyệt trang và Previous/Next.
2. Kiểm tra link bằng keyboard.

**Kết quả mong đợi:** Previous disabled ở đầu, Next disabled cuối; ellipsis không là link; aria-current một trang; link giữ filters.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/products/page.tsx:18](../../../src/app/%5Blocale%5D/%28marketing%29/products/page.tsx#L18), [src/features/products/components/catalog-workspace.tsx:32](../../../src/features/products/components/catalog-workspace.tsx#L32).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/products/components/catalog-workspace.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-028` trong `execution/results.json`.

## CAT-029 — Map logo và website an toàn

- **Yêu cầu:** `CAT.BRAND`
- **Ưu tiên / loại / mức:** P1 / Contract / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** isTopBrand true/false; logo null/public/path/http; website javascript:

**Bước thực hiện**

1. Gọi getTopBrands/mapPublicBrand.
2. Kiểm tra output.

**Kết quả mong đợi:** Chỉ top brand có logo; chuẩn hóa media theo API origin; website chỉ HTTP(S), sai protocol thành null.

**Nguồn truy vết:** [src/features/brands/server.ts:8](../../../src/features/brands/server.ts#L8), [src/features/brands/utils/map-public-brand.ts:8](../../../src/features/brands/utils/map-public-brand.ts#L8).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/features/brands/server.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CAT-029` trong `execution/results.json`.
