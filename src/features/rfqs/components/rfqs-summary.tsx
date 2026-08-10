import type { RfqListResponse } from "../schemas/rfq.schema";

export function RfqsSummary({ summary }: { summary: RfqListResponse["summary"] }) {
  const items = [
    { label: "Total RFQs", value: summary.totalRfqs, active: true },
    { label: "Quoted", value: summary.quoted },
    { label: "Pending", value: summary.pending },
  ];

  return (
    <dl className="grid gap-2 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className={
            item.active
              ? "flex h-11 items-center justify-between rounded bg-gradient-to-r from-[#164990] to-[#2f7bc4] px-3 text-white shadow-sm"
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
