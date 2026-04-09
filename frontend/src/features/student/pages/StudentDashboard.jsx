import {
  BedDouble,
  AlertTriangle,
  Bell,
  ClipboardList,
} from "lucide-react";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCard from "../components/dashboard/StatsCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import LunchCard from "../components/dashboard/LunchCard";
import QuickActions from "../components/dashboard/QuickActions";

export default function StudentDashboard() {
  return (
    <div className="p-6 bg-[#f5f7f6] min-h-screen">

      {/* Welcome */}
      <WelcomeCard />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        <StatsCard
          title="Room Status"
          value="Room 204"
          subtitle="Active Resident"
          icon={<BedDouble size={18} />}
          type="success"
        />
        <StatsCard
          title="Total Complaints"
          value="5"
          subtitle="Lifetime reports"
          icon={<ClipboardList size={18} />}
        />
        <StatsCard
          title="Pending Issues"
          value="2"
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