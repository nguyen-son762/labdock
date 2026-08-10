"use client";

import { DocumentDownload, Refresh2, TickCircle } from "iconsax-reactjs";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useDownloadInvoiceMutation } from "../api/use-download-invoice-mutation";
import type { OrderDetail } from "../schemas/order.schema";
import { formatCurrency, formatOrderDate } from "../utils/order-formatters";

export function OrderInformationCards({ order }: { order: OrderDetail }) {
  const downloadInvoice = useDownloadInvoiceMutation();

  function handleDownload() {
    downloadInvoice.mutate(order.payment.invoiceNumber, {
      onSuccess: (invoiceNumber) => {
        const url = URL.createObjectURL(new Blob([`Mock invoice ${invoiceNumber}`], { type: "text/plain" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = `${invoiceNumber}.txt`;
        link.click();
        URL.revokeObjectURL(url);
      },
    });
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="overflow-hidden border-[#dde2e8] shadow-none">
        <h2 className="border-b border-[#dde2e8] px-4 py-3 text-lg font-semibold text-[#1f5fa8]">Delivery address</h2>
        <div className="space-y-2 p-4 pt-6">
          <p className="font-semibold text-[#051a50]">
            {order.delivery.name} • {order.delivery.company}
          </p>
          <p className="max-w-sm text-[13px] leading-4 text-[#73798f]">{order.delivery.address}</p>
          <p className="text-[13px] text-[#73798f]">{order.delivery.phone}</p>
        </div>
      </Card>
      <Card className="overflow-hidden border-[#dde2e8] shadow-none">
        <h2 className="border-b border-[#dde2e8] px-4 py-3 text-lg font-semibold text-[#1f5fa8]">Payment</h2>
        <div className="p-4 pt-6">
          <div className="flex items-center gap-3">
            <span className="relative h-6 w-[34px] overflow-hidden rounded border border-[#ecf0f3] bg-white">
              <Image src="/orders/visa.svg" alt="Visa" fill sizes="34px" className="object-contain p-1" />
            </span>
            <strong className="text-[#051a50]">Visa ending {order.payment.cardLastFour}</strong>
          </div>
          <p className="ml-[46px] mt-2 text-[13px] text-[#73798f]">
            Charged {formatCurrency(order.total)} on {formatOrderDate(order.payment.chargedAt)}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#dde2e8] pt-4">
            <p className="font-medium text-[#051a50]">Invoice No.: #{order.payment.invoiceNumber}</p>
            <Button
              type="button"
              variant="ghost"
              className="h-8 px-0 font-normal text-[#164990]"
              disabled={downloadInvoice.isPending}
              onClick={handleDownload}
            >
              {downloadInvoice.isPending ? (
                <Refresh2 className="size-5 animate-spin" aria-hidden="true" />
              ) : downloadInvoice.isSuccess ? (
                <TickCircle className="size-5" aria-hidden="true" />
              ) : (
                <DocumentDownload className="size-5" aria-hidden="true" />
              )}
              {downloadInvoice.isPending ? "Preparing…" : downloadInvoice.isSuccess ? "Downloaded" : "Download invoice"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
