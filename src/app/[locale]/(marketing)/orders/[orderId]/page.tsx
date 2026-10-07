import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { OrderDetailScreen } from "@/features/orders";

type OrderDetailPageProps = { params: Promise<{ orderId: string }> };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RouteMetadata");
  return { title: t("orderDetails"), robots: { index: false, follow: false } };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await params;
  return <OrderDetailScreen orderId={orderId.toUpperCase()} />;
}
