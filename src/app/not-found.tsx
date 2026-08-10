import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AuthShell } from "@/features/auth/components/auth-shell";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-[var(--auth-background)]">
      <header className="flex h-[110px] items-center bg-[#16518f] px-5 sm:px-10 xl:px-20">
        <Link
          href="/"
          aria-label="Labdock home"
          className="flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Image
            src="/auth/company-logo.png"
            alt=""
            width={56}
            height={50}
            className="h-[50px] w-[56px] object-cover object-bottom"
          />
          <Image src="/auth/labdock-wordmark.svg" alt="Labdock" width={121} height={30} />
        </Link>
      </header>
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
