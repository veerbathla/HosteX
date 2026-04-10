import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../services/api/authService";

const dashboardByRole = {
  admin: "/admin/dashboard",
  student: "/student/dashboard",
  gatekeeper: "/gatekeeper/dashboard",
};

export default function PublicOnlyRoute() {
  const user = getCurrentUser();

  if (user?.isLoggedIn && user?.token) {
    return (
      <Navigate
        to={dashboardByRole[user.role] || "/student/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
}