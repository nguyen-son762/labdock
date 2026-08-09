import { describe, expect, it } from "vitest";

import { profileFormSchema } from "./profile-form.schema";

describe("profileFormSchema", () => {
  it("loại khoảng trắng thừa khỏi họ tên", () => {
    expect(profileFormSchema.parse({ fullName: "  Nguyễn An  " })).toEqual({ fullName: "Nguyễn An" });
  });

  it("từ chối họ tên quá ngắn", () => {
    expect(profileFormSchema.safeParse({ fullName: "A" }).success).toBe(false);
  });
});
