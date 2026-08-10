"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SwiperNavigation } from "@/components/ui/swiper-navigation";

import { productCategories } from "../data/products-data";

import "swiper/css";
import "swiper/css/grid";

const thumbnails = [
  "/home/product-flask-round.png",
  "/home/product-spider.png",
  "/home/product-filter.png",
  "/home/product-volumetric.png",
] as const;

export function CategoryStrip() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [edgeState, setEdgeState] = useState({ beginning: true, end: false });
  const updateEdges = (instance: SwiperInstance) => {
    setEdgeState({ beginning: instance.isBeginning, end: instance.isEnd });
  };

  return (
    <section aria-labelledby="categories-title">
      <div className="mb-2 flex items-center justify-between">
        <h2 id="categories-title" className="text-xl font-semibold text-[#051a50]">
          All categories
        </h2>
        <SwiperNavigation
          label="categories"
          tone="orange"
          previousDisabled={!swiper || edgeState.beginning}
          nextDisabled={!swiper || edgeState.end}
          onPrevious={() => swiper?.slidePrev()}
          onNext={() => swiper?.slideNext()}
        />
      </div>
      <Swiper
        modules={[A11y, Grid]}
        slidesPerView={1.4}
        spaceBetween={8}
        grid={{ rows: 2, fill: "row" }}
        watchOverflow
        a11y={{ containerMessage: "Product categories carousel" }}
        breakpoints={{
          640: { slidesPerView: 3, grid: { rows: 2, fill: "row" } },
          1024: { slidesPerView: 5, grid: { rows: 1, fill: "row" } },
        }}
        onSwiper={(instance) => {
          setSwiper(instance);
          updateEdges(instance);
        }}
        onSlideChange={updateEdges}
        onBreakpoint={updateEdges}
        onResize={updateEdges}
      >
        {productCategories.map((category, index) => {
          const thumbnail = thumbnails[index % thumbnails.length] ?? "/home/product-flask-round.png";
          return (
            <SwiperSlide key={category} className="!h-auto">
              <Link
                href={`/products?category=${encodeURIComponent(category)}`}
                className="flex min-h-[66px] items-center gap-2 rounded-lg bg-[#f5f7f8] p-2 transition-colors hover:bg-[#eaf2f9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
              >
                <span className="relative size-8 shrink-0 overflow-hidden rounded bg-white">
                  <Image src={thumbnail} alt="" fill unoptimized sizes="32px" className="object-contain p-0.5" />
                </span>
                <span className="min-w-0">
                  <strong className="line-clamp-2 text-[11px] leading-4 text-[#051a50]">{category}</strong>
                  <span className="block text-[10px] text-[#868da5]">122 products</span>
                </span>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
