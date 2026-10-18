# Cập nhật carousel autoplay — 18/10/2026

Yêu cầu mới của người dùng: mọi carousel luôn bật autoplay và bỏ `CarouselPlaybackButton`; giữ next/back và swipe. Yêu cầu này thay thế kỳ vọng pause/resume trong UI-016, UI-017 và phần pause của UI-018 ở bộ test/Excel đã bàn giao trước đó. Các báo cáo và workbook trước đó là bằng chứng lịch sử, không được ghi đè bằng kết quả của đợt này.

Đã xóa playback component, các chỗ render và bản dịch không còn dùng. Các carousel nội dung tự chuyển mỗi 5000ms, tiếp tục sau tương tác và không dừng vì hover/focus. Hook `useCarouselAutoplay` giữ xử lý overflow và breakpoint: grid Research Leaders từ 640px không chạy timer; trở lại mobile tự chạy lại; không chạy timer khi toàn bộ slide đã nằm trong viewport. Thumbnail gallery vẫn là bộ chọn ảnh thủ công và đồng bộ với ảnh chính tự chạy.

Kiểm chứng sau thay đổi:

- Vitest: **78 file, 377 test Pass**.
- TypeScript, ESLint, Prettier cho file thay đổi và `git diff --check`: Pass.
- Production build trong `/tmp/labdock-qa-app`, dùng API giả lập localhost: Pass.
- Chromium: **17/17 kiểm tra Pass**, không có runtime error hoặc hydration warning. Xem [kết quả trình duyệt](carousel-autoplay-results.json).
- Đã kiểm tra thực tế autoplay advance, keyboard next/back, swipe, gallery thumbnail + hover/focus, grid 3/6 cột, autoplay trở lại khi chuyển về mobile, reduced motion và single-slide/all-fit.

Đây là kiểm chứng frontend với fixture API, không xác nhận backend/thanh toán/OTP thật. Số liệu thực thi 390 ca trước đó không được tính lại từ đợt regression này.

Lệnh build đầu tiên chạy nhầm checkout chính và được dừng. Next dev đã được nạp lại qua thay đổi mtime của cấu hình (nội dung không đổi); localhost:3000 đã trả HTTP 200 sau khôi phục. Build QA tiếp theo chạy riêng trong thư mục `/tmp/labdock-qa-app`.
