import type { ReactNode } from "react";
import { connection } from "next/server";

import { getPublicCategories } from "@/features/categories/server";

import { AuthHeader } from "./auth-header";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  await connection();
  const categoriesResult = await getPublicCategories()
    .then((categories) => ({ categories, hasError: false }))
    .catch(() => ({ categories: [], hasError: true }));

  return (
    <div className="min-h-dvh bg-[var(--auth-background)]">
      <AuthHeader categories={categoriesResult.categories} categoriesError={categoriesResult.hasError} />
      {children}
    </div>
  );
}
