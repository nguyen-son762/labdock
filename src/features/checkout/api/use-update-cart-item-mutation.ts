import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartQueryKeys } from "./cart-query-keys";
import { cartService } from "./cart.service";
export function useUpdateCartItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartService.update,
    retry: false,
    onSuccess: (items) => queryClient.setQueryData(cartQueryKeys.detail(), items),
  });
}
