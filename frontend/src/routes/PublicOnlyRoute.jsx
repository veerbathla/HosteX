import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, refreshSession } from "../services/api/authService";

const dashboardByRole = {
  admin: "/admin/dashboard",
  student: "/student/dashboard",
  gatekeeper: "/gatekeeper/dashboard",
};

export default function PublicOnlyRoute() {
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

  if (user?.isLoggedIn && user?.token) {
    return <Navigate to={dashboardByRole[user.role] || "/student/dashboard"} replace />;
  }

  return <Outlet />;
}
