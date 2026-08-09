# Naming Convention

## Mục tiêu

Tên phải cho biết domain, intent và loại contract; tránh buộc maintainer mở file chỉ để hiểu vai trò.

## Quy tắc

- Component/type/schema: `PascalCase`.
- Hook: `useCamelCase` và tên nêu state/lifecycle sở hữu.
- Function/variable: `camelCase`.
- Constant toàn module và bất biến: `UPPER_SNAKE_CASE`.
- Predicate: `is`, `has`, `can`, `should`.
- Event prop: `onSubmit`, `onRemove`; handler nội bộ: `handleSubmit`, `handleRemove`.
- API read: `getProduct`, `listOrders`; mutation: `createOrder`, `updateProfile`, `removeCartItem`.
- Query key factory: `<domain>Keys` với `all`, `list`, `detail` theo hierarchy.
- Zod schema: `profileFormSchema`; inferred type: `ProfileFormValues`.

## File naming mặc định

Khi repository chưa có convention, dùng kebab-case:

```text
product-card.tsx
product-card.test.tsx
profile-form.schema.ts
profile.service.ts
use-profile-query.ts
order-query-keys.ts
```

## Decision Tree

1. Tên có phản ánh domain cụ thể? Nếu không, thêm domain.
2. Function có side effect? Dùng động từ hành động, không dùng `get` nếu thực chất mutation.
3. Boolean có thể đọc như câu hỏi? Dùng prefix predicate.
4. Type là input/output/form/view model? Thêm suffix phân biệt khi shape khác nhau.
5. File chỉ chứa một public symbol? Đặt tên file theo symbol và convention repository.

## Ví dụ đúng

```ts
const canSubmitPayment = isFormValid && !isPaymentPending;
async function updateShippingAddress(input: ShippingAddressInput) {}
```

## Ví dụ sai

```ts
const flag = a && !b;
async function processData(data: any) {}
```

## Best Practice

- Dùng ubiquitous language từ product/API.
- Giữ cùng một thuật ngữ xuyên UI, type, service và test.
- Phân biệt `fetch` kỹ thuật với intent domain trong public API.
- Đổi tên khi trách nhiệm đổi; không giữ tên lịch sử gây hiểu sai.

## Anti-pattern

- `utils`, `helpers`, `common`, `misc`, `manager` không có phạm vi.
- Viết tắt nội bộ không được thống nhất.
- Dùng tên thư viện làm domain name.
- Một entity có nhiều tên đồng nghĩa trong cùng luồng.

## Checklist

- [ ] Tên biểu đạt domain và intent.
- [ ] Predicate/handler/API function theo prefix thống nhất.
- [ ] File name khớp convention repository.
- [ ] Không có từ chung chung hoặc viết tắt khó hiểu.
- [ ] Test name mô tả hành vi và điều kiện.

