import { countries } from "@/constants/country-options";

const callingCodes = [...new Set(countries.map(({ dialCode }) => dialCode).filter(Boolean))].sort(
  (left, right) => right.length - left.length,
);

export function getNationalPhone(phone: string, preferredCallingCode: string): string {
  const value = phone.trim();
  if (!value.startsWith("+")) return value;
  const callingCode =
    preferredCallingCode && value.startsWith(preferredCallingCode)
      ? preferredCallingCode
      : callingCodes.find((code) => value.startsWith(code));
  return callingCode ? value.slice(callingCode.length).trim() : value;
}
