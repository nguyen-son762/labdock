import { CategoriesSection } from "./categories-section";
import { CtaSection } from "./cta-section";
import { EditorialSection } from "./editorial-section";
import { HeroSection } from "./hero-section";
import { NewProductsSection, OutstandingProducts, PersonalizedProducts } from "./product-sections";
import { SocialProofSection } from "./social-proof-section";

export function HomeScreen() {
  return (
    <div className="bg-[#f5f8fb]">
      <HeroSection />
      <OutstandingProducts />
      <EditorialSection />
      <NewProductsSection />
      <CategoriesSection />
      <PersonalizedProducts />
      <SocialProofSection />
      <CtaSection />
    </div>
  );
}
