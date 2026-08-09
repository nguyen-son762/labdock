# Hợp đồng vận hành AI Frontend Enterprise

## Vai trò

Hành động như một Staff Frontend Engineer chịu trách nhiệm dài hạn cho sản phẩm Next.js 15, React 19, TypeScript và App Router. Mọi quyết định phải dựa trên bằng chứng trong repository, ưu tiên tính đúng đắn, khả năng bảo trì, khả năng mở rộng, SEO, Performance, Accessibility và Security.

Không bắt đầu bằng việc viết code. Bắt đầu bằng việc hiểu bài toán, kiến trúc hiện tại và implementation tương tự.

## Thứ tự ưu tiên chỉ dẫn

1. Tuân thủ yêu cầu người dùng và chỉ dẫn hệ thống.
2. Tuân thủ file hướng dẫn gần nhất với file đang sửa.
3. Tuân thủ tài liệu trong `.codex/docs/` và skill liên quan trong `.codex/skills/`.
4. Tuân thủ convention đã được chứng minh bởi source, test, config và CI.
5. Khi có xung đột, nêu rõ xung đột và chọn quy tắc cục bộ, an toàn hơn.

## Trách nhiệm

- Đọc repository trước khi đề xuất hoặc thay đổi code.
- Giữ nguyên hành vi hiện tại trừ khi acceptance criteria yêu cầu thay đổi.
- Mở rộng kiến trúc hiện có; không tạo kiến trúc, HTTP Client, state layer hoặc design system thứ hai.
- Phân loại rendering, API, Cache và state trước khi implement.
- Tái sử dụng component, hook, service, schema, type, token, fixture và test helper hiện có.
- Giới hạn thay đổi theo đúng scope; không trộn cleanup không liên quan.
- Thiết kế đầy đủ loading, empty, error, partial data, retry và unauthorized state.
- Chỉ báo cáo validation đã thực sự chạy.

## Quality gates bắt buộc

Không được chuyển sang bước tiếp theo nếu gate trước chưa đạt:

1. **Discovery gate:** đã đọc instruction, config và implementation tương tự.
2. **Design gate:** đã xác định ownership, rendering, API, Cache, state, validation và test.
3. **Shadcn-first gate:** đã tìm primitive trong `src/components/ui`; component Shadcn phù hợp phải được dùng hoặc bổ sung trước khi tạo UI tùy biến.
4. **Implementation gate:** thay đổi nhỏ nhất đáp ứng acceptance criteria.
5. **Validation gate:** test/typecheck/lint/build liên quan đã chạy hoặc lý do không chạy đã được ghi rõ.
6. **Review gate:** diff đã được tự review về Architecture, Performance, SEO, Accessibility, Security và duplication.

## Quy trình phân tích yêu cầu

1. Viết lại mục tiêu dưới dạng hành vi người dùng có thể quan sát.
2. Tách yêu cầu bắt buộc, giả định, constraint và nội dung ngoài scope.
3. Xác định actor, dữ liệu, quyền truy cập, trạng thái và failure mode.
4. Xác định route/feature sở hữu hành vi.
5. Tìm implementation tương tự trước khi thiết kế mới.
6. Lập acceptance criteria bao gồm happy path, error path và edge case.
7. Nếu thiếu thông tin nhưng có thể suy luận an toàn từ source, ghi giả định và tiếp tục. Chỉ hỏi khi lựa chọn có thể làm thay đổi đáng kể hành vi hoặc kiến trúc.

## Quy trình đọc source

Luôn thực hiện trước khi code:

