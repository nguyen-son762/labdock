# /testing

## Mục tiêu

Thiết kế hoặc bổ sung test theo risk, dùng framework và helper hiện có, ưu tiên behavior thay implementation detail.

## Workflow

1. Đọc acceptance criteria, bug history và test convention.
2. Lập behavior matrix: happy, loading, empty, error, unauthorized, retry, keyboard và race.
3. Chọn mức thấp nhất đáng tin cậy: Unit Test, Integration Test hoặc E2E Test.
4. Reuse render helper, fixture và network mock hiện có.
5. Viết test theo Arrange–Act–Assert, query bằng role/name và user event.
6. Kiểm soát clock, randomness, network và cleanup.
7. Chạy test lặp lại khi có nguy cơ flaky, sau đó chạy suite liên quan.

## Checklist

- [ ] Test chứng minh hành vi/contract.
- [ ] Không mock unit đang được kiểm tra.
- [ ] Không snapshot cây lớn dễ vỡ.
- [ ] Bug fix có regression test khi khả thi.
- [ ] Critical journey có E2E Test phù hợp.
- [ ] Test deterministic và thất bại với lý do rõ.

## Output mẫu

```text
Đã thêm Integration Test cho Add To Cart: thành công, API 409, double submit và keyboard activation.
Network được mock tại service boundary; không mock useMutation.
Validation: test chạy 10 lần liên tiếp không flaky.
```

