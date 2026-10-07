import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { SignupForm } from "@/features/auth/components/signup-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RouteMetadata");
  return { title: t("signUp"), description: t("signUpDescription"), robots: { index: false, follow: false } };
}

export default async function SignupPage() {
  const t = await getTranslations("Auth");
  return (
    <AuthShell heroTitle={t("heroTitle")}>
      <SignupForm />
    </AuthShell>
  );
}
