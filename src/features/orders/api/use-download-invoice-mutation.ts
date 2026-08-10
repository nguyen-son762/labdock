import { useMutation } from "@tanstack/react-query";

import { ordersService } from "./orders.service";

export function useDownloadInvoiceMutation() {
  return useMutation({ mutationFn: ordersService.downloadInvoice, retry: false });
}
