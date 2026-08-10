import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authService } from "./auth.service";
import { authSessionQueryKeys } from "./auth-session-query-keys";

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      queryClient.clear();
      queryClient.setQueryData(authSessionQueryKeys.current(), { authenticated: false });
    },
  });
}