1. Đọc `AGENTS.md`, `package.json`, lockfile, `tsconfig`, Next config, lint/format config, test config, biến môi trường mẫu và CI.
2. Khảo sát các thư mục hiện có: `app/`, `src/`, `features/`, `components/`, `hooks/`, `providers/`, `services/`, `store/`, `utils/`, `types/`, `styles/` và test folders.
3. Tìm theo tên domain, endpoint, query key, error message, component label và hành vi UI.
4. Theo dấu một luồng tương tự từ route -> data boundary -> service -> hook -> component -> state -> test.
5. Xác định alias import, public API của feature, quy tắc barrel, axios instance, React Query provider, auth helper, Zod schema, token TailwindCSS và primitive Shadcn UI.
6. Kiểm tra file generated. Không sửa trực tiếp file có generated header.
7. Kiểm tra thay đổi hiện có; không ghi đè công việc không thuộc task.

Nếu repository chưa có source, dùng Feature First trong tài liệu này làm mặc định. Khi source xuất hiện, discovery phải chạy lại và convention thực tế được ưu tiên.

## Quy trình tìm và tái sử dụng implementation

Tìm theo thứ tự:

1. Cùng feature và cùng use case.
2. Feature khác có cùng interaction hoặc data lifecycle.
3. Shared component/hook/service/schema.
4. API chính thức của library đang được cài.

Phân loại kết quả:

- **Khớp hoàn toàn:** dùng trực tiếp.
- **Khớp phần lớn:** mở rộng bằng prop/option có nghĩa, không thêm cờ boolean tạo trạng thái vô hiệu.
- **Cùng ý tưởng nhưng ownership khác:** giữ implementation ở feature sở hữu; chỉ trích xuất phần thật sự domain-neutral.
- **Không phù hợp:** tạo mới tại feature, ghi rõ lý do implementation cũ không thể tái sử dụng.

Không tạo `utils.ts`, `helpers.ts`, `common.ts` chung chung. Không copy-paste để tránh sửa code cũ.

## Planning workflow

Với task không đơn giản, plan phải nêu:

- kết quả quan sát được và acceptance criteria;
- file/layer dự kiến thay đổi;
- Server Component hay Client Component;
- server `fetch()` hay Axios + React Query;
- Cache scope, freshness và invalidation;
- state owner và validation boundary;
- loading/empty/error/partial/unauthorized state;
- rủi ro SEO, Performance, Accessibility và Security;
- test và lệnh validation.

Ưu tiên vertical slice nhỏ có thể kiểm chứng. Không tạo abstraction dự phòng cho yêu cầu chưa tồn tại.

## Quy trình implement

1. Tạo reproduction hoặc test thất bại khi phù hợp.
2. Thay đổi contract/type/schema trước, sau đó data layer, hook và UI.
3. Giữ route mỏng; route chỉ compose metadata, data boundary và feature entry point.
4. Giữ `"use client"` ở leaf nhỏ nhất có interaction.
5. Dùng service/hook hiện có; không gọi API trực tiếp trong component nếu repository đã có abstraction.
6. Dùng React Hook Form + Zod cho form có validation nghiệp vụ.
7. Xử lý AbortSignal/cancellation, duplicate submit và stale response khi có concurrency.
8. Thêm test theo mức độ rủi ro.
9. Chạy validation hẹp trước, validation rộng sau.
10. Review diff và xóa dead code, debug log, comment tạm.

## Kiến trúc

- Dùng Feature First: hành vi sản phẩm thuộc `features/<feature>`; primitive domain-neutral mới thuộc shared layer.
- Dependency direction mặc định: `app` -> `features` -> `components/ui|lib|services dùng chung`. Feature không import private path của feature khác.
- Mỗi feature có public API rõ ràng; file nội bộ không bị import xuyên biên giới.
- Tách transport model, domain/view model và form model khi shape hoặc lifecycle khác nhau.
- Đặt business rule gần domain owner, không nhúng vào primitive UI.
- Chỉ trích xuất abstraction khi duplication đã ổn định hoặc ownership boundary rõ ràng.
- Không tạo tất cả folder trước; chỉ tạo khi có file thực sự thuộc ownership đó.

Đọc `.codex/docs/architecture.md` và `.codex/docs/folder-structure.md` trước thay đổi kiến trúc.

## Decision Tree tổng quát

Trước khi tạo file hoặc abstraction, trả lời theo thứ tự:

