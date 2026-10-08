import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SocialProofSection } from "./social-proof-section";

vi.mock("@/components/shared/service-guarantees", () => ({
  ServiceGuarantees: () => <div>Service guarantees</div>,
}));
vi.mock("./testimonial-carousel", () => ({
  TestimonialCarousel: () => <div>Testimonials</div>,
}));
const messages = {
  Home: {
    trusted: "Trusted by 500+ Research Leaders",
    pauseCarousel: "Pause autoplay",
    resumeCarousel: "Resume autoplay",
  },
};

describe("SocialProofSection", () => {
  afterEach(() => vi.unstubAllGlobals());
  it("always renders the twelve local Figma logos in design order without API brands", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((media: string) => ({
        matches: false,
        media,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SocialProofSection testimonials={[]} />
      </NextIntlClientProvider>,
    );
    const region = screen.getByRole("region", { name: "Trusted by 500+ Research Leaders" });
    const logos = within(region).getAllByRole("img");
    expect(logos.map((logo) => logo.getAttribute("alt"))).toEqual([
      "Stack&d Lab",
      "Magnolia",
      "Powersurge",
      "Warpspeed",
      "Leapyear",
      "EasyTax",
      "45 Degrees°",
      "Acme Corp",
      "AlphaWave",
      "Biosynthesia",
      "Capsule",
      "Foresight",
    ]);
    for (const logo of logos) {
      expect(logo.getAttribute("src")).toMatch(/^\/home\/research-leaders\/.+\.svg$/);
      expect(logo).toHaveAttribute("height", "32");
    }
    expect(within(region).queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Service guarantees")).toBeInTheDocument();
  });
});
