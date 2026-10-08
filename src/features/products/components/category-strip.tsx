"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SwiperNavigation } from "@/components/ui/swiper-navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/class-names";

import type { CatalogCategoryOption } from "../products.types";
import { resolveProductMediaUrl } from "../utils/product-display";

import "swiper/css";
import "swiper/css/grid";

export function CategoryStrip({
  categories,
  selectedCategoryId,
  title = "All categories",
  headingLevel = "h2",
}: {
  categories: readonly CatalogCategoryOption[];
  selectedCategoryId?: string;
  title?: string;
  headingLevel?: "h1" | "h2";
}) {
  const t = useTranslations("Catalog");
  const searchParams = useSearchParams();
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [edgeState, setEdgeState] = useState({ beginning: true, end: false });
  const updateEdges = (instance: SwiperInstance) => {
    setEdgeState({ beginning: instance.isBeginning, end: instance.isEnd });
  };

  if (categories.length === 0) return null;
  const Heading = headingLevel;

  return (
    <section aria-labelledby="categories-title">
      <div className="mb-2 flex items-center justify-between">
        <Heading id="categories-title" className="text-xl font-medium leading-[30px] text-[#0f3678]">
          {title}
        </Heading>
        <SwiperNavigation
          label={t("categoryCarousel")}
          tone="orange"
          previousDisabled={!swiper || edgeState.beginning}
          nextDisabled={!swiper || edgeState.end}
          onPrevious={() => swiper?.slidePrev()}
          onNext={() => swiper?.slideNext()}
        />
      </div>
      <Swiper
        modules={[A11y, Autoplay, Grid]}
        slidesPerView={1.4}
        spaceBetween={8}
        grid={{ rows: 2, fill: "row" }}
        watchOverflow
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        a11y={{ containerMessage: t("categoryCarousel") }}
        breakpoints={{
          640: { slidesPerView: 3, grid: { rows: 2, fill: "row" } },
          1024: { slidesPerView: 5, grid: { rows: 2, fill: "row" } },
        }}
        onSwiper={(instance) => {
          setSwiper(instance);
          updateEdges(instance);
        }}
        onSlideChange={updateEdges}
        onBreakpoint={updateEdges}
        onResize={updateEdges}
      >
        {categories.map((category) => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("categoryId");
          params.delete("page");
          const query = params.toString();
          const href = `/products/category/${category.slug}${query ? `?${query}` : ""}`;
          const selected = selectedCategoryId === category.id;
          const thumbnail = category.imageUrl
            ? resolveProductMediaUrl(category.imageUrl)
            : "/home/product-flask-round.png";

          return (
            <SwiperSlide key={category.id} className="!h-auto">
              <Link
                href={href}
                aria-current={selected ? "true" : undefined}
                className={cn(
                  "flex min-h-[66px] items-center gap-2 rounded-lg p-2 ring-1 ring-inset transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]",
                  selected ? "bg-[#eaf2f9] ring-[#2f7bc4]" : "bg-[#F5F7F8] ring-transparent hover:bg-[#eaf2f9]",
                )}
              >
                <span className="relative size-8 shrink-0 overflow-hidden rounded bg-white">
                  <Image src={thumbnail} alt="" fill unoptimized sizes="32px" className="object-contain p-0.5" />
                </span>
                <span className="min-w-0">
                  <strong className="line-clamp-2 text-[13px] font-medium leading-4 text-[#092661]">{category.name}</strong>
                  <span className="block text-xs leading-[18px] text-[#73798f]">
                    {category.productCount === undefined
                      ? t("categoryCountUnavailable")
                      : t("productCount", { count: category.productCount })}
                  </span>
                </span>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
