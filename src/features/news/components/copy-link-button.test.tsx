import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/render-with-providers";
import { CopyLinkButton } from "./copy-link-button";

it("CMS-006 copies the current URL and confirms success", async () => {
  const user = userEvent.setup();
  const write = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
  renderWithProviders(<CopyLinkButton />);
  await user.click(screen.getByRole("button", { name: "Copy link" }));
  expect(write).toHaveBeenCalledWith(window.location.href);
  expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();
});
it("CMS-007 provides feedback and a selectable URL when clipboard access fails", async () => {
  const user = userEvent.setup();
  vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("Permission denied"));
  renderWithProviders(<CopyLinkButton />);
  await user.click(screen.getByRole("button", { name: "Copy link" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Could not copy");
  expect(screen.getByRole("textbox", { name: "Link to copy" })).toHaveValue(window.location.href);
});
