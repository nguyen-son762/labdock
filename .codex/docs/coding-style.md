# Coding Style

## Nguyên tắc

Code phải thể hiện intent, ownership và failure behavior mà không cần đọc implementation sâu. Convention hiện có và automated formatter/linter là source of truth.

## Decision Tree

1. Có pattern tương tự trong cùng feature? Theo pattern đó.
2. Logic là pure transformation? Viết function nhỏ, explicit input/output.
3. Logic chứa side effect? Đặt tại boundary rõ như service, mutation hoặc event handler.
4. Có nhiều trạng thái loại trừ nhau? Dùng discriminated union thay nhiều boolean.
5. Input đến từ ngoài trust boundary? Parse bằng Zod trước khi dùng.
6. Abstraction có làm rõ owner/interface không? Nếu không, giữ code trực tiếp.

## TypeScript style

- Khai báo return type cho public API và boundary phức tạp.
- Ưu tiên `type` cho union/composition; theo convention repository nếu đã chọn `interface`.
- Dùng `satisfies` cho config literal cần kiểm tra mà không widen.
- Dùng `unknown` và narrow; không cast qua `any`.
- Dùng early return để giảm nesting nhưng không làm phân tán cleanup.
- Xử lý `null`, `undefined` và empty theo nghĩa domain.

## Error handling

- Không silent catch. Hoặc recover, map error, report có kiểm soát, hoặc rethrow.
- Error message cho user phải actionable và không lộ internals.
- Log có context như operation/correlation id nhưng không chứa PII, Token hoặc Cookie.
- Phân biệt validation, unauthenticated, forbidden, not found, conflict, rate limit và unavailable khi API cho phép.

## Ví dụ đúng

```ts
type CheckoutState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'failed'; message: string }
  | { status: 'completed'; orderId: string };
```

## Ví dụ sai

```ts
// Có thể vừa loading, vừa success, vừa error.
type CheckoutState = { loading: boolean; success: boolean; error?: any };
```

## Best Practice

- Một function thực hiện một intent và trả contract rõ.
- Comment giải thích “vì sao” hoặc constraint, không diễn giải cú pháp.
- Giữ import có thứ tự theo linter; dùng alias/public API.
- Xóa code cũ sau migration hoàn tất.

## Anti-pattern

- Boolean argument không rõ nghĩa như `load(true, false)`.
- Magic number/string không có domain name.
- Function tổng quát quá sớm với nhiều generic và option.
- Suppress lint/typecheck thay vì sửa root cause.
- Catch lỗi rồi trả `undefined` khiến mất nguyên nhân.

## Checklist

- [ ] Intent đọc được từ tên và type.
- [ ] Side effect nằm ở boundary rõ.
- [ ] Không `any`, suppression hoặc silent catch.
- [ ] Error và edge case được mô hình hóa.
- [ ] Formatter/linter và convention repository được tuân thủ.

