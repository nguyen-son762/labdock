import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { RequestQuoteScreen } from "@/features/checkout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RouteMetadata");
  return { title: t("quote"), robots: { index: false, follow: false } };
}

export default async function RequestQuotePage({ searchParams }: { searchParams: Promise<{ items?: string }> }) {
  const { items } = await searchParams;
  const itemIds = items?.split(",").filter(Boolean);

  return <RequestQuoteScreen initialItemIds={itemIds} />;
}
