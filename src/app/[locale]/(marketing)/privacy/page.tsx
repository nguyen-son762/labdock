import type { Metadata } from "next";

import { LegalDocumentScreen, privacyDocument } from "@/features/legal";
import { getLocalizedAlternates, isAppLocale } from "@/i18n/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};

  return {
    title: "Privacy Policy",
    description:
      "Learn how Labdock collects, uses, protects and retains personal data under applicable privacy laws, including Singapore's PDPA.",
    alternates: getLocalizedAlternates("/privacy", locale),
  };
}

export default function PrivacyPage() {
  return <LegalDocumentScreen document={privacyDocument} />;
}
