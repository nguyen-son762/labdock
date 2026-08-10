import { TruckFast } from "iconsax-reactjs";
import Image from "next/image";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";

const metrics = [
  { value: "< 10,000+", label: "Lab products" },
  { value: "350+", label: "Verified suppliers" },
  { value: "200+", label: "Research institutions" },
] as const;

export function AboutHero() {
  return (
    <section className="relative h-[610px] overflow-hidden bg-[#eaf7ff] xl:h-[360px]" aria-labelledby="about-title">
      <Image src="/about/about-hero-bg.png" alt="" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="relative mx-auto h-full w-[calc(100%_-_40px)] max-w-[1240px] sm:w-[calc(100%_-_64px)] xl:w-[calc(100%_-_80px)]">
        <div className="relative z-10 flex w-full max-w-[472px] flex-col items-start pt-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About us" }]} />
          <h1 id="about-title" className="mt-3 text-[32px] font-semibold leading-none text-[#0f3678]">
            About Labdock
          </h1>
          <p className="mt-3 text-sm leading-5 text-[#051a50]">Your B2B bio procurement platform</p>

          <div className="mt-4 w-full rounded-2xl border border-white bg-gradient-to-b from-white to-white/50 px-2 py-4">
            <dl className="grid grid-cols-3 text-center">
              {metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={index < metrics.length - 1 ? "border-r border-[#e9eaeb]" : undefined}
                >
                  <dt className="text-xl font-semibold leading-[30px] text-[#1f5fa8]">{metric.value}</dt>
                  <dd className="text-xs leading-5 text-[#051a50] sm:text-sm">{metric.label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex items-center justify-center gap-1 border-t border-[#e9eaeb] pt-3 text-[#051a50]">
              <TruckFast className="size-5 text-[#ffc700]" variant="Bold" aria-hidden="true" />
              <strong className="text-lg font-semibold leading-[30px] text-[#1f5fa8]">24-48h</strong>
              <span className="text-sm">Fast delivery</span>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-4 right-1/2 h-[290px] w-[438px] translate-x-1/2 xl:-right-[22px] xl:bottom-auto xl:top-[-1px] xl:h-[361px] xl:w-[575px] xl:translate-x-0">
          <Image
            src="/about/about-hero-equipment.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1280px) 575px, 438px"
            className="scale-[1.23] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
