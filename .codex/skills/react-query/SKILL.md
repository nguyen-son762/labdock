---
name: react-query
description: Thiết kế Server State phía Client bằng React Query, gồm query key, useQuery, useInfiniteQuery, useMutation, staleTime, gcTime, prefetch, invalidation và optimistic update. Dùng cho API phụ thuộc user hoặc interaction sau Hydration.
---

# React Query

## Mục tiêu

Quản lý Client-side Server State nhất quán, chống stale/race/duplicate request và không lấn sang local UI state hay SEO data.

## Trách nhiệm

- Tìm provider, query client defaults, key factory và Hook hiện có.
- Tách HTTP service khỏi query policy.
- Thiết kế key, freshness, retry, invalidation và user lifecycle.
- Hỗ trợ cancellation, pagination và optimistic rollback đúng.
- Không duplicate Cache vào Context/local state.

## Quy trình

1. Xác nhận API thuộc Client bằng `$api-strategy`.
2. Xác định resource identity và mọi filter.
3. Reuse/mở rộng query key factory từ generic đến specific.
4. Viết Hook gọi typed service và truyền AbortSignal.
5. Chọn `staleTime`, `gcTime`, retry, `enabled`, `select` có lý do.
6. Với mutation, xác định update/invalidate, duplicate submit và rollback.
7. Test loading, error, stale, race, logout và pagination.

## Decision Tree

1. Dữ liệu là SEO/public initial content? Không dùng React Query.
2. Dữ liệu là Server State phía Client? Dùng `useQuery`.
3. Danh sách append theo cursor/page? Dùng `useInfiniteQuery` với page param rõ.
4. Có side effect? Dùng `useMutation`.
5. Mutation response chứa entity mới nhất? Update key hẹp; nếu không, invalidate hẹp.
6. Có thể rollback chắc chắn? Mới dùng optimistic update.

## Checklist

- [ ] Key chứa identity, filter, sort, page/cursor cần thiết.
- [ ] `staleTime` và `gcTime` không bị nhầm.
- [ ] AbortSignal đi đến Axios.
- [ ] Retry theo status/idempotency.
- [ ] Logout/user switch clear private Cache.
- [ ] Không copy query result sang local/global state.

## Anti-pattern

- `queryKey: ['data']` cho nhiều tham số.
- `staleTime: Infinity` không có invalidation.
- Invalidate root key sau mutation nhỏ.
- Optimistic update payment/checkout không rollback/idempotency.
- Gọi `useQuery` trực tiếp rải rác thay custom Hook đã có.

## Best Practice

- Key hierarchy: `all -> list(filters) -> detail(id)`.
- Dùng `select` cho projection rẻ, stable; không chứa side effect.
- Prefetch khi intent cao, không prefetch toàn bộ link.
- Giữ previous page chỉ khi UX không hiển thị dữ liệu sai ngữ cảnh.

## Ví dụ đúng

`orderKeys.detail(userId, orderId)` cách ly dữ liệu user; mutation update address chỉ invalidate detail và summary liên quan.

## Ví dụ sai

Tất cả Order dùng key `['orders']`, rồi copy response vào Context để nhiều component sử dụng.
