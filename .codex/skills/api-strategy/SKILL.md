---
name: api-strategy
description: Phân loại API và chọn server fetch hoặc Axios với React Query cho Next.js. Bắt buộc dùng trước mọi thay đổi data fetching, mutation, Cache, Authentication, Hybrid Page hoặc tích hợp endpoint.
---

# API Strategy

## Mục tiêu

Chọn data boundary đúng ngay từ đầu để bảo toàn SEO, public Cache, privacy và trải nghiệm tương tác. Đây là skill ưu tiên cao nhất khi task chạm API.

## Trách nhiệm

- Lập bảng phân loại cho từng endpoint, không phân loại cả page bằng một nhãn.
- Tìm server fetch helper, axios instance, service, query key và Hook hiện có.
- Xác định Authentication, Cache scope, freshness, invalidation và cancellation.
- Ngăn public Cache chứa personalized data.
- Giữ component không phụ thuộc chi tiết HTTP.

## Quy trình

1. Đọc `.codex/docs/api-convention.md` và `.codex/docs/cache-strategy.md`.
2. Tìm call site/endpoint/Hook tương tự.
3. Ghi: SEO, public, cacheable, user-dependent, post-Hydration, mutation.
4. Đi qua Decision Tree cho từng API.
5. Thiết kế service, Hook, key, retry, error và invalidation.
6. Với Hybrid Page, vẽ rõ Server shell và Client islands.
7. Kiểm tra duplicate request, privacy, stale behavior và test.

## Decision Tree

1. **API phục vụ SEO?** Có -> `fetch()` phía Server.
2. **Dữ liệu public?** Có -> Server Component; chọn Cache.
3. **Có thể Cache?** Có -> `next.revalidate` + `next.tags`; xác định invalidation.
4. **Phụ thuộc user hiện tại?** Có -> không public Cache; ưu tiên Client API.
5. **Chỉ chạy sau Hydration/interaction?** Có -> Axios + React Query.
6. **Mutation?** Service + `useMutation`; xác định idempotency, rollback và key bị ảnh hưởng.

## Quy tắc Server fetch

- Dùng cho Homepage, Landing Page, Product, Category, Blog, CMS, Banner, FAQ, News và Static Content.
- Kiểm tra `response.ok`, map not-found/error, truyền AbortSignal khi architecture hỗ trợ.
- Dùng `generateMetadata()` và server HTML cho content indexable.
- Dùng `cache()` chỉ khi identity/tham số an toàn; không nhầm với persistent Cache.
- Không dùng Axios hoặc React Query.

## Quy tắc Client API

- Dùng cho Profile, Cart, Wishlist, Orders, Checkout, Notification, Dashboard, Search Suggestion, Recently Viewed, Infinite Scroll và Load More.
- Mutation gồm Login, Logout, Register, Update Profile, Add/Remove Cart, Checkout, Payment, Upload.
- Component -> custom Hook -> typed service -> axios instance hiện có.
- Query key chứa mọi identity/filter; private Cache clear khi logout/user switch.
- Không retry mutation không idempotent.

## Checklist

- [ ] Đủ năm câu hỏi phân loại đã được trả lời.
- [ ] SEO/public data không dùng Axios/React Query.
- [ ] Personalized data không đi vào public Cache.
- [ ] Reuse đúng client/service/Hook/key.
- [ ] Freshness, retry, cancellation và invalidation có lý do.
- [ ] Error, unauthorized, race và duplicate submit được xử lý.

## Anti-pattern

- Chọn library theo thói quen thay vì data classification.
- Fetch user data phía Server làm route public thành dynamic hoặc lẫn identity.
- Tạo axios instance mới trong feature.
- Query key thiếu user/filter; invalidate toàn bộ Cache sau mọi mutation.
- Dùng React Query cho modal/local state.

## Best Practice

- Một page có thể dùng nhiều strategy theo từng data slice.
- Giữ public content và personalized interaction độc lập.
- Invalidate hẹp; optimistic update chỉ khi rollback an toàn.
- Ghi Cache policy cạnh owner và test user-switch/logout.

## Ví dụ đúng

Product Detail dùng server `fetch()` cho Product/Metadata/Related Products; `WishlistButton` dùng Axios + React Query với key chứa user identity.

## Ví dụ sai

Dùng một `useProductPageQuery` phía Client trả cả Product, Cart và Recommendation, khiến HTML ban đầu trống và không thể public Cache.

