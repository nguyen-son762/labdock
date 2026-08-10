import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ServiceGuarantees } from "@/components/shared/service-guarantees";

import type { Product } from "../products.types";
import { productGrid } from "../data/products-data";
import { ProductGallery } from "./product-gallery";
import { ProductInformation } from "./product-information";
import { ProductPurchasePanel } from "./product-purchase-panel";
import { ProductShelf } from "./product-shelf";

export function ProductDetailScreen({ product }: { product: Product }) {
  const gallery = product.gallery ?? [product.image];
  const otherProducts = productGrid.filter((item) => item.id !== product.id);
  const recentProducts = otherProducts.slice(0, 6);
  const relatedProducts = otherProducts.slice(5, 11);

  return (
    <div className="bg-[#f5f8fb]">
      <div className="container py-12">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Lab glassware", href: "/products" }, { label: product.name }]}
        />
        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1.55fr)_450px]">
          <div className="min-w-0">
            <ProductGallery images={gallery} productName={product.name} />
          </div>
          <div className="lg:col-start-2 lg:row-start-1">
            <ProductPurchasePanel product={product} />
          </div>
          <div className="min-w-0 lg:col-start-1">
            <ProductInformation product={product} />
          </div>
        </div>
        <div className="mt-10 grid gap-5 xl:grid-cols-2">
          <ProductShelf title="Recent viewed" products={recentProducts} tone="blue" />
          <ProductShelf title="Related Products" products={relatedProducts} tone="orange" />
        </div>
      </div>
      <ServiceGuarantees />
    </div>
  );
}
