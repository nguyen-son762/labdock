import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartQueryKeys } from "./cart-query-keys";
import { cartService } from "./cart.service";
import type { CartItem } from "../schemas/cart.schema";

export function useAddCartItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.add,
    onSuccess: (_, input) => {
      queryClient.setQueryData<CartItem[]>(cartQueryKeys.detail(), (cart = []) => {
        const existing = cart.find((item) => item.id === input.id);
        if (!existing) return [...cart, input];

        return cart.map((item) =>
          item.id === input.id
            ? {
                ...item,
                ...input,
                quantity: Math.min(item.stockQty ?? 999_999, item.quantity + input.quantity),
              }
            : item,
        );
      });
    },
  });
}
