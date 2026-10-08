import { CategoriesSection } from "./categories-section";
import { CtaSection } from "./cta-section";
import { EditorialSection } from "./editorial-section";
import { HeroSection } from "./hero-section";
import { NewProductsSection, OutstandingProducts, PersonalizedProducts } from "./product-sections";
import { SocialProofSection } from "./social-proof-section";
import type { Product } from "@/features/products";
import type { HomeBanner, HomeCategory, Testimonial } from "../home.types";
import Image from "next/image";

type HomeScreenProps = {
  banners: readonly HomeBanner[];
  outstandingProducts: readonly Product[];
  newestProducts: readonly Product[];
  personalizedProducts: readonly Product[];
  topCategories: readonly HomeCategory[];
  testimonials: readonly Testimonial[];
};

export function HomeScreen({
  banners,
  outstandingProducts,
  newestProducts,
  personalizedProducts,
  topCategories,
  testimonials,
}: HomeScreenProps) {
  return (
    <div className="relative bg-[#f5f8fb]">
      <Image
        src="/home/hero-bg.png"
        alt=""
        width={1920}
        height={850}
        sizes="100vw"
        priority
        fetchPriority="high"
        unoptimized
        className="pointer-events-none absolute left-0 top-0 h-[850px] w-full object-cover object-top"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[850px] bg-[linear-gradient(180deg,rgba(249,252,255,0)_36%,#f5f8fb_100%)]" />
      <HeroSection banners={banners} />
      <OutstandingProducts products={outstandingProducts} />
      <EditorialSection />
      <NewProductsSection products={newestProducts} />
      <CategoriesSection categories={topCategories} />
      <PersonalizedProducts products={personalizedProducts} />
      <SocialProofSection testimonials={testimonials} />
      <CtaSection />
    </div>
  );
}