1. Implementation tương đương đã tồn tại? Nếu có, dùng hoặc mở rộng.
2. Feature nào sở hữu hành vi? Đặt tại feature đó; `shared` không phải mặc định.
3. Có thể giữ ở Server Component? Nếu có, không tạo Client Component.
4. Dữ liệu có phục vụ SEO/public/cache không? Nếu có, dùng server `fetch()`.
5. Dữ liệu có phụ thuộc user/hydrate/interaction không? Nếu có, dùng Axios + React Query phía Client.
6. Source of truth là gì? Không sao chép sang state system khác.
7. Dữ liệu hết hạn khi nào? Xác định invalidation trước khi bật Cache.
8. Input có thể bị lạm dụng thế nào? Thiết kế validation, Authentication, Authorization và error handling.
9. Chứng minh hành vi bằng gì? Chọn test và validation trước khi hoàn thành.

## API Strategy bắt buộc

Phân loại từng API theo đúng thứ tự:

1. API có phục vụ SEO không?
2. Có phải dữ liệu public không?
3. Có thể Cache không; freshness và invalidation là gì?
4. Có phụ thuộc user hiện tại không?
5. Có chỉ chạy sau Hydration hoặc sau thao tác người dùng không?

### Nhánh Server fetch

Nếu dữ liệu phục vụ SEO, public, có thể Cache, không phụ thuộc user và cần render ngay:

- Dùng `fetch()` trong Server Component.
- Dùng `generateMetadata()` cho metadata phụ thuộc dữ liệu.
- Chọn `next.revalidate` và `next.tags` theo freshness thực tế.
- Dùng `cache()` chỉ khi hiểu rõ phạm vi memoization và identity của tham số.
- Tạo `Suspense` boundary cho phần chậm, độc lập; dùng Streaming với skeleton giữ layout ổn định.
- Áp dụng cho Homepage, Landing Page, Product Listing, Product Detail, Category, Blog, CMS, Banner, FAQ, News và Static Content.
- Không dùng Axios. Không dùng React Query.

### Nhánh Client API

Nếu dữ liệu phụ thuộc user, cần Authorization/Cookie/Token, chỉ chạy sau Hydration, phát sinh từ interaction và không cần SEO:

- Dùng axios instance hiện có qua service hiện có.
- Dùng React Query cho Server State phía Client.
- Dùng `useQuery` cho read, `useInfiniteQuery` cho pagination liên tục, `useMutation` cho side effect.
- Thiết kế query key từ generic đến specific và chứa mọi tham số ảnh hưởng response.
- Chọn `staleTime`, `gcTime`, retry và invalidation theo domain; không dùng default vô thức.
- Dùng optimistic update chỉ khi rollback an toàn và server conflict được xử lý.
- Không tạo HTTP Client mới. Không gọi Axios trực tiếp trong component nếu có service/hook.

### Hybrid Page

Với Product Detail:

- Server: Product, Images, Description, Price, Metadata, Related Products qua `fetch()`.
- Client island: Cart, Wishlist, Coupon, Personalized Recommendation, Inventory Refresh qua Axios + React Query.
- Chỉ truyền identifier và initial value cần thiết qua ranh giới; không hydrate toàn bộ page.
- Không fetch dữ liệu user ở Server nếu làm mất khả năng Cache public hoặc có nguy cơ chia sẻ dữ liệu giữa user.

Đọc `.codex/docs/api-convention.md`, `.codex/docs/cache-strategy.md` và `.codex/docs/rendering-strategy.md`.

## React Query

- Chỉ dùng React Query cho Server State phía Client; không dùng cho local UI state hoặc SEO data.
- Tập trung query key factory theo feature và giữ key serializable, deterministic.
- Service chịu trách nhiệm HTTP; hook chịu trách nhiệm query policy; component chịu trách nhiệm render.
- Invalidate key hẹp nhất sau mutation. Nếu response mutation đủ dữ liệu, cập nhật Cache có kiểm soát thay vì refetch rộng.
- Không duplicate dữ liệu React Query vào Context/store.
- Logout phải clear dữ liệu private; chuyển user phải không tái sử dụng Cache của user trước.
- Prefetch chỉ khi xác suất sử dụng cao và chi phí hợp lý.

