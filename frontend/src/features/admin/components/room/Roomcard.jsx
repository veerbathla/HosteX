import { User, AlertTriangle } from "lucide-react";

export default function RoomCard({
  room,
  assignRoom,
  updateStatus,
  viewDetails,
  markUnavailable,
}) {
  const statusConfig = {
    occupied: "bg-green-100 text-green-700",
    available: "bg-gray-100 text-gray-600",
    maintenance: "bg-red-100 text-red-600",
  };

  return (
    <div className="p-4 rounded-xl border bg-white hover:shadow-md transition space-y-3">
      
      {/* Top */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">
          Room {room.number}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            statusConfig[room.status]
          }`}
        >
          {room.status}
        </span>
      </div>

      {/* Occupancy */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <User size={14} />
        <span>
          {room.occupants}/{room.capacity}
        </span>
      </div>

      {/* Issue */}
      {room.status === "maintenance" && (
        <div className="flex items-center gap-1 text-xs text-red-600">
          <AlertTriangle size={12} />
          Needs Attention
        </div>
      )}

      {/* Buttons */}
      <div className="pt-2 space-y-2">

        {/* AVAILABLE */}
        {room.status === "available" && (
          <>
            <button
              onClick={() => assignRoom(room)}   // ✅ FIXED
              className="w-full bg-green-600 text-white py-2 rounded-lg text-sm"
            >
              Assign Room
            </button>

            <button
              onClick={() => markUnavailable(room.id)}
              className="w-full bg-yellow-500 text-white py-2 rounded-lg text-sm"
            >
              Mark Unavailable
            </button>
          </>
        )}

        {/* OCCUPIED */}
        {room.status === "occupied" && (
          <button
            onClick={() => viewDetails(room)}
            className="w-full bg-gray-200 py-2 rounded-lg text-sm"
          >
            View Details
          </button>
        )}

        {/* MAINTENANCE */}
        {room.status === "maintenance" && (
          <button
            onClick={() => updateStatus(room.id)}
            className="w-full bg-green-600 text-white py-2 rounded-lg text-sm"
          >
            Mark Available
          </button>
        )}

      </div>
    </div>
  );
}