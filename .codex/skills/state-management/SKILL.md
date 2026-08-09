---
name: state-management
description: Phân loại và đặt state đúng owner bằng Next Cache, React Query, URL, React Hook Form, useState, useReducer hoặc React Context. Dùng khi thêm state, đồng bộ nhiều component, persist dữ liệu hoặc cân nhắc state library.
---

# State Management

## Mục tiêu

Duy trì một source of truth cho mỗi state và dùng cơ chế hẹp nhất đáp ứng phạm vi chia sẻ.

## Trách nhiệm

- Phân loại server state, URL state, form state và UI state.
- Tìm provider/store/Context hiện có trước khi tạo.
- Ngăn mirror/derived/duplicated state.
- Xác định lifecycle: initialize, update, reset, persist, logout.
- Không thêm Redux nếu dự án chưa dùng và chưa có bằng chứng cần thiết.

## Quy trình

1. Liệt kê consumer, writer và lifetime của state.
2. Xác định source of truth bên ngoài hay trong UI.
3. Chọn mechanism bằng Decision Tree.
4. Thiết kế transition và invalid state.
5. Xác định persistence/version/migration nếu có.
6. Kiểm tra concurrent update, navigation và logout.
7. Test transition quan trọng thay vì internal implementation.

## Decision Tree

1. Public server data? Next Cache/server fetch.
2. Server State phía Client? React Query.
3. Cần share/bookmark/back-forward? URL params/search params.
4. Form state/validation? React Hook Form + Zod.
5. Chỉ một subtree? `useState`/`useReducer`.
6. Global UI state nhiều consumer xa? React Context hiện có.
7. Cần Redux? Chỉ đề xuất khi source đã dùng hoặc requirement vượt giải pháp hiện có và có evidence.

## Checklist

- [ ] Owner, readers, writers và reset rõ.
- [ ] Không copy React Query result vào Context.
- [ ] Không mirror props hoặc lưu derived state.
- [ ] URL state dùng cho state cần deep link.
- [ ] Persisted state có version/migration/logout cleanup.
- [ ] Transition không tạo tổ hợp vô hiệu.

## Anti-pattern

- Global Context cho modal chỉ dùng một page.
- State cho giá trị có thể tính trong render.
- Đồng bộ hai state store bằng effect.
- Persist Token hoặc private response không cần thiết.
- Thêm Redux “để sau này mở rộng”.

## Best Practice

- State gần consumer nhất.
- Dùng discriminated union/reducer cho workflow phức tạp.
- Server là source of truth cho authorization/business state.
- Dùng Context tách value/action khi giúp giảm coupling.

## Ví dụ đúng

Filter Product nằm trong search params; Cart response nằm trong React Query; trạng thái mở FilterDrawer dùng local state.

## Ví dụ sai

Copy Product list từ React Query vào Redux và đồng bộ lại bằng `useEffect`.

