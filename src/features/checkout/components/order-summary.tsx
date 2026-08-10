import { ArrowRight, ShieldTick } from "iconsax-reactjs";

import { Button } from "@/components/ui/button";

import type { OrderTotals } from "../checkout.types";
import { formatCurrency } from "../data/checkout-data";

export function OrderSummary({ totals, pending }: { totals: OrderTotals; pending: boolean }) {
  const rows = [
    ["Subtotal", formatCurrency(totals.subtotal)],
    ["Total discount", `-${formatCurrency(totals.discount)}`],
    ["Delivery", totals.delivery === 0 ? "FREE" : formatCurrency(totals.delivery)],
    ["Tax", formatCurrency(totals.tax)],
  ] as const;

  return (
    <aside
      className="rounded-xl border border-[#dde2e8] bg-white p-4 lg:sticky lg:top-5"
      aria-labelledby="order-summary-title"
    >
      <h2 id="order-summary-title" className="text-2xl font-semibold text-[#051a50]">
        Order summary
      </h2>
      <dl className="mt-5 space-y-4">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 text-xs">
            <dt className="text-[#73798f]">{label}</dt>
            <dd className="font-medium text-[#051a50]">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex items-center justify-between border-t border-[#dde2e8] pt-4">
        <span className="text-sm font-semibold text-[#051a50]">Total</span>
        <strong className="text-xl text-[#164990]">{formatCurrency(totals.total)}</strong>
      </div>
      <Button
        form="checkout-form"
        type="submit"
        variant="brand"
        disabled={pending}
        className="mt-5 h-11 w-full justify-between pl-5 pr-1.5 shadow-none"
      >
        <span className="flex-1 text-center">{pending ? "Preparing payment…" : "Make payment"}</span>
        <span className="flex size-8 items-center justify-center rounded-full bg-[#efa33b]">
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </Button>
      <p className="mt-5 flex items-center gap-2 text-xs text-[#868da5]">
        <ShieldTick className="size-4 text-[#e3bf00]" variant="Bold" aria-hidden="true" /> Secured payment
      </p>
    </aside>
  );
}
