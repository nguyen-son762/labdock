import { ArrowLeft, ArrowRight, Award, BoxTick, DocumentText, MoneyChange, Star1, TruckFast } from "iconsax-reactjs";
import Image from "next/image";

import { partnerNames, testimonials } from "../data/home-data";

const proofCopy =
  "\"The iD-Centrifuge series has significantly improved our lab's workflow efficiency. The precision and consistency we've seen since switching are remarkable.\"";

const trustFeatures = [
  {
    title: "Lab Verified Products",
    description: "Ensuring authentic products and high standards.",
    icon: BoxTick,
  },
  {
    title: "COA / SDS Available",
    description: "Standardized technical information for all orders.",
    icon: DocumentText,
  },
  {
    title: "Rapid Delivery",
    description: "Fast fulfillment to enhance research efficiency (SG 1-2 days)",
    icon: TruckFast,
  },
  {
    title: "Bulk Pricing Available",
    description: "Scalable procurement solutions for laboratories.",
    icon: MoneyChange,
  },
  {
    title: "S5G & CSBE Certified",
    description: "Committed to global standards and compliance.",
    icon: Award,
  },
] as const;

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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {testimonials.map((testimonial) => (
              <article
                key={`${testimonial.name}-${testimonial.image}`}
                className="overflow-hidden rounded-lg border bg-white p-1"
              >
                <div className="relative aspect-[29/20] overflow-hidden rounded-md">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name} in a laboratory`}
                    fill
                    unoptimized
                    sizes="(min-width: 1280px) 290px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="flex items-center text-xs font-medium text-[#051a50]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star1 key={index} className="size-3.5 text-[#e57a00]" variant="Bold" aria-hidden="true" />
                    ))}
                    <span className="ml-1">5.0</span>
                  </p>
                  <blockquote className="mt-3 text-xs leading-[18px] text-[#303647]">{proofCopy}</blockquote>
                  <p className="mt-3 text-sm font-semibold text-[#051a50]">{testimonial.name}</p>
                  <p className="text-[10px] text-[#5e6375]">{testimonial.role}</p>
                  <p className="text-[9px] text-[#868da5]">{testimonial.company}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-16" aria-hidden="true">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#164990] text-white">
              <ArrowLeft className="size-4" />
            </span>
            <span className="h-2 w-9 rounded-full bg-[#9fd0f2]" />
            <span className="flex size-8 items-center justify-center rounded-full bg-[#f38b00] text-white">
              <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f8fb] py-10" aria-label="Labdock service guarantees">
        <div className="container grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
          {trustFeatures.map(({ title, description, icon: Icon }) => (
            <article key={title} className="text-center">
              <Icon className="mx-auto size-10 text-[#299a86]" variant="Bulk" aria-hidden="true" />
              <h2 className="mt-4 text-sm font-semibold text-[#051a50]">{title}</h2>
              <p className="mx-auto mt-1 max-w-[220px] text-xs leading-[18px] text-[#73798f]">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
