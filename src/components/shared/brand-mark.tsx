import { Element3 } from "iconsax-reactjs";

import { cn } from "@/lib/class-names";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm",
        className,
      )}
    >
      <Element3 className="size-5" aria-hidden="true" />
    </span>
  );
}
