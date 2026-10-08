import { ServiceGuarantees } from "@/components/shared/service-guarantees";
import { useTranslations } from "next-intl";

import type { Testimonial } from "../home.types";
import { ResearchLeadersCarousel } from "./research-leaders-carousel";
import { TestimonialCarousel } from "./testimonial-carousel";

export function SocialProofSection({ testimonials }: { testimonials: readonly Testimonial[] }) {
  const t = useTranslations("Home");

  return (
    <>
      <section
        id="research-leaders"
        className="relative overflow-hidden bg-[#f5f8fb] pt-14 sm:pt-16"
        aria-labelledby="research-leaders-title"
      >
        <span
          className="pointer-events-none absolute -left-20 -top-24 size-52 rounded-full border-[18px] border-[#d8e3ef]/70 bg-white/70 blur-md"
          aria-hidden="true"
        />
        <div className="container">
          <h2 id="research-leaders-title" className="text-center text-2xl font-semibold text-[#0b2860]">
            {t("trusted")}
          </h2>
          <ResearchLeadersCarousel label={t("trusted")} />
        </div>
      </section>

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
