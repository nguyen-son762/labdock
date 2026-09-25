import { queryOptions, useQuery } from "@tanstack/react-query";

import { profileKeys } from "./profile-query-keys";
import { profileService } from "./profile.service";

export function currentUserQueryOptions() {
  return queryOptions({
    queryKey: profileKeys.current(),
    queryFn: ({ signal }) => profileService.getCurrent(signal),
    staleTime: 60_000,
    retry: false,
    retryOnMount: false,
  });
}

export function useCurrentUserQuery(enabled = true) {
  return useQuery({ ...currentUserQueryOptions(), enabled });
}
