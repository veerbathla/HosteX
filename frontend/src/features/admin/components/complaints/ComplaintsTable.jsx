import { MoreHorizontal } from "lucide-react";
import Badge from "../../../../components/ui/Badge";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";

const badgeLabel = {
  high: "High",
  medium: "Medium",
  low: "Low",
  new: "New",
  "in-progress": "In Progress",
  resolved: "Resolved",
};

const badgeType = {
  high: "error",
  medium: "warning",
  low: "success",
  new: "info",
  "in-progress": "warning",
  resolved: "success",
};

export default function ComplaintsTable({
  data,
  activeMenu,
  onToggleMenu,
  onOpenDetails,
  onResolve,
  onEdit,
  onEscalate,
}) {
  return (
    <Card className="overflow-visible p-0">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Recent Logs</h2>
          <p className="text-sm text-gray-500">
            Prioritized complaints with fast admin actions.
          </p>
        </div>
        <Badge type="neutral">{data.length} records</Badge>
      </div>

      <div className="space-y-3 p-4">
        {data.map((item) => {
          const isHighPriority = item.priority === "high";

          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => onOpenDetails(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onOpenDetails(item);
              }}
              className={`relative grid cursor-pointer grid-cols-[1.4fr_220px_210px_190px] items-center gap-4 rounded-2xl border bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-green-50/40 hover:shadow-md ${
                isHighPriority
                  ? "border-red-100 shadow-[inset_4px_0_0_#ef4444]"
                  : "border-gray-100"
              }`}
            >
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {item.time} - {item.room || "Room not assigned"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.student}
                  </p>
                  <p className="text-xs text-gray-400">Resident</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge type={badgeType[item.priority]}>
                  {badgeLabel[item.priority] || item.priority}
                </Badge>
                <Badge type={badgeType[item.status]}>
                  {badgeLabel[item.status] || item.status}
                </Badge>
              </div>

              <div
                className="flex items-center justify-end gap-2"
                onClick={(event) => event.stopPropagation()}
              >
                {item.status !== "resolved" && (
                  <Button size="sm" onClick={() => onResolve(item.id)}>
                    Resolve
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => onEdit(item)}>
                  Edit
                </Button>

                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onToggleMenu(item.id)}
                    aria-label={`More actions for ${item.title}`}
                  >
                    <MoreHorizontal size={16} />
                  </Button>

                  {activeMenu === item.id && (
                    <div className="absolute right-0 top-10 z-20 w-44 rounded-xl border bg-white p-2 shadow-xl">
                      <Button
                        size="sm"
                        variant="ghost"
                        fullWidth
                        className="justify-start text-amber-700"
                        onClick={() => onEscalate(item.id)}
                      >
                        Escalate priority
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        fullWidth
                        className="justify-start text-gray-700"
                        onClick={() => onOpenDetails(item)}
                      >
                        Open details
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {data.length === 0 && (
          <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-gray-500">
            No complaints match the current filters.
          </div>
        )}
      </div>
    </Card>
  );
}
