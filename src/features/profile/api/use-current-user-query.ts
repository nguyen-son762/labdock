import { useQuery } from "@tanstack/react-query";

import { profileKeys } from "./profile-query-keys";
import { profileService } from "./profile.service";

export function useCurrentUserQuery(enabled = true) {
  return useQuery({
    queryKey: profileKeys.current(),
    queryFn: ({ signal }) => profileService.getCurrent(signal),
    staleTime: 60_000,
    enabled,
  });
}
