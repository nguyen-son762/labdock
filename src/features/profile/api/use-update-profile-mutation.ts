import { useMutation, useQueryClient } from "@tanstack/react-query";

import { profileKeys } from "./profile-query-keys";
import { profileService } from "./profile.service";

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.updateCurrent,
    onSuccess: (user) => {
      queryClient.setQueryData(profileKeys.current(), user);
    },
  });
}
