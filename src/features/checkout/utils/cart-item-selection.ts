export function parseCartItemSelection(value: unknown): string[] | undefined {
  const first = Array.isArray(value) ? value[0] : value;
  if (typeof first !== "string") return undefined;
  const ids = [
    ...new Set(
      first
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
    ),
  ];
  return ids.length ? ids : undefined;
}
