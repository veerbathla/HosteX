import { useEffect, useState } from "react";
import AdminStatsGrid from "../components/dashboard/AdminStatsGrid";
import ComplaintChart from "../components/dashboard/ComplaintChart";
import RecentActivityAdmin from "../components/dashboard/RecentActivityAdmin";
import RoomMap from "../components/dashboard/RoomMap";
import { getAllComplaints } from "../../../services/api/complaintService";
import { getDashboardStats } from "../../../services/api/dashboardService";
import { getRooms } from "../../../services/api/roomService";

const emptyStats = {
  totalStudents: 0,
  weeklyStudents: 0,
  occupiedRooms: 0,
  totalRooms: 0,
  totalComplaints: 0,
  urgentComplaints: 0,
  staffTasks: 0,
};

const defaultTrend = [
  { day: "Mon", complaints: 0 },
  { day: "Tue", complaints: 0 },
  { day: "Wed", complaints: 0 },
  { day: "Thu", complaints: 0 },
  { day: "Fri", complaints: 0 },
  { day: "Sat", complaints: 0 },
  { day: "Sun", complaints: 0 },
];

export default function AdminDashboard() {
  const [adminStats, setAdminStats] = useState(emptyStats);
  const [complaintTrend, setComplaintTrend] = useState(defaultTrend);
  const [rooms, setRooms] = useState([]);
  const [activities, setActivities] = useState([]);
  const [apiNotice, setApiNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadDashboardData() {
      setIsLoading(true);
      const [dashboardResult, complaintsResult, roomsResult] = await Promise.allSettled([
        getDashboardStats(),
        getAllComplaints(),
        getRooms(),
      ]);

      if (!active) return;

      const dashboard =
        dashboardResult.status === "fulfilled" ? dashboardResult.value : null;
      const complaints =
        complaintsResult.status === "fulfilled" ? complaintsResult.value : [];
      const apiRooms = roomsResult.status === "fulfilled" ? roomsResult.value : [];

      if (dashboard) {
        setAdminStats({
          ...dashboard,
          totalComplaints: complaints.length || dashboard.totalComplaints,
          urgentComplaints:
            complaints.filter((item) => item.status !== "resolved").length ||
            dashboard.urgentComplaints,
          occupiedRooms:
            apiRooms.filter((room) => room.status === "occupied").length ||
            dashboard.occupiedRooms,
          totalRooms: apiRooms.length || dashboard.totalRooms,
        });
      } else if (complaints.length || apiRooms.length) {
        setAdminStats({
          ...emptyStats,
          occupiedRooms: apiRooms.filter((room) => room.status === "occupied").length,
          totalRooms: apiRooms.length,
          totalComplaints: complaints.length,
          urgentComplaints: complaints.filter((item) => item.status !== "resolved").length,
          staffTasks: complaints.filter((item) => item.status !== "resolved").length,
        });
      } else {
        setAdminStats(emptyStats);
      }

      if (complaints.length) {
        const counts = defaultTrend.reduce(
          (acc, item) => ({ ...acc, [item.day]: 0 }),
          {},
        );

        complaints.forEach((item) => {
          const date = new Date(item.raw?.createdAt || item.time);
          if (!Number.isNaN(date.getTime())) {
            const day = date.toLocaleDateString(undefined, { weekday: "short" });
            if (counts[day] !== undefined) counts[day] += 1;
          }
        });

        setComplaintTrend(
          defaultTrend.map((item) => ({
            ...item,
            complaints: counts[item.day],
          })),
        );
        setActivities(
          complaints.slice(0, 4).map((complaint) => ({
            id: complaint.id,
            title: complaint.title,
            desc: `${complaint.student} - ${complaint.room}`,
            time: complaint.time,
            status: complaint.status,
          })),
        );
      } else {
        setComplaintTrend(defaultTrend.map((item) => ({ ...item, complaints: 0 })));
        setActivities([]);
      }

      setRooms(apiRooms);
      setIsLoading(false);

      const failures = [dashboardResult, complaintsResult, roomsResult].filter(
        (result) => result.status === "rejected",
      );
      if (failures.length) {
        setApiNotice("Some live dashboard data could not be loaded.");
      } else {
        setApiNotice("");
      }
    }

    loadDashboardData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen p-6 sm:p-8">
      <header className="mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Campus Overview
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Real-time operational metrics for Emerald Hall Residential Wing.
          </p>
        </div>

        {apiNotice && (
          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            {apiNotice}
          </div>
        )}

        {isLoading && (
          <div className="mt-4 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
            Loading live dashboard data...
          </div>
        )}
      </header>

      <section className="space-y-8">
        <AdminStatsGrid adminStats={adminStats} />

        <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
          <div className="h-full">
            <ComplaintChart data={complaintTrend} />
          </div>
          <div className="h-full">
            <RecentActivityAdmin activities={activities} />
          </div>
        </div>

        <RoomMap rooms={rooms} />
      </section>
    </div>
  );
}
