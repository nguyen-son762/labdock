# Dữ liệu kiểm thử

[Chỉ mục](README.md) · [Kế hoạch](test-plan.md)

Toàn bộ giá trị dưới đây là dữ liệu tổng hợp đề xuất, chưa được seed trong backend. Mọi giá trị đúng phải thỏa đầy đủ schema owner. Chỉ thay một biến trong test negative.

## DS-AUTH — A/B và tài khoản mới

A: qa.a@example.test; B: qa.b@example.test; password test Passw0rd!; NEW: company=QA Lab, fullName=QA Tester, phoneCode=+84, phone=0901234567, email=qa.new@example.test, country=VN, region=HCM, address=123 QA Street

**Cách dùng:** Chỉ fixture. E2E cần tài khoản/mailbox sandbox có thật do QA quản lý; example.test không nhận OTP. Không seed hay đăng ký tài khoản trong task này.

## DS-IDS — GUID fixture

P1=11111111-1111-4111-8111-111111111111; V1=22222222-2222-4222-8222-222222222222; I1=33333333-3333-4333-8333-333333333333; C1=44444444-4444-4444-8444-444444444444; B1=55555555-5555-4555-8555-555555555555; V2/I2/C2/B2 thay chữ số cuối bằng6; order GUID=77777777-7777-4777-8777-777777777777; RFQ GUID=88888888-8888-4888-8888-888888888888

**Cách dùng:** Identifier fixture phải thay bằng ID thật lấy từ API khi chạy E2E. OR-3000 là ID mock, không phải GUID cho orders API.

## DS-OTP — OTP và clock

Clock T=2026-10-18T02:00:00Z; challengeId GUID; expiresAt=T+61s; code đúng=012345, sai=999999; verified=true/false; resend đổi challengeId

**Cách dùng:** Dùng fake clock/controlled Promise trong test; giải phóng timer sau mỗi ca. OTP sandbox thật lấy qua kênh được cấp. Không ghi OTP/password vào evidence.

## DS-HOME — Aggregate homepage

banners Left/Right với sort đảo; topCategories2 item; newestProducts3 (1 outstanding), personalizedOffers2, testimonials2 rating3.5/5,1 avatar null; topBrands tùy ý

**Cách dùng:** Các mảng và field còn lại đúng homepage.schema. Trường hợp schema lỗi chỉ đổi một field để cô lập kết quả.

## DS-CATALOG — Cây và filters

Category3 cấp: C1->C2->C3; sibling khác; 7 brands B1..B7; 7 origins gồm SG,DE,New Zealand; 45 products total và pageSize20; count có0, thiếu, và dương

**Cách dùng:** Mỗi ID là GUID hợp lệ trong test; slug duy nhất. Chuẩn bị tập filter trả0 và>20 item. Có response count bổ sung cho category thiếu count.

## DS-PRODUCT — VISIBLE/HIDDEN/OUT

Product published slug=qa-flask; priceVisible=true; V1 active,unitPrice1250,rfqBasePrice1500,promotion25,currencySGD,stock10; V2 giá95 stock2; media3 ảnh; docs2; certificates2. HIDDEN đổi flag false hoặc unitPrice=null; OUT đổi stock0/inactive

**Cách dùng:** Bổ sung mọi field bắt buộc theo publicProductDetailSchema. Tách fixture test default cheapest khỏi fixture expected937.50 nếu V2 rẻ hơn đang active.

## DS-CART — Giỏ và phép tính độc lập

I1: quantity100,unitPrice35,lineTotal3500,stock200,SGD; I2: quantity1,unitPrice1000,originalPrice1200,lineTotal1000,stock5,SGD; product/variant/item IDs khác nhau; variants và selections đầy đủ

**Cách dùng:** Subtotal4500; discount hiển thị200; tax405; delivery0; total4905 theo code hiện tại9%. Cart API không trả originalPrice: chỉ thêm trong domain fixture kiểm tra helper/summary; không giả backend có field này. Thuế cần PO xác nhận.

## DS-CHECKOUT — Form checkout hợp lệ

fullName=QA Tester,email=qa.a@example.test,phone=+65 88009900,companyName=QA Lab,address=123 QA Street,postalCode=319455,country=SG,billingSameAsDelivery=true,billingAddress="",billingPostalCode="",paymentMethod=paynow

**Cách dùng:** Khi same=false: billingAddress=456 QA Street,billingPostalCode=319456. Dùng company optional rỗng để test.

## DS-QUOTE — Contact quote cart

fullName=QA Tester,phoneCountry=65,phone=88009900,email=qa.a@example.test,companyName=QA Lab,region=Singapore; itemIds=[I1,I2]; UUID idempotencyKey

**Cách dùng:** Trong form quote, phoneCountry là digits, region là name; không thay bằng ISO.

## DS-CONTACT — GENERAL/QUOTE

