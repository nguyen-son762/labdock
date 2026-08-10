import { MoneyChange, TruckFast, Verify } from "iconsax-reactjs";
import Image from "next/image";

const benefits = [
  { label: "Verified Lab Products", icon: Verify },
  { label: "Fast Delivery", icon: TruckFast },
  { label: "Bulk Pricing Available", icon: MoneyChange },
] as const;

export function CatalogBanner() {
  return (
    <section
      className="relative isolate min-h-[300px] overflow-hidden bg-[#1f5fa8] text-white"
      aria-labelledby="catalog-banner-title"
    >
      <Image
        src="/products/catalog-banner.png"
        alt="Laboratory glassware arranged in a research lab"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[#1f5fa8]/65 mix-blend-hue" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#123f82]/90 via-[#2f7bc4]/55 to-transparent" />
      <div className="container flex min-h-[300px] flex-col justify-center py-8">
        <h1
          id="catalog-banner-title"
          className="text-3xl font-semibold tracking-tight sm:text-[40px] sm:leading-[48px]"
        >
          10,000 products
        </h1>
        <p className="mt-1 text-base sm:text-lg">Premium quality. Fast delivery. Ships 7-10 days</p>
        <div className="mt-5 flex w-fit max-w-full flex-wrap items-center gap-2 rounded-xl bg-white p-1.5 text-[#051a50] sm:rounded-full">
          {benefits.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex h-8 items-center gap-2 rounded-full px-2 text-xs font-medium sm:text-sm"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-[#eef8f5]">
                <Icon className="size-4 text-[#3eb584]" variant="Bold" aria-hidden="true" />
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
