# Kịch bản demo UAT Labdock User Portal

**Ngày lập:** 18/10/2026. **Cơ sở:** bắt đầu đọc source tại commit `0b71021` cùng các thay đổi local; đối chiếu cuối với HEAD `ce1122b`. Cần đối chiếu với build được deploy trước khi chạy.

Tài liệu dành cho người dẫn demo, QA và PO. Mục tiêu là trình diễn hành trình khách hàng và ghi nhận kết quả nghiệp vụ quan sát được. Bộ case trong Excel là checklist thực thi, chưa phải báo cáo UAT đã pass.

## 1. Phạm vi và mức độ sẵn sàng

Đã rà soát 13 nhóm feature, các route/layout, service, hook, schema validation, component tương tác, đa ngôn ngữ, cấu hình phiên/cache và bộ test liên quan. Repository chỉ chứa frontend user portal. Không suy ra hành vi backend chưa được kiểm chứng từ một màn hình thành công.

| Nhóm                                                       | Nguồn dữ liệu/hành vi hiện tại                      | Cách trình bày trong demo                                           |
| ---------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------- |
| Home, categories, brands, origins, catalog, product detail | API phía server                                     | Đối chiếu dữ liệu UAT thật; nhận diện fallback khi API lỗi          |
| Signup, OTP, login, forgot/change password, profile/avatar | API phía client                                     | Demo đầy đủ với tài khoản/hộp thư test                              |
| Cart đọc/thêm/sửa/xóa                                      | API thật `/cart`, `/cart/items`                     | Kiểm chứng request, response và dữ liệu sau reload                  |
| Orders và RFQ list/detail                                  | API thật                                            | Dùng bản ghi đã seed, mở detail bằng GUID từ list                   |
| Tạo checkout và xác nhận payment                           | Mock local, chờ khoảng 550 ms                       | Chỉ demo màn hình; không xác nhận thu tiền, tạo order hoặc email    |
| Gửi quote từ cart                                          | Mock local; thao tác sửa/xóa dòng vẫn dùng cart API | Chỉ demo form và success; không khẳng định đã lưu RFQ               |
| Contact General/Quote                                      | Mock local                                          | Success có reference local; không xác nhận email/ticket/RFQ backend |
| News, About, Legal; Research Leaders                       | Nội dung/asset local                                | Duyệt nội dung tĩnh, không demo quản trị CMS                        |
| Search catalog, SGD, Sell ở header; social footer          | Chưa nối nghiệp vụ hoặc còn `#`                     | Đưa vào danh sách giới hạn, không làm điểm demo thành công          |

**Luồng giao dịch hiện tại chưa thể nghiệm thu xuyên suốt:** thanh toán mock trả `OR-3000`, nhưng order detail chỉ nhận GUID. Màn quote success cũng không chứng minh có RFQ mới trên API. UAT-068 là điều kiện kiểm chứng sau khi có tích hợp thực.

Ngoài phạm vi source: admin/supplier portal, quản trị sản phẩm/CMS, xử lý đơn và đổi trạng thái, Accept/Reject RFQ, hoàn/hủy giao dịch, tracking vận chuyển, tải invoice PDF và thanh toán gateway thật. Logo Visa/Mastercard hoặc chữ Stripe trên UI không chứng minh đã có các phương thức này.

## 2. Chuẩn bị trước buổi demo

Ghi frontend UAT URL, API base thực tế, build/commit deploy, thời gian deploy, browser/OS và người chạy. `NEXT_PUBLIC_API_BASE_URL` có mặc định API UAT trong config, nhưng source không cung cấp URL frontend UAT để dùng ngay. Không dùng API URL như frontend URL.

Chuẩn bị tài khoản A, B, E, R và email đăng ký mới có quyền truy cập OTP như bảng dữ liệu. Kiểm tra tài khoản A thực sự có cart/orders/RFQ theo API. Dùng GUID/slug lấy từ UAT, không dùng ID trong test fixture làm dữ liệu thật.

Kiểm tra nhanh trước giờ demo:

- Login A, refresh, mở profile; kiểm tra tên/email đúng A.
- Catalog và P-A/P-B mở được; giá, stock, variantId và documents đã xác minh.
- Cart thêm/sửa/xóa được và giữ sau refresh. Reset về dữ liệu demo đã thống nhất.
- Orders và RFQ có bản ghi đã seed để mở detail bằng GUID.
- Mailbox nhận OTP hoạt động; avatar test đã chuẩn bị.
- Đường truyền, HTTPS, image/media và clipboard được kiểm tra trên browser sẽ demo.
- Đánh dấu rõ phần mock và các GAP bên dưới. Nếu không có fixture cho một case, ghi Blocked khi đến lượt chạy, không đánh Pass từ ảnh mẫu.

Các dữ liệu sau là **đề nghị chuẩn bị**, chưa được tạo trên UAT trong công việc này.

| Mã      | Dữ liệu                  | Giá trị/điều kiện                                                       | Lưu ý                                                                                                                               |
| ------- | ------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| ENV     | Môi trường và build      | UAT_BASE_URL, build/commit deploy, API base, thời điểm deploy           | Điền trước buổi demo. Bắt đầu rà soát 0b71021 + thay đổi local; đối chiếu cuối với ce1122b. Không giả định API UAT là URL frontend. |
| A       | Khách hàng chính         | Tài khoản test có profile đầy đủ và giỏ được reset có kiểm soát         | Dùng cho hành trình mua hàng, profile, orders và RFQ. Không dùng thông tin người thật.                                              |
| B       | Khách hàng thứ hai       | Profile/cart/orders/RFQ khác A                                          | Đối chiếu quyền và cache khi đổi tài khoản.                                                                                         |
| E       | Tài khoản rỗng           | Không có cart/orders/RFQ                                                | Kiểm tra empty state thật; /cart?empty=1 chỉ ép giao diện.                                                                          |
| R       | Tài khoản reset mật khẩu | Tài khoản phụ có hộp thư OTP do QA kiểm soát                            | Chạy đổi/reset password cuối buổi, lưu mật khẩu test ở nơi được nhóm quản lý.                                                       |
| A-NEW   | Đăng ký mới              | Email thực sự nhận được OTP và chưa tồn tại                             | Dùng alias của hộp thư UAT được cấp; không dùng example.test để demo nhận email. OTP lấy thực tế.                                   |
| CONTACT | Thông tin giả lập        | Nguyễn UAT; Lab UAT; +65 81234567; SG; địa chỉ dài >=8; postal 319455   | Email thay bằng hộp thư test. Dữ liệu dùng để nhập, không khẳng định đã seed. VN dùng +84 và số nội địa test.                       |
| P-A/V1  | Sản phẩm chính           | Giá 100 SGD; promotion 0%; stock 10; active; giá công khai              | Cần backend seed hoặc chọn sản phẩm tương đương. Ghi product slug, productId và variantId GUID thật.                                |
| P-A/V2  | Biến thể giảm giá        | Giá gốc 200 SGD; promotion 10%; stock 5                                 | PDP phải hiển thị 180.00 SGD, không dùng nhánh này cho mẫu tổng tiền không khuyến mãi.                                              |
| P-B     | Sản phẩm thứ hai         | Giá 50 SGD; stock >=5; active; giá công khai                            | Dùng quantity 1 để đối chiếu tổng.                                                                                                  |
| P-C/P-D | Hết hàng / ẩn giá        | P-C stock 0; P-D priceVisible=false hoặc unitPrice=null                 | Kiểm tra CTA và quote nhánh contact.                                                                                                |
| CART    | Mẫu tổng tiền đề nghị    | A/V1 x2: lineTotal 200; B x1: lineTotal 50; cùng SGD                    | Subtotal 250.00; delivery 0; tax code 9%=22.50; total 272.50. Cần xác nhận quy tắc thuế với PO.                                     |
| CAT     | Danh mục và bộ lọc       | Category >=3 cấp; >5 brand/origin; >20 products; 1 tổ hợp trả 0 kết quả | Ghi GUID/slug thật và cặp filter có kết quả trước demo.                                                                             |
| ORDER   | Đơn đã seed              | >=11 order thuộc A; 1 order B; 1 GUID không tồn tại                     | Có invoice lines, phí, status, shippingSnapshotJson. Mở chi tiết bằng GUID từ list.                                                 |
| RFQ     | RFQ đã seed              | >=11 RFQ thuộc A; 1 RFQ B; notes có/rỗng                                | Các status đại diện: submitted/quoted/accepted/expired hoặc bộ dữ liệu backend hỗ trợ.                                              |
| FILES   | File avatar              | JPEG/PNG <=1 MiB, đúng 1 MiB, 1 MiB+1 byte; PDF/SVG                     | Chuẩn bị file test không nhạy cảm và ảnh phục hồi.                                                                                  |
| BROWSER | Thiết bị                 | Desktop 1366x768; tablet 768x1024; mobile 390x844                       | Ghi browser/OS/version khi chạy. Test keyboard và zoom riêng.                                                                       |
| ERROR   | Fixture lỗi              | 401/403/404/409/500; slow response; token expired; API empty            | Chỉ tạo lỗi trong môi trường kiểm soát. Browser block không mô phỏng được server fetch của Next.                                    |

