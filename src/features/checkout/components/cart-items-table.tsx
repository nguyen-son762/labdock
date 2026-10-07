import { Gallery, Trash } from "iconsax-reactjs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NumberInput } from "@/components/ui/number-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { CartItem } from "../schemas/cart.schema";
import { formatCurrency } from "../data/checkout-data";

type CartItemsTableProps = {
  items: CartItem[];
  selectedIds: string[];
  onSelectedIdsChange: (ids: string[]) => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  pendingItemId?: string;
};

function ProductImage({ item }: { item: CartItem }) {
  return (
    <div className="flex size-[60px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#dde2e8] bg-[#f3f4f6]">
      {item.image ? (
        <Image src={item.image} alt="" width={60} height={60} className="size-full object-contain" />
      ) : (
        <Gallery className="size-6 text-[#a3abbd]" aria-hidden="true" />
      )}
    </div>
  );
}

function ProductDetails({ item }: { item: CartItem }) {
  const t = useTranslations("Checkout");
  return (
    <div className="min-w-0">
      <p className="line-clamp-2 text-sm font-semibold leading-5 text-[#1f5fa8]">{item.name}</p>
      <p className="mt-1 text-xs leading-4 text-[#73798f]">{t("productNumber", { number: item.catalogNumber })}</p>
    </div>
  );
}

function ProductPrice({ item }: { item: CartItem }) {
  return (
    <div className="flex min-w-0 flex-col items-start">
      <span className="text-sm font-medium leading-5 text-[#051a50]">
        {formatCurrency(item.unitPrice, item.currency)}
      </span>
      {item.originalPrice ? (
        <span className="text-xs leading-4 text-[#a3abbd] line-through">
          {formatCurrency(item.originalPrice, item.currency)}
        </span>
      ) : null}
    </div>
  );
}

function QuantityInput({
  item,
  pending,
  onCommit,
}: {
  item: CartItem;
  pending: boolean;
  onCommit: (itemId: string, quantity: number) => void;
}) {
  const t = useTranslations("Checkout");
  const [draftQuantity, setDraftQuantity] = useState<number | undefined>(item.quantity);
  const focusedRef = useRef(false);
  // Keep an over-stock cart item editable so the customer can reduce it. The API
  // remains the source of truth for the final quantity validation.
  const maximumQuantity = Math.max(1, item.stockQty ?? 999_999, item.quantity);

  useEffect(() => {
    if (!focusedRef.current) setDraftQuantity(item.quantity);
  }, [item.quantity]);

  const commitQuantity = () => {
    focusedRef.current = false;
    const quantity = Math.min(maximumQuantity, Math.max(1, draftQuantity ?? 1));
    setDraftQuantity(quantity);
    if (quantity !== item.quantity) onCommit(item.id, quantity);
  };

  return (
    <NumberInput
      value={draftQuantity ?? ""}
      valueIsNumericString
      decimalScale={0}
      allowNegative={false}
      allowLeadingZeros={false}
      inputMode="numeric"
      aria-label={t("quantityForProduct", { name: item.name })}
      aria-busy={pending}
      disabled={pending}
      className="h-11 bg-white text-center text-sm text-[#051a50]"
      isAllowed={({ floatValue }) => floatValue === undefined || floatValue <= maximumQuantity}
      onFocus={() => {
        focusedRef.current = true;
      }}
      onValueChange={({ floatValue }) => setDraftQuantity(floatValue)}
      onBlur={commitQuantity}
      onKeyDown={(event) => {
        if (event.key === "Enter") event.currentTarget.blur();
      }}
    />
  );
}

