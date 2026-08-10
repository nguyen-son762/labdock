export const authSessionQueryKeys = {
  all: ["session", "auth"] as const,
  current: () => [...authSessionQueryKeys.all, "current"] as const,
};
