export default function ActivityItem({ title, time, status }) {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-600",
    progress: "bg-blue-100 text-blue-600",
    resolved: "bg-green-100 text-green-600",
  };

  return (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">Reported: {time}</p>
      </div>

      <span className={`text-xs px-3 py-1 rounded-full ${statusStyles[status]}`}>
        {status}
      </span>
    </div>
  );
}