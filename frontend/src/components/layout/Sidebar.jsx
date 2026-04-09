import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { studentNav, adminNav, gatekeeperNav } from "../../constants/navigation";
import { logout } from "../../services/api/authService";
import Button from "../ui/Button";

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const linksByRole = {
    admin: adminNav,
    student: studentNav,
    gatekeeper: gatekeeperNav,
  };

  const roleLabelByRole = {
    admin: "ADMIN PANEL",
    student: "STUDENT PORTAL",
    gatekeeper: "GATEKEEPER PORTAL",
  };

  const links = linksByRole[role] || studentNav;
  const roleLabel = roleLabelByRole[role] || "STUDENT PORTAL";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex w-64 flex-col border-r border-gray-100 bg-white p-6 shadow-sm">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-green-700">HosteX</h1>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          {roleLabel}
        </p>
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-300 ${
                isActive
                  ? "bg-green-50 font-bold text-green-800 shadow-sm ring-1 ring-green-100"
                  : "font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <span>{link.name}</span>

            {/* Badge */}
            {link.badge && (
              <span className="rounded-lg bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white">
                {link.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-gray-100 pt-6">
        <Button
          variant="outline"
          fullWidth
          onClick={handleLogout}
          className="flex h-12 items-center justify-start gap-3 border-gray-200 bg-white px-4 text-sm font-bold text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </div>
  );
}
