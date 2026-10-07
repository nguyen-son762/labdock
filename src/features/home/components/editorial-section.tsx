"use client";

import { ArrowRight, StatusUp } from "iconsax-reactjs";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { SwiperNavigation } from "@/components/ui/swiper-navigation";

import "swiper/css";

const promos = [
  {
    key: "equipment",
    image: "/home/editorial-equipment.png",
  },
  {
    key: "chemicals",
    image: "/home/editorial-chemicals.png",
  },
  {
    key: "consumables",
    image: "/home/editorial-consumables.png",
  },
] as const;

export function EditorialSection() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [edgeState, setEdgeState] = useState({ beginning: true, end: false });

  const updateEdges = (instance: SwiperInstance) => {
    setEdgeState({ beginning: instance.isBeginning, end: instance.isEnd });
  };

  return (
    <section id="news" className="bg-[#f5f8fb] pb-16" aria-label="Featured laboratory collections">
      <div className="container">
        <Swiper
          modules={[A11y, Autoplay]}
          slidesPerView={1.05}
          spaceBetween={12}
          watchOverflow
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          a11y={{ containerMessage: "Featured laboratory collections" }}
          breakpoints={{ 1024: { slidesPerView: 3, spaceBetween: 20 } }}
          onSwiper={(instance) => {
            setSwiper(instance);
            updateEdges(instance);
          }}
          onSlideChange={updateEdges}
          onBreakpoint={updateEdges}
          onResize={updateEdges}
        >
          {promos.map((promo, index) => (
            <SwiperSlide key={promo.key} className="!h-auto">
              <EditorialCard promo={promo} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperNavigation
          label="featured laboratory collections"
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

function EditorialCard({ promo, index }: { promo: (typeof promos)[number]; index: number }) {
  const t = useTranslations("Home");

  return (
    <article className="relative min-h-[300px] overflow-hidden rounded-xl text-white">
      <Image
        src={promo.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, 95vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08265f]/95 via-[#0b3472]/45 to-transparent" />
      <div className="relative flex min-h-[300px] flex-col justify-end p-5">
        <span
          className={`mb-2.5 inline-flex w-fit items-center gap-1 rounded px-1.5 py-0.5 text-xs font-semibold uppercase ${
            index === 0
              ? "bg-[linear-gradient(270deg,#e16555_0%,#ce2823_100%)]"
              : "bg-[linear-gradient(270deg,#217a4f_0%,#4caf7a_100%)]"
          }`}
        >
          {index === 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="size-3 shrink-0"
            >
              <g clipPath="url(#editorial-badge-clip)">
                <path
                  d="M10.5703 7.42969C10.5703 9.94976 8.52007 12 6 12C3.47993 12 1.42969 9.94976 1.42969 7.42969C1.42969 6.44335 1.76904 5.47594 2.38521 4.70574L2.44425 4.63194C2.55417 4.49454 2.74875 4.45958 2.89962 4.55009L3.59236 4.96573C3.79223 5.08564 3.95766 4.97466 4.00362 4.93779C4.04958 4.90093 4.19381 4.76347 4.1201 4.54236L4.10529 4.49787C3.87258 3.79979 3.96279 3.04149 4.35284 2.41749C4.74042 1.79731 4.94531 1.08291 4.94531 0.351568V0.351943C4.94531 0.0961694 5.20978 -0.0739868 5.44256 0.032021L5.44259 0.0320444V0.0316225C5.46607 0.0423335 6.02545 0.298974 6.69623 0.767888C7.50771 1.33515 7.99219 2.26508 7.99219 3.2554C7.99219 3.4568 8.10108 3.62804 8.28347 3.71347C8.46581 3.79887 8.66707 3.77293 8.82183 3.64397C8.98259 3.51001 9.22409 3.54528 9.3398 3.71965C10.1333 4.91541 10.5703 6.233 10.5703 7.42969Z"
                  fill="url(#editorial-badge-flame-gradient)"
                />
                <path
                  d="M7.64056 6.37499C7.89777 6.37499 8.06792 6.64215 7.95915 6.87521L6.31852 10.3908C6.16826 10.7128 5.68976 10.6341 5.65053 10.281L5.45089 8.48436H4.35931C4.10211 8.48436 3.93195 8.2172 4.04073 7.98413L5.68135 4.46851C5.83161 4.14655 6.31011 4.22523 6.34934 4.57836L6.54898 6.37499H7.64056Z"
                  fill="white"
                />
              </g>
              <defs>
                <linearGradient id="editorial-badge-flame-gradient" x1="6" y1="12" x2="6" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EFA33B" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#E57A00" />
                </linearGradient>
                <clipPath id="editorial-badge-clip">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <StatusUp className="size-3" variant="Bold" aria-hidden="true" />
          )}
          {t(`editorial.${promo.key}.badge`)}
        </span>
        <h2 className="text-xl font-semibold">{t(`editorial.${promo.key}.title`)}</h2>
        <p className="mt-2 min-h-10 text-sm leading-5 text-white/90">{t(`editorial.${promo.key}.description`)}</p>
        <Button asChild variant="brand" className="mt-5 h-11 w-fit rounded-full p-1.5 pl-5">
          <Link href="#new-products">
            {t(`editorial.${promo.key}.action`)}
            <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        </Button>
      </div>
    </article>
  );
}
