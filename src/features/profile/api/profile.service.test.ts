import { afterEach, describe, expect, it, vi } from "vitest";

const httpClient = vi.hoisted(() => ({ get: vi.fn(), post: vi.fn(), put: vi.fn() }));

vi.mock("@/lib/http-client", () => ({ httpClient }));

import { profileService } from "./profile.service";

import type { ProfileFormValues } from "../schemas/profile-form.schema";
import type { CurrentUser } from "../schemas/user.schema";

const profileResponse = {
  fullName: "Example Name",
  phoneNumber: "+84901234567",
  email: "user@labdock.local",
  companyName: "Example Company",
  companyPhone: "+84987654321",
  businessRegistrationNumber: "0123456789",
  deliveryAddress: { address: "1 Nguyen Hue", postalCode: "700000", country: "VN" },
  sameAsDeliveryAddress: false,
  billingAddress: { address: "2 Le Loi", postalCode: "700001", country: "VN" },
  profilePictureUrl: "/media/public/profile.jpg",
  passwordChangedAt: "2026-08-21T10:00:00+00:00",
  memberSince: "2025-08-21T10:00:00+00:00",
};

const currentUser: CurrentUser = {
  fullName: profileResponse.fullName,
  phone: profileResponse.phoneNumber,
  email: profileResponse.email,
  avatarUrl: "https://example.com/profile.jpg",
  companyName: profileResponse.companyName,
  companyPhone: profileResponse.companyPhone,
  businessRegistrationNumber: profileResponse.businessRegistrationNumber,
  deliveryAddress: profileResponse.deliveryAddress.address,
  postalCode: profileResponse.deliveryAddress.postalCode,
  country: profileResponse.deliveryAddress.country,
  billingSameAsDelivery: false,
  billingAddress: profileResponse.billingAddress,
  role: "unknown",
  joinedAt: "2025-08-21T10:00:00.000Z",
  lastActiveAt: null,
  passwordChangedAt: "2026-08-21T10:00:00.000Z",
};

const updateInput: ProfileFormValues = {
  fullName: "Updated Name",
  phone: "+84909999999",
  email: "updated@labdock.local",
  companyName: "Updated Company",
  companyPhone: "+84908888888",
  businessRegistrationNumber: "9876543210",
  deliveryAddress: "3 Dong Khoi",
  postalCode: "700002",
  country: "VN",
  billingSameAsDelivery: true,
};

