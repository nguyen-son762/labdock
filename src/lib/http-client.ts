import axios, { type InternalAxiosRequestConfig } from "axios";

import { clientEnv } from "@/config/client-env";

import { authTokenStore } from "./auth-token-store";

const refreshExcludedPaths = ["/auth/login", "/auth/refresh", "/auth/signup/", "/auth/forgot-password/"] as const;
const authorizationExcludedPaths = [...refreshExcludedPaths, "/categories"] as const;
type SessionRequestConfig = InternalAxiosRequestConfig & {
  _labdockSessionVersion?: number;
  _labdockRetried?: boolean;
};
let refreshFlight: { version: number; promise: Promise<void> } | null = null;

export const httpClient = axios.create({
  baseURL: clientEnv.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((request) => {
  const sessionRequest: SessionRequestConfig = request;
  const accessToken = authTokenStore.getAccessToken();

  if (!authorizationExcludedPaths.some((path) => request.url?.startsWith(path))) {
    sessionRequest._labdockSessionVersion ??= authTokenStore.getSessionVersion();
    if (sessionRequest._labdockSessionVersion !== authTokenStore.getSessionVersion()) {
      throw new axios.CanceledError("The account session changed.");
    }
  }

  if (accessToken && !authorizationExcludedPaths.some((path) => request.url?.startsWith(path))) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

function isRefreshExcluded(url: string | undefined): boolean {
  return authorizationExcludedPaths.some((path) => url?.startsWith(path));
}

httpClient.interceptors.response.use(
  (response) => {
    const request: SessionRequestConfig = response.config;
    if (
      request._labdockSessionVersion !== undefined &&
      request._labdockSessionVersion !== authTokenStore.getSessionVersion()
    ) {
      throw new axios.CanceledError("The account session changed.");
    }
    return response;
  },
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const request: SessionRequestConfig | undefined = error.config;
    if (
      request?._labdockSessionVersion !== undefined &&
      request._labdockSessionVersion !== authTokenStore.getSessionVersion()
    ) {
      return Promise.reject(new axios.CanceledError("The account session changed."));
    }
    const refreshToken = authTokenStore.getRefreshToken();
    const shouldRefresh =
      error.response?.status === 401 &&
      request !== undefined &&
      refreshToken !== null &&
      !isRefreshExcluded(request.url) &&
      !request._labdockRetried;

    if (!shouldRefresh) {
      if (error.response?.status === 401 && !isRefreshExcluded(request?.url)) {
        authTokenStore.clear();
      }
      return Promise.reject(error);
    }

    request._labdockRetried = true;
    const version = authTokenStore.getSessionVersion();

    if (!refreshFlight || refreshFlight.version !== version) {
      const promise = httpClient
        .post<unknown>("/auth/refresh", { refreshToken })
        .then((response) => {
          if (authTokenStore.getSessionVersion() !== version)
            throw new axios.CanceledError("The account session changed.");
          authTokenStore.set(response.data, { preserveSession: true });
        })
        .catch((refreshError: unknown) => {
          if (authTokenStore.getSessionVersion() === version) authTokenStore.clear();
          return Promise.reject(refreshError);
        })
        .finally(() => {
          if (refreshFlight?.promise === promise) refreshFlight = null;
        });
      refreshFlight = { version, promise };
    }

    try {
      await refreshFlight.promise;
      return await httpClient.request(request);
    } catch {
      return Promise.reject(error);
    }
  },
);
