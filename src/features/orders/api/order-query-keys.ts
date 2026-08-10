import type { OrderFilters } from "../schemas/order.schema";

export const orderKeys = {
  all: ["session", "orders"] as const,
  list: (filters: OrderFilters) => [...orderKeys.all, "list", filters] as const,
  detail: (id: string) => [...orderKeys.all, "detail", id] as const,
};
