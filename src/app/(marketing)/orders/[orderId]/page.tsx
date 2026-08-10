import type { Metadata } from "next";

import { OrderDetailScreen } from "@/features/orders";

type OrderDetailPageProps = { params: Promise<{ orderId: string }> };

export const metadata: Metadata = { title: "Order details", robots: { index: false, follow: false } };

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await params;
  return <OrderDetailScreen orderId={orderId.toUpperCase()} />;
}
