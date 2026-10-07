import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CartScreen } from "@/features/checkout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RouteMetadata");
  return { title: t("cart"), robots: { index: false, follow: false } };
}

export default async function CartPage({ searchParams }: { searchParams: Promise<{ empty?: string }> }) {
  const { empty } = await searchParams;
  return <CartScreen forceEmpty={empty === "1" || empty === "true"} />;
}
