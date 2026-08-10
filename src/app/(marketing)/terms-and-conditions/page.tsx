import type { Metadata } from "next";

import { LegalDocumentScreen, termsDocument } from "@/features/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Read the terms governing accounts, purchases, payments, delivery and use of the Labdock marketplace.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  return <LegalDocumentScreen document={termsDocument} />;
}
