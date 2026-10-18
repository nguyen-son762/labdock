# HOME — Trang chủ

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `/`. Tổng: 15 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: Guest và user A; fixture DS-HOME; có thể kiểm soát fetch và clock. Cache lạnh cho lần đo request đầu.

## HOME-001 — Tải aggregate homepage

- **Yêu cầu:** `HOME.LOAD`
- **Ưu tiên / loại / mức:** P1 / Contract / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-HOME đầy đủ

**Bước thực hiện**

1. Mở Home từ request mới.
2. Theo dõi API server.

**Kết quả mong đợi:** Một resource /homepage cấp các section Home; không gọi /products hoặc /brands để tạo section. /categories cho header vẫn được phép.

**Nguồn truy vết:** [src/features/home/server.ts:27](../../../src/features/home/server.ts#L27), [src/features/home/schemas/homepage.schema.ts:64](../../../src/features/home/schemas/homepage.schema.ts#L64).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/home/server.test.ts.

**Thực thi:** Pass. Aggregate homepage, mapping/sort/description/fallback, category link, local research logos và testimonial được kiểm chứng bằng các assertion liên quan.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-001` trong `execution/results.json`.

## HOME-002 — Không phụ thuộc topBrands

- **Yêu cầu:** `HOME.LOAD`
- **Ưu tiên / loại / mức:** P1 / Contract / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** topBrands=null hoặc object sai shape

**Bước thực hiện**

1. Giữ các field sử dụng hợp lệ.
2. Tải Home.

**Kết quả mong đợi:** Home vẫn render; 12 logo Research Leaders lấy local, không validate topBrands không sử dụng.

**Nguồn truy vết:** [src/features/home/server.ts:27](../../../src/features/home/server.ts#L27), [src/features/home/schemas/homepage.schema.ts:64](../../../src/features/home/schemas/homepage.schema.ts#L64).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/home/server.test.ts.

**Thực thi:** Pass. Aggregate homepage, mapping/sort/description/fallback, category link, local research logos và testimonial được kiểm chứng bằng các assertion liên quan.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-002` trong `execution/results.json`.

## HOME-003 — Sort và kiểu Left/Right

- **Yêu cầu:** `HOME.BANNER`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** sortOrder đảo; Left/Right; optional null

**Bước thực hiện**

1. Tải hai banner.
2. So thứ tự và độ rộng desktop.

**Kết quả mong đợi:** Sort tăng dần; Left chiếm hai cột, Right một cột; field null không tạo text null/undefined.

**Nguồn truy vết:** [src/features/home/schemas/homepage.schema.ts:64](../../../src/features/home/schemas/homepage.schema.ts#L64), [src/features/home/components/hero-section.tsx:41](../../../src/features/home/components/hero-section.tsx#L41).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/home/components/hero-section.test.tsx.

**Thực thi:** Pass. Aggregate homepage, mapping/sort/description/fallback, category link, local research logos và testimonial được kiểm chứng bằng các assertion liên quan.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-003` trong `execution/results.json`.

## HOME-004 — Điều kiện description và CTA

- **Yêu cầu:** `HOME.BANNER`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** showDescription=false/true; linkUrl và buttonLabel null

**Bước thực hiện**

1. Đổi từng cặp field.
2. Quan sát text và link.

**Kết quả mong đợi:** Description chỉ hiện khi cờ true và có nội dung; CTA chỉ khi đủ link và nhãn; các metadata date/location hiển thị khi có.

**Nguồn truy vết:** [src/features/home/schemas/homepage.schema.ts:64](../../../src/features/home/schemas/homepage.schema.ts#L64), [src/features/home/components/hero-section.tsx:41](../../../src/features/home/components/hero-section.tsx#L41).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/home/components/hero-section.test.tsx.

**Thực thi:** Pass. Aggregate homepage, mapping/sort/description/fallback, category link, local research logos và testimonial được kiểm chứng bằng các assertion liên quan.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-004` trong `execution/results.json`.

## HOME-005 — Link nội bộ, ngoài và không an toàn

- **Yêu cầu:** `HOME.BANNER`
- **Ưu tiên / loại / mức:** P1 / Security / Integration
- **Cơ sở kỳ vọng:** Security target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** /products; https://example.test; javascript:alert(1)

**Bước thực hiện**

1. Render từng link.
2. Kiểm tra hành vi click trong fixture cô lập.

**Kết quả mong đợi:** Link nội bộ giữ locale; external mở tab với rel an toàn. Scheme không an toàn phải bị từ chối, không thực thi script.

**Nguồn truy vết:** [src/features/home/schemas/homepage.schema.ts:64](../../../src/features/home/schemas/homepage.schema.ts#L64), [src/features/home/components/hero-section.tsx:41](../../../src/features/home/components/hero-section.tsx#L41).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/home/components/hero-section.test.tsx.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-005` trong `execution/results.json`.

## HOME-006 — Homepage API lỗi hoặc malformed

- **Yêu cầu:** `HOME.LOAD`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** /homepage=500; sai type banner; thiếu field bắt buộc

**Bước thực hiện**

1. Mở Home với từng response.
2. Kiểm tra section fallback.

**Kết quả mong đợi:** Đặc tả hiện tại: getHomePageData trả section rỗng; hero dùng PromoCard fallback, logo local/CTA còn hiển thị; không phát sinh request thay thế.

**Lưu ý / dependency:** Không coi fallback im lặng là đạt yêu cầu vận hành; xem HOME.LOAD ca error feedback.

**Nguồn truy vết:** [src/features/home/server.ts:27](../../../src/features/home/server.ts#L27), [src/features/home/schemas/homepage.schema.ts:64](../../../src/features/home/schemas/homepage.schema.ts#L64).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/home/server.test.ts.

**Thực thi:** Pass. Aggregate homepage, mapping/sort/description/fallback, category link, local research logos và testimonial được kiểm chứng bằng các assertion liên quan.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-006` trong `execution/results.json`.

## HOME-007 — Error feedback cho người dùng

- **Yêu cầu:** `HOME.LOAD`
- **Ưu tiên / loại / mức:** P1 / Regression / Integration
- **Cơ sở kỳ vọng:** Existing bug (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** /homepage=500

**Bước thực hiện**

1. Mở Home lỗi.
2. Tìm trạng thái lỗi và đường retry.

**Kết quả mong đợi:** Người dùng nhận biết dữ liệu chưa tải được và có cách phục hồi; không nhận nhầm trang rỗng là không có sản phẩm.

**Lưu ý / dependency:** BUG-20261007-004 còn open; source catch trả empty.

**Nguồn truy vết:** [src/features/home/server.ts:27](../../../src/features/home/server.ts#L27), [src/features/home/schemas/homepage.schema.ts:64](../../../src/features/home/schemas/homepage.schema.ts#L64).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/home/server.test.ts.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-007` trong `execution/results.json`.

## HOME-008 — Outstanding và fallback

- **Yêu cầu:** `HOME.PRODUCTS`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** newest có/không có isOutstanding=true

**Bước thực hiện**

1. Tải từng fixture.
2. Đối chiếu hai shelf.

**Kết quả mong đợi:** Nếu có outstanding, chỉ dùng item đánh dấu; nếu không có, source dùng newestProducts làm fallback; giữ dữ liệu card đúng.

**Nguồn truy vết:** [src/features/home/server.ts:27](../../../src/features/home/server.ts#L27).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/home/server.test.ts.

**Thực thi:** Pass. Aggregate homepage, mapping/sort/description/fallback, category link, local research logos và testimonial được kiểm chứng bằng các assertion liên quan.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-008` trong `execution/results.json`.

## HOME-009 — Section rỗng độc lập

- **Yêu cầu:** `HOME.SECTIONS`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** topCategories=[]; testimonials=[]; newest=[]

**Bước thực hiện**

1. Tải từng mảng rỗng.
2. Duyệt Home.

**Kết quả mong đợi:** Không lỗi render; Top Categories và testimonial section ẩn khi rỗng; logo local vẫn đủ 12; các CTA không hỏng.

**Nguồn truy vết:** [src/features/home/server.ts:27](../../../src/features/home/server.ts#L27), [src/features/home/components/social-proof-section.tsx:8](../../../src/features/home/components/social-proof-section.tsx#L8).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/home/server.test.ts, src/features/home/components/social-proof-section.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-009` trong `execution/results.json`.

## HOME-010 — Điều hướng top category

- **Yêu cầu:** `HOME.CATEGORIES`
- **Ưu tiên / loại / mức:** P1 / Regression / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** slug=lab-equipment

**Bước thực hiện**

1. Click category ở Home.
2. Lặp tại /vi.

**Kết quả mong đợi:** Đi tới /products/category/lab-equipment, đúng locale và category; không dùng route category cũ.

**Lưu ý / dependency:** Regression BUG-20261007-002,006.

**Nguồn truy vết:** [src/features/home/server.ts:27](../../../src/features/home/server.ts#L27), [src/features/home/components/hero-section.tsx:41](../../../src/features/home/components/hero-section.tsx#L41).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/home/server.test.ts, src/features/home/components/hero-section.test.tsx.

**Thực thi:** Pass. Aggregate homepage, mapping/sort/description/fallback, category link, local research logos và testimonial được kiểm chứng bằng các assertion liên quan.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-010` trong `execution/results.json`.

## HOME-011 — Thứ tự và độc lập API

- **Yêu cầu:** `HOME.LOGOS`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 12 logo trong research-leaders.ts

**Bước thực hiện**

1. Render Home.
2. So tên, thứ tự và asset.

**Kết quả mong đợi:** 12 logo local đúng thứ tự source, alt có tên thương hiệu; không phụ thuộc brands API.

**Nguồn truy vết:** [src/features/home/components/social-proof-section.tsx:8](../../../src/features/home/components/social-proof-section.tsx#L8), [src/features/home/components/research-leaders-carousel.tsx:15](../../../src/features/home/components/research-leaders-carousel.tsx#L15).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/home/components/social-proof-section.test.tsx.

**Thực thi:** Pass. Aggregate homepage, mapping/sort/description/fallback, category link, local research logos và testimonial được kiểm chứng bằng các assertion liên quan.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-011` trong `execution/results.json`.

## HOME-012 — Mobile autoplay và điều hướng

- **Yêu cầu:** `HOME.LOGOS`
- **Ưu tiên / loại / mức:** P1 / Regression / Browser
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Viewport 390; clock 5s

**Bước thực hiện**

1. Quan sát tự chuyển sau 5s.
2. Swipe và bấm Next/Previous.
3. Quan sát chu kỳ kế tiếp.

**Kết quả mong đợi:** Tự chạy mỗi 5000ms khi có overflow; thao tác tay vẫn hoạt động; autoplay tiếp tục sau tương tác.

**Nguồn truy vết:** [src/features/home/components/research-leaders-carousel.tsx:15](../../../src/features/home/components/research-leaders-carousel.tsx#L15).

**Automation:** Đề xuất Browser | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Browser production local đã pass các bước ghi trong browser-results.json; dữ liệu là synthetic fixture.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-012` trong `execution/results.json`.

## HOME-013 — Breakpoint mobile và grid

- **Yêu cầu:** `HOME.LOGOS`
- **Ưu tiên / loại / mức:** P1 / Boundary / Browser
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 639 -> 640 -> 1024 -> 390px

**Bước thực hiện**

1. Resize qua các ngưỡng.
2. Quan sát vị trí và timer.

**Kết quả mong đợi:** Dưới 640 là carousel; từ 640 grid 3 cột và autoplay dừng; từ 1024 grid 6 cột; quay mobile tự chạy lại.

**Nguồn truy vết:** [src/features/home/components/social-proof-section.tsx:8](../../../src/features/home/components/social-proof-section.tsx#L8), [src/features/home/components/research-leaders-carousel.tsx:15](../../../src/features/home/components/research-leaders-carousel.tsx#L15).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/features/home/components/social-proof-section.test.tsx.

**Thực thi:** Pass. Browser production local đã pass các bước ghi trong browser-results.json; dữ liệu là synthetic fixture.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-013` trong `execution/results.json`.

## HOME-014 — Nội dung và rating

- **Yêu cầu:** `HOME.TESTIMONIAL`
- **Ưu tiên / loại / mức:** P2 / Accessibility / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** rating=0, 3.5, 5; avatar null

**Bước thực hiện**

1. Render từng fixture.
2. Đọc bằng screen reader.

**Kết quả mong đợi:** Hiện author/content/subtitle tùy dữ liệu; không ảnh lỗi khi avatar null; accessible rating khớp số. Kiểm tra sao thị giác không đánh lừa rating.

**Lưu ý / dependency:** Source vẽ 5 sao đầy với mọi rating; kỳ vọng sao cần PO xác nhận.

**Nguồn truy vết:** [src/features/home/components/testimonial-carousel.tsx:16](../../../src/features/home/components/testimonial-carousel.tsx#L16).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/home/components/testimonial-carousel.test.tsx.

**Thực thi:** Pass. Aggregate homepage, mapping/sort/description/fallback, category link, local research logos và testimonial được kiểm chứng bằng các assertion liên quan.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-014` trong `execution/results.json`.

## HOME-015 — Quick actions và anchor

- **Yêu cầu:** `HOME.NAV`
- **Ưu tiên / loại / mức:** P2 / Functional / Browser
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 6 quick actions; footer links

**Bước thực hiện**

1. Click từng quick action.
2. Lặp locale vi và mobile.

**Kết quả mong đợi:** Product/supplier/news cuộn đến anchor tồn tại; RFQs, orders, chat tới đúng route, không mất locale.

**Nguồn truy vết:** [src/features/home/server.ts:27](../../../src/features/home/server.ts#L27), [src/features/home/schemas/homepage.schema.ts:64](../../../src/features/home/schemas/homepage.schema.ts#L64), [src/features/home/components/hero-section.tsx:41](../../../src/features/home/components/hero-section.tsx#L41).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/features/home/server.test.ts, src/features/home/components/hero-section.test.tsx.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `HOME-015` trong `execution/results.json`.
