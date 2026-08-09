---
name: design-system
description: Xây dựng và duy trì UI theo nguyên tắc Shadcn-first bằng Shadcn UI, Iconsax, TailwindCSS, design token, component variant và Accessibility contract. Dùng khi tạo/sửa primitive, shared component, form, input, date picker, select, button, icon hoặc interaction pattern dùng lại.
---

# Design System

## Mục tiêu

Ưu tiên tuyệt đối primitive Shadcn phù hợp, cung cấp API component nhất quán và không đưa business logic vào design system.

## Trách nhiệm

- Inventory Shadcn UI, token, variant và component tương tự.
- Dùng duy nhất icon từ `iconsax-reactjs`; kiểm tra export Iconsax trước khi tạo hoặc thêm icon dependency.
- Bổ sung component Shadcn còn thiếu vào `src/components/ui` trước khi tự dựng control tại feature.
- Bảo toàn semantic, keyboard, focus và ref behavior.
- Dùng token thay arbitrary style.
- Phân biệt primitive, shared composition và feature component.
- Kiểm tra responsive, theme, long text và motion.

## Quy trình

1. Tìm component/token/Story/test hiện có.
2. Xác định use cases và states thực tế.
3. Chọn theo thứ tự bắt buộc: reuse Shadcn hiện có, bổ sung Shadcn còn thiếu, extend variant, compose, rồi mới cân nhắc custom primitive.
4. Thiết kế props loại bỏ tổ hợp vô hiệu.
5. Implement bằng Shadcn UI và TailwindCSS token; giữ native element bên trong primitive.
6. Test keyboard, focus, disabled/loading/error và theme.
7. Kiểm tra Bundle Size và consumer regression.

## Decision Tree

1. Primitive trong `src/components/ui` đáp ứng? Reuse.
2. Shadcn có primitive phù hợp nhưng chưa được cài? Bổ sung primitive chính thức và đồng bộ token.
3. Chỉ khác visual stable? Thêm variant.
4. Khác layout/composition? Compose primitive.
5. Chứa domain behavior? Đặt composition trong feature.
6. Custom widget cần tự quản keyboard? Chỉ tạo khi Shadcn/Radix không đủ và ghi rõ lý do.
7. Style chưa có token? Kiểm tra design source trước khi thêm.

## Icon convention

- Import icon trực tiếp từ `iconsax-reactjs`, không dùng `lucide-react`, `react-icons` hoặc bộ icon thứ hai.
- Chọn icon theo nghĩa nghiệp vụ và dùng `className`/`size` để đồng bộ với Button, Input, Alert và card.
- Icon trang trí phải có `aria-hidden="true"`; icon-only action phải có accessible name qua `aria-label` hoặc label visible.
- Dùng Iconsax `variant` nhất quán với design system; không trộn nhiều style trong cùng một interaction group nếu không có chủ đích.

## Control Map bắt buộc

- Form có validation: `Form` + `FormField` + `FormItem` + `FormLabel` + `FormControl` + `FormMessage` với React Hook Form và Zod.
- Text, email, password, number: `Input`; nội dung nhiều dòng: `Textarea`.
- Ngày: `DatePicker` compose từ `Popover` + `Calendar`; khoảng ngày dùng calendar range, không dùng text input giả ngày.
- Lựa chọn: `Select`, `RadioGroup`, `Combobox` theo số lượng và khả năng tìm kiếm.
- Boolean: `Checkbox` hoặc `Switch` theo nghĩa nghiệp vụ.
- Action: `Button`; navigation dùng link được style bằng button variant khi phù hợp.
- Feedback: `Alert`, toast, `Skeleton`, `Progress` hoặc dialog Shadcn phù hợp.

Feature không được dùng trực tiếp `<input>`, `<select>`, `<button>` hoặc tự dựng label/error wiring nếu primitive tương ứng đã tồn tại.

## Checklist

- [ ] Không duplicate Shadcn UI primitive.
- [ ] Mọi form control đã đối chiếu Control Map và không dùng native control trực tiếp tại feature.
- [ ] Mọi icon đến từ `iconsax-reactjs`, có accessible treatment và kích thước theo context.
- [ ] Props API rõ và variant hợp lệ.
- [ ] Ref, disabled, focus và event forwarding đúng.
- [ ] Semantic/ARIA/keyboard đạt Accessibility contract.
- [ ] Dùng token, hỗ trợ responsive/theme.
- [ ] Không chứa API call hoặc business rule.

## Anti-pattern

- `UniversalCard` với nhiều boolean theo domain.
- Hardcode hex, pixel và z-index không theo token.
- Bọc Button nhưng làm mất ref/keyboard/disabled.
- Copy Shadcn primitive để đổi một class.
- Dùng native date input/select/checkbox trong feature dù repository đã có Shadcn primitive tương ứng.
- Thêm thư viện icon thứ hai hoặc import icon từ thư viện khác khi Iconsax đã đáp ứng.
- Đưa Add To Cart logic vào shared Button.

## Best Practice

- Composition và slot trước config props lớn.
- Variant name theo visual intent như `destructive`, không theo page.
- Dùng class merge utility hiện có.
- Document Accessibility contract qua test/example sử dụng.

## Ví dụ đúng

Thêm `size="compact"` cho Button khi có use case lặp ổn định, giữ focus ring và touch target tối thiểu.

## Ví dụ sai

Thêm prop `isCheckoutButton` vào Button và gọi Cart mutation bên trong.
