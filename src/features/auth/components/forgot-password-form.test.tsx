import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { authService } from "../api/auth.service";
import { ForgotPasswordForm } from "./forgot-password-form";

const challenge = {
  challengeId: "11111111-1111-1111-1111-111111111111",
  expiresAt: "2099-08-21T10:00:00+00:00",
};

describe("ForgotPasswordForm", () => {
  it("completes the email, OTP verification and new password flow", async () => {
    const startSpy = vi.spyOn(authService, "startForgotPassword").mockResolvedValue(challenge);
    const verifySpy = vi.spyOn(authService, "verifyForgotPassword").mockResolvedValue(undefined);
    const resetSpy = vi.spyOn(authService, "resetForgotPassword").mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderWithProviders(<ForgotPasswordForm />);

    await user.type(screen.getByLabelText("Email address *"), "user@labdock.local");
    await user.click(screen.getByRole("button", { name: "Send verification code" }));

    expect(await screen.findByRole("heading", { name: "Verify your email" })).toBeInTheDocument();
    expect(startSpy).toHaveBeenCalledWith({ email: "user@labdock.local" }, expect.anything());

    const otpInputs = screen.getAllByRole("textbox", { name: /Secure code digit/ });
    for (const [index, digit] of [..."123456"].entries()) {
      const input = otpInputs[index];
      if (input) await user.type(input, digit);
    }
    await user.click(screen.getByRole("button", { name: "Verify" }));

    expect(await screen.findByRole("heading", { name: "Set a new password" })).toBeInTheDocument();
    expect(verifySpy).toHaveBeenCalledWith({ challengeId: challenge.challengeId, code: "123456" }, expect.anything());

    await user.type(screen.getByLabelText("New password *"), "Passw0rd!");
    await user.type(screen.getByLabelText("Confirm new password *"), "Passw0rd!");
    await user.click(screen.getByRole("button", { name: "Reset password" }));

    await waitFor(() => {
      expect(resetSpy).toHaveBeenCalledWith(
        {
          challengeId: challenge.challengeId,
          newPassword: "Passw0rd!",
          confirmPassword: "Passw0rd!",
        },
        expect.anything(),
      );
    });
    expect(await screen.findByRole("status")).toHaveTextContent("reset successfully");
  }, 10_000);
});