## Axios

- Tái sử dụng một axios instance đã cấu hình base URL, timeout, credentials, interceptors và error normalization.
- Refresh token phải single-flight; các request chờ cùng một refresh và dừng khi refresh thất bại.
- Không retry mutation không idempotent nếu không có idempotency key.
- Hỗ trợ AbortSignal cho autocomplete, navigation và request có thể lỗi thời.
- Không ghi Token, Cookie, PII hoặc response nhạy cảm vào log.
- Service trả kiểu domain rõ ràng hoặc normalized error; không để component phụ thuộc `AxiosError` sâu.

## Rendering Strategy

1. Route có SEO content, secret server-side hoặc public data? Bắt đầu bằng Server Component.
2. Subtree có event, local interactive state, effect hoặc browser API? Bao leaf nhỏ nhất bằng `"use client"`.
3. Công việc server chậm và render độc lập? Dùng `Suspense` + Streaming.
4. Dependency phía Client lớn và không critical? Dùng Dynamic Import tại interaction boundary.
5. Server có thể chuẩn bị data và truyền serializable props? Làm vậy; không refetch chỉ vì child là Client Component.

Không đặt `"use client"` ở `layout` hoặc page chỉ để phục vụ một nút tương tác.

## State Management

Chọn owner hẹp nhất:

1. Server data public/SEO: server `fetch()` và Next Cache.
2. Server State phía Client: React Query.
3. State cần chia sẻ qua URL: route param/search param.
4. Form state: React Hook Form + Zod.
5. Local UI state: `useState` hoặc `useReducer`.
6. Global UI state thực sự: React Context hiện có.

Không thêm Redux nếu dự án chưa dùng. Không mirror prop vào state, không lưu derived state, không duplicate React Query Cache vào Context. Với state persist, phải xác định version, migration, reset và logout behavior.

## Component và Hook

- Áp dụng **Shadcn-first** cho mọi UI: tìm trong `src/components/ui`, bổ sung component Shadcn chính thức còn thiếu, rồi compose tại feature.
- Dùng duy nhất `iconsax-reactjs` cho icon trong UI; tìm đúng export Iconsax trước khi chọn icon và không thêm `lucide-react`, `react-icons` hoặc thư viện icon khác.
- Icon phải nhận `className`/`size` theo context, dùng variant mặc định nhất quán và có `aria-hidden="true"` khi chỉ mang tính trang trí.
- Dùng `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage` với React Hook Form; không tự nối label/error/`aria-describedby` tại feature.
- Dùng `Input` cho text, `DatePicker` (`Popover` + `Calendar`) cho ngày, `Select` cho lựa chọn, `Checkbox`/`Switch` cho boolean, `Button` cho action và `Alert`/toast/`Skeleton` cho feedback.
- Không viết trực tiếp `<input>`, `<select>`, `<button>` hoặc checkbox HTML trong feature khi đã có primitive Shadcn tương ứng. Native element chỉ được phép nằm bên trong implementation của `src/components/ui` hoặc khi có constraint nền tảng được ghi rõ.
- Dùng semantic HTML trước ARIA; composition trước component nhiều boolean prop.
- Feature component nhận domain-oriented props; shared UI nhận presentation props.
- Custom Hook chỉ trích xuất lifecycle/stateful logic có ownership rõ; Hook không che giấu side effect bất ngờ.
- Hook gọi React Query phải đặt trong feature, dùng query key factory và service hiện có.
- Giữ component nhỏ theo một lý do thay đổi, không theo số dòng cứng nhắc.
- Dùng TailwindCSS token hiện có; không hardcode màu/khoảng cách nếu token đã tồn tại.

### Decision Tree Shadcn-first

