import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CheckoutScreen } from "@/features/checkout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RouteMetadata");
  return { title: t("checkout"), description: t("checkoutDescription"), robots: { index: false, follow: false } };
}

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ items?: string }> }) {
  const { items } = await searchParams;
  const itemIds = items?.split(",").filter(Boolean);

  return <CheckoutScreen initialItemIds={itemIds} />;
}