### Mẫu đối chiếu tổng tiền

Nếu seed đúng mẫu A/V1 x2 giá 100 SGD và B x1 giá 50 SGD, `lineTotal` lần lượt 200 và 50, cùng currency:

| Lựa chọn  |   Subtotal | Delivery | Tax theo code 9% |      Total |
| --------- | ---------: | -------: | ---------------: | ---------: |
| Cả A và B | SGD 250.00 | SGD 0.00 |        SGD 22.50 | SGD 272.50 |
| Chỉ A     | SGD 200.00 | SGD 0.00 |        SGD 18.00 | SGD 218.00 |
| Chỉ B     |  SGD 50.00 | SGD 0.00 |         SGD 4.50 |  SGD 54.50 |

`subtotal` ưu tiên `lineTotal` từ cart API. `discount` chỉ là thông tin so sánh với `originalPrice` khi có; total không trừ discount thêm lần nữa. Fixture trên không có `originalPrice`, nên discount bằng 0. Không mặc định giá PDP giảm 10% đồng nghĩa API cart đã trả đúng cùng giá; cần đối chiếu response thật.

Thuế 9%, phí giao hàng 0 và yêu cầu postal code 6 chữ số tại checkout là behavior trong code, chưa phải quy tắc nghiệp vụ được PO xác nhận. Profile chấp nhận postal dài 4–12 ký tự. Không mở rộng kết luận thuế hoặc địa chỉ quốc tế từ mẫu SG này.

## 3. Lịch trình dẫn demo

Chương trình đầy đủ gồm 17 cảnh, khoảng 75 phút thao tác, nên dành lịch 90 phút cùng trao đổi và thời gian OTP. Đăng ký/reset password dùng tài khoản phụ/tab riêng để không làm đứt phiên A.

Nếu chỉ có 30 phút, dùng D01 2 phút, D02 2, D03 3, D04 2, D05 3, D06 4, D07 3, D08 2, D09 2, D10 2, D11 2, D13 2, D17 1. Để signup, reset password, contact, nội dung và kiểm tra lỗi cho phiên đầy đủ. Đây là demo trọng tâm, không thay thế toàn bộ UAT.

| Cảnh | Nội dung                      | Actor                     | Phút | Case tham chiếu                         |
| ---- | ----------------------------- | ------------------------- | ---: | --------------------------------------- |
| D01  | Mở đầu, phạm vi và môi trường | Khách                     |    3 | UAT-001 UAT-052                         |
| D02  | Khám phá và ngôn ngữ          | Khách                     |    4 | UAT-002 UAT-003                         |
| D03  | Catalog và chọn sản phẩm      | Khách hoặc A              |    5 | UAT-004 UAT-005 UAT-007                 |
| D04  | Đăng nhập                     | A                         |    5 | UAT-034 UAT-035                         |
| D05  | Chi tiết và biến thể          | A                         |    5 | UAT-010 UAT-011 UAT-012                 |
| D06  | Thêm giỏ, sửa và chọn dòng    | A                         |    6 | UAT-013 UAT-015 UAT-016 UAT-017 UAT-019 |
| D07  | Checkout và địa chỉ           | A                         |    5 | UAT-020 UAT-021 UAT-022                 |
| D08  | Thanh toán mô phỏng           | A                         |    4 | UAT-023 UAT-024 UAT-025                 |
| D09  | Tra cứu đơn có thật           | A                         |    4 | UAT-043 UAT-044                         |
| D10  | Yêu cầu báo giá từ giỏ        | A                         |    4 | UAT-026 UAT-027                         |
| D11  | Tra cứu RFQ có thật           | A                         |    4 | UAT-046 UAT-047                         |
| D12  | Liên hệ và quote nhập tay     | Khách hoặc A              |    4 | UAT-028 UAT-029 UAT-030                 |
| D13  | Hồ sơ và ảnh đại diện         | A                         |    5 | UAT-037 UAT-038 UAT-039                 |
| D14  | Đăng ký và OTP                | A-NEW, tab riêng tư riêng |    6 | UAT-031 UAT-032 UAT-033                 |
| D15  | Nội dung và mobile            | Khách hoặc A              |    4 | UAT-049 UAT-050 UAT-051 UAT-054 UAT-055 |
| D16  | Đổi/reset password và logout  | R, rồi A/B                |    5 | UAT-036 UAT-041 UAT-057                 |
| D17  | Chốt kết quả và việc còn lại  | Người demo + PO           |    2 | UAT-068                                 |

## 4. Kịch bản thao tác và lời dẫn

### D01. Mở đầu, phạm vi và môi trường (3 phút)

**Actor:** Khách. **Checklist:** UAT-001 UAT-052.
**Thao tác:** Mở Home và giới thiệu hành trình mua hàng/quote. Nêu rõ các bước submit/payment hiện mô phỏng.

> Chúng ta sẽ xem cách một khách hàng tìm sản phẩm, chuẩn bị mua hàng hoặc yêu cầu báo giá, sau đó tra cứu hồ sơ và dữ liệu đã có. Phần thanh toán và gửi yêu cầu trong build này đang mô phỏng.
> **Điểm cần chứng minh:** Ảnh Home, build và API đã kiểm tra.
> **Nếu không thực hiện được:** Nếu homepage API lỗi, nhận diện fallback; ghi Blocked cho nội dung API, tiếp tục catalog nếu API đó hoạt động.

### D02. Khám phá và ngôn ngữ (4 phút)

**Actor:** Khách. **Checklist:** UAT-002 UAT-003.
**Thao tác:** Mở cây 3 cấp, chọn category. Chuyển VI rồi EN trên URL có query.

> Khách có thể đi theo danh mục chuyên môn và đổi ngôn ngữ mà vẫn giữ trang và bộ lọc.
> **Điểm cần chứng minh:** Đúng category/locale/query.
> **Nếu không thực hiện được:** Dùng category/slug đã xác minh; không dùng ô Search catalog chưa nối.

### D03. Catalog và chọn sản phẩm (5 phút)

**Actor:** Khách hoặc A. **Checklist:** UAT-004 UAT-005 UAT-007.
**Thao tác:** Chọn 2 brand, 2 origin; sort; trang 2 nếu đủ dữ liệu; Clear rồi mở P-A.

> Bộ lọc giúp thu hẹp nhu cầu; URL lưu lựa chọn để có thể tải lại hoặc chia sẻ.
> **Điểm cần chứng minh:** Filter/sort/page và card khớp fixture.
> **Nếu không thực hiện được:** Nếu combo trả rỗng, dùng Clear; không đổi sang dữ liệu chưa kiểm chứng.

