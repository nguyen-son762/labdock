"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { useState, type ReactNode } from "react";

function shouldRetryRequest(failureCount: number, error: unknown): boolean {
  if (failureCount >= 2) {
    return false;
  }

  if (!axios.isAxiosError(error)) {
    return true;
  }

  const status = error.response?.status;
  return status === undefined || status === 408 || status === 429 || status >= 500;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            retry: shouldRetryRequest,
            refetchOnWindowFocus: false,
          },
          mutations: { retry: false },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
