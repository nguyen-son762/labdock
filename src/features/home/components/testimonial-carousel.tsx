"use client";

import { Star1 } from "iconsax-reactjs";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SwiperNavigation } from "@/components/ui/swiper-navigation";

import type { Testimonial } from "../home.types";

import "swiper/css";

export function TestimonialCarousel({ testimonials }: { testimonials: readonly Testimonial[] }) {
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
          <SwiperSlide key={testimonial.id} className="!h-auto">
            <article className="flex h-full flex-col overflow-hidden rounded-lg border bg-white p-4">
              <p className="flex items-center text-xs font-medium text-[#051a50]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star1 key={index} className="size-3.5 text-[#e57a00]" variant="Bold" aria-hidden="true" />
                ))}
                <span className="ml-1">5.0</span>
              </p>
              <blockquote className="mt-3 flex-1 text-xs leading-[18px] text-[#303647]">
                “{testimonial.content}”
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-[#051a50]">{testimonial.author}</p>
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
