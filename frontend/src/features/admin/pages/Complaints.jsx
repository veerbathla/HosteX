import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { api } from "../../../api/axios.js";

export default function Complaints() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/complaints/${id}`, { status });
      fetchComplaints();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Complaints</h1>

      <div className="space-y-4">
        {complaints.map((c) => (
          <div key={c._id} className="border p-4 rounded-lg">
            <p><strong>Student:</strong> {c.studentId?.name || "Unknown"}</p>
            <p><strong>Room:</strong> {c.roomlId?.roomNumber || "N/A"}</p>
            <p><strong>Category:</strong> {c.category}</p>
            <p><strong>Description:</strong> {c.description}</p>
            <p><strong>Status:</strong> {c.status}</p>

            {c.status === "pending" && (
              <div className="mt-3 space-x-2">
                <button
                  onClick={() => updateStatus(c._id, "in_progress")}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  In Progress
                </button>
                <button
                  onClick={() => updateStatus(c._id, "resolved")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Resolve
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
