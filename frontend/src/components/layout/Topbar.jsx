import { Bell } from "lucide-react";
import Input from "../ui/Input";

export default function Topbar({ role = "student" }) {
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <Input
        type="text"
        placeholder="Search..."
        className="w-1/3 px-3 py-2"
      />

      <div className="flex items-center gap-4">
        <Bell size={18} className="text-gray-500" />

        <div className="flex items-center gap-2">
          <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            {roleLabel[0]}
          </div>

          <span className="font-medium">{roleLabel}</span>
        </div>
      </div>
    </div>
  );
}
