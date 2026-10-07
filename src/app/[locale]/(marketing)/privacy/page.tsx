import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LegalDocumentScreen, privacyDocument } from "@/features/legal";
import { getLocalizedAlternates, isAppLocale } from "@/i18n/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations("RouteMetadata");

  return {
    title: t("privacy"),
    description: t("privacyDescription"),
    alternates: getLocalizedAlternates("/privacy", locale),
  };
}

export default function PrivacyPage() {
  return <LegalDocumentScreen document={privacyDocument} />;
}
