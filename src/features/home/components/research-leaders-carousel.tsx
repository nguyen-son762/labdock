"use client";

import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SwiperNavigation } from "@/components/ui/swiper-navigation";

import { researchLeaders } from "../research-leaders";

import "swiper/css";

export function ResearchLeadersCarousel({ label }: { label: string }) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [edges, setEdges] = useState({ beginning: true, end: false });
  const updateEdges = (instance: SwiperInstance) => {
    setEdges({ beginning: instance.isBeginning, end: instance.isEnd });
  };

  return (
    <div className="mt-8">
      <Swiper
        modules={[A11y, Autoplay, Keyboard]}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        slidesPerView="auto"
        spaceBetween={16}
        watchOverflow
        keyboard={{ enabled: true, onlyInViewport: true }}
        a11y={{ containerMessage: `${label} carousel` }}
        breakpoints={{ 640: { enabled: false, spaceBetween: 0 } }}
        wrapperTag="ul"
        wrapperClass="sm:!grid sm:!grid-cols-3 sm:!gap-4 sm:!transform-none lg:!grid-cols-6"
        className="rounded-xl"
        onSwiper={(instance) => {
          setSwiper(instance);
          updateEdges(instance);
          if (!instance.enabled) instance.autoplay.stop();
        }}
        onSlideChange={updateEdges}
        onReachBeginning={updateEdges}
        onReachEnd={updateEdges}
        onFromEdge={updateEdges}
        onBreakpoint={(instance, params) => {
          updateEdges(instance);
          if (params.enabled === false) instance.autoplay.stop();
          else instance.autoplay.start();
        }}
        onResize={updateEdges}
      >
        {researchLeaders.map((leader) => (
          <SwiperSlide key={leader.name} tag="li" className="!w-[194.5px] sm:!mr-0 sm:!w-auto">
            <div className="flex h-[100px] min-w-0 items-center justify-center rounded-lg bg-white/30 px-4 transition-colors hover:bg-white">
              <Image
                src={leader.logoUrl}
                alt={leader.name}
                width={leader.width}
                height={leader.height}
                loading="eager"
                unoptimized
                className="h-8 max-w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
        <SwiperNavigation
          label={label}
          previousDisabled={!swiper || edges.beginning}
          nextDisabled={!swiper || edges.end}
          onPrevious={() => swiper?.slidePrev()}
          onNext={() => swiper?.slideNext()}
        />
      </div>
    </div>
  );
}
