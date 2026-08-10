import { useQuery } from "@tanstack/react-query";

import { rfqKeys } from "./rfq-query-keys";
import { rfqsService } from "./rfqs.service";

export function useRfqDetailQuery(rfqId: string) {
  return useQuery({
    queryKey: rfqKeys.detail(rfqId),
    queryFn: ({ signal }) => rfqsService.getById(rfqId, signal),
    staleTime: 30_000,
  });
}
