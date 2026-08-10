import type { Metadata } from "next";

import { ContactScreen, type InquiryType } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact Labdock for product inquiries, technical support and custom laboratory equipment quotations.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact us | Labdock",
    description: "Contact Labdock for product inquiries, technical support and custom laboratory equipment quotations.",
    url: "/contact-us",
  },
};

export default async function ContactUsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const initialType: InquiryType = type === "quote" ? "quote" : "general";

  return <ContactScreen initialType={initialType} />;
}
