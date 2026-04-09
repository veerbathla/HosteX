import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { studentNav, adminNav, gatekeeperNav } from "../../constants/navigation";
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      
      {/* Logo */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-green-600">
          HosteX
        </h1>
        <p className="text-xs text-gray-400">
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
              `flex items-center justify-between border-l-4 p-3 rounded-lg transition duration-200 ${
                isActive
                  ? "border-green-600 bg-green-100 text-green-700 shadow-sm"
                  : "border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`
            }
          >
            <span>{link.name}</span>

            {/* Badge */}
            {link.badge && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {link.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-gray-200 pt-4">
        <Button
          variant="outline"
          fullWidth
          onClick={handleLogout}
          className="justify-start border-gray-200 bg-white text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>

    </div>
  );
}
