import { Award, BoxTick, DocumentText, MoneyChange, TruckFast } from "iconsax-reactjs";
import { useTranslations } from "next-intl";

const guarantees = [
  { key: "verified", icon: BoxTick },
  { key: "documents", icon: DocumentText },
  { key: "delivery", icon: TruckFast },
  { key: "pricing", icon: MoneyChange },
  { key: "certified", icon: Award },
] as const;

export function ServiceGuarantees() {
  const t = useTranslations("ServiceGuarantees");

  return (
    <section className="bg-[#f5f8fb] py-12" aria-label={t("label")}>
      <div className="container grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {guarantees.map(({ key, icon: Icon }) => (
          <article key={key} className="text-center">
            <Icon className="mx-auto size-10 text-[#299a86]" variant="Bulk" aria-hidden="true" />
            <h2 className="mt-4 text-sm font-semibold text-[#051a50]">{t(`${key}Title`)}</h2>
            <p className="mx-auto mt-1 max-w-[220px] text-xs leading-[18px] text-[#73798f]">{t(`${key}Description`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
