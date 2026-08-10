import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { RfqFilters } from "../schemas/rfq.schema";
import { rfqKeys } from "./rfq-query-keys";
import { rfqsService } from "./rfqs.service";

export function useRfqsQuery(filters: RfqFilters) {
  return useQuery({
    queryKey: rfqKeys.list(filters),
    queryFn: ({ signal }) => rfqsService.list(filters, signal),
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  });
}
