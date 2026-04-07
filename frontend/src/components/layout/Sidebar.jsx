import { NavLink } from "react-router-dom";
import { studentNav, adminNav } from "../../constants/navigation";

export default function Sidebar({ role }) {
  const links = role === "admin" ? adminNav : studentNav;

  return (
    <div className="w-64 bg-white border-r p-4 flex flex-col">
      
      {/* Logo */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-green-600">
          Digital Campus
        </h1>
        <p className="text-xs text-gray-400">
          {role === "admin" ? "ADMIN PANEL" : "STUDENT PORTAL"}
        </p>
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center justify-between p-3 rounded-lg transition ${
                isActive
                  ? "bg-green-100 text-green-600"
                  : "text-gray-600 hover:bg-gray-100"
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

    </div>
  );
}