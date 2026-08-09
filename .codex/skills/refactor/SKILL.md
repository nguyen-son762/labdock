---
name: refactor
description: Refactor code Frontend an toàn, giữ behavior, cải thiện ownership, duplication, naming hoặc dependency boundary. Dùng khi di chuyển module, trích xuất component/Hook, hợp nhất implementation hoặc giảm technical debt có scope rõ.
---

# Refactor

## Mục tiêu

Cải thiện cấu trúc với diff dễ review và proof rằng hành vi quan sát được không đổi ngoài mục tiêu.

## Trách nhiệm

- Xác định behavior contract và consumer đầy đủ.
- Tạo characterization test cho code rủi ro.
- Tách mechanical change khỏi behavior change.
- Xóa đường cũ sau migration; không để dual architecture.
- Tránh cleanup/dependency upgrade ngoài scope.

## Quy trình

1. Discovery owner, import graph, tests và side effects.
2. Ghi invariants phải giữ.
3. Chọn một smell và target boundary.
4. Thêm/kiểm tra characterization coverage.
5. Refactor một bước nhỏ, chạy validation.
6. Migrate consumer theo public API.
7. Xóa obsolete code/export và kiểm tra cycle.
8. So sánh behavior, type, test và Bundle Size khi liên quan.

## Decision Tree

1. Duplication chưa ổn định? Chưa trích xuất.
2. Hai đoạn có cùng syntax nhưng khác owner/rule? Không hợp nhất.
3. Logic pure lặp ổn định? Trích function theo domain name.
4. Component có nhiều lý do thay đổi? Tách theo data/interaction/visual boundary.
5. Public API cần đổi? Chỉ khi task cho phép và migration rõ.
6. Wrapper cũ không còn consumer? Xóa ngay.

## Checklist

- [ ] Behavior preservation rõ.
- [ ] Test trước/sau đủ cho risk.
- [ ] Không đổi API ngầm.
- [ ] Không duplicate implementation sau migration.
- [ ] Import graph và naming tốt hơn.
- [ ] Diff không có formatting churn.

## Anti-pattern

- Refactor lớn cùng bug fix nhỏ.
- Trích generic abstraction với một consumer.
- Giữ adapter cũ vô thời hạn.
- Move file nhưng để deep import/private access.
- Đổi behavior rồi gọi là cleanup.

## Best Practice

- Commit/diff logic theo bước mechanical rồi semantic khi workflow cho phép.
- Giữ intermediate state build được.
- Tối ưu cho deletion và comprehension.
- Ghi removal plan nếu compatibility tạm thời thật sự cần.

## Ví dụ đúng

Hợp nhất query key Cart trùng lặp sau khi xác nhận cùng semantics, migrate toàn consumer và xóa export cũ.

## Ví dụ sai

Gộp Wishlist và Cart service vì cùng dùng POST dù lifecycle, error và Authorization khác nhau.

