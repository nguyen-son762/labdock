# /debug

## Mục tiêu

Tái hiện, cô lập và chứng minh root cause trước khi đề xuất fix; tránh sửa theo phỏng đoán.

## Workflow

1. Ghi expected/actual, environment, tần suất và bước tái hiện.
2. Đọc code path, test, config, network boundary và thay đổi gần đây liên quan.
3. Phân lớp lỗi: routing/rendering, API/Cache, state, concurrency, browser, build hoặc environment.
4. Thu thập evidence tối thiểu bằng test, log, network trace hoặc reproduction.
5. Viết hypothesis có thể bác bỏ; thay một biến mỗi lần.
6. Xác nhận root cause bằng reproduction/test thất bại trước fix.
7. Nếu được yêu cầu sửa, implement fix nhỏ nhất và regression test.
8. Xóa instrumentation và chạy kiểm tra lân cận.

## Checklist

- [ ] Root cause khác symptom.
- [ ] Không dùng dữ liệu nhạy cảm trong log.
- [ ] Đã kiểm tra stale Cache, query key, race và AbortSignal.
- [ ] Đã kiểm tra Server/Client mismatch và Hydration khi liên quan.
- [ ] Regression test thất bại trước fix và đạt sau fix khi khả thi.
- [ ] Không mở rộng sang refactor không cần thiết.

## Output mẫu

```text
Root cause: search query key cố định ['suggestions'] nên response chậm của từ khóa cũ ghi đè kết quả mới.
Evidence: test với hai Promise đảo thứ tự tái hiện lỗi ổn định.
Fix: đưa keyword vào query key và truyền AbortSignal xuống Axios service.
Validation: regression test và typecheck đạt.
```

