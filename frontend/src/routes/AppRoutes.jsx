import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Landing from "../pages/Landing";
import Auth from "../pages/Auth";

// Layout
import DashboardLayout from "../components/layout/DashboardLayout";

// Student Pages
import StudentDashboard from "../features/student/pages/StudentDashboard";
import MyRoom from "../features/student/pages/MyRoom";
import Complaints from "../features/student/pages/Complaints";
import ApplicationForm from "../features/student/pages/ApplicationForm";

// Admin Pages
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import Students from "../features/admin/pages/Students";
import Rooms from "../features/admin/pages/RoomsInventory";
import AdminComplaints from "../features/admin/pages/Complaints";
import StaffTasks from "../features/admin/pages/StaffTasks";

// Gatekeeper Pages (NEW)
// import GatekeeperDashboard from "../features/gatekeeper/pages/Dashboard";
// import EntryExit from "../features/gatekeeper/pages/EntryExit";
// import Visitors from "../features/gatekeeper/pages/Visitors";
// import Parcels from "../features/gatekeeper/pages/Parcels";
// import Logs from "../features/gatekeeper/pages/Logs";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />

        {/* Student Routes */}
        <Route path="/student" element={<DashboardLayout role="student" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="room" element={<MyRoom />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="application" element={<ApplicationForm />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="complaints" element={<AdminComplaints />} />
          <Route path="tasks" element={<StaffTasks />} />
        </Route>

        {/* Gatekeeper Routes (NEW)
        <Route path="/gatekeeper" element={<DashboardLayout role="gatekeeper" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<GatekeeperDashboard />} />
          <Route path="entry-exit" element={<EntryExit />} />
          <Route path="visitors" element={<Visitors />} />
          <Route path="parcels" element={<Parcels />} />
          <Route path="logs" element={<Logs />} />
        </Route> */}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}