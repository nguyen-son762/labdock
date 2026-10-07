# QA bug backlog

Folder này lưu các bug đã được QA xác nhận. Mỗi bug là một file Markdown theo [_template.md](_template.md).

## Status

- `open`: đã xác nhận, chưa bắt đầu sửa
- `in_progress`: đang được fix bởi agent
- `resolved`: đã sửa và validation đạt
- `blocked`: cần thông tin, backend, quyền hoặc quyết định sản phẩm
- `rejected`: không còn hợp lệ hoặc đã chứng minh là test defect

Chỉ đưa bug vào backlog khi có reproduction/evidence đủ rõ. Không lưu finding speculative như bug confirmed.

## Workflow

1. Chạy `/qa-audit` để phát hiện và lưu bug.
2. Chạy `/qa-fix` để agent xử lý các bug `open`.
3. Review diff và kiểm tra `status`, regression test, validation command trong từng file bug.
