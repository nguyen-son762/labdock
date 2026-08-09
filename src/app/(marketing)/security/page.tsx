import type { Metadata } from "next";
import { Key, SecuritySafe, ShieldTick } from "iconsax-reactjs";

export const metadata: Metadata = {
  title: "Bảo mật",
  description: "Cách Labdock Portal bảo vệ phiên và dữ liệu người dùng.",
};

const protections = [
  {
    title: "Cookie session",
    description: "Client không lưu access Token trong localStorage; backend chịu trách nhiệm phát hành Cookie an toàn.",
    icon: SecuritySafe,
  },
  {
    title: "Quyền phía Server",
    description: "UI không được xem là lớp Authorization. Mọi API riêng tư phải xác minh user và quyền phía backend.",
    icon: Key,
  },
  {
    title: "Cách ly Cache",
    description: "React Query Cache riêng tư được xóa khi đăng nhập hoặc đăng xuất để tránh dữ liệu vượt phiên.",
    icon: ShieldTick,
  },
] as const;

export default function SecurityPage() {
  return (
    <main className="container py-16 lg:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-primary">Phòng thủ nhiều lớp</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Bảo mật theo thiết kế</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Portal giảm bề mặt tấn công bằng ranh giới dữ liệu rõ ràng và session do backend kiểm soát.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {protections.map(({ title, description, icon: Icon }) => (
          <section key={title} className="rounded-xl border bg-card p-6">
            <Icon className="size-6 text-primary" aria-hidden="true" />
            <h2 className="mt-5 font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
