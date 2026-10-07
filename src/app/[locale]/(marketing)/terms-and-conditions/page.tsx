import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LegalDocumentScreen, termsDocument } from "@/features/legal";
import { getLocalizedAlternates, isAppLocale } from "@/i18n/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations("RouteMetadata");

  return {
    title: t("terms"),
    description: t("termsDescription"),
    alternates: getLocalizedAlternates("/terms-and-conditions", locale),
  };
}

export default function TermsAndConditionsPage() {
  return <LegalDocumentScreen document={termsDocument} />;
}
