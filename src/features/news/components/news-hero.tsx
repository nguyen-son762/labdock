import Image from "next/image";
import { useTranslations } from "next-intl";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export function NewsHero() {
  const t = useTranslations("News");
  return (
    <section className="relative isolate min-h-[197px] overflow-hidden px-5 py-8 sm:px-10">
      <Image
        src="/news/news-header.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="mx-auto flex max-w-[472px] flex-col items-center gap-4 text-center">
        <Breadcrumbs items={[{ label: t("home"), href: "/" }, { label: t("title") }]} />
        <div className="space-y-3">
          <h1 className="text-[32px] font-semibold leading-none text-[#0f3678]">{t("title")}</h1>
          <p className="text-sm leading-5 text-[#051a50]">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
