import AdminStatsGrid from "../components/dashboard/AdminStatsGrid";
import ComplaintChart from "../components/dashboard/ComplaintChart";
import RecentActivityAdmin from "../components/dashboard/RecentActivityAdmin";
import RoomMap from "../components/dashboard/RoomMap";

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-[#f5f7f6] min-h-screen">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Campus Overview
        </h1>
        <p className="text-sm text-gray-500">
          Detailed metrics for Emerald Hall Residential Wing.
        </p>
      </div>

      {/* Stats */}
      <AdminStatsGrid />

      {/* Middle */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        
        <div className="col-span-2">
          <ComplaintChart />
        </div>

        <RecentActivityAdmin />

      </div>

      {/* Bottom */}
      <div className="mt-6">
        <RoomMap />
      </div>

    </div>
  );
}