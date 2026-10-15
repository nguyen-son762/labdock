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

export const cartService = {
  async get(signal?: AbortSignal): Promise<CartItem[]> {
    const response = await httpClient.get<unknown>("/cart", { signal });
    return cartResponseSchema.parse(response.data).items;
  },

  async add(input: AddCartItemInput): Promise<CartItem[]> {
    const body = addCartItemSchema.parse(input);
    const response = await httpClient.post<unknown>("/cart/items", body);
    return cartResponseSchema.parse(response.data).items;
  },

  async update(input: UpdateCartItemInput): Promise<CartItem[]> {
    const { itemId, ...body } = updateCartItemSchema.parse(input);
    const response = await httpClient.patch<unknown>(`/cart/items/${encodeURIComponent(itemId)}`, body);
    return cartResponseSchema.parse(response.data).items;
  },

  async remove(input: RemoveCartItemInput): Promise<void> {
    const { itemId } = removeCartItemSchema.parse(input);
    await httpClient.delete(`/cart/items/${encodeURIComponent(itemId)}`);
  },
};
