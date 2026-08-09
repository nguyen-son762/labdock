---
name: git
description: Quản lý thay đổi Git an toàn và dễ review, gồm kiểm tra worktree, diff, staging intent, commit hygiene, conflict và lịch sử. Dùng khi chuẩn bị commit, review diff, xử lý conflict hoặc lập kế hoạch thay đổi nhiều bước; không push/rewrite nếu chưa được phép.
---

# Git

## Mục tiêu

Giữ thay đổi nhỏ, có chủ đích, không làm mất công việc hiện có và tạo lịch sử dễ review khi người dùng yêu cầu.

## Trách nhiệm

- Kiểm tra status/diff trước và sau thay đổi.
- Phân biệt file của task với thay đổi người dùng.
- Không dùng lệnh destructive hoặc rewrite history nếu chưa được yêu cầu rõ.
- Không commit/push mặc định khi người dùng chỉ yêu cầu code.
- Bảo vệ secret và generated noise khỏi commit.

## Quy trình

1. Đọc status, branch và diff liên quan.
2. Xác định thay đổi có sẵn; không overwrite/revert.
3. Giữ diff theo một intent, tránh formatting/dependency churn.
4. Review staged/unstaged diff và generated files.
5. Chạy validation trước commit nếu được yêu cầu commit.
6. Viết message theo convention repository, mô tả outcome.
7. Push, rebase, reset hoặc force chỉ với authorization rõ.

## Decision Tree

1. User chỉ yêu cầu implement? Không commit/push.
2. Worktree có thay đổi không thuộc task? Giữ nguyên và làm quanh chúng.
3. Cần bỏ file do agent tạo? Xác minh target chính xác và dùng cách recoverable khi có thể.
4. Conflict chạm logic user? Dừng nếu không thể giải quyết từ evidence.
5. Generated file đổi do source contract? Regenerate bằng script; không hand edit.
6. Cần rewrite published history? Yêu cầu quyền rõ và nêu rủi ro.

## Checklist

- [ ] Status/diff đã đọc.
- [ ] Không mất thay đổi người dùng.
- [ ] Diff chỉ chứa scope task.
- [ ] Secret, debug artifact và file tạm không được stage.
- [ ] Validation phù hợp đã chạy.
- [ ] Không commit/push/rewrite ngoài quyền.

## Anti-pattern

- `git reset --hard` hoặc force push mặc định.
- Stage toàn repository không review.
- Revert file vì không nhận ra thay đổi user.
- Commit lockfile vô tình.
- Gộp refactor, feature và formatting trong một intent khó review.

## Best Practice

- Dùng lệnh non-interactive và target cụ thể.
- Review `diff --check` và staged diff trước commit.
- Commit message giải thích outcome, không liệt kê thao tác cơ học.
- Tách generated output khi convention team yêu cầu nhưng giữ source/codegen đồng bộ.

## Ví dụ đúng

Giữ nguyên file user đang sửa, chỉ stage ba file thuộc Cart feature sau khi xem staged diff và chạy test liên quan.

## Ví dụ sai

Chạy reset/checkout toàn worktree để có trạng thái sạch rồi vô tình xóa thay đổi chưa commit của user.
