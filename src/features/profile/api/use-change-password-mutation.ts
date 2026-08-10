import { useMutation } from "@tanstack/react-query";

import { profileService } from "./profile.service";

export function useChangePasswordMutation() {
  return useMutation({ mutationFn: profileService.changePassword, retry: false });
}
