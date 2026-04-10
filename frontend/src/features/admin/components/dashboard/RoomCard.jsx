import { User, AlertTriangle } from "lucide-react";

export default function RoomCard({ room }) {
  const statusConfig = {
    occupied: "bg-green-100 text-green-700",
    available: "bg-gray-100 text-gray-600",
    empty: "bg-gray-100 text-gray-600",
    maintenance: "bg-red-100 text-red-600",
    issue: "bg-red-100 text-red-600",
  };

  return (
    <div className="p-4 rounded-xl border bg-white hover:shadow-md transition">
      
      {/* Top */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">
          Room {room.number}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            statusConfig[room.status] || statusConfig.available
          }`}
        >
          {room.status}
        </span>
      </div>

      {/* Occupancy */}
      <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
        <User size={14} />
        <span>
          {room.occupants}/{room.capacity}
        </span>
      </div>

      {/* Issue */}
      {(room.status === "issue" || room.status === "maintenance") && (
        <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
          <AlertTriangle size={12} />
          Needs Attention
        </div>
      )}
    </div>
  );
}
