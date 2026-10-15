import type { CartApiItem, CartItem } from "../schemas/cart.schema";

export function getCartVariantLabel(variant: CartApiItem["variants"][number]): string {
  return variant.selections.map((selection) => selection.value).join(" / ") || variant.sku;
}

export function getCartItemOption(item: CartItem): string {
  const variant = item.variants?.find((variant) => variant.id === item.variantId);
  return variant ? getCartVariantLabel(variant) : (item.size ?? item.sku);
}
