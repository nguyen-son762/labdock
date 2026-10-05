import { ServiceGuarantees } from "@/components/shared/service-guarantees";
import type { Brand } from "@/features/brands";
import Image from "next/image";
import { useTranslations } from "next-intl";

import type { Testimonial } from "../home.types";
import { TestimonialCarousel } from "./testimonial-carousel";

export function SocialProofSection({
  brands,
  testimonials,
}: {
  brands: readonly Brand[];
  testimonials: readonly Testimonial[];
}) {
  const t = useTranslations("Home");

  return (
    <>
      {brands.length ? (
        <section
          id="research-leaders"
          className="relative overflow-hidden bg-[#f5f8fb] pt-14 sm:pt-16"
          aria-labelledby="research-leaders-title"
        >
          <span
            className="pointer-events-none absolute -left-20 -top-24 size-52 rounded-full border-[18px] border-[#d8e3ef]/70 bg-white/70 blur-md"
            aria-hidden="true"
          />
          <div className="container relative">
            <h2 id="research-leaders-title" className="text-center text-2xl font-semibold text-[#0b2860] sm:text-2xl">
              {t("trusted")}
            </h2>

            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3  lg:grid-cols-6">
              {brands.map((brand) => {
                const content = (
                  <span className="flex min-w-0 items-center justify-center gap-2">
                    <Image
                      src={brand.logoUrl}
                      alt=""
                      width={132}
                      height={32}
                      unoptimized
                      className="w-[132px] h-[32px] shrink-0 object-contain"
                    />
                  </span>
                );

                return (
                  <li key={brand.id}>
                    {brand.websiteUrl ? (
                      <a
                        href={brand.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={t("visitBrandWebsite", { name: brand.name })}
                        className="flex h-[100px] items-center justify-center rounded-xl bg-white/30 hover:bg-white px-4 transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-[80px]"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex h-[100px] items-center justify-center rounded-xl hover:bg-white/55 px-4 sm:h-[80px] bg-white/30 hover:bg-white">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {testimonials.length ? (
        <section className="bg-[#f5f8fb] pt-6" aria-labelledby="research-testimonials-title">
          <div className="container">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      ) : null}

      <ServiceGuarantees />
    </>
  );
}
