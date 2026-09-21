import axios, { type InternalAxiosRequestConfig } from "axios";

import { clientEnv } from "@/config/client-env";

import { authTokenStore } from "./auth-token-store";

const refreshExcludedPaths = ["/auth/login", "/auth/refresh", "/auth/signup/"] as const;
const authorizationExcludedPaths = [...refreshExcludedPaths, "/categories"] as const;
const retriedRequests = new WeakSet<InternalAxiosRequestConfig>();
let refreshPromise: Promise<void> | null = null;

export const httpClient = axios.create({
  baseURL: clientEnv.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((request) => {
  const accessToken = authTokenStore.getAccessToken();

  if (accessToken && !authorizationExcludedPaths.some((path) => request.url?.startsWith(path))) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

function isRefreshExcluded(url: string | undefined): boolean {
  return refreshExcludedPaths.some((path) => url?.startsWith(path));
}

httpClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const request = error.config;
    const refreshToken = authTokenStore.getRefreshToken();
    const shouldRefresh =
      error.response?.status === 401 &&
      request !== undefined &&
      refreshToken !== null &&
      !isRefreshExcluded(request.url) &&
      !retriedRequests.has(request);

    if (!shouldRefresh) {
      if (error.response?.status === 401 && !isRefreshExcluded(request?.url)) {
        authTokenStore.clear();
      }
      return Promise.reject(error);
    }

    retriedRequests.add(request);

    refreshPromise ??= httpClient
      .post<unknown>("/auth/refresh", { refreshToken })
      .then((response) => {
        authTokenStore.set(response.data);
      })
      .catch((refreshError: unknown) => {
        authTokenStore.clear();
        return Promise.reject(refreshError);
      })
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
