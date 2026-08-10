import type { Metadata } from "next";

import { CheckoutScreen } from "@/features/checkout";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your laboratory products, delivery address and payment method.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ items?: string }> }) {
  const { items } = await searchParams;
  const itemIds = items?.split(",").filter(Boolean);

  return <CheckoutScreen initialItemIds={itemIds} />;
}