### D04. Đăng nhập (5 phút)

**Actor:** A. **Checklist:** UAT-034 UAT-035.
**Thao tác:** Submit rỗng một lần để minh họa validation, sau đó login A và refresh.

> Sau đăng nhập, thông tin tài khoản và giỏ hàng được tải theo phiên của khách.
> **Điểm cần chứng minh:** Header/profile A và phiên sau reload.
> **Nếu không thực hiện được:** Dùng A dự phòng nếu login lỗi; ghi lỗi, không giả lập phiên thành công.

### D05. Chi tiết và biến thể (5 phút)

**Actor:** A. **Checklist:** UAT-010 UAT-011 UAT-012.
**Thao tác:** Mở P-A: đổi ảnh/tab/document/V1/V2. Minh họa P-C/P-D rồi quay V1.

> Giá và lựa chọn phụ thuộc biến thể; sản phẩm hết hàng hoặc ẩn giá được dẫn sang yêu cầu tư vấn/báo giá.
> **Điểm cần chứng minh:** Giá V2=180 SGD; variant/tồn kho; tài liệu.
> **Nếu không thực hiện được:** Nếu doc chưa seed, bỏ điểm tải doc và ghi thiếu dữ liệu; quote ẩn giá cần nhập tay.

### D06. Thêm giỏ, sửa và chọn dòng (6 phút)

**Actor:** A. **Checklist:** UAT-013 UAT-015 UAT-016 UAT-017 UAT-019.
**Thao tác:** Bắt đầu với giỏ rỗng đã xác nhận. Thêm P-A/V1 x2 từ PDP và P-B x1. Mở giỏ mini và cart. Sửa số lượng bằng Enter rồi đưa về fixture, bỏ/chọn B.

> Khách có thể chọn từng dòng để mua hoặc báo giá; tổng tiền thay đổi theo lựa chọn.
> **Điểm cần chứng minh:** Fixture subtotal 250, tax 22.50, total 272.50 SGD.
> **Nếu không thực hiện được:** Nếu giỏ đã có dòng, ghi quantity cũ và chỉnh về fixture trước đối chiếu. Nếu add card lỗi, dùng PDP; vẫn ghi GAP-04.

### D07. Checkout và địa chỉ (5 phút)

**Actor:** A. **Checklist:** UAT-020 UAT-021 UAT-022.
**Thao tác:** Chọn chỉ P-A rồi Proceed. Kiểm tra profile prefill; sửa địa chỉ, chọn country/calling code, mở billing khác delivery và validation.

> Thông tin giao hàng được chuẩn bị từ hồ sơ; khách có thể sửa và khai địa chỉ xuất hóa đơn riêng.
> **Điểm cần chứng minh:** Chỉ item đã chọn; form không bị ghi đè, lỗi đúng trường.
> **Nếu không thực hiện được:** Nếu hiện default demo, thay bằng dữ liệu A và ghi nhận GAP-03.

### D08. Thanh toán mô phỏng (4 phút)

**Actor:** A. **Checklist:** UAT-023 UAT-024 UAT-025.
**Thao tác:** Chọn PayNow, Make payment; đối chiếu amount/reference; bấm hoàn tất để xem success. Trình bày Bank transfer nếu cần.

> Đây là luồng màn hình mô phỏng. Màn thành công chưa xác nhận thu tiền hay tạo đơn backend.
> **Điểm cần chứng minh:** UI pending/success. Không dùng link OR-3000 làm bằng chứng order thật.
> **Nếu không thực hiện được:** Không chuyển tiền qua QR. Kết thúc mô phỏng rồi chuyển /orders đã seed.

### D09. Tra cứu đơn có thật (4 phút)

**Actor:** A. **Checklist:** UAT-043 UAT-044.
**Thao tác:** Mở /orders, trang 2 nếu có, bấm order từ list bằng GUID; đối chiếu lines và invoice.

> Phần tra cứu này lấy đơn có sẵn từ API, độc lập với mã đơn mô phỏng vừa rồi.
> **Điểm cần chứng minh:** Order A, status, phí và invoice khớp API.
> **Nếu không thực hiện được:** Nếu thiếu đơn, ghi Blocked dữ liệu; không nhập OR-3000 vào detail.

### D10. Yêu cầu báo giá từ giỏ (4 phút)

**Actor:** A. **Checklist:** UAT-026 UAT-027.
**Thao tác:** Về cart, chọn P-B rồi Request quote, sửa contact mặc định, Submit, xem success.

> Với danh sách sản phẩm trong giỏ, khách chuẩn bị yêu cầu báo giá cho đúng các dòng đã chọn. Bước gửi hiện mô phỏng.
> **Điểm cần chứng minh:** Đúng items, validation, success reference trong URL.
> **Nếu không thực hiện được:** Không khẳng định request vừa gửi đã có trong danh sách RFQ API.

### D11. Tra cứu RFQ có thật (4 phút)

**Actor:** A. **Checklist:** UAT-046 UAT-047.
**Thao tác:** Mở /rfqs bằng quick action hoặc URL, chọn RFQ đã seed; xem items và remarks.

> RFQ đã lưu có thể tra cứu trạng thái và ghi chú. Màn này hiện hiển thị ID item/variant và chưa có chấp nhận/từ chối báo giá.
> **Điểm cần chứng minh:** Danh sách/detail API của A.
> **Nếu không thực hiện được:** Nếu chưa seed, ghi Blocked dữ liệu và tiếp tục phần hồ sơ.

### D12. Liên hệ và quote nhập tay (4 phút)

**Actor:** Khách hoặc A. **Checklist:** UAT-028 UAT-029 UAT-030.
**Thao tác:** Mở contact, General rồi Quote. Thêm/xóa product row và minh họa giới hạn 5; gửi mô phỏng.

> Khách chưa xác định sản phẩm trong catalog có thể nhập nhu cầu thủ công hoặc gửi câu hỏi.
> **Điểm cần chứng minh:** Validation đúng variant form; MSG-/RFQ- success mock.
> **Nếu không thực hiện được:** Không diễn giải success là đã gửi mail/tạo ticket thật.

### D13. Hồ sơ và ảnh đại diện (5 phút)

**Actor:** A. **Checklist:** UAT-037 UAT-038 UAT-039.
**Thao tác:** Sửa tên/company/address, Save và refresh. Chọn ảnh hợp lệ, Save. Minh họa Cancel.

> Hồ sơ cập nhật qua API và được dùng lại cho lần checkout sau.
> **Điểm cần chứng minh:** Profile/avatar giữ sau reload, Cancel không lưu.
> **Nếu không thực hiện được:** Nếu upload lỗi, giữ ảnh cũ, ghi lỗi và tiếp tục; không thay bằng ảnh giả đã lưu.

### D14. Đăng ký và OTP (6 phút)

**Actor:** A-NEW, tab riêng tư riêng. **Checklist:** UAT-031 UAT-032 UAT-033.
**Thao tác:** Đăng ký mới qua 3 bước, nhận OTP thật, set password, về login. Chuẩn bị sẵn mailbox.

> Tài khoản được tạo qua xác minh email và đặt mật khẩu; mã xác minh có thời hạn do backend trả về.
> **Điểm cần chứng minh:** Challenge và login mới thật.
> **Nếu không thực hiện được:** Nếu OTP không tới, ghi Blocked, dùng tài khoản đã tạo để tiếp tục. Không dùng OTP trong test fixture.

### D15. Nội dung và mobile (4 phút)

**Actor:** Khách hoặc A. **Checklist:** UAT-049 UAT-050 UAT-051 UAT-054 UAT-055.
**Thao tác:** Mở News, filter/copy link; About/Legal. Chuyển mobile, minh họa Research Leaders autoplay và quay desktop grid.

