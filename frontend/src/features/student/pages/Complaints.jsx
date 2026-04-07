import { useState } from "react";
import { useApp } from "../../../context/AppContext";
import ComplaintCard from "../components/complaints/ComplaintCard";
import ComplaintTabs from "../components/complaints/ComplaintTabs";
import { useNavigate } from "react-router-dom";

export default function Complaints() {
  const { complaints } = useApp();
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  // 🔥 FILTER LOGIC
  const filtered =
    activeTab === "all"
      ? complaints
      : complaints.filter((c) => c.status === activeTab);

  return (
    <div className="p-8 bg-[#f5f7f6] min-h-screen space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-green-600 font-medium">
            CAMPUS • STUDENT PORTAL
          </p>
          <h1 className="text-3xl font-semibold">Complaint Management</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Track and manage your complaints
          </p>
        </div>

        <button
          onClick={() => navigate("/student/application")}
          className="bg-green-600 text-white px-5 py-2.5 rounded-xl shadow hover:scale-105 transition"
        >
          + Raise New Complaint
        </button>
      </div>

      {/* Tabs */}
      <ComplaintTabs active={activeTab} setActive={setActiveTab} />

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        {filtered.map((item) => (
          <ComplaintCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
}