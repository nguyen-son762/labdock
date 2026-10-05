export function RfqsSummary({ total }: { total: number }) {
  return (
    <dl className="flex h-11 items-center justify-between rounded bg-gradient-to-r from-[#164990] to-[#2f7bc4] px-3 text-white shadow-sm sm:w-[260px]">
      <dt className="text-sm">Total RFQs</dt>
      <dd className="font-semibold">{total}</dd>
    </dl>
  );
}
