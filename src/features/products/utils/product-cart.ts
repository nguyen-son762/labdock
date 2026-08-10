import type { AddCartItemInput } from "@/features/checkout";

import type { Product } from "../products.types";

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ""));
}

export function createCartItemFromProduct(
  product: Product,
  options: { quantity: number; size: string },
): AddCartItemInput {
  return {
    id: product.id,
    name: product.name,
    catalogNumber: product.catalogNumber,
    image: product.image,
    unitPrice: parsePrice(product.price),
    originalPrice: product.originalPrice ? parsePrice(product.originalPrice) : undefined,
    quantity: options.quantity,
    size: options.size,
  };
}
