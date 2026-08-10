import { describe, expect, it } from "vitest";

import en from "../../messages/en.json";
import vi from "../../messages/vi.json";

function flattenKeys(value: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof child === "object" && child !== null ? flattenKeys(child as Record<string, unknown>, path) : [path];
  });
}

describe("translation messages", () => {
  it("keeps Vietnamese and English message contracts in sync", () => {
    expect(flattenKeys(vi).sort()).toEqual(flattenKeys(en).sort());
  });
});
