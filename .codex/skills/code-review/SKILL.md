---
name: code-review
description: Review thay đổi Frontend theo severity và failure scenario, bao gồm correctness, Architecture, API, Cache, state, TypeScript, Performance, SEO, Accessibility, Security và testing. Dùng cho diff, pull request hoặc pre-merge audit.
---

# Code Review

## Mục tiêu

Tìm defect có thể hành động được, ưu tiên tác động người dùng/hệ thống thay vì style chủ quan.

## Trách nhiệm

- Hiểu acceptance criteria và đọc context ngoài diff.
- Xác minh finding bằng call path, test hoặc tài liệu source-of-truth.
- Review severity từ data/security/correctness xuống maintainability.
- Không sửa code nếu chỉ được yêu cầu review.
- Nêu residual risk khi không có finding.

## Quy trình

1. Đọc yêu cầu, diff và file đầy đủ.
2. Theo dấu caller/callee, state, Cache và error path.
3. Kiểm tra Authentication, Authorization, privacy, race và data loss.
4. Kiểm tra feature ownership, Server/Client, API Strategy và invalidation.
5. Kiểm tra SEO, Accessibility, Performance, TypeScript và test.
6. Chạy validation hẹp nếu cần xác nhận.
7. Viết finding: severity, vị trí, scenario, impact và remediation direction.

## Decision Tree

1. Có hành vi sai/rò rỉ/crash? Finding.
2. Chỉ là preference nhưng convention cho phép? Không finding.
3. Linter/typecheck bắt chắc chắn? Có thể nêu nếu CI không chạy; ưu tiên vấn đề logic.
4. Finding phụ thuộc giả định chưa chứng minh? Điều tra thêm hoặc ghi rõ confidence.
5. Thiếu test nhưng không có behavior risk cụ thể? Nêu test gap, không phóng đại severity.
6. Không finding? Báo rõ validation và phần chưa kiểm chứng.

## Checklist

- [ ] Finding có failure scenario cụ thể.
- [ ] Severity phản ánh impact và khả năng xảy ra.
- [ ] Không bỏ qua private Cache/user switch.
- [ ] Không bỏ qua loading/error/race.
- [ ] Không viết review dài về formatting.
- [ ] Không claim test đã chạy nếu chưa chạy.

## Anti-pattern

- Chỉ đọc tên file/diff snippet.
- Báo “có thể lỗi” mà không có path tái hiện.
- Đòi refactor ngoài scope như blocker.
- Chôn P0/P1 giữa nhiều nit.
- Tự sửa khi người dùng chỉ yêu cầu review.

## Best Practice

- Finding ngắn, precise và nằm gần code.
- Ưu tiên root cause, không liệt kê nhiều symptom.
- Review generated/config changes và lockfile intent.
- Đọc test để hiểu contract nhưng không coi test là bằng chứng duy nhất.

## Ví dụ đúng

`profileKeys.detail()` thiếu userId, cho phép Cache của user cũ hiển thị sau account switch; nêu lifecycle cụ thể và cách isolate key/reset.

## Ví dụ sai

“Nên đổi tên biến này cho sạch hơn” mà không vi phạm convention hoặc gây hiểu sai behavior.

