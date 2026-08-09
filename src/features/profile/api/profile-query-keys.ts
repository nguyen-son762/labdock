export const profileKeys = {
  all: ["session", "profile"] as const,
  current: () => [...profileKeys.all, "current"] as const,
};
