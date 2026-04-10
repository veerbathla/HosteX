import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

// Pages
const Landing = lazy(() => import("../pages/Landing"));
const Auth = lazy(() => import("../pages/Auth"));

// Layout
const DashboardLayout = lazy(() => import("../components/layout/DashboardLayout"));

// Student Pages
const StudentDashboard = lazy(() => import("../features/student/pages/StudentDashboard"));
const MyRoom = lazy(() => import("../features/student/pages/MyRoom"));
const Complaints = lazy(() => import("../features/student/pages/Complaints"));
const ApplicationForm = lazy(() => import("../features/student/pages/ApplicationForm"));
const Notifications = lazy(() => import("../features/student/pages/Notifications"));
const Profile = lazy(() => import("../features/student/pages/Profile"));

// Admin Pages
const AdminDashboard = lazy(() => import("../features/admin/pages/AdminDashboard"));
const Students = lazy(() => import("../features/admin/pages/Students"));
const Rooms = lazy(() => import("../features/admin/pages/RoomsInventory"));
const AdminComplaints = lazy(() => import("../features/admin/pages/Complaints"));
const StaffTasks = lazy(() => import("../features/admin/pages/StaffTasks"));

// Gatekeeper Pages
const GatekeeperDashboard = lazy(() => import("../features/gatekeeper/pages/GatekeeperDashboard"));
const EntryExit = lazy(() => import("../features/gatekeeper/pages/EntryExit"));
const Visitors = lazy(() => import("../features/gatekeeper/pages/Visitors"));
const Parcels = lazy(() => import("../features/gatekeeper/pages/Parcels"));
const Logs = lazy(() => import("../features/gatekeeper/pages/Logs"));

// Super Admin Pages
const SuperAdminLogin = lazy(() => import("../features/superadmin/pages/SuperAdminLogin"));
const SuperAdminDashboard = lazy(() => import("../features/superadmin/pages/SuperAdminDashboard"));
const SuperAdminApprovals = lazy(() => import("../features/superadmin/pages/SuperAdminApprovals"));
const SuperAdminLayout = lazy(() => import("../features/superadmin/components/SuperAdminLayout"));
const SuperAdminAuthGuard = lazy(() => import("../features/superadmin/components/SuperAdminAuthGuard"));

function RouteFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f5f7f6]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<RouteFallback />}>
        <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
        </Route>

        {/* Student Routes */}
        <Route element={<ProtectedRoute role="student" />}>
          <Route path="/student" element={<DashboardLayout role="student" />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="room" element={<MyRoom />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="application" element={<ApplicationForm />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="complaints" element={<AdminComplaints />} />
            <Route path="tasks" element={<StaffTasks />} />
          </Route>
        </Route>

        {/* Gatekeeper Routes */}
        <Route element={<ProtectedRoute role="gatekeeper" />}>
          <Route path="/gatekeeper" element={<DashboardLayout role="gatekeeper" />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<GatekeeperDashboard />} />
            <Route path="entry-exit" element={<EntryExit />} />
            <Route path="visitors" element={<Visitors />} />
            <Route path="parcels" element={<Parcels />} />
            <Route path="logs" element={<Logs />} />
          </Route>
        </Route>

        {/* Super Admin Routes — hardcoded credentials */}
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />
        <Route element={<SuperAdminAuthGuard />}>
          <Route path="/superadmin" element={<SuperAdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="approvals" element={<SuperAdminApprovals />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Suspense>
    </Router>
  );
}