> Nội dung công khai hỗ trợ tìm hiểu sản phẩm. Trên mobile, logo carousel vẫn tự chạy và cho phép thao tác tay.
> **Điểm cần chứng minh:** Đúng viewport, navigation, 12 logo và breakpoint.
> **Nếu không thực hiện được:** Ghi rõ nội dung tĩnh/tiếng Anh còn lại; không demo social/SGD/Sell như đã hoàn thiện.

### D16. Đổi/reset password và logout (5 phút)

**Actor:** R, rồi A/B. **Checklist:** UAT-036 UAT-041 UAT-057.
**Thao tác:** Dùng R để đổi hoặc reset password và login mới. Với A logout, login B và kiểm tra dữ liệu riêng.

> Thao tác bảo mật được kiểm chứng bằng lần đăng nhập lại và dữ liệu đúng tài khoản.
> **Điểm cần chứng minh:** Password mới hoạt động; B không thấy A.
> **Nếu không thực hiện được:** Dùng R để không làm gián đoạn tài khoản demo chính; phục hồi profile/cart/ảnh test sau buổi.

### D17. Chốt kết quả và việc còn lại (2 phút)

**Actor:** Người demo + PO. **Checklist:** UAT-068.
**Thao tác:** Ghi Pass/Fail/Blocked cho các case đã chạy, chỉ rõ mock, lỗi và dữ liệu thiếu. Thống nhất vòng kiểm tra tiếp.

> Các luồng API được nghiệm thu theo bằng chứng. Checkout/payment và gửi quote/contact cần vòng UAT tích hợp sau khi nối backend.
> **Điểm cần chứng minh:** Có người chạy, build, evidence, issue owner và quyết định phạm vi.
> **Nếu không thực hiện được:** Không dùng việc xem hết màn hình hoặc test unit pass làm sign-off tích hợp.

## 5. Bộ case thực thi UAT

File Excel có 68 case, mỗi case gồm điều kiện, bước thao tác, kết quả mong đợi và bằng chứng cần thu thập. Các cột kết quả thực tế, evidence, defect, người chạy và ngày chạy để trống. Trạng thái ban đầu là **Chưa chạy**.

| Nhóm                                                         | Case                 |
| ------------------------------------------------------------ | -------------------- |
| Home, điều hướng, ngôn ngữ, catalog                          | UAT-001–009          |
| PDP và cart                                                  | UAT-010–019, UAT-067 |
| Checkout, country picker, payment mock                       | UAT-020–025          |
| Quote từ giỏ và contact nhập tay                             | UAT-026–030          |
| Signup, OTP, login, quên mật khẩu                            | UAT-031–036          |
| Profile, avatar, đổi mật khẩu                                | UAT-037–042          |
| Orders                                                       | UAT-043–045          |
| RFQ                                                          | UAT-046–048          |
| News, About, Legal, action chưa nối                          | UAT-049–052          |
| Carousel, responsive, keyboard                               | UAT-053–056          |
| Logout, refresh, quyền, lỗi API                              | UAT-057–061          |
| Locale redirect, dashboard, SEO bổ sung                      | UAT-062–064          |
| Mixed currency/stock, mustChangePassword, tích hợp giao dịch | UAT-065–068          |

Phân biệt ba loại kết quả khi chạy:

- **API:** phải có dữ liệu backend đúng và, với mutation, kiểm tra lại sau reload. Khi thao tác ảnh hưởng quyền, kiểm tra với A/B và tài khoản chưa đăng nhập.
- **UI mock hoặc tĩnh:** chỉ kết luận hành vi màn hình tương ứng. Case Pass không nâng mức sẵn sàng thành tích hợp.
- **Tiêu chí cần xác minh/chốt:** kết quả mong muốn dựa trên yêu cầu người dùng hoặc quy tắc nghiệp vụ đề xuất. Ghi rõ actual và quyết định PO; không viết hiện trạng có lỗi thành expected để làm case Pass.

### Các phép kiểm tra rủi ro cần ưu tiên

1. **UAT-045/048/057/059:** A không thấy dữ liệu B, truy cập chưa đăng nhập không lộ dữ liệu riêng.
2. **UAT-013/016/017:** thêm đúng variant, không sai quantity/lineTotal/tổng tiền, lỗi mutation không báo thành công.
3. **UAT-031/033/034/036/041:** OTP, tạo tài khoản và đổi/reset password được chứng minh bằng login thật.
4. **UAT-053/054/056:** autoplay giữ thao tác tay và có pause dễ tiếp cận. Yêu cầu autoplay áp dụng cho mọi carousel, gồm logo Research Leaders mobile và gallery PDP.
5. **UAT-065/066/068:** mixed currency, stock/item bất thường, bắt buộc đổi password và giao dịch tích hợp. Không bỏ qua chỉ vì demo happy path diễn ra trơn tru.

Không mô phỏng lỗi server fetch bằng cách chỉ chặn request trong browser: Home/catalog/PDP tải qua Next server. Cần fixture/stub server hoặc backend UAT có kiểm soát. Tạo bằng chứng Network không chứa token, cookie, OTP, mật khẩu hoặc thông tin cá nhân không cần thiết.

## 6. Điểm cần xử lý hoặc thống nhất trước nghiệm thu

Đây là kết quả đọc source, chưa phải tất cả đều đã tái hiện trực tiếp trên UAT. Mức ưu tiên phụ thuộc phạm vi nghiệm thu đã thống nhất; các mục có điều kiện phải được xác minh bằng fixture.

| Mã     | Vấn đề                                         | Ưu tiên                    | Cơ sở                               | Ảnh hưởng                                                                                                                                              | Cách xử lý trong demo                                                                    |
| ------ | ---------------------------------------------- | -------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| GAP-01 | Checkout/payment/quote/contact còn mock        | P1 nếu nghiệm thu tích hợp | Xác nhận tĩnh                       | UI thành công không tạo giao dịch/email backend. Checkout trả OR-3000, quote/contact tạo reference local.                                              | Demo ghi rõ mô phỏng. UAT-068 chưa đủ điều kiện nghiệm thu tích hợp.                     |
| GAP-02 | Mã đơn success không khớp order detail         | P1                         | Xác nhận tĩnh                       | Success dùng OR-3000; orders service yêu cầu GUID. Không nối được journey mua xong → order detail thật.                                                | Dùng order GUID đã seed để demo phần tra cứu, mở từ /orders.                             |
| GAP-03 | Thông tin người dùng còn gán sẵn               | P1/P2 tùy phạm vi          | Xác nhận tĩnh                       | Checkout có default Sarah; quote contact mặc định Sarah; success email cố định; Last changed cố định.                                                  | Điền lại dữ liệu test; không khẳng định cá nhân hóa/email/time đã đúng.                  |
| GAP-04 | Card có thể gửi productId như variantId        | P1                         | Điều kiện từ source, cần UAT        | Map list rút gọn và related tạo variant.id=product.id; Add card gửi ID này cho /cart/items. API có thể từ chối nếu hai ID khác nhau.                   | Happy path thêm từ PDP có variant thật; vẫn thực thi UAT-013 trên card trước nghiệm thu. |
| GAP-05 | Quote từ sản phẩm ẩn giá không prefill product | P2                         | Xác nhận tĩnh                       | PDP gửi product={slug}, route contact chỉ đọc type và không truyền product xuống form.                                                                 | Nêu rõ nhập thủ công; không demo tự điền sản phẩm.                                       |
| GAP-06 | Search/currency/seller/social chưa nối         | P1/P2 theo scope           | Xác nhận tĩnh                       | Search, SGD, Sell thiếu xử lý nghiệp vụ; social còn #.                                                                                                 | Không chọn làm điểm demo thành công; chốt scope và theo dõi lỗi.                         |
| GAP-07 | Autoplay và pause chưa đủ theo yêu cầu         | P1 theo yêu cầu người dùng | Xác nhận tĩnh; cần kiểm tra runtime | Gallery PDP chưa bật Autoplay. Carousel khác phần lớn chỉ pause khi hover; navigation chưa có pause/resume cho keyboard/touch.                         | Chạy UAT-053/054/056. Không coi hover là đã đáp ứng yêu cầu pause tiếp cận.              |
| GAP-08 | Tổng tiền/stock/currency cần kiểm tra          | P1                         | Xác nhận logic tĩnh; cần fixture    | Tổng dùng currency dòng đầu; chưa chặn mixed currency và một số trạng thái item; quantity cart có thể giữ số cũ >stock. Tax 9% và delivery 0 hardcode. | Happy path cùng SGD. PO chốt rule; chạy UAT-015/017/065 trước nghiệm thu giao dịch.      |
| GAP-09 | Feedback lỗi cart/quote chưa đồng đều          | P2                         | Xác nhận tĩnh; cần UAT              | /cart chưa render removeCart.isError. Request quote chưa render đầy đủ load/remove error.                                                              | Thực thi UAT-061, lưu actual. Không coi lỗi request là thao tác đã thành công.           |
| GAP-10 | mustChangePassword chưa cưỡng chế              | P1 nếu chính sách áp dụng  | Xác nhận tĩnh                       | Có lưu cờ nhưng chưa có gate chuyển/chặn flow sau login.                                                                                               | Cần PO/backend xác nhận policy và chạy UAT-066.                                          |
| GAP-11 | Ngôn ngữ, nội dung tĩnh và redirect            | P2                         | Xác nhận tĩnh; cần UAT              | Legal/news body tiếng Anh; html lang=en; một số redirect tuyệt đối chưa giữ /vi; About partner là placeholder.                                         | Duyệt content EN/VI, chạy UAT-051/062/064.                                               |
| GAP-12 | Chưa chứng minh auth guard và tích hợp E2E     | P1                         | Giới hạn phạm vi                    | Middleware chỉ i18n, private API chịu quyền; không có script test:e2e. Kết quả unit/component không thay thế chạy UAT.                                 | Chạy UAT-045/048/057/058/059, ghi bằng chứng quyền backend.                              |

