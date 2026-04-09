import Badge from "../../../../components/ui/Badge";
import Card from "../../../../components/ui/Card";

export default function ComplaintCard({ item }) {
  const statusColor = {
    new: "text-yellow-600",
    "in-progress": "text-blue-600",
    resolved: "text-green-600",
  };

  const badgeType = {
    new: "warning",
    "in-progress": "info",
    resolved: "success",
  };

  return (
    <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between text-xs">
        <span className={`font-medium ${statusColor[item.status] || "text-gray-600"}`}>
          {String(item.status || "new").replace("-", " ").toUpperCase()}
        </span>

        <div className="flex items-center gap-3">
          <span className="text-gray-400">{item.date || item.time || "Recently"}</span>
        </div>
      </div>

      <h3 className="mt-3 text-[15px] font-semibold text-gray-800">
        {item.title}
      </h3>
      <p className="mt-1 text-xs text-gray-400">Reported: {item.time}</p>
      <p className="mt-2 line-clamp-2 text-sm text-gray-500">
        {item.description || item.desc || "No description"}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">Visible to hostel staff</span>

        <Badge type={badgeType[item.status] || "warning"}>
          {String(item.status || "new").replace("-", " ")}
        </Badge>
      </div>
    </Card>
  );
}
