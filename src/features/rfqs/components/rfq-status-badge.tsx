import { cn } from "@/lib/class-names";

import type { RfqStatus } from "../schemas/rfq.schema";

const statusConfig = {
  quoted: { label: "Quoted", className: "bg-[#f1edff] text-[#6535ff]", dot: "bg-[#6535ff]" },
  pending: { label: "Pending", className: "bg-[#fffbb7] text-[#88580b]", dot: "bg-[#c7930a]" },
  declined: { label: "Declined", className: "bg-[#ecf0f3] text-[#051a50]", dot: "bg-[#164990]" },
  accepted: { label: "Accepted", className: "bg-[#d9f2e1] text-[#217a4f]", dot: "bg-[#279968]" },
  expired: { label: "Expired", className: "bg-[#fff0f1] text-[#e81643]", dot: "bg-[#f04468]" },
} satisfies Record<RfqStatus, { label: string; className: string; dot: string }>;

export function RfqStatusBadge({ status }: { status: RfqStatus }) {
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
