# /qa-fix

## Mục tiêu

Đọc backlog `.qa/bugs/`, chọn các bug có `status: open`, spawn agent fix có kiểm soát, thêm regression test và cập nhật trạng thái bug. Đây là command có quyền sửa production code trong phạm vi đúng bug đã được xác nhận.

## Cách chạy

- `/qa-fix`: xử lý tất cả bug `open` theo severity, P0/P1 trước.
- `/qa-fix BUG-20261007-001`: chỉ xử lý bug có id cụ thể.
- `/qa-fix --review-only`: không sửa code; chỉ review backlog, duplicate, stale status và mức độ evidence.

## Quy trình QA Fix Agent

1. Đọc `.codex/AGENTS.md`, skill `debugging`, `testing`, và file bug đầy đủ.
2. Kiểm tra `status`; không nhận bug `resolved`, `rejected` hoặc `blocked` nếu không có yêu cầu rõ.
3. Đổi `status` thành `in_progress` và ghi owner/branch nếu workflow hỗ trợ.
4. Đọc toàn bộ code path, caller/callee, schema, cache, auth boundary và test liên quan.
5. Tạo reproduction nhỏ nhất hoặc regression test thất bại trước khi sửa khi khả thi.
6. Viết hypothesis có thể bác bỏ; xác nhận root cause bằng evidence.
7. Implement fix nhỏ nhất, không refactor hoặc đổi API ngoài scope.
8. Thêm regression test ở test level thấp nhất đáng tin cậy; ưu tiên behavior/user-observable assertion.
9. Chạy test hẹp, sau đó typecheck/lint và suite liên quan. Không dùng arbitrary sleep để làm test pass.
10. Spawn hoặc nhờ `QA Fix Reviewer` review diff, test và bug file.
11. Nếu đạt: cập nhật `status: resolved`, resolution, changed files và commands validation.
12. Nếu thiếu backend/env/repro hoặc có risk không thể tự quyết: cập nhật `status: blocked`, ghi rõ blocker, không đoán.
13. Nếu chứng minh bug là test defect hoặc finding không hợp lệ: `status: rejected`, ghi evidence.

## Safety rules

- Mỗi agent chỉ sửa một bug để tránh thay đổi chồng chéo.
- Không dùng `git reset --hard`, `git checkout --`, force push hoặc xóa dữ liệu.
- Không sửa test để che product bug.
- Không đổi product behavior nếu chưa có reproduction hoặc evidence.
- Không ghi token, PII, secret, cookie hoặc payload nhạy cảm vào bug file.
- Nếu nhiều bug cùng root cause, giữ bug files riêng nhưng ghi liên kết `related_bugs`.
- Nếu baseline đã đỏ từ trước, phân biệt rõ baseline failure với regression do fix.

## Agent report bắt buộc

```text
BUG:
STATUS: resolved | blocked | rejected
ROOT CAUSE:
REPRODUCTION BEFORE FIX:
FIX:
REGRESSION TEST:
FILES CHANGED:
VALIDATION:
RESIDUAL RISK:
```

## Fix reviewer checklist

- Root cause giải thích đầy đủ symptom.
- Regression test fail được nếu revert fix.
- Assertion kiểm tra behavior, không kiểm tra implementation detail.
- Không có selector hoặc wait flaky.
- Không có scope creep, secret hoặc debug instrumentation.
- Cache, auth, accessibility, error state và backward compatibility đã được xem xét khi liên quan.

## Final output

In bảng:

| Bug | Status | Severity | Root cause | Files changed | Validation |
|---|---|---|---|---|---|

Kết thúc bằng các bug còn `open`/`blocked`, residual risk và command chạy lại.
