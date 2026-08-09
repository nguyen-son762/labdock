---
name: performance
description: Đo, phân tích và tối ưu Core Web Vitals, Bundle Size, Hydration, Render Count, network waterfall, image, Cache, Suspense và Streaming. Dùng khi có regression hiệu năng, route chậm hoặc thay đổi shared/client-heavy code.
---

# Performance

## Mục tiêu

Tối ưu bottleneck có bằng chứng mà không làm sai dữ liệu, SEO hoặc Accessibility.

## Trách nhiệm

- Xác định metric/baseline và môi trường đo.
- Phân biệt server, network, CPU, render và asset bottleneck.
- Ưu tiên giảm Client JavaScript và waterfall.
- Đo lại cùng điều kiện sau mỗi thay đổi.
- Báo impact, confidence, effort và residual risk.

## Quy trình

1. Chọn LCP, INP, CLS, TTFB, JS bytes hoặc render count.
2. Tái hiện và lưu baseline.
3. Đọc component/data tree, bundle và network.
4. Lập hypothesis có thể kiểm chứng.
5. Thực hiện optimization nhỏ nhất.
6. Đo before/after và kiểm tra correctness.
7. Review SEO, Accessibility, Cache freshness và mobile.

## Decision Tree

1. TTFB cao? Kiểm tra server waterfall, origin và Cache.
2. LCP cao? Kiểm tra asset, server HTML, priority và render blocking.
3. INP cao? Kiểm tra JS bytes, Hydration, long task và render propagation.
4. CLS cao? Đặt dimensions/fallback ổn định.
5. Bundle lớn? Tách Client boundary, Dynamic Import non-critical dependency.
6. Refetch nhiều? Sửa query key/freshness/invalidation.

## Checklist

- [ ] Có baseline và phương pháp đo.
- [ ] Request độc lập chạy song song.
- [ ] Client boundary/serialized props tối thiểu.
- [ ] Image dùng dimensions và `sizes` đúng.
- [ ] Memoization chỉ dùng cho bottleneck đo được.
- [ ] Kết quả đo lại không regression behavior.

## Anti-pattern

- Dùng memo ở mọi component.
- Dynamic Import LCP content.
- Tăng Cache vô hạn để làm benchmark đẹp.
- Prefetch mọi link/API.
- Đánh giá chỉ trên máy phát triển mạnh.

## Best Practice

- Field data định hướng, lab data chẩn đoán.
- Ưu tiên xóa JavaScript hơn tối ưu JavaScript.
- Stream section chậm độc lập với fallback ổn định.
- Ghi performance budget cho shared dependency quan trọng.

## Ví dụ đúng

Đo bundle cho thấy chart editor chiếm 120 kB; chỉ Dynamic Import khi user mở edit mode và đo INP/JS bytes lại.

## Ví dụ sai

Thêm `useMemo` vào mọi map/filter dù profiler cho thấy network waterfall mới là bottleneck.
