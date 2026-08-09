---
name: typescript
description: Mô hình hóa contract TypeScript strict, narrow unknown, Zod inference, generic, utility type và discriminated union. Dùng khi thiết kế type, sửa type error, review unsafe assertion hoặc mô hình hóa API/form/workflow state.
---

# TypeScript

## Mục tiêu

Đưa lỗi về compile/validation boundary, làm trạng thái vô hiệu không thể biểu diễn và tránh type drift.

## Trách nhiệm

- Giữ Strict Mode và đọc `tsconfig` thực tế.
- Reuse/derive type từ schema và public contract.
- Dùng `unknown` tại external boundary rồi narrow.
- Phân biệt transport, domain, form và view model.
- Không che lỗi bằng `any`, assertion hoặc suppression.

## Quy trình

1. Xác định source of truth của shape.
2. Nếu input runtime, tạo/reuse Zod schema và infer type.
3. Mô hình hóa nullability và state transition.
4. Chọn union, utility type hoặc generic tối thiểu.
5. Giữ exported type nhỏ và explicit.
6. Loại cast/suppression bằng narrowing hoặc design change.
7. Chạy typecheck và test runtime boundary.

## Decision Tree

1. Dữ liệu từ API/storage/URL? `unknown` + parse.
2. Type đã tồn tại từ schema/function? Derive, không copy.
3. Các variant loại trừ nhau? Discriminated union.
4. Cần biến đổi một type ổn định? Utility type có ý nghĩa.
5. Quan hệ input-output phải được giữ? Generic.
6. Chỉ muốn ép compiler im lặng? Dừng và sửa contract.

## Checklist

- [ ] Không `any`, `@ts-ignore` hoặc double cast.
- [ ] External data được validate/narrow.
- [ ] Optional/null/empty có nghĩa rõ.
- [ ] Union loại bỏ trạng thái vô hiệu.
- [ ] Generic có constraint và mục đích.
- [ ] Public type không leak transport detail không cần thiết.

## Anti-pattern

- Handwrite type giống hệt Zod schema rồi để drift.
- `as SomeType` ngay sau `response.json()`.
- `!` để bỏ qua lifecycle không chắc chắn.
- Generic một lần dùng không tạo quan hệ type.
- Object nhiều boolean cho workflow.

## Best Practice

- `satisfies` cho config literal.
- Exhaustive switch với `never` cho domain state quan trọng.
- Branded/refined schema cho identifier nếu project đã dùng.
- Return type rõ ở public boundary.

## Ví dụ đúng

`ProfileFormValues` được `z.infer<typeof profileFormSchema>` và API mapper chuyển sang `UpdateProfileInput` riêng.

## Ví dụ sai

Ép `response.data as User` và giả định mọi field luôn có dù API có thể trả `null`.