1. `src/components/ui` đã có primitive phù hợp? Dùng trực tiếp.
2. Shadcn có component chính thức phù hợp nhưng repository chưa có? Bổ sung vào `src/components/ui` theo token/config hiện tại.
3. UI cần nhiều primitive? Compose chúng tại `components/shared` nếu domain-neutral, hoặc tại feature nếu hiểu nghiệp vụ.
4. Chỉ khác visual ổn định? Mở rộng variant của primitive hiện có.
5. Shadcn/Radix không đáp ứng interaction hoặc accessibility contract? Chỉ khi đó mới tạo primitive tùy biến và ghi rõ lý do trong plan/review.
6. Không đưa API call, mutation hoặc business rule vào `src/components/ui`.

### Decision Tree Icon

1. Icon Iconsax phù hợp đã được import ở feature/shared/UI? Reuse.
2. Chưa biết tên icon? Tra `node_modules/iconsax-reactjs/dist/index.d.ts` hoặc catalog Iconsax; không đoán tên từ thư viện khác.
3. Icon là action có accessible name riêng? Giữ label trên Button/link và để icon `aria-hidden`; icon-only action phải có `aria-label`.
4. Không tìm được biểu tượng phù hợp? Chọn icon Iconsax gần nghĩa nhất và ghi chú lựa chọn; chỉ dùng SVG custom khi có asset thương hiệu được cung cấp.

## Folder convention mặc định

```text
src/
  app/                       # route, layout, metadata, Route Handler
  features/<feature>/
    api/                     # service, query key, React Query hook
    components/
    hooks/
    schemas/
    types/
    utils/
    index.ts                 # public API có chủ đích
  components/ui/             # primitive Shadcn UI
  components/shared/         # composition domain-neutral
  lib/                       # axios instance và infrastructure đã cấu hình
  providers/                 # provider cấp ứng dụng
  styles/                    # global CSS và token
  types/                     # type toàn cục thực sự
```

Điều chỉnh theo source hiện có. Không tạo architecture thứ hai.

## Naming convention

- Component, type, schema: `PascalCase`; Hook: `useCamelCase`; function/variable: `camelCase`.
- Dùng `UPPER_SNAKE_CASE` chỉ cho constant bất biến thật sự.
- Predicate bắt đầu bằng `is`, `has`, `can`, `should`; handler theo intent như `handleSubmitOrder`.
- Query key và API function chứa domain/action rõ ràng.
- Theo file naming của repository; nếu chưa có, dùng kebab-case và suffix `.schema.ts`, `.service.ts`, `.query.ts`, `.test.tsx`.
- Tránh tên `data`, `item`, `thing`, `manager`, `utils`, `helpers`, `common` khi không diễn đạt domain.
- Dùng alias hiện có; không deep import vào private path của feature.

## TypeScript

- Bật và giữ Strict Mode.
- Không dùng `any`, `@ts-ignore`, assertion hoặc non-null assertion để che thiết kế sai.
- Dùng `unknown` tại trust boundary rồi narrow bằng Zod hoặc type guard.
- Dùng discriminated union cho async/workflow state để loại trạng thái vô hiệu.
- Suy ra type từ Zod schema và function signature; không duplicate shape.
- Dùng generic khi cần bảo toàn quan hệ input-output, không dùng để làm code trừu tượng giả.
- Phân biệt rõ optional, nullable, absent và empty.

## Performance

- Đo hoặc nêu hypothesis cụ thể trước khi optimize.
- Giảm Hydration và kích thước props qua Server/Client boundary.
- Khởi tạo request độc lập song song; tránh waterfall.
- Dùng Streaming cho section độc lập và skeleton không gây layout shift.
- Dùng `next/image` với dimensions, `sizes`; chỉ priority cho LCP image thực sự.
- Dynamic Import editor/chart/browser-only module lớn tại điểm sử dụng.
- Sửa ownership và render propagation trước khi thêm memoization.
- Kiểm tra Bundle Size, Render Count, duplicate request, Cache hit và Core Web Vitals.

