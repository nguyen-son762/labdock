import type { ReactNode } from "react";

import { getPublicCategories } from "@/features/categories/server";
import { AppProviders } from "@/providers/app-providers";

import { AuthHeader } from "./auth-header";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const categoriesResult = await getPublicCategories()
    .then((categories) => ({ categories, hasError: false }))
    .catch(() => ({ categories: [], hasError: true }));

  return (
    <AppProviders>
      <div className="min-h-dvh bg-[var(--auth-background)]">
        <AuthHeader categories={categoriesResult.categories} categoriesError={categoriesResult.hasError} />
        {children}
      </div>
    </AppProviders>
  );
}
