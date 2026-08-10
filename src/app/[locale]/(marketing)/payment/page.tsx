import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { paymentMethodSchema, PaymentScreen } from "@/features/checkout";

export const metadata: Metadata = {
  title: "Payment",
  robots: { index: false, follow: false },
};

type PaymentPageProps = {
  searchParams: Promise<{ method?: string; reference?: string; amount?: string }>;
};

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const params = await searchParams;
  const parsedMethod = paymentMethodSchema.safeParse(params.method);
  const method = parsedMethod.success ? parsedMethod.data : "paynow";
  const paymentReference = /^PAY-[A-Z0-9]{8}$/.test(params.reference ?? "") ? params.reference : undefined;
  const amount = Number(params.amount);
  if (!paymentReference || !Number.isFinite(amount) || amount <= 0) redirect("/checkout");

  return <PaymentScreen method={method} paymentReference={paymentReference} amount={amount} />;
}
