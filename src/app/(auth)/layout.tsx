import type { ReactNode } from "react";

import { MainHeader } from "@/components/layout/main-header";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[var(--auth-background)]">
      <MainHeader />
      {children}
    </div>
  );
}
