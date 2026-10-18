import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/render-with-providers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileService } from "@/features/profile";
import { authService } from "../api/auth.service";
import { useSignupMutation } from "../api/use-signup-mutation";
import { signupSchema, type SignupValues } from "../schemas/signup.schema";
import { LoginForm } from "./login-form";
import { SignupAccountForm } from "./signup-account-form";
vi.mock("@/i18n/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/i18n/navigation")>()),
  useRouter: () => ({ replace: vi.fn() }),
}));
const loginCases: [string, string, string, boolean][] = [
  ["AUTH-003", "email", "", false],
  ["AUTH-004", "email", "   ", false],
  ["AUTH-005", "email", "qa.example.test", false],
  ["AUTH-006", "email", "qa+tag@example.test", true],
  ["AUTH-007", "password", "AAAAAAA", false],
  ["AUTH-008", "password", "AAAAAAAA", true],
  [
    "AUTH-009",
    "password",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    true,
  ],
  [
    "AUTH-010",
    "password",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    false,
  ],
];
const signupCases: [string, string, string, boolean][] = [
  ["AUTH-016", "company", "   ", false],
  ["AUTH-017", "company", "  QA Lab  ", true],
  ["AUTH-018", "fullName", "   ", false],
  ["AUTH-019", "fullName", "  QA Lab  ", true],
  ["AUTH-020", "region", "   ", false],
  ["AUTH-021", "region", "  QA Lab  ", true],
  ["AUTH-022", "address", "   ", false],
  ["AUTH-023", "address", "  QA Lab  ", true],
  [
    "AUTH-024",
    "company",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    true,
  ],
  [
    "AUTH-025",
    "company",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    false,
  ],
  ["AUTH-026", "phone", "01111", false],
  ["AUTH-027", "phone", "011111", true],
  ["AUTH-028", "phone", "011111111111111", true],
  ["AUTH-029", "phone", "0111111111111111", false],
  ["AUTH-030", "phone", "090 123-456", false],
];
const signupLabels: Record<string, RegExp> = {
  company: /^Company name/,
  fullName: /^Full name/,
  region: /^Region/,
  address: /^Address/,
  phone: /^Phone number/,
};
function SignupFixture() {
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      company: "QA Company",
      fullName: "QA Tester",
      email: "qa@example.test",
      phoneCode: "+84",
      phone: "901234567",
      country: "VN",
      region: "Ho Chi Minh",
      address: "123 Test Street",
    },
  });
  const mutation = useSignupMutation();
  return (
    <SignupAccountForm
      form={form}
      signupMutation={mutation}
      onSubmit={(values) => mutation.mutate(values)}
      errorMessage={() => null}
    />
  );
}
describe("Authentication boundaries from the QA catalogue", () => {
  it.each(loginCases)("%s validates login %s before calling the service", async (_id, field, value, valid) => {
    const login = vi
      .spyOn(authService, "login")
      .mockResolvedValue({ authenticated: true, expiresAt: "2099-01-01T00:00:00Z", mustChangePassword: false });
    vi.spyOn(profileService, "getCurrent").mockRejectedValue(new Error("No profile fixture"));
    renderWithProviders(<LoginForm />);
    fireEvent.change(screen.getByLabelText("Email address *"), { target: { value: "qa@example.test" } });
    fireEvent.change(screen.getByLabelText("Password *"), { target: { value: "Passw0rd!" } });
    const input = screen.getByLabelText(field === "email" ? "Email address *" : "Password *");
    fireEvent.change(input, { target: { value } });
    await userEvent.setup().click(screen.getByRole("button", { name: "Log in" }));
    if (valid) {
      await waitFor(() => expect(login).toHaveBeenCalledOnce());
      expect(login.mock.calls[0]?.[0]).toMatchObject({ [field]: field === "email" ? value.trim() : value });
    } else {
      await waitFor(() => expect(input).toHaveAttribute("aria-invalid", "true"));
      expect(login).not.toHaveBeenCalled();
    }
  });
  it.each(signupCases)("%s validates signup %s before calling the service", async (_id, field, value, valid) => {
    const signup = vi
      .spyOn(authService, "signup")
      .mockResolvedValue({ challengeId: "11111111-1111-4111-8111-111111111111", expiresAt: "2099-01-01T00:00:00Z" });
    renderWithProviders(<SignupFixture />);
    const label = signupLabels[field];
    if (!label) throw new Error(`Missing label for ${field}`);
    const input = screen.getByLabelText(label);
    fireEvent.change(input, { target: { value } });
    await userEvent.setup().click(screen.getByRole("button", { name: "Send OTP" }));
    if (valid) {
      await waitFor(() => expect(signup).toHaveBeenCalledOnce());
      expect(signup.mock.calls[0]?.[0]).toMatchObject({ [field]: value.trim() });
    } else {
      await waitFor(() => expect(input).toHaveAttribute("aria-invalid", "true"));
      expect(signup).not.toHaveBeenCalled();
    }
  });
});
