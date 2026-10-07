import { TickCircle } from "iconsax-reactjs";

import { advantages } from "../about.data";
import { useTranslations } from "next-intl";

export function AboutValues() {
  const t = useTranslations("About");
  const advantageKeys = ["advantage1", "advantage2", "advantage3", "advantage4"] as const;
  return (
    <section className="rounded-lg bg-white p-4" aria-labelledby="about-values-title">
      <h2 id="about-values-title" className="text-[28px] font-semibold leading-tight text-[#0f3678] sm:text-[32px]">
        {t("whyChoose")}
      </h2>
      <ul className="mt-4 space-y-4">
        {advantages.map((advantage, index) => (
          <li key={`${advantage.title}-${index}`} className="flex items-start gap-1">
            <TickCircle className="mt-0.5 size-5 shrink-0 text-[#12b76a]" aria-hidden="true" />
            <p className="leading-5 text-[#2e3038]">
              <strong className="text-base font-semibold leading-6 text-[#1f5fa8]">{t(advantageKeys[index] ?? "advantage1")}</strong>{" "}
              <span className="text-sm">{t(`${advantageKeys[index] ?? "advantage1"}Description`)}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
