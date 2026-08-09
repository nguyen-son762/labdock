---
name: folder-convention
description: Xác định vị trí file, feature ownership, public API, import direction và naming theo Feature First. Dùng khi tạo/move file, thêm feature, chia sẻ code hoặc xử lý folder/import không nhất quán.
---

# Folder Convention

## Mục tiêu

Đặt code tại nơi thể hiện ownership và giảm coupling, ưu tiên convention thực tế của repository.

## Trách nhiệm

- Đọc `.codex/docs/folder-structure.md` và inventory source.
- Không tạo folder rỗng hoặc architecture song song.
- Giữ private file trong feature và public API nhỏ.
- Ngăn deep import, barrel cycle và shared dumping ground.
- Co-locate type/schema/test theo owner.

## Quy trình

1. Tìm feature tương tự và alias convention.
2. Xác định owner bằng domain/use case, không chỉ loại file.
3. Chọn route, feature, shared UI, lib hoặc provider.
4. Kiểm tra import direction và cycle.
5. Tạo chỉ folder/file cần thiết.
6. Export qua public API nếu consumer bên ngoài cần.
7. Chạy typecheck/lint/test consumer.

## Decision Tree

1. Route composition? `app`.
2. Domain behavior? `features/<feature>`.
3. React Query/service riêng feature? `features/<feature>/api`.
4. Primitive domain-neutral? `components/ui`.
5. Composition dùng nhiều feature và không business rule? `components/shared`.
6. Configured infrastructure? `lib`/`providers`.
7. Không rõ owner? Tiếp tục discovery, không đưa vào `shared`.

## Checklist

- [ ] Placement theo owner.
- [ ] Naming khớp repository.
- [ ] Không folder rỗng/barrel thừa.
- [ ] Không private deep import/cycle.
- [ ] Server-only/client-only boundary rõ.
- [ ] Move file đã cập nhật mọi consumer/test.

## Anti-pattern

- Mọi Hook ở root `hooks` dù chỉ thuộc một feature.
- `utils/common.ts` chứa logic nhiều domain.
- Tạo `services/api.ts` khổng lồ.
- Import `features/x/components/internal` từ feature khác.
- Dùng `types/` toàn cục cho form type cục bộ.

## Best Practice

- Co-location trước global organization.
- Public API có chủ đích, không `export *` rộng.
- Tên folder phản ánh ubiquitous language.
- Tạo folder khi có ownership thật, không theo template máy móc.

## Ví dụ đúng

`features/orders/api/use-orders-query.ts` dùng `orders.service.ts` và export Hook cần thiết qua feature `index.ts`.

## Ví dụ sai

`src/hooks/use-orders.ts` import `src/services/api.ts` và type từ `src/types/common.ts` dù tất cả chỉ thuộc Orders.

