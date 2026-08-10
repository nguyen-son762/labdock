const currencyFormatter = new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD" });
const orderDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatOrderDate(value: string) {
  return orderDateFormatter.format(new Date(value));
}
