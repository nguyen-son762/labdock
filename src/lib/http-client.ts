import axios, { type InternalAxiosRequestConfig } from "axios";

import { clientEnv } from "@/config/client-env";

const refreshExcludedPaths = ["/auth/login", "/auth/refresh"] as const;
const retriedRequests = new WeakSet<InternalAxiosRequestConfig>();
let refreshPromise: Promise<void> | null = null;

export const httpClient = axios.create({
  baseURL: clientEnv.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15_000,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function isRefreshExcluded(url: string | undefined): boolean {
  return refreshExcludedPaths.some((path) => url?.endsWith(path));
}

httpClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const request = error.config;
    const shouldRefresh =
      error.response?.status === 401 &&
      request !== undefined &&
      !isRefreshExcluded(request.url) &&
      !retriedRequests.has(request);

    if (!shouldRefresh) {
      return Promise.reject(error);
    }

    retriedRequests.add(request);

    refreshPromise ??= httpClient
      .post("/auth/refresh")
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });

    try {
      await refreshPromise;
      return await httpClient.request(request);
    } catch {
      return Promise.reject(error);
    }
  },
);
