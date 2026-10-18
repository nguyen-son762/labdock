# Kế hoạch kiểm thử

[Chỉ mục](README.md) · [Dữ liệu](test-data.md) · [Baseline](baseline.md)

## Mục tiêu và phạm vi

Mã yêu cầu như `AUTH.LOGIN`, `CART.TOTAL` là nhóm hành vi do bộ tài liệu này đặt để truy vết. Chúng không phải mã requirement/Jira hoặc acceptance criteria đã được PO phê duyệt.

Kiểm chứng hành vi user portal từ source hiện có, gồm auth/OTP, Home, categories/brands/origins, catalog/PDP, cart, checkout/payment, quote, orders/RFQs, profile/avatar/password, contact, news/about/legal, header/footer, đa ngôn ngữ, session/cache/HTTP, accessibility, SEO và các journey xuyên module. App dùng Next.js App Router, React, Zod, React Hook Form, Axios và React Query. Public API phía server dùng fetch; dữ liệu riêng dùng client service/hook.

Khảo sát toàn bộ tập source UTF-8 trong src, message dictionaries, config/test helper/script QA và các QA backlog liên quan. Các test hiện có được đọc theo contract, fixture, assertion/mocks và đối chiếu với code gọi thực tế. Các file index/type/primitive/data có trong inventory, không bỏ qua vì không phải màn hình. Không coi binary assets, node_modules, .next, .git hay lockfile generated là nghiệp vụ cần test từng dòng. Không đọc secret trong .env.local. Source inventory là phạm vi khảo sát, không phải báo cáo code coverage.

Ngoài phạm vi implementation trong repo: admin/supplier portal, quản trị CMS, xử lý trạng thái đơn/RFQ, accept/reject RFQ, hoàn/hủy giao dịch, tracking vận chuyển, invoice PDF, gateway thanh toán thật và kiểm thử tải backend. Các điểm backend vẫn có test mục tiêu ở mức API/E2E khi cần chứng minh journey; chưa có backend source hay OpenAPI để khẳng định contract chưa được triển khai.

## Cơ sở của kết quả mong đợi

| Giá trị              | Cách sử dụng và xử lý khi khác thực tế                                                                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source               | Characterization của code hiện tại đã truy vết. Không có nghĩa code hiện tại đã đúng nghiệp vụ. Nếu PO thay đổi rule, cập nhật requirement và case.                           |
| User requirement     | Yêu cầu đã biết của người dùng: carousel phải autoplay, giữ swipe/navigation và pause accessible; Research Leaders desktop vẫn là grid.                                       |
| Quality target       | Tiêu chí chất lượng dựa trên risk/convention repo. Có thể phát hiện gap hiện tại; thực thi trước khi kết luận product bug.                                                    |
| Security target      | Mục tiêu bảo vệ dữ liệu/phiên/quyền. Cần backend và browser để chứng minh; frontend ẩn nút hoặc schema parse không thay authorization.                                        |
| Integration contract | Ca frontend có thể dùng stub, nhưng kết quả cuối cần API/provider sandbox, persistence và contract backend thật. Không tự bịa endpoint thiếu.                                 |
| Decision required    | Chưa có acceptance criteria đủ rõ; PO/backend phải quyết định trước khi dùng expected làm gate. Trong khi chờ có thể ghi actual quan sát, không gán Pass chỉ vì code làm vậy. |
| Existing bug         | Regression trỏ QA backlog đã có; status backlog có thể cũ. Chạy lại trên build mục tiêu trước khi mở lại/đóng bug.                                                            |

## Mức độ sẵn sàng và các điểm cần xác nhận

