# /refactor

## Mục tiêu

Cải thiện cấu trúc, ownership hoặc readability mà không thay đổi hành vi quan sát được ngoài mục tiêu đã thống nhất.

## Workflow

1. Ghi behavior contract phải giữ và phạm vi không thay đổi.
2. Discovery tất cả consumer, test, import và side effect.
3. Tạo characterization test cho branch rủi ro.
4. Chọn một smell cụ thể: duplication, mixed responsibility, invalid boundary hoặc naming drift.
5. Tách mechanical move/rename khỏi behavior change.
6. Di chuyển một boundary mỗi bước; giữ build/test pass.
7. Migrate consumer, xóa path cũ và kiểm tra import cycle/dead export.
8. So sánh test, type, Bundle Size và behavior trước/sau khi liên quan.

## Checklist

- [ ] Behavior preservation được định nghĩa.
- [ ] Không tạo abstraction dự phòng.
- [ ] Không để hai implementation song song.
- [ ] Public API chỉ đổi khi task cho phép.
- [ ] Không trộn dependency upgrade hoặc formatting churn.
- [ ] Test chứng minh các branch quan trọng vẫn giữ nguyên.

## Output mẫu

```text
Đã gom ba query key của Cart về cartKeys trong feature Cart và migrate toàn bộ consumer.
Hành vi API, staleTime và invalidation giữ nguyên.
Đã xóa key cũ; không còn import hoặc export chết.
Validation: 8 Integration Test, typecheck và lint đạt.
```

