# SEO — Metadata và khả năng index

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `Public routes; robots.txt; sitemap.xml`. Tổng: 8 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: Production-like origin sandbox hợp lệ; HTML server và sitemap có thể đọc; fixture public/private products; không gửi submit search engine thật.

## SEO-001 — Canonical và language alternates

- **Yêu cầu:** `SEO.META`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Home/products/category/PDP/news/about/contact/legal; en/vi

**Bước thực hiện**

1. Đọc head HTML từng route.
2. So canonical/alternates.

**Kết quả mong đợi:** Canonical tuyệt đối đúng route và locale; en/vi/x-default khớp; title/description có nội dung phù hợp, không kế thừa Home cho detail.

**Nguồn truy vết:** [src/app/sitemap.ts:1](../../../src/app/sitemap.ts#L1), [src/app/robots.ts:1](../../../src/app/robots.ts#L1), [src/app/[locale]/layout.tsx:17](../../../src/app/%5Blocale%5D/layout.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/app/sitemap.test.ts.

**Thực thi:** Pass. Locale URL/fragment, message contract, canonical/hreflang và PDP metadata/JSON-LD có assertion trực tiếp đã pass. Browser bổ sung SSR lang và link vi.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SEO-001` trong `execution/results.json`.

## SEO-002 — Noindex private và auth

- **Yêu cầu:** `SEO.PRIVATE`
- **Ưu tiên / loại / mức:** P1 / Security / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** cart,checkout,payment,orders,rfqs,profile,dashboard,login,signup,forgot-password,quote/success

**Bước thực hiện**

1. Đọc robots meta.
2. Đọc robots.txt.

**Kết quả mong đợi:** Private routes noindex/nofollow theo source, robots disallow cả en/vi. Robots không được xem là cơ chế authorization.

**Nguồn truy vết:** [src/app/sitemap.ts:1](../../../src/app/sitemap.ts#L1), [src/app/robots.ts:1](../../../src/app/robots.ts#L1), [src/app/[locale]/layout.tsx:17](../../../src/app/%5Blocale%5D/layout.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/app/sitemap.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SEO-002` trong `execution/results.json`.

## SEO-003 — URL sitemap unique và thật

- **Yêu cầu:** `SEO.SITEMAP`
- **Ưu tiên / loại / mức:** P1 / Regression / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Mọi entry sitemap

**Bước thực hiện**

1. Parse XML.
2. Fetch sample và mọi product entry khi kiểm tra release.

**Kết quả mong đợi:** URL unique, canonical200, đúng locale, không private route; product id demo trong sitemap phải resolve được tới detail API/slug thật.

**Lưu ý / dependency:** Sitemap hiện lấy products-data local trong khi PDP đọc API theo slug.

**Nguồn truy vết:** [src/app/sitemap.ts:1](../../../src/app/sitemap.ts#L1), [src/app/robots.ts:1](../../../src/app/robots.ts#L1), [src/app/[locale]/layout.tsx:17](../../../src/app/%5Blocale%5D/layout.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/app/sitemap.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SEO-003` trong `execution/results.json`.

## SEO-004 — LastModified và locale links

- **Yêu cầu:** `SEO.SITEMAP`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** News local có publishedAt; product không timestamp

**Bước thực hiện**

1. So sitemap với source.

**Kết quả mong đợi:** Chỉ lastModified có bằng chứng (news date); không gắn now cho mọi URL; language URLs absolute và không trùng.

**Nguồn truy vết:** [src/app/sitemap.ts:1](../../../src/app/sitemap.ts#L1), [src/app/robots.ts:1](../../../src/app/robots.ts#L1), [src/app/[locale]/layout.tsx:17](../../../src/app/%5Blocale%5D/layout.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/app/sitemap.test.ts.

**Thực thi:** Pass. Locale URL/fragment, message contract, canonical/hreflang và PDP metadata/JSON-LD có assertion trực tiếp đã pass. Browser bổ sung SSR lang và link vi.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SEO-004` trong `execution/results.json`.

## SEO-005 — Product offer khớp giá người dùng thấy

- **Yêu cầu:** `SEO.JSONLD`
- **Ưu tiên / loại / mức:** P1 / Regression / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** unitPrice1250,promo25%; hidden/null price

**Bước thực hiện**

1. Đọc JSON-LD và UI PDP.
2. So giá,currency,stock.

**Kết quả mong đợi:** Offer dùng giá bán thực937.50 khi có promotion; không xuất price null hoặc giá ẩn; availability đúng variant đang đại diện.

**Lưu ý / dependency:** Source JSON-LD đang dùng variant.unitPrice, UI dùng promotional price.

**Nguồn truy vết:** [src/app/sitemap.ts:1](../../../src/app/sitemap.ts#L1), [src/app/robots.ts:1](../../../src/app/robots.ts#L1), [src/app/[locale]/layout.tsx:17](../../../src/app/%5Blocale%5D/layout.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/app/sitemap.test.ts.

**Thực thi:** Pass. Locale URL/fragment, message contract, canonical/hreflang và PDP metadata/JSON-LD có assertion trực tiếp đã pass. Browser bổ sung SSR lang và link vi.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SEO-005` trong `execution/results.json`.

## SEO-006 — Escape và nội dung structured data

- **Yêu cầu:** `SEO.JSONLD`
- **Ưu tiên / loại / mức:** P1 / Security / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Name/title có </script><script>…; Organization/NewsArticle

**Bước thực hiện**

1. Render fixture string độc hại.
2. Parse script JSON-LD.

**Kết quả mong đợi:** JSON hợp lệ, < được escape; không tạo script executable; tên/url/date/image đúng dữ liệu hiển thị.

**Nguồn truy vết:** [src/app/sitemap.ts:1](../../../src/app/sitemap.ts#L1), [src/app/robots.ts:1](../../../src/app/robots.ts#L1), [src/app/[locale]/layout.tsx:17](../../../src/app/%5Blocale%5D/layout.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/app/sitemap.test.ts.

**Thực thi:** Pass. Locale URL/fragment, message contract, canonical/hreflang và PDP metadata/JSON-LD có assertion trực tiếp đã pass. Browser bổ sung SSR lang và link vi.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SEO-006` trong `execution/results.json`.

## SEO-007 — OG ảnh và URL theo locale

- **Yêu cầu:** `SEO.OG`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** PDP media tuyệt đối, news hero fallback

**Bước thực hiện**

1. Đọc OG cho en/vi.
2. Kiểm tra asset URL.

**Kết quả mong đợi:** OG image truy cập được, alt đúng, type article/news và publishedTime đúng; locale en_SG/vi_VN theo source.

**Nguồn truy vết:** [src/app/sitemap.ts:1](../../../src/app/sitemap.ts#L1), [src/app/robots.ts:1](../../../src/app/robots.ts#L1), [src/app/[locale]/layout.tsx:17](../../../src/app/%5Blocale%5D/layout.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/app/sitemap.test.ts.

**Thực thi:** Pass. Locale URL/fragment, message contract, canonical/hreflang và PDP metadata/JSON-LD có assertion trực tiếp đã pass. Browser bổ sung SSR lang và link vi.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SEO-007` trong `execution/results.json`.

## SEO-008 — Public content trước JavaScript

- **Yêu cầu:** `SEO.RENDER`
- **Ưu tiên / loại / mức:** P2 / Functional / Browser
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Disable JS; Home/catalog/PDP/news

**Bước thực hiện**

1. Load route không JS.
2. Đọc content/text/link.

**Kết quả mong đợi:** Content chính, metadata và link có trong HTML server; tương tác client không được dùng để khẳng định nội dung indexable.

**Nguồn truy vết:** [src/app/sitemap.ts:1](../../../src/app/sitemap.ts#L1), [src/app/robots.ts:1](../../../src/app/robots.ts#L1), [src/app/[locale]/layout.tsx:17](../../../src/app/%5Blocale%5D/layout.tsx#L17).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/app/sitemap.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `SEO-008` trong `execution/results.json`.
