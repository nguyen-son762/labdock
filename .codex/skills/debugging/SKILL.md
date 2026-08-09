---
name: debugging
description: Chẩn đoán lỗi Frontend bằng reproduction, evidence và hypothesis có thể bác bỏ. Dùng khi có bug, flaky behavior, Hydration mismatch, stale Cache, race condition, API failure hoặc regression chưa rõ root cause.
---

# Debugging

## Mục tiêu

Xác định root cause có bằng chứng trước khi sửa và thêm regression protection phù hợp.

## Trách nhiệm

- Phân biệt symptom, trigger và root cause.
- Đọc end-to-end code path và thay đổi gần đây.
- Thu thập evidence tối thiểu, không log secret.
- Thay một biến mỗi thử nghiệm.
- Không refactor rộng trong khi chưa hiểu lỗi.

## Quy trình

1. Ghi expected/actual, steps, environment, frequency.
2. Tạo reproduction nhỏ nhất.
3. Phân lớp routing/rendering, API/Cache, state, timing, browser, build, environment.
4. Viết hypothesis và prediction.
5. Chạy thử nghiệm có thể bác bỏ.
6. Xác nhận root cause bằng test/reproduction.
7. Implement fix nhỏ nhất nếu được yêu cầu.
8. Thêm regression test, kiểm tra lân cận và xóa instrumentation.

## Decision Tree

1. Không tái hiện local? So sánh env/data/feature flag/browser.
2. Chỉ xảy ra sau navigation? Kiểm tra Cache, stale closure và cleanup.
3. Chỉ xảy ra nhanh/chậm? Kiểm tra race, cancellation và duplicate submit.
4. Server/client markup khác? Kiểm tra non-determinism và browser-only value.
5. 401 loop? Kiểm tra refresh single-flight và session reset.
6. Chỉ production? Kiểm tra build optimization, env và CDN Cache.

## Checklist

- [ ] Có reproduction/evidence.
- [ ] Hypothesis dự đoán kết quả cụ thể.
- [ ] Root cause giải thích toàn bộ symptom.
- [ ] Fix không chỉ che error.
- [ ] Regression test fail trước/pass sau khi khả thi.
- [ ] Debug log/instrumentation đã xóa.

## Anti-pattern

- Thêm retry/delay để “ổn định”.
- Đổi nhiều biến cùng lúc.
- Catch và bỏ lỗi.
- Sửa component gần symptom nhưng bỏ qua stale query key.
- Kết luận từ một log không có context.

## Best Practice

- Dùng binary search trên code path/change history.
- Kiểm soát Promise order để test race.
- Kiểm tra source of truth và lifecycle trước rendering detail.
- Ghi residual uncertainty nếu không thể xác minh môi trường.

## Ví dụ đúng

Tạo test cho hai search request trả ngược thứ tự, chứng minh key/cancellation sai rồi sửa key và truyền AbortSignal.

## Ví dụ sai

Debounce thêm 500 ms để giảm xác suất response cũ ghi đè mà không sửa race.
