import type { ReactNode } from "react";

import { SiteFooter } from "@/components/shared/site-footer";
import { MainHeader } from "@/components/layout/main-header";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <MainHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
