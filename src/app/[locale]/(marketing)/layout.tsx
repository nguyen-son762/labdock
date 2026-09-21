import type { ReactNode } from "react";

import { SiteFooter } from "@/components/shared/site-footer";
import { getPublicCategories } from "@/features/categories/server";
import { AppProviders } from "@/providers/app-providers";

import { MarketingHeader } from "./marketing-header";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const categoriesResult = await getPublicCategories()
    .then((categories) => ({ categories, hasError: false }))
    .catch(() => ({ categories: [], hasError: true }));

  return (
    <AppProviders>
      <div className="flex min-h-dvh flex-col">
        <MarketingHeader categories={categoriesResult.categories} categoriesError={categoriesResult.hasError} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </AppProviders>
  );
}
