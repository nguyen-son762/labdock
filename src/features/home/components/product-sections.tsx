import { ArrowRight, Box, ProfileCircle } from "iconsax-reactjs";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { ProductCard, ProductCarousel, productGrid, products } from "@/features/products";
import { Link } from "@/i18n/navigation";

function ViewAllProducts() {
  const t = useTranslations("Home");

  return (
    <Button asChild className="h-11 rounded-full bg-gradient-to-r from-[#2f7bc4] to-[#0f3678] px-5 shadow-none">
      <Link href="/products">
        {t("viewAll")}
        <span className="flex size-7 items-center justify-center rounded-full bg-white/10">
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </Link>
    </Button>
  );
}

export function OutstandingProducts() {
  const t = useTranslations("Home");

  return (
    <section className="bg-[#f5f8fb] pb-16" aria-labelledby="outstanding-products-title">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#123f82] to-[#2f7bc4] px-4 pb-8 pt-16 lg:px-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_10%_20%,rgba(116,179,228,0.22),transparent_20%),radial-gradient(circle_at_90%_20%,rgba(116,179,228,0.22),transparent_22%)]" />
          <h2
            id="outstanding-products-title"
            className="absolute left-1/2 top-0 flex h-14 w-[min(360px,80%)] -translate-x-1/2 items-center justify-center gap-2 rounded-b-2xl bg-gradient-to-b from-[#e57a00] to-[#f3c15c] text-xl font-semibold text-white shadow-lg"
          >
            <Box className="size-6" variant="Bulk" aria-hidden="true" /> {t("outstanding")}
          </h2>
          <div className="relative">
            <ProductCarousel products={productGrid} label={t("outstanding")} appearance="outstanding" tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewProductsSection() {
  const t = useTranslations("Home");

  return (
    <section id="new-products" className="bg-[#f5f8fb] py-12" aria-labelledby="new-products-title">
      <div className="container rounded-2xl bg-white px-4 py-8 lg:px-5">
        <h2 id="new-products-title" className="mb-8 text-center text-2xl font-semibold text-[#051a50]">
          {t("newProducts")}
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {productGrid.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <ViewAllProducts />
        </div>
      </div>
    </section>
  );
}

export function PersonalizedProducts() {
  const t = useTranslations("Home");

  return (
    <section className="bg-[#f5f8fb] py-12" aria-labelledby="personalized-title">
      <div className="container">
        <div className="relative rounded-2xl bg-gradient-to-b from-[#79b5e1] to-[#eef7fd] px-4 pb-10 pt-16 lg:px-5">
          <h2
            id="personalized-title"
            className="absolute left-1/2 top-0 flex h-14 w-[min(390px,80%)] -translate-x-1/2 items-center justify-center gap-2 rounded-b-2xl bg-gradient-to-b from-[#174d91] to-[#72b1de] text-xl font-semibold text-white"
          >
            <ProfileCircle className="size-7 text-[#f6a21a]" variant="Bold" aria-hidden="true" /> {t("personalized")}
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {products.map((product, index) => (
              <ProductCard
                key={`personalized-${product.id}`}
                product={{ ...product, discount: index === 0 ? product.discount : "-25%" }}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <ViewAllProducts />
          </div>
        </div>
      </div>
    </section>
  );
}
