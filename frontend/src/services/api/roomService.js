import apiClient, { getCached, invalidateCache } from "./apiClient";
import { apiFlags } from "./config";
import { asArray, unwrapData } from "./normalizers";

const roomTypeLabels = {
  single: "Single",
  double: "Double",
  triple: "Triple",
  quad: "Quad",
};

const toApiRoomType = (type = "single") => {
  const normalized = type.toLowerCase();
  if (normalized === "studio") return "single";
  if (["single", "double", "triple", "quad"].includes(normalized)) {
    return normalized;
  }
  return "single";
};

export function normalizeRoom(room = {}, index = 0) {
  const occupants = Array.isArray(room.occupants)
    ? room.occupants.length
    : Number(room.currentOccupancy ?? room.occupants ?? 0);
  const capacity = Number(room.capacity ?? 0);
  const isMaintenance = room.status === "maintenance" || room.isMaintenance;
  const hasOccupants = Number.isFinite(occupants) && occupants > 0;
  const status = isMaintenance
    ? "maintenance"
    : room.status === "empty" || room.status === "available"
      ? hasOccupants
        ? "occupied"
        : "available"
      : room.status === "occupied" || room.isOccupied || hasOccupants || (capacity > 0 && occupants >= capacity)
        ? "occupied"
        : "available";
  const number = room.roomNo || room.roomNumber || room.number || "Unassigned";
  const firstOccupant = Array.isArray(room.occupants) ? room.occupants[0] : null;

  return {
    id: room._id || room.id || number || index,
    number,
    status,
    occupants: Number.isFinite(occupants) ? occupants : 0,
    capacity: Number.isFinite(capacity) ? capacity : 0,
    floor: String(room.floor ?? ""),
    wing: room.wing || number.split("-")[0] || "A",
    type: roomTypeLabels[room.type] || room.type || "Room",
    student: firstOccupant?.name || room.assignedStudentName || "",
    studentInitials: firstOccupant?.name
      ? firstOccupant.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : room.assignedStudentInitials || "",
    assignedSince: room.assignedSince || (room.updatedAt ? new Date(room.updatedAt).toLocaleDateString() : ""),
    maintenanceNote: isMaintenance ? room.maintenanceNote || "Scheduled service" : "",
    raw: room,
  };
}

export async function getRooms() {
  if (!apiFlags.rooms) throw new Error("Room API is disabled.");

  const data = await getCached("/rooms");
  return asArray(data).map(normalizeRoom);
}

export async function getMyRoom() {
  if (!apiFlags.rooms) throw new Error("Room API is disabled.");

  const data = await getCached("/rooms/my");
  const room = unwrapData(data);
  return room ? normalizeRoom(room) : null;
}

export async function createRoom(payload) {
  if (!apiFlags.rooms) throw new Error("Room API is disabled.");

  const { data } = await apiClient.post("/rooms", {
    roomNo: payload.number || payload.roomNo || payload.roomNumber,
    roomNumber: payload.number || payload.roomNumber || payload.roomNo,
    capacity: Number(payload.capacity),
    floor: Number(payload.floor),
    type: toApiRoomType(payload.type),
  });
  invalidateCache("/rooms");
  return normalizeRoom(unwrapData(data));
}

export async function updateRoom(id, payload) {
  if (!apiFlags.rooms) throw new Error("Room API is disabled.");

  const { data } = await apiClient.patch(`/rooms/${id}`, payload);
  invalidateCache("/rooms");
  return normalizeRoom(unwrapData(data));
}
