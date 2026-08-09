---
name: documentation
description: Viết và cập nhật tài liệu kỹ thuật bám source cho Architecture, API, Cache, rendering, setup, runbook và quyết định. Dùng khi behavior/contract/operation thay đổi hoặc khi người dùng yêu cầu giải thích lâu dài cho team.
---

# Documentation

## Mục tiêu

Tạo tài liệu giúp maintainer thực hiện quyết định và vận hành hệ thống mà không lặp source hoặc trở nên stale nhanh.

## Trách nhiệm

- Xác minh mọi claim bằng source/config/test.
- Viết cho audience và task cụ thể.
- Ghi decision, rationale, constraints, example và validation.
- Cập nhật doc cũ thay vì tạo tài liệu cạnh tranh.
- Không ghi secret, Token hoặc thông tin môi trường nhạy cảm.

## Quy trình

1. Xác định audience và câu hỏi tài liệu phải trả lời.
2. Tìm doc hiện có và source of truth.
3. Lập outline theo workflow/decision, không theo lịch sử triển khai.
4. Viết rule cụ thể, path/command thực tế và failure handling.
5. Thêm Decision Tree, ví dụ đúng/sai và checklist khi là convention.
6. Kiểm tra link, tên file, thuật ngữ và code sample.
7. Review drift với source và ownership cập nhật.

## Decision Tree

1. Nội dung là contract lâu dài? Đưa vào docs/convention gần owner.
2. Là quyết định có trade-off? Ghi context, decision, consequence.
3. Là thao tác vận hành lặp lại? Viết runbook có verify/rollback.
4. Source đã tự giải thích và không có constraint ẩn? Không thêm doc dư thừa.
5. Doc hiện có cùng chủ đề? Cập nhật, không tạo bản thứ hai.
6. Thông tin thay đổi theo env? Trỏ đến config source thay vì copy value.

## Checklist

- [ ] Claim khớp source hiện tại.
- [ ] Audience, scope và owner rõ.
- [ ] Link/path/command hợp lệ.
- [ ] Không có ghi chú chưa hoàn tất, nội dung tạm hoặc secret.
- [ ] Decision có rationale/consequence.
- [ ] Ví dụ có thể áp dụng và không trái convention.

## Anti-pattern

- README dài lặp code line-by-line.
- Copy version/config có thể drift mà không nêu source.
- Tạo `new-architecture-v2.md` cạnh doc cũ.
- Viết “best practice” chung không có decision/use case.
- Tài liệu claim test pass nhưng không có evidence.

## Best Practice

- Dùng link đến source of truth, không duplicate chi tiết dễ đổi.
- Đặt rule bắt buộc gần Decision Tree và example.
- Ghi “khi nào không dùng” cho convention dễ lạm dụng.
- Cập nhật docs trong cùng task khi public contract đổi.

## Ví dụ đúng

API Convention nêu năm câu hỏi phân loại, bảng Server/Client, Cache policy, ví dụ Product Detail và checklist review.

## Ví dụ sai

Tài liệu chỉ ghi “hãy dùng Clean Code và tối ưu Performance” mà không có rule hoặc cách kiểm tra.
