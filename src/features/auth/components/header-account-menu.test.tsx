import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { authService } from "../api/auth.service";
import { HeaderAccountMenu } from "./header-account-menu";

const navigation = vi.hoisted(() => ({ replace: vi.fn() }));

vi.mock("next/navigation", () => ({
  permanentRedirect: vi.fn(),
  redirect: vi.fn(),
  useParams: () => ({}),
  usePathname: () => "/",
  useRouter: () => navigation,
}));

const account = { fullName: "Sarah Chen", email: "sarah@example.com" };

describe("HeaderAccountMenu", () => {
  afterEach(() => navigation.replace.mockReset());

  it("opens accessibly, closes with Escape, and logs the user out", async () => {
    const logout = vi.spyOn(authService, "logout").mockResolvedValue();
    const user = userEvent.setup();
    renderWithProviders(<HeaderAccountMenu account={account} />);

    const trigger = screen.getByRole("button", { name: "Account menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "My profile" })).toHaveAttribute("href", "/profile");
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("link", { name: "My profile" })).not.toBeInTheDocument();

    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Logout" }));

    await waitFor(() => expect(logout).toHaveBeenCalledOnce());
    expect(navigation.replace).toHaveBeenCalledWith("/login");
  });
});
