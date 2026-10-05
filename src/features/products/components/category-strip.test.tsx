import { render, screen } from "@testing-library/react";
import type { ComponentProps, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

const categoryId = "22222222-2222-2222-2222-222222222222";
const brandId = "33333333-3333-3333-3333-333333333333";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(`categoryId=${categoryId}&brandId=${brandId}&page=3`),
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, ...props }: ComponentProps<"a"> & { href: string }) => <a href={href} {...props} />,
}));

vi.mock("@/components/ui/swiper-navigation", () => ({ SwiperNavigation: () => null }));
vi.mock("swiper/modules", () => ({ A11y: {}, Autoplay: {}, Grid: {} }));
vi.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SwiperSlide: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

import { CategoryStrip } from "./category-strip";

describe("CategoryStrip", () => {
  it("opens a category route and carries other catalog filters forward", () => {
    render(
      <CategoryStrip
        categories={[{ id: categoryId, name: "Rodent Animals", slug: "rodent-animals", depth: 0, imageUrl: null }]}
      />,
    );

    expect(screen.getByRole("link", { name: "Rodent Animals" })).toHaveAttribute(
      "href",
      `/products/category/rodent-animals?brandId=${brandId}`,
    );
  });
});
