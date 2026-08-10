import { useMutation } from "@tanstack/react-query";

import { checkoutService } from "./checkout.service";

export function useCompletePaymentMutation() {
  return useMutation({ mutationFn: checkoutService.completePayment, retry: false });
}
