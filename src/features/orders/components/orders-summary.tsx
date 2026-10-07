import { useTranslations } from "next-intl";

export function OrdersSummary({ total }: { total: number }) {
  const t = useTranslations("Orders");
  return (
    <dl className="flex h-11 items-center justify-between rounded bg-[#2f7bc4] px-3 text-white shadow-sm sm:w-[260px]">
      <dt className="text-sm">{t("totalOrders")}</dt>
      <dd className="font-semibold">{total}</dd>
    </dl>
  );
}
