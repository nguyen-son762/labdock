import type { Metadata } from "next";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { SignupForm } from "@/features/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your Labdock account.",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <AuthShell heroTitle="Your Trusted Partner for Laboratory Procurement">
      <SignupForm />
    </AuthShell>
  );
}
