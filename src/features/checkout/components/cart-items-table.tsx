import { Gallery, Trash } from "iconsax-reactjs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  onSizeChange: (itemId: string, size: string) => void;
  onRemove: (itemId: string) => void;
  pendingItemId?: string;
};

const sizeOptions: Record<string, string[]> = {
  "beaker-griffin": ["Standard 5mL", "Standard 10mL"],
  "digital-microscope": ["White", "Black"],
};

function ProductImage({ item }: { item: CartItem }) {
  return (
    <div className="flex size-[88px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e7e9ed] bg-[#f8f9fa]">
      {item.image ? (
        <Image src={item.image} alt="" width={88} height={88} className="size-full object-contain" />
      ) : (
        <Gallery className="size-8 text-[#a3abbd]" aria-hidden="true" />
      )}
    </div>
  );
}

function ProductDetails({ item }: { item: CartItem }) {
  return (
    <div className="min-w-0">
      <p className="font-semibold leading-5 text-[#051a50]">{item.name}</p>
      <p className="mt-1 text-xs text-[#868da5]">Catalog no.: {item.catalogNumber}</p>
      <div className="mt-3 flex flex-wrap items-baseline gap-2">
        <strong className="text-base text-[#e57a00]">{formatCurrency(item.unitPrice)}</strong>
        {item.originalPrice ? (
          <span className="text-xs text-[#a3abbd] line-through">{formatCurrency(item.originalPrice)}</span>
        ) : null}
      </div>
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
  const [draftQuantity, setDraftQuantity] = useState<number | undefined>(item.quantity);
  const focusedRef = useRef(false);

  useEffect(() => {
    if (!focusedRef.current) setDraftQuantity(item.quantity);
  }, [item.quantity]);

  const commitQuantity = () => {
    focusedRef.current = false;
    const quantity = Math.max(1, draftQuantity ?? 1);
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
      aria-label={`Quantity for ${item.name}`}
      aria-busy={pending}
      className="h-10 bg-white text-center text-[#051a50]"
      isAllowed={({ floatValue }) => floatValue === undefined || floatValue <= 999_999}
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
  onSizeChange,
  onRemove,
  pendingItemId,
}: CartItemsTableProps) {
  const allSelected = items.length > 0 && selectedIds.length === items.length;
  const toggleItem = (id: string, checked: boolean) => {
    onSelectedIdsChange(checked ? [...selectedIds, id] : selectedIds.filter((itemId) => itemId !== id));
  };

  return (
    <section className="overflow-hidden rounded-xl border border-[#dde2e8] bg-white" aria-label="Cart products">
      <div className="hidden grid-cols-[32px_1fr_112px_160px_48px] items-center gap-4 border-b border-[#dde2e8] bg-[#f8f9fa] px-4 py-3 text-xs font-semibold text-[#73798f] md:grid">
        <Checkbox
          checked={allSelected}
          onCheckedChange={(checked) => onSelectedIdsChange(checked ? items.map(({ id }) => id) : [])}
          aria-label="Select all products"
        />
        <span>Product</span>
        <span>Quantity</span>
        <span>Option</span>
        <span className="sr-only">Remove</span>
      </div>

      {items.map((item) => {
        const selected = selectedIds.includes(item.id);
        const pending = pendingItemId === item.id;
        return (
          <article
            key={item.id}
            className="grid gap-4 border-b border-[#edf0f2] p-4 last:border-b-0 md:grid-cols-[32px_1fr_112px_160px_48px] md:items-center"
          >
            <Checkbox
              checked={selected}
              onCheckedChange={(checked) => toggleItem(item.id, checked === true)}
              aria-label={`Select ${item.name}`}
            />
            <div className="flex min-w-0 gap-4">
              <ProductImage item={item} />
              <ProductDetails item={item} />
            </div>
            <label className="space-y-1 text-xs text-[#73798f] md:block">
              <span className="md:sr-only">Quantity</span>
              <QuantityInput item={item} pending={pending} onCommit={onQuantityChange} />
            </label>
            <Select value={item.size} disabled={pending} onValueChange={(value) => onSizeChange(item.id, value)}>
              <SelectTrigger className="h-10 bg-white" aria-label={`Option for ${item.name}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {(sizeOptions[item.id] ?? [item.size]).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={pending}
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${item.name}`}
              className="size-10 justify-self-end rounded-full text-[#d92d20] hover:bg-[#fef3f2] hover:text-[#d92d20] md:justify-self-center"
            >
              <Trash className="size-5" aria-hidden="true" />
            </Button>
          </article>
        );
      })}
    </section>
  );
}
