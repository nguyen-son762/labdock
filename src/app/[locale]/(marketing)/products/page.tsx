import type { Metadata } from "next";

import { ProductListScreen } from "@/features/products";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const description =
    "Browse verified laboratory equipment, glassware and research supplies with fast delivery and bulk pricing.";

  return {
    title: "Laboratory Products",
    description:
      "Browse verified laboratory equipment, glassware and research supplies with fast delivery and bulk pricing.",
    alternates: getLocalizedAlternates("/products", locale),
    openGraph: {
      title: "Laboratory Products",
      description,
      url: getLocalizedPath("/products", locale),
      locale: locale === "vi" ? "vi_VN" : "en_SG",
    },
  };
}

export default function ProductsPage() {
  return <ProductListScreen />;
}
