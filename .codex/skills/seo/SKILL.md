---
name: seo
description: Thiết kế và review technical SEO cho Next.js gồm server-rendered content, Metadata, OpenGraph, canonical, robots.txt, sitemap và JSON-LD. Dùng khi thêm/sửa public route, Product, Category, Blog, CMS hoặc indexability.
---

# SEO

## Mục tiêu

Bảo đảm search engine nhận đúng nội dung, URL chuẩn và structured data mà không phụ thuộc Hydration.

## Trách nhiệm

- Xác định search intent, indexability và canonical.
- Giữ content chính phía Server và dùng `fetch()`.
- Đồng bộ Metadata, OpenGraph, robots, sitemap và status code.
- Tạo JSON-LD đúng schema, khớp visible content và serialize an toàn.
- Kiểm tra duplicate/thin/soft-404 content.

## Quy trình

1. Đọc route, metadata parent và data source.
2. Kiểm tra server HTML và heading/content chính.
3. Thiết kế static metadata hoặc `generateMetadata()`.
4. Chuẩn hóa canonical, locale và pagination.
5. Cập nhật robots/sitemap khi index policy thay đổi.
6. Chọn/validate JSON-LD.
7. Kiểm tra Performance, image alt, internal link và status.

## Decision Tree

1. Route public có search value? Cho index và render Server.
2. Route user/private/filter vô hạn? `noindex` hoặc canonical theo policy.
3. Metadata phụ thuộc API? `generateMetadata()` reuse server function.
4. Nhiều URL cùng content? Chọn canonical duy nhất.
5. Có entity phù hợp schema.org? Thêm JSON-LD khớp UI.
6. Entity không tồn tại? Trả not-found/status đúng, không soft 404.

## Checklist

- [ ] Title/description unique và đúng intent.
- [ ] Canonical tuyệt đối và ổn định.
- [ ] Content/index data có trong server HTML.
- [ ] robots/sitemap/status thống nhất.
- [ ] OpenGraph image/URL hợp lệ.
- [ ] JSON-LD hợp lệ và không lộ unsafe content.

## Anti-pattern

- Fetch title/content trong `useEffect`.
- Canonical luôn trỏ Homepage.
- Index search/filter URL vô hạn.
- JSON-LD chứa rating/price không hiển thị hoặc đã stale khác UI.
- Dùng client redirect cho not-found chính.

## Best Practice

- Reuse cùng server data source cho page và metadata khi Cache an toàn.
- Dùng stable absolute URL từ environment parser.
- Giữ một H1 có ý nghĩa và heading hierarchy hợp lý.
- Test rendered output, không chỉ object metadata.

## Ví dụ đúng

Category page server-render Product list, canonical không chứa tracking params và `generateMetadata()` dùng Category title từ cached fetch.

## Ví dụ sai

Category page trả shell rỗng rồi dùng React Query tải Product; bot chỉ thấy spinner và metadata chung.

