import type { Metadata } from "next";

import { RequestQuoteScreen } from "@/features/checkout";

export const metadata: Metadata = { title: "Request for quote | Labdock", robots: { index: false, follow: false } };

export default async function RequestQuotePage({ searchParams }: { searchParams: Promise<{ items?: string }> }) {
  const { items } = await searchParams;
  const itemIds = items?.split(",").filter(Boolean);

  return <RequestQuoteScreen initialItemIds={itemIds} />;
}
