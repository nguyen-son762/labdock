import { cn } from "@/lib/class-names";

const statusConfig: Record<string, { label: string; className: string; dot: string }> = {
  draft: { label: "Draft", className: "bg-[#ecf0f3] text-[#596579]", dot: "bg-[#73798f]" },
  pending: { label: "Pending", className: "bg-[#fffbb7] text-[#88580b]", dot: "bg-[#c7930a]" },
  paid: { label: "Paid", className: "bg-[#d9f2e1] text-[#217a4f]", dot: "bg-[#279968]" },
  processing: { label: "Processing", className: "bg-[#eaf3ff] text-[#1f5fa8]", dot: "bg-[#1f5fa8]" },
  "awaiting-shipment": { label: "Awaiting shipment", className: "bg-[#fffbb7] text-[#88580b]", dot: "bg-[#c7930a]" },
  awaitingpayment: { label: "Awaiting payment", className: "bg-[#fffbb7] text-[#88580b]", dot: "bg-[#c7930a]" },
  shipped: { label: "Shipped", className: "bg-[#f1edff] text-[#6535ff]", dot: "bg-[#6535ff]" },
  delivered: { label: "Delivered", className: "bg-[#d9f2e1] text-[#217a4f]", dot: "bg-[#279968]" },
  completed: { label: "Completed", className: "bg-[#d9f2e1] text-[#217a4f]", dot: "bg-[#279968]" },
  cancelled: { label: "Cancelled", className: "bg-[#fff0f1] text-[#e81643]", dot: "bg-[#f04468]" },
  canceled: { label: "Cancelled", className: "bg-[#fff0f1] text-[#e81643]", dot: "bg-[#f04468]" },
};

export function OrderStatusBadge({ status }: { status: string }) {
  const normalizedStatus = status
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");
  const config = statusConfig[normalizedStatus] ??
    statusConfig[normalizedStatus.replaceAll("-", "")] ?? {
      label: status,
      className: "bg-[#ecf0f3] text-[#596579]",
      dot: "bg-[#73798f]",
    };
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium", config.className)}
    >
      <span className={cn("size-1.5 rounded-full", config.dot)} aria-hidden="true" />
      {config.label}
    </span>
  );
}

export function getOrderStatusLabel(status: string) {
  return (
    statusConfig[
      status
        .trim()
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
    ]?.label ?? status
  );
}
