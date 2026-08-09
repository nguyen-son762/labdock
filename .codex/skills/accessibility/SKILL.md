---
name: accessibility
description: Thiết kế và review Accessibility theo WCAG 2.2 AA cho semantic HTML, keyboard, ARIA, focus, Screen Reader, contrast và accessible form. Dùng khi tạo/sửa UI, form, dialog, menu, table hoặc interaction tùy chỉnh.
---

# Accessibility

## Mục tiêu

Cho phép người dùng keyboard, Screen Reader, zoom và reduced motion hoàn thành cùng tác vụ với thông tin tương đương.

## Trách nhiệm

- Dùng semantic HTML/Shadcn UI trước custom ARIA.
- Xác định accessible name, role, state và focus lifecycle.
- Thiết kế form label/error/status.
- Kiểm tra contrast, reflow, target size và motion.
- Kết hợp automated test với manual reasoning.

## Quy trình

1. Xác định task flow và semantic structure.
2. Tìm primitive accessible hiện có.
3. Lập keyboard map và focus entry/exit.
4. Implement label, description, error và live status.
5. Kiểm tra 200%/400% zoom, narrow viewport và long text.
6. Kiểm tra reduced motion và non-color cues.
7. Chạy automation + keyboard test; review Screen Reader announcements.

## Decision Tree

1. Native element giải quyết được? Dùng native.
2. Là navigation? Link; là action? Button.
3. Overlay modal? Dialog với focus trap, heading, Escape và restore.
4. Async status quan trọng? Live region phù hợp, không spam.
5. Visual label không tồn tại? Tạo accessible name có nghĩa.
6. Custom widget? Theo APG pattern và keyboard contract đầy đủ.

## Checklist

- [ ] Mọi control có accessible name.
- [ ] Keyboard order và visible focus logic.
- [ ] Focus trap/restore đúng.
- [ ] Input label/error liên kết programmatically.
- [ ] Contrast và thông tin không chỉ dựa màu.
- [ ] Zoom/reflow/reduced motion không mất chức năng.

## Anti-pattern

- `div` clickable có `tabIndex` nhưng thiếu keyboard semantics.
- Thêm ARIA để sửa HTML sai.
- Tự focus mỗi render.
- Gợi ý trong input thay cho label.
- Toast là cách duy nhất thông báo field error.

## Best Practice

- Query test bằng role và accessible name.
- Giữ focus style rõ trên mọi nền.
- Dùng `aria-describedby` cho help/error.
- Cho phép pause/disable motion không cần thiết.

## Ví dụ đúng

Dialog có title, description, focus ban đầu hợp lý, Tab bị giữ trong dialog và focus trả về trigger khi đóng.

## Ví dụ sai

Modal là `div` fixed không role, không focus trap, đóng chỉ bằng click icon không có accessible name.
