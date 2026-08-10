import type { Metadata } from "next";

import { LegalDocumentScreen, privacyDocument } from "@/features/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Labdock collects, uses, protects and retains personal data under applicable privacy laws, including Singapore's PDPA.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalDocumentScreen document={privacyDocument} />;
}
