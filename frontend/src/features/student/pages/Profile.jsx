import { Mail, ShieldCheck, UserRound } from "lucide-react";
import Card from "../../../components/ui/Card";
import { getCurrentUser } from "../../../services/api/authService";

export default function Profile() {
  const user = getCurrentUser();

  return (
    <div className="min-h-screen space-y-6 bg-[#f5f7f6] p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
          Student Portal
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-gray-900">
          Profile
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Your current account and portal details.
        </p>
      </div>

      <Card className="max-w-3xl">
        <div className="flex items-start gap-5">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-green-100 text-green-700">
            <UserRound size={28} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              {user?.name || "HosteX User"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {user?.isFallbackSession
                ? "Local demo session"
                : "Authenticated session"}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <Mail size={16} />
                  Email
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {user?.email || "Not available"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <ShieldCheck size={16} />
                  Role
                </div>
                <p className="mt-2 text-sm capitalize text-gray-500">
                  {user?.role || "student"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
