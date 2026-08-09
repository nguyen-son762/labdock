import type { Metadata } from "next";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { AppProviders } from "@/providers/app-providers";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset your Labdock password.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell heroTitle="">
      <div className="pt-4 sm:pt-8">
        <h2 className="text-[32px] font-semibold leading-[43px] text-[var(--auth-ink)]">Forgot password</h2>
        <p className="mt-2 text-base leading-6 text-[var(--auth-muted)]">Please enter your email address</p>
      </div>
      <AppProviders>
        <ForgotPasswordForm />
      </AppProviders>
    </AuthShell>
  );
}
