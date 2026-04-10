import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, refreshSession } from "../services/api/authService";

const dashboardByRole = {
  admin: "/admin/dashboard",
  student: "/student/dashboard",
  gatekeeper: "/gatekeeper/dashboard",
  super_admin: "/superadmin/dashboard",
};

export default function ProtectedRoute({ role }) {
  const location = useLocation();
  const [user, setUser] = useState(getCurrentUser());
  const [checking, setChecking] = useState(!user?.token);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      if (user?.token) {
        setChecking(false);
        return;
      }

      try {
        const refreshedUser = await refreshSession();
        if (active) setUser(refreshedUser);
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setChecking(false);
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, [user?.token]);

  if (checking) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f5f7f6]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />
      </div>
    );
  }

  if (!user?.isLoggedIn || !user?.token) {
    const loginPath = role === "super_admin" ? "/superadmin/login" : "/login";
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to={dashboardByRole[user.role] || "/login"} replace />;
  }

  return <Outlet />;
}
