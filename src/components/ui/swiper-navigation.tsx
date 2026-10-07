"use client";

import { ArrowLeft, ArrowRight } from "iconsax-reactjs";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/class-names";

type SwiperNavigationProps = {
  label: string;
  onPrevious: () => void;
  onNext: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  tone?: "light" | "dark" | "orange";
  className?: string;
};

export function SwiperNavigation({
  label,
  onPrevious,
  onNext,
  previousDisabled,
  nextDisabled,
  className,
}: SwiperNavigationProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)} aria-label={`${label} carousel controls`}>
      <Button
        type="button"
        variant="brand"
        size="icon"
        disabled={previousDisabled}
        aria-label={`Previous ${label}`}
        onClick={onPrevious}
        className={cn("size-8 rounded-full disabled:opacity-40")}
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
      </Button>
      <Button
        type="button"
        variant="brand"
        size="icon"
        disabled={nextDisabled}
        aria-label={`Next ${label}`}
        onClick={onNext}
        className="size-8 rounded-full shadow-none disabled:opacity-40"
      >
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
