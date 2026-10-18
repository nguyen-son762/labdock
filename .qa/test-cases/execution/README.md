# Báo cáo chạy test và sửa lỗi

**Chưa hoàn tất toàn bộ 390 ca.** Kết quả hiện tại: **205 Pass, 42 Blocked, 143 Not run**; trong Not run có **65 ca kiểm chứng một phần** và **78 ca chưa đủ bằng chứng thực thi**. Không có ca được gán Pass chỉ từ tên file test liên quan.

Đợt thực thi: 2026-10-18T12:30:32+07:00. Code dựa trên HEAD `ce1122b16b3b03c7d2be1548f8c141a995c8e490` và thay đổi chưa commit. Đã chạy **377/377 assertion trong 78 file**, **0 failed suite**, cùng **17/17 browser checks** trên Chromium 153.0.8010.12. Đây là kết quả frontend với adapter/service/HTTP fixture; không phải 390 ca E2E đã pass.

## Tài liệu và bằng chứng

- [Kết quả từng ca](case-results.md) · [Ledger JSON](results.json).
- [Từng assertion Vitest](assertions.json) · [Từng browser check](browser-results.json) · [Các lệnh và exit code](commands.json).
- [Bằng chứng lỗi trước sửa](before-fix.json) · [Hash source đã sửa](current-source.json) · [Hash source của production build](build-source.json).
- [Excel kết quả](../outputs/01a14d35-b88d-7c20-8fb1-d416011b6894/labdock-test-results.xlsx). Workbook thiết kế ban đầu được giữ riêng.

## Trạng thái 390 ca

| Module | Pass | Blocked | Not run | Tổng |
|---|---:|---:|---:|---:|
| AUTH | 35 | 5 | 18 | 58 |
| HOME | 13 | 0 | 2 | 15 |
| CAT | 12 | 0 | 17 | 29 |
| PDP | 9 | 2 | 13 | 24 |
| CART | 13 | 1 | 11 | 25 |
| CHK | 15 | 1 | 6 | 22 |
| PAY | 12 | 3 | 2 | 17 |
| QUOTE | 2 | 1 | 6 | 9 |
| ORD | 1 | 1 | 13 | 15 |
| RFQ | 1 | 1 | 12 | 14 |
| PRO | 45 | 1 | 8 | 54 |
| CON | 11 | 3 | 8 | 22 |
| CMS | 4 | 4 | 5 | 13 |
| UI | 12 | 5 | 7 | 24 |
| SYS | 10 | 3 | 11 | 24 |
| LOC | 3 | 2 | 3 | 8 |
| SEO | 7 | 0 | 1 | 8 |
| E2E | 0 | 9 | 0 | 9 |

Pass áp dụng cho các bước/contract frontend có bằng chứng trực tiếp trong đợt chạy. Not run có Actual bắt đầu `MỘT PHẦN` nghĩa là có kiểm tra liên quan nhưng chưa đủ để đóng ca. Blocked ghi prerequisite/decision cụ thể. Tỷ lệ Pass/(Pass+Fail) trong Excel không phải tỷ lệ hoàn tất toàn bộ kế hoạch. Không có số đo code coverage trong đợt này.

## Các sửa lỗi đã kiểm chứng

