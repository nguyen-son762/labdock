import type { ReactNode } from "react";

import { SiteFooter } from "@/components/shared/site-footer";
import { AppProviders } from "@/providers/app-providers";

import { MarketingHeader } from "./marketing-header";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <AppProviders>
      <div className="flex min-h-dvh flex-col">
        <MarketingHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </AppProviders>
  );
}
