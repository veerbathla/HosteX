import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { useToast } from "../../../components/feedback/toastContext";
import { getMyComplaints } from "../../../services/api/complaintService";
import ComplaintCard from "../components/complaints/ComplaintCard";
import ComplaintTabs from "../components/complaints/ComplaintTabs";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;

    async function loadComplaints() {
      setLoading(true);
      setError("");

      try {
        const data = await getMyComplaints();
        if (active) setComplaints(data);
      } catch (apiError) {
        if (active) {
          const message = apiError.message || "Unable to load complaints.";
          setError(message);
          showToast({ title: "Complaints unavailable", message, type: "error" });
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadComplaints();

    return () => {
      active = false;
    };
  }, [showToast]);

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? complaints
        : complaints.filter((complaint) => complaint.status === activeTab),
    [activeTab, complaints],
  );

  return (
    <div className="min-h-screen space-y-6 bg-[#f5f7f6] p-4 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium text-green-600">
            CAMPUS - STUDENT PORTAL
          </p>
          <h1 className="text-3xl font-semibold">Complaint Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage your complaints
          </p>
        </div>

        <Button onClick={() => navigate("/student/application")}>
          + Raise New Complaint
        </Button>
      </div>

      <ComplaintTabs active={activeTab} setActive={setActiveTab} />

      {error && (
        <div className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="h-40 animate-pulse bg-gray-100" />
          ))}
        </div>
      ) : filtered.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <ComplaintCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <Card className="py-12 text-center">
          <p className="text-lg font-semibold text-gray-900">No complaints found</p>
          <p className="mt-2 text-sm text-gray-500">
            New requests will appear here once you submit them.
          </p>
        </Card>
      )}
    </div>
  );
}
