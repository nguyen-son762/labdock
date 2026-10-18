import type { CurrentUser } from "../schemas/user.schema";

export const profileFixture: CurrentUser = {
  fullName: "QA Tester",
  email: "qa@example.test",
  phone: "+65 88009900",
  avatarUrl: "/auth/company-logo.png",
  companyName: "QA Company",
  companyPhone: "12345678",
  businessRegistrationNumber: "123456",
  deliveryAddress: "123 Test Street",
  postalCode: "012345",
  country: "SG",
  billingSameAsDelivery: true,
  billingAddress: { address: "123 Test Street", postalCode: "012345", country: "SG" },
  role: "unknown",
  joinedAt: "2026-01-01T00:00:00Z",
  lastActiveAt: null,
  passwordChangedAt: null,
};
