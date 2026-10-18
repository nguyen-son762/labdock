# Baseline đã thực thi

[Chỉ mục](README.md)

Ngày chạy:18/10/2026. Source commit `ce1122b16b3b03c7d2be1548f8c141a995c8e490`. Chạy trên local workspace, không phải browser UAT.

| Lệnh                                                                         | Kết quả thực tế                                                                                     |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `npm run typecheck -- --incremental false`                                   | Pass, exit0.                                                                                        |
| `npm run lint`                                                               | Exit0; không error,2warning Edit2 không dùng ở profile-info-panel.tsx và profile-security-card.tsx. |
| `npm test -- --reporter=json --outputFile=/tmp/labdock-qa-vitest-final.json` | Fail, 204/212 test pass, 8 fail; 6/66 file có lỗi.                                                  |

Lần test đầu trước khi workspace hoàn tất refactor ghi202/210 pass,8fail trong7/65file. Sau khi có address-fields.test.tsx và commit refactor mới, chạy lại để đồng bộ snapshot. Kết quả cuối trong bảng là chuẩn báo cáo lần này. Không sửa test hay product để làm baseline xanh.

Test failure không tự động là product bug. Có lỗi provider/mocks/fixture; cần reproduce UI/API trước khi kết luận. Không chạy build vì task chỉ thêm tài liệu; build production còn cần site URL hợp lệ và network/API phù hợp. Không có test:e2e script; chưa chạy E2E, kiểm thử browser, security scan, coverage hay đo performance.

## File thất bại

### src/features/about/components/about-screen.test.tsx

AboutScreen renders the About content, partner grid and product call to action — Error: Failed to call `useTranslations` because the context from `NextIntlClientProvider` was not found.

### src/features/auth/components/forgot-password-form.test.tsx

ForgotPasswordForm completes the email, OTP verification and new password flow — Error: Unable to find role="heading" and name "Set a new password"

### src/features/checkout/components/cart-header-popover.test.tsx

CartHeaderPopover removes products through the shared cart service — Error: Unable to find role="button" and name "Cart with 1 products"

### src/features/checkout/components/request-quote-screen.test.tsx

RequestQuoteScreen submits selected products once and opens the success screen — TestingLibraryElementError: Unable to find an accessible element with the role "textbox" and name "Phone number"

### src/features/orders/components/orders-table.test.tsx

OrdersTable shows the order data and exposes a detail link — Error: Failed to call `useTranslations` because the context from `NextIntlClientProvider` was not found.
OrdersTable requests the next page when more orders are available — Error: Failed to call `useTranslations` because the context from `NextIntlClientProvider` was not found.

### src/features/rfqs/components/rfqs-table.test.tsx

RfqsTable shows API RFQ data and links to detail by id — Error: Failed to call `useTranslations` because the context from `NextIntlClientProvider` was not found.
RfqsTable requests the next page when more RFQs are available — Error: Failed to call `useTranslations` because the context from `NextIntlClientProvider` was not found.

## Bằng chứng và giới hạn

Bộ tài liệu đã được kiểm tra 390 ID duy nhất và đồng nhất giữa Excel/Markdown, liên kết source tồn tại, hash snapshot không đổi, đủ 22 sheet, bộ lọc/dropdown trạng thái và freeze panes. Công thức tổng hợp đã được thử đổi một ca sang Pass rồi khôi phục Not run, không ghi nhận lỗi công thức. Đã render và xem 40 vùng trên 22 sheet để kiểm tra bố cục bằng Artifact Tool. Chưa mở bằng Microsoft Excel desktop.

Report JSON và log thô được lưu tạm trong /tmp trong phiên làm việc; dưới đây là bản tóm tắt đã loại output DOM dài. Không đưa log có thể chứa dữ liệu nhạy cảm vào repository. Sheet Baseline của Excel giữ kết quả từng file. 390 ca thiết kế mới vẫn Not run; không chuyển trạng thái theo kết quả test có sẵn cùng tên/module.
