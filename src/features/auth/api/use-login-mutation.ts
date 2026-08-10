import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authService } from "./auth.service";
import { authSessionQueryKeys } from "./auth-session-query-keys";

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(authSessionQueryKeys.current(), { authenticated: true });
    },
  });
}
