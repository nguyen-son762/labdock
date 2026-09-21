import { z } from "zod";

const guidSchema = z.string().regex(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i, "Invalid identifier.");

export const cartApiItemSchema = z.object({
  id: guidSchema,
  variantId: guidSchema,
  productId: guidSchema,
  productName: z.string().min(1),
  sku: z.string().min(1),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
  currency: z.string().length(3),
  lineTotal: z.number().nonnegative(),
  stockQty: z.number().int().nonnegative(),
});

export const cartResponseSchema = z.object({
  id: guidSchema,
  items: z.array(cartApiItemSchema),
  subtotal: z.number().nonnegative(),
  currency: z.string().length(3),
  updatedAt: z.iso.datetime({ offset: true }),
});

export const cartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  catalogNumber: z.string().min(1),
  image: z.string().startsWith("/").optional(),
  unitPrice: z.number().nonnegative(),
  originalPrice: z.number().positive().optional(),
  quantity: z.number().int().min(1).max(999_999),
  size: z.string().min(1).optional(),
  variantId: z.string().optional(),
  productId: z.string().optional(),
  currency: z.string().length(3).optional(),
  lineTotal: z.number().nonnegative().optional(),
  stockQty: z.number().int().nonnegative().optional(),
});

export const cartItemsSchema = z.array(cartItemSchema);

export const updateCartItemSchema = z.object({
  itemId: z.string().min(1),
  quantity: z.number().int().min(1).max(999_999).optional(),
  size: z.string().min(1).optional(),
});

export const removeCartItemSchema = z.object({ itemId: z.string().min(1) });
export const addCartItemSchema = cartItemSchema.extend({ size: z.string().min(1) });

export type CartApiItem = z.infer<typeof cartApiItemSchema>;
export type CartResponse = z.infer<typeof cartResponseSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type AddCartItemInput = z.infer<typeof addCartItemSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type RemoveCartItemInput = z.infer<typeof removeCartItemSchema>;
