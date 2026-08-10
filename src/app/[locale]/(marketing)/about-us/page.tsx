import type { Metadata } from "next";

import { AboutScreen } from "@/features/about";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const description =
    "Learn how Labdock simplifies scientific procurement for research institutions with verified suppliers, laboratory products and professional support.";

  return {
    title: "About us",
    description: "Simplifying scientific procurement and enhancing research efficiency across Southeast Asia.",
    alternates: getLocalizedAlternates("/about-us", locale),
    openGraph: {
      title: "About Labdock",
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