| ID | Ca liên quan | Trước sửa | Thay đổi | Bằng chứng |
|---|---|---|---|---|
| FIX-01 | AUTH-037 | OTP xóa/sửa ô giữa làm dịch chữ số | Giữ vị trí rỗng, không compact/splice mã; Verify chỉ nhận 6 chữ số. | src/features/auth/components/signup-verification-form.test.tsx |
| FIX-02 | AUTH-043, AUTH-047 | Countdown lệch sau tab ẩn/sleep | Tính lại theo expiresAt/Date.now; cập nhật khi focus hoặc visibility đổi. | src/features/auth/components/signup-verification-form.test.tsx |
| FIX-03 | PRO-049, PRO-051, PRO-052 | Avatar giữ file cũ sau chọn sai/lưu lại và cho sửa khi pending | Clear/reset file đúng lifecycle; khóa thao tác pending; bỏ tiến độ giả trước upload. | src/features/profile/components/profile-screen.test.tsx; profile-avatar-states.test.tsx |
| FIX-04 | SYS-006, SYS-015 | Refresh/response cũ có thể khôi phục phiên sau logout/switch user | Gắn version cho phiên và request; reject response cũ; clear private query cache khi login. | src/lib/http-client.test.ts |
| FIX-05 | SYS-004, SYS-005 | Public401 tác động phiên và retry marker không bền qua Axios config | Loại public endpoints khỏi refresh/logout; đánh dấu retry trên config được replay. | src/lib/http-client.test.ts |
| FIX-06 | CART-016, CART-017 | Full-cart writes chồng chéo có thể thay kết quả mới bằng dữ liệu cũ | Tuần tự hóa writes; hủy write đang xếp hàng nếu session đã đổi. Case UI tổng thể vẫn mới kiểm chứng một phần. | src/features/checkout/api/cart.service.test.ts |
| FIX-07 | CHK-005, QUOTE-004 | Checkout/quote tự điền Sarah/email/company demo | Blank identity khi chưa có profile/nhập liệu; checkout vẫn prefill profile hợp lệ và giữ dirty form. | src/features/checkout/components/checkout-screen.test.tsx; request-quote-screen.test.tsx |
| FIX-08 | CHK-017 | Prefix điện thoại không khớp country làm mất national digits | Nhận calling code từ danh sách thật thay regex cắt 1–4 chữ số tùy ý. | src/features/checkout/components/address-fields.test.tsx |
| FIX-09 | PRO-042 | Last changed cố định 3 months ago | Hiển thị ngày passwordChangedAt từ API theo locale; null có fallback. | src/features/profile/components/profile-screen.test.tsx |
| FIX-10 | CON-018 | Confirm chỉ xóa lỗi, một số field row thiếu tên accessible | Trigger validation thật và bổ sung accessible name theo số row. | src/features/contact/components/contact-form.test.tsx |
| FIX-11 | HOME-005 | CTA banner nhận scheme/URL không an toàn | Chỉ chấp nhận internal/fragment hoặc http(s), từ chối control characters và protocol-relative URL. | src/features/home/components/hero-section.test.tsx |
| FIX-12 | SEO-003 | Sitemap dùng ID sản phẩm demo không khớp detail API | Lấy slug từ API, đọc các trang và deduplicate; kiểm tra URL fixture trả 200. | src/app/sitemap.test.ts; execution/browser-results.json |
| FIX-13 | HOME-012/013, UI-014..019 | Thiếu pause/resume, gallery thiếu autoplay, timer chạy khi không overflow, pause bị mất sau breakpoint | Shared playback control; dừng khi focus, giữ pause qua breakpoint, không loop tạo slide dư; gallery tự chuyển ảnh và vẫn dùng thumbnail/swipe. | scripts/qa/browser-checks.cjs |
| FIX-14 | PDP-020, SEO-008 | Panel inactive thiếu DOM/aria-controls; description không đọc được khi tắt JS | Render đủ panel với hidden đúng trạng thái và noscript description. | src/features/products/components/product-information.test.tsx; browser checks |
| FIX-15 | LOC-001/003/006 | Link auth/checkout/contact mất locale, html lang cố định en, switch locale mất hash | Dùng navigation theo locale, server html lang đúng và giữ query + fragment. | src/components/layout/main-header.test.tsx; browser checks |
| FIX-16 | SEO-005 | JSON-LD offer dùng giá gốc thay giá khuyến mãi | Dùng cùng hàm tính promotion với UI; bỏ offer khi giá ẩn/null. | src/app/[locale]/(marketing)/products/[slug]/page.test.tsx |
| FIX-17 | CART-015 | Xóa cart lỗi thiếu feedback ở màn hình giỏ | Thêm Alert cho remove failure và lỗi load/remove ở quote. Bỏ console log dữ liệu cart. | src/features/checkout/components/cart-screen.test.tsx |
| FIX-18 | HOME-007 | Homepage API lỗi chỉ thành các section rỗng | Giữ fallback và phát tín hiệu loadFailed, hiển thị lỗi cùng link retry. | src/features/home/server.test.ts; home-screen.test.tsx |
| FIX-19 | CMS-007 | Clipboard bị từ chối không có feedback | Hiện thông báo và URL read-only để copy thủ công; dịch label theo locale. | src/features/news/components/copy-link-button.test.tsx |
| FIX-20 | SYS-019 | Message response500 có thể lộ chi tiết nội bộ | Dùng thông báo chung cho lỗi5xx, không trả thẳng message/detail nội bộ lên UI. | src/lib/api-error.test.ts |
| FIX-21 | PAY-016 | Trang success khẳng định email đã gửi tới Sarah và link order ID mock | Bỏ tuyên bố email chưa được backend xác nhận; dẫn tới danh sách orders hợp lệ. Xác nhận thanh toán/receipt thật vẫn Blocked. | src/features/checkout/components/payment-success-screen.test.tsx |

