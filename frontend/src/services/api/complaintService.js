import apiClient, { invalidateCache } from "./apiClient";
import { apiFlags } from "./config";
import {
  asArray,
  formatDateTime,
  initialsFromName,
  toComplaintApiStatus,
  toComplaintUiStatus,
  unwrapData,
} from "./normalizers";

export function normalizeComplaint(complaint = {}) {
  const student = complaint.userId || complaint.studentId || {};
  const studentName =
    student.name || complaint.student || "Unknown Resident";

  return {
    id: complaint._id || complaint.id,
    title: complaint.title || complaint.category || "Untitled complaint",
    description:
      complaint.description || complaint.desc || "No description",
    student: studentName,
    initials: initialsFromName(studentName),
    room:
      complaint.roomId?.roomNo ||
      complaint.roomId?.roomNumber ||
      complaint.room?.roomNo ||
      complaint.room ||
      "Room not assigned",
    priority: complaint.priority || "medium",
    status: toComplaintUiStatus(complaint.status || "new"),
    time: formatDateTime(
      complaint.createdAt || complaint.updatedAt || complaint.time,
      "Recently"
    ),
    raw: complaint,
  };
}

// ✅ GET ALL COMPLAINTS FROM API
export async function getAllComplaints() {
  if (!apiFlags.complaints) {
    throw new Error("Complaint API is disabled.");
  }

  const response = await apiClient.get("/complaints");
  const rawData = unwrapData(response.data);

  return asArray(rawData).map(normalizeComplaint);
}

// ✅ GET CURRENT USER COMPLAINTS
export async function getMyComplaints() {
  if (!apiFlags.complaints) {
    throw new Error("Complaint API is disabled.");
  }

  const response = await apiClient.get("/complaints/my");
  const rawData = unwrapData(response.data);

  return asArray(rawData).map(normalizeComplaint);
}

// ✅ CREATE NEW COMPLAINT
export async function createComplaint(payload) {
  if (!apiFlags.complaints) {
    throw new Error("Complaint API is disabled.");
  }

  const response = await apiClient.post("/complaints", payload);

  invalidateCache("/complaints");
  invalidateCache("/complaints/my");

  return normalizeComplaint(unwrapData(response.data));
}

// ✅ UPDATE STATUS
export async function updateComplaintStatus(id, status) {
  if (!apiFlags.complaints) {
    throw new Error("Complaint API is disabled.");
  }

  const response = await apiClient.put(`/complaints/${id}`, {
    status: toComplaintApiStatus(status),
  });

  invalidateCache("/complaints");
  invalidateCache("/complaints/my");

  return normalizeComplaint(unwrapData(response.data));
}