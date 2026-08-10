import { useQuery } from "@tanstack/react-query";

import { cartQueryKeys } from "./cart-query-keys";
import { cartService } from "./cart.service";

export function useCartQuery() {
  return useQuery({ queryKey: cartQueryKeys.detail(), queryFn: cartService.get, staleTime: 30_000 });
}
