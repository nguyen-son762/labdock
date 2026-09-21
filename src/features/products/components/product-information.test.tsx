import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import type { Product } from "../products.types";
import { ProductInformation } from "./product-information";

const product: Product = {
  id: "11111111-1111-1111-1111-111111111111",
  name: "Example Product",
  slug: "example-product",
  productNo: "SKU-001",
  status: 1,
  brandName: "Example Brand",
  notes: "",
  description: "Product description from the API.",
  specialRequirement: false,
  restrictedCondition: false,
  priceVisible: true,
  casNumber: "64-17-5",
  specifications: [{ name: "Purity", value: "99%" }],
  variants: [],
  media: [],
  documents: [
    {
      id: "22222222-2222-2222-2222-222222222222",
      displayName: "Safety sheet",
      contentType: "application/pdf",
      sizeBytes: 1024,
      sortOrder: 0,
      createdAt: "2026-08-21T10:00:00+00:00",
      url: "/media/public/safety-sheet.pdf",
    },
  ],
  related: [],
  certificates: [],
  isNew: false,
  isOutstanding: false,
};

describe("ProductInformation", () => {
  it("renders API specifications and product documents", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductInformation product={product} />);

    expect(screen.getByText("Purity")).toBeInTheDocument();
    expect(screen.getByText("99%")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "References" }));

    expect(screen.getByRole("link", { name: /Safety sheet/ })).toHaveAttribute(
      "href",
      "https://uat-api-labdock.365studio.vn/media/public/safety-sheet.pdf",
    );
  });
});
