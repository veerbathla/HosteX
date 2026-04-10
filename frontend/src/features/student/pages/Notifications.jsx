import { Bell, CheckCircle2, Info, Wrench } from "lucide-react";
import Card from "../../../components/ui/Card";

const notifications = [
  {
    id: 1,
    title: "Maintenance visit scheduled",
    message: "A technician will inspect your room fan today between 4 PM and 6 PM.",
    time: "20 minutes ago",
    icon: Wrench,
    tone: "text-amber-600 bg-amber-50",
  },
  {
    id: 2,
    title: "Parcel ready for pickup",
    message: "Carry your student ID to collect your package from the gate desk.",
    time: "2 hours ago",
    icon: Bell,
    tone: "text-green-600 bg-green-50",
  },
  {
    id: 3,
    title: "Complaint resolved",
    message: "Your WiFi issue has been marked as resolved by the admin team.",
    time: "Yesterday",
    icon: CheckCircle2,
    tone: "text-blue-600 bg-blue-50",
  },
];

export default function Notifications() {
  return (
    <div className="min-h-screen space-y-6 bg-[#f5f7f6] p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
          Student Portal
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-gray-900">
          Notifications
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Important updates from hostel administration and gate services.
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.id} className="flex items-start gap-4">
              <div className={`grid h-11 w-11 place-items-center rounded-xl ${item.tone}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-semibold text-gray-900">{item.title}</h2>
                  <span className="text-xs font-medium text-gray-400">
                    {item.time}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.message}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="border-green-100 bg-green-50">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 text-green-700" size={18} />
          <p className="text-sm font-medium text-green-800">
            Backend notification APIs are not implemented yet, so this page uses
            local notification data.
          </p>
        </div>
      </Card>
    </div>
  );
}
