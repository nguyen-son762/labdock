import { cn } from "@/lib/class-names";

import type { Product } from "../products.types";
import { ProductCarousel } from "./product-carousel";

type ProductShelfProps = {
  title: string;
  products: readonly Product[];
  tone: "blue" | "orange";
};

export function ProductShelf({ title, products, tone }: ProductShelfProps) {
  return (
    <section
      className={cn(
        "rounded-2xl px-4 py-6",
        tone === "blue"
          ? "bg-gradient-to-b from-[#2f7bc44d] to-transparent"
          : "bg-gradient-to-b from-[#e57a004d] to-transparent",
      )}
      aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-title`}
    >
      <h2
        id={`${title.toLowerCase().replaceAll(" ", "-")}-title`}
        className="mb-4 text-center text-2xl font-semibold leading-8 text-[#051a50]"
      >
        {title}
      </h2>
      <ProductCarousel products={products} label={title} compact tone={tone === "blue" ? "light" : "orange"} />
    </section>
  );
}
