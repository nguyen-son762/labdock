import { httpClient } from "@/lib/http-client";

import { profileFormSchema, type ProfileFormValues } from "../schemas/profile-form.schema";
import { currentUserSchema, type CurrentUser } from "../schemas/user.schema";

export const profileService = {
  async getCurrent(signal?: AbortSignal): Promise<CurrentUser> {
    const response = await httpClient.get<unknown>("/users/me", { signal });
    return currentUserSchema.parse(response.data);
  },

  async updateCurrent(input: ProfileFormValues): Promise<CurrentUser> {
    const validatedInput = profileFormSchema.parse(input);
    const response = await httpClient.patch<unknown>("/users/me", validatedInput);
    return currentUserSchema.parse(response.data);
  },
};
