import { useMutation, useQueryClient } from "@tanstack/react-query";

import { profileKeys } from "./profile-query-keys";
import { profileService } from "./profile.service";

export function useChangePasswordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Parameters<typeof profileService.changePassword>[0]) => profileService.changePassword(input),
    retry: false,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: profileKeys.current() });
    },
  });
}
