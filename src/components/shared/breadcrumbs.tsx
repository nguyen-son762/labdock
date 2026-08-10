import { ArrowRight2 } from "iconsax-reactjs";
import Link from "next/link";

import { cn } from "@/lib/class-names";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  appearance?: "current-primary" | "parent-primary";
};

export function Breadcrumbs({ items, appearance = "current-primary" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-[#73798f]">
      {items.map((item, index) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          {index > 0 ? <ArrowRight2 className="size-3.5 text-[#a3abbd]" aria-hidden="true" /> : null}
          {item.href ? (
            <Link
              href={item.href}
              className={cn(
                "rounded hover:text-[#164990] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]",
                appearance === "parent-primary" && "text-[#164990]",
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className={appearance === "parent-primary" ? "text-[#b1bac8]" : "text-[#164990]"}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
