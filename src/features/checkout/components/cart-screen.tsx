"use client";

import { ArrowLeft2 } from "iconsax-reactjs";
import Link from "next/link";
import { useState } from "react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import { useCartQuery } from "../api/use-cart-query";
import { useRemoveCartItemMutation } from "../api/use-remove-cart-item-mutation";
import { useUpdateCartItemMutation } from "../api/use-update-cart-item-mutation";
import { CartItemsTable } from "./cart-items-table";
import { CartOrderSummary } from "./cart-order-summary";
import { EmptyCartScreen } from "./empty-cart-screen";

export function CartScreen({ forceEmpty = false }: { forceEmpty?: boolean }) {
  const cartQuery = useCartQuery();
  const updateCart = useUpdateCartItemMutation();
  const removeCart = useRemoveCartItemMutation();
  const [selection, setSelection] = useState<string[] | null>(null);
  const items = cartQuery.data ?? [];
  const selectedIds =
    selection === null ? items.map(({ id }) => id) : selection.filter((id) => items.some((item) => item.id === id));
  const selectedItems = items.filter((item) => selectedIds.includes(item.id));

  if (forceEmpty || (cartQuery.isSuccess && items.length === 0)) return <EmptyCartScreen />;

  if (cartQuery.isPending) {
    return (
      <div className="container min-h-[675px] py-10">
        <Skeleton className="h-[420px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="min-h-[675px] bg-[#f5f8fb] py-10">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
        <h1 className="mt-3 text-3xl font-semibold text-[#164990]">Cart</h1>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded text-xs text-[#164990] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
        >
          <ArrowLeft2 className="size-4" aria-hidden="true" /> Back to product listing
        </Link>
        {cartQuery.isError ? <Alert className="mt-5">We could not load your cart. Please try again.</Alert> : null}
        <div
          id="cart-products"
          className="mt-6 grid items-start gap-4 lg:grid-cols-[minmax(0,832px)_minmax(320px,392px)]"
        >
          <CartItemsTable
            items={items}
            selectedIds={selectedIds}
            onSelectedIdsChange={setSelection}
            pendingItemId={(updateCart.variables ?? removeCart.variables)?.itemId}
            onQuantityChange={(itemId, quantity) => updateCart.mutate({ itemId, quantity })}
            onSizeChange={(itemId, size) => updateCart.mutate({ itemId, size })}
            onRemove={(itemId) => removeCart.mutate({ itemId })}
          />
          <CartOrderSummary items={selectedItems} />
        </div>
      </div>
    </div>
  );
}
