import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartQueryKeys } from "./cart-query-keys";
import { cartService } from "./cart.service";

export function useRemoveCartItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartService.remove,
    onSuccess: (cart) => queryClient.setQueryData(cartQueryKeys.detail(), cart),
  });
}
