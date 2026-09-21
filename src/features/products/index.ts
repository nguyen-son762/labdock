export { ProductDetailScreen } from "./components/product-detail-screen";
export { ProductListScreen } from "./components/product-list-screen";
export { ProductCard } from "./components/product-card";
export { ProductCarousel } from "./components/product-carousel";
export { getProductById, productGrid, products } from "./data/products-data";
export type {
  CatalogBrandOption,
  CatalogCategoryOption,
  Product,
  ProductCertificate,
  ProductDetail,
  ProductDocument,
  ProductMedia,
  ProductSpecification,
  ProductVariant,
  ProductVariantSelection,
  ProductViewModel,
  RelatedProduct,
} from "./products.types";
export {
  parseProductCatalogFilters,
  productCatalogFiltersSchema,
  type ProductCatalogFilters,
  type ProductCatalogSearchParams,
} from "./schemas/product-catalog.schema";
export {
  publicProductDetailSchema,
  type PublicProductCertificate,
  type PublicProductDetail,
  type PublicProductDocument,
  type PublicProductMedia,
  type PublicProductSpecification,
  type PublicProductVariant,
  type PublicProductVariantSelection,
  type PublicRelatedProduct,
} from "./schemas/product-detail.schema";
