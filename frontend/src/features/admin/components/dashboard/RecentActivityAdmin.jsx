import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import Card from "../../../../components/ui/Card";

const activityMeta = {
  resolved: {
    icon: <CheckCircle size={16} />,
    color: "bg-green-100 text-green-700",
  },
  "in-progress": {
    icon: <Clock size={16} />,
    color: "bg-blue-100 text-blue-700",
  },
  new: {
    icon: <AlertCircle size={16} />,
    color: "bg-amber-100 text-amber-700",
  },
};

export default function RecentActivityAdmin({ activities = [] }) {
  const hasActivities = activities.length > 0;

  return (
    <Card className="h-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
      </div>

      {hasActivities ? (
        <div className="flex flex-col gap-6">
          {activities.map((item) => {
            const meta = activityMeta[item.status] || activityMeta.new;
            return (
          <div key={item.id} className="flex items-start gap-4">
            <div className={`grid h-10 w-10 place-items-center rounded-2xl ${meta.color}`}>
              {meta.icon}
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">{item.title}</p>
              <p className="mt-1 text-xs font-medium text-gray-600">
                {item.desc}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {item.time}
              </p>
            </div>
          </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 p-6 text-sm font-medium text-gray-500">
          No recent complaint activity from the API yet.
        </div>
      )}

      <div className="mt-8 border-t border-gray-100 pt-4 text-center">
        <button className="text-sm font-bold text-green-700 transition hover:text-green-800 hover:underline">
          View Full Audit Log
        </button>
      </div>
    </Card>
  );
}
