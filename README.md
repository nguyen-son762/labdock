# Labdock User Portal

Nền tảng Next.js 15 theo Feature First, minh họa đầy đủ luồng public SEO, Authentication phía Client, Dashboard và cập nhật Profile.

## Yêu cầu môi trường

- Node.js 20 trở lên.
- Backend hỗ trợ Bearer JWT và các endpoint trong phần API contract.

Sao chép `.env.example` thành `.env.local` và cấu hình:

```dotenv
NEXT_PUBLIC_API_BASE_URL=https://uat-api-labdock.365studio.vn/api/public/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`NEXT_PUBLIC_SITE_URL` phải là origin public thực tế ở production để canonical, robots và sitemap chính xác.
`NEXT_PUBLIC_API_BASE_URL` không có dấu `/` ở cuối; ứng dụng sẽ tự chuẩn hóa nếu biến môi trường có dấu `/`.

## Chạy dự án

```bash
npm install
npm run dev
```

Các quality gates:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Kiến trúc

```text
src/app                 Route, layout, metadata và composition
src/i18n                Locale contract, navigation và request configuration
messages                Bản dịch theo namespace cho từng locale
src/features/auth       Login/logout service, mutation và form
src/features/categories Category API phía Server, runtime schema và cây nhiều cấp
src/features/products   Product API phía Server, runtime schema và Product UI
src/features/profile    Current User query, profile mutation và Dashboard UI
src/components/ui       Primitive theo Shadcn UI convention
src/components/shared   Composition không chứa nghiệp vụ
src/lib                 Axios instance, error normalization và utility
src/providers           React Query provider tại boundary cần thiết
```

Các route nằm dưới segment `[locale]`; locale mặc định `en` giữ URL không tiền tố, còn tiếng Việt dùng `/vi`. Nội dung public vẫn được render phía Server; chỉ language switcher và các interaction cần thiết mới hydrate phía Client.

## Đa ngôn ngữ

Dự án dùng `next-intl` với source of truth tại `src/i18n/routing.ts`. Hiện hỗ trợ:

- English: `/products` (locale mặc định, không có prefix).
- Tiếng Việt: `/vi/products`.

File message nằm tại `messages/en.json` và `messages/vi.json`. Khi thêm message, phải thêm cùng key cho mọi locale; không đưa câu hiển thị dùng chung trực tiếp vào shared component. Link và điều hướng phía Client dùng wrapper trong `src/i18n/navigation.ts` để giữ locale hiện tại.

Khi thêm locale mới:

1. Thêm locale vào `src/i18n/routing.ts`.
2. Tạo file `messages/<locale>.json` có cấu trúc key tương ứng.
3. Thêm nhãn/flag vào language switcher.
4. Cập nhật locale OpenGraph trong metadata nếu locale có region riêng.
5. Chạy test, kiểm tra sitemap alternates và production build.

## UI và form

Source tuân theo nguyên tắc **Shadcn-first**. Feature phải dùng primitive trong `src/components/ui` trước khi tạo UI mới:

- Form validation: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` cùng React Hook Form và Zod.
- Text: `Input`; ngày: `DatePicker`; lựa chọn: `Select`; boolean: `Checkbox`; action: `Button`.
- `DatePicker` được compose từ `Popover` và `Calendar`; `Select`, `Checkbox`, `Label` dùng Radix để giữ keyboard/focus/accessibility behavior.
- Icon dùng duy nhất `iconsax-reactjs`; icon trang trí có `aria-hidden="true"`, còn icon-only action phải có accessible name.

Native form control chỉ nằm trong implementation của UI primitive. Feature không dùng trực tiếp `<input>`, `<select>` hoặc `<button>` khi đã có component Shadcn tương ứng.

## API contract

Tất cả request phía Client dùng axios instance tại `src/lib/http-client.ts`, có timeout, cancellation, Bearer header và refresh single-flight.

### Authentication

`POST /auth/login`

