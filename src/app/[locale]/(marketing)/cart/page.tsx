import type { Metadata } from "next";

import { CartScreen } from "@/features/checkout";

export const metadata: Metadata = { title: "Cart | Labdock", robots: { index: false, follow: false } };

export default async function CartPage({ searchParams }: { searchParams: Promise<{ empty?: string }> }) {
  const { empty } = await searchParams;
  return <CartScreen forceEmpty={empty === "1" || empty === "true"} />;
}
