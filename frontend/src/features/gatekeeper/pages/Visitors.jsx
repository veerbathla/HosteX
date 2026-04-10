import {
  AlertOctagon,
  CheckCircle2,
  Filter,
  UserCheck,
  UserRoundPlus,
  Users,
  UserX,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import {
  createVisitorEntry,
  getVisitors,
  markVisitorExit,
} from "../../../services/api/visitorService";
import { getErrorMessage } from "../../../services/api/normalizers";
import {
  GateCard,
  GatekeeperPage,
  GateStatCard,
  PageHeader,
  StatusBadge,
} from "../components/GatekeeperUI";

const students = [
  "Alex Johnson (Room 302)",
  "Sarah Miller (Room 115)",
  "David Chen (Room 410)",
  "Priya Verma (Room 110)",
];

const initialVisitors = [
  { id: 1, visitor: "Robert Wilson", phone: "+1 (555) 0123", student: "Alex Johnson", room: "Room 302", timeIn: "09:15 AM", timeOut: "--:--", status: "inside" },
  { id: 2, visitor: "Maria Thompson", phone: "+1 (555) 4432", student: "Sarah Miller", room: "Room 115", timeIn: "08:30 AM", timeOut: "10:15 AM", status: "exited" },
  { id: 3, visitor: "Kevin Chen", phone: "+1 (555) 9876", student: "David Chen", room: "Room 410", timeIn: "09:45 AM", timeOut: "--:--", status: "inside" },
];

export default function Visitors() {
  const [visitors, setVisitors] = useState(initialVisitors);
  const [loading, setLoading] = useState(true);
  const [apiNotice, setApiNotice] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    visitingStudent: students[0],
    purpose: "",
    timeIn: "",
    expectedTimeOut: "",
  });

  useEffect(() => {
    let active = true;

    async function loadVisitors() {
      setLoading(true);
      setApiNotice("");

      try {
        const data = await getVisitors();
        if (active && data.length) {
          setVisitors(data);
        }
      } catch (error) {
        if (active) {
          setApiNotice(`${getErrorMessage(error)} Showing local visitor data.`);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadVisitors();

    return () => {
      active = false;
    };
  }, []);

  const filteredVisitors = useMemo(() => {
    const term = query.trim().toLowerCase();
    return visitors.filter((row) => {
      const matchesQuery = !term || row.visitor.toLowerCase().includes(term) || row.student.toLowerCase().includes(term) || row.room.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "all" || row.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter, visitors]);

  const stats = useMemo(
    () => ({
      activeNow: visitors.filter((row) => row.status === "inside").length + 9,
      totalToday: visitors.length + 45,
      overdueExit: visitors.filter((row) => row.status === "inside").length > 2 ? 2 : 1,
    }),
    [visitors],
  );

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const confirmEntry = async () => {
    if (!form.fullName.trim() || !form.phone.trim() || !form.purpose.trim()) {
      showMessage("Please fill name, phone and purpose.");
      return;
    }

    const studentInfo = form.visitingStudent;
    const name = studentInfo.split("(")[0].trim();
    const room = studentInfo.match(/Room\s\d+/i)?.[0] || "Room 101";

    const localVisitor = {
      id: Date.now(),
      visitor: form.fullName.trim(),
      phone: form.phone.trim(),
      student: name,
      room,
      purpose: form.purpose.trim(),
      timeIn: form.timeIn || "Now",
      timeOut: "--:--",
      status: "inside",
    };

    setVisitors((prev) => [localVisitor, ...prev]);

    setForm({ fullName: "", phone: "", visitingStudent: students[0], purpose: "", timeIn: "", expectedTimeOut: "" });

    try {
      const savedVisitor = await createVisitorEntry({
        name: localVisitor.visitor,
        phone: localVisitor.phone,
        purpose: localVisitor.purpose,
      });
      setVisitors((prev) =>
        prev.map((item) => (item.id === localVisitor.id ? savedVisitor : item)),
      );
      showMessage("Visitor entry confirmed.");
    } catch {
      showMessage("Visitor entry saved locally. API save is unavailable.");
    }
  };

  const markExit = async (id) => {
    setVisitors((prev) => prev.map((row) => (row.id === id ? { ...row, status: "exited", timeOut: "Now" } : row)));

    try {
      await markVisitorExit(id);
      showMessage("Visitor marked as exited.");
    } catch {
      showMessage("Visitor marked locally. API update is unavailable.");
    }
  };

  return (
    <GatekeeperPage>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Security Management"
          title="Visitor Management"
          description="Monitor campus access, log new entries, and track guest history."
          actions={
            <Button onClick={confirmEntry} className="shadow-md">
              <CheckCircle2 size={16} />
              Confirm Entry
            </Button>
          }
        />

        {message && <div className="rounded-xl border border-green-200 bg-white px-5 py-4 text-sm font-medium text-green-800 shadow-sm">{message}</div>}
        {apiNotice && <div className="rounded-xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800 shadow-sm">{apiNotice}</div>}

        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <GateStatCard label="Active Now" value={stats.activeNow} helper="Currently inside" icon={<Users size={20} />} tone="green" />
          <GateStatCard label="Today's Total" value={stats.totalToday} helper="12% from yesterday" icon={<UserCheck size={20} />} tone="blue" />
          <GateStatCard label="Overdue Exit" value={String(stats.overdueExit).padStart(2, "0")} helper="Action required" icon={<UserX size={20} />} tone="red" />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <GateCard>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-green-100 bg-green-50 text-green-700">
                  <UserRoundPlus size={18} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-950">New Entry Log</h2>
                  <p className="text-sm text-gray-500">Record a verified guest visit.</p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <label className="block"><span className="mb-2 block text-xs font-semibold uppercase text-gray-500">Visitor Full Name</span><Input value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} placeholder="Robert Wilson" className="h-12" /></label>
                <label className="block"><span className="mb-2 block text-xs font-semibold uppercase text-gray-500">Phone Number</span><Input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} placeholder="+1 (555) 000-0000" className="h-12" /></label>
                <label className="block"><span className="mb-2 block text-xs font-semibold uppercase text-gray-500">Visiting Student</span><Select value={form.visitingStudent} onChange={(value) => setForm((current) => ({ ...current, visitingStudent: value }))} options={students.map((student) => ({ value: student, label: student }))} searchable ariaLabel="Visiting student" /></label>
                <label className="block"><span className="mb-2 block text-xs font-semibold uppercase text-gray-500">Purpose</span><textarea value={form.purpose} onChange={(event) => setForm((current) => ({ ...current, purpose: event.target.value }))} placeholder="Describe reason for entry..." className="h-24 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500" /></label>
                <div className="grid grid-cols-2 gap-3">
                  <label><span className="mb-2 block text-xs font-semibold uppercase text-gray-500">Time In</span><Input type="time" value={form.timeIn} onChange={(event) => setForm((current) => ({ ...current, timeIn: event.target.value }))} className="h-12" /></label>
                  <label><span className="mb-2 block text-xs font-semibold uppercase text-gray-500">Expected Out</span><Input type="time" value={form.expectedTimeOut} onChange={(event) => setForm((current) => ({ ...current, expectedTimeOut: event.target.value }))} className="h-12" /></label>
                </div>
                <Button onClick={confirmEntry} fullWidth size="lg" className="shadow-md">
                  <CheckCircle2 size={16} />
                  Confirm Entry
                </Button>
              </div>
            </GateCard>
          </div>

          <div className="xl:col-span-8">
            <GateCard className="overflow-hidden p-0">
              <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div><h2 className="text-2xl font-semibold text-gray-950">Recent Activity</h2><p className="mt-1 text-sm text-gray-500">Live visitor entries and exits.</p></div>
                <div className="grid gap-3 sm:grid-cols-[250px_160px_auto]">
                  <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search visitors..." className="h-12" />
                  <Select value={statusFilter} onChange={setStatusFilter} options={[{ value: "all", label: "All Status" }, { value: "inside", label: "Inside" }, { value: "exited", label: "Exited" }]} ariaLabel="Visitor status filter" />
                  <Button variant="outline" onClick={() => showMessage("Visitor log filters applied.")} className="h-12 bg-white"><Filter size={16} />Filter</Button>
                </div>
              </div>

              <div className="hidden grid-cols-[1.2fr_1fr_0.65fr_0.65fr_0.7fr_1fr] bg-gray-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 lg:grid">
                <span>Visitor</span><span>Student</span><span>Time In</span><span>Time Out</span><span>Status</span><span className="text-right">Actions</span>
              </div>
              <div className="divide-y divide-gray-100">
                {loading ? (
                  [1, 2, 3].map((item) => (
                    <div key={item} className="h-20 animate-pulse bg-gray-50" />
                  ))
                ) : (
                  filteredVisitors.map((row, index) => (
                  <div key={row.id} className={`grid gap-4 px-6 py-5 transition hover:bg-gray-50 lg:grid-cols-[1.2fr_1fr_0.65fr_0.65fr_0.7fr_1fr] lg:items-center ${index % 2 ? "bg-gray-50/40" : "bg-white"}`}>
                    <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-full bg-green-100 text-xs font-semibold text-green-700">{row.visitor.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div><div><p className="font-semibold text-gray-950">{row.visitor}</p><p className="text-xs text-gray-500">{row.phone}</p></div></div>
                    <div><p className="font-medium text-gray-900">{row.student}</p><p className="text-xs text-green-700">{row.room}</p></div>
                    <p className="text-sm font-medium text-gray-700">{row.timeIn}</p>
                    <p className="text-sm font-medium text-gray-500">{row.timeOut}</p>
                    <StatusBadge status={row.status} />
                    <div className="flex justify-start gap-2 lg:justify-end">
                      {row.status === "inside" ? <Button size="sm" onClick={() => markExit(row.id)}>Mark Exit</Button> : <Button size="sm" variant="outline" className="bg-white" onClick={() => showMessage("Visitor history opened.")}>View</Button>}
                      <Button size="sm" variant="outline" className="bg-white" onClick={() => showMessage(`Incident log opened for ${row.visitor}.`)}><AlertOctagon size={15} /></Button>
                    </div>
                  </div>
                )))}
              </div>
              {filteredVisitors.length === 0 && <div className="p-10 text-center text-sm text-gray-500">No visitors match this search/filter.</div>}
            </GateCard>
          </div>
        </section>
      </div>
    </GatekeeperPage>
  );
}
