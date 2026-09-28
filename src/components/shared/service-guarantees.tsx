import { Award, BoxTick, DocumentText, MoneyChange, TruckFast } from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import Image from "next/image";

const guarantees = [
  { key: "verified", icon: BoxTick, imageUrl: "/home/icon/service/delivery.svg" },
  { key: "documents", icon: DocumentText, imageUrl: "/home/icon/service/awards_2.svg" },
  { key: "delivery", icon: TruckFast, imageUrl: "/home/icon/service/truck_1.svg" },
  { key: "pricing", icon: MoneyChange, imageUrl: "/home/icon/service/money.svg" },
  { key: "certified", icon: Award, imageUrl: "/home/icon/service/awards_1.svg" },
] as const;

export function ServiceGuarantees() {
  const t = useTranslations("ServiceGuarantees");

  return (
    <section className="bg-[#f5f8fb] py-12" aria-label={t("label")}>
      <div className="container grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {guarantees.map(({ key, icon: Icon, imageUrl }) => (
          <article key={key} className="text-center">
            <div className="flex justify-center">
              <Image src={imageUrl} alt="" width={40} height={40} />
            </div>
            <h2 className="mt-4 text-sm font-semibold text-[#051a50]">{t(`${key}Title`)}</h2>
            <p className="mx-auto mt-1 max-w-[220px] text-xs leading-[18px] text-[#73798f]">{t(`${key}Description`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
