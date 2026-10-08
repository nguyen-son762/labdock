import { MoneyChange, TruckFast, Verify } from "iconsax-reactjs";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function CatalogBanner({ total }: { total: number }) {
  const t = useTranslations("Catalog");
  const benefits = [
    { label: t("verifiedProducts"), icon: Verify, tone: "green" },
    { label: t("fastDelivery"), icon: TruckFast, tone: "blue" },
    { label: t("bulkPricing"), icon: MoneyChange, tone: "orange" },
  ];
  return (
    <section
      className="relative isolate min-h-[300px] overflow-hidden bg-[#1f5fa8] text-white"
      aria-labelledby="catalog-banner-title"
    >
      <Image
        src="/products/catalog-banner.png"
        alt={t("bannerImageAlt")}
        fill
        priority
        unoptimized
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[#1f5fa8]/65 mix-blend-hue" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#2f7bc4] via-[#2f7bc4]/30 to-transparent" />
      <div className="container flex min-h-[300px] flex-col justify-center py-8">
        <h1
          id="catalog-banner-title"
          className="text-3xl font-semibold tracking-tight sm:text-[40px] sm:leading-[48px]"
        >
          {t("productCount", { count: total })}
        </h1>
        <p className="mt-1 text-base sm:text-lg">{t("banner")}</p>
        <div className="mt-5 flex w-fit max-w-full flex-wrap items-center gap-2 rounded-xl bg-white p-1.5 text-[#051a50] sm:rounded-full">
          {benefits.map(({ label, icon: Icon, tone }) => (
            <span
              key={label}
              className="inline-flex h-8 items-center gap-2 rounded-full px-2 text-xs font-medium sm:text-sm"
            >
              <span
                className={`flex size-8 items-center justify-center rounded-full ${
                  tone === "green" ? "bg-[#effaf3]" : tone === "blue" ? "bg-[#d1ecfa]" : "bg-[#fdefca]"
                }`}
              >
                <Icon
                  className={`size-5 ${tone === "green" ? "text-[#3eb584]" : tone === "blue" ? "text-[#1f5fa8]" : "text-[#e57a00]"}`}
                  variant="Bold"
                  aria-hidden="true"
                />
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
