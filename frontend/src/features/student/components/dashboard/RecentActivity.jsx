import { useApp } from "../../../../context/useApp";
import ActivityItem from "./ActivityItem";
import { useNavigate } from "react-router-dom";

export default function RecentActivity() {
  const { complaints } = useApp();
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">Recent Activity</h2>
          <p className="text-sm text-gray-500">
            Manage and track your service requests
          </p>
        </div>

        <button
          onClick={() => navigate("/student/complaints")}
          className="text-green-600 text-sm font-medium"
        >
          + New Complaint
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {complaints.slice(0, 3).map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
