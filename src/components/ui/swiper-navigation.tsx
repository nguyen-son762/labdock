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
  tone = "light",
  className,
}: SwiperNavigationProps) {
  const previousClass =
    tone === "dark"
      ? "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
      : tone === "orange"
        ? "border-[#f3a132] bg-white text-[#e57a00] hover:bg-[#fff8ec] hover:text-[#e57a00]"
        : "border-[#164990] bg-[#164990] text-white hover:bg-[#123f82] hover:text-white";

  return (
    <div className={cn("flex items-center justify-center gap-10", className)} aria-label={`${label} carousel controls`}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        disabled={previousDisabled}
        aria-label={`Previous ${label}`}
        onClick={onPrevious}
        className={cn("size-8 rounded-full disabled:opacity-40", previousClass)}
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
      </Button>
      <span
        className={cn(
          "h-2 w-10 rounded-full",
          tone === "dark" ? "bg-white/70" : tone === "orange" ? "bg-[#f3c15c]" : "bg-[#9fd0f2]",
        )}
        aria-hidden="true"
      />
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
