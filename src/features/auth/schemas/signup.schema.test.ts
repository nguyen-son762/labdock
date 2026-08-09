import { describe, expect, it } from "vitest";

import { signupSchema, verificationSchema } from "./signup.schema";

describe("signupSchema", () => {
  it("chấp nhận và chuẩn hóa đầy đủ thông tin tài khoản", () => {
    const result = signupSchema.parse({
      company: "  Labdock Pte Ltd  ",
      fullName: "  Son Nguyen  ",
      email: "  son@example.com  ",
      phoneCode: "+65",
      phone: "91234567",
      country: "Singapore",
      region: "Central Region",
      address: "  1 Science Park Road  ",
    });

    expect(result).toMatchObject({
      company: "Labdock Pte Ltd",
      fullName: "Son Nguyen",
      email: "son@example.com",
      address: "1 Science Park Road",
    });
  });

  it("từ chối các trường bắt buộc còn thiếu", () => {
    const result = signupSchema.safeParse({
      company: "",
      fullName: "",
      email: "",
      phoneCode: "+65",
      phone: "123",
      country: "",
      region: "",
      address: "",
    });

    expect(result.success).toBe(false);
  });
});

describe("verificationSchema", () => {
  it("chỉ chấp nhận mã OTP gồm đúng 6 chữ số", () => {
    expect(verificationSchema.safeParse({ code: "123456" }).success).toBe(true);
    expect(verificationSchema.safeParse({ code: "12345" }).success).toBe(false);
    expect(verificationSchema.safeParse({ code: "12a456" }).success).toBe(false);
  });
});
