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
});
