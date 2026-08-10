import type { Metadata } from "next";

import { LegalDocumentScreen, termsDocument } from "@/features/legal";
import { getLocalizedAlternates, isAppLocale } from "@/i18n/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};

  return {
    title: "Terms and Conditions",
    description: "Read the terms governing accounts, purchases, payments, delivery and use of the Labdock marketplace.",
    alternates: getLocalizedAlternates("/terms-and-conditions", locale),
  };
}

export default function TermsAndConditionsPage() {
  return <LegalDocumentScreen document={termsDocument} />;
}
