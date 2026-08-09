import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authService } from "./auth.service";

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      queryClient.clear();
    },
  });
}
