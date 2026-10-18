import type { ReactNode } from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render-with-providers";
import { HomeScreen } from "./home-screen";

vi.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SwiperSlide: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

it("HOME-007 announces a homepage load failure and offers retry navigation", () => {
  renderWithProviders(
    <HomeScreen
      loadFailed
      banners={[]}
      outstandingProducts={[]}
      newestProducts={[]}
      personalizedProducts={[]}
      topCategories={[]}
      testimonials={[]}
    />,
  );
  expect(screen.getByRole("alert")).toHaveTextContent("We could not load the homepage content.");
  expect(screen.getByRole("link", { name: "Retry" })).toHaveAttribute("href", "/");
});
