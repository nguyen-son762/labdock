import { useMutation } from "@tanstack/react-query";

import { authService } from "./auth.service";

export function useForgotPasswordMutation() {
  return useMutation({ mutationFn: authService.forgotPassword });
}
