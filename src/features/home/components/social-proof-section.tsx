import { ServiceGuarantees } from "@/components/shared/service-guarantees";

import { partnerNames, testimonials } from "../data/home-data";
import { TestimonialCarousel } from "./testimonial-carousel";

export function SocialProofSection() {
  return (
    <>
      <section id="research-leaders" className="bg-[#f5f8fb] py-16" aria-labelledby="research-leaders-title">
        <div className="container">
          <h2 id="research-leaders-title" className="text-center text-2xl font-semibold text-[#051a50]">
            Trusted by 500+ Research Leaders
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6" aria-label="Partners">
            {partnerNames.map((name, index) => (
              <div key={name} className="flex h-[70px] items-center justify-center gap-2 rounded-lg bg-white/60 px-3">
                <span
                  className="size-5 rounded-md"
                  style={{
                    backgroundColor: ["#4685f5", "#ed3f88", "#7639d6", "#101828", "#f59e0b", "#5687ef"][index % 6],
                    transform: `rotate(${(index % 3) * 15}deg)`,
                  }}
                  aria-hidden="true"
                />
                <strong className="whitespace-nowrap text-sm text-[#171a21]">{name}</strong>
              </div>
            ))}
          </div>

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <ServiceGuarantees />
    </>
  );
}
