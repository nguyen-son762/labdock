import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authService } from "./auth.service";

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
