import apiClient, { invalidateCache, refreshAccessToken, sessionStorageService } from "./apiClient";
import { apiFlags } from "./config";

export async function login(credentials) {
  if (!apiFlags.auth) throw new Error("Auth API is disabled.");

  sessionStorageService.clear();
  invalidateCache();
  const { data } = await apiClient.post("/auth/login", credentials);
  sessionStorageService.save(data);
  return data;
}

export async function register(payload) {
  if (!apiFlags.auth) throw new Error("Auth API is disabled.");

  sessionStorageService.clear();
  invalidateCache();
  const { data } = await apiClient.post("/auth/register", payload);
  sessionStorageService.save(data);
  return data;
}

export async function logout() {
  try {
    if (apiFlags.auth) {
      await apiClient.post("/auth/logout");
    }
  } finally {
    invalidateCache();
    sessionStorageService.clear();
  }
}

export function getCurrentUser() {
  return sessionStorageService.get();
}

export async function refreshSession() {
  if (!apiFlags.auth) throw new Error("Auth API is disabled.");

  await refreshAccessToken();
  return sessionStorageService.get();
}

export async function getMe() {
  if (!apiFlags.auth) throw new Error("Auth API is disabled.");

  const { data } = await apiClient.get("/auth/me");
  return data?.data || data?.user;
}
