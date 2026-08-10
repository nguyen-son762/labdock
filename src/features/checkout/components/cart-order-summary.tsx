import { ArrowRight, ShieldTick } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import type { CartItem } from "../schemas/cart.schema";
import { calculateOrderTotals, formatCurrency } from "../data/checkout-data";

export function CartOrderSummary({ items }: { items: CartItem[] }) {
  const disabled = items.length === 0;
  const selectedIds = items.map(({ id }) => id).join(",");
  const orderTotals = calculateOrderTotals(items);
  const rows = [
    ["Subtotal", formatCurrency(orderTotals.subtotal)],
    ["Total discount", `-${formatCurrency(orderTotals.discount)}`],
    ["Delivery", "FREE"],
    ["Tax", formatCurrency(orderTotals.tax)],
  ] as const;

  return (
    <aside
      className="rounded-xl border border-[#dde2e8] bg-white p-4 lg:sticky lg:top-5"
      aria-labelledby="cart-summary-title"
    >
      <h2 id="cart-summary-title" className="text-2xl font-semibold text-[#051a50]">
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
        <strong className="text-xl text-[#164990]">{formatCurrency(orderTotals.total)}</strong>
      </div>
      <Button
        asChild
        variant="brand"
        aria-disabled={disabled}
        className="mt-5 h-11 w-full justify-between pl-5 pr-1.5 shadow-none"
      >
        <Link
          href={disabled ? "#cart-products" : `/checkout?items=${encodeURIComponent(selectedIds)}`}
          tabIndex={disabled ? -1 : undefined}
        >
          <span className="flex-1 text-center">Proceed to checkout</span>
          <span className="flex size-8 items-center justify-center rounded-full bg-[#efa33b]">
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        aria-disabled={disabled}
        className="mt-3 h-11 w-full rounded-full border-[#2474ca] text-[#164990] hover:bg-[#eef6ff] hover:text-[#164990]"
      >
        <Link
          href={disabled ? "#cart-products" : `/request-quote?items=${encodeURIComponent(selectedIds)}`}
          tabIndex={disabled ? -1 : undefined}
        >
          Request for quote
        </Link>
      </Button>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#edf0f2] pt-4">
        <p className="flex items-center gap-2 text-xs text-[#868da5]">
          <ShieldTick className="size-4 text-[#e3bf00]" variant="Bold" aria-hidden="true" /> Secured payment
        </p>
        <Image
          src="/checkout/paynow-logo.svg"
          alt="PayNow"
          width={64}
          height={20}
          className="h-auto w-16 object-contain"
        />
      </div>
    </aside>
  );
}
