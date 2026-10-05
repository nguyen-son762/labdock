import { cn } from "@/lib/class-names";

import type { RfqStatus } from "../schemas/rfq.schema";

const statusStyles: Record<string, string> = {
  submitted: "bg-[#eaf3ff] text-[#1f5fa8]",
  quoted: "bg-[#f1edff] text-[#6535ff]",
  pending: "bg-[#fffbb7] text-[#88580b]",
  declined: "bg-[#ecf0f3] text-[#051a50]",
  accepted: "bg-[#d9f2e1] text-[#217a4f]",
  expired: "bg-[#fff0f1] text-[#e81643]",
  cancelled: "bg-[#fff0f1] text-[#e81643]",
};

export function RfqStatusBadge({ status }: { status: RfqStatus }) {
  const normalizedStatus = status
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");
  const className = statusStyles[normalizedStatus] ?? "bg-[#ecf0f3] text-[#596579]";

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium", className)}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}
