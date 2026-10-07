import { ArrowDown2 } from "iconsax-reactjs";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { countries } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function CountryCallingCodePicker({
  value,
  callingCode,
  onChange,
}: {
  value: string;
  callingCode: string;
  onChange: (countryCode: string) => void;
}) {
  const t = useTranslations("Checkout");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filteredCountries = countries.filter(
    ({ code, name, dialCode }) =>
      !normalizedSearch ||
      name.toLocaleLowerCase().includes(normalizedSearch) ||
      code.toLocaleLowerCase().includes(normalizedSearch) ||
      dialCode.includes(normalizedSearch),
  );

  const focusOption = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, filteredCountries.length - 1));
    setActiveIndex(nextIndex);
    optionRefs.current[nextIndex]?.focus();
  };

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
          setSearch("");
          setActiveIndex(Math.max(filteredCountries.findIndex(({ code }) => code === value), 0));
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-label={t("countryCallingCode")}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls="checkout-country-options"
          className="h-full w-[104px] shrink-0 justify-between gap-1 rounded-none border-0 border-r border-input bg-transparent px-3 text-sm font-normal text-foreground shadow-none hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <span>{callingCode || t("code")}</span>
          <ArrowDown2 className="size-4 shrink-0 opacity-50" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[280px] bg-white p-2"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          searchRef.current?.focus();
        }}
      >
        <Input
          ref={searchRef}
          type="search"
          role="searchbox"
          aria-label={t("searchCountryCode")}
          placeholder={t("searchCountryCodePlaceholder")}
          value={search}
          onChange={(event) => {
            setSearch(event.currentTarget.value);
            setActiveIndex(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" && filteredCountries.length) {
              event.preventDefault();
              focusOption(0);
            }
            if (event.key === "Enter" && filteredCountries.length === 1) {
              event.preventDefault();
              onChange(filteredCountries[0]!.code);
              setOpen(false);
            }
          }}
          className="h-9"
        />
        <div
          id="checkout-country-options"
          role="listbox"
          aria-label={t("countriesAndCodes")}
          className="mt-2 max-h-60 overflow-y-auto"
        >
          {filteredCountries.length ? (
            filteredCountries.map(({ code, name, dialCode }, index) => (
              <button
                key={code}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="option"
                aria-selected={code === value}
                tabIndex={index === activeIndex ? 0 : -1}
                className="flex min-h-9 w-full items-center justify-between rounded-sm px-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
                onClick={() => {
                  onChange(code);
                  setOpen(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    focusOption((index + 1) % filteredCountries.length);
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    if (index === 0) searchRef.current?.focus();
                    else focusOption(index - 1);
                  }
                  if (event.key === "Home") {
                    event.preventDefault();
                    focusOption(0);
                  }
                  if (event.key === "End") {
                    event.preventDefault();
                    focusOption(filteredCountries.length - 1);
                  }
                }}
              >
                <span>{name}</span>
                <span className="ml-3 text-muted-foreground">{dialCode}</span>
              </button>
            ))
          ) : (
            <p className="px-2 py-3 text-sm text-muted-foreground">{t("noCountries")}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
