import { ArrowRight, TickCircle } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { formatCurrency } from "../data/checkout-data";

export function PaymentSuccessScreen({ orderId, amount }: { orderId: string; amount: number }) {
  return (
    <section className="relative isolate min-h-[490px] overflow-hidden" aria-labelledby="payment-success-title">
      <Image
        src="/checkout/success-background.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-white/10" />
      <div className="container flex min-h-[490px] flex-col items-center justify-center py-10 text-center text-[#051a50]">
        <span className="flex size-12 items-center justify-center rounded-full border-[5px] border-white/50 bg-[#164990] text-white">
          <TickCircle className="size-7" variant="Bold" aria-hidden="true" />
        </span>
        <h1 id="payment-success-title" className="mt-4 text-3xl font-semibold text-[#0f3678]">
          Payment successful!
        </h1>
        <p className="mt-7 text-sm">Thank you for your order.</p>
        <p className="mt-2 text-sm">A confirmation email has been sent to sarah_chen@biogenix.com.sg</p>
        <div className="mt-4 w-full max-w-[550px] rounded-2xl border border-white bg-gradient-to-b from-white to-white/50 px-4 py-4">
          <p className="font-semibold">Order total</p>
          <strong className="mt-1 block text-xl text-[#164990]">{formatCurrency(amount)}</strong>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline" className="rounded-full border-[#c8d0d9] bg-white text-[#73798f]">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="brand" className="rounded-full pl-5 pr-1.5 shadow-none">
            <Link href="/products">
              Continue shopping{" "}
              <span className="flex size-8 items-center justify-center rounded-full bg-[#efa33b]">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </Button>
        </div>
        <Link
          href={`/orders/${orderId}`}
          className="mt-4 rounded text-sm text-[#164990] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
        >
          View order details
        </Link>
      </div>
    </section>
  );
}
