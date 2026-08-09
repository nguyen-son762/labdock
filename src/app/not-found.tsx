import Link from "next/link";

import { MainHeader } from "@/components/layout/main-header";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/features/auth/components/auth-shell";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-[var(--auth-background)]">
      <MainHeader />
      <AuthShell heroTitle="Your Trusted Partner for Laboratory Procurement">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-[64px] font-semibold leading-none text-[var(--brand-orange-end)]">404</p>
          <h1 className="mt-5 text-[32px] font-semibold leading-[43px] text-[var(--auth-ink)]">Page not found</h1>
          <p className="mt-2 max-w-md text-base leading-6 text-[var(--auth-muted)]">
            The page you are looking for doesn&apos;t exist or may have been moved.
          </p>
          <Button asChild variant="brand" size="auth" className="mt-6">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </AuthShell>
    </div>
  );
}