| Phạm vi                                    | Bằng chứng hiện tại                                                                       | Tác động tới chạy test                                                                                                             |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Home/categories/brands/origins/catalog/PDP | Server fetch tới Public API                                                               | Test UI với mock fetch hoặc sandbox; request có token phải no-store.                                                               |
| Auth/profile/avatar/cart/orders/RFQs       | Client HTTP API                                                                           | Có thể thiết kế contract/integration từ service; E2E cần tài khoản, dữ liệu seed và OTP sandbox.                                   |
| Checkout create và payment complete        | checkout.service.ts đợi550ms rồi trả response local                                       | Chỉ test state/navigation ở frontend. Ca tạo giao dịch, paid, persistence và idempotency end-to-end bị chặn tới khi có tích hợp.   |
| Gửi quote từ cart và contact               | quote.service.ts/contact.service.ts synthesize reference local                            | Success UI chưa chứng minh lưu RFQ/ticket hoặc gửi email. Không dùng để nghiệm thu backend.                                        |
| Payment success -> order detail            | Mock OR-3000, orders service chỉ nhận GUID                                                | Cần thống nhất ID và lookup. Email success đang hardcode; amount/reference query chưa được xác minh backend.                       |
| Search, seller, currency và social footer  | Search không handler/contract, controls chưa nối và social #                              | Cần PO/backend quyết định, không tạo expected API path giả.                                                                        |
| Carousel                                   | Nhiều carousel autoplay5000ms; gallery chưa Autoplay; chưa pause control keyboard         | Giữ autoplay theo yêu cầu, kiểm thử thêm pause/resume accessible; không giải quyết bằng tắt mọi autoplay.                          |
| Giá, stock và tổng tiền                    | UI có giá promotion, JSON-LD dùng base; cart có isDeleted/status nhưng chưa chặn checkout | Ca mục tiêu cần xác nhận hành vi thực. Cần quyết định mixed currency, promotion100%, restricted product, thuế9% và shipping hiện0. |
| Profile và country                         | Field validation có rule khác checkout/signup                                             | Không áp một schema chung cho mọi màn. Phone/country đồng bộ là vùng regression mới.                                               |
| Auth policy                                | mustChangePassword được lưu nhưng chưa điều hướng cưỡng chế; cookies đọc được từ JS       | PO/backend quyết định forced password change, session revoke và kế hoạch HttpOnly/BFF. Không đánh Pass nhờ chỉ lưu cờ.             |
| i18n/nội dung                              | Message keys en/vi đồng bộ; vẫn có hardcode English, root lang=en; legal static English   | Cần quyết định ngoại lệ dịch, format ngày/tiền và nội dung legal/partner/event trước release.                                      |
| Sitemap                                    | Lấy danh sách products demo, PDP lấy API theo slug                                        | Kiểm tra URL thực200 và canonical thay vì chỉ đếm sitemap unique.                                                                  |

README có đoạn cũ nói chỉ GET cart dùng backend và null price thành0. Source hiện tại là chuẩn đối chiếu: POST/PATCH/DELETE cart đã gọi HTTP, unitPrice nullable được giữ, private checkout/quote/contact mới còn mock. Không sửa README trong task tài liệu này.

## Cách chạy

1. Điền DS-ENV: URL frontend/build deploy/API sandbox/OS/browser/locale/viewport/seed. Không giả dữ liệu fixture đã tồn tại trong backend.
2. Chuẩn bị A/B/new/reset account, OTP sandbox và seed product/cart/order/RFQ theo test-data. Ca Unit/Component có thể tạo fixture; API/E2E phải lấy ID thật.
3. Chọn module và mức test. Unit cho rule/schema/formatting; Integration cho component+hook/service boundary; Browser/Manual cho Swiper thật, focus, responsive; E2E cho journey xuyên route/backend.
4. Mỗi ca bắt đầu từ điều kiện chung của module cộng điều kiện trong dữ liệu. Reset cache/tokens/cookie/network/clock theo ca. Dùng account test riêng khi reset password hoặc xóa cart. Lưu baseline seed để khôi phục sau run.
5. Thực hiện bước, đối chiếu kết quả và network/backend record khi case yêu cầu. Không mock chính service đang kiểm tra rồi gọi đó là kiểm chứng API.
6. Ghi Status, Actual, Bug/Evidence, Tester, Run date trong Excel. Evidence gồm build, locale, request status/ID có redaction và ảnh/trace khi cần. Không lưu password/token/OTP/PII thật.
7. Nếu fail, phân biệt product defect, test fixture/mock/provider thiếu, lỗi môi trường và thiếu quyết định. Gắn bug với ID ca, expected, actual, impact và cách reproduce; không tự sửa production trong lượt viết bộ case.
8. Sau fix chạy ca fail và các consumer liên quan: cart header/cart/checkout/quote cùng cache; profile/header/avatar; country picker trong signup/checkout/contact/quote/profile; locale routing và carousel tại breakpoint.

