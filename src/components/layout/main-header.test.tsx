import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MainHeader } from "./main-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/cart" }));

describe("MainHeader", () => {
  it("renders account state from session data instead of the pathname", () => {
    const { rerender } = render(<MainHeader />);
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/login");

    rerender(<MainHeader account={{ fullName: "Sarah Chen", email: "sarah@example.com" }} />);
    expect(screen.getByRole("link", { name: "My profile" })).toHaveAttribute("href", "/profile");
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });
});
