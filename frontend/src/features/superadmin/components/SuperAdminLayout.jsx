import { Outlet, NavLink } from "react-router-dom";
import { LogOut, Bell, Search, ShieldCheck } from "lucide-react";
import { superAdminNav } from "../../../constants/navigation";

/* ── Static super admin user ── */
const SUPER_ADMIN = {
  name: "Super Admin",
  initials: "SA",
  role: "SYSTEM CONTROL",
};

/* ───────────────────────────────────────────
   Sidebar — no auth calls, fully static
─────────────────────────────────────────── */
function SuperAdminSidebar() {
  return (
    <div className="flex w-64 flex-shrink-0 flex-col overflow-y-auto border-r border-gray-100 bg-white p-6 shadow-sm">
      {/* Logo */}
      <div className="mb-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
            <ShieldCheck size={16} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-green-700">HosteX</h1>
        </div>
        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          System Control
        </p>
      </div>

      {/* Navigation links  */}
      <nav className="flex flex-col gap-1.5">
        {superAdminNav.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-green-50 font-bold text-green-800 shadow-sm ring-1 ring-green-100"
                  : "font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <span>{link.name}</span>
            {link.badge && (
              <span className="rounded-lg bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white">
                {link.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: logout → back to super admin login */}
      <div className="mt-auto border-t border-gray-100 pt-6">
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("superadmin_auth");
            window.location.href = "/superadmin/login";
          }}
          className="flex h-12 w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-700 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────
   Topbar — static super admin info, no API
─────────────────────────────────────────── */
function SuperAdminTopbar() {
  return (
    <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-100 bg-white px-8 shadow-sm">
      {/* Search */}
      <label className="relative w-full max-w-md">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search systems..."
          className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20"
        />
      </label>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button
          type="button"
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-gray-100 text-gray-500 transition hover:bg-gray-50 hover:text-green-700"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Check-in Student CTA */}
        <button
          type="button"
          className="hidden items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-green-700 sm:flex"
        >
          Check-in Student
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-sm font-bold text-white shadow-sm">
            {SUPER_ADMIN.initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-900">{SUPER_ADMIN.name}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {SUPER_ADMIN.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────
   SuperAdminLayout — combines sidebar + topbar
   NO auth dependency — fully static
─────────────────────────────────────────── */
export default function SuperAdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SuperAdminSidebar />

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <SuperAdminTopbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
