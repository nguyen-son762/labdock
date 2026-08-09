# /ui

## Mục tiêu

Implement hoặc review UI nhất quán với Shadcn UI, TailwindCSS và Accessibility contract hiện có.

## Workflow

1. Tìm primitive/component/token và pattern tương tự trong `src/components/ui`.
2. Xác định semantic structure, responsive behavior và interaction states.
3. Chọn Server Component cho markup tĩnh; tạo Client island cho interaction.
4. Nếu thiếu control, bổ sung component Shadcn chính thức vào `src/components/ui`; sau đó compose thay vì tự viết lại focus/keyboard behavior.
5. Dùng token hiện có cho màu, spacing, typography và radius.
6. Dùng duy nhất icon `iconsax-reactjs`, chọn export theo nghĩa và giữ `aria-hidden`/accessible name đúng.
7. Implement default, hover, focus, disabled, loading, empty, error và long-content state.
8. Kiểm tra keyboard, Screen Reader, contrast, zoom/reflow và reduced motion.

## Control Map

- Form validation: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`.
- Text: `Input`; date: `DatePicker`; option: `Select`; boolean: `Checkbox`/`Switch`; action: `Button`.
- Không dùng native `<input>`, `<select>`, `<button>` trong feature khi có primitive tương ứng.

## Checklist

- [ ] Reuse primitive/component hiện có.
- [ ] Đã bổ sung Shadcn primitive còn thiếu trước khi tạo custom control.
- [ ] Icon đến từ `iconsax-reactjs`, không thêm thư viện icon khác.
- [ ] Semantic HTML và accessible name đúng.
- [ ] Visible focus, focus restore và Escape đúng khi liên quan.
- [ ] Responsive và long text không vỡ layout.
- [ ] Không hardcode token hoặc tạo boolean prop hỗn loạn.
- [ ] Client boundary và Bundle Size tối thiểu.

## Output mẫu

```text
Đã xây dựng dialog đổi địa chỉ bằng Dialog, Form và Button hiện có; không tạo primitive mới.
Focus được đưa vào heading khi mở, trả về trigger khi đóng; lỗi field được liên kết bằng aria-describedby.
Validation: keyboard flow, Integration Test và lint đạt.
```
