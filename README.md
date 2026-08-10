# Labdock User Portal

Nền tảng Next.js 15 theo Feature First, minh họa đầy đủ luồng public SEO, Authentication phía Client, Dashboard và cập nhật Profile.

## Yêu cầu môi trường

- Node.js 20 trở lên.
- Backend hỗ trợ Cookie session và các endpoint trong phần API contract.

Sao chép `.env.example` thành `.env.local` và cấu hình:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`NEXT_PUBLIC_SITE_URL` phải là origin public thực tế ở production để canonical, robots và sitemap chính xác.

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

Tất cả request phía Client dùng axios instance tại `src/lib/http-client.ts`, có `withCredentials`, XSRF header, timeout, cancellation và refresh session single-flight.

### Authentication

`POST /auth/login`

```json
{
  "email": "user@company.vn",
  "password": "a-secure-password",
  "remember": false
}
```

Response thành công: `204 No Content`. Backend phải phát hành session bằng Cookie `HttpOnly`, `Secure` ở production và `SameSite` phù hợp kiến trúc deployment.

- `POST /auth/refresh`: trả `204`, làm mới session Cookie.
- `POST /auth/logout`: trả `204`, thu hồi session và xóa Cookie.

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

Backend luôn phải kiểm tra Authentication và Authorization. Việc ẩn UI không được xem là kiểm soát quyền. Khi frontend và backend khác origin, backend phải allowlist đúng origin và cho phép credentials; không dùng wildcard CORS với Cookie.

## Cache và session

- Public content không dùng React Query.
- Profile dùng key `['session', 'profile', 'current']`, `staleTime` 60 giây.
- Login và logout xóa private React Query Cache để ngăn dữ liệu vượt phiên.
- Token không được lưu vào localStorage, query string hoặc log.

## Thêm feature mới

Đọc `.codex/AGENTS.md`, sau đó phân loại API theo `.codex/docs/api-convention.md`. Tìm implementation tương tự trước khi tạo service, Hook hoặc component mới.