Một số chú ý khi trình bày:

- Bản README có đoạn Cart nói add/update/remove còn local. Service hiện tại đã dùng POST/PATCH/DELETE API; kịch bản này ưu tiên implementation hiện hành.
- Home có thể hiện promo fallback dù API lỗi. Không dùng việc nhìn thấy hero làm bằng chứng API homepage đã thành công.
- Quick action “news” trên Home dẫn tới anchor editorial `/#news`; trang tin đầy đủ là `/news`.
- Order detail hiện shipping dưới dạng JSON và invoice dạng text. RFQ detail hiện ID item/variant/supplier; không hứa chức năng tên sản phẩm, download PDF, tracking hay Accept/Reject khi source chưa có.
- Một số chuỗi lỗi và nội dung chưa dịch đầy đủ. Chuyển VI thành công về URL chưa đủ để nghiệm thu nội dung song ngữ hoàn chỉnh.

## 7. Trạng thái kiểm chứng khi lập tài liệu

Đã chạy `npm test` trên workspace local: **66 test files, 59 pass và 7 fail; 212 tests, 203 pass và 9 fail**. Thời gian báo trong lần chạy: 36.91 giây. Lần test chạy khi source đang có thay đổi chưa commit; lúc chốt tài liệu HEAD đã là `ce1122b`. Đây là bằng chứng local tại thời điểm chạy, không phải kết quả UAT hoặc xác nhận quality gate của build deploy. Cần kiểm tra quality gate trên build cuối cùng trước buổi demo.

| File test fail                  | Số fail | Hiện tượng trong log                                     |
| ------------------------------- | ------: | -------------------------------------------------------- |
| `about-screen.test.tsx`         |       1 | Thiếu context `NextIntlClientProvider`                   |
| `orders-table.test.tsx`         |       2 | Thiếu context `NextIntlClientProvider`                   |
| `rfqs-table.test.tsx`           |       2 | Thiếu context `NextIntlClientProvider`                   |
| `forgot-password-form.test.tsx` |       1 | Không tìm thấy heading theo tên test đang chờ            |
| `cart-header-popover.test.tsx`  |       1 | Không tìm thấy button theo accessible name test đang chờ |
| `request-quote-screen.test.tsx` |       1 | Không tìm thấy textbox tên Phone number                  |
| `address-fields.test.tsx`       |       1 | Timeout 5000 ms                                          |

Log còn có DNS `ENOTFOUND` tới API UAT và thông báo parse CSS. Chưa xác minh nguyên nhân gốc của mọi test fail. Không sửa source/test hiện có trong nhiệm vụ viết kịch bản.

Chưa chạy browser demo trên UAT, chưa có tài khoản/fixture/URL frontend được cung cấp, chưa kiểm chứng email, gateway hay dữ liệu backend sau giao dịch. Không chạy typecheck/lint/build vì thay đổi được tạo chỉ là tài liệu và workbook, không phải sửa implementation; bộ test được chạy để ghi nhận baseline. Chưa có script `test:e2e` trong package tại thời điểm rà soát.

## 8. Ghi nhận kết quả và nghiệm thu

Trong Excel, dùng trạng thái:

| Trạng thái | Khi dùng                                                                      |
| ---------- | ----------------------------------------------------------------------------- |
| Chưa chạy  | Chưa thực thi hoặc chưa đến lượt                                              |
| Pass       | Đã chạy toàn bộ bước và khớp expected của đúng mức kiểm chứng                 |
| Fail       | Đã chạy và có khác biệt; điền actual, evidence và defect                      |
| Blocked    | Không thể chạy do thiếu môi trường/dữ liệu/tích hợp; ghi lý do và owner xử lý |
| N/A        | PO xác nhận ngoài scope; ghi lý do trong actual                               |

Các nhãn P1/P2 là ưu tiên thực thi: P1 liên quan hành trình chính, giao dịch, tài khoản/quyền hoặc yêu cầu autoplay; P2 là luồng bổ sung/nội dung. Chúng không tự động thay thế severity của defect.

Điều kiện nghiệm thu đề nghị để PO thống nhất:

- Tất cả P1 trong phạm vi API thật được thực thi có bằng chứng, không còn lỗi ngăn hoàn thành luồng, sai tiền hoặc lộ dữ liệu tài khoản.
- Case Blocked/Chưa chạy/N/A được liệt kê rõ; không tính như Pass.
- Những quy tắc thuế/ship/postal/currency, quyền guest, ngôn ngữ và mustChangePassword được xác nhận theo phạm vi sản phẩm.
- Checkout/payment/quote/contact được nghiệm thu riêng ở mức UI mock nếu PO chấp nhận. Nghiệm thu giao dịch thực phải đợi tích hợp và chạy UAT-068.
- Mọi defect còn mở có người phụ trách và quyết định chấp nhận hoặc lịch kiểm tra lại. Tỷ lệ Pass cao không bù cho lỗi quyền hoặc sai giao dịch.

Mẫu biên bản cuối buổi:

| Hạng mục                                               | Điền khi chạy |
| ------------------------------------------------------ | ------------- |
| UAT URL, build, ngày giờ, browser/OS                   |               |
| Người demo / QA / PO tham gia                          |               |
| Case đã chạy / Pass / Fail / Blocked / Chưa chạy / N/A |               |
| Case P1 chưa Pass và lý do                             |               |
| Defect và evidence                                     |               |
| Phần API thật được nghiệm thu                          |               |
| Phần mock/tĩnh được xem và phạm vi được chấp nhận      |               |
| Quyết định PO, việc cần làm, owner và ngày retest      |               |

Sau buổi demo, phục hồi profile/avatar nếu cần, dọn các dòng cart test theo kế hoạch đã thống nhất, ghi lại tài khoản/password test đã đổi ở nơi quản lý của nhóm và logout. Dữ liệu signup/order/RFQ cần reset qua quy trình của nhóm backend, không giả định frontend có chức năng xóa chúng.

