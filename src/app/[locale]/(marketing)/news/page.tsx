import type { Metadata } from "next";

import { NewsListScreen } from "@/features/news";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const description =
    "Stay informed with the latest research breakthroughs, industry news, laboratory best practices and scientific events.";

  return {
    title: "News",
    description:
      "Stay informed with the latest research breakthroughs, industry news, laboratory best practices and scientific events.",
    alternates: getLocalizedAlternates("/news", locale),
    openGraph: {
      title: "News",
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
