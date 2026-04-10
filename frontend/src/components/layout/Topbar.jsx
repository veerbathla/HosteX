import { Bell, Search } from "lucide-react";
import Input from "../ui/Input";
import { getCurrentUser } from "../../services/api/authService";
import { useNavigate } from "react-router-dom";
export default function Topbar({ role = "student" }) {
  const raw = getCurrentUser();
  const user = raw?.user || raw?.data?.user || raw;
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
  const displayName = user?.name || user?.email || roleLabel;
  const navigate = useNavigate();

  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-8 shadow-sm">
      <label className="relative w-full max-w-md">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <Input
          type="text"
          placeholder={`Search ${roleLabel.toLowerCase()} module...`}
          className="h-10 rounded-xl bg-gray-50 pl-10 ring-green-100 focus:bg-white"
        />
      </label>

      <div className="flex items-center gap-6">
        <button
          type="button"
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-gray-100 text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-green-700"
          aria-label="Notifications"
          onClick={() => navigate("/notifications")}
        >
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-gray-100 pl-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-sm font-bold text-green-800 shadow-sm">
            {displayName[0]?.toUpperCase() || roleLabel[0]}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-900">{displayName}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              {roleLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