## 9. Ma trận route và source đối chiếu

URL dưới đây là đường dẫn EN. VI thêm `/vi`, trừ các hành vi redirect/404 đang cần kiểm chứng tại UAT-062. Chưa coi middleware i18n hay `noindex` là cơ chế chặn quyền.

| Route                       | Entry/logic chính                                                                            | Case                |
| --------------------------- | -------------------------------------------------------------------------------------------- | ------------------- |
| `/`                         | [server.ts](../src/features/home/server.ts)                                                  | UAT-001/053/054/060 |
| `/products`                 | [catalog-workspace.tsx](../src/features/products/components/catalog-workspace.tsx)           | UAT-004–009         |
| `/products/category/[slug]` | [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/products/category/%5Bslug%5D/page.tsx)    | UAT-002/008/009     |
| `/products/[slug]`          | [product-purchase-panel.tsx](../src/features/products/components/product-purchase-panel.tsx) | UAT-010–014/067     |
| `/cart`                     | [cart-screen.tsx](../src/features/checkout/components/cart-screen.tsx)                       | UAT-013–019/061/065 |
| `/checkout`                 | [checkout-screen.tsx](../src/features/checkout/components/checkout-screen.tsx)               | UAT-014/020–024     |
| `/payment`                  | [payment-screen.tsx](../src/features/checkout/components/payment-screen.tsx)                 | UAT-023–025         |
| `/payment/success`          | [payment-success-screen.tsx](../src/features/checkout/components/payment-success-screen.tsx) | UAT-023/025/068     |
| `/request-quote`            | [request-quote-screen.tsx](../src/features/checkout/components/request-quote-screen.tsx)     | UAT-026/027/061     |
| `/request-quote/success`    | [quote-success-screen.tsx](../src/features/checkout/components/quote-success-screen.tsx)     | UAT-026/027/068     |
| `/contact-us`               | [contact-form.tsx](../src/features/contact/components/contact-form.tsx)                      | UAT-028–030         |
| `/signup`                   | [signup-form.tsx](../src/features/auth/components/signup-form.tsx)                           | UAT-031–033         |
| `/login`                    | [login-form.tsx](../src/features/auth/components/login-form.tsx)                             | UAT-034/035         |
| `/forgot-password`          | [forgot-password-form.tsx](../src/features/auth/components/forgot-password-form.tsx)         | UAT-033/036         |
| `/profile`                  | [profile-screen.tsx](../src/features/profile/components/profile-screen.tsx)                  | UAT-037–042         |
| `/dashboard`                | [dashboard-overview.tsx](../src/features/profile/components/dashboard-overview.tsx)          | UAT-063             |
| `/dashboard/profile`        | [page.tsx](../src/app/%5Blocale%5D/%28portal%29/dashboard/profile/page.tsx)                  | UAT-062/063         |
| `/orders`                   | [orders-screen.tsx](../src/features/orders/components/orders-screen.tsx)                     | UAT-043/045         |
| `/orders/[orderId]`         | [orders.service.ts](../src/features/orders/api/orders.service.ts)                            | UAT-044/045         |
| `/rfqs`                     | [rfqs-screen.tsx](../src/features/rfqs/components/rfqs-screen.tsx)                           | UAT-046/048         |
| `/rfqs/[rfqId]`             | [rfqs.service.ts](../src/features/rfqs/api/rfqs.service.ts)                                  | UAT-047/048         |
| `/news`                     | [news-feed.tsx](../src/features/news/components/news-feed.tsx)                               | UAT-049             |
| `/news/[slug]`              | [news-detail-screen.tsx](../src/features/news/components/news-detail-screen.tsx)             | UAT-050             |
| `/about-us`                 | [about-screen.tsx](../src/features/about/components/about-screen.tsx)                        | UAT-051             |
| `/terms-and-conditions`     | [legal.data.ts](../src/features/legal/legal.data.ts)                                         | UAT-051             |
| `/privacy`                  | [legal.data.ts](../src/features/legal/legal.data.ts)                                         | UAT-051             |
| `/security`                 | [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/security/page.tsx)                        | UAT-051             |

### Chi tiết truy vết cho từng case

Các liên kết sau trỏ tới implementation đang dùng để viết điều kiện/bước/expected. Schema, component và service được đối chiếu cùng nhau; tên test không được xem là bằng chứng tích hợp đã chạy.