```json
{
  "email": "user@company.vn",
  "password": "a-secure-password"
}
```

Response thành công:

```json
{
  "accessToken": "<jwt>",
  "refreshToken": "<jwt>",
  "expiresAt": "2099-08-21T12:00:00+00:00",
  "mustChangePassword": false
}
```

- Token chỉ được giữ trong memory, không ghi vào local/session storage, URL hoặc log. Reload trang sẽ kết thúc phiên phía Client.
- Request sau login tự gắn `Authorization: Bearer <accessToken>`.
- Khi request trả `401`, `POST /auth/refresh` nhận `{ "refreshToken": "<jwt>" }`; các lỗi `401` đồng thời dùng chung một refresh request rồi retry với token mới.
- Refresh thất bại hoặc logout sẽ xóa token và private React Query Cache.

### Sign up

Đăng ký tài khoản là luồng ba bước. `challengeId` chỉ được giữ trong state của form để liên kết các request; OTP và password không được đưa vào URL, Cache hay persistent storage.

1. `POST /auth/signup/start`

```json
{
  "organization": "Example Name",
  "fullName": "Example Name",
  "phone": "+84901234567",
  "email": "user@labdock.local",
  "country": "VN",
  "region": "HCM",
  "address": "1 Nguyen Hue"
}
```

Response trả `challengeId` và `expiresAt`. Đồng hồ OTP dùng chính `expiresAt` từ backend; thao tác gửi lại sẽ khởi tạo challenge mới.

2. `POST /auth/signup/verify-otp` nhận `{ "challengeId": "<guid>", "code": "123456" }` và chỉ chuyển bước khi response có `{ "verified": true }`.

3. `POST /auth/signup/complete` nhận:

```json
{
  "challengeId": "<guid>",
  "password": "Passw0rd!",
  "confirmPassword": "Passw0rd!"
}
```

Response trả `userId` và `email`. Các mutation signup không tự retry để tránh gửi lặp OTP hoặc hoàn tất tài khoản nhiều lần.

Dữ liệu select của signup nằm tại:

- `src/features/auth/data/countries.json`: 249 quốc gia/vùng lãnh thổ, dùng `code` ISO alpha-2 làm giá trị `country` gửi API.
- `src/features/auth/data/calling-codes.json`: mapping quốc gia với `dialCode`; UI gom các mã trùng nhau thành một option như `+1`, `+44` hoặc `+7`.

### Current User

`GET /users/me` trả:

```json
{
  "id": "usr_01",
  "fullName": "Nguyễn An",
  "email": "user@company.vn",
  "role": "member",
  "joinedAt": "2026-01-15T08:00:00.000Z",
  "lastActiveAt": "2026-08-09T03:30:00.000Z"
}
```

`role` chỉ nhận `member`, `manager` hoặc `admin`. `lastActiveAt` có thể là `null`.

`PATCH /users/me` nhận:

```json
{
  "fullName": "Nguyễn An"
}
```

Response dùng cùng schema với `GET /users/me`.

Backend luôn phải kiểm tra Authentication và Authorization. Việc ẩn UI không được xem là kiểm soát quyền.

### Categories

`GET /categories` trên Public API trả cây nhiều cấp qua trường `children`. Frontend validate đệ quy toàn bộ response bằng Zod rồi truyền dữ liệu đã kiểm tra vào menu “All Categories”.

Category được tải trong Server Component bằng native `fetch`, không gửi Bearer token, và được cache/revalidate mỗi 5 phút. Request thất bại sẽ hiển thị trạng thái không tải được category thay vì làm hỏng header.

### Product catalog

Route `/products` tải song song `GET /products`, `GET /categories` và `GET /brands` ở Server Component. Bộ lọc là single-select theo đúng contract API và được lưu trong URL qua `categoryId`, `brandId`; phân trang và sắp xếp dùng `page`, `sort`. Mỗi lần đổi bộ lọc hoặc sort, trang được đưa về page đầu và Server Component request lại `GET /products` với `pageSize=20`.

