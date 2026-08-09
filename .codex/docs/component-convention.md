# Component Convention

## Phân loại

- **Route composition:** ghép metadata, Server data và feature entry point.
- **Feature component:** hiểu domain và use case.
- **Shared composition:** dùng ở nhiều feature nhưng không chứa business rule.
- **UI primitive:** Shadcn UI/semantic primitive, có Accessibility contract.

## Decision Tree

1. Có Shadcn primitive trong `src/components/ui` đáp ứng semantic và interaction? Reuse.
2. Shadcn có primitive phù hợp nhưng source chưa có? Bổ sung vào `src/components/ui`.
3. Chỉ khác visual variant ổn định? Mở rộng variant hiện có.
4. Khác business behavior/owner? Compose tại feature, không nhồi vào primitive.
5. Không cần interaction/browser API? Giữ Server Component.
6. Cần state/event? Tạo Client Component leaf.
7. Có hơn một boolean prop tạo tổ hợp vô hiệu? Dùng variant/discriminated props/composition.
8. Shadcn/Radix không thể đáp ứng? Ghi rõ constraint rồi mới tạo custom primitive.

## Form convention

- Mọi form nghiệp vụ dùng React Hook Form + Zod qua Shadcn `Form` primitives.
- Dùng `Input`, `DatePicker`, `Select`, `Checkbox`/`Switch`, `Textarea` và `Button` theo loại dữ liệu.
- Native form element chỉ được nằm trong implementation của UI primitive; feature không tự nối `id`, label, error và `aria-describedby` khi `FormControl` đã xử lý.

## Props contract

- Feature boundary nhận identifier/domain value cần thiết, không nhận axios client hoặc React Query object.
- UI primitive nhận presentation props và forward ref khi primitive yêu cầu.
- Icon trong mọi layer dùng `iconsax-reactjs`; icon trang trí có `aria-hidden="true"`, icon-only action có accessible name.
- Callback dùng tên `on<Action>`; không expose internal state setter.
- Tránh props object khổng lồ chứa dữ liệu không dùng.
- Children/slot được ưu tiên khi composition linh hoạt hơn boolean config.

## Trạng thái UI bắt buộc

Với component dựa API, xem xét: loading, empty, partial, error, unauthorized, disabled, retry và success feedback. Skeleton phải giữ layout; error phải có đường recovery khi có thể.

## Ví dụ đúng

```tsx
<Dialog>
  <DialogTrigger asChild><Button>Đổi địa chỉ</Button></DialogTrigger>
  <DialogContent><AddressForm /></DialogContent>
</Dialog>
```

## Ví dụ sai

```tsx
<UniversalCard isProduct isClickable hasCartMode compact admin={false} />
```

## Best Practice

- Semantic HTML trước ARIA; button cho action, link cho navigation.
- Tận dụng Shadcn UI behavior về focus/keyboard thay vì tự dựng lại.
- Dùng TailwindCSS token và class merge utility hiện có.
- Đặt Client boundary quanh interaction, không quanh toàn section tĩnh.
- Kiểm tra responsive, zoom, long text và localization.

## Anti-pattern

- `div` có `onClick` thay button.
- Component vừa fetch, normalize, mutate, quản lý form và render page.
- Mirror props vào state bằng effect.
- Memo hóa mọi component không có đo lường.
- Hardcode màu/khoảng cách bỏ qua design token.

## Checklist

- [ ] Đã tìm component/Shadcn primitive hiện có.
- [ ] Không có native form control trực tiếp trong feature khi Shadcn đã hỗ trợ.
- [ ] Không có import icon từ thư viện ngoài `iconsax-reactjs`.
- [ ] Component có một owner và một lý do thay đổi rõ.
- [ ] Server/Client boundary tối thiểu.
- [ ] Props loại bỏ trạng thái vô hiệu.
- [ ] Loading/error/empty và Accessibility được xử lý.
- [ ] Không tạo visual token mới tùy ý.
