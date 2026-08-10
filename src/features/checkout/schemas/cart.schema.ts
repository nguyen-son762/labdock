import { z } from "zod";

export const cartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  catalogNumber: z.string().min(1),
  image: z.string().startsWith("/").optional(),
  unitPrice: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  quantity: z.number().int().min(1).max(999),
  size: z.string().min(1),
});

export const cartItemsSchema = z.array(cartItemSchema);

export const updateCartItemSchema = z.object({
  itemId: z.string().min(1),
  quantity: z.number().int().min(1).max(999).optional(),
  size: z.string().min(1).optional(),
});

export const removeCartItemSchema = z.object({ itemId: z.string().min(1) });
export const addCartItemSchema = cartItemSchema;

export type CartItem = z.infer<typeof cartItemSchema>;
export type AddCartItemInput = z.infer<typeof addCartItemSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type RemoveCartItemInput = z.infer<typeof removeCartItemSchema>;
