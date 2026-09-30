import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import type { HomeBanner } from "../home.types";
import { HeroSection } from "./hero-section";

const banners: HomeBanner[] = [
  {
    id: "left-banner",
    type: "Left",
    imageUrl: "/media/public/left.jpg",
    linkUrl: "https://example.com/left",
    title: "Left banner",
    description: "Visible API description",
    showDescription: true,
    buttonLabel: "Explore now",
    dateTime: "2026-08-21T10:00:00+00:00",
    location: "Singapore",
    badge: "Featured",
  },
  {
    id: "right-banner",
    type: "Right",
    imageUrl: "/media/public/right.jpg",
    linkUrl: "/products",
    title: "Right banner",
    description: "Hidden API description",
    showDescription: false,
    buttonLabel: "View products",
    dateTime: null,
    location: null,
    badge: null,
  },
];

describe("HeroSection homepage banners", () => {
  it("renders API content and sizes cards from the Left and Right banner types", () => {
    renderWithProviders(<HeroSection banners={banners} />);

    const leftCard = screen.getByRole("heading", { name: "Left banner" }).closest("article");
    const rightCard = screen.getByRole("heading", { name: "Right banner" }).closest("article");

    expect(leftCard).toHaveClass("lg:col-span-2");
    expect(rightCard).toHaveClass("lg:col-span-1");
    expect(screen.getByText("Visible API description")).toBeInTheDocument();
    expect(screen.queryByText("Hidden API description")).not.toBeInTheDocument();
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByText("Singapore")).toBeInTheDocument();
    expect(screen.getByText(/Aug 21, 2026/)).toBeInTheDocument();

    const externalAction = screen.getByRole("link", { name: /Explore now/ });
    expect(externalAction).toHaveAttribute("href", "https://example.com/left");
    expect(externalAction).toHaveAttribute("target", "_blank");
    expect(within(rightCard as HTMLElement).getByRole("link", { name: /View products/ })).toHaveAttribute(
      "href",
      "/products",
    );
  });
});
