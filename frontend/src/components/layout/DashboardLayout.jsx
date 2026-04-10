import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ role }) {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* 🔥 FIX */}
        <Topbar role={role} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}