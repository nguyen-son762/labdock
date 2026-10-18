import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { renderWithProviders } from "@/test/render-with-providers";

import { CountrySelect } from "./country-select";

function ControlledSelect({
  initialValue = "",
  ...props
}: Omit<React.ComponentProps<typeof CountrySelect>, "value" | "onValueChange"> & { initialValue?: string }) {
  const [value, setValue] = useState(initialValue);
  return <CountrySelect aria-label="Country" value={value} onValueChange={setValue} {...props} />;
}

describe("CountrySelect", () => {
  it("searches by name and ISO code, selects with the keyboard, and restores focus", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ControlledSelect />);
    const trigger = screen.getByRole("combobox", { name: "Country" });
    trigger.focus();
    await user.keyboard("{ArrowDown}");

    const search = screen.getByRole("combobox", { name: "Search country or code" });
    expect(search).toHaveFocus();
    await user.type(search, "vietnam");
    const vietnam = screen.getByRole("option", { name: "Vietnam" });
    expect(within(vietnam).getByAltText("")).toHaveAttribute("src", "https://twemoji.maxcdn.com/2/svg/1f1fb-1f1f3.svg");
    await user.clear(search);
    await user.type(search, "vn");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    await user.keyboard("{ArrowDown}{Enter}");

    expect(trigger).toHaveTextContent("Vietnam");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    await user.click(trigger);
    expect(screen.getByRole("combobox", { name: "Search country or code" })).toHaveValue("");
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
  });

  it("shows an empty state and preserves the selection when dismissing the search", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithProviders(<CountrySelect aria-label="Country" value="Singapore" onValueChange={onValueChange} />);
    const trigger = screen.getByRole("combobox", { name: "Country" });
    expect(trigger).toHaveTextContent("Singapore");
    await user.click(trigger);
    await user.type(screen.getByRole("combobox", { name: "Search country or code" }), "no-such-country");
    expect(screen.getByText("No countries found.")).toBeVisible();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
    await user.keyboard("{Enter}{Escape}");
    expect(onValueChange).not.toHaveBeenCalled();
    expect(trigger).toHaveTextContent("Singapore");
  });

  it("returns ISO codes when an existing profile stores a country name", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithProviders(<CountrySelect aria-label="Country" value="Singapore" onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox", { name: "Country" }));
    await user.type(screen.getByRole("combobox", { name: "Search country or code" }), "Angola");
    await user.click(screen.getByRole("option", { name: "Angola" }));
    expect(onValueChange).toHaveBeenCalledWith("AO");
  });

  it("searches calling codes and preserves each form's value format and allowed countries", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithProviders(
      <CountrySelect
        aria-label="Phone country code"
        value="65"
        onValueChange={onValueChange}
        display="callingCode"
        valueFormat="dialDigits"
        countryCodes={["SG", "VN"]}
      />,
    );
    await user.click(screen.getByRole("combobox", { name: "Phone country code" }));
    expect(screen.getAllByRole("option")).toHaveLength(2);
    await user.type(screen.getByRole("combobox", { name: "Search country or code" }), "+84");
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("84");
  });

  it("retains the chosen flag when several countries share a calling code", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ControlledSelect valueFormat="dialCode" display="callingCode" initialValue="+1" />);
    const trigger = screen.getByRole("combobox", { name: "Country" });
    await user.click(trigger);
    await user.type(screen.getByRole("combobox", { name: "Search country or code" }), "Canada");
    await user.click(screen.getByRole("option", { name: "Canada +1" }));
    expect(within(trigger).getByAltText("")).toHaveAttribute("src", "https://twemoji.maxcdn.com/2/svg/1f1e8-1f1e6.svg");
  });

  it("keeps country names as the submitted value when requested", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithProviders(
      <CountrySelect aria-label="Region" value="Singapore" onValueChange={onValueChange} valueFormat="name" />,
    );
    await user.click(screen.getByRole("combobox", { name: "Region" }));
    await user.type(screen.getByRole("combobox", { name: "Search country or code" }), "Vietnam");
    await user.click(screen.getByRole("option", { name: "Vietnam" }));
    expect(onValueChange).toHaveBeenCalledWith("Vietnam");
  });

  it("handles disabled controls and image failures without losing the country name", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ControlledSelect initialValue="VN" disabled />);
    const trigger = screen.getByRole("combobox", { name: "Country" });
    expect(trigger).toBeDisabled();
    fireEvent.error(within(trigger).getByAltText(""));
    expect(trigger).toHaveTextContent("Vietnam");
    await user.click(trigger);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
