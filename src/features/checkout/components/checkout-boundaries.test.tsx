import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/render-with-providers";
import { profileService } from "@/features/profile";
import { cartService } from "../api/cart.service";
import { checkoutService } from "../api/checkout.service";
import { checkoutItems } from "../data/checkout-data";
import { CheckoutScreen } from "./checkout-screen";
vi.mock("@/i18n/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/i18n/navigation")>()),
  useRouter: () => ({ push: vi.fn() }),
}));
const cases: [string, string, string, boolean][] = [
  ["CHK-006", "fullName", "A", false],
  ["CHK-007", "fullName", "AA", true],
  ["CHK-008", "address", "AAAAAAA", false],
  ["CHK-009", "address", "AAAAAAAA", true],
  ["CHK-010", "postalCode", "01111", false],
  ["CHK-011", "postalCode", "011111", true],
  ["CHK-012", "postalCode", "0111111", false],
  ["CHK-013", "companyName", "", true],
  [
    "CHK-014",
    "companyName",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    true,
  ],
  [
    "CHK-015",
    "companyName",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    false,
  ],
];
const labels: Record<string, string> = {
  fullName: "Full name *",
  address: "Address *",
  postalCode: "Postal code *",
  companyName: "Company name",
};
describe("Checkout boundaries from the QA catalogue", () => {
  it.each(cases)("%s validates %s before preparing payment", async (_id, field, value, valid) => {
    vi.spyOn(cartService, "get").mockResolvedValue(checkoutItems);
    vi.spyOn(profileService, "getCurrent").mockRejectedValue(new Error("No profile fixture"));
    const create = vi
      .spyOn(checkoutService, "create")
      .mockResolvedValue({ paymentReference: "PAY-QATEST01", amount: 4905 });
    renderWithProviders(<CheckoutScreen />);
    await screen.findByRole("button", { name: "Make payment" });
    for (const [name, initialValue] of [
      ["Full name *", "QA Tester"],
      ["Email address *", "qa@example.test"],
      ["Phone no. *", "88009900"],
      ["Address *", "123 Test Street"],
      ["Postal code *", "012345"],
    ]) {
      fireEvent.change(screen.getByRole("textbox", { name }), { target: { value: initialValue } });
    }
    const label = labels[field];
    if (!label) throw new Error(`Missing label for ${field}`);
    const input = screen.getByRole("textbox", { name: label });
    fireEvent.change(input, { target: { value } });
    await userEvent.setup().click(screen.getByRole("button", { name: "Make payment" }));
    if (valid) {
      await waitFor(() => expect(create).toHaveBeenCalledOnce());
      expect(create.mock.calls[0]?.[0].checkout).toMatchObject({ [field]: value.trim() });
    } else {
      await waitFor(() => expect(input).toHaveAttribute("aria-invalid", "true"));
      expect(create).not.toHaveBeenCalled();
    }
  });
});
