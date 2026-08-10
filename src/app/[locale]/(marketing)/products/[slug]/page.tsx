import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { getProductById, ProductDetailScreen, products } from "@/features/products";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isAppLocale(locale)) return {};
  const product = getProductById(slug);
  if (!product) return {};
  return {
    title: `${product.name} ${product.volume} (${product.catalogNumber})`,
    description: product.description,
    alternates: getLocalizedAlternates(`/products/${product.id}`, locale),
    openGraph: {
      title: `${product.name} ${product.volume}`,
      description: product.description,
      url: getLocalizedPath(`/products/${product.id}`, locale),
      locale: locale === "vi" ? "vi_VN" : "en_SG",
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  if (!isAppLocale(locale)) notFound();
  const product = getProductById(slug);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `${siteConfig.url}${product.image}`,
    description: product.description,
    sku: product.catalogNumber,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price.replace(/[^0-9.]/g, ""),
      url: `${siteConfig.url}${getLocalizedPath(`/products/${product.id}`, locale)}`,
      availability: product.badge === "Out of stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    },
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
