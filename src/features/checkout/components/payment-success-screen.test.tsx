import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render-with-providers";
import { PaymentSuccessScreen } from "./payment-success-screen";

it("PAY-016 does not claim a confirmation email was sent to a demo identity", () => {
  renderWithProviders(<PaymentSuccessScreen amount={100} />);
  expect(screen.queryByText(/sarah_chen|confirmation email has been sent/i)).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "View orders" })).toHaveAttribute("href", "/orders");
});
