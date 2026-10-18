"use client";

import { useEffect } from "react";
import type { Swiper } from "swiper";

export function useCarouselAutoplay(swiper: Swiper | null) {
  useEffect(() => {
    if (!swiper?.autoplay || swiper.destroyed) return;

    const synchronize = () => {
      if (swiper.destroyed) return;
      if (!swiper.enabled || swiper.isLocked) swiper.autoplay.stop();
      else if (!swiper.autoplay.running) swiper.autoplay.start();
    };
    synchronize();
    swiper.on("breakpoint", synchronize);
    swiper.on("lock", synchronize);
    swiper.on("unlock", synchronize);
    swiper.on("enable", synchronize);
    swiper.on("disable", synchronize);
    return () => {
      swiper.off("breakpoint", synchronize);
      swiper.off("lock", synchronize);
      swiper.off("unlock", synchronize);
      swiper.off("enable", synchronize);
      swiper.off("disable", synchronize);
    };
  }, [swiper]);
}
