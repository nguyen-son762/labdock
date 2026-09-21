import { CategoriesSection } from "./categories-section";
import { CtaSection } from "./cta-section";
import { EditorialSection } from "./editorial-section";
import { HeroSection } from "./hero-section";
import { NewProductsSection, OutstandingProducts, PersonalizedProducts } from "./product-sections";
import { SocialProofSection } from "./social-proof-section";
import type { Brand } from "@/features/brands";
import type { Product } from "@/features/products";
import type { HomeBanner, HomeCategory, Testimonial } from "../home.types";

type HomeScreenProps = {
  banners: readonly HomeBanner[];
  outstandingProducts: readonly Product[];
  newestProducts: readonly Product[];
  personalizedProducts: readonly Product[];
  topBrands: readonly Brand[];
  topCategories: readonly HomeCategory[];
  testimonials: readonly Testimonial[];
};

export function HomeScreen({
  banners,
  outstandingProducts,
  newestProducts,
  personalizedProducts,
  topBrands,
  topCategories,
  testimonials,
}: HomeScreenProps) {
  return (
    <div className="bg-[#f5f8fb]">
      <HeroSection banners={banners} />
      <OutstandingProducts products={outstandingProducts} />
      <EditorialSection />
      <NewProductsSection products={newestProducts} />
      <CategoriesSection categories={topCategories} />
      <PersonalizedProducts products={personalizedProducts} />
      <SocialProofSection brands={topBrands} testimonials={testimonials} />
      <CtaSection />
    </div>
  );
}
