import apiClient, { getCached, invalidateCache } from "./apiClient";
import { apiFlags } from "./config";
import { asArray, formatDateTime, unwrapData } from "./normalizers";

export function normalizeVisitor(visitor) {
  const visitingTo = visitor.visitingTo || {};

  return {
    id: visitor._id || visitor.id,
    visitor: visitor.name || visitor.visitor || "Unknown Visitor",
    phone: visitor.phone || "N/A",
    student: visitingTo.name || visitor.student || "N/A",
    room: visitor.room || "Room not assigned",
    purpose: visitor.purpose || "N/A",
    timeIn: formatDateTime(visitor.entryTime || visitor.createdAt, "Now"),
    timeOut: visitor.exitTime ? formatDateTime(visitor.exitTime) : "--:--",
    status: visitor.status === "exited" ? "exited" : "inside",
    raw: visitor,
  };
}

export async function getVisitors() {
  if (!apiFlags.visitors) throw new Error("Visitor API is disabled.");

  const data = await getCached("/visitors");
  return asArray(data).map(normalizeVisitor);
}

export async function createVisitorEntry(payload) {
  if (!apiFlags.visitors) throw new Error("Visitor API is disabled.");

  const { data } = await apiClient.post("/visitors/entry", payload);
  invalidateCache("/visitors");
  return normalizeVisitor(unwrapData(data));
}

export async function markVisitorExit(id) {
  if (!apiFlags.visitors) throw new Error("Visitor API is disabled.");

  const { data } = await apiClient.put(`/visitors/exit/${id}`);
  invalidateCache("/visitors");
  return normalizeVisitor(unwrapData(data));
}
