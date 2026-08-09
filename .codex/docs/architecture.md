# Kiến trúc Frontend

## Mục tiêu

Duy trì kiến trúc Feature First cho Next.js 15 App Router, cho phép team mở rộng theo domain mà không tạo dependency vòng, duplicate business rule hoặc Client boundary quá lớn.

## Sơ đồ dependency

```text
app/routes
  -> features/<feature>/public API
    -> feature components, hooks, api, schemas
      -> components/ui, lib, shared infrastructure
```

Dependency chỉ đi xuống. `components/ui` và `lib` không import từ `features`. Một feature không deep import private file của feature khác.

## Trách nhiệm từng layer

- `app/`: route, layout, metadata, Route Handler, composition và server data boundary.
- `features/`: use case, business presentation, React Query hooks, feature service, schema và feature component.
- `components/ui/`: primitive Shadcn UI, không biết business domain.
- `components/shared/`: composition dùng lại ở nhiều domain nhưng vẫn domain-neutral.
- `lib/`: axios instance, logger, environment parser và infrastructure được cấu hình.
- `providers/`: React Query provider và provider cấp ứng dụng.

## Decision Tree

1. Code chỉ dùng trong một use case? Đặt trong feature đó.
2. Code dùng trong nhiều màn hình của cùng feature? Giữ trong feature và export qua public API nếu cần.
3. Code dùng bởi ít nhất hai feature và không mang business rule? Cân nhắc `components/shared`, `hooks` hoặc `lib` theo bản chất.
4. Code là primitive UI? Đặt tại `components/ui`.
5. Code cần secret, privileged access hoặc render SEO? Giữ phía Server.
6. Cần event/browser API? Tạo Client Component nhỏ nhất.

## Luồng ví dụ: cập nhật hồ sơ

```text
app/account/profile/page.tsx
  -> features/profile/ProfileScreen
    -> features/profile/api/use-update-profile.ts
      -> features/profile/api/profile.service.ts
        -> lib/http-client.ts
```

Zod schema thuộc `features/profile/schemas`. React Hook Form state thuộc form component. Response của API thuộc React Query Cache; không copy vào Context.

## Ví dụ đúng

Route Account chỉ compose `ProfileScreen`; feature Profile sở hữu service, React Query Hook, schema, form và public API. Shared Button vẫn không biết nghiệp vụ Profile.

## Ví dụ sai

Route Account gọi Axios trực tiếp, lưu response vào Context toàn cục và import component nội bộ của feature Authentication bằng private path.

## Best Practice

- Export public API có chủ đích từ `features/<feature>/index.ts`.
- Co-locate test với owner nếu repository chưa có convention khác.
- Tách transport model khỏi form model khi field hoặc nullability khác nhau.
- Giữ route file mỏng và dễ đọc như bản đồ composition.
- Chỉ trích xuất shared abstraction sau khi interface đã ổn định qua use case thực tế.

## Anti-pattern

- Feature A import `features/b/internal/*`.
- `components/shared` chứa checkout rule hoặc Authentication policy.
- Route chứa form state, Axios call và UI phức tạp trong cùng file.
- Thêm `core`, `common`, `manager` nhưng không định nghĩa ownership.
- Tạo repository/service interface chỉ để bọc một function không có nhu cầu thay thế.

## Checklist

- [ ] Mỗi file có một owner rõ ràng.
- [ ] Dependency đi đúng chiều và không có deep import xuyên feature.
- [ ] Server-only code không đi vào client bundle.
- [ ] Không duplicate source of truth hoặc business rule.
- [ ] Public API của feature tối thiểu và ổn định.
- [ ] Abstraction mới có ít nhất một lý do sử dụng hiện tại, không dự phòng.
