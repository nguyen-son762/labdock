"use client";

import { Star1 } from "iconsax-reactjs";
import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SwiperNavigation } from "@/components/ui/swiper-navigation";

import type { Testimonial } from "../home.types";

import "swiper/css";

const proofCopy =
  "\"The iD-Centrifuge series has significantly improved our lab's workflow efficiency. The precision and consistency we've seen since switching are remarkable.\"";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [edgeState, setEdgeState] = useState({ beginning: true, end: false });
  const updateEdges = (instance: SwiperInstance) => {
    setEdgeState({ beginning: instance.isBeginning, end: instance.isEnd });
  };

  return (
    <div className="mt-10">
      <Swiper
        modules={[A11y]}
        slidesPerView={1.1}
        spaceBetween={16}
        watchOverflow
        a11y={{ containerMessage: "Research leader testimonials" }}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
        onSwiper={(instance) => {
          setSwiper(instance);
          updateEdges(instance);
        }}
        onSlideChange={updateEdges}
        onBreakpoint={updateEdges}
        onResize={updateEdges}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={`${testimonial.name}-${testimonial.image}`} className="!h-auto">
            <article className="h-full overflow-hidden rounded-lg border bg-white p-1">
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
          </SwiperSlide>
        ))}
      </Swiper>
      <SwiperNavigation
        label="testimonials"
        className="mt-8"
        previousDisabled={!swiper || edgeState.beginning}
        nextDisabled={!swiper || edgeState.end}
        onPrevious={() => swiper?.slidePrev()}
        onNext={() => swiper?.slideNext()}
      />
    </div>
  );
}
