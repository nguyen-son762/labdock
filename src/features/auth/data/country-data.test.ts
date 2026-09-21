import { describe, expect, it } from "vitest";

import callingCodeData from "./calling-codes.json";
import countryData from "./countries.json";

describe("signup country data", () => {
  it("contains a complete ISO country list with a calling code for every entry", () => {
    expect(countryData).toHaveLength(249);
    expect(new Set(countryData.map((country) => country.code)).size).toBe(countryData.length);
    expect(callingCodeData).toHaveLength(countryData.length);
    expect(new Set(callingCodeData.map((country) => country.countryCode))).toEqual(
      new Set(countryData.map((country) => country.code)),
    );
    expect(
      callingCodeData.every(
        ({ countryCode, countryName, dialCode }) =>
          countryCode.length === 2 && countryName.length > 0 && /^\+\d+$/.test(dialCode),
      ),
    ).toBe(true);
  });

  it("includes the default Singapore and Vietnam calling codes", () => {
    expect(callingCodeData.find((entry) => entry.countryCode === "SG")?.dialCode).toBe("+65");
    expect(callingCodeData.find((entry) => entry.countryCode === "VN")?.dialCode).toBe("+84");
  });
});
