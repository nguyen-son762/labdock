import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { MainHeader } from "./main-header";

const navigation = vi.hoisted(() => ({ replace: vi.fn() }));

vi.mock("next/navigation", () => ({
  permanentRedirect: vi.fn(),
  redirect: vi.fn(),
  useParams: () => ({}),
  usePathname: () => "/cart",
  useRouter: () => navigation,
}));

describe("MainHeader", () => {
  it("renders account state from session data instead of the pathname", () => {
    const { rerender } = renderWithProviders(<MainHeader />);
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/login");

    rerender(<MainHeader account={{ fullName: "Sarah Chen", email: "sarah@example.com" }} />);
    expect(screen.getByRole("link", { name: "My profile" })).toHaveAttribute("href", "/profile");
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("switches locale while preserving the current pathname", async () => {
    const user = userEvent.setup();
    renderWithProviders(<MainHeader />);

    await user.click(screen.getByRole("button", { name: "Language" }));
    await user.click(screen.getByRole("button", { name: /Tiếng Việt/ }));

    expect(navigation.replace).toHaveBeenCalledWith("/vi/cart");
  });
});
