export function asArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.items)) return value.items;
  return [];
}

export function unwrapData(value) {
  return value?.data ?? value;
}

export function formatDateTime(value, fallback = "Now") {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function initialsFromName(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "NA"
  );
}

export function toComplaintUiStatus(status) {
  if (status === "in_progress") return "in-progress";
  if (status === "pending") return "new";
  return status || "new";
}

export function toComplaintApiStatus(status) {
  if (status === "in-progress") return "in_progress";
  if (status === "new") return "pending";
  return status || "pending";
}

export function getErrorMessage(error, fallback = "Live data is unavailable.") {
  return error?.message || fallback;
}
