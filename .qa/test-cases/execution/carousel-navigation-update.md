# Ẩn điều hướng carousel khi desktop hiển thị đủ slide — 18/10/2026

Desktop từ 1024px: dùng trạng thái `isLocked` của Swiper (`watchOverflow`) để ẩn toàn bộ thanh điều hướng nếu tất cả slide đã nằm trong khung. Khi còn overflow, thanh điều hướng vẫn hiển thị. Cập nhật theo init, lock/unlock và resize. Mobile giữ cách điều hướng hiện tại; autoplay giữ nguyên.

Đã áp dụng cho `SwiperNavigation` và các consumer ProductCarousel, CategoryStrip, EditorialSection, ServiceGuarantees; testimonial có thanh điều hướng riêng cũng cập nhật theo overflow. Research Leaders tiếp tục dùng grid ở desktop và ẩn điều hướng theo layout hiện có.

Kiểm chứng:

- 5 test liên quan trong 4 file Pass.
- TypeScript, ESLint, Prettier cho các file thay đổi và `git diff --check` Pass.
- Production build QA trong `/tmp/labdock-qa-app` Pass.
- [9 kiểm tra Chromium](carousel-navigation-results.json) Pass: 6/1/0 sản phẩm, desktop đủ/chưa đủ, next, autoplay, resize hai chiều, toàn bộ carousel trang chủ, testimonial và category strip. Viewport: 390, 1023, 1024, 1280, 1440px. Không có uncaught browser error.

Trình duyệt dùng API giả lập. Route fixture chứa 6/1/0 sản phẩm chỉ tạo trong bản sao `/tmp/labdock-qa-app`, không thêm vào source ứng dụng. Không chạy lại toàn bộ 390 test case nghiệp vụ hoặc toàn bộ Vitest trong đợt sửa UI này.
