import Image from "next/image";
import { Gallery } from "iconsax-reactjs";

import type { CheckoutItem } from "../checkout.types";
import { formatCurrency } from "../data/checkout-data";

function ProductIdentity({ item }: { item: CheckoutItem }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="relative size-[60px] shrink-0 overflow-hidden rounded-md border border-[#ecf0f3] bg-white">
        {item.image ? (
          <Image src={item.image} alt="" fill unoptimized sizes="60px" className="object-cover" />
        ) : (
          <span className="flex size-full items-center justify-center bg-[#f7f8fa]" aria-hidden="true">
            <Gallery size={24} color="#a3abbd" variant="Linear" />
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="line-clamp-2 text-xs font-semibold leading-4 text-[#164990]">{item.name}</p>
        <p className="mt-1 text-[10px] text-[#868da5]">Category no.: {item.catalogNumber}</p>
      </div>
    </div>
  );
}

export function CheckoutItems({ items }: { items: CheckoutItem[] }) {
  return (
    <section className="rounded-xl border border-[#dde2e8] bg-white p-4" aria-labelledby="checkout-products-title">
      <h2 id="checkout-products-title" className="sr-only">
        Products in this order
      </h2>
      <div className="hidden grid-cols-[2.2fr_1fr_0.75fr_1fr] border-b border-[#ecf0f3] pb-3 text-xs font-semibold text-[#051a50] sm:grid">
        <span>Product</span>
        <span>Price</span>
        <span>Qty</span>
        <span>Size</span>
      </div>
      <div className="divide-y divide-[#ecf0f3]">
        {items.map((item) => (
          <article key={item.id} className="grid gap-3 py-4 sm:grid-cols-[2.2fr_1fr_0.75fr_1fr] sm:items-center">
            <ProductIdentity item={item} />
            <div className="flex items-center justify-between sm:block">
              <span className="text-[10px] font-medium text-[#868da5] sm:hidden">Price</span>
              <p className="text-xs font-medium text-[#051a50]">
                {formatCurrency(item.unitPrice)}
                {item.originalPrice ? (
                  <span className="block text-[10px] font-normal text-[#a3abbd] line-through">
                    {formatCurrency(item.originalPrice)}
                  </span>
                ) : null}
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-[#051a50] sm:block">
              <span className="text-[10px] font-medium text-[#868da5] sm:hidden">Qty</span>
              <span>×{item.quantity}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#051a50] sm:block">
              <span className="text-[10px] font-medium text-[#868da5] sm:hidden">Size</span>
              <span>{item.size}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
