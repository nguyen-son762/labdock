"use client";

import { Award, BoxTick, DocumentText, MoneyChange, TruckFast } from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SwiperNavigation } from "@/components/ui/swiper-navigation";

import "swiper/css";

const guarantees = [
  { key: "verified", icon: BoxTick, imageUrl: "/home/icon/service/delivery.svg" },
  { key: "documents", icon: DocumentText, imageUrl: "/home/icon/service/awards_2.svg" },
  { key: "delivery", icon: TruckFast, imageUrl: "/home/icon/service/truck_1.svg" },
  { key: "pricing", icon: MoneyChange, imageUrl: "/home/icon/service/money.svg" },
  { key: "certified", icon: Award, imageUrl: "/home/icon/service/awards_1.svg" },
] as const;

export function ServiceGuarantees() {
  const t = useTranslations("ServiceGuarantees");
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [edgeState, setEdgeState] = useState({ beginning: true, end: false });

  const updateEdges = (instance: SwiperInstance) => {
    setEdgeState({ beginning: instance.isBeginning, end: instance.isEnd });
  };

  return (
    <section className="bg-[#f5f8fb] py-12" aria-label={t("label")}>
      <div className="container">
        <Swiper
          modules={[A11y, Autoplay]}
          slidesPerView={1}
          spaceBetween={16}
          centeredSlides
          watchOverflow
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          a11y={{ containerMessage: "Service guarantees carousel" }}
          breakpoints={{
            640: { slidesPerView: 2, centeredSlides: false },
            1024: { slidesPerView: 5, spaceBetween: 32, centeredSlides: false },
          }}
          onSwiper={(instance) => {
            setSwiper(instance);
            updateEdges(instance);
          }}
          onSlideChange={updateEdges}
          onBreakpoint={updateEdges}
          onResize={updateEdges}
        >
          {guarantees.map(({ key, imageUrl }) => (
            <SwiperSlide key={key} className="!h-auto">
              <article className="h-full text-center">
                <div className="flex justify-center">
                  <Image src={imageUrl} alt="" width={40} height={40} />
                </div>
                <h2 className="mt-4 text-sm font-semibold text-[#051a50]">{t(`${key}Title`)}</h2>
                <p className="mx-auto mt-1 max-w-[220px] text-xs leading-[18px] text-[#646a80]">
                  {t(`${key}Description`)}
                </p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperNavigation
          label="service guarantees"
          className="mt-5 lg:hidden"
          previousDisabled={!swiper || edgeState.beginning}
          nextDisabled={!swiper || edgeState.end}
          onPrevious={() => swiper?.slidePrev()}
          onNext={() => swiper?.slideNext()}
        />
      </div>
    </section>
  );
}
