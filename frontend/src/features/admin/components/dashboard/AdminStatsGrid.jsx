import {
  Users,
  BedDouble,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";

import StatsCard from "../../../student/components/dashboard/StatsCard"; // path adjust kar lena

export default function AdminStatsGrid() {

  // 🔥 DATA DRIVEN (hardcode UI mat kar)
  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      subtitle: "+12 this week",
      icon: <Users size={18} />,
      type: "success",
    },
    {
      title: "Occupied Rooms",
      value: "412 / 450",
      subtitle: "91% occupancy",
      icon: <BedDouble size={18} />,
      type: "default",
      progress: 91, // 🔥 future use
    },
    {
      title: "Complaints",
      value: "24",
      subtitle: "8 urgent tickets",
      icon: <AlertTriangle size={18} />,
      type: "warning",
    },
    {
      title: "Staff Tasks",
      value: "15",
      subtitle: "Avg 4h response",
      icon: <ClipboardList size={18} />,
      type: "default",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mt-6">
      {stats.map((item, index) => (
        <StatsCard
          key={index}
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
          icon={item.icon}
          type={item.type}
          progress={item.progress} // 🔥 future ready
        />
      ))}
    </div>
  );
}