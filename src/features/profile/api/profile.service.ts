import {
  passwordFormSchema,
  profileFormSchema,
  type PasswordFormValues,
  type ProfileFormValues,
} from "../schemas/profile-form.schema";
import { currentUserSchema, type CurrentUser } from "../schemas/user.schema";

const MOCK_DELAY_MS = 450;

let currentUser: CurrentUser = currentUserSchema.parse({
  id: "user-sarah-chen",
  fullName: "Sarah Chen",
  email: "sarah_chen@biogenix.com.sg",
  phone: "+65 88009900",
  avatarUrl: "/profile/sarah-chen.png",
  companyName: "Biogenix Pte Ltd",
  companyPhone: "67073597",
  businessRegistrationNumber: "202012345Z",
  deliveryAddress: "745 Lor. 5 Toa Payoh, #03-03, The Lifeline Building",
  postalCode: "319455",
  country: "Singapore",
  billingSameAsDelivery: true,
  role: "member",
  joinedAt: "2025-01-08T00:00:00.000Z",
  lastActiveAt: "2026-08-10T01:30:00.000Z",
});

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

export const profileService = {
  async getCurrent(signal?: AbortSignal): Promise<CurrentUser> {
    await waitForMockApi(signal);
    return currentUserSchema.parse(currentUser);
  },

  async updateCurrent(input: ProfileFormValues): Promise<CurrentUser> {
    const validatedInput = profileFormSchema.parse(input);
    await waitForMockApi();
    currentUser = currentUserSchema.parse({ ...currentUser, ...validatedInput });
    return currentUser;
  },

  async changePassword(input: PasswordFormValues): Promise<void> {
    const values = passwordFormSchema.parse(input);
    await waitForMockApi();
    if (values.currentPassword === "incorrect") throw new Error("Current password is incorrect.");
  },

  async updateAvatar(avatarUrl: string): Promise<CurrentUser> {
    if (!avatarUrl.startsWith("data:image/")) throw new Error("Invalid profile image.");
    await waitForMockApi();
    currentUser = currentUserSchema.parse({ ...currentUser, avatarUrl });
    return currentUser;
  },
};