export function CartItemsTable({
  items,
  selectedIds,
  onSelectedIdsChange,
  onQuantityChange,
  onRemove,
  pendingItemId,
}: CartItemsTableProps) {
  const t = useTranslations("Checkout");
  const allSelected = items.length > 0 && selectedIds.length === items.length;
  const toggleItem = (id: string, checked: boolean) => {
    onSelectedIdsChange(checked ? [...selectedIds, id] : selectedIds.filter((itemId) => itemId !== id));
  };

  return (
    <section
      className="overflow-hidden rounded-xl border border-[#e9eaeb] bg-white px-4 py-6"
      aria-label={t("cartProducts")}
    >
      <div className="hidden grid-cols-[24px_minmax(0,1.7fr)_minmax(90px,0.7fr)_80px_minmax(120px,0.85fr)_32px] items-center gap-2 border-b border-[#dde2e8] pb-2 text-sm font-semibold text-[#051a50] md:grid">
        <Checkbox
          className="size-4 rounded-[4px] border-[#c8d0d9] bg-white shadow-none data-[state=checked]:border-[#596ab7] data-[state=checked]:bg-[#f2f7fd] data-[state=checked]:text-[#596ab7]"
          checked={allSelected}
          onCheckedChange={(checked) => onSelectedIdsChange(checked ? items.map(({ id }) => id) : [])}
          aria-label={t("selectAllProducts")}
        />
        <span>{t("selectAll", { count: items.length })}</span>
        <span>{t("price")}</span>
        <span>{t("quantity")}</span>
        <span>{t("size")}</span>
        <span className="sr-only">{t("remove")}</span>
      </div>

      {items.map((item) => {
        const selected = selectedIds.includes(item.id);
        const pending = pendingItemId === item.id;
        return (
          <article
            key={item.id}
            className="grid grid-cols-[24px_minmax(0,1fr)_32px] items-center gap-x-3 gap-y-3 border-b border-[#dde2e8] py-4 last:border-b-0 md:grid-cols-[24px_minmax(0,1.7fr)_minmax(90px,0.7fr)_80px_minmax(120px,0.85fr)_32px] md:gap-2 md:py-3"
          >
            <Checkbox
              className="size-4 rounded-[4px] border-[#c8d0d9] bg-white shadow-none data-[state=checked]:border-[#596ab7] data-[state=checked]:bg-[#f2f7fd] data-[state=checked]:text-[#596ab7] md:col-auto"
              checked={selected}
              onCheckedChange={(checked) => toggleItem(item.id, checked === true)}
              aria-label={t("selectProduct", { name: item.name })}
            />
            <div className="col-start-2 row-start-1 flex min-w-0 items-center gap-3 md:col-auto md:row-auto">
              <ProductImage item={item} />
              <ProductDetails item={item} />
            </div>
            <div className="col-start-2 row-start-2 md:col-auto md:row-auto">
              <ProductPrice item={item} />
            </div>
            <label className="col-start-1 row-start-2 min-w-0 text-xs text-[#73798f] md:col-auto md:row-auto">
              <span className="mb-1 block text-[11px] font-medium text-[#73798f] md:hidden">{t("quantity")}</span>
              <QuantityInput item={item} pending={pending} onCommit={onQuantityChange} />
            </label>
            <div className="col-span-3 col-start-1 row-start-3 min-w-0 md:col-auto md:row-auto">
              <span className="mb-1 block text-[11px] font-medium text-[#73798f] md:hidden">{t("size")}</span>
              <Select value={item.size ?? item.catalogNumber}>
                <SelectTrigger
                  aria-label={t("sizeForProduct", { name: item.name })}
                  className="h-11 rounded-lg border-[#dde2e8] bg-white px-3 text-sm text-[#051a50] shadow-[0_1px_1px_rgba(10,13,18,0.05)]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={item.size ?? item.catalogNumber}>{item.size ?? item.catalogNumber}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="col-start-3 row-start-1 size-8 justify-self-end rounded-full text-[#d92d20] hover:bg-[#fef3f2] hover:text-[#d92d20] md:col-auto md:row-auto md:justify-self-center"
              disabled={pending}
              onClick={() => onRemove(item.id)}
              aria-label={t("removeProduct", { name: item.name })}
            >
              <Trash className="size-4" aria-hidden="true" />
            </Button>
          </article>
        );
      })}
    </section>
  );
}
