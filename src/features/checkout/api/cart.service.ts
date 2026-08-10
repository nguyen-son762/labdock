import { checkoutItems } from "../data/checkout-data";
import {
  addCartItemSchema,
  cartItemsSchema,
  removeCartItemSchema,
  updateCartItemSchema,
  type AddCartItemInput,
  type CartItem,
  type RemoveCartItemInput,
  type UpdateCartItemInput,
} from "../schemas/cart.schema";

const MOCK_DELAY_MS = 300;

let mockCart = cartItemsSchema.parse(checkoutItems);

function waitForMockApi(): Promise<void> {
  return new Promise((resolve) => globalThis.setTimeout(resolve, MOCK_DELAY_MS));
}

function cloneCart(): CartItem[] {
  return cartItemsSchema.parse(mockCart.map((item) => ({ ...item })));
}

export const cartService = {
  async get(): Promise<CartItem[]> {
    await waitForMockApi();
    return cloneCart();
  },

  async add(input: AddCartItemInput): Promise<CartItem[]> {
    const parsed = addCartItemSchema.parse(input);
    await waitForMockApi();
    const existingItem = mockCart.find((item) => item.id === parsed.id);
    mockCart = existingItem
      ? mockCart.map((item) =>
          item.id === parsed.id ? { ...parsed, quantity: Math.min(999, item.quantity + parsed.quantity) } : item,
        )
      : [...mockCart, parsed];
    return cloneCart();
  },

  async update(input: UpdateCartItemInput): Promise<CartItem[]> {
    const parsed = updateCartItemSchema.parse(input);
    await waitForMockApi();
    mockCart = mockCart.map((item) => (item.id === parsed.itemId ? { ...item, ...parsed } : item));
    return cloneCart();
  },

  async remove(input: RemoveCartItemInput): Promise<CartItem[]> {
    const parsed = removeCartItemSchema.parse(input);
    await waitForMockApi();
    mockCart = mockCart.filter((item) => item.id !== parsed.itemId);
    return cloneCart();
  },

  reset(): void {
    mockCart = cartItemsSchema.parse(checkoutItems);
  },
};
