import { useMutation } from "@tanstack/react-query";

import { authService } from "./auth.service";

export function useStartForgotPasswordMutation() {
  return useMutation({ mutationFn: authService.startForgotPassword });
}

export function useVerifyForgotPasswordMutation() {
  return useMutation({ mutationFn: authService.verifyForgotPassword });
}

export function useResetForgotPasswordMutation() {
  return useMutation({ mutationFn: authService.resetForgotPassword });
}
