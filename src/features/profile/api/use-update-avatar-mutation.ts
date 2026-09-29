import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CurrentUser } from "../schemas/user.schema";
import { profileKeys } from "./profile-query-keys";
import { profileService } from "./profile.service";

export function useUpdateAvatarMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => {
      if (!queryClient.getQueryData<CurrentUser>(profileKeys.current())) {
        throw new Error("Load the current profile before updating it.");
      }

      return profileService.uploadAvatar(file);
    },
    retry: false,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: profileKeys.current() }),
  });
}
