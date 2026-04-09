import React from "react";
import { complaints } from "../../../data/dummyData";
import StatsCard from "../../../components/ui/StatsCard";
import ComplaintsTable from "../components/complaints/ComplaintsTable";
import SmartCard from "../components/complaints/SmartCard";

const Complaints = () => {
  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Complaint Management</h1>
        <div className="flex gap-3">
          <button className="bg-gray-200 px-4 py-2 rounded-lg">
            Export Report
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            New Notice
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Total Pending" value="24" />
        <StatsCard title="Avg Resolve Time" value="4.2h" />
        <StatsCard title="High Priority" value="06" />
        <StatsCard title="Satisfaction" value="94%" />
      </div>

      {/* Table */}
      <ComplaintsTable data={complaints} />

      {/* Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SmartCard type="smart" />
        <SmartCard type="alert" />
      </div>

    </div>
  );
};

export default Complaints;
