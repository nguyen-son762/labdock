export function OrdersSummary({ total }: { total: number }) {
  return (
    <dl className="flex h-11 items-center justify-between rounded bg-[#2f7bc4] px-3 text-white shadow-sm sm:w-[260px]">
      <dt className="text-sm">Total orders</dt>
      <dd className="font-semibold">{total}</dd>
    </dl>
  );
}
