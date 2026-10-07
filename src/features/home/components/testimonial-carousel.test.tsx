import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import type { Testimonial } from "../home.types";

vi.mock("swiper/modules", () => ({ A11y: {}, Autoplay: {} }));
vi.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SwiperSlide: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
vi.mock("@/components/ui/swiper-navigation", () => ({ SwiperNavigation: () => null }));

import { TestimonialCarousel } from "./testimonial-carousel";

const testimonial: Testimonial = {
  id: "74d7b1dc-2f06-4fc8-8fad-e4f139137de8",
  authorName: "test1",
  authorSubtitle: "Research Scientist",
  profileImageUrl: "/media/public/testimonials/profile.jpg",
  content: "Great experience with the team.",
  rating: 2,
  sortOrder: 1,
};

describe("TestimonialCarousel", () => {
  it("renders the API author, profile image, content, and accessible rating", () => {
    render(<TestimonialCarousel testimonials={[testimonial]} />);

    expect(screen.getByText(/Great experience with the team/)).toBeInTheDocument();
    expect(screen.getByText("test1")).toBeInTheDocument();
    expect(screen.getByText("Research Scientist")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Rating: 2 out of 5" })).toBeInTheDocument();
    expect(document.querySelector('img[src="/media/public/testimonials/profile.jpg"]')).toBeInTheDocument();
  });
});
