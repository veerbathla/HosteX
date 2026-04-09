import apiClient, { getCached, invalidateCache } from "./apiClient";
import { apiFlags } from "./config";
import { asArray, unwrapData } from "./normalizers";

const roomTypeLabels = {
  single: "Single",
  double: "Double",
  triple: "Triple",
  quad: "Quad",
};

export function normalizeRoom(room = {}, index = 0) {
  const occupants = Array.isArray(room.occupants)
    ? room.occupants.length
    : Number(room.currentOccupancy ?? room.occupants ?? 0);
  const capacity = Number(room.capacity ?? 0);
  const isMaintenance = room.status === "maintenance" || room.isMaintenance;
  const status = isMaintenance
    ? "issue"
    : room.status === "available"
      ? "empty"
      : room.status === "occupied" || room.isOccupied || (capacity > 0 && occupants >= capacity)
        ? "occupied"
        : "empty";

  return {
    id: room._id || room.id || room.roomNo || room.roomNumber || index,
    number: room.roomNo || room.roomNumber || room.number || "Unassigned",
    status,
    occupants: Number.isFinite(occupants) ? occupants : 0,
    capacity: Number.isFinite(capacity) ? capacity : 0,
    floor: String(room.floor ?? ""),
    type: roomTypeLabels[room.type] || room.type || "Room",
    raw: room,
  };
}

export async function getRooms() {
  if (!apiFlags.rooms) throw new Error("Room API is disabled.");

  const data = await getCached("/rooms");
  return asArray(data).map(normalizeRoom);
}

export async function createRoom(payload) {
  if (!apiFlags.rooms) throw new Error("Room API is disabled.");

  const { data } = await apiClient.post("/rooms", payload);
  invalidateCache("/rooms");
  return normalizeRoom(unwrapData(data));
}
