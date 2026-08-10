import { cn } from "@/lib/class-names";

import type { Product } from "../products.types";
import { ProductCarousel } from "./product-carousel";

type ProductShelfProps = {
  title: string;
  products: Product[];
  tone: "blue" | "orange";
};

export function ProductShelf({ title, products, tone }: ProductShelfProps) {
  return (
    <section
      className={cn(
        "rounded-2xl p-4 sm:p-5",
        tone === "blue"
          ? "bg-gradient-to-b from-[#d9eefb] to-[#f4f9fc]"
          : "bg-gradient-to-b from-[#fde4b8] to-[#fff8ec]",
      )}
      aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-title`}
    >
      <h2
        id={`${title.toLowerCase().replaceAll(" ", "-")}-title`}
        className="mb-4 text-xl font-semibold text-[#051a50]"
      >
        {title}
      </h2>
      <ProductCarousel products={products} label={title} compact tone={tone === "blue" ? "light" : "orange"} />
    </section>
  );
}
