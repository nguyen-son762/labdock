import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CurrentUser } from "../schemas/user.schema";
import { profileKeys } from "./profile-query-keys";
import { profileService } from "./profile.service";

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Parameters<typeof profileService.updateCurrent>[0]) => {
      const currentUser = queryClient.getQueryData<CurrentUser>(profileKeys.current());
      if (!currentUser) throw new Error("Load the current profile before updating it.");
      return profileService.updateCurrent(input, currentUser);
    },
    retry: false,
    onSuccess: (user) => {
      queryClient.setQueryData(profileKeys.current(), user);
    },
  });
}
