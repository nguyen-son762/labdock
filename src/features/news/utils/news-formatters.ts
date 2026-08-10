const newsDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatNewsDate(date: string) {
  return newsDateFormatter.format(new Date(date));
}
