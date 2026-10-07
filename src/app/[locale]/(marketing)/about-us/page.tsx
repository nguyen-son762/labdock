import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AboutScreen } from "@/features/about";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations("RouteMetadata");
  const description = t("aboutDescription");

  return {
    title: t("about"),
    description,
    alternates: getLocalizedAlternates("/about-us", locale),
    openGraph: {
      title: t("about"),
      description,
      url: getLocalizedPath("/about-us", locale),
      locale: locale === "vi" ? "vi_VN" : "en_SG",
      type: "website",
    },
  };
}

export default function AboutUsPage() {
  return <AboutScreen />;
}
