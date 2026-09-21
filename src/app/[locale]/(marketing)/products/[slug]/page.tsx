import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { ProductDetailScreen } from "@/features/products";
import { getPublicProductBySlug, ProductNotFoundError } from "@/features/products/server";
import { getDefaultProductVariant, getPrimaryProductImage } from "@/features/products/utils/product-display";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

async function loadProduct(slug: string) {
  try {
    return await getPublicProductBySlug(slug);
  } catch (error) {
    if (error instanceof ProductNotFoundError) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isAppLocale(locale)) return {};
  const product = await loadProduct(slug);
  const description = product.description || product.notes || `${product.name} from ${product.brandName}.`;
  const image = getPrimaryProductImage(product);

  return {
    title: `${product.name} (${product.productNo})`,
    description,
    alternates: getLocalizedAlternates(`/products/${product.slug}`, locale),
    openGraph: {
      title: product.name,
      description,
      url: getLocalizedPath(`/products/${product.slug}`, locale),
      locale: locale === "vi" ? "vi_VN" : "en_SG",
      images: [{ url: image, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  if (!isAppLocale(locale)) notFound();
  const product = await loadProduct(slug);
  const variant = getDefaultProductVariant(product);
  const image = getPrimaryProductImage(product);
  const canShowOffer = product.priceVisible && variant?.priceVisible;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    description: product.description,
    sku: variant?.sku || product.productNo,
    brand: { "@type": "Brand", name: product.brandName },
    ...(canShowOffer && variant
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: variant.currency,
            price: variant.unitPrice,
            url: `${siteConfig.url}${getLocalizedPath(`/products/${product.slug}`, locale)}`,
            availability:
              variant.isActive && variant.stockQty > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replaceAll("<", "\\u003c") }}
      />
      <ProductDetailScreen product={product} />
    </>
  );
}
