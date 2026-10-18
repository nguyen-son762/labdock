import axios from "axios";
import { describe, expect, it } from "vitest";

import { getApiErrorMessage } from "./api-error";

describe("getApiErrorMessage", () => {
  it("reads RFC problem details returned by the authentication API", () => {
    const error = new axios.AxiosError("Unauthorized", "ERR_BAD_REQUEST", undefined, undefined, {
      data: { title: "invalid_credentials", detail: "Invalid email or password." },
      status: 401,
      statusText: "Unauthorized",
      headers: {},
      config: { headers: new axios.AxiosHeaders() },
    });

    expect(getApiErrorMessage(error)).toBe("Invalid email or password.");
  });
  it("SYS-019 hides internal messages and details from server failures", () => {
    const error = new axios.AxiosError("Internal server error", "ERR_BAD_RESPONSE", undefined, undefined, {
      data: { message: "database_password=synthetic-secret", detail: "Internal stack trace" },
      status: 500,
      statusText: "Server error",
      headers: {},
      config: { headers: new axios.AxiosHeaders() },
    });
    expect(getApiErrorMessage(error)).not.toMatch(/synthetic-secret|stack trace/);
  });

  it.each([
    [400, "Yêu cầu chưa hợp lệ."],
    [401, "Phiên đăng nhập đã hết hạn."],
    [403, "Bạn không có quyền"],
    [404, "Không tìm thấy dữ liệu"],
    [409, "Dữ liệu đã thay đổi."],
    [429, "Bạn thao tác quá nhanh."],
  ] as const)("SYS-018 uses the fallback for status %s", (status, expected) => {
    const error = new axios.AxiosError("failure", "ERR_BAD_REQUEST", undefined, undefined, {
      data: {},
      status,
      statusText: "failure",
      headers: {},
      config: { headers: new axios.AxiosHeaders() },
    });
    expect(getApiErrorMessage(error)).toContain(expected);
  });
  it("SYS-018 prefers a public message to detail and handles opaque failures", () => {
    const error = new axios.AxiosError("failure", "ERR_BAD_REQUEST", undefined, undefined, {
      data: { message: "Message", detail: "Detail" },
      status: 400,
      statusText: "failure",
      headers: {},
      config: { headers: new axios.AxiosHeaders() },
    });
    expect(getApiErrorMessage(error)).toBe("Message");
    expect(getApiErrorMessage(new Error("private error"))).not.toContain("private error");
    expect(getApiErrorMessage(new axios.CanceledError())).toBe("Yêu cầu đã được hủy.");
    expect(getApiErrorMessage(new axios.AxiosError("network"))).toContain("Không thể kết nối");
  });
});
