import {
  AlertOctagon,
  Boxes,
  CheckCircle2,
  CircleAlert,
  Download,
  Info,
  PackageCheck,
  PackagePlus,
  QrCode,
  Search,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const seedLedger = [
  {
    id: 1,
    recipient: "Sarah Miller",
    room: "B-402",
    courier: "Amazon",
    receivedAt: "10:45 AM",
    status: "pending",
  },
  {
    id: 2,
    recipient: "David Lee",
    room: "A-110",
    courier: "DHL Express",
    receivedAt: "09:15 AM",
    status: "collected",
  },
  {
    id: 3,
    recipient: "Emma Watson",
    room: "C-205",
    courier: "FedEx",
    receivedAt: "Yesterday",
    status: "pending",
  },
  {
    id: 4,
    recipient: "Ryan Kim",
    room: "B-302",
    courier: "UPS",
    receivedAt: "08:00 AM",
    status: "damaged",
  },
];

const courierOptions = [
  { value: "DHL Express", label: "DHL Express" },
  { value: "Amazon", label: "Amazon" },
  { value: "FedEx", label: "FedEx" },
  { value: "UPS", label: "UPS" },
  { value: "Blue Dart", label: "Blue Dart" },
];

const statusMeta = {
  pending: { label: "Pending", badge: "error", dot: "bg-red-500" },
  collected: { label: "Collected", badge: "success", dot: "bg-green-500" },
  damaged: { label: "Damaged", badge: "warning", dot: "bg-amber-500" },
};

function StatCard({ label, value, helper, icon, tone }) {
  const toneMap = {
    green: "border-green-100 bg-gradient-to-br from-green-50 to-white text-green-700",
    blue: "border-blue-100 bg-gradient-to-br from-blue-50 to-white text-blue-700",
    amber: "border-amber-100 bg-gradient-to-br from-amber-50 to-white text-amber-700",
  };

  return (
    <Card
      className={`border ${toneMap[tone]} p-6 shadow-sm transition duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-gray-500">{label}</p>
          <h3 className="mt-3 text-4xl font-semibold leading-none text-gray-950">
            {value}
          </h3>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-white shadow-sm">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-sm font-medium">{helper}</p>
    </Card>
  );
}

export default function Parcels() {
  const [ledger, setLedger] = useState(seedLedger);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    studentRoom: "",
    courier: "DHL Express",
    status: "received",
  });

  const filteredLedger = useMemo(() => {
    const term = query.trim().toLowerCase();

    return ledger.filter((item) => {
      const matchesQuery =
        !term ||
        item.recipient.toLowerCase().includes(term) ||
        item.room.toLowerCase().includes(term) ||
        item.courier.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [ledger, query, statusFilter]);

  const stats = useMemo(
    () => ({
      uncollected:
        ledger.filter((item) => item.status === "pending" || item.status === "damaged")
          .length + 39,
      receivedToday:
        ledger.filter((item) => item.receivedAt.includes("AM") || item.receivedAt === "Now")
          .length + 14,
      damaged: ledger.filter((item) => item.status === "damaged").length,
    }),
    [ledger],
  );

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const registerParcel = () => {
    if (!form.studentRoom.trim()) {
      showMessage("Add student name and room first.");
      return;
    }

    const [recipient] = form.studentRoom.split("(");
    const roomMatch = form.studentRoom.match(/[A-C]-\d{3}/i);
    const nextStatus = form.status === "received" ? "pending" : "damaged";

    setLedger((prev) => [
      {
        id: Date.now(),
        recipient: recipient.trim(),
        room: (roomMatch?.[0] || "A-101").toUpperCase(),
        courier: form.courier,
        receivedAt: "Now",
        status: nextStatus,
      },
      ...prev,
    ]);
    setForm({ studentRoom: "", courier: "DHL Express", status: "received" });
    showMessage("Parcel registered in active ledger.");
  };

  const markCollected = (id) => {
    setLedger((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "collected" } : item)),
    );
    showMessage("Parcel marked as collected.");
  };

  const logIncident = (recipient) => {
    showMessage(`Incident logged for ${recipient}.`);
  };

  return (
    <div className="min-h-screen space-y-8 bg-gray-50 p-1">
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="grid gap-4 md:grid-cols-3 xl:col-span-7">
          <StatCard
            label="Uncollected"
            value={stats.uncollected}
            helper="Awaiting pickup"
            icon={<Boxes size={20} />}
            tone="amber"
          />
          <StatCard
            label="Received Today"
            value={stats.receivedToday}
            helper="Processed successfully"
            icon={<PackageCheck size={20} />}
            tone="green"
          />
          <StatCard
            label="Damaged Review"
            value={stats.damaged}
            helper="Needs incident note"
            icon={<CircleAlert size={20} />}
            tone="blue"
          />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-emerald-800 bg-gradient-to-br from-emerald-600 to-emerald-900 p-8 text-white shadow-sm transition duration-200 hover:shadow-md xl:col-span-5">
          <div className="absolute -right-8 -top-8 grid h-32 w-32 place-items-center rounded-3xl bg-white/10 text-white/40">
            <QrCode size={64} />
          </div>
          <p className="text-sm font-semibold text-emerald-100">New Delivery?</p>
          <h1 className="mt-2 text-3xl font-semibold">Register incoming parcels</h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-emerald-100">
            Scan or log courier deliveries before they move into student pickup.
          </p>
          <Button
            variant="secondary"
            className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-emerald-800 shadow-lg transition duration-200 hover:scale-[1.02] hover:bg-emerald-50"
            onClick={() => showMessage("Scanner launched successfully.")}
          >
            <QrCode size={16} />
            Launch Scanner
          </Button>
        </div>
      </section>

      {message && (
        <div className="rounded-xl border border-green-100 bg-green-50 px-5 py-4 text-sm font-medium text-green-800 shadow-sm">
          {message}
        </div>
      )}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-4">
          <Card className="border-gray-200 bg-white p-7 shadow-sm transition duration-200 hover:shadow-md">
            <div>
              <h2 className="text-2xl font-semibold text-gray-950">Log New Parcel</h2>
              <p className="mt-2 text-sm text-gray-500">
                Register student deliveries with room, courier, and condition.
              </p>
            </div>

            <div className="mt-7 space-y-5">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase text-gray-500">
                  Student Name / Room
                </span>
                <Input
                  value={form.studentRoom}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, studentRoom: event.target.value }))
                  }
                  placeholder="Alex Johnson (Block B-301)"
                  className="h-12 focus:ring-2 focus:ring-green-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase text-gray-500">
                  Courier Name
                </span>
                <Select
                  value={form.courier}
                  onChange={(courier) => setForm((current) => ({ ...current, courier }))}
                  options={courierOptions}
                  ariaLabel="Courier Name"
                />
              </label>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
                  Parcel Condition
                </p>
                <div className="grid grid-cols-2 gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1.5">
                  <Button
                    variant={form.status === "received" ? "primary" : "ghost"}
                    className="h-11 px-4 font-semibold"
                    onClick={() =>
                      setForm((current) => ({ ...current, status: "received" }))
                    }
                  >
                    Received
                  </Button>
                  <Button
                    variant={form.status === "damaged" ? "danger" : "ghost"}
                    className="h-11 px-4 font-semibold"
                    onClick={() =>
                      setForm((current) => ({ ...current, status: "damaged" }))
                    }
                  >
                    Damaged
                  </Button>
                </div>
              </div>

              <Button
                onClick={registerParcel}
                fullWidth
                size="lg"
                className="mt-2 gap-2 py-3 font-semibold shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <PackagePlus size={16} />
                Register Parcel
              </Button>
            </div>
          </Card>
        </div>

        <div className="xl:col-span-8">
          <Card className="overflow-hidden border-gray-200 bg-white p-0 shadow-sm transition duration-200 hover:shadow-md">
            <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-950">
                  Active Parcel Ledger
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Track pickup status, courier source, and exceptions.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-[280px_170px_auto]">
                <label className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search name, room, courier..."
                    className="h-12 pl-10"
                  />
                </label>
                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    { value: "all", label: "All Status" },
                    { value: "pending", label: "Pending" },
                    { value: "collected", label: "Collected" },
                    { value: "damaged", label: "Damaged" },
                  ]}
                  ariaLabel="Filter parcel status"
                />
                <Button
                  variant="outline"
                  className="h-12 gap-2 bg-white px-4"
                  onClick={() => showMessage("Historic logs exported.")}
                >
                  <Download size={16} />
                  Export
                </Button>
              </div>
            </div>

            <div className="hidden grid-cols-[1.15fr_0.65fr_0.85fr_0.75fr_0.75fr_1.15fr] bg-gray-50 px-6 py-3 text-xs font-semibold uppercase text-gray-500 lg:grid">
              <span>Recipient</span>
              <span>Room</span>
              <span>Courier</span>
              <span>Received</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredLedger.map((item, index) => {
                const meta = statusMeta[item.status];

                return (
                  <div
                    key={item.id}
                    className={`grid gap-4 px-6 py-5 transition duration-200 ease-in-out hover:bg-green-50/50 lg:grid-cols-[1.15fr_0.65fr_0.85fr_0.75fr_0.75fr_1.15fr] lg:items-center ${
                      index % 2 === 1 ? "bg-gray-50/40" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                        {item.recipient
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-950">{item.recipient}</p>
                        <p className="text-xs text-gray-500">Resident parcel</p>
                      </div>
                    </div>

                    <span className="text-sm font-semibold text-green-700">{item.room}</span>
                    <span className="text-sm font-medium text-gray-600">{item.courier}</span>
                    <span className="text-sm text-gray-500">{item.receivedAt}</span>
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                      <Badge type={meta.badge}>{meta.label}</Badge>
                    </div>

                    <div className="flex justify-start gap-2 lg:justify-end">
                      {item.status !== "collected" && (
                        <Button
                          size="sm"
                          className="px-4 font-semibold"
                          onClick={() => markCollected(item.id)}
                        >
                          Mark Collected
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white px-4"
                        onClick={() => logIncident(item.recipient)}
                      >
                        Incident
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredLedger.length === 0 && (
              <div className="p-10 text-center text-sm text-gray-500">
                No parcels found for this filter.
              </div>
            )}

            <div className="border-t border-gray-100 p-5 text-center">
              <Button
                variant="ghost"
                onClick={() => showMessage("All historic parcel logs opened.")}
                className="px-5 text-green-700"
              >
                View All Historic Logs
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm transition duration-200 hover:shadow-md">
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-green-100 text-green-700">
              <Info size={16} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-950">Gatekeeper Protocol</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Verify student ID before marking a parcel as collected. For fragile
                items, add an incident note before handoff.
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-6 shadow-sm transition duration-200 hover:shadow-md">
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
              <Truck size={16} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-950">Upcoming Bulk Delivery</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Amazon distribution expected at 2:00 PM today. Clear the storage bay
                before the courier arrives.
              </p>
              <Button
                variant="outline"
                className="mt-4 gap-2 bg-white px-5"
                onClick={() => showMessage("Bulk delivery prep checklist opened.")}
              >
                <CircleAlert size={15} />
                Open Checklist
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <Button
        variant="warning"
        className="w-full max-w-xs gap-2 px-5 py-3 font-semibold"
        onClick={() => showMessage("Security incident logged from parcel page.")}
      >
        <AlertOctagon size={16} />
        Log Incident
      </Button>
    </div>
  );
}
