# Hook Convention

## Mục tiêu

Custom Hook phải đóng gói một lifecycle hoặc stateful contract có tên rõ, không trở thành nơi che giấu mọi logic.

## Phân loại

- React Query Hook: sở hữu query/mutation policy của một feature.
- Form Hook: kết nối React Hook Form, Zod và domain default values.
- UI Hook: quản lý reusable browser interaction như media query nếu repository chưa có.
- Domain Hook: điều phối stateful behavior của một use case trong feature.

## Decision Tree

1. Logic là pure? Dùng function, không dùng Hook.
2. Logic chỉ dùng một component và đơn giản? Giữ tại component.
3. Logic dùng React lifecycle/state và có contract tái sử dụng? Tạo Hook.
4. Logic đọc server data phía Client? Dùng React Query Hook trong `feature/api`.
5. Logic chỉ derive từ props/state? Tính trong render, không dùng effect/Hook mới.
6. Hook cần infrastructure? Import service đã cấu hình, không nhận/tạo HTTP Client mới.

## React Query Hook contract

- Query key chứa mọi input ảnh hưởng response.
- Query function chuyển AbortSignal đến service.
- `enabled` chỉ dùng khi query chưa hợp lệ; không che flow state mơ hồ.
- `staleTime`, `gcTime`, retry và selection có lý do domain.
- Mutation xác định duplicate submit, optimistic rollback và invalidation.
- Hook không hiển thị toast/navigation một cách bất ngờ nếu caller cần kiểm soát flow.

## Ví dụ đúng

```ts
function useOrderDetail(orderId: string | undefined) {
  return useQuery({
    queryKey: orderKeys.detail(orderId ?? ''),
    queryFn: ({ signal }) => orderService.get(orderId!, signal),
    enabled: Boolean(orderId),
  });
}
```

## Ví dụ sai

```ts
function useEverything() {
  // gọi nhiều API không liên quan, mở modal, navigate và ghi localStorage
}
```

## Best Practice

- Return object có tên thay tuple dài dễ đảo vị trí.
- Giữ dependency array đúng; không suppress exhaustive-deps.
- Cleanup subscription/timer/observer.
- Tách query Hook và presentation Hook khi lifecycle khác nhau.
- Test contract và behavior, không test internal state step.

## Anti-pattern

- Hook gọi điều kiện.
- Hook tạo axios instance.
- `useEffect` để đồng bộ derived state.
- Duplicate query result vào local state.
- Hook “tiện ích” chứa behavior của nhiều domain.

## Checklist

- [ ] Logic thực sự cần Hook.
- [ ] Tên và owner rõ ràng.
- [ ] Effect có dependency và cleanup đúng.
- [ ] React Query policy đầy đủ và không duplicate state.
- [ ] Side effect công khai trong contract.
- [ ] Hook có test khi chứa branching/race behavior đáng kể.

