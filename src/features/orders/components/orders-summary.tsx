import type { OrderListResponse } from "../schemas/order.schema";
import { formatCurrency } from "../utils/order-formatters";

export function OrdersSummary({ summary }: { summary: OrderListResponse["summary"] }) {
  const items = [
    { label: "Total spent", value: formatCurrency(summary.totalSpent), active: true },
    { label: "Total orders", value: summary.totalOrders },
    { label: "Awaiting shipment", value: summary.awaitingShipment },
    { label: "Shipped", value: summary.shipped },
    { label: "Delivered", value: summary.delivered },
  ];

  return (
    <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <div
          key={item.label}
          className={
            item.active
              ? "flex h-11 items-center justify-between rounded bg-[#2f7bc4] px-3 text-white shadow-sm"
              : "flex h-11 items-center justify-between rounded border border-[#dde2e8] bg-white px-3 text-[#051a50] shadow-sm"
          }
        >
          <dt className="text-sm">{item.label}</dt>
          <dd
            className={item.active ? "font-semibold" : "rounded-full bg-[#ecf0f3] px-2.5 py-1 text-xs text-[#73798f]"}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