GENERAL: inquiryType=general,fullName=QA Tester,email=qa.a@example.test,phoneCountry=65,phone=88009900,company=QA Lab,subject=Question,message=QA test,products=[row rỗng]. QUOTE: inquiryType=quote; products=[{productName:QA Flask,brand:Medisafe,quantity:"1",budgetRange:"100-200 SGD"}]

**Cách dùng:** Giữ các field không đổi hợp lệ; quote có1..5 row. Khi gọi schema trực tiếp giữ đầy đủ các field required về kiểu dù UI không render.

## DS-PROFILE — Profile API và form

fullName=QA Tester,phoneNumber=+6588009900,email=qa.a@example.test,companyName=QA Lab,companyPhone="",businessRegistrationNumber="",deliveryAddress={address:123 QA Street,postalCode:319455,country:SG},sameAsDeliveryAddress=true,billingAddress tương tự,profilePictureUrl=null,passwordChangedAt=null,memberSince=2026-01-01T00:00:00Z

**Cách dùng:** CurrentUser.form dùng phone,deliveryAddress string,billingSameAsDelivery. Incomplete chỉ cho null các field schema cho phép; fullName/email/memberSince vẫn bắt buộc.

## DS-ORD — Order list/detail

21 records củaA; 1 củaB; pageSize10; statuses đủ ca; amount dương hoặc0 theo schema; invoice đầy đủ, lines2; createdAt ISO offset; shippingSnapshotJson JSON/text/empty

**Cách dùng:** Build từ order.schema.ts; test arithmetic so với API authoritative. Không tự sửa response để khớp tổng nếu backend fixture cố ý inconsistent.

## DS-RFQ — RFQ list/detail

21 records củaA;1 củaB; items2, quantity integer>0; notes/adminRemarks/supplierRemarks string/null/undefined; source và supplierId/userId GUID đúng

**Cách dùng:** Không suy ra chức năng accept/reject/update RFQ vì frontend chỉ có read.

## DS-NEWS — News fixtures

7 bài local hiện có; bổ sung list8+ bài để test nhiều trang hoặc category rỗng; publishedAt UTC gần nửa đêm; tất cả slug duy nhất

**Cách dùng:** Featured nằm ngoài feed. Dữ liệu static local không chứng minh CMS đang hoạt động.

## DS-FILES — File ảnh avatar

JPEG/PNG có nội dung hợp lệ sizes1024,1048576,1048577 bytes; GIF/SVG; PNG0byte; file text khai MIMEimage/png

**Cách dùng:** Tạo file tổng hợp, không dùng ảnh người thật. MIME giả và ảnh hỏng là test backend riêng; client accept không chứng minh file hợp lệ.

## DS-PAYMENT — URL và provider sandbox

reference=PAY-ABC12345,method=paynow/bank-transfer,amount=4905; mock success orderId=OR-3000; server-paid thật dùng order GUID được API cấp

**Cách dùng:** Không có tiền thật. Không tự coi QR static là beneficiary hợp lệ. API tạo/confirm chưa được repo cung cấp contract.

## DS-ERROR — Response điều khiển

400/401/403/404/409/422/429/500; timeout>15000ms bằng fake clock; disconnected; canceled; invalid JSON; missing field; HTTP200 malformed; response muộn

**Cách dùng:** Mock ngoài unit đang test, thay từng biến. Không auto retry mutation. Retry query tối đa3attempts theo provider mặc định, profile riêng không retry.

## DS-ENV — Browser và thông tin run

Front-end sandbox URL (chưa được cấp), API base thực tế, build/commit deploy,OS/browser version,locale,viewport,time,seed version,account alias,network mode

**Cách dùng:** Không đọc/copy .env.local, cookie, token hoặc password thật. Không giả APIbase là URLfrontend.

## DS-BOUNDARY — Quy ước literal và isolation

Trong ca boundary, string dàiN dùng literal được ghi trong case. Mật khẩu mới của AUTH.RESET là newPassword, của SIGNUP là password; confirm bằng đúng literal khi test positive. Ký tự0 đầu của phone/code/postal phải giữ

**Cách dùng:** Mỗi lần chỉ đổi1field, reset dữ liệu/network/clock/cache; kết quả accepted ở client không chứng minh backend cũng chấp nhận.

## Điền trước mỗi run

| Run ID    | Build / commit deploy | Frontend URL / API environment | Browser / OS  | Locale / viewport | Seed / account alias | Tester / thời gian |
| --------- | --------------------- | ------------------------------ | ------------- | ----------------- | -------------------- | ------------------ |
| Chưa chạy | Chưa cấp              | Chưa cấp                       | Chưa ghi nhận | en/vi theo ca     | Chưa seed            | Chưa ghi nhận      |

Giá trị Not run/Blocked phải giữ rõ lý do, không điền ngày giả hoặc ID thực tế chưa có.
