import { useMutation } from "@tanstack/react-query";

import { contactService } from "./contact.service";

export function useSubmitContactMutation() {
  return useMutation({ mutationFn: contactService.submit, retry: false });
}
