import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { QuoteSuccessScreen } from "@/features/checkout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RouteMetadata");
  return { title: t("quoteSuccess"), robots: { index: false, follow: false } };
}

export default function QuoteSuccessPage() {
  return <QuoteSuccessScreen />;
}
