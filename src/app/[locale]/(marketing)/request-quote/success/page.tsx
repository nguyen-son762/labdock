import type { Metadata } from "next";

import { QuoteSuccessScreen } from "@/features/checkout";

export const metadata: Metadata = {
  title: "Quote request submitted | Labdock",
  robots: { index: false, follow: false },
};

export default function QuoteSuccessPage() {
  return <QuoteSuccessScreen />;
}
