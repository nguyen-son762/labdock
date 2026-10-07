import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RouteMetadata");
  return { title: t("forgotPassword"), description: t("forgotPasswordDescription"), robots: { index: false, follow: false } };
}

export default function ForgotPasswordPage() {
  return (
    <AuthShell heroTitle="">
      <ForgotPasswordForm />
    </AuthShell>
  );
}