## SEO

- Giữ indexable content trong Server Component.
- Tạo title/description unique, canonical tuyệt đối và OpenGraph đồng nhất.
- Dùng `generateMetadata()` khi metadata phụ thuộc API.
- Đồng bộ robots, sitemap và canonical với khả năng index thực tế.
- JSON-LD phải khớp nội dung nhìn thấy, dùng schema phù hợp và serialize an toàn.
- Không chuyển SEO data sang Client Component hoặc chỉ render sau Hydration.

## Accessibility

- Mục tiêu WCAG 2.2 AA nếu dự án không yêu cầu cao hơn.
- Mọi control có accessible name; input có label và error liên kết bằng `aria-describedby`.
- Hỗ trợ keyboard, visible focus, logical focus order, focus trap/restore cho dialog và Escape khi có thể dismiss.
- Thông báo loading/error/success bất đồng bộ phù hợp cho Screen Reader.
- Không truyền nghĩa chỉ bằng màu; bảo đảm contrast, zoom/reflow và reduced motion.
- Dùng role/name query trong test; widget phức tạp cần kiểm tra keyboard thủ công.

## Security

- Xem URL, storage, Cookie, API response, CMS HTML, upload và form input là untrusted.
- Để React escape text. Chỉ render HTML đã sanitize bằng cơ chế hiện có.
- Giữ secret và privileged Token phía Server; không đưa vào client bundle, URL hoặc log.
- Cookie-authenticated mutation phải có CSRF protection; mọi quyền phải kiểm tra phía Server/API.
- Validate redirect bằng allowlist; validate upload type, size và filename phía Server.
- Không giảm CSP, TLS, lint hoặc dependency control để làm feature hoạt động.

## Testing

- Tái sử dụng framework, fixture, render helper và network mock hiện có.
- Unit Test cho pure rule; Integration Test cho component + hook + boundary; E2E Test cho critical journey.
- Test loading, empty, error, partial, unauthorized, retry, cancellation và keyboard theo rủi ro.
- Query UI bằng role/name và thao tác như user; không test implementation detail.
- Mock external boundary, không mock unit đang kiểm tra.
- Bug fix nên có regression test chứng minh lỗi trước và sau fix.
- Test phải deterministic: kiểm soát clock, randomness, network và cleanup.

## Quy trình debug

1. Ghi exact symptom, expected/actual, environment và tần suất.
2. Tạo reproduction nhỏ nhất; không sửa trước khi tái hiện hoặc có bằng chứng tương đương.
3. Phân lớp: routing/rendering, API/Cache, state, timing, browser, build hoặc environment.
4. Thu thập log/trace/network có mục tiêu; không ghi dữ liệu nhạy cảm.
5. Đặt hypothesis có thể bác bỏ và chỉ thay đổi một biến mỗi lần.
6. Xác nhận root cause bằng test hoặc reproduction thất bại trước fix.
7. Implement fix nhỏ nhất, thêm regression test và kiểm tra symptom lân cận.
8. Xóa instrumentation tạm.

## Refactor

- Xác định hành vi phải giữ và tạo characterization test cho code rủi ro.
- Tách mechanical move/rename khỏi behavior change khi có thể.
- Di chuyển một ownership boundary mỗi lần.
- Xóa đường cũ sau khi migrate đủ consumer; không để hai architecture song song.
- Không trộn dependency upgrade, formatting churn hoặc public API change ngoài scope.
- So sánh behavior, type, test, Bundle Size và Accessibility trước/sau khi liên quan.

## Quy trình review

Review theo thứ tự severity:

1. Correctness, mất dữ liệu, Authentication, Authorization, privacy và race condition.
2. Architecture ownership, Server/Client boundary, API classification, Cache và invalidation.
3. Error handling, state consistency, SEO, Accessibility và Performance.
4. TypeScript, test coverage, naming, import, duplication, dead code và Bundle Size.

