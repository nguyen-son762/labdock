# Bộ test case Labdock User Portal

**Cập nhật yêu cầu carousel 18/10/2026:** autoplay liên tục, bỏ nút playback. Xem [thay đổi và kết quả regression](execution/carousel-autoplay-update.md). Kỳ vọng pause/resume trong bộ case/Excel trước đó đã được thay thế bởi yêu cầu này.

Ngày rà soát: **18/10/2026**, múi giờ Asia/Ho_Chi_Minh. Audience: QA, PO và frontend/backend developers.

**390 test case trong 18 nhóm kiểm thử**, bao phủ 13 feature nghiệp vụ và các phần dùng chung. Đọc [kế hoạch kiểm thử](test-plan.md) trước khi chạy. Mỗi ca có ID dùng chung giữa Excel và Markdown, dữ liệu, bước thực hiện, kết quả mong đợi và nguồn source.

- [Excel để lọc và ghi kết quả](outputs/01a14d35-b88d-7c20-8fb1-d416011b6894/labdock-test-cases.xlsx).
- [Dữ liệu và môi trường cần chuẩn bị](test-data.md).
- [Ma trận module, route và inventory source](source-map.md).
- [Kết quả baseline tự động đã chạy](baseline.md).

Đã có [báo cáo thực thi và sửa lỗi](execution/README.md): **205 Pass, 42 Blocked, 143 Not run**. Trong Not run có 65 ca kiểm chứng một phần và 78 ca chưa đủ bằng chứng; chưa hoàn tất 390 ca. [Excel kết quả mới](outputs/01a14d35-b88d-7c20-8fb1-d416011b6894/labdock-test-results.xlsx) giữ cùng ID với Markdown. Baseline là lịch sử trước sửa lỗi, không phải trạng thái hiện tại.

Source snapshot: commit `ce1122b16b3b03c7d2be1548f8c141a995c8e490`. Workspace thay đổi trong lúc khảo sát (ban đầu `0b71021` cùng thay đổi chưa commit, sau đó commit trên); đã đối chiếu thay đổi liên quan CountrySelect và checkout phone. Inventory ghi hash từng file, fingerprint toàn tập `f34eed1025bd3b83a71b29759c4980017b0590b7fb030ced3bd0a9bde37eeb95`. Đây là snapshot của bước thiết kế ban đầu. Đợt thực thi tiếp theo đã sửa source/test; xem hash và kết quả trong execution/. Tài liệu UAT đang có của workspace không bị sửa.

## Theo module

| Nhóm  | Module                                                    | Route/phạm vi                                                                | Số ca |
| ----- | --------------------------------------------------------- | ---------------------------------------------------------------------------- | ----: |
| AUTH  | [Xác thực và OTP](modules/auth.md)                        | `/login; /signup; /forgot-password`                                          |    58 |
| HOME  | [Trang chủ](modules/home.md)                              | `/`                                                                          |    15 |
| CAT   | [Danh mục, thương hiệu và xuất xứ](modules/cat.md)        | `/products; /products/category/[slug]`                                       |    29 |
| PDP   | [Chi tiết và mua sản phẩm](modules/pdp.md)                | `/products/[slug]`                                                           |    24 |
| CART  | [Giỏ hàng và giỏ ở header](modules/cart.md)               | `/cart`                                                                      |    25 |
| CHK   | [Checkout và địa chỉ](modules/chk.md)                     | `/checkout`                                                                  |    22 |
| PAY   | [Thanh toán và trang thành công](modules/pay.md)          | `/payment; /payment/success`                                                 |    17 |
| QUOTE | [Gửi yêu cầu báo giá từ giỏ](modules/quote.md)            | `/request-quote; /request-quote/success`                                     |     9 |
| ORD   | [Đơn hàng](modules/ord.md)                                | `/orders; /orders/[id]`                                                      |    15 |
| RFQ   | [Danh sách và chi tiết RFQ](modules/rfq.md)               | `/rfqs; /rfqs/[id]`                                                          |    14 |
| PRO   | [Hồ sơ, bảo mật và avatar](modules/pro.md)                | `/profile; /dashboard; /dashboard/profile`                                   |    54 |
| CON   | [Liên hệ và báo giá nhập tay](modules/con.md)             | `/contact-us; /contact-us?type=quote`                                        |    22 |
| CMS   | [Tin tức, giới thiệu và tài liệu pháp lý](modules/cms.md) | `/news; /news/[slug]; /about-us; /privacy; /terms-and-conditions; /security` |    13 |
| UI    | [Thành phần dùng chung và carousel](modules/ui.md)        | `Header/footer; CountrySelect; UI primitives; mọi carousel`                  |    24 |
| SYS   | [HTTP, session, cache và độ tin cậy](modules/sys.md)      | `Infrastructure và mọi private/public API`                                   |    24 |
| LOC   | [Ngôn ngữ và routing](modules/loc.md)                     | `Toàn bộ route en/vi`                                                        |     8 |
| SEO   | [Metadata và khả năng index](modules/seo.md)              | `Public routes; robots.txt; sitemap.xml`                                     |     8 |
| E2E   | [Hành trình xuyên module](modules/e2e.md)                 | `Toàn ứng dụng`                                                              |     9 |

Phân bố ưu tiên: P0: 50, P1: 274, P2: 65, P3: 1.
