import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { checkoutService } from "../api/checkout.service";
import { PaymentScreen } from "./payment-screen";

const navigation = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({ useRouter: () => navigation }));

describe("PaymentScreen", () => {
  it("opens the order returned by the payment API", async () => {
    vi.spyOn(checkoutService, "completePayment").mockResolvedValue({ orderId: "OR-3004", status: "paid" });
    const user = userEvent.setup();
    renderWithProviders(<PaymentScreen method="paynow" paymentReference="PAY-ABC12345" amount={1128.15} />);

    await user.click(screen.getByRole("button", { name: /I have completed payment/i }));

    await waitFor(() =>
      expect(navigation.push).toHaveBeenCalledWith("/payment/success?orderId=OR-3004&amount=1128.15"),
    );
  });
});
