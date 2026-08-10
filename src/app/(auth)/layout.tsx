import type { ReactNode } from "react";

import { AppProviders } from "@/providers/app-providers";

import { AuthHeader } from "./auth-header";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AppProviders>
      <div className="min-h-dvh bg-[var(--auth-background)]">
        <AuthHeader />
        {children}
      </div>
    </AppProviders>
  );
}
