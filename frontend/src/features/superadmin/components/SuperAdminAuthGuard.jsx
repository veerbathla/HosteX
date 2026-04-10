import { Navigate, Outlet } from "react-router-dom";

export default function SuperAdminAuthGuard() {
  const isAuth = localStorage.getItem("superadmin_auth") === "true";

  if (!isAuth) {
    return <Navigate to="/superadmin/login" replace />;
  }

  return <Outlet />;
}