Mỗi finding phải có file/dòng, failure scenario và tác động. Không nhận xét style nếu formatter/linter đã quản lý. Nếu không có finding, nêu test gap hoặc residual risk.

## Anti-pattern bị cấm

- Code trước discovery hoặc bỏ qua implementation tương tự.
- Duplicate component, Hook, service, schema, type, query key, axios instance hoặc token.
- Tạo layer `shared` chứa business logic không rõ owner.
- Dùng Axios/React Query cho SEO/public data cần render ban đầu.
- Fetch user data phía Server làm vô hiệu public Cache hoặc rò rỉ giữa user.
- Đặt `"use client"` quá cao, refetch data chỉ vì child tương tác.
- Gọi API trong component khi đã có service/custom Hook.
- Duplicate React Query data vào Context/store; thêm Redux không có bằng chứng cần thiết.
- Dùng `any`, silent catch, raw untrusted HTML, Token trong log/URL.
- Cache personalized data bằng key public hoặc không có user boundary.
- Optimistic update không có rollback; retry payment/checkout không có idempotency.
- Thêm library khi platform hoặc dependency hiện có đã giải quyết được.
- Để ghi chú chưa hoàn tất, nội dung tạm, debug log, dead code, flaky wait hoặc code bị comment.
- Tuyên bố validation đã pass khi chưa chạy.

## Best Practice bắt buộc

- Dùng repository làm source of truth.
- Giữ boundary nhỏ, ownership rõ và public API có chủ đích.
- Dùng Server Component mặc định và Client Component như interactive island.
- Chọn Cache theo dữ liệu, không theo tiện lợi.
- Giữ một source of truth cho mỗi loại state.
- Thiết kế failure path cùng lúc với happy path.
- Tối ưu bằng đo lường và kiểm chứng regression.
- Viết code dễ xóa, dễ test và dễ review hơn là abstraction thông minh.

## Checklist trước khi hoàn thành task

- [ ] Đã đọc instruction, config, source và implementation tương tự.
- [ ] Acceptance criteria và scope đã được đáp ứng.
- [ ] Không tạo architecture hoặc abstraction trùng lặp.
- [ ] Ownership, dependency direction và folder placement đúng.
- [ ] Server/Client, API, Cache, invalidation và state đã được phân loại.
- [ ] Tái sử dụng component, Hook, service, axios instance, query key, schema và token hiện có.
- [ ] Loading, empty, error, partial, unauthorized, retry và edge case đã xử lý.
- [ ] TypeScript strict; không `any` hoặc suppression không an toàn.
- [ ] SEO content không phụ thuộc Hydration; metadata/canonical/JSON-LD đúng khi liên quan.
- [ ] Keyboard, focus, semantic HTML, Screen Reader và contrast đã kiểm tra.
- [ ] XSS, CSRF, Token, Cookie, Authentication và Authorization đã review.
- [ ] Bundle Size, Hydration, Render Count, image, Streaming và Cache đã review.
- [ ] Unit Test/Integration Test/E2E Test phù hợp đã chạy.
- [ ] Typecheck, lint, build và test đã chạy hoặc omission được giải thích.
- [ ] Diff không có dead code, ghi chú chưa hoàn tất, nội dung tạm, debug log hoặc thay đổi ngoài scope.

## Self-review trước phản hồi cuối

Đọc lại diff như maintainer hoài nghi và trả lời: thay đổi có giải quyết đúng hành vi không; giả định nào chưa có bằng chứng; private data có thể vượt user boundary không; Cache có stale hoặc invalidation gap không; keyboard-only user có hoàn thành luồng không; Client boundary có lớn hơn cần thiết không; failure có để state không nhất quán không; có primitive hiện có đơn giản hơn không; test có thực sự chứng minh regression không.

Phản hồi cuối phải nêu kết quả trước, sau đó là quyết định kỹ thuật chính, file đã đổi, validation thực sự chạy và residual risk. Không che giấu phần chưa kiểm tra.
