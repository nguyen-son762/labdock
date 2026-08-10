"use client";

import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/class-names";

import "swiper/css";
import "swiper/css/thumbs";

export function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [mainSwiper, setMainSwiper] = useState<SwiperInstance | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section aria-label={`${productName} gallery`} className="grid gap-3 sm:grid-cols-[100px_minmax(0,1fr)]">
      <Swiper
        modules={[A11y]}
        direction="horizontal"
        slidesPerView={Math.min(4, images.length)}
        spaceBetween={12}
        watchSlidesProgress
        a11y={{ containerMessage: `${productName} thumbnails` }}
        breakpoints={{ 640: { direction: "vertical", slidesPerView: Math.min(4, images.length) } }}
        onSwiper={setThumbsSwiper}
        className="w-full sm:h-[500px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image} className="!h-auto">
            <Button
              type="button"
              variant="outline"
              aria-label={`View product image ${index + 1}`}
              aria-pressed={activeIndex === index}
              onClick={() => mainSwiper?.slideTo(index)}
              className={cn(
                "relative aspect-square h-auto w-full overflow-hidden rounded-lg border bg-white p-0 shadow-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]",
                activeIndex === index ? "border-2 border-[#f3a132]" : "border-[#e3e8ee] hover:border-[#9fd0f2]",
              )}
            >
              <Image src={image} alt="" fill unoptimized sizes="96px" className="object-contain p-2" />
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[A11y, Thumbs]}
        slidesPerView={1}
        spaceBetween={12}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        a11y={{ containerMessage: `${productName} product images` }}
        onSwiper={setMainSwiper}
        onSlideChange={(instance) => setActiveIndex(instance.activeIndex)}
        className="min-h-[430px] w-full overflow-hidden rounded-xl border border-[#e3e8ee] bg-white sm:min-h-[500px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`main-${image}`} className="relative min-h-[430px] sm:min-h-[500px]">
            <Image
              src={image}
              alt={index === 0 ? productName : `${productName}, image ${index + 1}`}
              fill
              unoptimized
              priority={index === 0}
              sizes="(min-width: 1024px) 590px, 90vw"
              className="object-contain p-8"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
