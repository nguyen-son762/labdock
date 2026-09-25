import { clientEnv } from "@/config/client-env";
import { httpClient } from "@/lib/http-client";

import {
  passwordFormSchema,
  profileFormSchema,
  type PasswordFormValues,
  type ProfileFormValues,
} from "../schemas/profile-form.schema";
import { profileResponseSchema, type ProfileResponse } from "../schemas/profile-response.schema";
import { currentUserSchema, type CurrentUser } from "../schemas/user.schema";

const MOCK_DELAY_MS = 450;
const DEFAULT_PROFILE_PICTURE_URL = "/auth/company-logo.png";

type UpdateProfileRequest = {
  fullName: string;
  phoneNumber: string;
  email: string;
  companyName: string;
  companyPhone: string;
  businessRegistrationNumber: string;
  deliveryAddress: {
    address: string;
    postalCode: string;
    country: string;
  };
  sameAsDeliveryAddress: boolean;
  billingAddress: {
    address: string;
    postalCode: string;
    country: string;
  };
};

function waitForMockApi(signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = globalThis.setTimeout(resolve, MOCK_DELAY_MS);
    signal?.addEventListener(
      "abort",
      () => {
        globalThis.clearTimeout(timeout);
        reject(new DOMException("Request aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

function resolveProfilePictureUrl(path: string): string {
  if (/^(?:https?:|data:)/i.test(path)) return path;

  const normalizedPath = path.replace(/^\/+/, "");
  if (clientEnv.NEXT_PUBLIC_API_BASE_URL.startsWith("/")) return `/${normalizedPath}`;
  return new URL(normalizedPath, `${new URL(clientEnv.NEXT_PUBLIC_API_BASE_URL).origin}/`).toString();
}

function mapProfileResponse(input: ProfileResponse): CurrentUser {
  return currentUserSchema.parse({
    fullName: input.fullName,
    email: input.email,
    phone: input.phoneNumber,
    avatarUrl: input.profilePictureUrl
      ? resolveProfilePictureUrl(input.profilePictureUrl)
      : DEFAULT_PROFILE_PICTURE_URL,
    companyName: input.companyName,
    companyPhone: input.companyPhone,
    businessRegistrationNumber: input.businessRegistrationNumber,
    deliveryAddress: input.deliveryAddress.address,
    postalCode: input.deliveryAddress.postalCode,
    country: input.deliveryAddress.country,
    billingSameAsDelivery: input.sameAsDeliveryAddress,
    billingAddress: input.billingAddress,
    role: "unknown",
    joinedAt: new Date(input.memberSince).toISOString(),
    lastActiveAt: null,
    passwordChangedAt: input.passwordChangedAt ? new Date(input.passwordChangedAt).toISOString() : null,
  });
}

function mapUpdateProfileRequest(input: ProfileFormValues, currentUser: CurrentUser): UpdateProfileRequest {
  const deliveryAddress = {
    address: input.deliveryAddress,
    postalCode: input.postalCode,
    country: input.country,
  };

  return {
    fullName: input.fullName,
    phoneNumber: input.phone,
    email: input.email,
    companyName: input.companyName,
    companyPhone: input.companyPhone,
    businessRegistrationNumber: input.businessRegistrationNumber,
    deliveryAddress,
    sameAsDeliveryAddress: input.billingSameAsDelivery,
    billingAddress: input.billingSameAsDelivery ? deliveryAddress : currentUser.billingAddress,
  };
}

export const profileService = {
  async getCurrent(signal?: AbortSignal): Promise<CurrentUser> {
    const response = await httpClient.get<unknown>("/me/profile", { signal });
    return mapProfileResponse(profileResponseSchema.parse(response.data));
  },

  async updateCurrent(input: ProfileFormValues, currentUser: CurrentUser): Promise<CurrentUser> {
    const validatedInput = profileFormSchema.parse(input);
    const validatedCurrentUser = currentUserSchema.parse(currentUser);
    const response = await httpClient.put<unknown>(
      "/me/profile",
      mapUpdateProfileRequest(validatedInput, validatedCurrentUser),
    );

    return mapProfileResponse(profileResponseSchema.parse(response.data));
  },

  async changePassword(input: PasswordFormValues): Promise<void> {
    const values = passwordFormSchema.parse(input);
    await httpClient.post<void>("/auth/change-password", values);
  },

  async updateAvatar(avatarUrl: string, currentUser: CurrentUser): Promise<CurrentUser> {
    if (!avatarUrl.startsWith("data:image/")) throw new Error("Invalid profile image.");
    await waitForMockApi();
    return currentUserSchema.parse({ ...currentUser, avatarUrl });
  },
};