Các lỗi harness được xử lý riêng: 8 failure baseline do provider/copy/mock refetch; hai file route test mới từng không khởi tạo do mock thiếu export Next.js; fixture browser từng sai endpoint category/host ảnh. Đã sửa harness và kiểm tra lại `success=true`, `numFailedTestSuites=0`, exit0. Những lỗi này không được đếm thành product defect. Các assertion trước sửa không ánh xạ1:1 với số bug.

## Phần còn chặn hoặc chưa đủ bằng chứng

- Checkout/payment, quote và contact submit vẫn là mock local trong source. Cần endpoint/OpenAPI, sandbox và idempotency/payment verification/receipt contract. Success mô phỏng không chứng minh đã trả tiền hay đã lưu order/RFQ/contact. PAY-016 đã sửa copy/link sai nhưng chưa thể xác minh email/đơn thật.
- Cần tài khoản sandbox A–B, email/OTP test và quyền chạy giao dịch để kiểm tra signup/reset/logout, ownership của order/RFQ, session expiry và các journey E2E. Không gửi email, không thanh toán và không ghi dữ liệu lên backend thật trong đợt này.
- Mixed currency, item deleted/unpublished, promotion100%, nội dung legal/locale, event tĩnh đã cũ và hành vi search/seller/currency/social còn cần PO/backend chốt. Không tự tạo endpoint hoặc chính sách thay cho contract còn thiếu.
- 143 ca chưa đóng: 65 mới có chứng cứ một phần; 78 chưa thực thi đầy đủ. Cần bổ sung assertions/UI runs cho error/retry/race, paging, quote selection, metadata toàn bộ route và các tổ hợp input còn thiếu; thêm kiểm tra thủ công touch/zoom/contrast/screen reader trên môi trường đích. Danh sách cụ thể nằm trong ledger, không được xem là Pass.

## Môi trường và tái chạy

Next.js15.5.23, React19, Node22.23.1, macOSarm64; browser Chromium153.0.8010.12. Backend browser là HTTP fixture ở `127.0.0.1:3101`. Vì server dev cổng3000 đang dùng `.next`, production QA được build từ bản sao `/tmp/labdock-qa-app`; hash các source runtime/message khớp workspace. Không copy `.env.local`. Một thay đổi test-only sau snapshot bổ sung mock profile để tránh request mạng ngoài; đã chạy lại test/typecheck/lint.

```sh
npm test
npm run typecheck -- --incremental false
npm run lint
```

Browser runner: `scripts/qa/fixture-server.cjs` cung cấp fixture; `scripts/qa/browser-checks.cjs` dùng Playwright từ runtime Codex, không thêm dependency vào project. Chạy server fixture, build/start frontend bằng API base local và site URL `http://localhost:3100`; cấu hình `QA_PLAYWRIGHT_PATH`, `QA_CHROME_PATH`, `QA_BASE_URL`, `QA_OUTPUT_DIR` rồi chạy browser script. Dùng thư mục build riêng nếu server dev đang hoạt động; không dùng đồng thời cùng `.next`.

Khi có sandbox: seed dữ liệu theo [test-data.md](../test-data.md), dùng alias tài khoản thay PII/token, chạy lại những ca Blocked/Not run và cập nhật N–R trong Excel. Baseline/source-map ban đầu là snapshot thiết kế trước sửa, được giữ để truy vết lịch sử. Các sửa đổi hiện chưa commit/push.

## Kiểm tra file bàn giao

Excel đã được render 20 vùng trên 22 sheet; đối chiếu 390 ID/status/Actual giữa Excel và Markdown/JSON, công thức tổng hợp, dropdown/freeze, native tables và các cột A–M được giữ nguyên. Workbook thiết kế ban đầu giữ nguyên checksum. Chưa mở bằng Microsoft Excel desktop.
