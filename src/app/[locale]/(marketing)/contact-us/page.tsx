import type { Metadata } from "next";

import { ContactScreen, type InquiryType } from "@/features/contact";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

type ContactUsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
};

export async function generateMetadata({ params }: ContactUsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const description =
    "Contact Labdock for product inquiries, technical support and custom laboratory equipment quotations.";

  return {
    title: "Contact us",
    description,
    alternates: getLocalizedAlternates("/contact-us", locale),
    openGraph: {
      title: "Contact us | Labdock",
      description,
      url: getLocalizedPath("/contact-us", locale),
      locale: locale === "vi" ? "vi_VN" : "en_SG",
    },
  };
}

export default async function ContactUsPage({ searchParams }: ContactUsPageProps) {
  const { type } = await searchParams;
  const initialType: InquiryType = type === "quote" ? "quote" : "general";

  return <ContactScreen initialType={initialType} />;
}
