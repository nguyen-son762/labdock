import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import type { ProductCatalogFilters } from "../schemas/product-catalog.schema";
import { mapPublicProduct } from "../utils/map-public-product";
import { CatalogWorkspace } from "./catalog-workspace";

const routerReplace = vi.hoisted(() => vi.fn());
const categoryId = "22222222-2222-2222-2222-222222222222";
const brandId = "33333333-3333-3333-3333-333333333333";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(`categoryId=${categoryId}`),
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, ...props }: ComponentProps<"a"> & { href: string }) => <a href={href} {...props} />,
  usePathname: () => "/products",
  useRouter: () => ({ replace: routerReplace }),
}));

vi.mock("./product-card", () => ({
  ProductCard: ({ product }: { product: { name: string } }) => <article>{product.name}</article>,
}));

vi.mock("./quote-card", () => ({ QuoteCard: () => <aside>Quote card</aside> }));

const product = mapPublicProduct({
  id: "11111111-1111-1111-1111-111111111111",
  name: "Example Product",
  slug: "example-product",
  productNo: "SKU-001",
  brandName: "Example Brand",
  primaryImageUrl: "/media/public/example.jpg",
  priceVisible: true,
  fromPrice: 99.5,
  currency: "SGD",
  outOfStock: false,
  publishedAt: "2026-08-21T10:00:00+00:00",
  isNew: true,
  isOutstanding: false,
});

const filters: ProductCatalogFilters = {
  page: 1,
  brandId: undefined,
  categoryId,
  sort: "featured",
};

beforeEach(() => {
  routerReplace.mockReset();
});

describe("CatalogWorkspace", () => {
  it("writes brand filters to the URL and preserves the selected category", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <CatalogWorkspace
        products={[product]}
        categories={[{ id: categoryId, name: "Chemicals", slug: "chemicals", depth: 0, imageUrl: null }]}
        brands={[{ id: brandId, name: "Example Brand" }]}
        filters={filters}
        page={1}
        pageSize={20}
        total={40}
        productsError={false}
        categoriesError={false}
        brandsError={false}
      />,
    );

    await user.click(screen.getByLabelText("Example Brand"));

    expect(routerReplace).toHaveBeenCalledWith(`/products?categoryId=${categoryId}&brandId=${brandId}`, {
      scroll: false,
    });
    expect(screen.getByRole("link", { name: "Page 2" })).toHaveAttribute(
      "href",
      `/products?categoryId=${categoryId}&page=2`,
    );
  });

  it("keeps product failures separate from available filters", () => {
    renderWithProviders(
      <CatalogWorkspace
        products={[]}
        categories={[{ id: categoryId, name: "Chemicals", slug: "chemicals", depth: 0, imageUrl: null }]}
        brands={[{ id: brandId, name: "Example Brand" }]}
        filters={filters}
        page={1}
        pageSize={20}
        total={0}
        productsError
        categoriesError={false}
        brandsError={false}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("We could not load products");
    expect(screen.getByRole("radiogroup", { name: "Filter by brands" })).toBeInTheDocument();
    expect(screen.getByRole("radiogroup", { name: "Filter by categories" })).toBeInTheDocument();
  });
});
