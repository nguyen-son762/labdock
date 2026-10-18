import { isValidElement } from "react";
import { getPublicProductBySlug, ProductNotFoundError } from "@/features/products/server";
import { productFixture } from "@/features/products/test/product-fixture";
import ProductPage, { generateMetadata } from "./page";

vi.mock("@/features/products/server", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/features/products/server")>()),
  getPublicProductBySlug: vi.fn(),
}));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  notFound: () => {
    throw new Error("404 page");
  },
}));
const params = Promise.resolve({ locale: "vi", slug: productFixture.slug });
async function structuredProduct() {
  const page = await ProductPage({ params });
  const script: unknown = page.props.children[0];
  if (!isValidElement<{ dangerouslySetInnerHTML: { __html: string } }>(script))
    throw new Error("Missing structured data");
  return script.props.dangerouslySetInnerHTML.__html;
}
beforeEach(() => {
  vi.mocked(getPublicProductBySlug).mockResolvedValue(productFixture);
});
it("SEO-005 uses the promotional price seen by the customer", async () => {
  const variant = productFixture.variants[0];
  if (!variant) throw new Error("Missing variant fixture");
  vi.mocked(getPublicProductBySlug).mockResolvedValue({
    ...productFixture,
    variants: [{ ...variant, promotionPercent: 25 }],
  });
  expect(JSON.parse(await structuredProduct())).toMatchObject({ offers: { price: 75, priceCurrency: "SGD" } });
});
it.each(["product", "variant", "null"])("SEO-005 omits the offer for hidden or missing price %s", async (reason) => {
  const variant = productFixture.variants[0];
  if (!variant) throw new Error("Missing variant fixture");
  vi.mocked(getPublicProductBySlug).mockResolvedValue({
    ...productFixture,
    priceVisible: reason !== "product",
    variants: [{ ...variant, priceVisible: reason !== "variant", unitPrice: reason === "null" ? null : 100 }],
  });
  expect(JSON.parse(await structuredProduct())).not.toHaveProperty("offers");
});
it("SEO-006 escapes script-breaking text while retaining the original description", async () => {
  const description = '</script><script>alert("synthetic")</script>';
  vi.mocked(getPublicProductBySlug).mockResolvedValue({ ...productFixture, description });
  const json = await structuredProduct();
  expect(json).not.toContain("<");
  expect(JSON.parse(json)).toMatchObject({ description });
});
it("SEO-001 SEO-007 supplies localized canonical/OG URLs and product imagery", async () => {
  const metadata = await generateMetadata({ params });
  expect(metadata).toMatchObject({
    alternates: { canonical: `/vi/products/${productFixture.slug}` },
    openGraph: {
      url: `/vi/products/${productFixture.slug}`,
      locale: "vi_VN",
      images: [{ url: "/home/product-flask-round.png", alt: productFixture.name }],
    },
  });
});
it("PDP-002 distinguishes a missing record from a server failure", async () => {
  vi.mocked(getPublicProductBySlug).mockRejectedValueOnce(new ProductNotFoundError("missing"));
  await expect(ProductPage({ params })).rejects.toThrow("404 page");
  vi.mocked(getPublicProductBySlug).mockRejectedValueOnce(new Error("Unavailable"));
  await expect(ProductPage({ params })).rejects.toThrow("Unavailable");
});
