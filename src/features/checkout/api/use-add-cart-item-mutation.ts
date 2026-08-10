import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartQueryKeys } from "./cart-query-keys";
import { cartService } from "./cart.service";

export function useAddCartItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.add,
    onSuccess: (cart) => queryClient.setQueryData(cartQueryKeys.detail(), cart),
  });
}
