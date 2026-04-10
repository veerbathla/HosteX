import {
  AlertOctagon,
  ArrowRightLeft,
  Box,
  Car,
  Download,
  LogIn,
  LogOut,
  MapPin,
  Plus,
  UserPlus,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import {
  GateCard,
  GatekeeperPage,
  GateStatCard,
  PageHeader,
  StatusBadge,
} from "../components/GatekeeperUI";

const seedFeed = [
  {
    id: 1,
    type: "entry",
    title: "Rahul Sharma entered campus",
    detail: "Student ID: #22934 - Block C, Room 402",
    time: "9:12 AM",
    status: "ok",
  },
  {
    id: 2,
    type: "parcel",
    title: "Amazon parcel arrived for Room 203",
    detail: "Tracking ID: AMZ-9902-88 - Recipient: Sneha Kapur",
    time: "8:55 AM",
    status: "alert",
  },
  {
    id: 3,
    type: "visitor",
    title: "Visitor check-out - Vikram Adithya",
    detail: "Vehicle: MH-12-GK-442 - Duration: 1h 20m",
    time: "8:40 AM",
    status: "ok",
  },
  {
    id: 4,
    type: "exit",
    title: "Priya Verma exited campus",
    detail: "Student ID: #21045 - On leave",
    time: "8:32 AM",
    status: "ok",
  },
  {
    id: 5,
    type: "incident",
    title: "Incident logged - Power spike",
    detail: "Transformer B check recommended by Maintenance",
    time: "8:15 AM",
    status: "alert",
  },
];

const itemIcon = {
  entry: LogIn,
  exit: LogOut,
  visitor: Users,
  parcel: Box,
  incident: AlertOctagon,
};

const itemTone = {
  entry: "border-green-200 bg-green-50 text-green-700",
  exit: "border-blue-200 bg-blue-50 text-blue-700",
  visitor: "border-gray-200 bg-gray-50 text-gray-700",
  parcel: "border-amber-200 bg-amber-50 text-amber-700",
  incident: "border-red-200 bg-red-50 text-red-700",
};

export default function GatekeeperDashboard() {
  const navigate = useNavigate();
  const [feed, setFeed] = useState(seedFeed);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const filteredFeed = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return feed;

    return feed.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.detail.toLowerCase().includes(term),
    );
  }, [feed, query]);

  const stats = useMemo(
    () => ({
      entries: 142,
      exits: 89,
      visitors: 24,
      pendingParcels: feed.filter((item) => item.type === "parcel").length + 4,
    }),
    [feed],
  );

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const logIncident = () => {
    setFeed((prev) => [
      {
        id: Date.now(),
        type: "incident",
        title: "Incident logged by gatekeeper",
        detail: "Barrier sensor mismatch detected at Alpha Gate",
        time: "Now",
        status: "alert",
      },
      ...prev,
    ]);
    showMessage("Incident logged and shared with admin.");
  };

  return (
    <GatekeeperPage>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Gatekeeper Portal"
          title="Security Command"
          description="Thursday, Oct 24 - Gate Alpha"
          actions={
            <>
              <Button onClick={() => navigate("/gatekeeper/entry-exit")} className="shadow-md">
                <ArrowRightLeft size={16} />
                New Entry
              </Button>
              <Button variant="outline" onClick={() => navigate("/gatekeeper/visitors")} className="bg-white">
                <UserPlus size={16} />
                Add Visitor
              </Button>
              <Button variant="outline" onClick={() => navigate("/gatekeeper/parcels")} className="bg-white">
                <Plus size={16} />
                Add Parcel
              </Button>
            </>
          }
        />

        {message && (
          <div className="rounded-xl border border-green-200 bg-white px-5 py-4 text-sm font-medium text-green-800 shadow-sm">
            {message}
          </div>
        )}

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <GateStatCard label="Entries Today" value={stats.entries} helper="12% above average" icon={<LogIn size={20} />} tone="green" />
          <GateStatCard label="Exits Today" value={stats.exits} helper="Steady movement" icon={<LogOut size={20} />} tone="blue" />
          <GateStatCard label="Visitors Today" value={stats.visitors} helper="All identity checked" icon={<Users size={20} />} tone="gray" />
          <GateStatCard label="Pending Parcels" value={String(stats.pendingParcels).padStart(2, "0")} helper="Needs pickup" icon={<Box size={20} />} tone="red" />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="space-y-5 xl:col-span-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-950">Live Activity</h2>
                <p className="mt-1 text-sm text-gray-500">Security events from the active gate desk.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-[300px_auto]">
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search activity..." className="h-11 bg-white" />
                <Button variant="outline" onClick={() => navigate("/gatekeeper/logs")} className="h-11 bg-white">
                  View Logs
                </Button>
              </div>
            </div>

            <GateCard className="overflow-hidden p-0">
              <div className="divide-y divide-gray-100">
                {filteredFeed.map((item, index) => {
                  const Icon = itemIcon[item.type];
                  return (
                    <div key={item.id} className={`grid gap-4 px-6 py-5 transition duration-200 hover:bg-gray-50 md:grid-cols-[1fr_auto] md:items-center ${index % 2 ? "bg-gray-50/50" : "bg-white"}`}>
                      <div className="flex items-start gap-4">
                        <div className={`grid h-11 w-11 place-items-center rounded-xl border ${itemTone[item.type]}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-950">{item.title}</p>
                          <p className="mt-1 text-sm text-gray-500">{item.detail}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 md:justify-end">
                        <span className="text-xs font-medium text-gray-500">{item.time}</span>
                        <StatusBadge status={item.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </GateCard>
          </div>

          <div className="space-y-5 xl:col-span-4">
            <GateCard className="overflow-hidden p-0">
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <h3 className="font-semibold text-gray-950">Gate Coverage</h3>
                <Badge type="success">Live</Badge>
              </div>
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-green-50">
                <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(22,163,74,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(22,163,74,0.15)_1px,transparent_1px)] [background-size:28px_28px]" />
                <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-green-600 text-white shadow-lg">
                  <MapPin size={18} />
                </div>
                <span className="absolute bottom-4 right-4 rounded-lg bg-white px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm">ALPHA GATE</span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                  <span>Active Guards</span>
                  <span>04 / 06</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-2/3 rounded-full bg-green-600" />
                </div>
              </div>
            </GateCard>

            <GateCard className="border-green-100 bg-gradient-to-br from-green-50 to-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Room Occupancy</p>
              <h3 className="mt-3 text-5xl font-semibold text-green-700">84%</h3>
              <p className="mt-2 text-sm text-gray-500">42 rooms vacant</p>
              <Button variant="secondary" className="mt-5 w-full bg-white text-gray-800 hover:bg-gray-50" onClick={() => showMessage("Occupancy report downloaded.")}>
                <Download size={15} />
                Download Report
              </Button>
            </GateCard>

            <GateCard>
              <h3 className="text-lg font-semibold text-gray-950">Emergency Contacts</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div>
                    <p className="font-medium text-gray-900">Warden Office</p>
                    <p className="text-xs text-gray-500">Extension 102</p>
                  </div>
                  <Badge type="success">Live</Badge>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div>
                    <p className="font-medium text-gray-900">Medical Center</p>
                    <p className="text-xs text-gray-500">Extension 911</p>
                  </div>
                  <Badge type="error">Urgent</Badge>
                </div>
                <Button variant="warning" onClick={logIncident} fullWidth>
                  <AlertOctagon size={16} />
                  Log Incident
                </Button>
                <Button variant="outline" className="w-full bg-white" onClick={() => navigate("/gatekeeper/visitors")}>
                  <Car size={15} />
                  Track Vehicles
                </Button>
              </div>
            </GateCard>
          </div>
        </section>
      </div>
    </GatekeeperPage>
  );
}