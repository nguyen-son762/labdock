import callingCodeData from "./calling-codes.json";
import countryData from "./countries.json";

const callingCodeByCountry = new Map(callingCodeData.map(({ countryCode, dialCode }) => [countryCode, dialCode]));

export const countries = countryData
  .map(({ code, name }) => ({ code, name, dialCode: callingCodeByCountry.get(code) ?? "" }))
  .sort((left, right) => left.name.localeCompare(right.name));

export const countryOptions = countries.map(({ code, name }) => ({ value: code, label: name }));
export const callingCodes = [...new Set(countries.map(({ dialCode }) => dialCode))]
  .filter(Boolean)
  .map((dialCode) => ({ value: dialCode, label: dialCode }));

export function resolveCountryCode(value: string): string | undefined {
  const normalized = value.trim().toLocaleLowerCase();
  return countries.find(
    ({ code, name }) => code.toLocaleLowerCase() === normalized || name.toLocaleLowerCase() === normalized,
  )?.code;
}

export function getCountryCallingCode(value: string): string {
  const countryCode = resolveCountryCode(value);
  return countries.find(({ code }) => code === countryCode)?.dialCode ?? "";
}
