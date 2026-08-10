import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { siteConfig } from "@/config/site";
import { HomeScreen } from "@/features/home";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

type HomePageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: getLocalizedAlternates("/", locale),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: getLocalizedPath("/", locale),
      locale: locale === "vi" ? "vi_VN" : "en_SG",
      images: [{ url: "/home/hero-bg.png", alt: t("homeTitle") }],
    },
  };
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/auth/labdock-wordmark.svg`,
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (isAppLocale(locale)) setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replaceAll("<", "\\u003c") }}
      />
      <HomeScreen />
    </>
  );
}
