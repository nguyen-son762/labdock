---
name: react
description: Thiết kế và review component, Hook, state, effect, form Shadcn-first, Iconsax và composition trong React 19. Dùng khi xây UI tương tác, tách component, xử lý form, icon, rerender, concurrency hoặc sửa lỗi lifecycle.
---

# React

## Mục tiêu

Tạo component có ownership rõ, trạng thái hợp lệ, ít side effect và chỉ chạy phía Client khi interaction thực sự yêu cầu.

## Trách nhiệm

- Reuse component/Hook hiện có trước khi tạo mới.
- Phân biệt render logic, event logic và effect synchronization.
- Giữ state gần owner; không duplicate server data.
- Thiết kế props bằng composition và discriminated contract.
- Bảo toàn keyboard, focus và semantic behavior.

## Quy trình

1. Xác định component owner và Server/Client boundary.
2. Liệt kê props, state, derived values, event và external synchronization.
3. Loại state có thể derive trong render.
4. Đặt React Query ở custom Hook; dùng React Hook Form + Zod qua Shadcn `Form` primitives.
5. Compose Shadcn primitive hiện có hoặc bổ sung primitive còn thiếu trong `src/components/ui`; implement các UI state.
6. Dùng icon từ `iconsax-reactjs` và bảo đảm accessible name/`aria-hidden` theo vai trò của icon.
7. Kiểm tra rerender, stale closure, cleanup và race.
8. Test như user qua role/name và interaction.

## Decision Tree

1. Không có interaction/effect/browser API? Server Component.
2. Value tính được từ props/state? Tính trong render, không thêm state/effect.
3. Nhiều action chuyển giữa trạng thái phức tạp? Dùng reducer/discriminated union.
4. Logic pure? Tách function, không tạo Hook.
5. Logic stateful dùng lại? Tạo custom Hook có contract rõ.
6. Props có nhiều boolean tạo tổ hợp sai? Dùng variant/composition.
7. Feature đang render native form control? Thay bằng Shadcn `Form`, `Input`, `DatePicker`, `Select`, `Checkbox` hoặc `Button` tương ứng.
8. Component cần icon? Tìm export trong `iconsax-reactjs`; không thêm thư viện icon khác.

## Checklist

- [ ] Component có một owner và lý do thay đổi rõ.
- [ ] Không gọi Hook có điều kiện hoặc suppress dependency.
- [ ] Effect chỉ đồng bộ external system và có cleanup.
- [ ] Key list ổn định, không dùng index khi reorder.
- [ ] Loading/error/empty/disabled state đầy đủ.
- [ ] Form dùng Shadcn Form primitives và lỗi được liên kết với control tự động.
- [ ] Icon dùng Iconsax, được ẩn khỏi Screen Reader khi trang trí hoặc có accessible name khi là action.
- [ ] Client boundary và rerender propagation tối thiểu.

## Anti-pattern

- Mirror props hoặc React Query result vào local state.
- `useEffect` để tính derived value.
- Component “universal” với nhiều cờ boolean.
- Memo hóa mọi thứ mà không đo.
- `div onClick` thay button.

## Best Practice

- Event handler chứa action của user; effect chỉ sync với hệ thống ngoài.
- Dùng functional update khi state mới phụ thuộc state cũ.
- Return object có tên từ custom Hook.
- Tách data orchestration khỏi presentation khi làm boundary/test rõ hơn.

## Ví dụ đúng

`ProductActions` là Client Component nhỏ, nhận `productId`, dùng `useAddToCartMutation` và render Button Shadcn UI với pending/disabled state.

## Ví dụ sai

`ProductPage` là Client Component chứa fetch, form, modal, cart state và toàn bộ Product content trong một file.
