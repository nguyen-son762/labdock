# /review

## Mục tiêu

Review thay đổi theo rủi ro, ưu tiên defect có thể gây sai hành vi, rò rỉ dữ liệu, regression hoặc phá kiến trúc.

## Workflow

1. Đọc yêu cầu/acceptance criteria và diff đầy đủ.
2. Đọc context quanh file đổi và consumer/callee liên quan.
3. Review correctness, race, Authentication, Authorization và data loss trước.
4. Review Architecture, API Strategy, Cache/invalidation và state ownership.
5. Review SEO, Accessibility, Performance, TypeScript và error handling.
6. Kiểm tra test có chứng minh hành vi hay chỉ test implementation detail.
7. Chạy validation hẹp nếu cần xác nhận finding.
8. Báo finding theo severity; mỗi finding có file/dòng, scenario và impact.

## Checklist

- [ ] Không review chỉ từ diff nếu behavior phụ thuộc context.
- [ ] Finding có thể tái hiện hoặc có reasoning cụ thể.
- [ ] Không báo style do formatter/linter quản lý.
- [ ] Kiểm tra user/tenant Cache boundary và Token exposure.
- [ ] Kiểm tra Client boundary, duplicate fetch và Bundle Size.
- [ ] Nếu không có finding, nêu residual risk/test gap.

## Output mẫu

```text
[P1] Query key thiếu userId tại profile-query.ts:24.
Khi user A logout rồi user B login trong cùng session, Cache ['profile'] có thể hiển thị dữ liệu của user A cho user B trước khi refetch. Thêm identity vào key và clear private queries khi logout.

Không có finding khác. Chưa xác minh bằng E2E cho luồng đổi tài khoản.
```

