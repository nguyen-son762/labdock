import { useTranslations } from "next-intl";

import { CountrySelect } from "@/components/shared/country-select";

export function CountryCallingCodePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (countryCode: string) => void;
}) {
  const t = useTranslations("Checkout");
  return (
    <CountrySelect
      value={value}
      onValueChange={onChange}
      display="callingCode"
      aria-label={t("countryCallingCode")}
      placeholder={t("code")}
      className="h-full w-[120px] shrink-0 gap-1 rounded-none border-0 border-r border-input bg-transparent px-2 text-sm text-foreground shadow-none hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  );
}
