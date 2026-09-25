import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AppProviders } from "@/providers/app-providers";

import { profileService } from "../api/profile.service";
import type { CurrentUser } from "../schemas/user.schema";
import { ProfileScreen } from "./profile-screen";

const user: CurrentUser = {
  fullName: "Sarah Chen",
  email: "sarah_chen@biogenix.com.sg",
  phone: "+65 88009900",
  avatarUrl: "/profile/sarah-chen.png",
  companyName: "Biogenix Pte Ltd",
  companyPhone: "67073597",
  businessRegistrationNumber: "202012345Z",
  deliveryAddress: "745 Lor. 5 Toa Payoh",
  postalCode: "319455",
  country: "Singapore",
  billingSameAsDelivery: true,
  billingAddress: {
    address: "745 Lor. 5 Toa Payoh",
    postalCode: "319455",
    country: "Singapore",
  },
  role: "member",
  joinedAt: "2025-01-08T00:00:00.000Z",
  lastActiveAt: null,
  passwordChangedAt: "2026-08-21T10:00:00.000Z",
};

describe("ProfileScreen", () => {
  it("keeps profile and password editing independent", async () => {
    vi.spyOn(profileService, "getCurrent").mockResolvedValue(user);
    const interaction = userEvent.setup();

    render(
      <AppProviders>
        <ProfileScreen />
      </AppProviders>,
    );

    expect(await screen.findByRole("heading", { name: "Sarah Chen" })).toBeInTheDocument();
    await interaction.click(screen.getByRole("button", { name: "Edit" }));

    expect(screen.getByRole("textbox", { name: /Full name/ })).toHaveValue("Sarah Chen");
    expect(screen.queryByLabelText(/Current password/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();

    await interaction.click(screen.getByRole("button", { name: "Cancel" }));
    await interaction.click(screen.getByRole("button", { name: "Change password" }));

    expect(screen.getByLabelText(/Current password/)).toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: /Full name/ })).not.toBeInTheDocument();

    await interaction.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByLabelText(/Current password/)).not.toBeInTheDocument();
  });

  it("submits and clears the change-password form after a successful request", async () => {
    vi.spyOn(profileService, "getCurrent").mockResolvedValue(user);
    const changePassword = vi.spyOn(profileService, "changePassword").mockResolvedValue();
    const interaction = userEvent.setup();

    render(
      <AppProviders>
        <ProfileScreen />
      </AppProviders>,
    );

    expect(await screen.findByRole("heading", { name: "Sarah Chen" })).toBeInTheDocument();
    await interaction.click(screen.getByRole("button", { name: "Change password" }));
    await interaction.type(screen.getByLabelText(/Current password/), "CurrentPassw0rd!");
    await interaction.type(screen.getByLabelText(/^New password/), "NewPassw0rd!");
    await interaction.type(screen.getByLabelText(/Confirm password/), "NewPassw0rd!");
    await interaction.click(screen.getByRole("button", { name: "Save changes" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Password updated.");
    expect(changePassword).toHaveBeenCalledWith({
      currentPassword: "CurrentPassw0rd!",
      newPassword: "NewPassw0rd!",
      confirmPassword: "NewPassw0rd!",
    });
    expect(screen.getByLabelText(/Current password/)).toHaveValue("");
    expect(screen.getByLabelText(/^New password/)).toHaveValue("");
    expect(screen.getByLabelText(/Confirm password/)).toHaveValue("");
  });
});
