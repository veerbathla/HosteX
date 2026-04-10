import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import { getMyComplaints } from "../../../../services/api/complaintService";
import ActivityItem from "./ActivityItem";

export default function RecentActivity() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    async function loadComplaints() {
      try {
        const data = await getMyComplaints();
        if (active) setComplaints(data.slice(0, 3));
      } catch {
        if (active) setComplaints([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadComplaints();

    return () => {
      active = false;
    };
  }, []);

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
        {loading ? (
          [1, 2, 3].map((item) => (
            <div key={item} className="h-12 animate-pulse rounded-lg bg-gray-100" />
          ))
        ) : complaints.length ? (
          complaints.map((item) => <ActivityItem key={item.id} {...item} />)
        ) : (
          <p className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500">
            No recent requests yet.
          </p>
        )}
      </div>
    </Card>
  );
}
