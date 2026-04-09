import {
  CheckCircle,
  UserPlus,
  CreditCard,
  Boxes,
} from "lucide-react";

export default function RecentActivityAdmin() {

  // 🔥 DATA DRIVEN (future API ready)
  const activities = [
    {
      id: 1,
      title: "Room 204 complaint resolved",
      desc: "Plumbing issue fixed by Maintenance Team",
      time: "12 minutes ago",
      icon: <CheckCircle size={16} />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 2,
      title: "New student check-in",
      desc: "Arjun Mehta assigned to Room 108-B",
      time: "1 hour ago",
      icon: <UserPlus size={16} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Payment reminder sent",
      desc: "Notification sent to 45 students",
      time: "3 hours ago",
      icon: <CreditCard size={16} />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 4,
      title: "Room inventory updated",
      desc: "Block C inspection completed",
      time: "5 hours ago",
      icon: <Boxes size={16} />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm h-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">
          Recent Activity
        </h2>
      </div>

      {/* List */}
      <div className="flex flex-col gap-5">
        {activities.map((item) => (
          <div key={item.id} className="flex gap-3 items-start">
            
            {/* Icon */}
            <div
              className={`p-2 rounded-full ${item.color}`}
            >
              {item.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                {item.title}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {item.desc}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {item.time}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 text-sm text-green-600 font-medium cursor-pointer hover:underline">
        View Full Audit Log
      </div>

    </div>
  );
}