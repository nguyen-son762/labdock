import { describe, expect, it } from "vitest";

import { loginSchema } from "./login.schema";

describe("loginSchema", () => {
  it("chuẩn hóa email và chấp nhận thông tin đăng nhập hợp lệ", () => {
    const result = loginSchema.parse({
      email: "  user@labdock.vn ",
      password: "mat-khau-an-toan",
      remember: true,
    });

    expect(result.email).toBe("user@labdock.vn");
  });

  it("từ chối email sai và mật khẩu ngắn", () => {
    const result = loginSchema.safeParse({
      email: "khong-phai-email",
      password: "123",
      remember: false,
    });

    expect(result.success).toBe(false);
  });
});
