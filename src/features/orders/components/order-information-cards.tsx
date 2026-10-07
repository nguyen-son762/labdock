import { Calendar2, MessageText1, TruckFast } from "iconsax-reactjs";
import { useTranslations } from "next-intl";

import { Card } from "@/components/ui/card";

import type { OrderDetail } from "../schemas/order.schema";
import { formatCurrency, formatOrderDate } from "../utils/order-formatters";

export function OrderInformationCards({ order }: { order: OrderDetail }) {
  const t = useTranslations("Orders");
  let shippingSnapshot = order.shippingSnapshotJson;
  try {
    shippingSnapshot = JSON.stringify(JSON.parse(order.shippingSnapshotJson) as unknown, null, 2);
  } catch {
    // Keep the original snapshot visible if the API value isn't valid JSON.
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="overflow-hidden border-[#dde2e8] shadow-none">
        <h2 className="flex items-center gap-2 border-b border-[#dde2e8] px-4 py-3 text-lg font-semibold text-[#1f5fa8]">
          <TruckFast className="size-5" aria-hidden="true" /> {t("shippingDetails")}
        </h2>
        <div className="p-4">
          {order.shippingSnapshotJson ? (
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-[#f5f7f8] p-3 font-sans text-sm leading-6 text-[#051a50]">
              {shippingSnapshot}
            </pre>
          ) : (
            <p className="text-sm text-[#73798f]">{t("noShippingDetails")}</p>
          )}
        </div>
      </Card>
      <Card className="overflow-hidden border-[#dde2e8] shadow-none">
        <h2 className="flex items-center gap-2 border-b border-[#dde2e8] px-4 py-3 text-lg font-semibold text-[#1f5fa8]">
          <MessageText1 className="size-5" aria-hidden="true" /> {t("invoice")}
        </h2>
        <dl className="space-y-3 p-4 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-[#73798f]">{t("invoiceOrderNumber")}</dt>
            <dd className="text-right font-medium text-[#051a50]">#{order.invoice.orderNumber}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#73798f]">{t("buyerEmail")}</dt>
            <dd className="break-all text-right font-medium text-[#051a50]">{order.invoice.buyerEmail}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="flex items-center gap-1 text-[#73798f]">
              <Calendar2 className="size-4" aria-hidden="true" /> {t("created")}
            </dt>
            <dd className="text-right text-[#051a50]">{formatOrderDate(order.invoice.createdAt)}</dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-[#dde2e8] pt-3">
            <dt className="text-[#73798f]">{t("invoiceStatus")}</dt>
            <dd className="font-medium text-[#051a50]">{order.invoice.status}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#73798f]">{t("invoiceTotal")}</dt>
            <dd className="font-semibold text-[#164990]">
              {formatCurrency(order.invoice.total, order.invoice.currency)}
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
