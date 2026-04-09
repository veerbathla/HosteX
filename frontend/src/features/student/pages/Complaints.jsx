import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { useApp } from "../../../context/useApp";
import ComplaintCard from "../components/complaints/ComplaintCard";
import ComplaintTabs from "../components/complaints/ComplaintTabs";

export default function Complaints() {
  const { complaints } = useApp();
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const filtered =
    activeTab === "all"
      ? complaints
      : complaints.filter((complaint) => complaint.status === activeTab);

  return (
    <div className="min-h-screen space-y-6 bg-[#f5f7f6] p-8">
      <div className="flex items-center justify-between">
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

      <div className="grid grid-cols-3 gap-6">
        {filtered.map((item) => (
          <ComplaintCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
