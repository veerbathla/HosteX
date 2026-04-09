import apiClient, { getCached, invalidateCache } from "./apiClient";
import { apiFlags } from "./config";
import { asArray, formatDateTime, initialsFromName, unwrapData } from "./normalizers";

export function normalizeStudent(user) {
  return {
    id: user._id || user.id,
    name: user.name || "Unknown Student",
    studentId: user.enrollmentNo || user.studentId || "N/A",
    email: user.email || "N/A",
    course: user.courses || user.course || "Hostel Admission",
    year: user.year ? `Year ${user.year}` : user.year || "N/A",
    room:
      user.roomlId?.roomNumber ||
      user.roomId?.roomNumber ||
      user.room ||
      "Unassigned",
    status: user.isActive === false ? "rejected" : "approved",
    initials: initialsFromName(user.name),
    raw: user,
  };
}

export function normalizeEntryLog(log) {
  const student = log.studentId || {};
  const status = log.status === "out" ? "outside" : "inside";

  return {
    id: log._id || log.id,
    name: student.name || log.name || "Unknown Student",
    course: student.email || "Verified Student",
    room: log.room || "Room not assigned",
    studentId: student._id || log.studentId || "N/A",
    entryTime: formatDateTime(log.entryTime, "--:--"),
    exitTime: formatDateTime(log.exitTime, "--:--"),
    status,
    flagged: false,
    raw: log,
  };
}

export async function getAllStudents() {
  if (!apiFlags.students) throw new Error("Student API is disabled.");

  const data = await getCached("/user");
  return asArray(data)
    .filter((user) => !user.role || user.role === "student")
    .map(normalizeStudent);
}

export async function createStudent(payload) {
  if (!apiFlags.students) throw new Error("Student API is disabled.");

  const { data } = await apiClient.post("/user", {
    ...payload,
    role: payload.role || "student",
  });
  invalidateCache("/user");
  return normalizeStudent(unwrapData(data));
}

export async function getEntryLogs() {
  if (!apiFlags.entries) throw new Error("Entry API is disabled.");

  const data = await getCached("/entry");
  return asArray(data).map(normalizeEntryLog);
}

export async function markEntryExit({ studentId, hostelId, direction }) {
  if (!apiFlags.entries) throw new Error("Entry API is disabled.");

  const endpoint = direction === "entry" ? "/entry/entry" : "/entry/exit";
  const { data } = await apiClient.post(endpoint, { studentId, hostelId });
  invalidateCache("/entry");
  return normalizeEntryLog(unwrapData(data));
}
