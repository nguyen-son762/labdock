import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Key, SecuritySafe, ShieldTick } from "iconsax-reactjs";

import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations("Security");
  const description = t("description");

  return {
    title: t("title"),
    description,
    alternates: getLocalizedAlternates("/security", locale),
    openGraph: {
      title: `${t("title")} | Labdock`,
      description,
      url: getLocalizedPath("/security", locale),
      locale: locale === "vi" ? "vi_VN" : "en_SG",
    },
  };
}

const protections = [
  {
    titleKey: "cookieTitle",
    descriptionKey: "cookieDescription",
    icon: SecuritySafe,
  },
  {
    titleKey: "authorizationTitle",
    descriptionKey: "authorizationDescription",
    icon: Key,
  },
  {
    titleKey: "cacheTitle",
    descriptionKey: "cacheDescription",
    icon: ShieldTick,
  },
] as const;

export default async function SecurityPage() {
  const t = await getTranslations("Security");
  return (
    <main className="container py-16 lg:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-primary">{t("defence")}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{t("intro")}</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {protections.map(({ titleKey, descriptionKey, icon: Icon }) => (
          <section key={titleKey} className="rounded-xl border bg-card p-6">
            <Icon className="size-6 text-primary" aria-hidden="true" />
            <h2 className="mt-5 font-semibold">{t(titleKey)}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(descriptionKey)}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
