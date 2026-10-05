import type { AddCartItemInput } from "@/features/checkout";

import type { Product } from "../products.types";
import { getDefaultProductVariant } from "./product-display";

export function createCartItemFromProduct(
  product: Product,
  options: { quantity: number; variantId?: string },
): AddCartItemInput {
  const variant = product.variants.find((item) => item.id === options.variantId) ?? getDefaultProductVariant(product);

  if (!variant) throw new Error("A product variant is required to add this product to the cart.");

  return {
    variantId: variant.id,
    quantity: options.quantity,
  };
}
