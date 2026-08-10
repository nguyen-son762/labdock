import type { RfqFilters } from "../schemas/rfq.schema";

export const rfqKeys = {
  all: ["session", "rfqs"] as const,
  list: (filters: RfqFilters) => [...rfqKeys.all, "list", filters] as const,
  detail: (id: string) => [...rfqKeys.all, "detail", id] as const,
};
