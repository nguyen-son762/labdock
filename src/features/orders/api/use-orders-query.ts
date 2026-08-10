import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { OrderFilters } from "../schemas/order.schema";
import { orderKeys } from "./order-query-keys";
import { ordersService } from "./orders.service";

export function useOrdersQuery(filters: OrderFilters) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: ({ signal }) => ordersService.list(filters, signal),
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  });
}
