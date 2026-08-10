import { useQuery } from "@tanstack/react-query";

import { authService } from "./auth.service";
import { authSessionQueryKeys } from "./auth-session-query-keys";

export function useAuthSessionQuery() {
  return useQuery({
    queryKey: authSessionQueryKeys.current(),
    queryFn: authService.getSession,
    staleTime: 60_000,
  });
}
