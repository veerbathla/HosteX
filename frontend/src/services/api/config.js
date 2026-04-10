export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const apiFlags = {
  auth: import.meta.env.VITE_USE_AUTH_API !== "false",
  dashboard: import.meta.env.VITE_USE_DASHBOARD_API !== "false",
  students: import.meta.env.VITE_USE_STUDENT_API !== "false",
  rooms: import.meta.env.VITE_USE_ROOM_API !== "false",
  complaints: import.meta.env.VITE_USE_COMPLAINT_API !== "false",
  parcels: import.meta.env.VITE_USE_PARCEL_API !== "false",
  visitors: import.meta.env.VITE_USE_VISITOR_API !== "false",
  entries: import.meta.env.VITE_USE_ENTRY_API !== "false",
};
