---
name: nextjs
description: Áp dụng Next.js 15 App Router cho route, layout, metadata, Server Component, Client Component, fetch, Cache, Suspense, Streaming, Server Action và Route Handler. Dùng khi tạo hoặc sửa page, routing, data loading, metadata hay server boundary.
---

# Next.js

## Mục tiêu

Tận dụng App Router để render server-first, giữ SEO và public Cache, đồng thời cô lập interaction phía Client.

## Trách nhiệm

- Kiểm tra version/config thực tế trước khi dùng API Next.js.
- Giữ `page`, `layout`, `loading`, `error`, `not-found` đúng vai trò.
- Dùng `fetch()` và metadata API cho public/SEO data.
- Chọn dynamic/static behavior và Cache có chủ đích.
- Giảm Hydration bằng Client boundary nhỏ.

## Quy trình

1. Đọc route tree, parent layout và segment config.
2. Xác định URL contract, params/search params và indexability.
3. Phân loại từng data source bằng `$api-strategy`.
4. Thiết kế Server Component tree và Suspense boundaries.
5. Thêm Client Component chỉ cho interaction.
6. Thiết kế metadata, not-found, error và loading.
7. Kiểm tra server HTML, Cache behavior và build output.

## Decision Tree

1. Chỉ cần đọc dữ liệu/render? Server Component.
2. Cần event/state/browser API? Client Component leaf.
3. Endpoint chỉ làm Backend-for-Frontend hoặc webhook? Cân nhắc Route Handler.
4. Mutation gắn chặt form/server trust boundary? Dùng Server Action chỉ khi convention dự án hỗ trợ và không phá API Strategy.
5. Section chậm, độc lập? Suspense + Streaming.
6. Metadata phụ thuộc API? `generateMetadata()` và reuse server data function an toàn.

## Checklist

- [ ] Không `"use client"` ở page/layout nếu không bắt buộc.
- [ ] SEO content có trong server HTML.
- [ ] `fetch()` có error và Cache policy rõ.
- [ ] Dynamic route, not-found và redirect đúng status/behavior.
- [ ] Props qua Server/Client boundary serializable và nhỏ.
- [ ] Build không báo dynamic/static hoặc hydration issue.

## Anti-pattern

- Fetch public Product bằng React Query sau Hydration.
- Dùng Route Handler nội bộ chỉ để proxy API không cần thiết.
- Đặt provider Client ở root cho một feature.
- Gọi `cookies()` hoặc dynamic API làm toàn route mất Cache mà không đánh giá.

## Best Practice

- Dùng route groups để chia layout/policy không đổi URL.
- Khởi tạo server request độc lập song song.
- Fallback giữ layout và error boundary có retry có nghĩa.
- Dùng `next/image`, font optimization và metadata API chính thức.

## Ví dụ đúng

Product Page fetch Product phía Server với tag `product:<slug>`, tạo metadata từ cùng data function và render `WishlistButton` như Client island.

## Ví dụ sai

Thêm `"use client"` vào Product Page, gọi Axios trong `useEffect`, rồi hiển thị title/description chỉ sau Hydration.

