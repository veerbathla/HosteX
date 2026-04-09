export default function ActivityItem({ title, time, status }) {
  const statusStyles = {
    new: "bg-yellow-100 text-yellow-600",
    "in-progress": "bg-blue-100 text-blue-600",
    resolved: "bg-green-100 text-green-600",
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">Reported: {time}</p>
      </div>

      <span className={`rounded-full px-3 py-1 text-xs ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>
        {String(status || "new").replace("-", " ")}
      </span>
    </div>
  );
}
