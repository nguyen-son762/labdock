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
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.name }]}
        />
        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1.55fr)_450px]">
          <div className="min-w-0">
            <ProductGallery images={gallery} productName={product.name} />
          </div>
          <div className="lg:col-start-2 lg:row-start-1">
            <ProductPurchasePanel key={product.id} product={product} />
          </div>
          <div className="min-w-0 lg:col-start-1">
            <ProductInformation product={product} />
          </div>
        </div>
        {relatedProducts.length ? (
          <div className="mt-10">
            <ProductShelf title="Related Products" products={relatedProducts} tone="orange" />
          </div>
        ) : null}
      </div>
      <ServiceGuarantees />
    </div>
  );
}
