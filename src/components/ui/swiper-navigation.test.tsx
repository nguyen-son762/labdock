import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SwiperNavigation } from "./swiper-navigation";

describe("SwiperNavigation", () => {
  it("exposes accessible Swiper controls and respects edge state", async () => {
    const user = userEvent.setup();
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(<SwiperNavigation label="products" previousDisabled onPrevious={onPrevious} onNext={onNext} />);

    expect(screen.getByRole("button", { name: "Previous products" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Next products" }));

    expect(onPrevious).not.toHaveBeenCalled();
    expect(onNext).toHaveBeenCalledOnce();
  });
});
