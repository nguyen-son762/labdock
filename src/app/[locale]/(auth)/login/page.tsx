import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/features/auth";
import { AuthShell } from "@/features/auth/components/auth-shell";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Auth");
  return { title: t("logIn"), description: t("loginDescription"), robots: { index: false, follow: false } };
}

export default async function LoginPage() {
  const t = await getTranslations("Auth");
  return (
    <AuthShell>
      <div className="pt-4 sm:pt-8">
        <h2 className="text-[32px] font-semibold leading-[43px] text-[var(--auth-ink)]">{t("logIn")}</h2>
        <p className="mt-2 text-base leading-6 text-[var(--auth-muted)]">{t("loginWelcome")}</p>
      </div>
      <div className="pt-6 sm:pt-8">
        <LoginForm />
      </div>
    </AuthShell>
  );
}
