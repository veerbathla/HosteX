import { Bell, Search } from "lucide-react";
import Input from "../ui/Input";

export default function Topbar({ role = "student" }) {
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <label className="relative w-full max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <Input
          type="text"
          placeholder={`Search ${roleLabel.toLowerCase()} panel...`}
          className="h-10 rounded-full bg-gray-50 pl-9 py-2"
        />
      </label>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
          aria-label="Notifications"
        >
          <Bell size={17} />
        </button>

        <div className="flex items-center gap-2">
          <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
            {roleLabel[0]}
          </div>

          <span className="text-sm font-medium text-gray-800">{roleLabel}</span>
        </div>
      </div>
    </div>
  );
}
