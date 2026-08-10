import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { PaymentSuccessScreen } from "@/features/checkout";

export const metadata: Metadata = {
  title: "Payment successful",
  robots: { index: false, follow: false },
};

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; amount?: string }>;
}) {
  const { orderId, amount: rawAmount } = await searchParams;
  const amount = Number(rawAmount);
  if (!orderId || !/^OR-\d+$/.test(orderId) || !Number.isFinite(amount) || amount <= 0) redirect("/checkout");

  return <PaymentSuccessScreen orderId={orderId} amount={amount} />;
}
