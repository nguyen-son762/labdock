---
name: architecture
description: Thiết kế và đánh giá kiến trúc Frontend Feature First cho Next.js Enterprise. Dùng khi thêm feature, thay đổi boundary, tổ chức module, xử lý dependency, lập migration hoặc lựa chọn abstraction có ảnh hưởng nhiều phần của hệ thống.
---

# Architecture

## Mục tiêu

Đưa ra kiến trúc phù hợp source hiện có, ownership rõ, dependency một chiều và có thể tiến hóa theo vertical slice.

## Trách nhiệm

- Đọc `.codex/docs/architecture.md` và source liên quan trước khi thiết kế.
- Lập current-state map từ route đến data, state, UI và test.
- Giữ Feature First; không tạo architecture thứ hai.
- Xác định public API, trust boundary, failure mode và migration path.
- Đánh giá trade-off bằng Maintainability, Scalability, SEO, Performance và Security.

## Quy trình

1. Discovery instruction, config, folders và implementation tương tự.
2. Viết acceptance criteria và quality attributes ưu tiên.
3. Xác định feature owner và source of truth.
4. Chọn Server/Client, API Strategy, Cache và state.
5. Vẽ dependency direction và public contract.
6. So sánh lựa chọn khi trade-off có ý nghĩa.
7. Lập migration theo bước nhỏ có validation/rollback.
8. Review cycle, duplication, operability và testability.

## Decision Tree

1. Thay đổi cục bộ trong một feature? Giữ trong feature.
2. Nhiều feature dùng cùng primitive domain-neutral? Đưa vào shared layer phù hợp.
3. Có business vocabulary? Không đưa vào `components/ui` hoặc `lib`.
4. Cần SEO/secret/public Cache? Giữ phía Server.
5. Cần browser interaction? Tạo Client island nhỏ.
6. Abstraction mới không có consumer thực tế hoặc không giảm coupling? Không tạo.

## Checklist

- [ ] Repository evidence hỗ trợ thiết kế.
- [ ] Owner, public API và dependency direction rõ.
- [ ] Không có feature deep import hoặc cycle.
- [ ] Data/state chỉ có một source of truth.
- [ ] Migration có bước kiểm chứng và xóa đường cũ.
- [ ] Security, failure và observability được tính đến.

## Anti-pattern

- Tạo `core/common/shared` để chứa code chưa rõ owner.
- Dùng Clean Architecture như lý do thêm interface/repository không có nhu cầu thay thế.
- Chia layer theo loại kỹ thuật nhưng làm một use case nằm rải rác toàn repo.
- Big-bang migration không có trạng thái trung gian chạy được.

## Best Practice

- Route mỏng, feature cohesive, shared primitive domain-neutral.
- Abstraction xuất hiện sau pattern ổn định, không trước yêu cầu.
- Public contract nhỏ và explicit; private implementation được phép đổi.
- Ghi decision và trade-off quan trọng trong docs gần source.

## Ví dụ đúng

Đặt Cart service, query keys, React Query hooks và Cart components trong `features/cart`; route Product chỉ import `AddToCartButton` qua public API.

## Ví dụ sai

Đặt mọi API trong `services/api.ts`, mọi Hook trong `hooks/`, rồi để các feature import private implementation lẫn nhau.