- **UAT-001 — Nội dung trang chủ và banner:** [server.ts](../src/features/home/server.ts), [hero-section.tsx](../src/features/home/components/hero-section.tsx), [social-proof-section.tsx](../src/features/home/components/social-proof-section.tsx)
- **UAT-002 — Menu danh mục nhiều cấp:** [category-popover.tsx](../src/components/layout/category-popover.tsx), [server.ts](../src/features/categories/server.ts)
- **UAT-003 — Đổi EN/VI giữ trang và bộ lọc:** [routing.ts](../src/i18n/routing.ts), [language-switcher.tsx](../src/components/layout/language-switcher.tsx), [en.json](../messages/en.json), [vi.json](../messages/vi.json)
- **UAT-004 — Danh sách và card sản phẩm:** [catalog-workspace.tsx](../src/features/products/components/catalog-workspace.tsx), [product-card.tsx](../src/features/products/components/product-card.tsx), [product-display.ts](../src/features/products/utils/product-display.ts)
- **UAT-005 — Lọc nhiều brand và origin:** [catalog-workspace.tsx](../src/features/products/components/catalog-workspace.tsx), [product-catalog.schema.ts](../src/features/products/schemas/product-catalog.schema.ts), [server.ts](../src/features/products/server.ts)
- **UAT-006 — Tìm trong bộ lọc và xem thêm:** [catalog-filters.tsx](../src/features/products/components/catalog-filters.tsx), [catalog-origin-filter.tsx](../src/features/products/components/catalog-origin-filter.tsx)
- **UAT-007 — Sort và phân trang:** [catalog-workspace.tsx](../src/features/products/components/catalog-workspace.tsx), [product-pagination.tsx](../src/features/products/components/product-pagination.tsx)
- **UAT-008 — Category route và Clear filters:** [category-strip.tsx](../src/features/products/components/category-strip.tsx), [catalog-workspace.tsx](../src/features/products/components/catalog-workspace.tsx), [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/products/category/%5Bslug%5D/page.tsx)
- **UAT-009 — URL sai và bộ lọc không có kết quả:** [product-catalog.schema.ts](../src/features/products/schemas/product-catalog.schema.ts), [catalog-workspace.tsx](../src/features/products/components/catalog-workspace.tsx), [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/products/category/%5Bslug%5D/page.tsx)
- **UAT-010 — Thông tin, ảnh, tab và tài liệu:** [product-detail-screen.tsx](../src/features/products/components/product-detail-screen.tsx), [product-gallery.tsx](../src/features/products/components/product-gallery.tsx), [product-information.tsx](../src/features/products/components/product-information.tsx)
- **UAT-011 — Biến thể, giá khuyến mãi và số lượng:** [product-purchase-panel.tsx](../src/features/products/components/product-purchase-panel.tsx), [product-display.ts](../src/features/products/utils/product-display.ts)
- **UAT-012 — Ẩn giá, hết hàng và yêu cầu đặc biệt:** [product-purchase-panel.tsx](../src/features/products/components/product-purchase-panel.tsx), [product-display.ts](../src/features/products/utils/product-display.ts), [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/contact-us/page.tsx)
- **UAT-013 — Thêm giỏ từ PDP và card:** [product-purchase-panel.tsx](../src/features/products/components/product-purchase-panel.tsx), [product-card.tsx](../src/features/products/components/product-card.tsx), [cart.service.ts](../src/features/checkout/api/cart.service.ts), [map-public-product.ts](../src/features/products/utils/map-public-product.ts)
- **UAT-014 — Buy now chỉ chuyển các dòng đã chọn:** [product-purchase-panel.tsx](../src/features/products/components/product-purchase-panel.tsx), [checkout-screen.tsx](../src/features/checkout/components/checkout-screen.tsx), [cart-order-summary.tsx](../src/features/checkout/components/cart-order-summary.tsx)
- **UAT-015 — Sửa quantity khi blur hoặc Enter:** [cart-items-table.tsx](../src/features/checkout/components/cart-items-table.tsx), [cart.service.ts](../src/features/checkout/api/cart.service.ts)
- **UAT-016 — Đổi variant và xử lý lỗi cập nhật:** [cart-items-table.tsx](../src/features/checkout/components/cart-items-table.tsx), [cart-screen.tsx](../src/features/checkout/components/cart-screen.tsx), [use-update-cart-item-mutation.ts](../src/features/checkout/api/use-update-cart-item-mutation.ts)
- **UAT-017 — Chọn dòng và đối chiếu tổng tiền:** [checkout-data.ts](../src/features/checkout/data/checkout-data.ts), [cart-order-summary.tsx](../src/features/checkout/components/cart-order-summary.tsx)
- **UAT-018 — Xóa dòng và trạng thái rỗng:** [cart.service.ts](../src/features/checkout/api/cart.service.ts), [use-remove-cart-item-mutation.ts](../src/features/checkout/api/use-remove-cart-item-mutation.ts), [empty-cart-screen.tsx](../src/features/checkout/components/empty-cart-screen.tsx)
- **UAT-019 — Giỏ mini, badge và shortcut:** [cart-header-popover.tsx](../src/features/checkout/components/cart-header-popover.tsx), [compact-cart-link.tsx](../src/features/checkout/components/compact-cart-link.tsx)
- **UAT-020 — Điền sẵn từ profile và giữ dữ liệu đã sửa:** [checkout-screen.tsx](../src/features/checkout/components/checkout-screen.tsx)
- **UAT-021 — Validation địa chỉ và billing khác delivery:** [checkout.schema.ts](../src/features/checkout/schemas/checkout.schema.ts), [billing-section.tsx](../src/features/checkout/components/billing-section.tsx)
- **UAT-022 — Country picker và mã điện thoại:** [country-select.tsx](../src/components/shared/country-select.tsx), [country-options.ts](../src/constants/country-options.ts), [address-fields.tsx](../src/features/checkout/components/address-fields.tsx), [contact-info-fields.tsx](../src/features/contact/components/contact-info-fields.tsx), [quote-contact-form.tsx](../src/features/checkout/components/quote-contact-form.tsx)
- **UAT-023 — Demo PayNow và chặn bấm lặp lúc pending:** [checkout.service.ts](../src/features/checkout/api/checkout.service.ts), [checkout-screen.tsx](../src/features/checkout/components/checkout-screen.tsx), [payment-screen.tsx](../src/features/checkout/components/payment-screen.tsx)
- **UAT-024 — Nhánh Bank transfer và quay lại checkout:** [payment-method-section.tsx](../src/features/checkout/components/payment-method-section.tsx), [payment-screen.tsx](../src/features/checkout/components/payment-screen.tsx)
- **UAT-025 — Tham số payment và tính xác thực màn success:** [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/payment/page.tsx), [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/payment/success/page.tsx), [order.schema.ts](../src/features/orders/schemas/order.schema.ts)
- **UAT-026 — Gửi báo giá cho dòng được chọn:** [request-quote-screen.tsx](../src/features/checkout/components/request-quote-screen.tsx), [quote.service.ts](../src/features/checkout/api/quote.service.ts), [quote-contact-form.tsx](../src/features/checkout/components/quote-contact-form.tsx)
- **UAT-027 — Validation và bỏ chọn hết sản phẩm:** [request-quote-screen.tsx](../src/features/checkout/components/request-quote-screen.tsx), [quote.schema.ts](../src/features/checkout/schemas/quote.schema.ts), [quote-success-screen.tsx](../src/features/checkout/components/quote-success-screen.tsx)
- **UAT-028 — General inquiry:** [contact-form.tsx](../src/features/contact/components/contact-form.tsx), [contact.schema.ts](../src/features/contact/schemas/contact.schema.ts), [contact.service.ts](../src/features/contact/api/contact.service.ts)
- **UAT-029 — Request a quote nhập sản phẩm thủ công:** [quote-products-table.tsx](../src/features/contact/components/quote-products-table.tsx), [contact.service.ts](../src/features/contact/api/contact.service.ts)
- **UAT-030 — Validation khác nhau giữa inquiry và quote:** [contact.schema.ts](../src/features/contact/schemas/contact.schema.ts), [contact-form.tsx](../src/features/contact/components/contact-form.tsx)
- **UAT-031 — Đăng ký ba bước và đăng nhập sau tạo:** [signup-form.tsx](../src/features/auth/components/signup-form.tsx), [auth.service.ts](../src/features/auth/api/auth.service.ts)
- **UAT-032 — Validation form đăng ký và email trùng:** [signup.schema.ts](../src/features/auth/schemas/signup.schema.ts), [signup-account-form.tsx](../src/features/auth/components/signup-account-form.tsx)
- **UAT-033 — OTP sai, hết hạn, gửi lại và bàn phím:** [signup-verification-form.tsx](../src/features/auth/components/signup-verification-form.tsx), [forgot-password-form.tsx](../src/features/auth/components/forgot-password-form.tsx)
- **UAT-034 — Đăng nhập đúng và khôi phục sau refresh:** [login-form.tsx](../src/features/auth/components/login-form.tsx), [use-login-mutation.ts](../src/features/auth/api/use-login-mutation.ts), [auth-token-store.ts](../src/lib/auth-token-store.ts)
- **UAT-035 — Dữ liệu sai và lỗi API đăng nhập:** [login.schema.ts](../src/features/auth/schemas/login.schema.ts), [login-form.tsx](../src/features/auth/components/login-form.tsx), [api-error.ts](../src/lib/api-error.ts)
- **UAT-036 — Reset mật khẩu qua OTP:** [forgot-password-form.tsx](../src/features/auth/components/forgot-password-form.tsx), [forgot-password-reset-form.tsx](../src/features/auth/components/forgot-password-reset-form.tsx), [auth.service.ts](../src/features/auth/api/auth.service.ts)
- **UAT-037 — Xem, sửa và lưu hồ sơ:** [profile-form.tsx](../src/features/profile/components/profile-form.tsx), [profile.service.ts](../src/features/profile/api/profile.service.ts), [profile-screen.tsx](../src/features/profile/components/profile-screen.tsx)
- **UAT-038 — Hủy sửa và validation hồ sơ:** [profile-form.schema.ts](../src/features/profile/schemas/profile-form.schema.ts), [profile-form.tsx](../src/features/profile/components/profile-form.tsx)
- **UAT-039 — Avatar hợp lệ, Cancel và tải lại:** [profile-avatar-dialog.tsx](../src/features/profile/components/profile-avatar-dialog.tsx), [profile.service.ts](../src/features/profile/api/profile.service.ts)
- **UAT-040 — Avatar sai loại/dung lượng và lỗi lưu:** [profile-avatar-dialog.tsx](../src/features/profile/components/profile-avatar-dialog.tsx), [profile.service.ts](../src/features/profile/api/profile.service.ts)
- **UAT-041 — Đổi password và kiểm chứng đăng nhập:** [profile-security-card.tsx](../src/features/profile/components/profile-security-card.tsx), [profile.service.ts](../src/features/profile/api/profile.service.ts)
- **UAT-042 — Profile lỗi, retry và tài khoản chưa đầy đủ:** [account-error-state.tsx](../src/features/profile/components/account-error-state.tsx), [profile.service.ts](../src/features/profile/api/profile.service.ts), [profile-response.schema.ts](../src/features/profile/schemas/profile-response.schema.ts)
- **UAT-043 — Danh sách và phân trang đơn hàng:** [orders-screen.tsx](../src/features/orders/components/orders-screen.tsx), [orders-table.tsx](../src/features/orders/components/orders-table.tsx), [orders.service.ts](../src/features/orders/api/orders.service.ts)
- **UAT-044 — Chi tiết order và invoice:** [order-detail-screen.tsx](../src/features/orders/components/order-detail-screen.tsx), [order-items-card.tsx](../src/features/orders/components/order-items-card.tsx), [order-information-cards.tsx](../src/features/orders/components/order-information-cards.tsx)
- **UAT-045 — Order rỗng, không tồn tại, sai quyền và lỗi:** [orders.service.ts](../src/features/orders/api/orders.service.ts), [order.schema.ts](../src/features/orders/schemas/order.schema.ts), [order-detail-screen.tsx](../src/features/orders/components/order-detail-screen.tsx)
- **UAT-046 — Danh sách RFQ và phân trang:** [rfqs-screen.tsx](../src/features/rfqs/components/rfqs-screen.tsx), [rfqs-table.tsx](../src/features/rfqs/components/rfqs-table.tsx), [rfqs.service.ts](../src/features/rfqs/api/rfqs.service.ts)
- **UAT-047 — Chi tiết RFQ, items và remarks:** [rfq-detail-screen.tsx](../src/features/rfqs/components/rfq-detail-screen.tsx), [rfq-items-card.tsx](../src/features/rfqs/components/rfq-items-card.tsx)
- **UAT-048 — RFQ rỗng, không tồn tại và sai quyền:** [rfqs.service.ts](../src/features/rfqs/api/rfqs.service.ts), [rfq-detail-screen.tsx](../src/features/rfqs/components/rfq-detail-screen.tsx)
- **UAT-049 — News lọc, sort và phân trang:** [news-list-screen.tsx](../src/features/news/components/news-list-screen.tsx), [news-feed.tsx](../src/features/news/components/news-feed.tsx), [news-data.ts](../src/features/news/data/news-data.ts)
- **UAT-050 — News detail và Copy link:** [copy-link-button.tsx](../src/features/news/components/copy-link-button.tsx), [news-detail-screen.tsx](../src/features/news/components/news-detail-screen.tsx), [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/news/%5Bslug%5D/page.tsx)
- **UAT-051 — About, Terms, Privacy và Security:** [about.data.ts](../src/features/about/about.data.ts), [legal.data.ts](../src/features/legal/legal.data.ts), [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/security/page.tsx)
- **UAT-052 — Kiểm tra action chưa nối chức năng:** [main-header.tsx](../src/components/layout/main-header.tsx), [site-footer.tsx](../src/components/shared/site-footer.tsx), [categories-section.tsx](../src/features/home/components/categories-section.tsx)
- **UAT-053 — Autoplay, vuốt, navigation và pause dễ tiếp cận:** [product-carousel.tsx](../src/features/products/components/product-carousel.tsx), [category-strip.tsx](../src/features/products/components/category-strip.tsx), [testimonial-carousel.tsx](../src/features/home/components/testimonial-carousel.tsx), [swiper-navigation.tsx](../src/components/ui/swiper-navigation.tsx), [product-gallery.tsx](../src/features/products/components/product-gallery.tsx)
- **UAT-054 — Research Leaders mobile và breakpoint:** [research-leaders-carousel.tsx](../src/features/home/components/research-leaders-carousel.tsx), [research-leaders.ts](../src/features/home/research-leaders.ts)
- **UAT-055 — Hành trình chính trên mobile:** [main-header.tsx](../src/components/layout/main-header.tsx), [cart-items-table.tsx](../src/features/checkout/components/cart-items-table.tsx), [orders-table.tsx](../src/features/orders/components/orders-table.tsx), [rfqs-table.tsx](../src/features/rfqs/components/rfqs-table.tsx)
- **UAT-056 — Keyboard, focus và thông báo form:** [form.tsx](../src/components/ui/form.tsx), [dialog.tsx](../src/components/ui/dialog.tsx), [country-select.tsx](../src/components/shared/country-select.tsx), [product-information.tsx](../src/features/products/components/product-information.tsx)
- **UAT-057 — Logout và đổi A sang B:** [use-logout-mutation.ts](../src/features/auth/api/use-logout-mutation.ts), [app-providers.tsx](../src/providers/app-providers.tsx), [auth-token-store.ts](../src/lib/auth-token-store.ts)
- **UAT-058 — Access token hết hạn và refresh thất bại:** [http-client.ts](../src/lib/http-client.ts), [server-api-request.ts](../src/lib/server-api-request.ts), [app-providers.tsx](../src/providers/app-providers.tsx)
- **UAT-059 — Truy cập private route khi chưa đăng nhập:** [middleware.ts](../src/middleware.ts), [layout.tsx](../src/app/%5Blocale%5D/%28marketing%29/layout.tsx), [account-error-state.tsx](../src/features/profile/components/account-error-state.tsx), [cart.service.ts](../src/features/checkout/api/cart.service.ts)
- **UAT-060 — Homepage và catalog lỗi từng phần:** [server.ts](../src/features/home/server.ts), [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/products/page.tsx), [catalog-workspace.tsx](../src/features/products/components/catalog-workspace.tsx)
- **UAT-061 — Cart đọc/sửa/xóa lỗi và phục hồi:** [cart-screen.tsx](../src/features/checkout/components/cart-screen.tsx), [request-quote-screen.tsx](../src/features/checkout/components/request-quote-screen.tsx), [cart-header-popover.tsx](../src/features/checkout/components/cart-header-popover.tsx)
- **UAT-062 — Redirect và 404 giữ locale:** [page.tsx](../src/app/%5Blocale%5D/%28portal%29/dashboard/profile/page.tsx), [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/payment/page.tsx), [not-found.tsx](../src/app/not-found.tsx), [layout.tsx](../src/app/layout.tsx)
- **UAT-063 — Dashboard tổng quan tài khoản:** [dashboard-overview.tsx](../src/features/profile/components/dashboard-overview.tsx), [profile.service.ts](../src/features/profile/api/profile.service.ts), [layout.tsx](../src/app/%5Blocale%5D/%28portal%29/dashboard/layout.tsx)
- **UAT-064 — Metadata, sitemap và trang riêng không index:** [site.ts](../src/config/site.ts), [sitemap.ts](../src/app/sitemap.ts), [robots.ts](../src/app/robots.ts), [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/products/%5Bslug%5D/page.tsx)
- **UAT-065 — Giỏ nhiều currency và dữ liệu item bất thường:** [checkout-data.ts](../src/features/checkout/data/checkout-data.ts), [cart-order-summary.tsx](../src/features/checkout/components/cart-order-summary.tsx), [cart-items-table.tsx](../src/features/checkout/components/cart-items-table.tsx)
- **UAT-066 — Tài khoản bắt buộc đổi mật khẩu:** [login-form.tsx](../src/features/auth/components/login-form.tsx), [auth-session.schema.ts](../src/features/auth/schemas/auth-session.schema.ts), [auth-token-store.ts](../src/lib/auth-token-store.ts)
- **UAT-067 — Thiếu nội dung tùy chọn và slug không tồn tại:** [product-display.ts](../src/features/products/utils/product-display.ts), [product-information.tsx](../src/features/products/components/product-information.tsx), [page.tsx](../src/app/%5Blocale%5D/%28marketing%29/products/%5Bslug%5D/page.tsx)
- **UAT-068 — Order/RFQ mới phải truy xuất được sau gửi:** [checkout.service.ts](../src/features/checkout/api/checkout.service.ts), [quote.service.ts](../src/features/checkout/api/quote.service.ts), [contact.service.ts](../src/features/contact/api/contact.service.ts)
