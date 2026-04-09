import apiClient, { getCached, invalidateCache } from "./apiClient";
import { apiFlags } from "./config";
import { asArray, formatDateTime, unwrapData } from "./normalizers";

export function normalizeParcel(parcel) {
  const student = parcel.studentId || {};

  return {
    id: parcel._id || parcel.id,
    recipient: student.name || parcel.recipient || "Unknown Student",
    room: parcel.room || "Unassigned",
    courier: parcel.parcelFrom || parcel.courier || parcel.description || "Parcel",
    receivedAt: formatDateTime(parcel.receivedAt || parcel.createdAt, "Now"),
    status: parcel.collected ? "collected" : parcel.status || "pending",
    raw: parcel,
  };
}

export async function getParcels() {
  if (!apiFlags.parcels) throw new Error("Parcel API is disabled.");

  const data = await getCached("/parcels");
  return asArray(data).map(normalizeParcel);
}

export async function addParcel(payload) {
  if (!apiFlags.parcels) throw new Error("Parcel API is disabled.");

  const { data } = await apiClient.post("/parcels", payload);
  invalidateCache("/parcels");
  return normalizeParcel(unwrapData(data));
}

export async function collectParcel(id) {
  if (!apiFlags.parcels) throw new Error("Parcel API is disabled.");

  const { data } = await apiClient.put(`/parcels/${id}/collect`);
  invalidateCache("/parcels");
  return normalizeParcel(unwrapData(data));
}
