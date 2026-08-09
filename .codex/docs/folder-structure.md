# Cấu trúc thư mục

## Cấu trúc mặc định

Chỉ dùng cấu trúc này khi repository chưa có convention:

```text
src/
  app/
    (public)/
    (authenticated)/
    api/
  features/
    product/
      api/
      components/
      hooks/
      schemas/
      types/
      utils/
      index.ts
  components/
    ui/
    shared/
  hooks/
  lib/
  providers/
  services/
  styles/
  types/
```

Không tạo folder rỗng. Tên route group phản ánh layout/policy, không phản ánh URL.

## Quy tắc placement

- `app/**/page.tsx`: compose page, không chứa reusable business implementation.
- `app/**/loading.tsx`: fallback cho route segment, giữ layout ổn định.
- `app/**/error.tsx`: error boundary phù hợp và là Client Component theo yêu cầu Next.js.
- `features/<name>/api`: service, query key factory và React Query hook của feature.
- `features/<name>/components`: UI mang ngôn ngữ domain.
- `features/<name>/hooks`: stateful logic không phải API.
- `features/<name>/schemas`: Zod schema tại input boundary.
- `components/ui`: primitive có Accessibility contract.
- `lib`: singleton/configured infrastructure, không chứa business rule.
- `types`: chỉ type thực sự toàn cục; ưu tiên co-location.

## Decision Tree

1. File phục vụ route-specific composition? Đặt cạnh route.
2. File chứa domain vocabulary/use case? Đặt trong feature owner.
3. File là React Query hook hoặc client service? Đặt `feature/api`.
4. File là stateful reusable logic trong một feature? Đặt `feature/hooks`.
5. File là primitive không biết domain? Đặt `components/ui`.
6. File cấu hình infrastructure dùng toàn app? Đặt `lib` hoặc `providers`.
7. Không xác định được owner? Chưa tạo file; tiếp tục discovery.

## Ví dụ đúng

```text
features/cart/api/cart-query-keys.ts
features/cart/api/use-add-to-cart.ts
features/cart/components/cart-summary.tsx
features/cart/schemas/add-to-cart.schema.ts
```

## Ví dụ sai

```text
hooks/use-cart.ts                 # mất ownership khi hook chỉ thuộc cart
utils/cart-helper.ts              # tên chung chung
services/api.ts                   # gom mọi domain vào một file
components/add-to-cart.tsx        # không rõ shared hay feature
```

## Best Practice

- Theo convention đang có trước khi áp dụng cấu trúc mặc định.
- Giữ file test, Storybook và mock gần file owner nếu tooling cho phép.
- Export tối thiểu qua `index.ts`; không tạo barrel sâu gây cycle.
- Dùng tên folder số ít hoặc số nhiều nhất quán với repository.

## Anti-pattern

- Tạo mọi folder cho feature khi chưa có nội dung.
- Dùng `shared` như nơi bỏ code chưa xác định được owner.
- Import từ `../../../../features/...` thay vì alias/public API.
- Đặt axios instance trong từng feature.
- Đặt business type toàn cục để tránh import đúng owner.

## Checklist

- [ ] Placement phản ánh ownership, không chỉ loại file.
- [ ] Không có folder rỗng hoặc barrel không cần thiết.
- [ ] Không có dependency vòng hoặc deep import private path.
- [ ] File server-only/client-only được đặt và đánh dấu rõ.
- [ ] Naming khớp source hiện có.

