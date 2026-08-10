import { useMutation, useQueryClient } from "@tanstack/react-query";

import { profileKeys } from "./profile-query-keys";
import { profileService } from "./profile.service";

export function useUpdateAvatarMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.updateAvatar,
    retry: false,
    onSuccess: (user) => queryClient.setQueryData(profileKeys.current(), user),
  });
}
