import apiClient, { getCached, invalidateCache } from "./apiClient";
import { apiFlags } from "./config";
import {
  asArray,
  formatDateTime,
  initialsFromName,
  toComplaintApiStatus,
  toComplaintUiStatus,
  unwrapData,
} from "./normalizers";

export function normalizeComplaint(complaint) {
  const student = complaint.userId || complaint.studentId || {};
  const studentName = student.name || complaint.student || "Unknown Resident";

  return {
    id: complaint._id || complaint.id,
    title: complaint.title || complaint.category || "Untitled complaint",
    description: complaint.description || complaint.desc || "No description",
    student: studentName,
    initials: complaint.initials || initialsFromName(studentName),
    room:
      complaint.roomId?.roomNo ||
      complaint.roomId?.roomNumber ||
      complaint.roomlId?.roomNumber ||
      complaint.room ||
      "Room not assigned",
    priority: complaint.priority || "medium",
    status: toComplaintUiStatus(complaint.status),
    time: formatDateTime(complaint.createdAt || complaint.time, "Recently"),
    raw: complaint,
  };
}

export async function getAllComplaints() {
  if (!apiFlags.complaints) throw new Error("Complaint API is disabled.");

  const data = await getCached("/complaints");
  return asArray(data).map(normalizeComplaint);
}

export async function getMyComplaints() {
  if (!apiFlags.complaints) throw new Error("Complaint API is disabled.");

  const data = await getCached("/complaints/my");
  return asArray(data).map(normalizeComplaint);
}

export async function createComplaint(payload) {
  if (!apiFlags.complaints) throw new Error("Complaint API is disabled.");

  const { data } = await apiClient.post("/complaints", payload);
  invalidateCache("/complaints");
  return normalizeComplaint(unwrapData(data));
}

export async function updateComplaintStatus(id, status) {
  if (!apiFlags.complaints) throw new Error("Complaint API is disabled.");

  const { data } = await apiClient.put(`/complaints/${id}`, {
    status: toComplaintApiStatus(status),
  });
  invalidateCache("/complaints");
  return normalizeComplaint(unwrapData(data));
}
