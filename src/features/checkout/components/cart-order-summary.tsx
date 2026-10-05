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
  const currency = items[0]?.currency;
  const rows = [
    ["Subtotal", formatCurrency(orderTotals.subtotal, currency)],
    ["Total discount", `-${formatCurrency(orderTotals.discount, currency)}`],
    ["Delivery", "FREE"],
    ["Tax", formatCurrency(orderTotals.tax, currency)],
  ] as const;

  return (
    <aside
      className="rounded-xl border border-[#dde2e8] bg-white p-4 lg:sticky lg:top-5"
      aria-labelledby="cart-summary-title"
    >
      <h2 id="cart-summary-title" className="text-2xl font-semibold text-[#051a50]">
        Order summary
      </h2>
      <dl className="mt-4 space-y-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 text-sm leading-5">
            <dt className="text-[#73798f]">{label}</dt>
            <dd className="font-semibold text-[#051a50]">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex items-center justify-between border-t border-[#dde2e8] pt-4">
        <span className="text-sm font-semibold text-[#051a50]">Total</span>
        <strong className="text-lg font-semibold text-[#164990]">{formatCurrency(orderTotals.total, currency)}</strong>
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
        variant="default"
        aria-disabled={disabled}
        className="mt-3 h-11 w-full justify-between pl-5 pr-1.5 shadow-none"
      >
        <Link
          href={disabled ? "#cart-products" : `/request-quote?items=${encodeURIComponent(selectedIds)}`}
          tabIndex={disabled ? -1 : undefined}
        >
          <span className="flex-1 text-center">Request for quote</span>
          <span className="flex size-8 items-center justify-center rounded-full bg-[#1f5fa8]">
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </Button>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#edf0f2] pt-4">
        <p className="flex items-center gap-2 text-sm text-[#73798f]">
          <ShieldTick className="size-5 text-[#e3bf00]" variant="Bold" aria-hidden="true" /> Secured payment
        </p>
        <span className="flex h-7 w-[46px] items-center justify-center rounded-[5px] border border-[#dde2e8] bg-white p-px">
          <Image
            src="/checkout/paynow-logo.svg"
            alt="PayNow"
            width={31}
            height={28}
            className="size-[30px] object-contain"
          />
        </span>
      </div>
    </aside>
  );
}
