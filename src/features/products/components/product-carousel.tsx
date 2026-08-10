"use client";

import { useState } from "react";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

import { SwiperNavigation } from "@/components/ui/swiper-navigation";

import type { Product } from "../products.types";
import { ProductCard } from "./product-card";

import "swiper/css";

type ProductCarouselProps = {
  products: Product[];
  label: string;
  appearance?: "default" | "outstanding";
  tone?: "light" | "dark" | "orange";
  compact?: boolean;
};

export function ProductCarousel({
  products,
  label,
  appearance = "default",
  tone = "light",
  compact = false,
}: ProductCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [edgeState, setEdgeState] = useState({ beginning: true, end: false });
  const updateEdges = (instance: SwiperInstance) => {
    setEdgeState({ beginning: instance.isBeginning, end: instance.isEnd });
  };

  return (
    <div>
      <Swiper
        modules={[A11y]}
        slidesPerView={2}
        spaceBetween={12}
        watchOverflow
        a11y={{ containerMessage: `${label} carousel` }}
        breakpoints={
          compact
            ? { 640: { slidesPerView: 2 }, 900: { slidesPerView: 3 } }
            : { 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 }, 1280: { slidesPerView: 6 } }
        }
        onSwiper={(instance) => {
          setSwiper(instance);
          updateEdges(instance);
        }}
        onSlideChange={updateEdges}
        onBreakpoint={updateEdges}
        onResize={updateEdges}
      >
        {products.map((product, index) => (
          <SwiperSlide key={`${label}-${product.id}-${index}`} className="!h-auto">
            <ProductCard product={product} appearance={appearance} />
          </SwiperSlide>
        ))}
      </Swiper>
      <SwiperNavigation
        label={label}
        tone={tone}
        className="mt-6"
        previousDisabled={!swiper || edgeState.beginning}
        nextDisabled={!swiper || edgeState.end}
        onPrevious={() => swiper?.slidePrev()}
        onNext={() => swiper?.slideNext()}
      />
    </div>
  );
}
