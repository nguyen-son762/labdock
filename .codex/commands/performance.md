# /performance

## Mục tiêu

Audit Performance có bằng chứng và đề xuất thứ tự ưu tiên; không tự động thay đổi code nếu người dùng chỉ yêu cầu đánh giá.

## Workflow

1. Xác định route, device/network profile và metric quan trọng.
2. Đọc rendering/data flow và xác định Server/Client boundary.
3. Thu thập bundle report, network waterfall, React profiling hoặc Web Vitals sẵn có.
4. Kiểm tra Hydration, serialized props, duplicate request, Cache miss, image/font và third-party script.
5. Phân loại finding theo impact, confidence và effort.
6. Đưa cách đo xác nhận cho từng đề xuất.

## Checklist

- [ ] Phân biệt lab metric và field metric.
- [ ] Xác định bottleneck CPU, network, server hay render.
- [ ] Kiểm tra LCP asset và priority chính xác.
- [ ] Kiểm tra Suspense/Streaming và waterfall.
- [ ] Kiểm tra React Query refetch/retry thừa.
- [ ] Không đánh đổi Accessibility hoặc data freshness quan trọng.

## Output mẫu

```text
Ưu tiên 1 — High impact, high confidence: ProductGallery hydrate 96 kB chỉ để đổi ảnh; tách thumbnail controls thành Client island và giữ image markup phía Server.
Evidence: bundle analyzer và hydration profile cho thấy gallery chiếm 31% main-thread scripting.
Xác nhận: đo lại JS bytes, LCP và interaction switching image sau thay đổi.
```
