import { cn } from "@/lib/class-names";

import type { OrderStatus } from "../schemas/order.schema";

const statusConfig = {
  "awaiting-shipment": { label: "Awaiting shipment", className: "bg-[#fffbb7] text-[#88580b]", dot: "bg-[#c7930a]" },
  shipped: { label: "Shipped", className: "bg-[#f1edff] text-[#6535ff]", dot: "bg-[#6535ff]" },
  delivered: { label: "Delivered", className: "bg-[#d9f2e1] text-[#217a4f]", dot: "bg-[#279968]" },
  cancelled: { label: "Cancelled", className: "bg-[#fff0f1] text-[#e81643]", dot: "bg-[#f04468]" },
} satisfies Record<OrderStatus, { label: string; className: string; dot: string }>;

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium", config.className)}
    >
      <span className={cn("size-1.5 rounded-full", config.dot)} aria-hidden="true" />
      {config.label}
    </span>
  );
}

export function getOrderStatusLabel(status: OrderStatus) {
  return statusConfig[status].label;
}
