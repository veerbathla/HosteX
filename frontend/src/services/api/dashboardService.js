import { getCached } from "./apiClient";
import { apiFlags } from "./config";
import { unwrapData } from "./normalizers";

const toNumber = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

export function normalizeDashboardStats(value = {}) {
  const data = unwrapData(value) || {};
  const totalRooms = toNumber(data.totalRooms ?? data.rooms);
  const occupiedRooms = toNumber(
    data.totalOccupiedRooms ?? data.occupiedRooms ?? data.occupied,
  );
  const pendingComplaints = toNumber(
    data.pendingComplaints ?? data.urgentComplaints,
  );

  return {
    totalStudents: toNumber(data.totalStudents ?? data.students),
    weeklyStudents: toNumber(data.weeklyStudents),
    occupiedRooms,
    totalRooms,
    totalComplaints: toNumber(data.totalComplaints, pendingComplaints),
    urgentComplaints: pendingComplaints,
    staffTasks: toNumber(data.staffTasks ?? data.activeStaffTasks, pendingComplaints),
  };
}

export async function getDashboardStats() {
  if (!apiFlags.dashboard) throw new Error("Dashboard API is disabled.");

  const data = await getCached("/dashboard");
  return normalizeDashboardStats(data);
}
