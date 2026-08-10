"use client";

import { ArrowLeft2, ArrowRight, Bank, ShieldTick } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { useCompletePaymentMutation } from "../api/use-complete-payment-mutation";
import { formatCurrency } from "../data/checkout-data";
import type { PaymentMethod } from "../schemas/checkout.schema";

type PaymentScreenProps = {
  method: PaymentMethod;
  paymentReference: string;
  amount: number;
};

export function PaymentScreen({ method, paymentReference, amount }: PaymentScreenProps) {
  const router = useRouter();
  const paymentMutation = useCompletePaymentMutation();
  const isPayNow = method === "paynow";

  function handleCompletePayment() {
    if (paymentMutation.isPending) return;
    paymentMutation.mutate(
      { method, paymentReference },
      {
        onSuccess: ({ orderId }) => {
          const query = new URLSearchParams({ orderId, amount: String(amount) });
          router.push(`/payment/success?${query.toString()}`);
        },
      },
    );
  }

  return (
    <div className="bg-[#f5f8fb] py-10">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shopping cart", href: "/checkout" },
            { label: "Checkout", href: "/checkout" },
            { label: "Payment" },
          ]}
        />
        <h1 className="mt-3 text-3xl font-semibold text-[#164990]">Payment</h1>
        <section
          className="mt-7 max-w-[820px] rounded-xl border border-[#dde2e8] bg-white p-4"
          aria-labelledby="payment-method-title"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex size-12 items-center justify-center overflow-hidden rounded-xl border border-[#dde2e8] bg-[#f5f7f8]">
              {isPayNow ? (
                <Image src="/checkout/paynow-logo.svg" alt="PayNow" fill sizes="48px" className="object-contain p-1" />
              ) : (
                <Bank className="size-6 text-[#164990]" aria-hidden="true" />
              )}
            </span>
            <div>
              <h2 id="payment-method-title" className="text-2xl font-semibold text-[#051a50]">
                {isPayNow ? "PayNow QR Code" : "Bank transfer"}
              </h2>
              <p className="text-xs text-[#73798f]">Scan QR code with your banking app</p>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center rounded-xl bg-[#f5f7f8] p-6 text-center">
            <div className="relative size-[min(300px,76vw)] overflow-hidden bg-white">
              <Image
                src="/checkout/paynow-qr.png"
                alt={`${isPayNow ? "PayNow" : "Bank transfer"} payment QR code`}
                fill
                priority
                unoptimized
                sizes="300px"
                className="object-cover"
              />
            </div>
            <strong className="mt-3 text-lg text-[#1f5fa8]">Amount: {formatCurrency(amount)}</strong>
            {!isPayNow ? (
              <div className="mt-2 space-y-1 text-sm font-semibold text-[#051a50]">
                <p>Company name: i-DNA</p>
                <p>Business registration no.: 202012345Z</p>
              </div>
            ) : null}
            <p className="mt-6 text-xs text-[#73798f]">
              Open your banking app and scan this QR code to complete payment
            </p>
            <p className="mt-2 text-[10px] text-[#a3abbd]">Reference: {paymentReference}</p>
            {paymentMutation.isError ? (
              <Alert className="mt-4 w-full text-left">
                Payment confirmation failed. No charge was retried; please try again.
              </Alert>
            ) : null}
            <Button
              type="button"
              variant="brand"
              disabled={paymentMutation.isPending}
              onClick={handleCompletePayment}
              className="mt-5 h-11 px-5 shadow-none"
            >
              <ShieldTick className="size-4" aria-hidden="true" />
              {paymentMutation.isPending ? "Confirming payment…" : "I have completed payment"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </section>
        <Button asChild variant="ghost" className="mt-5 text-[#164990]">
          <Link href="/checkout">
            <ArrowLeft2 className="size-4" aria-hidden="true" /> Back to checkout
          </Link>
        </Button>
      </div>
    </div>
  );
}
