import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { cartService } from "../api/cart.service";
import { quoteService } from "../api/quote.service";
import type { QuoteSubmission } from "../schemas/quote.schema";
import { checkoutItems } from "../data/checkout-data";
import { RequestQuoteScreen } from "./request-quote-screen";

const navigation = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({ useRouter: () => navigation }));

describe("RequestQuoteScreen", () => {
  beforeEach(() => {
    navigation.push.mockReset();
    vi.spyOn(cartService, "get").mockResolvedValue(checkoutItems.map((item) => ({ ...item, quantity: 1 })));
  });

  it("submits selected products once and opens the success screen", async () => {
    const user = userEvent.setup();
    let resolveQuote: ((submission: QuoteSubmission) => void) | undefined;
    const request = new Promise<QuoteSubmission>((resolve) => {
      resolveQuote = resolve;
    });
    const submitSpy = vi.spyOn(quoteService, "submit").mockReturnValue(request);

    renderWithProviders(<RequestQuoteScreen />);
    const submit = await screen.findByRole("button", { name: "Submit request" });
    expect(screen.getByRole("combobox", { name: "Phone country code" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Phone number" })).toBeInTheDocument();
    await user.click(submit);
    await user.click(submit);

    expect(submitSpy).toHaveBeenCalledTimes(1);
    expect(submit).toBeDisabled();

    resolveQuote?.({ reference: "RFQ-ABC12345", status: "submitted" });
    await waitFor(() => expect(navigation.push).toHaveBeenCalledWith("/request-quote/success?reference=RFQ-ABC12345"));
  });
});
