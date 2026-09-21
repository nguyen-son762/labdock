import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartQueryKeys } from "./cart-query-keys";
import { cartService } from "./cart.service";
import type { CartItem } from "../schemas/cart.schema";

export function useUpdateCartItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartService.update,
    onSuccess: (_, input) => {
      queryClient.setQueryData<CartItem[]>(cartQueryKeys.detail(), (cart = []) =>
        cart.map((item) => {
          if (item.id !== input.itemId) return item;
          const quantity = input.quantity ?? item.quantity;
          return {
            ...item,
            ...input,
            quantity,
            lineTotal: item.lineTotal === undefined ? undefined : item.unitPrice * quantity,
          };
        }),
      );
    },
  });
}
