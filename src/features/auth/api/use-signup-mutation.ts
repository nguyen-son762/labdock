import { useMutation } from "@tanstack/react-query";

import { authService } from "./auth.service";

export function useSignupMutation() {
  return useMutation({ mutationFn: authService.signup });
}

export function useVerifySignupMutation() {
  return useMutation({ mutationFn: authService.verifySignup });
}

export function useSetSignupPasswordMutation() {
  return useMutation({ mutationFn: authService.setSignupPassword });
}
