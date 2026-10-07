import Image from "next/image";
import { useTranslations } from "next-intl";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export function ContactHero() {
  const t = useTranslations("Contact");
  return (
    <section className="relative flex h-[193px] items-center justify-center overflow-hidden px-5 text-center">
      <Image
        src="/contact/contact-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="relative flex max-w-[472px] flex-col items-center">
        <Breadcrumbs items={[{ label: t("home"), href: "/" }, { label: t("title") }]} />
        <h1 className="mt-3 text-[32px] font-semibold leading-none text-[#0f3678]">{t("title")}</h1>
        <p className="mt-4 text-sm leading-5 text-[#051a50]">
          {t("heroDescription")}
        </p>
      </div>
    </section>
  );
}
