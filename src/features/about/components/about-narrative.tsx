import { useTranslations } from "next-intl";

export function AboutNarrative() {
  const t = useTranslations("About");
  const paragraphKeys = ["paragraph1", "paragraph2", "paragraph3"] as const;
  return (
    <div>
      <h2 className="text-[28px] font-semibold leading-[1.3125] text-[#0f3678] sm:text-[32px]">
        {t("narrativeHeading")}
      </h2>
      <div className="mt-3 text-base leading-6 text-[#2e3038]">
        {paragraphKeys.map((key) => (
          <p key={key}>{t(key)}</p>
        ))}
      </div>
    </div>
  );
}
