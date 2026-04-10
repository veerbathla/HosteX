import apiClient, {
  invalidateCache,
  refreshAccessToken,
  sessionStorageService,
} from "./apiClient";
import { apiFlags } from "./config";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

// ✅ LOGIN
export async function login(credentials) {
  if (!apiFlags.auth) throw new Error("Auth API is disabled.");

  try {
    sessionStorageService.clear();
    invalidateCache();

    const { data } = await axios.post(
      `${API_URL}/auth/login`,
      credentials, // ✅ FIX: directly use credentials
      { withCredentials: true }
    );

    sessionStorageService.save(data);
    return data;
  } catch (error) {
    console.error("Login API Error:", error?.response?.data || error.message);
    throw error;
  }
}

// ✅ REGISTER
export async function register(payload) {
  if (!apiFlags.auth) throw new Error("Auth API is disabled.");

  try {
    sessionStorageService.clear();
    invalidateCache();

    const { data } = await axios.post(
      `${API_URL}/auth/register`,
      payload,
      { withCredentials: true }
    );

    sessionStorageService.save(data);
    return data;
  } catch (error) {
    console.error("Register API Error:", error?.response?.data || error.message);
    throw error;
  }
}

// ✅ LOGOUT
export async function logout() {
  try {
    if (apiFlags.auth) {
      await apiClient.post("/auth/logout");
    }
  } catch (error) {
    console.error("Logout Error:", error?.response?.data || error.message);
  } finally {
    invalidateCache();
    sessionStorageService.clear();
  }
}

// ✅ GET CURRENT USER
export function getCurrentUser() {
  return sessionStorageService.get();
}

// ✅ REFRESH SESSION
export async function refreshSession() {
  if (!apiFlags.auth) throw new Error("Auth API is disabled.");

  try {
    await refreshAccessToken();
    return sessionStorageService.get();
  } catch (error) {
    console.error("Refresh Session Error:", error?.response?.data || error.message);
    throw error;
  }
}

// ✅ GET ME
export async function getMe() {
  if (!apiFlags.auth) throw new Error("Auth API is disabled.");

  try {
    const { data } = await apiClient.get("/auth/me");
    return data?.data || data?.user;
  } catch (error) {
    console.error("GetMe Error:", error?.response?.data || error.message);
    throw error;
  }
}