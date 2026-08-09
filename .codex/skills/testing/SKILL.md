---
name: testing
description: Thiết kế Unit Test, Integration Test và E2E Test theo rủi ro bằng framework hiện có. Dùng khi implement feature, sửa bug, thay boundary/shared code hoặc đánh giá test coverage và flaky test.
---

# Testing

## Mục tiêu

Chứng minh behavior và contract với test deterministic, ít phụ thuộc implementation detail.

## Trách nhiệm

- Đọc test config/helper/fixture/mock convention.
- Chọn test level thấp nhất nhưng đáng tin cậy.
- Bao phủ failure/race/Accessibility theo risk.
- Tạo regression test cho bug khi khả thi.
- Không làm test pass bằng cách giảm assertion hoặc tăng wait tùy ý.

## Quy trình

1. Chuyển acceptance criteria thành behavior matrix.
2. Chọn Unit, Integration hoặc E2E.
3. Reuse render helper, fixture và network mock.
4. Viết Arrange–Act–Assert, thao tác như user.
5. Kiểm soát network, clock, randomness và cleanup.
6. Chạy test hẹp; xác minh test fail khi behavior bị phá.
7. Chạy suite liên quan và kiểm tra flaky.

## Decision Tree

1. Pure transformation/rule? Unit Test.
2. Component + Hook/service boundary? Integration Test.
3. Critical journey qua routing/auth/backend? E2E Test.
4. Bug do race/cache? Test điều khiển thứ tự Promise/time.
5. Accessibility behavior? Role/name + keyboard Integration Test, bổ sung manual check.
6. Shared primitive? Test contract và consumer đại diện.

## Checklist

- [ ] Test hành vi quan sát được.
- [ ] Không mock unit đang test.
- [ ] Loading/error/empty/unauthorized được xét.
- [ ] Race/cancellation/retry được test khi liên quan.
- [ ] Không snapshot cây lớn.
- [ ] Test deterministic và cleanup đầy đủ.

## Anti-pattern

- Query bằng class/test id khi role/name đủ.
- Mock React Query Hook rồi claim integration.
- `waitForTimeout` cố định trong E2E.
- Test private function thay public behavior.
- Snapshot thay assertion nghiệp vụ.

## Best Practice

- Mock external boundary bằng MSW/tool hiện có.
- Fixture tối thiểu nhưng realistic.
- Test name mô tả điều kiện và kết quả.
- Critical mutation test duplicate submit và failure recovery.

## Ví dụ đúng

Test Add To Cart click hai lần khi pending chỉ gửi một request, Button disabled, lỗi 409 hiển thị và user có thể retry.

## Ví dụ sai

Mock `useAddToCartMutation` trả success rồi chỉ snapshot component.