describe("profileService", () => {
  afterEach(() => {
    httpClient.get.mockReset();
    httpClient.post.mockReset();
    httpClient.put.mockReset();
  });

  it("loads and maps the authenticated profile contract", async () => {
    httpClient.get.mockResolvedValue({ data: profileResponse });
    const controller = new AbortController();

    const result = await profileService.getCurrent(controller.signal);

    expect(httpClient.get).toHaveBeenCalledWith("/me/profile", { signal: controller.signal });
    expect(result).toEqual(
      expect.objectContaining({
        fullName: profileResponse.fullName,
        phone: profileResponse.phoneNumber,
        email: profileResponse.email,
        deliveryAddress: profileResponse.deliveryAddress.address,
        postalCode: profileResponse.deliveryAddress.postalCode,
        country: "VN",
        billingSameAsDelivery: false,
        billingAddress: profileResponse.billingAddress,
        role: "unknown",
        joinedAt: "2025-08-21T10:00:00.000Z",
        passwordChangedAt: "2026-08-21T10:00:00.000Z",
      }),
    );
    expect(result.avatarUrl).toContain("/media/public/profile.jpg");
  });

  it("rejects an invalid profile response at the API boundary", async () => {
    httpClient.get.mockResolvedValue({ data: { ...profileResponse, email: "invalid" } });

    await expect(profileService.getCurrent()).rejects.toThrow();
  });

  it("normalizes optional profile fields that are null for incomplete accounts", async () => {
    httpClient.get.mockResolvedValue({
      data: {
        ...profileResponse,
        phoneNumber: null,
        companyPhone: null,
        businessRegistrationNumber: null,
        deliveryAddress: null,
        billingAddress: null,
        profilePictureUrl: null,
        passwordChangedAt: null,
      },
    });

    const result = await profileService.getCurrent();

    expect(result).toEqual(
      expect.objectContaining({
        phone: "",
        companyPhone: "",
        businessRegistrationNumber: "",
        deliveryAddress: "",
        billingAddress: { address: "", postalCode: "", country: "" },
        avatarUrl: "/auth/company-logo.png",
        passwordChangedAt: null,
      }),
    );
  });

  it("updates the authenticated profile with the API contract and maps the response", async () => {
    const updatedResponse = {
      ...profileResponse,
      fullName: updateInput.fullName,
      phoneNumber: updateInput.phone,
      email: updateInput.email,
      companyName: updateInput.companyName,
      companyPhone: updateInput.companyPhone,
      businessRegistrationNumber: updateInput.businessRegistrationNumber,
      deliveryAddress: {
        address: updateInput.deliveryAddress,
        postalCode: updateInput.postalCode,
        country: updateInput.country,
      },
      sameAsDeliveryAddress: true,
      billingAddress: {
        address: updateInput.deliveryAddress,
        postalCode: updateInput.postalCode,
        country: updateInput.country,
      },
    };
    httpClient.put.mockResolvedValue({ data: updatedResponse });

    const result = await profileService.updateCurrent(updateInput, currentUser);

    expect(httpClient.put).toHaveBeenCalledWith("/me/profile", {
      fullName: updateInput.fullName,
      phoneNumber: updateInput.phone,
      email: updateInput.email,
      companyName: updateInput.companyName,
      companyPhone: updateInput.companyPhone,
      businessRegistrationNumber: updateInput.businessRegistrationNumber,
      deliveryAddress: updatedResponse.deliveryAddress,
      sameAsDeliveryAddress: true,
      billingAddress: updatedResponse.deliveryAddress,
    });
    expect(result).toEqual(
      expect.objectContaining({
        fullName: updateInput.fullName,
        phone: updateInput.phone,
        billingSameAsDelivery: true,
        billingAddress: updatedResponse.billingAddress,
      }),
    );
  });

  it("preserves the current billing address when it differs from delivery", async () => {
    const input = { ...updateInput, billingSameAsDelivery: false };
    httpClient.put.mockResolvedValue({
      data: { ...profileResponse, sameAsDeliveryAddress: false, billingAddress: currentUser.billingAddress },
    });

    await profileService.updateCurrent(input, currentUser);

    expect(httpClient.put).toHaveBeenCalledWith(
      "/me/profile",
      expect.objectContaining({
        sameAsDeliveryAddress: false,
        billingAddress: currentUser.billingAddress,
      }),
    );
  });

  it("rejects an invalid update response at the API boundary", async () => {
    httpClient.put.mockResolvedValue({ data: { ...profileResponse, email: "invalid" } });

    await expect(profileService.updateCurrent(updateInput, currentUser)).rejects.toThrow();
  });

  it("changes the authenticated user's password with the API contract", async () => {
    const input = {
      currentPassword: "CurrentPassw0rd!",
      newPassword: "NewPassw0rd!",
      confirmPassword: "NewPassw0rd!",
    };
    httpClient.post.mockResolvedValue({ data: undefined });

    await expect(profileService.changePassword(input)).resolves.toBeUndefined();
    expect(httpClient.post).toHaveBeenCalledWith("/auth/change-password", input);
  });

  it("does not send an invalid password change request", async () => {
    await expect(
      profileService.changePassword({
        currentPassword: "CurrentPassw0rd!",
        newPassword: "NewPassw0rd!",
        confirmPassword: "DifferentPassw0rd!",
      }),
    ).rejects.toThrow();
    expect(httpClient.post).not.toHaveBeenCalled();
  });
});
