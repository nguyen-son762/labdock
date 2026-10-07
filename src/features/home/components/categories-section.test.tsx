import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";
import { CategoriesSection } from "./categories-section";

describe("Homepage category navigation", () => {
  it("links a category to its product catalog page", () => {
    renderWithProviders(
      <CategoriesSection
        categories={[{ id: "category-1", name: "Surgical Instruments", slug: "surgical-instruments", sortOrder: 1 }]}
      />,
    );
    expect(screen.getByRole("link", { name: /Surgical Instruments/ })).toHaveAttribute(
      "href",
      "/products/category/surgical-instruments",
    );
  });
});