Category tree được flatten nhưng vẫn giữ độ sâu để hiển thị phân cấp. Ba request có thể lỗi độc lập: lỗi products không khóa bộ lọc, còn lỗi categories hoặc brands không làm mất danh sách products. Dữ liệu public dùng native `fetch` và Next Data Cache revalidate 5 phút; URL request khác nhau được cache riêng, còn tag chung hỗ trợ invalidation theo resource.

### Product detail contract

Route `/products/[slug]` gọi `GET /products/{slug}` phía Server và dùng cùng payload cho metadata, JSON-LD và nội dung hiển thị. Response `404` được map sang trang Not Found; lỗi HTTP hoặc payload không hợp lệ được chuyển cho error boundary. Request được cache 5 phút với tags `products` và `product:{slug}`.

Payload đầy đủ được định nghĩa bởi type `Product` tại `src/features/products/products.types.ts` và validate bằng `publicProductDetailSchema`. Contract gồm thông tin cơ bản, trạng thái, flags yêu cầu đặc biệt/hạn chế, CAS, specifications, variants và selections, media, documents, related products và certificates. UAT có thể trả giá variant và `related` là `null` khi dữ liệu không công khai; Zod boundary chuẩn hóa giá về `0` và related về mảng rỗng để domain type không chứa nullable ngoài contract.

Detail UI dùng trực tiếp `Product`: gallery lấy media primary/sort order, purchase panel dùng variant và stock thực, References dùng documents, badges chứng nhận dùng certificates, còn shelf related được map từ `related`. Response product list rút gọn cũng được map vào cùng contract trước khi truyền xuống `ProductCard`; `ProductViewModel` chỉ còn phục vụ dữ liệu demo cũ.

### Homepage

`GET /homepage` là request public duy nhất cho nội dung Home, trả về `banners`, `topBrands`, `topCategories`, `newestProducts`, `personalizedOffers` và `testimonials`. Frontend validate toàn bộ payload bằng Zod rồi map sang view model:

- `banners` cấp ảnh/link/title cho Hero.
- `topBrands` cấp logo và tên cho Research Leaders.
- `topCategories` cấp tên/slug cho Top Categories.
- `newestProducts` cấp New Products và dùng các item có `isOutstanding=true` cho Outstanding Products.
- `personalizedOffers` cấp Personalized offer.
- `testimonials` cấp nội dung/author cho testimonial carousel.

Request dùng native `fetch` phía Server với Next Data Cache `revalidate` 5 phút và tag `homepage`. Nếu request lỗi hoặc payload không hợp lệ, Home nhận các section rỗng và không thực hiện các request products/brands riêng. Request `/categories` vẫn được giữ cho menu “All Categories” nhiều cấp dùng chung ở header.

## Cache và session

- Public content không dùng React Query.
- Categories public dùng Next Data Cache với `revalidate` 5 phút và tag `categories`.
- Product catalog dùng Next Data Cache với `revalidate` 5 phút và tag `products`; filter, sort và page nằm trong URL request.
- Product detail dùng tags `products` và `product:{slug}`, revalidate 5 phút.
- Brands public dùng Next Data Cache với `revalidate` 5 phút và tag `brands`.
- Homepage public dùng Next Data Cache với `revalidate` 5 phút và tag `homepage`.
- Products và Brands standalone vẫn có thể dùng các server service riêng khi các màn hình khác cần chúng; Home không gọi các service này.
- Profile dùng key `['session', 'profile', 'current']`, `staleTime` 60 giây.
- Login và logout xóa private React Query Cache để ngăn dữ liệu vượt phiên.
- Token không được lưu vào localStorage, query string hoặc log.

## Thêm feature mới

Đọc `.codex/AGENTS.md`, sau đó phân loại API theo `.codex/docs/api-convention.md`. Tìm implementation tương tự trước khi tạo service, Hook hoặc component mới.
