# API Convention

## Nguyên tắc phân loại

Mỗi API phải có hồ sơ: mục đích, visibility, user dependency, thời điểm chạy, Authentication, cacheability, freshness, invalidation, error model và cancellation.

## Decision Tree bắt buộc

1. **Phục vụ SEO?** Có -> server `fetch()`.
2. **Dữ liệu public?** Có -> tiếp tục đánh giá Cache; mặc định Server Component.
3. **Có thể Cache?** Có -> chọn `next.revalidate`/`next.tags`; không -> `cache: 'no-store'` nếu thực sự cần.
4. **Phụ thuộc user hiện tại?** Có -> không dùng public Cache; ưu tiên Client API.
5. **Chỉ chạy sau Hydration/interaction?** Có -> Axios + React Query.
6. **Là mutation?** Dùng service + `useMutation`; xác định idempotency, invalidation và rollback.

## Server fetch contract

- Chỉ gọi từ Server Component, server utility, `generateMetadata()` hoặc Route Handler phù hợp.
- Kiểm tra `response.ok`; map lỗi sang error model có chủ đích.
- Truyền `next: { revalidate, tags }` khi Cache; tag dùng domain identifier ổn định.
- Dùng `cache()` để memoize server function khi tham số và identity an toàn; không xem `cache()` là persistent Cache thay cho Next Cache.
- Không đưa Cookie/Token của user vào request public có Cache.
- Không dùng Axios hoặc React Query cho Homepage, Product, Category, Blog, CMS, FAQ, News và metadata.

## Client API contract

- Component gọi custom Hook; Hook gọi typed service; service dùng axios instance duy nhất.
- Hook sở hữu query key, `staleTime`, `gcTime`, retry, enabled, selection và invalidation.
- Service sở hữu path, method, payload serialization, AbortSignal và response normalization.
- Component không biết interceptor hoặc `AxiosError` chi tiết.
- Mọi request phụ thuộc tham số phải đưa tham số đó vào query key.

## Mutation contract

Trước `useMutation`, xác định:

- mutation có idempotent không;
- double submit được chặn thế nào;
- key nào invalidate/update;
- optimistic update có snapshot và rollback không;
- lỗi validation, Authentication và conflict hiển thị thế nào;
- navigation giữa chừng có gây state sai không.

## Ví dụ đúng

```ts
const product = await fetch(url, {
  next: { revalidate: 300, tags: [`product:${slug}`] },
});
```

```ts
useQuery({
  queryKey: profileKeys.detail(userId),
  queryFn: ({ signal }) => profileService.get(userId, signal),
  staleTime: 60_000,
});
```

## Ví dụ sai

```ts
// Sai: SEO data chỉ xuất hiện sau Hydration.
useQuery({ queryKey: ['product'], queryFn: () => axios.get('/products/1') });
```

```ts
// Sai: tạo client mới, bỏ interceptor và refresh token chung.
const client = axios.create({ baseURL: '/api' });
```

## Best Practice

- Bắt đầu fetch độc lập song song để tránh waterfall.
- Normalize error một lần tại data boundary.
- Hủy search suggestion cũ bằng AbortSignal.
- Invalidate key hẹp nhất và clear private Cache khi logout.
- Dùng idempotency key cho payment/checkout nếu backend hỗ trợ.

## Anti-pattern

- Gọi API trực tiếp trong JSX/effect khi custom Hook đã tồn tại.
- Dùng React Query để quản lý modal state.
- Dùng public Cache cho response chứa user/tenant data.
- Retry mọi status và mọi mutation.
- Query key thiếu filter/page/user identifier.

## Checklist

- [ ] Đã trả lời đủ năm câu hỏi phân loại API.
- [ ] Chọn đúng Server fetch hoặc Client API.
- [ ] Cache scope và invalidation rõ ràng.
- [ ] Reuse axios instance, service, Hook và query key hiện có.
- [ ] Authentication, Authorization, cancellation và error model đã xử lý.
- [ ] Không có duplicate request hoặc user data trong public Cache.

