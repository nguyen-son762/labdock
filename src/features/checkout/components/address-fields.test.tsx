import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { renderWithProviders } from "@/test/render-with-providers";

import type { CheckoutFormValues } from "../schemas/checkout.schema";
import { DeliveryAddressFields } from "./address-fields";

function AddressForm() {
  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      fullName: "Sarah Chen",
      email: "sarah@example.com",
      phone: "+65 88009900",
      companyName: "Example",
      address: "123 Example Street",
      postalCode: "319455",
      country: "SG",
    },
  });
  return (
    <Form {...form}>
      <DeliveryAddressFields form={form} />
      <output aria-label="Stored phone">{form.watch("phone")}</output>
      <output aria-label="Stored country">{form.watch("country")}</output>
    </Form>
  );
}

it("keeps the national phone number and synchronizes both country pickers", async () => {
  const user = userEvent.setup();
  renderWithProviders(<AddressForm />);
  const country = screen.getByRole("combobox", { name: "Country *" });
  const callingCode = screen.getByRole("combobox", { name: "Country calling code" });
  await user.click(country);
  await user.type(screen.getByRole("combobox", { name: "Search country or code" }), "Vietnam");
  await user.click(screen.getByRole("option", { name: "Vietnam" }));
  expect(callingCode).toHaveTextContent("+84");
  expect(screen.getByLabelText("Stored phone")).toHaveTextContent("+84 88009900");
  expect(screen.getByLabelText("Stored country")).toHaveTextContent("VN");

  await user.click(callingCode);
  await user.type(screen.getByRole("combobox", { name: "Search country or code" }), "Malaysia");
  await user.click(screen.getByRole("option", { name: "Malaysia +60" }));
  expect(country).toHaveTextContent("Malaysia");
  expect(screen.getByLabelText("Stored phone")).toHaveTextContent("+60 88009900");
  expect(screen.getByLabelText("Stored country")).toHaveTextContent("MY");
});
