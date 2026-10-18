# CMS — Tin tức, giới thiệu và tài liệu pháp lý

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `/news; /news/[slug]; /about-us; /privacy; /terms-and-conditions; /security`. Tổng: 13 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: Data local hiện có; fixture bổ sung DS-NEWS khi kiểm tra các nhánh; không cần backend CMS vì source hiện chưa tích hợp CMS API.

## CMS-001 — Featured và latest không trùng

- **Yêu cầu:** `CMS.NEWS`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 7 bài local; bài đầu featured

**Bước thực hiện**

1. Mở /news.
2. So featured/feed.

**Kết quả mong đợi:** Featured là bài đầu, không lặp lại trong feed; feed còn6, pageSize4; không mặc định featured thay đổi theo sort feed.

**Nguồn truy vết:** [src/features/news/components/news-feed.tsx:20](../../../src/features/news/components/news-feed.tsx#L20), [src/features/news/components/news-list-screen.tsx:7](../../../src/features/news/components/news-list-screen.tsx#L7), [src/features/news/data/news-data.ts:110](../../../src/features/news/data/news-data.ts#L110).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/news/components/news-feed.test.tsx, src/features/news/data/news-data.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra category filter và dữ liệu bài viết; chưa đủ pagination/sort/reset/featured combinations.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-001` trong `execution/results.json`.

## CMS-002 — Lọc đủ category và empty

- **Yêu cầu:** `CMS.NEWS`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** All, News, Events, Company updates, Features; fixture không có category match

**Bước thực hiện**

1. Click từng category.
2. So card và aria-pressed.

**Kết quả mong đợi:** Chỉ bài thuộc category; All khôi phục; empty có no articles; category hiển thị theo locale.

**Nguồn truy vết:** [src/features/news/components/news-feed.tsx:20](../../../src/features/news/components/news-feed.tsx#L20), [src/features/news/components/news-list-screen.tsx:7](../../../src/features/news/components/news-list-screen.tsx#L7), [src/features/news/data/news-data.ts:110](../../../src/features/news/data/news-data.ts#L110).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/news/components/news-feed.test.tsx, src/features/news/data/news-data.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra category filter và dữ liệu bài viết; chưa đủ pagination/sort/reset/featured combinations.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-002` trong `execution/results.json`.

## CMS-003 — Sort/reset page

- **Yêu cầu:** `CMS.NEWS`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Đang page2; sort latest/oldest

**Bước thực hiện**

1. Đổi sort.
2. Đổi category.

**Kết quả mong đợi:** Sắp theo publishedAt tăng/giảm đúng; đổi sort/category đều về page1; không mutation dữ liệu nguồn.

**Nguồn truy vết:** [src/features/news/components/news-feed.tsx:20](../../../src/features/news/components/news-feed.tsx#L20), [src/features/news/components/news-list-screen.tsx:7](../../../src/features/news/components/news-list-screen.tsx#L7), [src/features/news/data/news-data.ts:110](../../../src/features/news/data/news-data.ts#L110).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/news/components/news-feed.test.tsx, src/features/news/data/news-data.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra category filter và dữ liệu bài viết; chưa đủ pagination/sort/reset/featured combinations.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-003` trong `execution/results.json`.

## CMS-004 — Pagination feed

- **Yêu cầu:** `CMS.NEWS`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 6 bài trong feed; page1/2

**Bước thực hiện**

1. Next rồi Previous.
2. Chọn số trang.

**Kết quả mong đợi:** Page1 có4 bài, page2 có2; nút biên disabled; aria-current đúng; không có bài trùng/lost do sort.

**Nguồn truy vết:** [src/features/news/components/news-feed.tsx:20](../../../src/features/news/components/news-feed.tsx#L20), [src/features/news/components/news-list-screen.tsx:7](../../../src/features/news/components/news-list-screen.tsx#L7), [src/features/news/data/news-data.ts:110](../../../src/features/news/data/news-data.ts#L110).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/news/components/news-feed.test.tsx, src/features/news/data/news-data.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra category filter và dữ liệu bài viết; chưa đủ pagination/sort/reset/featured combinations.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-004` trong `execution/results.json`.

## CMS-005 — Đọc bài và route sai

- **Yêu cầu:** `CMS.DETAIL`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Mọi slug trong newsArticles; unknown slug

**Bước thực hiện**

1. Mở từng link bài.
2. Reload.
3. Mở slug không có.

**Kết quả mong đợi:** Title/date/category/intro/sections/gallery đúng từng bài; unknown404; không lặp body của bài khác.

**Nguồn truy vết:** [src/features/news/components/news-detail-screen.tsx:12](../../../src/features/news/components/news-detail-screen.tsx#L12), [src/features/news/data/news-data.ts:110](../../../src/features/news/data/news-data.ts#L110).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/news/data/news-data.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-005` trong `execution/results.json`.

## CMS-006 — Copy link thành công

- **Yêu cầu:** `CMS.SHARE`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** HTTPS, clipboard mock resolve

**Bước thực hiện**

1. Click Copy link.
2. Tiến clock2s.

**Kết quả mong đợi:** Ghi đúng window.location.href có locale; announce Copied; về Copy link sau2s; cleanup timer khi unmount.

**Nguồn truy vết:** [src/features/news/components/copy-link-button.tsx:8](../../../src/features/news/components/copy-link-button.tsx#L8).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-006` trong `execution/results.json`.

## CMS-007 — Clipboard lỗi hoặc không hỗ trợ

- **Yêu cầu:** `CMS.SHARE`
- **Ưu tiên / loại / mức:** P2 / Negative / Integration
- **Cơ sở kỳ vọng:** Quality target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** navigator.clipboard thiếu/reject

**Bước thực hiện**

1. Click copy.
2. Quan sát console và button.

**Kết quả mong đợi:** Không crash hoặc báo Copied giả; cần feedback fallback cho user khi không copy được.

**Nguồn truy vết:** [src/features/news/components/copy-link-button.tsx:8](../../../src/features/news/components/copy-link-button.tsx#L8).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Pass. Assertion gắn ID đã pass qua UI/service boundary hoặc rule tương ứng; xem tên assertion trong assertions.json.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-007` trong `execution/results.json`.

## CMS-008 — Tính thời sự của upcoming event

- **Yêu cầu:** `CMS.EVENT`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Decision required (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Clock 2026-10-18; event01Sep2026 và OCT01/15

**Bước thực hiện**

1. Mở sidebar news.
2. So nhãn upcoming với ngày.

**Kết quả mong đợi:** Event đã qua không được quảng bá là sắp diễn ra; yêu cầu PO nội dung/luồng cập nhật vì dữ liệu local không có năm ở upcomingEvents.

**Nguồn truy vết:** [src/features/news/data/news-data.ts:110](../../../src/features/news/data/news-data.ts#L110).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/news/data/news-data.test.ts.

**Thực thi:** Blocked. Cần chốt nội dung/locale hoặc contract hành vi: event tĩnh đã cũ, legal còn tiếng Anh, API/schema errors còn text cố định, search/seller/currency/social có phần chưa được nối xử lý. Không tự tạo chính sách hay API chưa có.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-008` trong `execution/results.json`.

## CMS-009 — Nội dung và CTA

- **Yêu cầu:** `CMS.ABOUT`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Decision required (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** 4 advantages,6 placeholder MediCore

**Bước thực hiện**

1. Mở about ở desktop/mobile.
2. Click Explore products.

**Kết quả mong đợi:** Narrative/advantages/CTA đủ, link /products giữ locale; chấp nhận 6 logo placeholder chỉ ở môi trường demo và được PO xác nhận cho release.

**Nguồn truy vết:** [src/features/about/components/about-screen.tsx:10](../../../src/features/about/components/about-screen.tsx#L10).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/about/components/about-screen.test.tsx.

**Thực thi:** Blocked. Expected chưa có quyết định PO/backend hoặc nội dung/contract được phê duyệt. Xem dependency gốc trong test case; không suy diễn Pass từ hành vi hiện tại.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-009` trong `execution/results.json`.

## CMS-010 — Terms đầy đủ và cấu trúc heading

- **Yêu cầu:** `CMS.LEGAL`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** termsDocument local

**Bước thực hiện**

1. Mở Terms.
2. Đối chiếu từng section với legal.data.ts.

**Kết quả mong đợi:** Đủ14 mục theo đúng thứ tự, một h1 nội dung trang, các section h2 có ID duy nhất; paragraphs không mất.

**Nguồn truy vết:** [src/features/legal/components/legal-document-screen.tsx:5](../../../src/features/legal/components/legal-document-screen.tsx#L5), [src/features/legal/legal.data.ts:3](../../../src/features/legal/legal.data.ts#L3).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/legal/components/legal-document-screen.test.tsx.

**Thực thi:** Pass. Nội dung legal có đủ cấu trúc section/heading và list theo dữ liệu source hiện tại. Không xác nhận hiệu lực pháp lý/nội dung dịch.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-010` trong `execution/results.json`.

## CMS-011 — Privacy lists và closing paragraphs

- **Yêu cầu:** `CMS.LEGAL`
- **Ưu tiên / loại / mức:** P2 / Accessibility / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** privacyDocument local

**Bước thực hiện**

1. Mở Privacy.
2. Đọc headings/lists bằng screen reader.

**Kết quả mong đợi:** Đủ11 mục theo data; list semantic ul/li và closing paragraphs giữ thứ tự; text được escape.

**Nguồn truy vết:** [src/features/legal/components/legal-document-screen.tsx:5](../../../src/features/legal/components/legal-document-screen.tsx#L5), [src/features/legal/legal.data.ts:3](../../../src/features/legal/legal.data.ts#L3).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/legal/components/legal-document-screen.test.tsx.

**Thực thi:** Pass. Nội dung legal có đủ cấu trúc section/heading và list theo dữ liệu source hiện tại. Không xác nhận hiệu lực pháp lý/nội dung dịch.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-011` trong `execution/results.json`.

## CMS-012 — Locale legal content

- **Yêu cầu:** `CMS.LEGAL`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Decision required (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** /vi/privacy; /vi/terms-and-conditions

**Bước thực hiện**

1. Chuyển vi.
2. So title/body/metadata.

**Kết quả mong đợi:** Chính sách ngôn ngữ được PO xác nhận: dịch body hay giữ bản tiếng Anh chính thức; không coi metadata vi là bằng chứng body đã dịch.

**Nguồn truy vết:** [src/features/legal/components/legal-document-screen.tsx:5](../../../src/features/legal/components/legal-document-screen.tsx#L5), [src/features/legal/legal.data.ts:3](../../../src/features/legal/legal.data.ts#L3).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/legal/components/legal-document-screen.test.tsx.

**Thực thi:** Blocked. Cần chốt nội dung/locale hoặc contract hành vi: event tĩnh đã cũ, legal còn tiếng Anh, API/schema errors còn text cố định, search/seller/currency/social có phần chưa được nối xử lý. Không tự tạo chính sách hay API chưa có.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-012` trong `execution/results.json`.

## CMS-013 — Nội dung trang bảo mật khớp thực tế

- **Yêu cầu:** `CMS.SECURITY`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** /security, /vi/security

**Bước thực hiện**

1. Đọc các cam kết session/cache.
2. Đối chiếu cơ chế auth source.

**Kết quả mong đợi:** Không tuyên bố HttpOnly hoặc server permission đã được chứng minh chỉ từ frontend; link/navigation/metadata đúng locale.

**Nguồn truy vết:** [src/app/[locale]/(marketing)/security/page.tsx:7](../../../src/app/%5Blocale%5D/%28marketing%29/security/page.tsx#L7).

**Automation:** Đề xuất Integration | Chưa có test đồng vị trí cho hành vi này.

**Thực thi:** Blocked. Cần chốt nội dung/locale hoặc contract hành vi: event tĩnh đã cũ, legal còn tiếng Anh, API/schema errors còn text cố định, search/seller/currency/social có phần chưa được nối xử lý. Không tự tạo chính sách hay API chưa có.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `CMS-013` trong `execution/results.json`.
