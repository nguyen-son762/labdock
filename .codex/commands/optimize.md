# /optimize

## Mục tiêu

Tối ưu một luồng toàn diện dựa trên bottleneck đo được, bao gồm rendering, network, Cache, Bundle Size và Render Count.

## Workflow

1. Xác định metric và baseline: LCP, INP, CLS, TTFB, JS bytes, request count hoặc render count.
2. Tái hiện trong điều kiện ổn định và lưu evidence.
3. Phân tích server timing, waterfall, Hydration, Client boundary, image/font và React Query behavior.
4. Ưu tiên thay đổi có tác động lớn, rủi ro thấp.
5. Implement từng optimization riêng để đo chênh lệch.
6. Kiểm tra correctness, SEO và Accessibility không regression.
7. Báo before/after cùng phương pháp đo.

## Checklist

- [ ] Có baseline và metric mục tiêu.
- [ ] Không tối ưu chỉ dựa trên cảm giác.
- [ ] Không chuyển correctness sang stale Cache không kiểm soát.
- [ ] Không memo hóa rộng hoặc Dynamic Import critical content.
- [ ] Bundle và network không duplicate.
- [ ] Kết quả đo lại trong cùng điều kiện.

## Output mẫu

```text
Đã giảm JavaScript ban đầu của trang báo cáo từ 412 kB xuống 286 kB bằng Dynamic Import cho chart editor chỉ mở sau interaction.
LCP không đổi; INP thử nghiệm giảm từ 240 ms xuống 155 ms.
SEO content và keyboard flow không thay đổi.
```

