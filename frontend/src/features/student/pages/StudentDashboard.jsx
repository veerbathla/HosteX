import {
  BedDouble,
  AlertTriangle,
  Bell,
  ClipboardList,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCard from "../components/dashboard/StatsCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import LunchCard from "../components/dashboard/LunchCard";
import QuickActions from "../components/dashboard/QuickActions";
import { getMyComplaints } from "../../../services/api/complaintService";
import { getMyRoom } from "../../../services/api/roomService";

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadStats() {
      try {
        const [complaintData, roomData] = await Promise.allSettled([
          getMyComplaints(),
          getMyRoom(),
        ]);

        if (!active) return;

        setComplaints(
          complaintData.status === "fulfilled" ? complaintData.value : [],
        );
        setRoom(roomData.status === "fulfilled" ? roomData.value : null);
      } catch {
        if (active) setComplaints([]);
      }
    }

    loadStats();

    return () => {
      active = false;
    };
  }, []);

  const complaintStats = useMemo(
    () => ({
      total: complaints.length,
      pending: complaints.filter((item) => item.status !== "resolved").length,
    }),
    [complaints],
  );

  return (
    <div className="p-6 bg-[#f5f7f6] min-h-screen">

      {/* Welcome */}
      <WelcomeCard />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        <StatsCard
          title="Room Status"
          value={room?.number || "No Room"}
          subtitle={room ? `${room.occupants}/${room.capacity} occupied` : "Room not assigned"}
          icon={<BedDouble size={18} />}
          type="success"
        />
        <StatsCard
          title="Total Complaints"
          value={String(complaintStats.total)}
          subtitle="Lifetime reports"
          icon={<ClipboardList size={18} />}
        />
        <StatsCard
          title="Pending Issues"
          value={String(complaintStats.pending)}
          subtitle="Awaiting staff action"
          icon={<AlertTriangle size={18} />}
          type="warning"
        />
        <StatsCard
          title="Campus Notices"
          value="3"
          subtitle="Unread announcements"
          icon={<Bell size={18} />}
        />
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <RecentActivity />
        </div>

        <div className="flex flex-col gap-6">
          <LunchCard />
          <QuickActions />
        </div>
      </div>

    </div>
  );
}
