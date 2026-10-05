import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ServiceGuarantees } from "@/components/shared/service-guarantees";

import type { Product } from "../products.types";
import { getProductGallery } from "../utils/product-display";
import { mapRelatedProduct } from "../utils/map-public-product";
import { ProductGallery } from "./product-gallery";
import { ProductInformation } from "./product-information";
import { ProductPurchasePanel } from "./product-purchase-panel";
import { ProductShelf } from "./product-shelf";

export function ProductDetailScreen({ product }: { product: Product }) {
  const gallery = getProductGallery(product);
  const relatedProducts = product.related.map(mapRelatedProduct);

  return (
    <div className="bg-[#f5f8fb]">
      <div className="container py-12">
        <div className="mx-auto max-w-[1280px]">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.name }]}
          />
          <div className="mt-6 grid items-stretch gap-6 xl:grid-cols-12">
            <div className="flex min-w-0 flex-col gap-4 xl:col-span-8">
              <ProductGallery images={gallery} productName={product.name} />
              <ProductInformation product={product} />
            </div>
            <div className="min-w-0 xl:col-span-4">
              <ProductPurchasePanel key={product.id} product={product} />
            </div>
          </div>
          {relatedProducts.length ? (
            <div className="mt-12 grid gap-5 xl:grid-cols-2">
              <div className="min-w-0 xl:col-start-2">
                <ProductShelf title="Related Products" products={relatedProducts} tone="orange" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <ServiceGuarantees />
    </div>
  );
}
