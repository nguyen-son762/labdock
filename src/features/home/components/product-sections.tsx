import { ArrowRight } from "iconsax-reactjs";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { ProductCard, ProductCarousel, type Product } from "@/features/products";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

function ViewAllProducts() {
  const t = useTranslations("Home");

  return (
    <Button asChild className="h-11 rounded-full bg-gradient-to-r from-[#2f7bc4] to-[#0f3678] p-[6px] pl-5 shadow-none">
      <Link href="/products">
        {t("viewAll")}
        <span className="flex size-7 items-center justify-center rounded-full bg-white/10">
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </Link>
    </Button>
  );
}

export function OutstandingProducts({ products }: { products: readonly Product[] }) {
  const t = useTranslations("Home");

  return (
    <section className="bg-[#f5f8fb] pb-16" aria-labelledby="outstanding-products-title">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0f3678] to-[#2f7bc4] px-4 pb-6 pt-24 lg:px-5">
          <Image
            src="/auth/pattern.png"
            alt=""
            width={515}
            height={364}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-0 h-auto w-[min(515px,40.25%)] max-w-[515px] rotate-180 opacity-50 mix-blend-lighten"
          />
          <Image
            src="/auth/pattern.png"
            alt=""
            width={515}
            height={364}
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 z-0 h-auto w-[min(515px,40.25%)] max-w-[515px] opacity-50 mix-blend-lighten"
          />
          <h2
            id="outstanding-products-title"
            className="absolute left-1/2 top-0 z-10 flex h-[70px] w-[min(430px,80%)] -translate-x-1/2 items-center justify-center text-2xl font-semibold text-white lg:text-[28px]"
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full"
              viewBox="0 0 430 70"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="outstanding-title-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e57a00" />
                  <stop offset="100%" stopColor="#fcdb97" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="outstanding-title-stroke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M0 0H430L406 58Q401 70 387 70H43Q29 70 24 58L0 0Z"
                fill="url(#outstanding-title-gradient)"
                stroke="url(#outstanding-title-stroke)"
                strokeWidth="2"
              />
            </svg>
            <span className="relative z-10 flex items-center gap-2 text-2xl font-semibold text-white">
              <Image className="relative z-10" src="/home/icon/awards.png" alt="" width={40} height={40} />{" "}
              {t("outstanding")}
            </span>
          </h2>
          <div className="relative z-10">
            <ProductCarousel products={products} label={t("outstanding")} appearance="outstanding" tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewProductsSection({ products }: { products: readonly Product[] }) {
  const t = useTranslations("Home");

  return (
    <section id="new-products" aria-labelledby="new-products-title" className="container">
      <div className="rounded-2xl bg-white pb-6">
        <h2 id="new-products-title" className="mb-6 pt-6 text-center text-2xl font-semibold text-[#051a50]">
          {t("newProducts")}
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <ViewAllProducts />
        </div>
      </div>
    </section>
  );
}

export function PersonalizedProducts({ products }: { products: readonly Product[] }) {
  const t = useTranslations("Home");

  return (
    <section className="bg-[#f5f8fb]" aria-labelledby="personalized-title">
      <div className="container">
        <div className="relative rounded-2xl bg-gradient-to-b from-[#79b5e1] to-[#eef7fd] px-4 pb-6 pt-[90px] lg:px-5">
          <h2
            id="personalized-title"
            className="absolute left-1/2 top-0 z-10 flex h-[62px] w-[min(382px,80%)] -translate-x-1/2 items-center justify-center text-2xl font-semibold text-white"
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full"
              viewBox="0 0 382 62"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="personalized-title-gradient"
                  x1="191"
                  y1="62"
                  x2="191"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#74B3E4" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#164990" />
                </linearGradient>
                <linearGradient
                  id="personalized-title-stroke"
                  x1="191"
                  y1="0"
                  x2="191"
                  y2="62"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0" />
                  <stop offset="1" stopColor="white" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M380.526 1L360.463 51.5352C358.194 57.2488 352.669 60.9999 346.521 61H35.4785C29.331 60.9999 23.8056 57.2488 21.5371 51.5352L1.47363 1H380.526Z"
                fill="url(#personalized-title-gradient)"
                stroke="url(#personalized-title-stroke)"
                strokeWidth="2"
              />
            </svg>
            <span className="relative z-10 flex items-center gap-2 text-2xl">
              <div className="relative">
                <Image className="relative z-10" src="/home/icon/personal.png" alt="" width={40} height={40} />
                <svg
                  className="absolute -top-[1px] right-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                >
                  <path
                    d="M16.3399 0C7.31561 0 0 7.31561 0 16.3399C0 25.3641 7.31561 32.6797 16.3399 32.6797C25.3641 32.6797 32.6797 25.3641 32.6797 16.3399C32.6797 7.31561 25.3641 0 16.3399 0Z"
                    fill="url(#paint0_linear_106_4260)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_106_4260"
                      x1="0"
                      y1="16.3399"
                      x2="32.6797"
                      y2="16.3399"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#EFA33B" />
                      <stop offset="1" stopColor="#E57A00" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              {t("personalized")}
            </span>
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {products.map((product) => (
              <ProductCard key={`personalized-${product.id}`} product={product} />
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
