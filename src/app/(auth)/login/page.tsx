import type { Metadata } from "next";
import { LoginForm } from "@/features/auth";
import { AuthShell } from "@/features/auth/components/auth-shell";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in securely to Labdock.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthShell>
      <div className="pt-4 sm:pt-8">
        <h2 className="text-[32px] font-semibold leading-[43px] text-[var(--auth-ink)]">Log in</h2>
        <p className="mt-2 text-base leading-6 text-[var(--auth-muted)]">Welcome back! Please enter your details.</p>
      </div>
      <div className="pt-6 sm:pt-8">
        <LoginForm />
      </div>
    </AuthShell>
  );
}
