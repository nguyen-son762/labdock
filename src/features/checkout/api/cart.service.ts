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

const MOCK_DELAY_MS = 300;

function waitForMockApi(): Promise<void> {
  return new Promise((resolve) => globalThis.setTimeout(resolve, MOCK_DELAY_MS));
}

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

  async add(input: AddCartItemInput): Promise<void> {
    addCartItemSchema.parse(input);
    await waitForMockApi();
  },

  async update(input: UpdateCartItemInput): Promise<void> {
    updateCartItemSchema.parse(input);
    await waitForMockApi();
  },

  async remove(input: RemoveCartItemInput): Promise<void> {
    removeCartItemSchema.parse(input);
    await waitForMockApi();
  },
};
