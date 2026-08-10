import { describe, expect, it } from "vitest";

import { passwordFormSchema, profileFormSchema } from "./profile-form.schema";

const validProfile = {
  fullName: "Sarah Chen",
  phone: "+65 88009900",
  email: "sarah_chen@biogenix.com.sg",
  companyName: "Biogenix Pte Ltd",
  companyPhone: "67073597",
  businessRegistrationNumber: "202012345Z",
  deliveryAddress: "745 Lor. 5 Toa Payoh",
  postalCode: "319455",
  country: "Singapore",
  billingSameAsDelivery: true,
};

describe("profileFormSchema", () => {
  it("trims user-entered profile values", () => {
    expect(profileFormSchema.parse({ ...validProfile, fullName: "  Sarah Chen  " }).fullName).toBe("Sarah Chen");
  });

  it("rejects an invalid email address", () => {
    expect(profileFormSchema.safeParse({ ...validProfile, email: "invalid" }).success).toBe(false);
  });
});

describe("passwordFormSchema", () => {
  it("rejects mismatched passwords", () => {
    const result = passwordFormSchema.safeParse({
      currentPassword: "current123",
      newPassword: "new-password",
      confirmPassword: "different-password",
    });
    expect(result.success).toBe(false);
  });
});
