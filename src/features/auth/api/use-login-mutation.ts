import { useMutation, useQueryClient } from "@tanstack/react-query";

import { currentUserQueryOptions } from "@/features/profile";

import { authService } from "./auth.service";
import { authSessionQueryKeys } from "./auth-session-query-keys";

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Parameters<typeof authService.login>[0]) => {
      queryClient.removeQueries({ queryKey: ["session"] });
      const session = await authService.login(input);
      void queryClient.prefetchQuery(currentUserQueryOptions());
      return session;
    },
    onSuccess: (session) => {
      queryClient.setQueryData(authSessionQueryKeys.current(), session);
    },
  });
}
