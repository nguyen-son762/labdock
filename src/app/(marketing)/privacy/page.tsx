import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quyền riêng tư",
  description: "Nguyên tắc bảo vệ dữ liệu tại Labdock Portal.",
};

export default function PrivacyPage() {
  return (
    <article className="container max-w-3xl py-16 lg:py-20">
      <p className="text-sm font-semibold text-primary">Niềm tin và minh bạch</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Quyền riêng tư</h1>
      <div className="mt-8 space-y-6 leading-7 text-muted-foreground">
        <p>
          Labdock Portal chỉ xử lý dữ liệu cần thiết để cung cấp tài khoản, duy trì phiên đăng nhập và vận hành các chức
          năng bạn sử dụng.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Dữ liệu tài khoản</h2>
        <p>
          Thông tin hồ sơ được truyền qua kết nối bảo mật và chỉ hiển thị sau khi backend xác thực quyền truy cập. Dữ
          liệu riêng tư không được đưa vào public Cache.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Quyền kiểm soát</h2>
        <p>Bạn có thể cập nhật hồ sơ trong Portal hoặc liên hệ quản trị viên để yêu cầu hỗ trợ về dữ liệu tài khoản.</p>
      </div>
    </article>
  );
}
