import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { contactService } from "../api/contact.service";
import type { ContactSubmission } from "../schemas/contact.schema";
import { ContactForm } from "./contact-form";

describe("ContactForm", () => {
  it("prevents duplicate general inquiry submissions and announces success", async () => {
    const user = userEvent.setup();
    let resolveSubmission: ((submission: ContactSubmission) => void) | undefined;
    const request = new Promise<ContactSubmission>((resolve) => {
      resolveSubmission = resolve;
    });
    const submitSpy = vi.spyOn(contactService, "submit").mockReturnValue(request);

    renderWithProviders(<ContactForm initialType="general" />);
    await user.type(screen.getByLabelText(/full name/i), "Sarah Chen");
    await user.type(screen.getByLabelText(/email address/i), "sarah@example.com");
    await user.type(screen.getByLabelText(/phone no/i), "88009900");

    const submit = screen.getByRole("button", { name: "Submit" });
    await user.click(submit);
    await user.click(submit);

    expect(submitSpy).toHaveBeenCalledOnce();
    expect(submit).toBeDisabled();

    resolveSubmission?.({ reference: "MSG-ABC12345", status: "submitted" });
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("MSG-ABC12345"));
  });

  it("switches inquiry variants and manages quote product rows", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm initialType="quote" />);

    expect(screen.getByRole("combobox", { name: "Phone country code" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Phone no/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Product(s) of interest" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add another product" }));
    expect(screen.getAllByPlaceholderText("Enter product name")).toHaveLength(2);

    await user.click(screen.getByLabelText("General inquiry"));
    expect(screen.queryByRole("heading", { name: "Product(s) of interest" })).not.toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
  });
});
