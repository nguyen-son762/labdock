import { useMutation } from "@tanstack/react-query";

import { quoteService } from "./quote.service";

export function useSubmitQuoteMutation() {
  return useMutation({ mutationFn: quoteService.submit, retry: false });
}
