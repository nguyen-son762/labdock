import { httpClient } from "@/lib/http-client";

import {
  addCartItemSchema,
  cartResponseSchema,
  removeCartItemSchema,
  updateCartItemSchema,
  type AddCartItemInput,
  type CartItem,
  type RemoveCartItemInput,
  type UpdateCartItemInput,
} from "../schemas/cart.schema";

function mapCartResponse(input: unknown): CartItem[] {
  const cart = cartResponseSchema.parse(input);
  return cart.items.map((item) => ({
    id: item.id,
    variantId: item.variantId,
    productId: item.productId,
    name: item.productName,
    catalogNumber: item.sku,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    currency: item.currency,
    lineTotal: item.lineTotal,
    stockQty: item.stockQty,
  }));
}

export const cartService = {
  async get(signal?: AbortSignal): Promise<CartItem[]> {
    const response = await httpClient.get<unknown>("/cart", { signal });
    return mapCartResponse(response.data);
  },

  async add(input: AddCartItemInput): Promise<CartItem[]> {
    const body = addCartItemSchema.parse(input);
    const response = await httpClient.post<unknown>("/cart/items", body);
    return mapCartResponse(response.data);
  },

  async update(input: UpdateCartItemInput): Promise<CartItem[]> {
    const { itemId, ...body } = updateCartItemSchema.parse(input);
    const response = await httpClient.patch<unknown>(`/cart/items/${encodeURIComponent(itemId)}`, body);
    return mapCartResponse(response.data);
  },

  async remove(input: RemoveCartItemInput): Promise<void> {
    const { itemId } = removeCartItemSchema.parse(input);
    await httpClient.delete(`/cart/items/${encodeURIComponent(itemId)}`);
  },
};
