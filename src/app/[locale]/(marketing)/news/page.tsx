import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { NewsListScreen } from "@/features/news";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations("RouteMetadata");
  const description = t("newsDescription");

  return {
    title: t("news"),
    description,
    alternates: getLocalizedAlternates("/news", locale),
    openGraph: {
      title: t("news"),
      description,
      url: getLocalizedPath("/news", locale),
      locale: locale === "vi" ? "vi_VN" : "en_SG",
      images: [{ url: "/news/news-header.png", alt: "Labdock news and scientific events" }],
    },
  };
}

export default function NewsPage() {
  return <NewsListScreen />;
}
