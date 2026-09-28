import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuthShell } from "./auth-shell";

describe("AuthShell", () => {
  it("keeps the researcher artwork uncropped and anchored to the bottom of the auth panel", () => {
    const { container } = render(<AuthShell>Form content</AuthShell>);
    const researcher = container.querySelector('img[src*="researcher"]');

    expect(researcher).toHaveClass("object-contain", "object-left-bottom");
    expect(researcher?.parentElement).toHaveClass("-left-[54px]", "bottom-0", "h-[536px]", "w-[804px]");
  });
});
