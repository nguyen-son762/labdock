import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import messages from "../../../../messages/en.json";
import { AppProviders } from "@/providers/app-providers";

import { profileService } from "../api/profile.service";
import type { CurrentUser } from "../schemas/user.schema";
import { ProfileScreen } from "./profile-screen";

function ProfileTestProviders({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={messages} timeZone="Asia/Singapore">
      <AppProviders>{children}</AppProviders>
    </NextIntlClientProvider>
  );
}

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
      <ProfileTestProviders>
        <ProfileScreen />
      </ProfileTestProviders>,
    );

    expect(await screen.findByRole("heading", { name: "Sarah Chen" })).toBeInTheDocument();
    await interaction.click(screen.getByRole("button", { name: "Edit" }));

    expect(screen.getByRole("textbox", { name: /Full name/ })).toHaveValue("Sarah Chen");
    expect(screen.getByRole("combobox", { name: "Country *" })).toHaveTextContent("Singapore");
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
      <ProfileTestProviders>
        <ProfileScreen />
      </ProfileTestProviders>,
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

  it("uploads and saves a selected avatar on the profile", async () => {
    vi.spyOn(profileService, "getCurrent").mockResolvedValue(user);
    const updateAvatar = vi.spyOn(profileService, "updateAvatar").mockResolvedValue({
      ...user,
      avatarUrl: "/media/public/updated-avatar.jpg",
    });
    const interaction = userEvent.setup();

    render(
      <ProfileTestProviders>
        <ProfileScreen />
      </ProfileTestProviders>,
    );

    expect(await screen.findByRole("heading", { name: "Sarah Chen" })).toBeInTheDocument();
    await interaction.click(screen.getByRole("button", { name: "Change profile picture" }));

    const file = new File(["avatar"], "avatar.png", { type: "image/png" });
    await interaction.upload(screen.getByLabelText("Choose profile picture"), file);
    expect(await screen.findByText("avatar.png")).toBeInTheDocument();

    await interaction.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => expect(updateAvatar).toHaveBeenCalledWith(file, user));
    expect(screen.queryByText("avatar.png")).not.toBeInTheDocument();
  });

  it("PRO-049 clears the old selection when a replacement file is invalid", async () => {
    vi.spyOn(profileService, "getCurrent").mockResolvedValue(user);
    const updateAvatar = vi.spyOn(profileService, "updateAvatar").mockResolvedValue(user);
    const interaction = userEvent.setup({ applyAccept: false });
    render(
      <ProfileTestProviders>
        <ProfileScreen />
      </ProfileTestProviders>,
    );
    await screen.findByRole("heading", { name: "Sarah Chen" });
    await interaction.click(screen.getByRole("button", { name: "Change profile picture" }));
    const input = screen.getByLabelText("Choose profile picture");
    await interaction.upload(input, new File(["image"], "valid.png", { type: "image/png" }));
    await interaction.upload(input, new File(["gif"], "invalid.gif", { type: "image/gif" }));
    expect(screen.getByRole("alert")).toHaveTextContent("PNG or JPG");
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    expect(screen.queryByText("valid.png")).not.toBeInTheDocument();
    expect(updateAvatar).not.toHaveBeenCalled();
  });

  it("PRO-051 resets a saved file before the dialog is reopened", async () => {
    vi.spyOn(profileService, "getCurrent").mockResolvedValue(user);
    vi.spyOn(profileService, "updateAvatar").mockResolvedValue(user);
    const interaction = userEvent.setup();
    render(
      <ProfileTestProviders>
        <ProfileScreen />
      </ProfileTestProviders>,
    );
    await screen.findByRole("heading", { name: "Sarah Chen" });
    const trigger = screen.getByRole("button", { name: "Change profile picture" });
    await interaction.click(trigger);
    await interaction.upload(
      screen.getByLabelText("Choose profile picture"),
      new File(["image"], "saved.png", { type: "image/png" }),
    );
    await interaction.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await interaction.click(trigger);
    expect(screen.queryByText("saved.png")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });
  it("PRO-042 displays the password change date returned by the API", async () => {
    vi.spyOn(profileService, "getCurrent").mockResolvedValue(user);
    render(
      <ProfileTestProviders>
        <ProfileScreen />
      </ProfileTestProviders>,
    );
    expect(await screen.findByText(/Last changed:/)).toHaveTextContent("Aug 21, 2026");
  });
});
