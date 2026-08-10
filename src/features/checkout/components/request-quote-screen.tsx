"use client";

import { ArrowLeft2 } from "iconsax-reactjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";

import { useCartQuery } from "../api/use-cart-query";
import { useRemoveCartItemMutation } from "../api/use-remove-cart-item-mutation";
import { useSubmitQuoteMutation } from "../api/use-submit-quote-mutation";
import { useUpdateCartItemMutation } from "../api/use-update-cart-item-mutation";
import type { QuoteContactValues } from "../schemas/quote.schema";
import { CartItemsTable } from "./cart-items-table";
import { EmptyCartScreen } from "./empty-cart-screen";
import { QuoteContactForm } from "./quote-contact-form";

export function RequestQuoteScreen({ initialItemIds }: { initialItemIds?: string[] }) {
  const router = useRouter();
  const cartQuery = useCartQuery();
  const updateCart = useUpdateCartItemMutation();
  const removeCart = useRemoveCartItemMutation();
  const submitQuote = useSubmitQuoteMutation();
  const [selection, setSelection] = useState<string[] | null>(null);
  const cartItems = cartQuery.data ?? [];
  const items = initialItemIds?.length ? cartItems.filter((item) => initialItemIds.includes(item.id)) : cartItems;
  const selectedIds =
    selection === null ? items.map(({ id }) => id) : selection.filter((id) => items.some((item) => item.id === id));

  const handleSubmit = (contact: QuoteContactValues) => {
    if (submitQuote.isPending || selectedIds.length === 0) return;
    submitQuote.mutate(
      { contact, itemIds: selectedIds, idempotencyKey: crypto.randomUUID() },
      {
        onSuccess: ({ reference }) => router.push(`/request-quote/success?reference=${encodeURIComponent(reference)}`),
      },
    );
  };

  if (cartQuery.isPending)
    return (
      <div className="container min-h-[675px] py-10">
        <Skeleton className="h-[560px] w-full rounded-xl" />
      </div>
    );
  if (cartQuery.isSuccess && items.length === 0) return <EmptyCartScreen />;

  return (
    <div className="min-h-[873px] bg-[#f5f8fb] py-10">
      <div className="container">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Request for quote" }]}
        />
        <h1 className="mt-3 text-3xl font-semibold text-[#164990]">Request for quote</h1>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded text-xs text-[#164990] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
        >
          <ArrowLeft2 className="size-4" aria-hidden="true" /> Back to product listing
        </Link>
        <div className="mt-6 grid items-start gap-4 lg:grid-cols-[minmax(0,821px)_minmax(340px,403px)]">
          <CartItemsTable
            items={items}
            selectedIds={selectedIds}
            onSelectedIdsChange={setSelection}
            pendingItemId={(updateCart.variables ?? removeCart.variables)?.itemId}
            onQuantityChange={(itemId, quantity) => updateCart.mutate({ itemId, quantity })}
            onSizeChange={(itemId, size) => updateCart.mutate({ itemId, size })}
            onRemove={(itemId) => removeCart.mutate({ itemId })}
          />
          <QuoteContactForm
            onSubmit={handleSubmit}
            pending={submitQuote.isPending}
            error={
              selectedIds.length === 0
                ? "Select at least one product to request a quote."
                : submitQuote.isError
                  ? "We could not submit your request. Please try again."
                  : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
