import {
  Users,
  BedDouble,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";

import StatsCard from "../../../student/components/dashboard/StatsCard"; // path adjust kar lena

export default function AdminStatsGrid({ adminStats }) {
  const stats = [
    {
      title: "Total Students",
      value: adminStats?.totalStudents || "0",
      subtitle: `${adminStats?.weeklyStudents || 0} this week`,
      icon: <Users size={18} />,
      type: "success",
    },
    {
      title: "Occupied Rooms",
      value: `${adminStats?.occupiedRooms || 0} / ${adminStats?.totalRooms || 0}`,
      subtitle: `Occupancy: ${Math.round(((adminStats?.occupiedRooms || 0) / (adminStats?.totalRooms || 1)) * 100)}%`,
      icon: <BedDouble size={18} />,
      type: "default",
    },
    {
      title: "Urgent Complaints",
      value: adminStats?.urgentComplaints || "0",
      subtitle: `${adminStats?.totalComplaints || 0} total tickets`,
      icon: <AlertTriangle size={18} />,
      type: "warning",
    },
    {
      title: "Staff Tasks",
      value: adminStats?.staffTasks || "0",
      subtitle: "Active assignments",
      icon: <ClipboardList size={18} />,
      type: "default",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item, index) => (
        <StatsCard
          key={index}
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
          icon={item.icon}
          type={item.type}
        />
      ))}
    </div>
  );
}