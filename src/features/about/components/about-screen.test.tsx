import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AboutScreen } from "./about-screen";

describe("AboutScreen", () => {
  it("renders the About content, partner grid and product call to action", () => {
    render(<AboutScreen />);

    expect(screen.getByRole("heading", { level: 1, name: "About Labdock" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Why choose Labdock?" })).toBeInTheDocument();
    expect(screen.getAllByText("MediCore")).toHaveLength(6);
    expect(screen.getByRole("link", { name: /Explore products/i })).toHaveAttribute("href", "/products");
  });
});
