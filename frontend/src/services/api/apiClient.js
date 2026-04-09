import axios from "axios";
import { API_BASE_URL } from "./config";

const TOKEN_KEY = "hostex_token";
const USER_KEY = "user";
const SESSION_EXPIRED_EVENT = "hostex:session-expired";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let refreshPromise = null;
const responseCache = new Map();
const DEFAULT_CACHE_TTL = 30_000;

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${API_BASE_URL}/auth/refresh`,
        {},
        {
          withCredentials: true,
          timeout: 15000,
          headers: { "Content-Type": "application/json" },
        },
      )
      .then((response) => {
        sessionStorageService.save(response.data);
        return response.data?.data?.accessToken || response.data?.token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const skipsRefresh = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"].some((path) =>
      originalRequest?.url?.includes(path),
    );

    if (status === 401 && originalRequest && !originalRequest._retry && !skipsRefresh) {
      originalRequest._retry = true;

      try {
        const token = await refreshAccessToken();
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch {
        sessionStorageService.clear();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
          if (!window.location.pathname.includes("/login")) {
            window.location.assign("/login");
          }
        }
      }
    }

    if (status === 401 && typeof window !== "undefined" && !skipsRefresh) {
      sessionStorageService.clear();

      if (!window.location.pathname.includes("/login")) {
        window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
        window.location.assign("/login");
      }
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      "Unable to connect to the server.";

    return Promise.reject({
      ...error,
      message,
      status: error.response?.status,
    });
  },
);

export const sessionStorageService = {
  save(session) {
    const accessToken = session?.data?.accessToken || session?.token;
    if (accessToken) {
      sessionStorage.setItem(TOKEN_KEY, accessToken);
    }
    const user = session?.data?.user || session?.user || session;
    if (!user || typeof user !== "object") return;

    sessionStorage.setItem(
      USER_KEY,
      JSON.stringify({
        ...user,
        token: accessToken,
        isLoggedIn: Boolean(accessToken),
      }),
    );
  },
  clear() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
  get() {
    try {
      const rawUser = sessionStorage.getItem(USER_KEY);
      return rawUser ? JSON.parse(rawUser) : null;
    } catch {
      this.clear();
      return null;
    }
  },
};

export async function getCached(url, config = {}, ttl = DEFAULT_CACHE_TTL) {
  const key = `${url}:${JSON.stringify(config.params || {})}`;
  const cached = responseCache.get(key);

  if (cached && cached.expiresAt > Date.now()) {
    if (cached.promise) return cached.promise;
    return cached.data;
  }

  const promise = apiClient.get(url, config).then((response) => response.data).catch((error) => {
    responseCache.delete(key);
    throw error;
  });
  responseCache.set(key, {
    promise,
    expiresAt: Date.now() + ttl,
  });

  const data = await promise;
  responseCache.set(key, {
    data,
    expiresAt: Date.now() + ttl,
  });
  return data;
}

export function invalidateCache(prefix = "") {
  responseCache.forEach((_, key) => {
    if (!prefix || key.startsWith(prefix)) responseCache.delete(key);
  });
}

export { SESSION_EXPIRED_EVENT, refreshAccessToken };
export default apiClient;
