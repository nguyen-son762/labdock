import { Danger } from "iconsax-reactjs";
import type { ReactNode } from "react";

import { cn } from "@/lib/class-names";

export function Alert({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive",
        className,
      )}
    >
      <Danger className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