## Ưu tiên và test cycle

P0: tính toàn vẹn giao dịch, mất dữ liệu, auth/private isolation và journey thiết yếu. P1: chức năng chính, validation/contract hoặc lỗi khiến người dùng khó hoàn thành. P2: nhánh phụ, hiển thị, accessibility/responsive và recovery. P3: primitive chưa có consumer hoặc tác động thấp. Đây là mức ưu tiên chạy test, không tự động là severity của bug.

- Smoke mỗi build: E2E-001, AUTH-001, CAT-001, PDP-001, PDP-011, CART-001, CART-014, ORD-001, RFQ-001, PRO-001. Với API chưa tích hợp, ghi Blocked và chạy state frontend riêng, không bỏ qua blocker giao dịch.
- Regression theo thay đổi: chạy toàn module owner, consumer cùng cache/form và nhóm SYS/LOC/UI liên quan. Thay đổi CountrySelect phải bao phủ mọi valueFormat và phone-country sync.
- Release: toàn bộ P0/P1, các ca P2 liên quan risk thay đổi, browser/mobile/keyboard và API error/race. Các Decision required được giải quyết hoặc có chấp nhận rủi ro bằng văn bản trước khi đánh giá release.

## Trạng thái thực thi và gate

Not run = chưa thực hiện. Pass = đã chạy trên build/môi trường ghi nhận và đạt mọi expected. Fail = đã chạy và khác expected được thống nhất. Blocked = không chạy/không kết luận được do dependency cụ thể. N/A = không áp dụng cho release hiện tại, phải có lý do. Không chuyển case mock sang Pass cho mục tiêu persistence thật.

Đề nghị entry: build đúng source, môi trường ổn định, seed/account/OTP, API contract cho mutation trọng yếu và tiêu chí PO rõ. Đề nghị exit:100% P0/P1 đã chạy và Pass, không bug Critical/High chưa được chấp nhận, không ca P0/P1 Blocked chưa có quyết định release, locale/mobile/keyboard critical journey đạt. Đây là đề xuất QA để team phê duyệt, không khẳng định dự án đã có gate này. Chỉ số pass rate = Pass/(Pass+Fail), execution coverage=(Pass+Fail)/tổng; Blocked/N/A báo riêng, không tính là Pass.

## Môi trường và automation

Browser đề xuất: Chrome, Edge, Firefox desktop và Safari desktop/iOS, Chrome Android. Ghi version thực tế khi chạy; chưa có support matrix chính thức. Viewport320,390,640,768,1024,1280,1440 và các biên639/640 cho Research Leaders. Lặp journey chính en/vi, guest/A/B/expired session, online/slow/offline. Không nhân mọi case với mọi tổ hợp; chọn theo rủi ro và ghi rõ run variant.

Vitest + Testing Library/jsdom có sẵn. Dùng renderWithProviders khi cần next-intl/QueryClient, role/name và userEvent; fake clock, controlled promises và mock HTTP/fetch ở external boundary. Swiper bị mock trong một số test hiện tại nên các assertion render đó không chứng minh autoplay/focus/gesture thật. Không có test:e2e script/runner E2E được cấu hình trong package.json; ca E2E là thiết kế cần triển khai/chạy sau. Không cài dependency hay skill mới vì các skill testing/code-review/documentation và Spreadsheets hiện có đủ cho yêu cầu.

Không đo coverage % vì chưa chạy instrumentation. Không chạy build/dev/browser UAT, không đo CWV, contrast hoặc screen reader trong task này. baseline.md chỉ ghi các lệnh thực sự đã chạy.
