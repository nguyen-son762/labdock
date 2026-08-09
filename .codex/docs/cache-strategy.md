# Cache Strategy

## Mục tiêu

Tăng tốc response mà không phục vụ dữ liệu stale sai nghiệp vụ hoặc làm rò rỉ dữ liệu giữa user. Mọi Cache phải có owner, key, scope, freshness và invalidation.

## Các lớp Cache

- **Next Cache:** public/SEO server data, điều khiển bằng `revalidate` và tags.
- **Request memoization:** tránh gọi lặp cùng server function trong một render bằng cơ chế Next.js/`cache()` phù hợp.
- **React Query Cache:** Server State phía Client và thường phụ thuộc user/interaction.
- **Browser/CDN Cache:** chỉ cấu hình khi header, privacy và invalidation được hiểu rõ.

## Decision Tree

1. Response có secret, user hoặc tenant data? Có -> private Cache hoặc không Cache; tuyệt đối không public Cache.
2. Data có thể dùng chung giữa user? Có -> Next Cache có thể phù hợp.
3. Freshness có SLA cụ thể? Chọn `revalidate`/`staleTime` theo SLA, không dùng số tùy ý.
4. Có event thay đổi dữ liệu? Gắn tag/query key có thể invalidate chính xác.
5. Có thể chấp nhận stale-while-revalidate? Nếu không, fetch fresh ở critical point.
6. Mutation response đủ dữ liệu cập nhật Cache? Nếu có, update hẹp; nếu không, invalidate hẹp.

## Quy tắc Next Cache

- Tag theo entity và collection khi cần: `product:123`, `products:category:shoes`.
- `revalidate` phản ánh tốc độ thay đổi và tác động stale.
- Dùng `no-store` có chủ đích; không biến toàn page thành dynamic vì một client-only widget.
- Không đưa Authorization header/Cookie vào fetch được Cache public.
- Metadata và visible content phải dùng cùng freshness policy nếu cùng nguồn.

## Quy tắc React Query Cache

- Query key chứa resource, identity và mọi filter ảnh hưởng response.
- `staleTime` quyết định lúc refetch; `gcTime` quyết định giữ inactive data, không nhầm hai khái niệm.
- Private Cache phải clear/reset khi logout hoặc đổi tenant/user.
- Optimistic update phải cancel query liên quan, snapshot, rollback và settle/invalidate.
- Không invalidate toàn bộ root key nếu mutation chỉ ảnh hưởng một entity.

## Ví dụ đúng

```ts
const orderKeys = {
  all: ['orders'] as const,
  list: (filters: OrderFilters) => [...orderKeys.all, 'list', filters] as const,
  detail: (id: string) => [...orderKeys.all, 'detail', id] as const,
};
```

## Ví dụ sai

```ts
// Sai: filter thay đổi nhưng key không đổi, gây hiển thị nhầm dữ liệu.
useQuery({ queryKey: ['orders'], queryFn: () => getOrders(filters) });
```

## Best Practice

- Ghi Cache policy cạnh Hook/service sở hữu dữ liệu.
- Đo cache-hit, refetch và stale incident thay vì tăng thời gian vô hạn.
- Dùng prefetch khi intent mạnh như hover/focus vào link quan trọng.
- Giữ fallback và stale indicator phù hợp với nghiệp vụ nhạy cảm.

## Anti-pattern

- `staleTime: Infinity` cho dữ liệu thay đổi mà không có invalidation.
- Cache user profile bằng key không chứa identity khi client sống qua user switch.
- Dùng `router.refresh()` để thay cho invalidation có mục tiêu ở mọi nơi.
- Tạo hai Cache cho cùng source of truth.

## Checklist

- [ ] Scope public/private/tenant đã xác định.
- [ ] Key gồm mọi input ảnh hưởng response.
- [ ] Freshness có lý do nghiệp vụ.
- [ ] Mutation và logout có invalidation/reset.
- [ ] Không có Token/Cookie trong cache key hoặc log.
- [ ] Stale behavior và fallback được kiểm tra.

