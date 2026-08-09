# /architecture

## Mục tiêu

Phân tích hoặc đề xuất kiến trúc dựa trên source hiện có, nêu trade-off và migration path; không viết application code nếu chỉ được yêu cầu thiết kế.

## Workflow

1. Discovery instruction, folder, dependency, config và feature tương tự.
2. Vẽ current flow: route, data, state, component, Cache và test.
3. Xác định quality attribute ưu tiên: scalability, maintainability, SEO, Performance, Security.
4. Đề xuất ownership và dependency direction tối thiểu.
5. Phân loại Server/Client, API Strategy, state và Cache.
6. So sánh ít nhất lựa chọn khả thi khi trade-off có ý nghĩa.
7. Đưa migration theo vertical slice, validation và rollback point.

## Checklist

- [ ] Đề xuất khớp repository, không dựng architecture thứ hai.
- [ ] Boundary và source of truth rõ.
- [ ] Dependency direction không cycle.
- [ ] Failure, Security và observability được tính đến.
- [ ] Không thêm library nếu capability hiện có đủ.
- [ ] Migration có bước nhỏ và tiêu chí hoàn tất.

## Output mẫu

```text
Đề xuất giữ Catalog data ở Server Component với tag-based Cache; tách Cart thành Client island dùng React Query.
Trade-off: thêm hai data lifecycle nhưng giữ SEO và public Cache, đồng thời cô lập personalized data.
Migration gồm ba bước có thể rollback độc lập: server fetch Catalog, Cart service/Hook, xóa client fetch Catalog cũ.
```

