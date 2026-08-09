# Rendering Strategy

## Mặc định

Ưu tiên Server Component. Chỉ tạo Client Component khi subtree cần event, browser API, local interactive state, effect hoặc Client-only library.

## Decision Tree

1. Nội dung cần SEO/render lần đầu? Server Component.
2. Cần secret hoặc privileged API? Server Component/Route Handler phù hợp.
3. Dữ liệu public và Cache được? Server `fetch()`.
4. Cần click/input/drag/browser API? Client Component ở leaf nhỏ nhất.
5. Server work chậm và độc lập? `Suspense` + Streaming.
6. Client dependency lớn và không critical? Dynamic Import.
7. Page vừa SEO vừa personalized? Dùng Hybrid Page, không chuyển cả page sang Client.

## Ranh giới Server/Client

- Props qua boundary phải serializable và tối thiểu.
- Không truyền object graph lớn, function hoặc infrastructure client.
- Provider Client đặt thấp nhất có thể; không bọc root nếu chỉ một route cần.
- Client island có thể nhận server-rendered initial identifier/content nhưng không sở hữu lại SEO source of truth.
- Server Component có thể compose Client Component; Client Component không import Server Component trực tiếp như module thực thi phía Server.

## Suspense và Streaming

- Boundary theo section người dùng hiểu được, không theo từng request nhỏ.
- Fallback phải giữ dimensions để tránh layout shift.
- Khởi tạo request độc lập trước khi await để tránh waterfall.
- Error boundary phải cho phép retry/recovery có nghĩa.
- Không stream content quyết định metadata sau khi metadata đã cần hoàn tất.

## Hybrid Page thực tế

Product Detail:

```text
Server shell: Product + Price + Images + Description + Metadata + Related Products
Client island: Add To Cart + Wishlist + Coupon + Inventory Refresh
```

Server shell dùng `fetch()` và public Cache. Client island dùng Axios + React Query; private query key không ảnh hưởng Cache của Product.

## Ví dụ đúng

```tsx
export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);
  return <ProductView product={product} actions={<ProductActions id={product.id} />} />;
}
```

## Ví dụ sai

```tsx
"use client";
// Sai: toàn page hydrate chỉ để xử lý một nút wishlist.
export default function ProductPage() { /* fetch SEO data trong useEffect */ }
```

## Best Practice

- Render HTML hữu ích ngay từ Server cho content chính.
- Giữ Client boundary theo interaction, không theo page.
- Dùng URL cho filter/search state cần share và deep link.
- Theo dõi Hydration cost và size của serialized props.

## Anti-pattern

- Đặt `"use client"` ở root layout.
- Dùng React Query cho metadata hoặc content indexable.
- Tạo nhiều Suspense fallback nhấp nháy không có hierarchy.
- Dynamic Import nội dung LCP/critical làm chậm render.
- Fetch cùng resource ở Server và Client mà không có lý do refresh rõ.

## Checklist

- [ ] Server Component được dùng mặc định.
- [ ] Mỗi Client Component có lý do cụ thể.
- [ ] Props qua boundary nhỏ và serializable.
- [ ] SEO content tồn tại trong server HTML.
- [ ] Suspense boundary ổn định layout và có error path.
- [ ] Không có request waterfall hoặc duplicate fetch không cần thiết.
