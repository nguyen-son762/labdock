import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { RequestQuoteScreen, parseCartItemSelection } from "@/features/checkout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RouteMetadata");
  return { title: t("quote"), robots: { index: false, follow: false } };
}

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ items?: string | string[] }>;
}) {
  const { items } = await searchParams;
  const itemIds = parseCartItemSelection(items);

  return <RequestQuoteScreen initialItemIds={itemIds} />;
}
