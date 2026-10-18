import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/render-with-providers";
import { profileService } from "../api/profile.service";
import { profileFixture as profile } from "../test/profile-fixture";
import { ProfileScreen } from "./profile-screen";

const labels: Record<string, RegExp> = {
  fullName: /^Full name/,
  phone: /^Phone no/,
  companyName: /^Company name/,
  companyPhone: /^Company phone/,
  businessRegistrationNumber: /^Business registration/,
  deliveryAddress: /^Address/,
  postalCode: /^Postal code/,
};
const cases: [string, string, string, boolean][] = [
  ["PRO-006", "fullName", "A", false],
  ["PRO-007", "fullName", "AA", true],
  ["PRO-008", "fullName", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true],
  ["PRO-009", "fullName", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", false],
  ["PRO-010", "phone", "0111111", false],
  ["PRO-011", "phone", "01111111", true],
  ["PRO-012", "phone", "01111111111111111111", true],
  ["PRO-013", "phone", "011111111111111111111", false],
  ["PRO-014", "companyName", "A", false],
  ["PRO-015", "companyName", "AA", true],
  [
    "PRO-016",
    "companyName",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    true,
  ],
  [
    "PRO-017",
    "companyName",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    false,
  ],
  ["PRO-018", "deliveryAddress", "AAAA", false],
  ["PRO-019", "deliveryAddress", "AAAAA", true],
  [
    "PRO-020",
    "deliveryAddress",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    true,
  ],
  [
    "PRO-021",
    "deliveryAddress",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    false,
  ],
  ["PRO-022", "postalCode", "011", false],
  ["PRO-023", "postalCode", "0111", true],
  ["PRO-024", "postalCode", "011111111111", true],
  ["PRO-025", "postalCode", "0111111111111", false],
  ["PRO-026", "companyPhone", "", true],
  ["PRO-027", "companyPhone", "01111", false],
  ["PRO-028", "companyPhone", "011111", true],
  ["PRO-029", "companyPhone", "01111111111111111111", true],
  ["PRO-030", "companyPhone", "011111111111111111111", false],
  ["PRO-031", "businessRegistrationNumber", "", true],
  ["PRO-032", "businessRegistrationNumber", "AA", false],
  ["PRO-033", "businessRegistrationNumber", "AAA", true],
  ["PRO-034", "businessRegistrationNumber", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true],
  ["PRO-035", "businessRegistrationNumber", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", false],
];

describe("Profile field boundaries from the QA catalogue", () => {
  it.each(cases)("%s validates %s before calling the update service", async (_id, field, value, valid) => {
    vi.spyOn(profileService, "getCurrent").mockResolvedValue(profile);
    const update = vi.spyOn(profileService, "updateCurrent").mockResolvedValue(profile);
    const interaction = userEvent.setup();
    renderWithProviders(<ProfileScreen />);
    await screen.findByRole("heading", { name: "QA Tester" });
    await interaction.click(screen.getByRole("button", { name: "Edit" }));
    const label = labels[field];
    if (!label) throw new Error(`Missing label for ${field}`);
    const input = screen.getByRole("textbox", { name: label });
    fireEvent.change(input, { target: { value } });
    await interaction.click(screen.getByRole("button", { name: "Save changes" }));
    if (valid) {
      await waitFor(() => expect(update).toHaveBeenCalledOnce());
      expect(update.mock.calls[0]?.[0]).toMatchObject({ [field]: value.trim() });
    } else {
      await waitFor(() => expect(input).toHaveAttribute("aria-invalid", "true"));
      expect(update).not.toHaveBeenCalled();
    }
  });
});
