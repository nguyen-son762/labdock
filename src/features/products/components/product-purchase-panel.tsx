"use client";

import { Add, Bookmark, Box, Minus, ShoppingCart, Verify, Warning2 } from "iconsax-reactjs";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAddCartItemMutation } from "@/features/checkout";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/class-names";

import type { Product, ProductVariant } from "../products.types";
import { createCartItemFromProduct } from "../utils/product-cart";
import {
  getDefaultProductVariant,
  getProductVariantLabel,
  getProductVariantPresentation,
} from "../utils/product-display";

function ProductFacts({ product, variant }: { product: Product; variant?: ProductVariant }) {
  const facts = [
    { label: "Brand", value: product.brandName, icon: Bookmark },
    { label: "Product no.", value: product.productNo, icon: Box },
    { label: "CAS no.", value: product.casNumber || "N/A", icon: Box },
    {
      label: "Availability",
      value: variant?.isActive && variant.stockQty > 0 ? `${variant.stockQty} in stock` : "Unavailable",
      icon: Box,
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-x-5 gap-y-4 border-y border-[#e8edf2] py-5">
      {facts.map(({ label, value, icon: Icon }) => (
        <div key={label} className="flex min-w-0 gap-2">
          <Icon className="mt-0.5 size-4 shrink-0 text-[#2f7bc4]" aria-hidden="true" />
          <div className="min-w-0">
            <dt className="text-[10px] text-[#868da5]">{label}</dt>
            <dd className="truncate text-xs font-medium text-[#051a50]">{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

export function ProductPurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const addCartItem = useAddCartItemMutation();
  const defaultVariant = getDefaultProductVariant(product);
  const [selectedVariantId, setSelectedVariantId] = useState(defaultVariant?.id);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("");
  const selectedVariant = product.variants.find((variant) => variant.id === selectedVariantId) ?? defaultVariant;
  const presentation = getProductVariantPresentation(product, selectedVariant);
  const maxQuantity = Math.min(999, selectedVariant?.stockQty ?? 0);
  const notices = [
    product.notes,
    product.restrictedCondition ? "This product is restricted. Contact us to verify eligibility before ordering." : "",
    product.specialRequirement ? "Special requirements and additional checkout steps may apply." : "",
  ].filter(Boolean);

  function addProduct(destination?: "/checkout" | "/request-quote") {
    if (addCartItem.isPending || !presentation.canPurchase || !selectedVariant) return;
    setStatus("");
    addCartItem.mutate(createCartItemFromProduct(product, { quantity, variantId: selectedVariant.id }), {
      onSuccess: () => {
        if (destination) {
          router.push(`${destination}?items=${encodeURIComponent(product.id)}`);
          return;
        }
        setStatus(`${product.name} added to cart.`);
      },
      onError: () => setStatus("We could not update your cart. Please try again."),
    });
  }

  return (
    <aside className="rounded-xl border border-[#e3e8ee] bg-white p-5 shadow-sm lg:p-6" aria-label="Purchase options">
      {presentation.discount ? (
        <span className="inline-flex rounded bg-[#dc2626] px-2 py-1 text-xs font-semibold text-white">
          {presentation.discount}
        </span>
      ) : null}
      <h1 className="mt-3 text-2xl font-semibold leading-tight text-[#051a50]">{product.name}</h1>
      <p className="mt-4 flex items-center gap-2 text-2xl font-bold text-[#e57a00]">
        {presentation.price}
        {presentation.originalPrice ? (
          <span className="text-sm font-normal text-[#a3abbd] line-through">{presentation.originalPrice}</span>
        ) : null}
      </p>
      <div className="mt-5">
        <ProductFacts product={product} variant={selectedVariant} />
      </div>

      {product.variants.length ? (
        <fieldset className="mt-5">
          <legend className="text-xs font-semibold text-[#051a50]">Product option</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.variants.map((variant) => {
              const label = getProductVariantLabel(variant);
              return (
                <Button
                  key={variant.id}
                  type="button"
                  variant="outline"
                  aria-pressed={selectedVariant?.id === variant.id}
                  onClick={() => {
                    setSelectedVariantId(variant.id);
                    setQuantity((value) => Math.min(value, Math.max(1, variant.stockQty)));
                  }}
                  className={cn(
                    "h-9 min-w-[72px] rounded-lg border-[#dfe5eb] text-xs",
                    selectedVariant?.id === variant.id && "border-[#2f7bc4] bg-[#eef6fc] text-[#164990]",
                  )}
                >
                  {label}
                  {!variant.isActive || variant.stockQty <= 0 ? " (Out of stock)" : ""}
                </Button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="mt-5">
        <Label className="text-xs font-semibold text-[#051a50]">Quantity</Label>
        <div className="mt-2 flex h-10 w-[126px] items-center rounded-lg border border-[#dfe5eb]">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Decrease quantity"
            disabled={!presentation.canPurchase || quantity <= 1}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="size-9"
          >
            <Minus className="size-4" aria-hidden="true" />
          </Button>
          <output aria-label="Quantity" className="flex-1 text-center text-sm font-semibold text-[#051a50]">
            {quantity}
          </output>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Increase quantity"
            disabled={!presentation.canPurchase || quantity >= maxQuantity}
            onClick={() => setQuantity((value) => Math.min(maxQuantity, value + 1))}
            className="size-9"
          >
            <Add className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="brand"
          disabled={addCartItem.isPending || !presentation.canPurchase}
          onClick={() => addProduct("/checkout")}
          className="h-11 shadow-none"
        >
          {addCartItem.isPending ? "Updating…" : "Buy now"}
        </Button>
        <Button
          type="button"
          disabled={addCartItem.isPending || !presentation.canPurchase}
          onClick={() => addProduct()}
          className="h-11 rounded-full bg-gradient-to-r from-[#164990] to-[#2f7bc4] shadow-none"
        >
          <ShoppingCart className="size-4" variant="Bold" aria-hidden="true" /> Add to cart
        </Button>
      </div>
      <div className="my-4 flex items-center gap-3 text-[10px] text-[#a3abbd]">
        <span className="h-px flex-1 bg-[#e5e9ef]" />
        <span>OR</span>
        <span className="h-px flex-1 bg-[#e5e9ef]" />
      </div>
      <Button
        type="button"
        variant="outline"
        disabled={addCartItem.isPending}
        onClick={() => {
          if (!presentation.canPurchase) {
            router.push(`/contact-us?type=quote&product=${encodeURIComponent(product.slug)}`);
            return;
          }
          addProduct("/request-quote");
        }}
        className="h-11 w-full rounded-full border-[#2f7bc4] text-[#164990] hover:bg-[#eef6fc] hover:text-[#164990]"
      >
        Request a Quote
      </Button>
      <p role="status" aria-live="polite" className="mt-3 min-h-4 text-xs text-[#299a86]">
        {status}
      </p>

      {product.certificates.length ? (
        <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-[#5e6375]" aria-label="Product certificates">
          {product.certificates.map((certificate) => (
            <span key={certificate.id} className="inline-flex items-center gap-1">
              <Verify className="size-3.5 text-[#3eb584]" variant="Bold" aria-hidden="true" />
              {certificate.name}
            </span>
          ))}
        </div>
      ) : null}
      <div
        className="mt-4 flex items-center gap-2 text-[9px] font-bold text-[#164990]"
        aria-label="Accepted payment methods"
      >
        {["VISA", "PAY NOW", "Mastercard"].map((payment) => (
          <span key={payment} className="rounded border px-2 py-1">
            {payment}
          </span>
        ))}
      </div>
      {notices.length ? (
        <div className="mt-5 rounded-lg bg-[#fff7ed] p-3 text-[10px] leading-4 text-[#8a4b09]">
          <div className="flex gap-2">
            <Warning2 className="mt-0.5 size-4 shrink-0 text-[#e57a00]" variant="Bold" aria-hidden="true" />
            <div>
              <strong>Product notice</strong>
              {notices.map((notice) => (
                <p key={notice}>{notice}</p>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
