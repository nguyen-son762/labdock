# /seo

## Mục tiêu

Audit hoặc implement technical SEO cho route Next.js mà không chuyển indexable content sang Client Component.

## Workflow

1. Xác định search intent, indexability, canonical URL và locale.
2. Kiểm tra server HTML có title, heading và content chính.
3. Kiểm tra `metadata`/`generateMetadata()`, OpenGraph, Twitter card và canonical.
4. Kiểm tra robots, sitemap, status code, redirect và duplicate URL.
5. Chọn JSON-LD schema phù hợp; đối chiếu với visible content.
6. Kiểm tra image alt, internal links, pagination và Performance liên quan SEO.
7. Validate output render thực tế, không chỉ source TypeScript.

## Checklist

- [ ] Content chính render phía Server.
- [ ] Title/description unique và đúng intent.
- [ ] Canonical tuyệt đối, nhất quán với robots/sitemap.
- [ ] OpenGraph dùng URL/image hợp lệ.
- [ ] JSON-LD serialize an toàn và không claim dữ liệu không hiển thị.
- [ ] Không tạo soft 404 hoặc duplicate content.

## Output mẫu

```text
Đã bổ sung generateMetadata cho Product Detail từ cùng server fetch với nội dung trang, canonical theo slug chuẩn và Product JSON-LD khớp giá hiển thị.
Validation: kiểm tra server HTML, structured data và build route đạt.
```

