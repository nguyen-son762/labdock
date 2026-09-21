import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartQueryKeys } from "./cart-query-keys";
import { cartService } from "./cart.service";
import type { CartItem } from "../schemas/cart.schema";

export function useRemoveCartItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartService.remove,
    onSuccess: (_, input) => {
      queryClient.setQueryData<CartItem[]>(cartQueryKeys.detail(), (cart = []) =>
        cart.filter((item) => item.id !== input.itemId),
      );
    },
  });
}
