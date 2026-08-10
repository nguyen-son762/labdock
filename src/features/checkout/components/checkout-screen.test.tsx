import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { checkoutService } from "../api/checkout.service";
import { cartService } from "../api/cart.service";
import type { CheckoutSession } from "../checkout.types";
import { checkoutItems } from "../data/checkout-data";
import { CheckoutScreen } from "./checkout-screen";

const navigation = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({ useRouter: () => navigation }));

describe("CheckoutScreen", () => {
  beforeEach(() => {
    navigation.push.mockReset();
    vi.restoreAllMocks();
    vi.spyOn(cartService, "get").mockResolvedValue(checkoutItems);
  });

  it("prevents duplicate checkout submits while payment is being prepared", async () => {
    const user = userEvent.setup();
    let resolveCheckout: ((session: CheckoutSession) => void) | undefined;
    const request = new Promise<CheckoutSession>((resolve) => {
      resolveCheckout = resolve;
    });
    const createSpy = vi.spyOn(checkoutService, "create").mockReturnValue(request);

    renderWithProviders(<CheckoutScreen />);
    const submit = await screen.findByRole("button", { name: "Make payment" });
    await user.click(submit);
    await user.click(submit);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(submit).toBeDisabled();

    resolveCheckout?.({ paymentReference: "PAY-ABC12345", amount: 4905 });
    await waitFor(() =>
      expect(navigation.push).toHaveBeenCalledWith("/payment?method=paynow&reference=PAY-ABC12345&amount=4905"),
    );
    expect(createSpy).toHaveBeenCalledWith(expect.objectContaining({ items: checkoutItems }), expect.anything());
  });
});
