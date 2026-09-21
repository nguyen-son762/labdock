import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { authService } from "../api/auth.service";
import { SignupForm } from "./signup-form";

const challenge = {
  challengeId: "11111111-1111-1111-1111-111111111111",
  expiresAt: "2099-08-21T10:00:00+00:00",
};

describe("SignupForm", () => {
  it("completes the start, OTP verification and password flow with one challenge id", async () => {
    const startSpy = vi.spyOn(authService, "signup").mockResolvedValue(challenge);
    const verifySpy = vi.spyOn(authService, "verifySignup").mockResolvedValue(undefined);
    const completeSpy = vi.spyOn(authService, "completeSignup").mockResolvedValue({
      userId: "22222222-2222-2222-2222-222222222222",
      email: "user@labdock.local",
    });
    const user = userEvent.setup();
    renderWithProviders(<SignupForm />);

    await user.type(screen.getByLabelText("Company name *"), "Example Name");
    await user.type(screen.getByLabelText("Full name *"), "Example Name");
    await user.type(screen.getByLabelText("Email address *"), "user@labdock.local");
    await user.click(screen.getByRole("combobox", { name: "Calling code" }));
    await user.click(screen.getByRole("option", { name: "+84" }));
    await user.type(screen.getByLabelText("Phone number"), "0901234567");
    await user.click(screen.getByRole("combobox", { name: "Country *" }));
    await user.click(screen.getByRole("option", { name: "Vietnam" }));
    await user.type(screen.getByLabelText("Region *"), "HCM");
    await user.type(screen.getByLabelText("Address *"), "1 Nguyen Hue");
    await user.click(screen.getByRole("button", { name: "Send OTP" }));

    expect(await screen.findByRole("heading", { name: "Verify your email" })).toBeInTheDocument();
    expect(startSpy).toHaveBeenCalledWith(
      {
        company: "Example Name",
        fullName: "Example Name",
        email: "user@labdock.local",
        phoneCode: "+84",
        phone: "0901234567",
        country: "VN",
        region: "HCM",
        address: "1 Nguyen Hue",
      },
      expect.anything(),
    );

    const otpInputs = screen.getAllByRole("textbox", { name: /Secure code digit/ });
    for (const [index, digit] of [..."123456"].entries()) {
      const input = otpInputs[index];
      if (input) await user.type(input, digit);
    }
    await user.click(screen.getByRole("button", { name: "Verify" }));

    expect(await screen.findByRole("heading", { name: "Set your password" })).toBeInTheDocument();
    expect(verifySpy).toHaveBeenCalledWith({ challengeId: challenge.challengeId, code: "123456" }, expect.anything());

    await user.type(screen.getByLabelText("Password *"), "Passw0rd!");
    await user.type(screen.getByLabelText("Confirm password *"), "Passw0rd!");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    await waitFor(() => {
      expect(completeSpy).toHaveBeenCalledWith(
        {
          challengeId: challenge.challengeId,
          password: "Passw0rd!",
          confirmPassword: "Passw0rd!",
        },
        expect.anything(),
      );
    });
    expect(await screen.findByRole("status")).toHaveTextContent("user@labdock.local");
  }, 10_000);
});
