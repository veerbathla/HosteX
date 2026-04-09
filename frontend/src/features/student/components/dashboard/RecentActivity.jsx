import { useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import { useApp } from "../../../../context/useApp";
import ActivityItem from "./ActivityItem";

export default function RecentActivity() {
  const { complaints } = useApp();
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <p className="text-sm text-gray-500">
            Manage and track your service requests
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate("/student/complaints")}
          className="text-sm font-medium text-green-600"
        >
          + New Complaint
        </Button>
      </div>

      <div className="mt-4 space-y-4">
        {complaints.slice(0, 3).map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </div>
    </Card>
  );
}
