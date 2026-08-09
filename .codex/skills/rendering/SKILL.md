---
name: rendering
description: Chọn Server Component, Client Component, Suspense, Streaming, Hydration và Dynamic Import cho Next.js. Dùng khi thiết kế page, tách interactive island, xử lý hydration mismatch hoặc tối ưu server/client rendering.
---

# Rendering

## Mục tiêu

Render HTML hữu ích sớm, giảm JavaScript và Hydration mà vẫn hỗ trợ interaction đầy đủ.

## Trách nhiệm

- Lập component tree và đánh dấu server/client cho từng subtree.
- Giữ SEO content và secret phía Server.
- Đặt Client boundary ở leaf nhỏ nhất.
- Thiết kế Suspense/Streaming theo section người dùng hiểu được.
- Kiểm tra serialized props, duplicate fetch và hydration mismatch.

## Quy trình

1. Đọc route tree và component imports.
2. Phân loại data và interaction từng section.
3. Giữ Server Component mặc định.
4. Tách Client island quanh event/state/browser API.
5. Khởi tạo server work song song; đặt Suspense cho phần chậm độc lập.
6. Dynamic Import Client-only module lớn không critical.
7. Kiểm tra server HTML, JS payload, Hydration và layout shift.

## Decision Tree

1. Chỉ render từ props/server data? Server Component.
2. Cần event/local state/effect/browser API? Client Component.
3. Data cần SEO? Không để phụ thuộc Hydration.
4. Work chậm nhưng độc lập? Suspense + Streaming.
5. Library lớn chỉ dùng khi mở UI? Dynamic Import tại trigger flow.
6. Page có public và personalized data? Hybrid Page.

## Checklist

- [ ] Mỗi `"use client"` có lý do cụ thể.
- [ ] Props qua boundary nhỏ, serializable.
- [ ] Provider đặt thấp nhất.
- [ ] Fallback giữ layout và có error recovery.
- [ ] Không fetch cùng data ở cả Server và Client vô cớ.
- [ ] SEO content có trong server HTML.

## Anti-pattern

- Root layout là Client Component.
- Dùng effect để fetch title/content chính.
- Dynamic Import LCP content.
- Suspense boundary quá nhỏ gây nhấp nháy.
- Truyền object graph lớn qua boundary.

## Best Practice

- Server shell + Client islands.
- Skeleton khớp kích thước final content.
- Tách slow section theo khả năng đọc/interaction.
- Đo Hydration và JS bytes sau thay đổi boundary.

## Ví dụ đúng

Dashboard layout/server shell render navigation; chart editor chỉ Dynamic Import khi user chọn “Chỉnh sửa”.

## Ví dụ sai

Đưa toàn Dashboard sang Client chỉ vì chart có hover tooltip.

