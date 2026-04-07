export default function ComplaintCard({ item }) {
  const statusColor = {
    pending: "text-yellow-600",
    progress: "text-blue-600",
    resolved: "text-green-600",
  };

  const badge = {
    pending: "bg-yellow-100 text-yellow-600",
    progress: "bg-blue-100 text-blue-600",
    resolved: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:scale-[1.02] transition">
      {/* Top */}
      <div className="flex justify-between text-xs">
        <span className={`font-medium ${statusColor[item.status]}`}>
          {item.status.toUpperCase()}
        </span>
        <span className="text-gray-400">{item.date || "Oct 24, 2026"}</span>
      </div>

      {/* Title */}
      <h3 className="font-semibold mt-3 text-gray-800">{item.title}</h3>

      <p className="text-xs text-gray-400 mt-2">Reported: {item.time}</p>

      {/* Desc */}
      <p className="text-sm text-gray-500 mt-2">
        {item.desc || "No description"}
      </p>

      {/* Bottom */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-400">View Details →</span>

        <span
          className={`text-xs px-3 py-1 rounded-full ${badge[item.status]}`}
        >
          {item.status}
        </span>
      </div>
    </div>
  );
}
