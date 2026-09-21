import type { AddCartItemInput } from "@/features/checkout";

import type { Product, ProductViewModel } from "../products.types";
import { getDefaultProductVariant, getPrimaryProductImage, getProductVariantLabel } from "./product-display";

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ""));
}

export function createCartItemFromProductViewModel(
  product: ProductViewModel,
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

export function createCartItemFromProduct(
  product: Product,
  options: { quantity: number; variantId?: string },
): AddCartItemInput {
  const variant = product.variants.find((item) => item.id === options.variantId) ?? getDefaultProductVariant(product);

  if (!variant) throw new Error("A product variant is required to add this product to the cart.");

  const image = getPrimaryProductImage(product);

  return {
    id: product.id,
    name: product.name,
    catalogNumber: variant.sku || product.productNo,
    image: image.startsWith("/") ? image : undefined,
    unitPrice: variant.unitPrice,
    originalPrice: variant.rfqBasePrice > variant.unitPrice ? variant.rfqBasePrice : undefined,
    quantity: options.quantity,
    size: getProductVariantLabel(variant),
  };
}
