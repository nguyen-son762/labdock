import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

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
    visitBrandWebsite: "Visit {name} website",
  },
};

describe("SocialProofSection", () => {
  it("renders API brands as accessible logo cards", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SocialProofSection
          testimonials={[]}
          brands={[
            {
              id: "11111111-1111-1111-1111-111111111111",
              name: "Example Brand",
              logoUrl: "https://api.example.com/media/public/brand.jpg",
              websiteUrl: "https://brand.example/",
            },
          ]}
        />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("heading", { name: "Trusted by 500+ Research Leaders" })).toBeInTheDocument();
    expect(screen.getByRole("presentation")).toHaveAttribute("src", "https://api.example.com/media/public/brand.jpg");
    expect(screen.getByText("Example Brand")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Visit Example Brand website" })).toHaveAttribute(
      "href",
      "https://brand.example/",
    );
  });

  it("hides the research leaders region when the API returns no top brands", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SocialProofSection brands={[]} testimonials={[]} />
      </NextIntlClientProvider>,
    );

    expect(screen.queryByRole("heading", { name: "Trusted by 500+ Research Leaders" })).not.toBeInTheDocument();
    expect(screen.getByText("Service guarantees")).toBeInTheDocument();
  });
});
