# UI — Thành phần dùng chung và carousel

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `Header/footer; CountrySelect; UI primitives; mọi carousel`. Tổng: 24 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: Browser thật ở 320/390/768/1280/1440; keyboard và screen reader khi nêu; UI fixture riêng với đúng providers; clock kiểm soát ở automation.

## UI-001 — Header guest và user

- **Yêu cầu:** `UI.HEADER`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Guest,sessionA, profile loading/error

**Bước thực hiện**

1. Mở Home và auth route.
2. Chuyển session state.

**Kết quả mong đợi:** Guest link login; có profile thì fullName/email đúng; menu không suy ra auth chỉ từ pathname; không hiển thị tên người khác khi query lỗi.

**Nguồn truy vết:** [src/components/layout/main-header.tsx:45](../../../src/components/layout/main-header.tsx#L45).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/components/layout/main-header.test.tsx.

**Thực thi:** Pass. Account/header hover và shared country contract (249 ISO, search/value format/shared code/focus/disabled/fallback) đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-001` trong `execution/results.json`.

## UI-002 — Hover delay và đóng menu

- **Yêu cầu:** `UI.CATEGORY`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Cây3 cấp

**Bước thực hiện**

1. Hover trigger dưới200ms rồi rời.
2. Hover>=200ms.
3. Di chuyển vào panel rồi rời350ms.

**Kết quả mong đợi:** Không mở nhầm hover ngắn; không đóng khi sang panel; đóng sau delay và reset path; timer cleanup khi unmount.

**Nguồn truy vết:** [src/components/layout/category-popover.tsx:38](../../../src/components/layout/category-popover.tsx#L38).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Account/header hover và shared country contract (249 ISO, search/value format/shared code/focus/disabled/fallback) đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-002` trong `execution/results.json`.

## UI-003 — Menu keyboard/touch và lỗi

- **Yêu cầu:** `UI.CATEGORY`
- **Ưu tiên / loại / mức:** P2 / Accessibility / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Enter trigger; focus child; disclosure; empty/loading/error

**Bước thực hiện**

1. Mở bằng keyboard/touch.
2. Đi tới cấp3.
3. Escape, click ngoài.
4. Lặp resource lỗi.

**Kết quả mong đợi:** Disclosure aria-expanded; link và expand tách được; không buộc hover; Escape restore focus; các state thông báo khác nhau.

**Nguồn truy vết:** [src/components/layout/category-popover.tsx:38](../../../src/components/layout/category-popover.tsx#L38).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. MỘT PHẦN: Có assertion keyboard, accessible labels và modal pending; chưa audit đầy đủ menu/form/dialog trong toàn ứng dụng.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-003` trong `execution/results.json`.

## UI-004 — Đủ249 quốc gia và mã gọi

- **Yêu cầu:** `UI.COUNTRY`
- **Ưu tiên / loại / mức:** P1 / Contract / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** countries/callingCodes; flag dataset261 entries

**Bước thực hiện**

1. Kiểm tra mapping toàn bộ data.
2. Mở CountrySelect.

**Kết quả mong đợi:** 249 ISO country duy nhất có dial code; không nhân bản quốc gia do261 flag; sửa identity dựa filename flag như source.

**Nguồn truy vết:** [src/components/shared/country-select.tsx:24](../../../src/components/shared/country-select.tsx#L24), [src/constants/country-options.ts:20](../../../src/constants/country-options.ts#L20).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/components/shared/country-select.test.tsx.

**Thực thi:** Pass. Account/header hover và shared country contract (249 ISO, search/value format/shared code/focus/disabled/fallback) đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-004` trong `execution/results.json`.

## UI-005 — Search tên, ISO, dấu và calling code

- **Yêu cầu:** `UI.COUNTRY`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** vietnam,VN,+84, Việt Nam alias khi có; Åland/Aland

**Bước thực hiện**

1. Search từng từ.
2. Chọn item từ keyboard.

**Kết quả mong đợi:** Tìm theo name/code/dialCode/aliases; trim và bỏ dấu; chỉ alias có trong dataset mới phải match; chọn đúng country.

**Nguồn truy vết:** [src/components/shared/country-select.tsx:24](../../../src/components/shared/country-select.tsx#L24), [src/constants/country-options.ts:20](../../../src/constants/country-options.ts#L20).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/components/shared/country-select.test.tsx.

**Thực thi:** Pass. Account/header hover và shared country contract (249 ISO, search/value format/shared code/focus/disabled/fallback) đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-005` trong `execution/results.json`.

## UI-006 — Các value format

- **Yêu cầu:** `UI.COUNTRY`
- **Ưu tiên / loại / mức:** P1 / Contract / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** code,name,dialCode,dialDigits

**Bước thực hiện**

1. Render cùng chọn Vietnam với từng format.
2. Submit form.

**Kết quả mong đợi:** Value lần lượt VN,Vietnam,+84,84; display calling code không thay định dạng gửi của form.

**Nguồn truy vết:** [src/components/shared/country-select.tsx:24](../../../src/components/shared/country-select.tsx#L24), [src/constants/country-options.ts:20](../../../src/constants/country-options.ts#L20).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/components/shared/country-select.test.tsx.

**Thực thi:** Pass. Account/header hover và shared country contract (249 ISO, search/value format/shared code/focus/disabled/fallback) đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-006` trong `execution/results.json`.

## UI-007 — Mã gọi dùng chung nhiều nước

- **Yêu cầu:** `UI.COUNTRY`
- **Ưu tiên / loại / mức:** P1 / Regression / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** US/CA cùng+1

**Bước thực hiện**

1. Chọn CA ở dialCode mode.
2. Đóng/mở menu.

**Kết quả mong đợi:** Giữ flag CA do chosenCode, không tự nhảy US; giá trị vẫn+1; không duplicate khi re-render.

**Nguồn truy vết:** [src/components/shared/country-select.tsx:24](../../../src/components/shared/country-select.tsx#L24), [src/constants/country-options.ts:20](../../../src/constants/country-options.ts#L20).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/components/shared/country-select.test.tsx.

**Thực thi:** Pass. Account/header hover và shared country contract (249 ISO, search/value format/shared code/focus/disabled/fallback) đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-007` trong `execution/results.json`.

## UI-008 — Stored name/code và value không biết

- **Yêu cầu:** `UI.COUNTRY`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** " singapore ", "vn", unknown

**Bước thực hiện**

1. Prefill profile.
2. Mở và đổi lựa chọn.

**Kết quả mong đợi:** Known alias/code resolve được; unknown giữ text/fallback không crash; chọn mới trả format đúng.

**Nguồn truy vết:** [src/components/shared/country-select.tsx:24](../../../src/components/shared/country-select.tsx#L24), [src/constants/country-options.ts:20](../../../src/constants/country-options.ts#L20).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/components/shared/country-select.test.tsx.

**Thực thi:** Pass. Account/header hover và shared country contract (249 ISO, search/value format/shared code/focus/disabled/fallback) đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-008` trong `execution/results.json`.

## UI-009 — Allowed countries và flag lỗi

- **Yêu cầu:** `UI.COUNTRY`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** SG/MY/VN; flag404; offline external flag host

**Bước thực hiện**

1. Mở picker hạn chế.
2. Cho ảnh flag lỗi.

**Kết quả mong đợi:** Chỉ hiện allowed ISO countries; ảnh lỗi fallback ISO, tên không mất; không cần remote flags để chọn quốc gia.

**Nguồn truy vết:** [src/components/shared/country-select.tsx:24](../../../src/components/shared/country-select.tsx#L24), [src/constants/country-options.ts:20](../../../src/constants/country-options.ts#L20).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/components/shared/country-select.test.tsx.

**Thực thi:** Pass. Account/header hover và shared country contract (249 ISO, search/value format/shared code/focus/disabled/fallback) đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-009` trong `execution/results.json`.

## UI-010 — Keyboard, Escape và disabled

- **Yêu cầu:** `UI.COUNTRY`
- **Ưu tiên / loại / mức:** P2 / Accessibility / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Chưa chọn country; query no-match

**Bước thực hiện**

1. ArrowDown mở.
2. Gõ tìm, chọn bằng Enter.
3. Escape/hủy.
4. Thử disabled.

**Kết quả mong đợi:** Search tự focus; empty status; selection cũ giữ khi dismiss; restore focus trigger; disabled không mở.

**Nguồn truy vết:** [src/components/shared/country-select.tsx:24](../../../src/components/shared/country-select.tsx#L24), [src/constants/country-options.ts:20](../../../src/constants/country-options.ts#L20).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/components/shared/country-select.test.tsx.

**Thực thi:** Pass. Account/header hover và shared country contract (249 ISO, search/value format/shared code/focus/disabled/fallback) đã pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-010` trong `execution/results.json`.

## UI-011 — Catalog search phải có hành vi thực

- **Yêu cầu:** `UI.HEADER`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Existing bug (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Product name/SKU/CAS và query không khớp

**Bước thực hiện**

1. Gõ query.
2. Click Search và Enter.

**Kết quả mong đợi:** Sau khi có backend contract: điều hướng kết quả, loading/empty/error đúng query. Hiện hành vi tìm kiếm chưa được triển khai.

**Lưu ý / dependency:** BUG-20261007-008 blocked: chưa có search param/endpoint; không tự tạo query không được backend dùng.

**Nguồn truy vết:** [src/components/layout/main-header.tsx:45](../../../src/components/layout/main-header.tsx#L45).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/components/layout/main-header.test.tsx.

**Thực thi:** Blocked. Cần chốt nội dung/locale hoặc contract hành vi: event tĩnh đã cũ, legal còn tiếng Anh, API/schema errors còn text cố định, search/seller/currency/social có phần chưa được nối xử lý. Không tự tạo chính sách hay API chưa có.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-011` trong `execution/results.json`.

## UI-012 — Nút seller và currency

- **Yêu cầu:** `UI.HEADER`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Decision required (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Sell with us và SGD selector

**Bước thực hiện**

1. Click từng control.
2. Kiểm tra hành động.

**Kết quả mong đợi:** Cần PO xác nhận destination và hỗ trợ currency; không coi nút không handler là chức năng hoàn chỉnh.

**Nguồn truy vết:** [src/components/layout/main-header.tsx:45](../../../src/components/layout/main-header.tsx#L45).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/components/layout/main-header.test.tsx.

**Thực thi:** Blocked. Cần chốt nội dung/locale hoặc contract hành vi: event tĩnh đã cũ, legal còn tiếng Anh, API/schema errors còn text cố định, search/seller/currency/social có phần chưa được nối xử lý. Không tự tạo chính sách hay API chưa có.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-012` trong `execution/results.json`.

## UI-013 — Link và liên hệ footer

- **Yêu cầu:** `UI.FOOTER`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Mọi link footer, social #, tel/mailto

**Bước thực hiện**

1. Click links trong môi trường test không gửi message.
2. So target/label.

**Kết quả mong đợi:** Link nội bộ đến route/anchor có thật; tel/mailto đúng; social có URL thật và accessible name khớp biểu tượng. Placeholder # cần sửa/PO xác nhận.

**Nguồn truy vết:** [src/components/shared/site-footer.tsx:42](../../../src/components/shared/site-footer.tsx#L42).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Cần chốt nội dung/locale hoặc contract hành vi: event tĩnh đã cũ, legal còn tiếng Anh, API/schema errors còn text cố định, search/seller/currency/social có phần chưa được nối xử lý. Không tự tạo chính sách hay API chưa có.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-013` trong `execution/results.json`.

## UI-014 — Autoplay toàn bộ carousel nội dung

- **Yêu cầu:** `UI.CAROUSEL`
- **Ưu tiên / loại / mức:** P1 / Regression / Browser
- **Cơ sở kỳ vọng:** User requirement (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** ProductCarousel, CategoryStrip, EditorialSection, TestimonialCarousel, ServiceGuarantees

**Bước thực hiện**

1. Với từng carousel có overflow, không thao tác trong5s.
2. Swipe/click next.
3. Quan sát chu kỳ tiếp.

**Kết quả mong đợi:** Tự advance theo cấu hình5000ms; manual vẫn dùng được; autoplay tiếp tục sau interaction; không bật timer dư khi rerender.

**Nguồn truy vết:** [src/components/ui/swiper-navigation.tsx:18](../../../src/components/ui/swiper-navigation.tsx#L18), [src/features/products/components/product-carousel.tsx:23](../../../src/features/products/components/product-carousel.tsx#L23), [src/features/products/components/product-gallery.tsx:16](../../../src/features/products/components/product-gallery.tsx#L16).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/components/ui/swiper-navigation.test.tsx.

**Thực thi:** Pass. Browser production local đã pass các bước ghi trong browser-results.json; dữ liệu là synthetic fixture.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-014` trong `execution/results.json`.

## UI-015 — Gallery có autoplay theo yêu cầu chung

- **Yêu cầu:** `UI.CAROUSEL`
- **Ưu tiên / loại / mức:** P1 / Regression / Browser
- **Cơ sở kỳ vọng:** User requirement (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** PDP có>=2 ảnh

**Bước thực hiện**

1. Mở product gallery.
2. Chờ >5s rồi chọn thumbnail.

**Kết quả mong đợi:** Carousel ảnh phải có autoplay và đồng bộ thumbnail khi tự advance, đồng thời vẫn chọn/swipe tay.

**Lưu ý / dependency:** ProductGallery hiện không import Autoplay; yêu cầu autoplay toàn bộ carousel đã được user đặt.

**Nguồn truy vết:** [src/components/ui/swiper-navigation.tsx:18](../../../src/components/ui/swiper-navigation.tsx#L18), [src/features/products/components/product-carousel.tsx:23](../../../src/features/products/components/product-carousel.tsx#L23), [src/features/products/components/product-gallery.tsx:16](../../../src/features/products/components/product-gallery.tsx#L16).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/components/ui/swiper-navigation.test.tsx.

**Thực thi:** Pass. Browser production local đã pass các bước ghi trong browser-results.json; dữ liệu là synthetic fixture.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-015` trong `execution/results.json`.

## UI-016 — Pause/resume bằng keyboard và touch

- **Yêu cầu:** `UI.CAROUSEL`
- **Ưu tiên / loại / mức:** P1 / Accessibility / Browser
- **Cơ sở kỳ vọng:** User requirement (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Mọi carousel autoplay đang chạy

**Bước thực hiện**

1. Dùng Tab tới pause.
2. Pause, chờ>2chu kỳ.
3. Swipe/next và resume.

**Kết quả mong đợi:** Có control pause/resume accessible; sau pause không tự chạy lại chỉ do focus/swipe; resume chủ động chạy lại; giữ manual navigation.

**Lưu ý / dependency:** BUG-20261007-009: source navigation chỉ có previous/next, hover chưa đủ pause accessible.

**Nguồn truy vết:** [src/components/ui/swiper-navigation.tsx:18](../../../src/components/ui/swiper-navigation.tsx#L18), [src/features/products/components/product-carousel.tsx:23](../../../src/features/products/components/product-carousel.tsx#L23), [src/features/products/components/product-gallery.tsx:16](../../../src/features/products/components/product-gallery.tsx#L16).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/components/ui/swiper-navigation.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra keyboard pause/resume, swipe và gallery focus trên Chromium; chưa chạy touch pause/resume trên thiết bị thật cho mọi carousel.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-016` trong `execution/results.json`.

## UI-017 — Hover và focus đọc nội dung

- **Yêu cầu:** `UI.CAROUSEL`
- **Ưu tiên / loại / mức:** P1 / Accessibility / Browser
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Multi-slide có link/button

**Bước thực hiện**

1. Hover và đọc.
2. Di chuyển bằng keyboard tới link trong slide.

**Kết quả mong đợi:** Hover pause theo source; focus không bị kéo khỏi nội dung vì autoplay. Cơ chế pause phải dùng được khi không có chuột.

**Nguồn truy vết:** [src/components/ui/swiper-navigation.tsx:18](../../../src/components/ui/swiper-navigation.tsx#L18), [src/features/products/components/product-carousel.tsx:23](../../../src/features/products/components/product-carousel.tsx#L23), [src/features/products/components/product-gallery.tsx:16](../../../src/features/products/components/product-gallery.tsx#L16).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/components/ui/swiper-navigation.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Focus thumbnail gallery dừng autoplay; chưa chạy đủ hover/focus cho mọi carousel.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-017` trong `execution/results.json`.

## UI-018 — Reduced motion giữ quyền điều khiển

- **Yêu cầu:** `UI.CAROUSEL`
- **Ưu tiên / loại / mức:** P1 / Accessibility / Browser
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** OS prefers-reduced-motion=reduce

**Bước thực hiện**

1. Reload với media preference.
2. Điều hướng/pause carousel.

**Kết quả mong đợi:** Giảm hiệu ứng chuyển động; có cách dừng autoplay; manual vẫn hoạt động. Không mặc định CSS reduced motion đã dừng timer JS.

**Nguồn truy vết:** [src/components/ui/swiper-navigation.tsx:18](../../../src/components/ui/swiper-navigation.tsx#L18), [src/features/products/components/product-carousel.tsx:23](../../../src/features/products/components/product-carousel.tsx#L23), [src/features/products/components/product-gallery.tsx:16](../../../src/features/products/components/product-gallery.tsx#L16).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/components/ui/swiper-navigation.test.tsx.

**Thực thi:** Pass. Browser production local đã pass các bước ghi trong browser-results.json; dữ liệu là synthetic fixture.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-018` trong `execution/results.json`.

## UI-019 — 0/1 slide và không overflow

- **Yêu cầu:** `UI.CAROUSEL`
- **Ưu tiên / loại / mức:** P2 / Boundary / Browser
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Mỗi carousel với0,1 và ít hơn slidesPerView

**Bước thực hiện**

1. Render từng fixture.
2. Resize, thử controls.

**Kết quả mong đợi:** Không vòng lặp/cảnh báo làm hỏng UI; control disabled đúng; progress không NaN hoặc hiển thị0/0 gây nhầm.

**Nguồn truy vết:** [src/components/ui/swiper-navigation.tsx:18](../../../src/components/ui/swiper-navigation.tsx#L18), [src/features/products/components/product-carousel.tsx:23](../../../src/features/products/components/product-carousel.tsx#L23), [src/features/products/components/product-gallery.tsx:16](../../../src/features/products/components/product-gallery.tsx#L16).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/components/ui/swiper-navigation.test.tsx.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra một category và desktop all-slides-fit; chưa chạy trường hợp 0 slide trên mọi consumer.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-019` trong `execution/results.json`.

## UI-020 — Label/error/disabled nhất quán

- **Yêu cầu:** `UI.FORM`
- **Ưu tiên / loại / mức:** P2 / Accessibility / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Form có Input, Checkbox, Select, CountrySelect

**Bước thực hiện**

1. Submit invalid.
2. Kiểm tra label association và screen reader.
3. Disable control.

**Kết quả mong đợi:** Accessible name, aria-invalid và describedby trỏ lỗi tồn tại; click label focus/toggle đúng control; disabled không submit ngoài ý muốn.

**Nguồn truy vết:** [src/components/ui/form.tsx:27](../../../src/components/ui/form.tsx#L27).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. MỘT PHẦN: Có assertion keyboard, accessible labels và modal pending; chưa audit đầy đủ menu/form/dialog trong toàn ứng dụng.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-020` trong `execution/results.json`.

## UI-021 — Focus trap và restore

- **Yêu cầu:** `UI.DIALOG`
- **Ưu tiên / loại / mức:** P2 / Accessibility / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Avatar dialog và một popover đại diện

**Bước thực hiện**

1. Keyboard mở.
2. Tab/ShiftTab hết vòng.
3. Escape/Cancel.

**Kết quả mong đợi:** Dialog focus không thoát modal, Escape đóng khi được phép và restore; popover không trap như modal nếu contract non-modal.

**Nguồn truy vết:** [src/components/ui/form.tsx:27](../../../src/components/ui/form.tsx#L27).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. MỘT PHẦN: Có assertion keyboard, accessible labels và modal pending; chưa audit đầy đủ menu/form/dialog trong toàn ứng dụng.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-021` trong `execution/results.json`.

## UI-022 — DatePicker shared contract

- **Yêu cầu:** `UI.DATE`
- **Ưu tiên / loại / mức:** P3 / Boundary / Component
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** fromDate10/01,toDate10/31; selected undefined/10/15

**Bước thực hiện**

1. Render primitive fixture (chưa có consumer nghiệp vụ).
2. Chọn các ngày biên và ngoài range.

**Kết quả mong đợi:** Ngày biên chọn được, ngoài range disabled; onChange đúng Date/undefined; keyboard lịch dùng được; mặc định format vi-VN theo source.

**Nguồn truy vết:** [src/components/ui/date-picker.tsx:29](../../../src/components/ui/date-picker.tsx#L29).

**Automation:** Đề xuất Component | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Chưa có automation hoặc bằng chứng chạy ca tương ứng.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-022` trong `execution/results.json`.

## UI-023 — Reflow, zoom và focus visible

- **Yêu cầu:** `UI.LAYOUT`
- **Ưu tiên / loại / mức:** P2 / Accessibility / Manual
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 320px; zoom200%/400%; desktop và mobile

**Bước thực hiện**

1. Đi hết form/cart/detail/news.
2. Zoom và Tab.

**Kết quả mong đợi:** Không mất CTA/lỗi, chữ không đè/tràn toàn trang; focus visible; target dùng được; bảng có vùng cuộn khi cần.

**Nguồn truy vết:** [src/components/layout/main-header.tsx:45](../../../src/components/layout/main-header.tsx#L45), [src/components/ui/form.tsx:27](../../../src/components/ui/form.tsx#L27).

**Automation:** Đề xuất Manual | Test liên quan, chưa xác nhận phủ ca: src/components/layout/main-header.test.tsx.

**Thực thi:** Blocked. Chưa có kết quả kiểm tra thủ công đầy đủ trên thiết bị/assistive technology và ma trận contrast/zoom của môi trường đích. Browser automation hiện tại không thay chứng nhận WCAG.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-023` trong `execution/results.json`.

## UI-024 — Tương phản, tên và thông báo

- **Yêu cầu:** `UI.A11Y`
- **Ưu tiên / loại / mức:** P2 / Accessibility / Manual
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Header, disabled, errors, status badges, image alt

**Bước thực hiện**

1. Dùng contrast checker và screen reader.
2. Gây loading/error/success.

**Kết quả mong đợi:** Theo mục tiêu WCAG2.2AA của repository: nội dung đọc được, trạng thái không chỉ màu; async Alert/status được announce, ảnh trang trí không đọc dư.

**Nguồn truy vết:** [src/components/layout/main-header.tsx:45](../../../src/components/layout/main-header.tsx#L45), [src/components/ui/form.tsx:27](../../../src/components/ui/form.tsx#L27).

**Automation:** Đề xuất Manual | Test liên quan, chưa xác nhận phủ ca: src/components/layout/main-header.test.tsx.

**Thực thi:** Blocked. Chưa có kết quả kiểm tra thủ công đầy đủ trên thiết bị/assistive technology và ma trận contrast/zoom của môi trường đích. Browser automation hiện tại không thay chứng nhận WCAG.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `UI-024` trong `execution/results.json`.
