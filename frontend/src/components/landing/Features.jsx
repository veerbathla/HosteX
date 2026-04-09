import Card from "../ui/Card";
import { LayoutGrid, ClipboardList, Bell, Grid } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Room Allocation",
      desc: "Automated and manual grid-based tracking with visual availability maps.",
      icon: LayoutGrid,
    },
    {
      title: "Complaint Management",
      desc: "Real-time tracking and priority-based assignment to facility managers.",
      icon: ClipboardList,
    },
    {
      title: "Real-time Notifications",
      desc: "Instant push and email alerts for critical maintenance and campus news.",
      icon: Bell,
    },
    {
      title: "Admin Dashboard",
      desc: "High-level KPIs, occupancy trends, and financial reports at a single glance.",
      icon: Grid,
    },
  ];

  return (
    <div id="features" className="bg-[#dde8e2] px-16 py-20 text-center">
      {/* Heading */}
      <p class="text-[1.5rem] tracking-widest text-green-800 font-bold">
        CORE CAPABILITIES
      </p>

      <h2 className="text-4xl font-bold text-gray-900 mt-3">
        Precision Engineering for Campus Life
      </h2>

      <p className="text-gray-500 mt-3 max-w-xl mx-auto">
        Eliminate friction between administration and residents with focused
        digital tools.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6 mt-12">
        {features.map((f) => {
          const Icon = f.icon;

          return (
            <Card key={f.title} className="text-left h-[220px] flex flex-col">
              {/* Icon */}
              <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-xl mb-5">
                <Icon size={22} />
              </div>

              {/* Title */}
              <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
                {f.title}
              </h3>

              {/* Desc */}
              <p className="text-[13px] text-gray-500 leading-relaxed mt-2">
                {f.desc}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
